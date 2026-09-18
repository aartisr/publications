import React, { useState } from 'react';
import { TOP_10_BENCHMARKS } from '../data/benchmarks';
import { X, Award, ExternalLink, Sparkles, BookOpen, Layers, CheckCircle } from 'lucide-react';

interface Top10BenchmarkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Top10BenchmarkModal: React.FC<Top10BenchmarkModalProps> = ({ isOpen, onClose }) => {
  const [selectedBenchmarkIndex, setSelectedBenchmarkIndex] = useState<number>(0);

  if (!isOpen) return null;

  const current = TOP_10_BENCHMARKS[selectedBenchmarkIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white border border-[#E2DCD5] rounded-2xl max-w-5xl w-full shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[#0B192C] text-white p-6 flex items-start justify-between border-b border-slate-700">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-400/20 text-amber-300 border border-amber-400/30 flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-amber-400" /> Comparative Research Dossier
              </span>
              <span className="text-xs text-slate-400">10 Premier Scientific Platforms Evaluated</span>
            </div>
            <h3 className="text-2xl font-serif font-bold text-white mt-2">
              Top 10 Academic Publication Platforms: Design Analysis & Architectural Motivation
            </h3>
            <p className="text-sm text-slate-300 mt-1 max-w-3xl">
              Comparative synthesis of the world's most prestigious academic publishing platforms—used as direct design motivation for Aarti Sri Ravikumar's publication platform and research portfolio.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Master-Detail Explorer */}
        <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-hidden">
          {/* Left: Platform List */}
          <div className="md:col-span-4 border-r border-slate-200 bg-slate-50 p-4 overflow-y-auto max-h-[500px]">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 px-2">
              Evaluated Platforms (10)
            </div>
            <div className="space-y-1.5">
              {TOP_10_BENCHMARKS.map((b, idx) => {
                const isSelected = selectedBenchmarkIndex === idx;
                return (
                  <button
                    key={b.name}
                    onClick={() => setSelectedBenchmarkIndex(idx)}
                    className={`w-full text-left p-2.5 rounded-xl text-xs transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-amber-800 text-white font-semibold shadow-xs'
                        : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                    }`}
                  >
                    <div>
                      <div className="font-bold flex items-center gap-1.5">
                        <span className="font-mono text-[10px] opacity-70">#{idx + 1}</span>
                        <span>{b.name}</span>
                      </div>
                      <div className={`text-[11px] truncate ${isSelected ? 'text-amber-100' : 'text-slate-500'}`}>
                        {b.archetype}
                      </div>
                    </div>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                      isSelected ? 'bg-amber-900 text-amber-200' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {b.badge}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Deep Feature Synthesis */}
          <div className="md:col-span-8 p-6 overflow-y-auto max-h-[500px] space-y-6">
            <div className="flex items-start justify-between border-b pb-4">
              <div>
                <div className="text-xs font-mono text-amber-800 font-semibold">{current.institutionOrPublisher}</div>
                <h4 className="text-2xl font-serif font-bold text-slate-900 mt-0.5 flex items-center gap-2">
                  {current.name}
                  <a
                    href={current.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-slate-400 hover:text-slate-700"
                    title="Visit site"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </h4>
                <div className="text-xs text-slate-500 mt-1">{current.archetype}</div>
              </div>
              <span className="px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-bold border border-amber-300">
                {current.badge}
              </span>
            </div>

            {/* Direct Motivation Adoption Box */}
            <div className="p-4 bg-amber-50 border border-amber-300 rounded-xl">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-amber-700" />
                How Aarti's Platform Adopts & Implements This:
              </div>
              <p className="text-sm font-medium text-amber-950 mt-1.5 leading-relaxed">
                {current.ourAdoptedMotivation}
              </p>
            </div>

            {/* Key Design Features */}
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Hallmark Design & Architectural Features:
              </h5>
              <ul className="grid grid-cols-1 gap-2 text-xs">
                {current.keyDesignFeatures.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2 p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Three Analytical Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <div className="font-bold text-slate-800 mb-1">Typographic Cadence</div>
                <p className="text-slate-600 leading-relaxed">{current.typographicPhilosophy}</p>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <div className="font-bold text-slate-800 mb-1">Data Visualization</div>
                <p className="text-slate-600 leading-relaxed">{current.dataVisualizationApproach}</p>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <div className="font-bold text-slate-800 mb-1">Reading Experience</div>
                <p className="text-slate-600 leading-relaxed">{current.readingExperience}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 px-6 flex items-center justify-between text-xs text-slate-600">
          <div>
            Synthesized by <strong>Aarti Sri Ravikumar Academic Publishing Research Group</strong>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
          >
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  );
};
