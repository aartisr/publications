import React from 'react';
import { Globe, Heart, Users, Sparkles, BookOpen, FileText, ArrowRight, ShieldCheck } from 'lucide-react';
import { GLOBAL_CITIES_IMPACT, MULTILINGUAL_BRIEFS } from '../../data/globalCommunityData';

interface GlobalCommunityBannerProps {
  onOpenGlobalCommunity: (tab?: 'world-impact' | 'translations' | 'action-kit' | 'sdgs' | 'amplifier') => void;
}

export const GlobalCommunityBanner: React.FC<GlobalCommunityBannerProps> = ({
  onOpenGlobalCommunity
}) => {
  return (
    <section className="my-8 bg-gradient-to-br from-[#091E28] via-[#0E2A38] to-[#0A1820] text-white rounded-3xl p-6 sm:p-8 border border-teal-500/30 shadow-xl relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute -right-20 -top-20 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
        
        {/* Left: Mission Statement & Love of Community */}
        <div className="max-w-2xl space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/40">
              <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400 animate-pulse" /> For the Love of Community
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">
              <Globe className="w-3.5 h-3.5" /> Worldwide Research Visibility
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-400/20 text-teal-300 border border-teal-400/30">
              Zero Paywalls
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight leading-snug">
            Championing Awareness Through Rigorous Research & Universal Access
          </h3>

          <p className="text-sm text-slate-300 leading-relaxed font-sans">
            Extreme microclimates and urban heat disparity shouldn't be trapped behind academic paywalls or restricted by language. Aarti Sri Ravikumar's research provides open-access spectral graph algorithms, satellite radiometry downscaling, and multilingual policy kits in <strong>10 languages</strong> to empower frontline communities and grassroots leaders on every continent.
          </p>

          {/* Key Metrics Pill Row */}
          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono">
            <div className="px-3 py-1.5 rounded-xl bg-white/10 border border-white/15 text-emerald-300 font-bold">
              🌍 8 Global Metro Hubs
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-white/10 border border-white/15 text-teal-300 font-bold">
              🌐 10 Language Briefs
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-white/10 border border-white/15 text-amber-300 font-bold">
              📜 4 Grassroots Action Kits
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-white/10 border border-white/15 text-purple-300 font-bold">
              🇺🇳 4 UN SDG Alignments
            </div>
          </div>
        </div>

        {/* Right: Direct Action Buttons & Callout Cards */}
        <div className="w-full lg:w-auto flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
          <button
            onClick={() => onOpenGlobalCommunity('world-impact')}
            className="w-full inline-flex items-center justify-between gap-3 px-5 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-bold text-sm hover:from-emerald-400 hover:to-teal-300 shadow-lg transition-all"
          >
            <div className="flex items-center gap-2.5">
              <Globe className="w-5 h-5 text-slate-950" />
              <span>Explore Worldwide Impact Hub</span>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-950" />
          </button>

          <button
            onClick={() => onOpenGlobalCommunity('translations')}
            className="w-full inline-flex items-center justify-between gap-3 px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-sm transition-all"
          >
            <div className="flex items-center gap-2.5">
              <BookOpen className="w-4 h-4 text-amber-300" />
              <span>Read in 10 Languages (EN, ES, FR, HI...)</span>
            </div>
            <span className="text-xs text-amber-300 font-mono">10 Briefs</span>
          </button>

          <button
            onClick={() => onOpenGlobalCommunity('action-kit')}
            className="w-full inline-flex items-center justify-between gap-3 px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-sm transition-all"
          >
            <div className="flex items-center gap-2.5">
              <FileText className="w-4 h-4 text-teal-300" />
              <span>Download Community Action Kit</span>
            </div>
            <span className="text-xs text-teal-300 font-mono">Free</span>
          </button>
        </div>

      </div>
    </section>
  );
};
