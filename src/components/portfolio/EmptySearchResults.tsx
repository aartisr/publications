import React from 'react';
import { BookOpen, RefreshCw } from 'lucide-react';

interface EmptySearchResultsProps {
  onReset: () => void;
  searchQuery?: string;
}

export const EmptySearchResults: React.FC<EmptySearchResultsProps> = ({
  onReset,
  searchQuery
}) => {
  return (
    <div className="text-center py-16 bg-white border border-dashed border-slate-300 rounded-2xl p-8">
      <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto mb-3 text-amber-800">
        <BookOpen className="w-6 h-6" />
      </div>
      <h4 className="text-base font-serif font-bold text-slate-900">
        No publications match your current criteria
      </h4>
      <p className="text-xs text-slate-500 mt-1.5 max-w-sm mx-auto leading-relaxed">
        {searchQuery ? (
          <>
            No records matched <strong className="text-slate-700 font-mono">"{searchQuery}"</strong>. Try broadening your keywords or removing active facet filters.
          </>
        ) : (
          'Try clearing domain tags, changing the publication type, or resetting filters to show all registered manuscripts.'
        )}
      </p>
      <button
        onClick={onReset}
        className="mt-5 inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold shadow-2xs transition-colors"
      >
        <RefreshCw className="w-3.5 h-3.5" />
        <span>Reset All Filters</span>
      </button>
    </div>
  );
};
