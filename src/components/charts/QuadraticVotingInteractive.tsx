import React, { useState } from 'react';
import { Coins, AlertTriangle, Check, RefreshCw } from 'lucide-react';

interface IssueOption {
  id: string;
  title: string;
  category: string;
  description: string;
}

const ISSUES: IssueOption[] = [
  {
    id: 'iss-smb',
    title: 'Small Business Continuity Tax Credits',
    category: 'Economic Resilience',
    description: 'Offsets tax liabilities for Main Street shops disrupted by public infrastructure works.'
  },
  {
    id: 'iss-infra',
    title: 'Bond Guarantees for Water & Grid Resilience',
    category: 'Infrastructure',
    description: 'Federal guarantees backing municipal bonds for bridge and clean water upgrades.'
  },
  {
    id: 'iss-audit',
    title: 'Independent GAO Audit & Spending Triggers',
    category: 'Fiscal Accountability',
    description: 'Mandatory third-party spending and outcome audits when budget variance exceeds 8%.'
  },
  {
    id: 'iss-transparency',
    title: 'Neighborhood-Level Evidence Dashboard',
    category: 'Civil Rights',
    description: 'Public data provenance requiring census-tract resolution for federal fund allocations.'
  }
];

const WEEKLY_BUDGET = 25;

export const QuadraticVotingInteractive: React.FC = () => {
  const [votes, setVotes] = useState<Record<string, number>>({
    'iss-smb': 3,
    'iss-infra': 2,
    'iss-audit': 2,
    'iss-transparency': 1
  });

  const totalSpent = Object.values(votes).reduce((sum, v) => sum + Math.max(0, v) ** 2, 0);
  const remaining = Math.max(0, WEEKLY_BUDGET - totalSpent);
  const isOverBudget = totalSpent > WEEKLY_BUDGET;

  const handleVoteChange = (id: string, delta: number) => {
    const current = votes[id] || 0;
    const updated = Math.max(0, current + delta);
    setVotes({ ...votes, [id]: updated });
  };

  const handleReset = () => {
    setVotes({
      'iss-smb': 0,
      'iss-infra': 0,
      'iss-audit': 0,
      'iss-transparency': 0
    });
  };

  return (
    <div className="bg-slate-900 text-slate-100 rounded-2xl p-5 sm:p-7 border border-slate-800 shadow-xl space-y-6 my-8 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-teal-400 font-serif font-bold text-lg">
            <Coins className="w-5 h-5 text-teal-400" />
            <span>Interactive Quadratic Voice Token Budget Simulator</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Quadratic cost ($C_i = v_i^2$) forces participants to communicate true priority intensity under a 25-token budget limit.
          </p>
        </div>

        <button
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 font-semibold transition-colors self-start sm:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset Budget</span>
        </button>
      </div>

      {/* Budget Summary Ribbon */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
          <div className="text-[10px] text-slate-400 uppercase font-mono">Weekly Token Budget</div>
          <div className="text-xl font-mono font-bold text-slate-100 mt-0.5">{WEEKLY_BUDGET} Tokens</div>
        </div>

        <div className={`p-3.5 rounded-xl border ${isOverBudget ? 'bg-red-950/60 border-red-500/50' : 'bg-slate-950 border-slate-800'}`}>
          <div className="text-[10px] text-slate-400 uppercase font-mono">Total Tokens Spent</div>
          <div className={`text-xl font-mono font-extrabold mt-0.5 ${isOverBudget ? 'text-red-400' : 'text-amber-400'}`}>
            {totalSpent} / {WEEKLY_BUDGET}
          </div>
        </div>

        <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
          <div className="text-[10px] text-slate-400 uppercase font-mono">Tokens Remaining</div>
          <div className={`text-xl font-mono font-bold mt-0.5 ${remaining > 0 ? 'text-emerald-400' : 'text-slate-400'}`}>
            {remaining} Tokens
          </div>
        </div>
      </div>

      {isOverBudget && (
        <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-2 text-xs text-red-300">
          <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
          <span>Over-budget allocation detected! Quadratic voting strictly enforces total token cost ≤ 25. Please reduce votes on non-essential issues.</span>
        </div>
      )}

      {/* Issue Allocation List */}
      <div className="space-y-3">
        {ISSUES.map((issue) => {
          const v = votes[issue.id] || 0;
          const cost = v ** 2;
          const nextCost = (v + 1) ** 2;
          const marginalCost = nextCost - cost;

          return (
            <div
              key={issue.id}
              className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1 max-w-lg">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30 text-[10px] font-mono">
                    {issue.category}
                  </span>
                  <span className="font-bold text-sm text-slate-100">{issue.title}</span>
                </div>
                <p className="text-xs text-slate-400">{issue.description}</p>
              </div>

              {/* Vote Controls */}
              <div className="flex items-center gap-4 shrink-0 justify-between md:justify-end">
                <div className="text-right">
                  <div className="text-[10px] text-slate-400 font-mono">Cost ($v^2$)</div>
                  <div className="text-base font-mono font-bold text-amber-400">{cost} tokens</div>
                  <div className="text-[10px] text-slate-500">+{marginalCost} for next</div>
                </div>

                <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-xl border border-slate-800">
                  <button
                    onClick={() => handleVoteChange(issue.id, -1)}
                    disabled={v === 0}
                    className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-slate-800 font-mono font-bold text-white transition-colors"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-mono font-extrabold text-base text-teal-300">
                    {v}
                  </span>
                  <button
                    onClick={() => handleVoteChange(issue.id, 1)}
                    className="w-8 h-8 rounded-lg bg-teal-600 hover:bg-teal-500 font-mono font-bold text-white transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
