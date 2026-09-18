import React, { useState, useMemo } from 'react';
import { Activity, Play, RefreshCw, BarChart2, ShieldAlert } from 'lucide-react';

export const MonteCarloRiskInteractive: React.FC = () => {
  const [trialsCount, setTrialsCount] = useState<number>(10000);
  const [deliveryRisk, setDeliveryRisk] = useState<number>(0.18);
  const [complexity, setComplexity] = useState<number>(0.25);
  const [macroShockVol, setMacroShockVol] = useState<number>(0.08);

  const simulation = useMemo(() => {
    const scores: number[] = [];
    const baseUtility = 0.777; // Five-Year Sunset baseline utility

    // Deterministic Box-Muller generator seed
    let seed1 = 0.1234;
    let seed2 = 0.5678;

    function pseudoNormal(mean: number, stdDev: number) {
      seed1 = (seed1 * 9301 + 49297) % 233280;
      seed2 = (seed2 * 9301 + 49297) % 233280;
      const u1 = Math.max(0.0001, seed1 / 233280);
      const u2 = seed2 / 233280;
      const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
      return mean + z0 * stdDev;
    }

    for (let i = 0; i < trialsCount; i++) {
      const shock = pseudoNormal(1.0, macroShockVol);
      const friction = pseudoNormal(complexity * 0.2, 0.05);
      const adoption = pseudoNormal(1.0, deliveryRisk * 0.3);

      const val = Math.max(
        0,
        Math.min(1, baseUtility * (1 - friction) * adoption * (1 / Math.max(0.7, shock * 0.9)))
      );
      scores.push(val);
    }

    scores.sort((a, b) => a - b);

    const p10 = scores[Math.floor(trialsCount * 0.1)];
    const p50 = scores[Math.floor(trialsCount * 0.5)];
    const p90 = scores[Math.floor(trialsCount * 0.9)];
    const mean = scores.reduce((a, b) => a + b, 0) / trialsCount;

    // Build 10 histogram bins from 0.0 to 1.0
    const bins = Array.from({ length: 10 }, (_, i) => {
      const min = i * 0.1;
      const max = (i + 1) * 0.1;
      const count = scores.filter((s) => s >= min && (i === 9 ? s <= max : s < max)).length;
      return {
        label: `${Math.round(min * 100)}-${Math.round(max * 100)}%`,
        count,
        percent: (count / trialsCount) * 100
      };
    });

    return { p10, p50, p90, mean, bins };
  }, [trialsCount, deliveryRisk, complexity, macroShockVol]);

  return (
    <div className="bg-slate-900 text-slate-100 rounded-2xl p-5 sm:p-7 border border-slate-800 shadow-xl space-y-6 my-8 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-serif font-bold text-lg">
            <Activity className="w-5 h-5 text-amber-400" />
            <span>10,000-Iteration Monte Carlo Stochastic Risk Simulator</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Box-Muller normal transforms model macroeconomic shocks, execution friction, and adoption variance across $N = {trialsCount.toLocaleString()}$ trials.
          </p>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 font-mono text-xs font-semibold self-start sm:self-auto">
          NIST AI Safety
        </span>
      </div>

      {/* Simulator Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
        <div>
          <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
            <span>Delivery Risk ($r$)</span>
            <span className="font-mono text-amber-400">{(deliveryRisk * 100).toFixed(0)}%</span>
          </div>
          <input
            type="range"
            min="0.05"
            max="0.50"
            step="0.01"
            value={deliveryRisk}
            onChange={(e) => setDeliveryRisk(parseFloat(e.target.value))}
            className="w-full accent-amber-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
            <span>Implementation Complexity ($c$)</span>
            <span className="font-mono text-amber-400">{(complexity * 100).toFixed(0)}%</span>
          </div>
          <input
            type="range"
            min="0.05"
            max="0.50"
            step="0.01"
            value={complexity}
            onChange={(e) => setComplexity(parseFloat(e.target.value))}
            className="w-full accent-amber-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
            <span>Macro Shock Volatility</span>
            <span className="font-mono text-amber-400">{(macroShockVol * 100).toFixed(0)}%</span>
          </div>
          <input
            type="range"
            min="0.02"
            max="0.20"
            step="0.01"
            value={macroShockVol}
            onChange={(e) => setMacroShockVol(parseFloat(e.target.value))}
            className="w-full accent-amber-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
          />
        </div>
      </div>

      {/* Percentiles Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
          <div className="text-[10px] text-slate-400 font-mono">P10 (Downside Risk)</div>
          <div className="text-xl font-mono font-bold text-red-400 mt-0.5">
            {simulation.p10.toFixed(3)}
          </div>
        </div>

        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
          <div className="text-[10px] text-slate-400 font-mono">P50 (Median Score)</div>
          <div className="text-xl font-mono font-bold text-amber-400 mt-0.5">
            {simulation.p50.toFixed(3)}
          </div>
        </div>

        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
          <div className="text-[10px] text-slate-400 font-mono">P90 (Optimistic Upside)</div>
          <div className="text-xl font-mono font-bold text-emerald-400 mt-0.5">
            {simulation.p90.toFixed(3)}
          </div>
        </div>

        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
          <div className="text-[10px] text-slate-400 font-mono">Stochastic Mean</div>
          <div className="text-xl font-mono font-bold text-teal-300 mt-0.5">
            {simulation.mean.toFixed(3)}
          </div>
        </div>
      </div>

      {/* Probability Histogram */}
      <div className="space-y-2 bg-slate-950 p-4 rounded-xl border border-slate-800">
        <div className="text-xs font-bold text-slate-300 mb-2 flex items-center justify-between">
          <span>Stochastic Probability Distribution Histogram ({trialsCount.toLocaleString()} Trials)</span>
          <span className="font-mono text-[10px] text-slate-400">Score Bins (%)</span>
        </div>

        <div className="space-y-1.5">
          {simulation.bins.map((bin) => (
            <div key={bin.label} className="flex items-center gap-3 text-xs">
              <span className="w-16 font-mono text-[10px] text-slate-400 shrink-0">{bin.label}</span>
              <div className="flex-1 bg-slate-800 h-4 rounded-md overflow-hidden relative">
                <div
                  className="bg-gradient-to-r from-amber-500 to-teal-400 h-full transition-all duration-300"
                  style={{ width: `${Math.min(100, bin.percent * 2.5)}%` }}
                />
              </div>
              <span className="w-12 font-mono text-[11px] text-right text-slate-300 shrink-0">
                {bin.percent.toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
