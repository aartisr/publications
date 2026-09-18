import React, { useState, useMemo } from 'react';
import { Publication } from '../../types';
import { publicationService } from '../../services/publicationService';
import { AuthorProfileBanner } from '../AuthorProfileBanner';
import { PortfolioMetricsRibbon } from '../portfolio/PortfolioMetricsRibbon';
import { FeaturedSpotlight } from '../portfolio/FeaturedSpotlight';
import { SearchAndFilter } from '../SearchAndFilter';
import { PublicationCard } from '../PublicationCard';
import { CompactPublicationTable } from '../portfolio/CompactPublicationTable';
import { EmptySearchResults } from '../portfolio/EmptySearchResults';
import { ResearchVisionSection } from '../portfolio/ResearchVisionSection';
import { GlobalCommunityBanner } from '../community/GlobalCommunityBanner';
import { ChevronRight, Globe, Heart } from 'lucide-react';

interface PortfolioViewProps {
  onReadPublication: (pub: Publication) => void;
  onOpenBenchmarks: () => void;
  onOpenArchitecture: () => void;
  onOpenMathDeepDive: () => void;
  onOpenSubscribe: () => void;
  onOpenDiscoverability: () => void;
  onOpenGlobalCommunity: (tab?: 'world-impact' | 'translations' | 'action-kit' | 'sdgs' | 'amplifier') => void;
  onOpenDownload?: (pub: Publication) => void;
}

