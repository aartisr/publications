import React from 'react';
import { GlobalResearchMetrics } from '../../services/publicationService';
import { BookOpen, Quote, Download, ShieldCheck, Code, Sparkles } from 'lucide-react';

interface PortfolioMetricsRibbonProps {
  metrics: GlobalResearchMetrics;
  onOpenMathDeepDive: () => void;
  onOpenBenchmarks: () => void;
}

export const PortfolioMetricsRibbon: React.FC<PortfolioMetricsRibbonProps> = ({
  metrics,
  onOpenMathDeepDive,
  onOpenBenchmarks
}) => {
  return (
    <section className="mb-8 bg-white border border-[#E2DCD5] rounded-2xl p-4 sm:p-5 shadow-xs">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
        {/* Metric 1: Total Publications */}
        <div className="flex flex-col justify-center px-2 py-1">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <BookOpen className="w-3.5 h-3.5 text-amber-700" />
            <span>Works Indexed</span>
          </div>
          <div className="text-xl sm:text-2xl font-serif font-bold text-slate-900 mt-0.5">
            {metrics.totalPublications}
          </div>
          <div className="text-[10px] text-slate-400">Continuous living archive</div>
        </div>

        {/* Metric 2: Citations */}
        <div className="flex flex-col justify-center px-2 py-1 pt-3 sm:pt-1">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <Quote className="w-3.5 h-3.5 text-blue-700" />
            <span>Total Citations</span>
          </div>
          <div className="text-xl sm:text-2xl font-serif font-bold text-slate-900 mt-0.5">
            {metrics.totalCitations}
          </div>
          <div className="text-[10px] text-emerald-700 font-medium">Verified academic DOIs</div>
        </div>

        {/* Metric 3: Downloads & Reprints */}
        <div className="flex flex-col justify-center px-2 py-1 pt-3 sm:pt-1">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <Download className="w-3.5 h-3.5 text-emerald-700" />
            <span>Manuscript Access</span>
          </div>
          <div className="text-xl sm:text-2xl font-serif font-bold text-slate-900 mt-0.5">
            {(metrics.totalDownloads / 1000).toFixed(1)}k+
          </div>
          <div className="text-[10px] text-slate-400">Global downloads</div>
        </div>

        {/* Metric 4: Open Code & Data */}
        <div className="flex flex-col justify-center px-2 py-1 pt-3 sm:pt-1">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <Code className="w-3.5 h-3.5 text-purple-700" />
            <span>Open Science Rate</span>
          </div>
          <div className="text-xl sm:text-2xl font-serif font-bold text-emerald-700 mt-0.5">
            {metrics.openCodePercent}%
          </div>
          <div className="text-[10px] text-slate-400">Public GitHub & data lakes</div>
        </div>

        {/* Metric 5: Peer-Reviewed & Grants */}
        <div className="flex flex-col justify-center px-2 py-1 pt-3 sm:pt-1">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
            <span>Peer-Reviewed</span>
          </div>
          <div className="text-xl sm:text-2xl font-serif font-bold text-slate-900 mt-0.5">
            {metrics.peerReviewedCount}
          </div>
          <div className="text-[10px] text-slate-400">Nature, IEEE, PNAS, HKS</div>
        </div>

        {/* Action Trigger / Math Shortcut */}
        <div className="flex flex-col justify-center px-2 py-1 pt-3 sm:pt-1 col-span-2 sm:col-span-1">
          <button
            onClick={onOpenMathDeepDive}
            className="w-full text-left p-2 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-950 transition-colors shadow-2xs group"
          >
            <div className="flex items-center gap-1 text-[11px] font-bold text-amber-900">
              <Sparkles className="w-3 h-3 text-amber-700" />
              <span>Spectral Theory</span>
            </div>
            <div className="text-[10px] text-amber-800/80 mt-0.5 font-medium leading-tight">
              Cheeger bounds & Math &rarr;
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};
