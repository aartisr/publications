import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { PortfolioView } from './components/views/PortfolioView';
import { ReadingInterface } from './components/ReadingInterface';
import { Footer } from './components/layout/Footer';
import { Top10BenchmarkModal } from './components/Top10BenchmarkModal';
import { DashboardArchitectureModal } from './components/DashboardArchitectureModal';
import { MathDeepDiveModal } from './components/MathDeepDiveModal';
import { SubscribeModal } from './components/SubscribeModal';
import { publicationService } from './services/publicationService';
import { Publication } from './types';

/**
 * Main Application Orchestrator
 * High-performance, modular, plug-and-play architecture for scientific publications.
 */
export default function App() {
  const [activeView, setActiveView] = useState<'portfolio' | 'reader'>('portfolio');
  const [selectedPublication, setSelectedPublication] = useState<Publication>(() =>
    publicationService.getFeaturedPublication()
  );

  // Global Dialog / Modal States
  const [isBenchmarkOpen, setIsBenchmarkOpen] = useState(false);
  const [isArchitectureOpen, setIsArchitectureOpen] = useState(false);
  const [isMathDeepDiveOpen, setIsMathDeepDiveOpen] = useState(false);
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);

  // Smooth scroll to top on view changes
  const handleReadPublication = (pub: Publication) => {
    setSelectedPublication(pub);
    setActiveView('reader');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToPortfolio = () => {
    setActiveView('portfolio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-slate-900 font-sans selection:bg-amber-200 selection:text-amber-950 flex flex-col">
      {/* Global Navigation Header */}
      <Navbar
        onOpenBenchmarks={() => setIsBenchmarkOpen(true)}
        onOpenArchitecture={() => setIsArchitectureOpen(true)}
        onOpenMathDeepDive={() => setIsMathDeepDiveOpen(true)}
        onOpenSubscribe={() => setIsSubscribeOpen(true)}
        activeView={activeView}
        onToggleView={(view) => {
          setActiveView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Main View Router */}
      {activeView === 'reader' ? (
        <ReadingInterface
          publication={selectedPublication}
          onBack={handleBackToPortfolio}
          onOpenArchitecture={() => setIsArchitectureOpen(true)}
          onOpenMathDeepDive={() => setIsMathDeepDiveOpen(true)}
        />
      ) : (
        <PortfolioView
          onReadPublication={handleReadPublication}
          onOpenBenchmarks={() => setIsBenchmarkOpen(true)}
          onOpenArchitecture={() => setIsArchitectureOpen(true)}
          onOpenMathDeepDive={() => setIsMathDeepDiveOpen(true)}
          onOpenSubscribe={() => setIsSubscribeOpen(true)}
        />
      )}

      {/* Global Modular Academic Footer */}
      <Footer
        onOpenMathDeepDive={() => setIsMathDeepDiveOpen(true)}
        onOpenBenchmarks={() => setIsBenchmarkOpen(true)}
        onOpenArchitecture={() => setIsArchitectureOpen(true)}
        onOpenSubscribe={() => setIsSubscribeOpen(true)}
      />

      {/* Global Academic Modals */}
      <MathDeepDiveModal
        isOpen={isMathDeepDiveOpen}
        onClose={() => setIsMathDeepDiveOpen(false)}
      />

      <Top10BenchmarkModal
        isOpen={isBenchmarkOpen}
        onClose={() => setIsBenchmarkOpen(false)}
      />

      <DashboardArchitectureModal
        isOpen={isArchitectureOpen}
        onClose={() => setIsArchitectureOpen(false)}
      />

      <SubscribeModal
        isOpen={isSubscribeOpen}
        onClose={() => setIsSubscribeOpen(false)}
      />
    </div>
  );
}
