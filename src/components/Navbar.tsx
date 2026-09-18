import React from 'react';
import { Award, BookOpen, Layers, Bell, ExternalLink, Code, Search, Sparkles, Sigma } from 'lucide-react';

interface NavbarProps {
  onOpenBenchmarks: () => void;
  onOpenArchitecture: () => void;
  onOpenMathDeepDive: () => void;
  onOpenSubscribe: () => void;
  onOpenDiscoverability: () => void;
  activeView: 'portfolio' | 'reader';
  onToggleView: (view: 'portfolio' | 'reader') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBenchmarks,
  onOpenArchitecture,
  onOpenMathDeepDive,
  onOpenSubscribe,
  onOpenDiscoverability,
  activeView,
  onToggleView
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E2DCD5] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand / Scholarly Identity */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onToggleView('portfolio')}
              className="text-left group"
            >
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-[#0B192C] text-amber-400 flex items-center justify-center font-serif font-bold text-base border border-amber-500/40 shadow-xs">
                  ASR
                </span>
                <div>
                  <h1 className="font-serif font-bold text-lg sm:text-xl tracking-tight text-slate-900 group-hover:text-amber-900 transition-colors">
                    Aarti Sri Ravikumar
                  </h1>
                  <p className="text-[11px] font-sans text-slate-500 tracking-wider uppercase font-medium">
                    Planetary Resilience • Urban Heat Democratization
                  </p>
                </div>
              </div>
            </button>
          </div>

          {/* Navigation & Action Triggers */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Discoverability / AI Citations & GEO Button */}
            <button
              onClick={onOpenDiscoverability}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold transition-all shadow-2xs"
              title="Inspect automated SEO, GEO, AIO, Highwire Press, and /llms.txt AI citation readiness"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              <span className="hidden md:inline">AI & Discoverability</span>
              <span className="md:hidden">SEO/AI</span>
            </button>

            {/* Math Deep Dive Theoretical Defense Button */}
            <button
              onClick={onOpenMathDeepDive}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-100/80 hover:bg-amber-200 text-amber-950 border border-amber-300 text-xs font-bold transition-all shadow-2xs"
              title="Inspect complete graph Laplacians, Cheeger cuts, and percolation mathematics"
            >
              <Sigma className="w-3.5 h-3.5 text-amber-800" />
              <span className="hidden sm:inline">Math & Spectral Proofs</span>
              <span className="sm:hidden">Math</span>
            </button>

            {/* Top 10 Design Features Motivation Button */}
            <button
              onClick={onOpenBenchmarks}
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 text-xs font-semibold transition-all shadow-2xs"
              title="Compare top 10 academic publication design features"
            >
              <Award className="w-3.5 h-3.5 text-amber-700" />
              <span>Top 10 Journals</span>
            </button>

            {/* Dashboard Architecture Button */}
            <button
              onClick={onOpenArchitecture}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 text-xs font-semibold transition-all shadow-2xs"
              title="View metropolitan thermal intensity dashboard architecture"
            >
              <Layers className="w-3.5 h-3.5 text-slate-600" />
              <span>Dashboard Architecture</span>
            </button>

            {/* External Research Live Link */}
            <a
              href="https://urban-heat.ai-aarti.com/"
              target="_blank"
              rel="noreferrer"
              className="hidden xl:inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-medium transition-all"
            >
              <span>urban-heat.ai-aarti.com</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>

            {/* GitHub Repo */}
            <a
              href="https://github.com/aartisr/urban-heat-democratization"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-medium transition-all"
              title="GitHub: aartisr/urban-heat-democratization"
            >
              <Code className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">GitHub</span>
            </a>

            {/* Subscribe Action */}
            <button
              onClick={onOpenSubscribe}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#0B192C] hover:bg-slate-800 text-amber-300 text-xs font-semibold shadow-xs transition-all"
            >
              <Bell className="w-3.5 h-3.5 text-amber-400" />
              <span>Subscribe</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
