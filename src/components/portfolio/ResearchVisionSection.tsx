import React from 'react';
import { Layers, ShieldCheck, Cpu, Database, BookOpen, Sigma } from 'lucide-react';

interface ResearchVisionSectionProps {
  onOpenMathDeepDive: () => void;
  onOpenArchitecture: () => void;
}

export const ResearchVisionSection: React.FC<ResearchVisionSectionProps> = ({
  onOpenMathDeepDive,
  onOpenArchitecture
}) => {
  return (
    <section className="mt-16 bg-white border border-[#E2DCD5] rounded-3xl p-6 sm:p-10 shadow-xs">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="max-w-3xl">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-800">
            Open-Science Governance & Architecture
          </span>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mt-1">
            Democratizing Planetary Computing & Thermal Resilience
          </h3>
          <p className="text-slate-600 text-xs sm:text-sm mt-3 leading-relaxed">
            Every publication in this repository is designed as an executable, open-access artifact. By bridging physics-based satellite radiometry (Landsat, Sentinel, ECOSTRESS), discrete graph calculus, and demographic vulnerability indices (CDC SVI), this platform ensures that high-resolution microclimatic intelligence is openly available to community organizers, arborists, city leaders, and researchers worldwide.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenMathDeepDive}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 border border-amber-300 text-amber-950 text-xs font-bold transition-colors shadow-2xs"
          >
            <Sigma className="w-3.5 h-3.5 text-amber-800" />
            <span>Spectral Proofs</span>
          </button>
          <button
            onClick={onOpenArchitecture}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors shadow-2xs"
          >
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span>Architecture Blueprint</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-6 border-t border-slate-100 text-xs">
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
          <div>
            <div className="w-8 h-8 rounded-lg bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-900 mb-3">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="font-serif font-bold text-slate-900 text-sm mb-1.5">
              Radical Open Access & Equity
            </div>
            <p className="text-slate-600 leading-relaxed text-[11px] sm:text-xs">
              Directly embedding CDC Social Vulnerability Index (SVI) metrics into thermodynamic objective functions so public investments safeguard heat-vulnerable residents first.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
          <div>
            <div className="w-8 h-8 rounded-lg bg-purple-100 border border-purple-300 flex items-center justify-center text-purple-900 mb-3">
              <Database className="w-4 h-4" />
            </div>
            <div className="font-serif font-bold text-slate-900 text-sm mb-1.5">
              Federal Data Lakes & Edge AI
            </div>
            <p className="text-slate-600 leading-relaxed text-[11px] sm:text-xs">
              Automated pipelines synchronizing USGS Landsat-9, ESA Sentinel-2, and NASA ECOSTRESS radiance with hyper-local low-cost ground sensors.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
          <div>
            <div className="w-8 h-8 rounded-lg bg-blue-100 border border-blue-300 flex items-center justify-center text-blue-900 mb-3">
              <Cpu className="w-4 h-4" />
            </div>
            <div className="font-serif font-bold text-slate-900 text-sm mb-1.5">
              Interactive Living Papers (D3)
            </div>
            <p className="text-slate-600 leading-relaxed text-[11px] sm:text-xs">
              Replacing static PDF tables with dynamic, browser-executable D3 simulations allowing readers to test cooling intervention scenarios in real time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
