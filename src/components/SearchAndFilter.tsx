import React from 'react';
import { Search, Filter, X, SlidersHorizontal, Sparkles, LayoutGrid, Table, Check } from 'lucide-react';

interface SearchAndFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedTopic: string;
  onTopicChange: (topic: string) => void;
  selectedType: string;
  onTypeChange: (type: string) => void;
  selectedVenue?: string;
  onVenueChange?: (venue: string) => void;
  selectedYear?: string;
  onYearChange?: (year: string) => void;
  onlyInteractive: boolean;
  onToggleInteractive: () => void;
  sortBy: 'recent' | 'citations' | 'downloads' | 'title';
  onSortChange: (sort: 'recent' | 'citations' | 'downloads' | 'title') => void;
  totalResults: number;
  onReset: () => void;
  availableTopics?: string[];
  availableVenues?: string[];
  availableYears?: string[];
  viewMode?: 'grid' | 'table';
  onViewModeChange?: (mode: 'grid' | 'table') => void;
}

export const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  searchQuery,
  onSearchChange,
  selectedTopic,
  onTopicChange,
  selectedType,
  onTypeChange,
  selectedVenue = 'All Venues',
  onVenueChange,
  selectedYear = 'All Years',
  onYearChange,
  onlyInteractive,
  onToggleInteractive,
  sortBy,
  onSortChange,
  totalResults,
  onReset,
  availableTopics = [
    'All Topics',
    'Urban Climate & Heat',
    'Remote Sensing & AI',
    'Environmental Equity',
    'Grant Proposals & Whitepapers'
  ],
  availableVenues = ['All Venues'],
  availableYears = ['All Years'],
  viewMode = 'grid',
  onViewModeChange
}) => {
  const types = [
    { id: 'all', label: 'All Publication Types' },
    { id: 'interactive_paper', label: 'Interactive Living Papers (D3)' },
    { id: 'journal', label: 'Peer-Reviewed Journals' },
    { id: 'grant_proposal', label: 'Funded Grant Proposals' },
    { id: 'policy_brief', label: 'Policy Briefs' }
  ];

  const isFiltered =
    searchQuery !== '' ||
    selectedTopic !== 'All Topics' ||
    selectedType !== 'all' ||
    selectedVenue !== 'All Venues' ||
    selectedYear !== 'All Years' ||
    onlyInteractive;

  return (
    <div className="bg-white border border-[#E2DCD5] rounded-2xl p-4 sm:p-5 shadow-xs my-8">
      {/* Primary Search Input */}
      <div className="relative">
        <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search research across titles, abstracts, DOIs, Cheeger cuts, Landsat radiometry, Boston, GMRF..."
          className="w-full pl-11 pr-10 py-3 rounded-xl border border-slate-200 bg-slate-50/70 text-slate-900 placeholder:text-slate-400 text-sm focus:bg-white focus:ring-2 focus:ring-amber-800 focus:outline-hidden transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
            title="Clear search query"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Dynamic Topic Filter Pills */}
      <div className="mt-4 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mr-2 shrink-0">
          Domain:
        </span>
        {availableTopics.map((topic) => (
          <button
            key={topic}
            onClick={() => onTopicChange(topic)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
              selectedTopic === topic
                ? 'bg-slate-900 text-white font-semibold shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {topic}
          </button>
        ))}
      </div>

      {/* Multi-Faceted Secondary Controls */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col lg:flex-row lg:items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          {/* Document Type Dropdown */}
          <select
            value={selectedType}
            onChange={(e) => onTypeChange(e.target.value)}
            className="bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-800 font-medium focus:ring-1 focus:ring-amber-800"
          >
            {types.map((t) => (
              <option key={t.id} value={t.id}>
                {t.label}
              </option>
            ))}
          </select>

          {/* Dynamic Year Filter Dropdown if multiple years exist */}
          {availableYears.length > 2 && onYearChange && (
            <select
              value={selectedYear}
              onChange={(e) => onYearChange(e.target.value)}
              className="bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 font-medium"
            >
              {availableYears.map((yr) => (
                <option key={yr} value={yr}>
                  {yr === 'All Years' ? 'All Years' : `Year ${yr}`}
                </option>
              ))}
            </select>
          )}

          {/* Interactive Only Toggle */}
          <button
            onClick={onToggleInteractive}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all ${
              onlyInteractive
                ? 'bg-amber-100 border-amber-400 text-amber-900 font-semibold'
                : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Interactive Living Papers</span>
          </button>
        </div>

        {/* View Mode Toggle, Sorting & Results Count */}
        <div className="flex flex-wrap items-center justify-between lg:justify-end gap-3 text-slate-600">
          {/* Grid vs Table View Mode Switcher */}
          {onViewModeChange && (
            <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
              <button
                onClick={() => onViewModeChange('grid')}
                className={`p-1.5 rounded-md flex items-center gap-1 text-xs transition-all ${
                  viewMode === 'grid'
                    ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                title="Curated Card Grid View"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Cards</span>
              </button>
              <button
                onClick={() => onViewModeChange('table')}
                className={`p-1.5 rounded-md flex items-center gap-1 text-xs transition-all ${
                  viewMode === 'table'
                    ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                title="Compact Index Table View"
              >
                <Table className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Index Table</span>
              </button>
            </div>
          )}

          <div className="flex items-center gap-1.5">
            <span className="text-slate-500">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as any)}
              className="bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 font-medium"
            >
              <option value="recent">Most Recent</option>
              <option value="citations">Most Cited</option>
              <option value="downloads">Most Downloaded</option>
              <option value="title">Alphabetical (A-Z)</option>
            </select>
          </div>

          <div className="text-slate-600">
            Showing <strong className="text-slate-900 font-semibold">{totalResults}</strong> publication{totalResults === 1 ? '' : 's'}
          </div>

          {isFiltered && (
            <button
              onClick={onReset}
              className="text-amber-800 hover:text-amber-950 font-semibold underline ml-1"
            >
              Reset
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
