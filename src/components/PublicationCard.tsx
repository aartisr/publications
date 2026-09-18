import React, { useState } from 'react';
import { Publication } from '../types';
import { BookOpen, ExternalLink, GitBranch, Quote, Check, Sparkles, Download, Eye, FileText, ArrowRight, ShieldCheck } from 'lucide-react';

interface PublicationCardProps {
  publication: Publication;
  onRead: (pub: Publication) => void;
  onOpenDownload?: (pub: Publication) => void;
}

export const PublicationCard: React.FC<PublicationCardProps> = ({ publication, onRead, onOpenDownload }) => {
  const [copiedBibtex, setCopiedBibtex] = useState(false);
  const [showBibtexModal, setShowBibtexModal] = useState(false);

  const handleCopyBibtex = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(publication.bibtex);
    setCopiedBibtex(true);
    setTimeout(() => setCopiedBibtex(false), 2000);
  };

  const isPrimaryUrbanHeat = publication.id === 'pub-urban-heat-01';

  return (
    <article
      id={`pub-card-${publication.id}`}
      className={`bg-white border rounded-2xl p-6 sm:p-7 transition-all duration-200 relative ${
        isPrimaryUrbanHeat
          ? 'border-amber-400/80 shadow-md ring-1 ring-amber-400/30'
          : 'border-[#E2DCD5] hover:border-slate-400/80 shadow-xs'
      }`}
    >
      {/* Featured Star Header for Primary Landmark Paper */}
      {isPrimaryUrbanHeat && (
        <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-900 bg-amber-100/90 border border-amber-300 px-3 py-1 rounded-full w-fit mb-4">
          <Sparkles className="w-3.5 h-3.5 text-amber-700" />
          <span>Featured Landmark Research • Urban Heat Democratization</span>
        </div>
      )}

      {/* Meta Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 mb-2">
        <div className="flex items-center gap-2">
          <span className="font-serif italic text-amber-900 font-medium">
            {publication.journalOrVenue}
          </span>
          <span>•</span>
          <span className="font-mono">{publication.date}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className={`px-2.5 py-0.5 rounded-full font-medium ${
            publication.type === 'interactive_paper'
              ? 'bg-amber-100 text-amber-900 border border-amber-300'
              : publication.type === 'grant_proposal'
              ? 'bg-purple-100 text-purple-900 border border-purple-300'
              : 'bg-slate-100 text-slate-800'
          }`}>
            {publication.status}
          </span>
          <span className="font-mono text-slate-400">DOI: {publication.doi}</span>
        </div>
      </div>

      {/* Title & Subtitle */}
      <h3
        onClick={() => onRead(publication)}
        className="text-xl sm:text-2xl font-serif font-bold text-slate-900 hover:text-amber-900 cursor-pointer transition-colors leading-tight"
      >
        {publication.title}
      </h3>

      {publication.subtitle && (
        <p className="font-serif text-sm text-slate-600 italic mt-1 leading-snug">
          {publication.subtitle}
        </p>
      )}

      {/* Authors Row */}
      <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs">
        <span className="text-slate-500">Authors:</span>
        {publication.authors.map((author, idx) => (
          <span key={idx} className="font-semibold text-slate-800">
            {author.isPrimary ? (
              <span className="text-amber-900 underline decoration-amber-300 underline-offset-2">
                {author.name}*
              </span>
            ) : (
              author.name
            )}
            {idx < publication.authors.length - 1 ? ',' : ''}
          </span>
        ))}
        <span className="text-[11px] text-slate-400">(*Corresponding Investigator)</span>
      </div>

      {/* Abstract */}
      <p className="mt-4 text-slate-700 text-xs sm:text-sm leading-relaxed line-clamp-3">
        {publication.abstract}
      </p>

      {/* Grant Callout if applicable */}
      {publication.grantFunding && (
        <div className="mt-3 p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-slate-700">
            <span className="font-semibold text-slate-900">Grant Support:</span>
            <span>{publication.grantFunding.funder}</span>
            <span className="font-mono text-slate-500">({publication.grantFunding.grantNumber})</span>
          </div>
          <span className="font-bold text-purple-800">{publication.grantFunding.amount}</span>
        </div>
      )}

      {/* Topic Tags */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {publication.topics.map(topic => (
          <span key={topic} className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md text-[11px] font-medium">
            {topic}
          </span>
        ))}
      </div>

      {/* Open-Science Evidence & Features Bar */}
      <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex flex-wrap items-center gap-3 text-slate-600">
          {publication.openScience.hasCode && (
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold font-mono">
              <GitBranch className="w-3 h-3 text-emerald-700" />
              <span>Open Code</span>
            </div>
          )}
          {publication.openScience.hasData && (
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-50 text-blue-800 border border-blue-200 font-semibold font-mono">
              <FileText className="w-3 h-3 text-blue-700" />
              <span>Open Data</span>
            </div>
          )}
          {publication.openScience.hasInteractiveSim && (
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-purple-50 text-purple-800 border border-purple-200 font-semibold font-mono">
              <Sparkles className="w-3 h-3 text-purple-700" />
              <span>Interactive Sim</span>
            </div>
          )}
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200 font-semibold font-mono">
            <BookOpen className="w-3 h-3 text-amber-700" />
            <span>10 Languages</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {onOpenDownload && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenDownload(publication);
              }}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-950 text-xs font-semibold transition-colors"
              title="Download publication in PDF, Markdown, or BibTeX"
            >
              <Download className="w-3.5 h-3.5 text-amber-800" />
              <span>Download</span>
            </button>
          )}

          <button
            onClick={handleCopyBibtex}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs transition-colors"
            title="Copy BibTeX Citation"
          >
            {copiedBibtex ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Quote className="w-3.5 h-3.5" />}
            <span>{copiedBibtex ? 'Copied' : 'BibTeX'}</span>
          </button>

          {publication.openScience.githubUrl && (
            <a
              href={publication.openScience.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs transition-colors"
              title="GitHub Open Source Repository"
            >
              <GitBranch className="w-3.5 h-3.5" />
              <span>Code</span>
            </a>
          )}

          {publication.openScience.liveUrl && (
            <a
              href={publication.openScience.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs transition-colors"
              title="Visit Live Application"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live Tool</span>
            </a>
          )}

          <button
            onClick={() => onRead(publication)}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-slate-900 hover:bg-amber-900 text-white text-xs font-semibold shadow-2xs transition-all"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-300" />
            <span>Read Manuscript</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </article>
  );
};
