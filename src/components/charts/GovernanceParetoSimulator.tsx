import React, { useState, useMemo } from 'react';
import { Sliders, Sparkles, AlertCircle, CheckCircle2, ShieldCheck, Scale, Award } from 'lucide-react';

interface Amendment {
  id: string;
  name: string;
  growthUtility: number;
  equityUtility: number;
  fiscalUtility: number;
  risk: number;
  complexity: number;
  description: string;
}

const INITIAL_AMENDMENTS: Amendment[] = [
  {
    id: 'amend-sunset',
    name: 'Five-Year Sunset with Renewal Vote',
    growthUtility: 0.76,
    equityUtility: 0.73,
    fiscalUtility: 0.84,
    risk: 0.18,
    complexity: 0.25,
    description: 'Requires district impact reporting and a congressional renewal vote every 5 years.'
  },
  {
    id: 'amend-formula',
    name: 'Transparent Need-Weighted Formula',
    growthUtility: 0.70,
    equityUtility: 0.92,
    fiscalUtility: 0.69,
    risk: 0.26,
    complexity: 0.36,
    description: 'Allocates funds according to census social vulnerability and infrastructure readiness.'
  },
  {
    id: 'amend-audit',
    name: 'Automatic Independent Audit Trigger',
    growthUtility: 0.58,
    equityUtility: 0.66,
    fiscalUtility: 0.88,
    risk: 0.22,
    complexity: 0.28,
    description: 'Triggers automated GAO audit if quarterly spend variance exceeds 8%.'
  },
  {
    id: 'amend-credit',
    name: 'Targeted Small Business Credit',
    growthUtility: 0.89,
    equityUtility: 0.61,
    fiscalUtility: 0.72,
    risk: 0.31,
    complexity: 0.42,
    description: 'Narrows tax credits to construction-impacted corridors with a rural carveout.'
  }
];

