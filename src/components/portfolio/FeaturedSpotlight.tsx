import React from 'react';
import { Publication } from '../../types';
import { MetropolitanHeatMap } from '../charts/MetropolitanHeatMap';
import { BookOpen, ExternalLink, GitBranch, Layers, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

interface FeaturedSpotlightProps {
  publication: Publication;
  onRead: (pub: Publication) => void;
  onOpenMathDeepDive: () => void;
  onOpenArchitecture: () => void;
}

export const FeaturedSpotlight: React.FC<FeaturedSpotlightProps> = ({
  publication,
  onRead,
  onOpenMathDeepDive,
  onOpenArchitecture
}) => {
  return (
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
              onClick={onOpenMathDeepDive}
              className="px-3 py-1.5 rounded-lg bg-amber-100 hover:bg-amber-200 border border-amber-300 text-amber-950 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>Mathematical & Spectral Proofs</span>
            </button>

            <button
              onClick={onOpenArchitecture}
              className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Layers className="w-3.5 h-3.5 text-amber-800" />
              <span>Metropolitan Dashboard Blueprint</span>
            </button>
          </div>
        </div>

        <div className="max-w-4xl">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-extrabold text-slate-900 leading-tight">
            {publication.title}
          </h3>

          {publication.subtitle && (
            <p className="font-serif text-base sm:text-lg text-slate-700 italic mt-2 leading-snug">
              {publication.subtitle}
            </p>
          )}

          <p className="mt-3 text-slate-700 text-sm sm:text-base leading-relaxed">
            By <strong>{publication.authors[0].name}</strong> ({publication.authors[0].affiliation}). An open-access paradigm addressing severe localized thermal exposure across Greater Boston and comparative metropolitan areas. Unifies Landsat 8/9 thermal radiometry, Sentinel-2 vegetative indices, and CDC Social Vulnerability demographic overlays into transparent, interactive browser-native D3.js simulations.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onRead(publication)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-amber-900 text-white text-xs font-bold shadow-md transition-all"
            >
              <BookOpen className="w-4 h-4 text-amber-300" />
              <span>Read Full Interactive Manuscript</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {publication.openScience?.liveUrl && (
              <a
                href={publication.openScience.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 text-xs font-semibold shadow-2xs transition-all"
              >
                <span>urban-heat.ai-aarti.com</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>
            )}

            {publication.openScience?.githubUrl && (
              <a
                href={publication.openScience.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 text-xs font-semibold shadow-2xs transition-all"
              >
                <GitBranch className="w-3.5 h-3.5" />
                <span>GitHub Repository</span>
              </a>
            )}
          </div>
        </div>

        {/* Embedded Interactive D3 Quick Visualizer */}
        <div className="mt-8 pt-6 border-t border-amber-200/80">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-amber-900 mb-2">
            Live Data Preview: D3 Metropolitan Heat Anomaly Engine
          </div>
          <MetropolitanHeatMap />
        </div>
      </div>
    </div>
  );
};
