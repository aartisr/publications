import React, { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { AuthorProfileBanner } from './components/AuthorProfileBanner';
import { SearchAndFilter } from './components/SearchAndFilter';
import { PublicationCard } from './components/PublicationCard';
import { ReadingInterface } from './components/ReadingInterface';
import { Top10BenchmarkModal } from './components/Top10BenchmarkModal';
import { DashboardArchitectureModal } from './components/DashboardArchitectureModal';
import { SubscribeModal } from './components/SubscribeModal';
import { ThermalScatterChart } from './components/charts/ThermalScatterChart';
import { MetropolitanHeatMap } from './components/charts/MetropolitanHeatMap';
import { MitigationSimulator } from './components/charts/MitigationSimulator';
import { PUBLICATIONS_DATA } from './data/publications';
import { Publication } from './types';
import { Award, BookOpen, Layers, Sparkles, ExternalLink, GitBranch, Bell, ArrowRight, ShieldCheck, FileText, ChevronRight } from 'lucide-react';

export default function App() {
  const [activeView, setActiveView] = useState<'portfolio' | 'reader'>('portfolio');
  const [selectedPublication, setSelectedPublication] = useState<Publication>(PUBLICATIONS_DATA[0]);

  // Search and Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('All Topics');
  const [selectedType, setSelectedType] = useState('all');
  const [onlyInteractive, setOnlyInteractive] = useState(false);
  const [sortBy, setSortBy] = useState<'recent' | 'citations' | 'downloads'>('recent');

  // Modals
  const [isBenchmarkOpen, setIsBenchmarkOpen] = useState(false);
  const [isArchitectureOpen, setIsArchitectureOpen] = useState(false);
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);

  // Filter Logic
  const filteredPublications = useMemo(() => {
    let result = PUBLICATIONS_DATA.filter((pub) => {
      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = pub.title.toLowerCase().includes(q);
        const matchesSubtitle = pub.subtitle?.toLowerCase().includes(q) || false;
        const matchesAbstract = pub.abstract.toLowerCase().includes(q);
        const matchesTopic = pub.topics.some((t) => t.toLowerCase().includes(q));
        const matchesKeyword = pub.keywords.some((k) => k.toLowerCase().includes(q));
        const matchesDoi = pub.doi.toLowerCase().includes(q);
        const matchesGrant = pub.grantFunding?.grantNumber.toLowerCase().includes(q) || false;
        const matchesVenue = pub.journalOrVenue.toLowerCase().includes(q);

        if (!matchesTitle && !matchesSubtitle && !matchesAbstract && !matchesTopic && !matchesKeyword && !matchesDoi && !matchesGrant && !matchesVenue) {
          return false;
        }
      }

      // Topic Filter
      if (selectedTopic !== 'All Topics' && !pub.topics.includes(selectedTopic)) {
        return false;
      }

      // Type Filter
      if (selectedType !== 'all' && pub.type !== selectedType) {
        return false;
      }

      // Interactive Only Filter
      if (onlyInteractive && !pub.openScience.hasInteractiveSim) {
        return false;
      }

      return true;
    });

    // Sort Logic
    return result.sort((a, b) => {
      if (sortBy === 'citations') return b.metrics.citations - a.metrics.citations;
      if (sortBy === 'downloads') return b.metrics.downloads - a.metrics.downloads;
      return b.year - a.year;
    });
  }, [searchQuery, selectedTopic, selectedType, onlyInteractive, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedTopic('All Topics');
    setSelectedType('all');
    setOnlyInteractive(false);
    setSortBy('recent');
  };

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
      {/* Navigation Header */}
      <Navbar
        onOpenBenchmarks={() => setIsBenchmarkOpen(true)}
        onOpenArchitecture={() => setIsArchitectureOpen(true)}
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
        />
      ) : (
        <main className="flex-1">
          {/* Author Profile Banner */}
          <AuthorProfileBanner
            onOpenBenchmarks={() => setIsBenchmarkOpen(true)}
            onOpenArchitecture={() => setIsArchitectureOpen(true)}
            onOpenSubscribe={() => setIsSubscribeOpen(true)}
          />

          {/* Quick Benchmark Motivation Banner */}
          <section className="bg-amber-50/70 border-b border-amber-200/80 py-3.5 px-4 sm:px-8">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-amber-950">
                <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse"></span>
                <span>
                  <strong>Academic Benchmark Motivation:</strong> Platform architecture synthesized from in-depth research of top 10 publication engines (Nature, Science, Distill.pub, Our World in Data, arXiv, Cell, NobelPrize.org, IEEE Xplore, PLOS ONE, and Semantic Scholar).
                </span>
              </div>
              <button
                onClick={() => setIsBenchmarkOpen(true)}
                className="font-bold text-amber-900 hover:text-amber-950 underline flex items-center gap-1 shrink-0"
              >
                <span>Read Design Dossier</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </section>

          {/* Research Portfolio Body */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            {/* Spotlight Showcase of First Publication: Urban Heat Democratization */}
            <div className="mb-12 bg-gradient-to-br from-white via-[#FFFDF9] to-amber-50/50 border-2 border-amber-400/70 rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-amber-100/30 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

              <div className="relative z-10">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#0B192C] text-amber-300 flex items-center gap-1.5 shadow-2xs">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      Landmark Inaugural Publication
                    </span>
                    <span className="text-xs font-mono text-slate-500">Living Research Archive</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsArchitectureOpen(true)}
                      className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <Layers className="w-3.5 h-3.5 text-amber-800" />
                      <span>Metropolitan Dashboard Blueprint</span>
                    </button>
                  </div>
                </div>

                <div className="max-w-4xl">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-extrabold text-slate-900 leading-tight">
                    Democratizing Urban Heat Island Analytics: High-Resolution Thermal Disparity Mapping, Canopy Equity, and Benchmark-Guided Mitigation Scenarios
                  </h3>

                  <p className="mt-3 text-slate-700 text-sm sm:text-base leading-relaxed">
                    By <strong>Aarti Sri Ravikumar</strong> (ai-aarti.com & PCSS-II). An open-access paradigm addressing severe localized thermal exposure across Greater Boston and comparative metropolitan areas. Unifies Landsat 8/9 thermal radiometry, Sentinel-2 vegetative indices, and CDC Social Vulnerability demographic overlays into transparent, interactive browser-native D3.js simulations.
                  </p>

                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => handleReadPublication(PUBLICATIONS_DATA[0])}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-amber-900 text-white text-xs font-bold shadow-md transition-all"
                    >
                      <BookOpen className="w-4 h-4 text-amber-300" />
                      <span>Read Full Interactive Manuscript</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <a
                      href="https://urban-heat.ai-aarti.com/"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 text-xs font-semibold shadow-2xs transition-all"
                    >
                      <span>urban-heat.ai-aarti.com</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                    </a>

                    <a
                      href="https://github.com/aartisr/urban-heat-democratization"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 text-xs font-semibold shadow-2xs transition-all"
                    >
                      <GitBranch className="w-3.5 h-3.5" />
                      <span>GitHub: aartisr/urban-heat-democratization</span>
                    </a>
                  </div>
                </div>

                {/* Embedded Interactive D3 Quick Visualizer in Landmark Card */}
                <div className="mt-8 pt-6 border-t border-amber-200/80">
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-amber-900 mb-2">
                    Live Data Preview: D3 Metropolitan Heat Anomaly Engine
                  </div>
                  <MetropolitanHeatMap />
                </div>
              </div>
            </div>

            {/* Filterable Portfolio Section */}
            <section id="portfolio-section" className="mt-8">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-slate-200 pb-3">
                <div>
                  <h3 className="text-2xl font-serif font-bold text-slate-900">
                    Curated Publications & Academic Portfolio
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Peer-reviewed manuscripts, interactive living papers, research grant proposals, and computational policy briefs by Aarti Sri Ravikumar.
                  </p>
                </div>
              </div>

              {/* Search and Filters Bar */}
              <SearchAndFilter
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedTopic={selectedTopic}
                onTopicChange={setSelectedTopic}
                selectedType={selectedType}
                onTypeChange={setSelectedType}
                onlyInteractive={onlyInteractive}
                onToggleInteractive={() => setOnlyInteractive(!onlyInteractive)}
                sortBy={sortBy}
                onSortChange={setSortBy}
                totalResults={filteredPublications.length}
                onReset={handleResetFilters}
              />

              {/* Publication Grid */}
              {filteredPublications.length > 0 ? (
                <div className="space-y-6">
                  {filteredPublications.map((publication) => (
                    <PublicationCard
                      key={publication.id}
                      publication={publication}
                      onRead={handleReadPublication}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-white border border-dashed border-slate-300 rounded-2xl p-8">
                  <BookOpen className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                  <h4 className="text-base font-serif font-bold text-slate-800">
                    No publications match your criteria
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                    Try adjusting your search terms, removing filters, or resetting the view to display all research works.
                  </p>
                  <button
                    onClick={handleResetFilters}
                    className="mt-4 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800"
                  >
                    Reset All Filters
                  </button>
                </div>
              )}
            </section>

            {/* Academic Archival Section */}
            <section className="mt-16 bg-white border border-[#E2DCD5] rounded-3xl p-6 sm:p-10">
              <div className="max-w-3xl">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-800">
                  Research Vision & Methodology
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mt-1">
                  Advancing Open Planetary Resilience Computing
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm mt-3 leading-relaxed">
                  Aarti Sri Ravikumar's research operates at the confluence of physics-based satellite radiometry, complex systems percolation theory, and democratized open-access software. Each publication is backed by verified GitHub source code, reproducible Docker recipes, and transparent empirical datasets.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-6 border-t border-slate-100 text-xs">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="font-serif font-bold text-slate-900 text-sm mb-1">
                    Public Interest Research
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    Ensuring environmental justice communities possess verifiable, audit-grade temperature and canopy data to advocate for municipal investments.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="font-serif font-bold text-slate-900 text-sm mb-1">
                    Grant & Funding Proposals
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    Developing rigorous, audit-grade research proposals and open methodologies aimed at climate resilience and environmental justice funding.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="font-serif font-bold text-slate-900 text-sm mb-1">
                    D3.js Computational Visuals
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    Browser-native reactive visualizations replacing static PDFs with explorable, mathematically rigorous thermodynamic models.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </main>
      )}

      {/* Footer */}
      <footer className="bg-[#0B192C] text-slate-300 border-t border-slate-800 py-12 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-800">
            {/* Col 1 */}
            <div className="space-y-3 md:col-span-2">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-amber-400 text-slate-950 font-serif font-bold flex items-center justify-center text-xs">
                  ASR
                </span>
                <span className="font-serif font-bold text-base text-white">
                  Aarti Sri Ravikumar Academic Archive
                </span>
              </div>
              <p className="text-slate-400 text-xs max-w-md leading-relaxed">
                The official academic repository and research portfolio of Aarti Sri Ravikumar. Dedicated to public-interest climate resilience, satellite radiometry downscaling, and urban heat democratization.
              </p>
              <div className="text-[11px] text-slate-400">
                Principal Investigator: <strong className="text-white">ai-aarti.com</strong> • PCSS-II
              </div>
            </div>

            {/* Col 2 */}
            <div className="space-y-2">
              <div className="font-serif font-bold text-white text-xs uppercase tracking-wider">
                Research Repositories
              </div>
              <ul className="space-y-1.5 text-slate-400">
                <li>
                  <a
                    href="https://github.com/aartisr/urban-heat-democratization"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-amber-300 transition-colors flex items-center gap-1"
                  >
                    <span>urban-heat-democratization</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://urban-heat.ai-aarti.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-amber-300 transition-colors flex items-center gap-1"
                  >
                    <span>urban-heat.ai-aarti.com</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://ai-aarti.com"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-amber-300 transition-colors flex items-center gap-1"
                  >
                    <span>ai-aarti.com (Official Site)</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 3 */}
            <div className="space-y-2">
              <div className="font-serif font-bold text-white text-xs uppercase tracking-wider">
                Academic Actions
              </div>
              <ul className="space-y-1.5 text-slate-400">
                <li>
                  <button
                    onClick={() => setIsBenchmarkOpen(true)}
                    className="hover:text-amber-300 transition-colors text-left"
                  >
                    Top 10 Journals Design Dossier
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setIsArchitectureOpen(true)}
                    className="hover:text-amber-300 transition-colors text-left"
                  >
                    Dashboard Architecture Specification
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setIsSubscribeOpen(true)}
                    className="hover:text-amber-300 transition-colors text-left"
                  >
                    Subscribe for Research Alerts
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-400 text-[11px]">
            <div>
              &copy; {new Date().getFullYear()} Aarti Sri Ravikumar. All rights reserved. Open Science CC-BY-4.0.
            </div>
            <div className="flex items-center gap-3">
              <span>Indexed on Google Scholar</span>
              <span>•</span>
              <span>Zenodo Open Archive</span>
              <span>•</span>
              <span>ORCID Verified</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Global Modals */}
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