export const GovernanceParetoSimulator: React.FC = () => {
  const [weights, setWeights] = useState({
    growth: 1.0,
    equity: 1.0,
    fiscal: 1.0
  });

  const [riskTolerance, setRiskTolerance] = useState<number>(0.5);

  const scoredAmendments = useMemo(() => {
    const totalW = weights.growth + weights.equity + weights.fiscal || 1;

    const scored = INITIAL_AMENDMENTS.map((a) => {
      const weightedUtility =
        (a.growthUtility * weights.growth +
          a.equityUtility * weights.equity +
          a.fiscalUtility * weights.fiscal) /
        totalW;

      const minUtility = Math.min(a.growthUtility, a.equityUtility, a.fiscalUtility);

      // Penalty scales inversely with risk tolerance
      const riskPenalty = a.risk * 0.62 * (1.2 - riskTolerance * 0.4);
      const complexityPenalty = a.complexity * 0.28 * (1.2 - riskTolerance * 0.4);

      const riskAdjustedScore = Math.max(
        0,
        weightedUtility * (1 - riskPenalty) * (1 - complexityPenalty)
      );

      return {
        ...a,
        weightedUtility,
        minUtility,
        riskAdjustedScore
      };
    });

    // Determine Pareto efficiency (frontier)
    return scored.map((item, _, arr) => {
      const isDominated = arr.some(
        (other) =>
          other.id !== item.id &&
          other.weightedUtility >= item.weightedUtility &&
          other.minUtility >= item.minUtility &&
          other.riskAdjustedScore >= item.riskAdjustedScore &&
          (other.weightedUtility > item.weightedUtility ||
            other.minUtility > item.minUtility ||
            other.riskAdjustedScore > item.riskAdjustedScore)
      );

      return {
        ...item,
        isParetoEfficient: !isDominated
      };
    }).sort((a, b) => b.riskAdjustedScore - a.riskAdjustedScore);
  }, [weights, riskTolerance]);

  const recommended = scoredAmendments[0];

  return (
    <div className="bg-slate-900 text-slate-100 rounded-2xl p-5 sm:p-7 border border-slate-800 shadow-xl space-y-6 my-8 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-serif font-bold text-lg">
            <Scale className="w-5 h-5 text-amber-400" />
            <span>Interactive Pareto Governance Frontier Simulator</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Adjust stakeholder weights & delivery risk tolerance to observe real-time recalculations of Pareto-efficient legislative amendments.
          </p>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/30 font-mono text-xs font-semibold self-start sm:self-auto">
          Game-Theoretic Optimizer
        </span>
      </div>

      {/* Control Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
        <div>
          <div className="flex items-center justify-between text-xs font-bold text-teal-400 mb-1.5">
            <span>Growth Caucus Weight</span>
            <span className="font-mono">{weights.growth.toFixed(1)}x</span>
          </div>
          <input
            type="range"
            min="0.2"
            max="2.0"
            step="0.1"
            value={weights.growth}
            onChange={(e) => setWeights({ ...weights, growth: parseFloat(e.target.value) })}
            className="w-full accent-teal-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
          />
          <div className="text-[10px] text-slate-400 mt-1">Priority: Small business & economic expansion</div>
        </div>

        <div>
          <div className="flex items-center justify-between text-xs font-bold text-purple-400 mb-1.5">
            <span>Equity Bloc Weight</span>
            <span className="font-mono">{weights.equity.toFixed(1)}x</span>
          </div>
          <input
            type="range"
            min="0.2"
            max="2.0"
            step="0.1"
            value={weights.equity}
            onChange={(e) => setWeights({ ...weights, equity: parseFloat(e.target.value) })}
            className="w-full accent-purple-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
          />
          <div className="text-[10px] text-slate-400 mt-1">Priority: Vulnerable districts & transparency</div>
        </div>

        <div>
          <div className="flex items-center justify-between text-xs font-bold text-amber-400 mb-1.5">
            <span>Fiscal Guardians Weight</span>
            <span className="font-mono">{weights.fiscal.toFixed(1)}x</span>
          </div>
          <input
            type="range"
            min="0.2"
            max="2.0"
            step="0.1"
            value={weights.fiscal}
            onChange={(e) => setWeights({ ...weights, fiscal: parseFloat(e.target.value) })}
            className="w-full accent-amber-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
          />
          <div className="text-[10px] text-slate-400 mt-1">Priority: Independent audits & budget caps</div>
        </div>
      </div>

      {/* Recommended Winner Banner */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-amber-950/80 via-purple-950/50 to-slate-900 border border-amber-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Top Recommended Pareto Compromise</span>
          </div>
          <div className="text-base font-bold text-white mt-1">
            {recommended.name}
          </div>
          <div className="text-xs text-slate-300 mt-0.5">
            {recommended.description}
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right">
            <div className="text-[10px] text-slate-400 uppercase font-mono">Risk-Adjusted Score</div>
            <div className="text-2xl font-mono font-extrabold text-amber-400">
              {recommended.riskAdjustedScore.toFixed(3)}
            </div>
          </div>
          <div className="text-right pl-3 border-l border-slate-700">
            <div className="text-[10px] text-slate-400 uppercase font-mono">Min Floor Protection</div>
            <div className="text-2xl font-mono font-bold text-purple-300">
              {recommended.minUtility.toFixed(3)}
            </div>
          </div>
        </div>
      </div>

      {/* Scored Amendments Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left border-collapse border border-slate-800">
          <thead>
            <tr className="bg-slate-950 text-slate-300 font-bold font-mono uppercase text-[11px]">
              <th className="p-2.5 border border-slate-800">Amendment</th>
              <th className="p-2.5 border border-slate-800 text-center">Shared Utility (U_bar)</th>
              <th className="p-2.5 border border-slate-800 text-center">Floor Support (U_min)</th>
              <th className="p-2.5 border border-slate-800 text-center">Delivery Risk</th>
              <th className="p-2.5 border border-slate-800 text-center">Risk-Adjusted (R)</th>
              <th className="p-2.5 border border-slate-800 text-center">Frontier Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-slate-200">
            {scoredAmendments.map((a) => (
              <tr
                key={a.id}
                className={a.id === recommended.id ? 'bg-amber-400/10 font-medium' : 'hover:bg-slate-800/50'}
              >
                <td className="p-2.5 border border-slate-800">
                  <div className="font-bold text-slate-100">{a.name}</div>
                  <div className="text-[10px] text-slate-400 font-sans mt-0.5">{a.description}</div>
                </td>
                <td className="p-2.5 border border-slate-800 text-center font-mono text-teal-300">
                  {a.weightedUtility.toFixed(3)}
                </td>
                <td className="p-2.5 border border-slate-800 text-center font-mono text-purple-300">
                  {a.minUtility.toFixed(3)}
                </td>
                <td className="p-2.5 border border-slate-800 text-center font-mono text-red-300">
                  {(a.risk * 100).toFixed(0)}%
                </td>
                <td className="p-2.5 border border-slate-800 text-center font-mono font-bold text-amber-400 text-sm">
                  {a.riskAdjustedScore.toFixed(3)}
                </td>
                <td className="p-2.5 border border-slate-800 text-center">
                  {a.isParetoEfficient ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold">
                      <CheckCircle2 className="w-3 h-3" /> Pareto Frontier
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/30 text-[10px]">
                      <AlertCircle className="w-3 h-3" /> Dominated
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
