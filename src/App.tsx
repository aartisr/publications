import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { PortfolioView } from './components/views/PortfolioView';
import { ReadingInterface } from './components/ReadingInterface';
import { Footer } from './components/layout/Footer';
import { Top10BenchmarkModal } from './components/Top10BenchmarkModal';
import { DashboardArchitectureModal } from './components/DashboardArchitectureModal';
import { MathDeepDiveModal } from './components/MathDeepDiveModal';
import { SubscribeModal } from './components/SubscribeModal';
import { DiscoverabilityModal } from './components/seo/DiscoverabilityModal';
import { GlobalCommunityHubModal } from './components/community/GlobalCommunityHubModal';
import { DownloadMonographModal } from './components/DownloadMonographModal';
import { SEOHead } from './components/seo/SEOHead';
import { publicationService } from './services/publicationService';
import { Publication } from './types';

/**
 * Main Application Orchestrator
 * High-performance, modular, plug-and-play architecture for scientific publications.
 * Includes complete GEO, AIO, AEI, AXO, and Highwire Press SEO discoverability layer,
 * Worldwide Community Impact Hub with 10-language translations and grassroots toolkits,
 * and academic Research Monograph download engine (PDF Academic Reprint, Scientific Markdown, BibTeX citation bundles).
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
  const [isDiscoverabilityOpen, setIsDiscoverabilityOpen] = useState(false);
  const [isGlobalCommunityOpen, setIsGlobalCommunityOpen] = useState(false);
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [downloadTargetPub, setDownloadTargetPub] = useState<Publication>(() =>
    publicationService.getFeaturedPublication()
  );
  const [globalCommunityInitialTab, setGlobalCommunityInitialTab] = useState<
    'world-impact' | 'translations' | 'action-kit' | 'sdgs' | 'amplifier'
  >('world-impact');

  const handleOpenGlobalCommunity = (
    tab: 'world-impact' | 'translations' | 'action-kit' | 'sdgs' | 'amplifier' = 'world-impact'
  ) => {
    setGlobalCommunityInitialTab(tab);
    setIsGlobalCommunityOpen(true);
  };

  const handleOpenDownload = (pub?: Publication) => {
    setDownloadTargetPub(pub || selectedPublication || publicationService.getFeaturedPublication());
    setIsDownloadOpen(true);
  };

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
      {/* Dynamic SEO, GEO, AIO, OpenGraph, Highwire Press & Schema.org Injector */}
      <SEOHead publication={activeView === 'reader' ? selectedPublication : null} />

      {/* Global Navigation Header */}
      <Navbar
        onOpenBenchmarks={() => setIsBenchmarkOpen(true)}
        onOpenArchitecture={() => setIsArchitectureOpen(true)}
        onOpenMathDeepDive={() => setIsMathDeepDiveOpen(true)}
        onOpenSubscribe={() => setIsSubscribeOpen(true)}
        onOpenDiscoverability={() => setIsDiscoverabilityOpen(true)}
        onOpenGlobalCommunity={handleOpenGlobalCommunity}
        onOpenDownload={() => handleOpenDownload(selectedPublication)}
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
          onOpenDiscoverability={() => setIsDiscoverabilityOpen(true)}
          onOpenGlobalCommunity={handleOpenGlobalCommunity}
          onOpenDownload={handleOpenDownload}
        />
      ) : (
        <PortfolioView
          onReadPublication={handleReadPublication}
          onOpenBenchmarks={() => setIsBenchmarkOpen(true)}
          onOpenArchitecture={() => setIsArchitectureOpen(true)}
          onOpenMathDeepDive={() => setIsMathDeepDiveOpen(true)}
          onOpenSubscribe={() => setIsSubscribeOpen(true)}
          onOpenDiscoverability={() => setIsDiscoverabilityOpen(true)}
          onOpenGlobalCommunity={handleOpenGlobalCommunity}
          onOpenDownload={handleOpenDownload}
        />
      )}

      {/* Global Modular Academic Footer */}
      <Footer
        onOpenMathDeepDive={() => setIsMathDeepDiveOpen(true)}
        onOpenBenchmarks={() => setIsBenchmarkOpen(true)}
        onOpenArchitecture={() => setIsArchitectureOpen(true)}
        onOpenSubscribe={() => setIsSubscribeOpen(true)}
        onOpenDiscoverability={() => setIsDiscoverabilityOpen(true)}
        onOpenGlobalCommunity={handleOpenGlobalCommunity}
      />

      {/* Global Academic, Community & Discoverability Modals */}
      <DownloadMonographModal
        isOpen={isDownloadOpen}
        onClose={() => setIsDownloadOpen(false)}
        publication={downloadTargetPub}
      />

      <GlobalCommunityHubModal
        isOpen={isGlobalCommunityOpen}
        onClose={() => setIsGlobalCommunityOpen(false)}
        initialTab={globalCommunityInitialTab}
      />

      <DiscoverabilityModal
        isOpen={isDiscoverabilityOpen}
        onClose={() => setIsDiscoverabilityOpen(false)}
        activePublication={activeView === 'reader' ? selectedPublication : null}
      />

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

