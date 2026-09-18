import React, { useState } from 'react';
import { Publication } from '../../types';
import { BookOpen, ExternalLink, GitBranch, Quote, Check, Sparkles, ArrowRight } from 'lucide-react';

interface CompactPublicationTableProps {
  publications: Publication[];
  onRead: (pub: Publication) => void;
}

export const CompactPublicationTable: React.FC<CompactPublicationTableProps> = ({
  publications,
  onRead
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyBibtex = (pub: Publication, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(pub.bibtex);
    setCopiedId(pub.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="bg-white border border-[#E2DCD5] rounded-2xl overflow-hidden shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-serif font-bold uppercase tracking-wider text-[11px]">
            <tr>
              <th className="py-3.5 px-4 sm:px-6">Publication & Authors</th>
              <th className="py-3.5 px-4 hidden md:table-cell">Venue / Journal</th>
              <th className="py-3.5 px-3 text-center">Type</th>
              <th className="py-3.5 px-3 text-center hidden sm:table-cell">Year</th>
              <th className="py-3.5 px-3 text-center hidden lg:table-cell">Metrics</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {publications.map((pub) => {
              const isFeatured = pub.id === 'pub-urban-heat-01';
              return (
                <tr
                  key={pub.id}
                  onClick={() => onRead(pub)}
                  className={`hover:bg-amber-50/40 cursor-pointer transition-colors ${
                    isFeatured ? 'bg-amber-50/20' : ''
                  }`}
                >
                  {/* Title & Author */}
                  <td className="py-4 px-4 sm:px-6 max-w-md">
                    <div className="flex items-start gap-2">
                      {isFeatured && (
                        <span className="shrink-0 mt-0.5 px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-bold">
                          ★ Landmark
                        </span>
                      )}
                      <div>
                        <div className="font-serif font-bold text-slate-900 hover:text-amber-900 text-sm sm:text-base leading-snug">
                          {pub.title}
                        </div>
                        <div className="text-slate-500 text-[11px] mt-1 flex flex-wrap items-center gap-1">
                          <span>By: {pub.authors.map((a) => a.name).join(', ')}</span>
                          <span className="text-slate-300">•</span>
                          <span className="font-mono text-slate-400">DOI: {pub.doi}</span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Venue */}
                  <td className="py-4 px-4 hidden md:table-cell text-slate-700 font-serif italic text-xs max-w-xs">
                    {pub.journalOrVenue}
                  </td>

                  {/* Type Badge */}
                  <td className="py-4 px-3 text-center whitespace-nowrap">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                        pub.type === 'interactive_paper'
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : pub.type === 'grant_proposal'
                          ? 'bg-purple-100 text-purple-900 border border-purple-300'
                          : pub.type === 'policy_brief'
                          ? 'bg-blue-100 text-blue-900 border border-blue-300'
                          : 'bg-slate-100 text-slate-800'
                      }`}
                    >
                      {pub.status}
                    </span>
                  </td>

                  {/* Year */}
                  <td className="py-4 px-3 text-center font-mono text-slate-700 hidden sm:table-cell">
                    {pub.year}
                  </td>

                  {/* Metrics */}
                  <td className="py-4 px-3 text-center hidden lg:table-cell">
                    <div className="flex items-center justify-center gap-2 text-[11px] text-slate-600 font-mono">
                      <span><strong>{pub.metrics?.citations || 0}</strong> cite</span>
                      <span>•</span>
                      <span><strong>{pub.metrics?.downloads || 0}</strong> dl</span>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-4 text-right whitespace-nowrap">
                    <div className="inline-flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={(e) => handleCopyBibtex(pub, e)}
                        className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs transition-colors"
                        title="Copy BibTeX Citation"
                      >
                        {copiedId === pub.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Quote className="w-3.5 h-3.5 text-slate-600" />
                        )}
                      </button>

                      {pub.openScience?.githubUrl && (
                        <a
                          href={pub.openScience.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs transition-colors"
                          title="View Source Code on GitHub"
                        >
                          <GitBranch className="w-3.5 h-3.5" />
                        </a>
                      )}

                      <button
                        onClick={() => onRead(pub)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-amber-900 text-white text-xs font-semibold shadow-2xs transition-colors"
                      >
                        <span>Read</span>
                        <ArrowRight className="w-3 h-3 text-amber-300" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