export const PortfolioView: React.FC<PortfolioViewProps> = ({
  onReadPublication,
  onOpenBenchmarks,
  onOpenArchitecture,
  onOpenMathDeepDive,
  onOpenSubscribe,
  onOpenDiscoverability,
  onOpenGlobalCommunity,
  onOpenDownload
}) => {
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('All Topics');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedVenue, setSelectedVenue] = useState('All Venues');
  const [selectedYear, setSelectedYear] = useState('All Years');
  const [onlyInteractive, setOnlyInteractive] = useState(false);
  const [sortBy, setSortBy] = useState<'recent' | 'citations' | 'downloads' | 'title'>('recent');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Dynamic Taxonomy & Metrics from Service
  const availableTopics = useMemo(() => publicationService.getTopics(), []);
  const availableVenues = useMemo(() => publicationService.getVenues(), []);
  const availableYears = useMemo(() => publicationService.getYears(), []);
  const globalMetrics = useMemo(() => publicationService.getMetrics(), []);
  const featuredPublication = useMemo(() => publicationService.getFeaturedPublication(), []);

  // Filtered publications
  const filteredPublications = useMemo(() => {
    return publicationService.filterPublications({
      searchQuery,
      topic: selectedTopic,
      type: selectedType,
      venue: selectedVenue,
      year: selectedYear,
      onlyInteractive,
      sortBy
    });
  }, [searchQuery, selectedTopic, selectedType, selectedVenue, selectedYear, onlyInteractive, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedTopic('All Topics');
    setSelectedType('all');
    setSelectedVenue('All Venues');
    setSelectedYear('All Years');
    setOnlyInteractive(false);
    setSortBy('recent');
  };

  return (
    <main className="flex-1">
      {/* Author Profile Banner */}
      <AuthorProfileBanner
        onOpenBenchmarks={onOpenBenchmarks}
        onOpenArchitecture={onOpenArchitecture}
        onOpenMathDeepDive={onOpenMathDeepDive}
        onOpenSubscribe={onOpenSubscribe}
        onOpenDiscoverability={onOpenDiscoverability}
        onOpenGlobalCommunity={onOpenGlobalCommunity}
      />

      {/* Benchmark Motivation Ribbon */}
      <section className="bg-amber-50/70 border-b border-amber-200/80 py-3 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-amber-950">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse shrink-0"></span>
            <span>
              <strong>Academic Publication Standards & AI Discoverability:</strong> Modeled after the top 10 peer-reviewed scientific journals with full <strong>GEO / AIO / AEI / Highwire Press / Schema.org</strong> machine-readability and Vercel hosting readiness.
            </span>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onOpenGlobalCommunity('world-impact')}
              className="font-bold text-teal-900 hover:text-teal-950 underline flex items-center gap-1"
            >
              <Globe className="w-3.5 h-3.5 text-teal-700" />
              <span>Global Reach (10 Langs)</span>
            </button>
            <span className="text-amber-300">•</span>
            <button
              onClick={onOpenDiscoverability}
              className="font-bold text-emerald-900 hover:text-emerald-950 underline flex items-center gap-1"
            >
              <span>AI Discoverability (100%)</span>
            </button>
            <span className="text-amber-300">•</span>
            <button
              onClick={onOpenBenchmarks}
              className="font-bold text-amber-900 hover:text-amber-950 underline flex items-center gap-1"
            >
              <span>Top 10 Dossier</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Real-time Global Metrics Ribbon */}
        <PortfolioMetricsRibbon
          metrics={globalMetrics}
          onOpenMathDeepDive={onOpenMathDeepDive}
          onOpenBenchmarks={onOpenBenchmarks}
        />

        {/* Global Community & Worldwide Impact Callout Banner */}
        <GlobalCommunityBanner onOpenGlobalCommunity={onOpenGlobalCommunity} />

        {/* Featured Landmark Paper Spotlight (Only shown when not actively filtering) */}
        {!searchQuery && selectedTopic === 'All Topics' && selectedType === 'all' && (
          <FeaturedSpotlight
            publication={featuredPublication}
            onRead={onReadPublication}
            onOpenMathDeepDive={onOpenMathDeepDive}
            onOpenArchitecture={onOpenArchitecture}
            onOpenDownload={onOpenDownload}
          />
        )}

        {/* Filterable Publications Section */}
        <section id="portfolio-section" className="mt-8">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-slate-200 pb-3">
            <div>
              <h3 className="text-2xl font-serif font-bold text-slate-900">
                Curated Publications & Academic Portfolio
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Peer-reviewed manuscripts, interactive living papers, federal grant proposals, and computational policy briefs by Aarti Sri Ravikumar.
              </p>
            </div>
          </div>

          {/* Dynamic Search & Multi-Faceted Filters */}
          <SearchAndFilter
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedTopic={selectedTopic}
            onTopicChange={setSelectedTopic}
            selectedType={selectedType}
            onTypeChange={setSelectedType}
            selectedVenue={selectedVenue}
            onVenueChange={setSelectedVenue}
            selectedYear={selectedYear}
            onYearChange={setSelectedYear}
            onlyInteractive={onlyInteractive}
            onToggleInteractive={() => setOnlyInteractive(!onlyInteractive)}
            sortBy={sortBy}
            onSortChange={setSortBy}
            totalResults={filteredPublications.length}
            onReset={handleResetFilters}
            availableTopics={availableTopics}
            availableVenues={availableVenues}
            availableYears={availableYears}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />

          {/* Render Publications according to chosen view mode */}
          {filteredPublications.length > 0 ? (
            viewMode === 'grid' ? (
              <div className="space-y-6">
                {filteredPublications.map((publication) => (
                  <PublicationCard
                    key={publication.id}
                    publication={publication}
                    onRead={onReadPublication}
                    onOpenDownload={onOpenDownload}
                  />
                ))}
              </div>
            ) : (
              <CompactPublicationTable
                publications={filteredPublications}
                onRead={onReadPublication}
              />
            )
          ) : (
            <EmptySearchResults
              onReset={handleResetFilters}
              searchQuery={searchQuery}
            />
          )}
        </section>

        {/* Research Vision & Methodology Framework */}
        <ResearchVisionSection
          onOpenMathDeepDive={onOpenMathDeepDive}
          onOpenArchitecture={onOpenArchitecture}
        />
      </div>
    </main>
  );
};
