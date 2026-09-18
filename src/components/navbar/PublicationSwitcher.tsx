import React, { useState, useRef, useEffect } from 'react';
import { BookOpen, ChevronDown, Sparkles, ExternalLink, Download, Search, Check, Layers, ShieldCheck, Globe } from 'lucide-react';
import { Publication } from '../../types';

interface PublicationSwitcherProps {
  publications: Publication[];
  selectedPublication: Publication;
  onSelectPublication: (pub: Publication) => void;
  onOpenDownload?: (pub: Publication) => void;
}

export const PublicationSwitcher: React.FC<PublicationSwitcherProps> = ({
  publications,
  selectedPublication,
  onSelectPublication,
  onOpenDownload
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const filteredPubs = publications.filter(p => 
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.category?.toLowerCase().includes(search.toLowerCase()) ||
    p.topics.some(t => t.toLowerCase().includes(search.toLowerCase()))
  );

  // Group by category
  const categories = Array.from(new Set(publications.map(p => p.category || 'General Publications')));

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Selector Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
          isOpen
            ? 'bg-slate-900 text-amber-300 border-slate-900 shadow-xs'
            : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-300 shadow-2xs'
        }`}
        aria-expanded={isOpen}
        aria-label="Publications Menu"
      >
        <BookOpen className="w-3.5 h-3.5 text-amber-700 shrink-0" />
        <span>Publications</span>
        <span className="px-1.5 py-0.2 rounded-full bg-slate-100 text-slate-700 text-[10px] font-mono font-bold shrink-0">
          {publications.length}
        </span>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform shrink-0 ${isOpen ? 'rotate-180 text-amber-300' : ''}`} />
      </button>

      {/* Popover Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 sm:left-auto right-0 mt-2 w-[92vw] sm:w-[480px] md:w-[540px] bg-white rounded-2xl shadow-2xl border border-slate-200 py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150 overflow-hidden">
          {/* Header & Search */}
          <div className="px-4 pb-2.5 border-b border-slate-100 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                Select Monograph or Research Paper ({publications.length})
              </span>
              <span className="text-[10px] font-mono text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Peer-Reviewed Archive
              </span>
            </div>

            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Filter by title, category, or topic..."
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-slate-900 placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* List of Publications */}
          <div className="max-h-[380px] overflow-y-auto p-2 space-y-3 divide-y divide-slate-100">
            {categories.map((cat) => {
              const categoryPubs = filteredPubs.filter(p => (p.category || 'General Publications') === cat);
              if (categoryPubs.length === 0) return null;

              return (
                <div key={cat} className="pt-2 first:pt-0 space-y-1.5">
                  <div className="px-2 text-[10px] font-mono uppercase tracking-wider text-amber-900 font-bold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    {cat}
                  </div>

                  {categoryPubs.map((pub) => {
                    const isSelected = pub.id === selectedPublication.id;
                    return (
                      <div
                        key={pub.id}
                        className={`p-3 rounded-xl transition-all border text-left group flex flex-col gap-2 ${
                          isSelected
                            ? 'bg-amber-50/90 border-amber-300/80 shadow-xs'
                            : 'bg-white hover:bg-slate-50/90 border-slate-200/80'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <button
                            onClick={() => {
                              onSelectPublication(pub);
                              setIsOpen(false);
                            }}
                            className="flex-1 text-left group-hover:text-amber-900 transition-colors"
                          >
                            <div className="flex items-center gap-1.5 mb-1">
                              {isSelected ? (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-200 text-amber-950 font-mono text-[10px] font-bold">
                                  <Check className="w-3 h-3 text-amber-800" />
                                  Currently Viewing
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-mono text-[10px] font-medium">
                                  {pub.type} • {pub.year}
                                </span>
                              )}
                              <span className="text-[10px] font-mono text-slate-500">
                                {pub.journalOrVenue.split('&')[0]}
                              </span>
                            </div>

                            <h4 className="text-xs font-serif font-bold text-slate-900 leading-snug line-clamp-2">
                              {pub.title}
                            </h4>
                          </button>
                        </div>

                        {/* Action buttons inside card */}
                        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-200/60 text-[11px]">
                          <div className="flex items-center gap-2 text-slate-500 font-mono text-[10px]">
                            <span>{pub.metrics.citations} Citations</span>
                            <span>•</span>
                            <span>{pub.metrics.downloads.toLocaleString()} Downloads</span>
                          </div>

                          <div className="flex items-center gap-2">
                            {pub.openScience.liveUrl && (
                              <a
                                href={pub.openScience.liveUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 px-2 py-1 rounded bg-teal-50 hover:bg-teal-100 text-teal-900 border border-teal-200 font-bold text-[10px]"
                                title="Open Live Platform"
                              >
                                <span>Live App</span>
                                <ExternalLink className="w-2.5 h-2.5" />
                              </a>
                            )}

                            {onOpenDownload && (
                              <button
                                onClick={() => {
                                  onOpenDownload(pub);
                                  setIsOpen(false);
                                }}
                                className="inline-flex items-center gap-1 px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 font-semibold text-[10px]"
                              >
                                <Download className="w-2.5 h-2.5 text-slate-600" />
                                <span>PDF/MD</span>
                              </button>
                            )}

                            <button
                              onClick={() => {
                                onSelectPublication(pub);
                                setIsOpen(false);
                              }}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#0B192C] hover:bg-slate-800 text-amber-300 font-bold text-[10px]"
                            >
                              <span>Read Monograph</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}

            {filteredPubs.length === 0 && (
              <div className="p-6 text-center text-xs text-slate-500">
                No publications found matching "{search}".
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
