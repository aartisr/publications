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
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
        {/* Metric 1: Total Publications */}
        <div className="flex flex-col justify-center px-2 py-1">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <BookOpen className="w-3.5 h-3.5 text-amber-700" />
            <span>Research Works</span>
          </div>
          <div className="text-xl sm:text-2xl font-serif font-bold text-slate-900 mt-0.5">
            {metrics.totalPublications}
          </div>
          <div className="text-[10px] text-slate-400">Continuous living archive</div>
        </div>

        {/* Metric 2: Open Science Rate */}
        <div className="flex flex-col justify-center px-2 py-1 pt-3 sm:pt-1">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <Code className="w-3.5 h-3.5 text-emerald-700" />
            <span>Open Science Rate</span>
          </div>
          <div className="text-xl sm:text-2xl font-serif font-bold text-emerald-700 mt-0.5">
            {metrics.openCodePercent}%
          </div>
          <div className="text-[10px] text-slate-400">Public GitHub & datasets</div>
        </div>

        {/* Metric 3: GitHub Codebases */}
        <div className="flex flex-col justify-center px-2 py-1 pt-3 sm:pt-1">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <Quote className="w-3.5 h-3.5 text-blue-700" />
            <span>GitHub Repos</span>
          </div>
          <div className="text-xl sm:text-2xl font-serif font-bold text-slate-900 mt-0.5">
            {metrics.totalGitHubRepos}
          </div>
          <div className="text-[10px] text-slate-400">Verified open-source code</div>
        </div>

        {/* Metric 4: Interactive Simulators */}
        <div className="flex flex-col justify-center px-2 py-1 pt-3 sm:pt-1">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-purple-700" />
            <span>D3 Simulators</span>
          </div>
          <div className="text-xl sm:text-2xl font-serif font-bold text-slate-900 mt-0.5">
            {metrics.totalD3Simulators}
          </div>
          <div className="text-[10px] text-slate-400">Interactive web models</div>
        </div>

        {/* Metric 5: Accessibility Languages */}
        <div className="flex flex-col justify-center px-2 py-1 pt-3 sm:pt-1">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
            <span>Accessibility</span>
          </div>
          <div className="text-xl sm:text-2xl font-serif font-bold text-slate-900 mt-0.5">
            10-Lang
          </div>
          <div className="text-[10px] text-slate-400">Universal translations</div>
        </div>
      </div>
    </section>
  );
};
