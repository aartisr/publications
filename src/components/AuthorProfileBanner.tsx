import React from 'react';
import { Award, BookOpen, ExternalLink, GitBranch, Layers, ShieldCheck, Sparkles, Globe, Mail, FileText, Sigma, Heart } from 'lucide-react';
import { publicationService } from '../services/publicationService';

interface AuthorProfileBannerProps {
  onOpenBenchmarks: () => void;
  onOpenArchitecture: () => void;
  onOpenMathDeepDive: () => void;
  onOpenSubscribe: () => void;
  onOpenDiscoverability: () => void;
  onOpenGlobalCommunity: (tab?: 'world-impact' | 'translations' | 'action-kit' | 'sdgs' | 'amplifier') => void;
}

export const AuthorProfileBanner: React.FC<AuthorProfileBannerProps> = ({
  onOpenBenchmarks,
  onOpenArchitecture,
  onOpenMathDeepDive,
  onOpenSubscribe,
  onOpenDiscoverability,
  onOpenGlobalCommunity
}) => {
  const metrics = publicationService.getMetrics();
  const maxAltmetric = Math.max(...publicationService.getAll().map(p => p.metrics?.altmetricScore || 0));

  return (
    <section className="bg-gradient-to-b from-[#FAF8F5] via-white to-[#FAF8F5] border-b border-[#E2DCD5] py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
          {/* Main Scholarly Bio & Framing */}
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-900 border border-rose-300">
                <Heart className="w-3.5 h-3.5 text-rose-600 fill-rose-500" /> For the Love of Community
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-purple-100/80 text-purple-900 border border-purple-300">
                <Sparkles className="w-3.5 h-3.5 text-purple-700" /> Digital Democracy & Game Theory
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100/80 text-amber-900 border border-amber-300">
                <Sparkles className="w-3.5 h-3.5 text-amber-700" /> Planetary Equity & Microclimates
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100/80 text-emerald-900 border border-emerald-300">
                100% Open Access & Verified Code
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Aarti Sri Ravikumar
            </h2>

            <div className="text-sm sm:text-base font-serif italic text-amber-900/90 mt-2">
              Founder & CEO, ai-aarti.com • Pioneer Charter School of Science II (PCSS-II)
            </div>

            <p className="mt-4 text-slate-700 leading-relaxed text-sm sm:text-base font-sans max-w-2xl">
              Pioneering open-access research at the intersection of game-theoretic digital democracy architecture, multi-objective Pareto policy optimization, planetary thermal equity, satellite radiometry downscaling, and spectral graph Laplacians. Equipping grassroots advocates, municipal leaders, and mentors with audit-grade, paywall-free scientific proof.
            </p>

            {/* Academic Badges & Direct Actions */}
            <div className="flex flex-wrap items-center gap-3 mt-6 pt-2">
              <button
                onClick={() => onOpenGlobalCommunity('world-impact')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-bold shadow-sm transition-all"
              >
                <Globe className="w-4 h-4 text-emerald-100" />
                <span>Global Community & 10 Languages</span>
              </button>

              <button
                onClick={onOpenDiscoverability}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-950 border border-emerald-400 text-xs font-bold shadow-xs transition-all"
              >
                <Sparkles className="w-4 h-4 text-emerald-700" />
                <span>AI Citations & SEO</span>
              </button>

              <button
                onClick={onOpenMathDeepDive}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-950 border border-amber-400/80 text-xs font-bold shadow-xs transition-all"
              >
                <Sigma className="w-4 h-4 text-amber-800" />
                <span>Math & Spectral Theory</span>
              </button>

              <button
                onClick={onOpenBenchmarks}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 text-xs font-semibold shadow-xs transition-all"
              >
                <Award className="w-4 h-4 text-amber-700" />
                <span>Top 10 Journals Study</span>
              </button>

              <a
                href="https://governanceapp.ai-aarti.com/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-950 border border-purple-300 text-xs font-semibold shadow-2xs transition-all"
              >
                <Globe className="w-3.5 h-3.5 text-purple-700" />
                <span>governanceapp.ai-aarti.com</span>
                <ExternalLink className="w-3 h-3 text-purple-400" />
              </a>

              <a
                href="https://urban-heat.ai-aarti.com/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-950 border border-teal-300 text-xs font-semibold shadow-2xs transition-all"
              >
                <Globe className="w-3.5 h-3.5 text-teal-700" />
                <span>urban-heat.ai-aarti.com</span>
                <ExternalLink className="w-3 h-3 text-teal-400" />
              </a>
            </div>
          </div>

          {/* Academic Impact Metrics Box */}
          <div className="w-full lg:w-80 bg-white border border-[#E2DCD5] rounded-2xl p-5 shadow-xs shrink-0">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold border-b border-slate-100 pb-2 flex items-center justify-between">
              <span>Open Science Metrics</span>
              <span className="text-emerald-700 font-semibold">2026 Archive</span>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-3">
              <div className="p-3 bg-[#FAF8F5] rounded-xl border border-slate-200/80 text-center">
                <div className="text-2xl font-serif font-bold text-slate-900">{metrics.totalPublications}</div>
                <div className="text-[11px] text-slate-500 uppercase tracking-wider mt-0.5">Active Works</div>
              </div>

              <div className="p-3 bg-[#FAF8F5] rounded-xl border border-slate-200/80 text-center">
                <div className="text-2xl font-serif font-bold text-amber-800">{metrics.totalGitHubRepos}</div>
                <div className="text-[11px] text-slate-500 uppercase tracking-wider mt-0.5">GitHub Repos</div>
              </div>

              <div className="p-3 bg-[#FAF8F5] rounded-xl border border-slate-200/80 text-center">
                <div className="text-2xl font-serif font-bold text-slate-900">{metrics.totalD3Simulators}</div>
                <div className="text-[11px] text-slate-500 uppercase tracking-wider mt-0.5">D3 Simulators</div>
              </div>

              <div className="p-3 bg-[#FAF8F5] rounded-xl border border-slate-200/80 text-center">
                <div className="text-2xl font-serif font-bold text-purple-700">10</div>
                <div className="text-[11px] text-slate-500 uppercase tracking-wider mt-0.5">Languages</div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-600 space-y-1.5">
              <div className="flex items-center justify-between">
                <span>Principal Investigator:</span>
                <strong className="text-slate-800">ai-aarti.com</strong>
              </div>
              <div className="flex items-center justify-between">
                <span>Core Methodology:</span>
                <strong className="text-slate-800">Remote Sensing + D3</strong>
              </div>
              <div className="flex items-center justify-between">
                <span>Open Science Repos:</span>
                <strong className="text-emerald-700">All Verified on GitHub</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
