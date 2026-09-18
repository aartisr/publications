import React, { useState } from 'react';
import { MapPin, Building, Percent, DollarSign, Calculator } from 'lucide-react';

interface DistrictProfile {
  id: string;
  name: string;
  state: string;
  ruralShare: number;
  smallBusinessShare: number;
  medianIncome: number;
  trustBaseline: number;
}

const DISTRICTS: DistrictProfile[] = [
  {
    id: 'ia-04',
    name: 'Heartland Production District',
    state: 'IA',
    ruralShare: 0.58,
    smallBusinessShare: 0.22,
    medianIncome: 64200,
    trustBaseline: 0.55
  },
  {
    id: 'ca-12',
    name: 'Bay Civic District',
    state: 'CA',
    ruralShare: 0.04,
    smallBusinessShare: 0.34,
    medianIncome: 113200,
    trustBaseline: 0.62
  },
  {
    id: 'ga-05',
    name: 'Metro Resilience District',
    state: 'GA',
    ruralShare: 0.08,
    smallBusinessShare: 0.29,
    medianIncome: 72800,
    trustBaseline: 0.58
  }
];

export const LocalImpactCalculatorInteractive: React.FC = () => {
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictProfile>(DISTRICTS[0]);
  const [domain, setDomain] = useState<'infrastructure' | 'tax' | 'health'>('infrastructure');
  const [baseAffectedPop, setBaseAffectedPop] = useState<number>(42);
  const [sectionConfidence, setSectionConfidence] = useState<number>(0.82);

  // Math formulation
  const ruralMultiplier = domain === 'infrastructure' || domain === 'health' ? 1 + selectedDistrict.ruralShare * 0.35 : 1;
  const businessMultiplier = domain === 'tax' ? 1 + selectedDistrict.smallBusinessShare * 0.70 : 1;
  const incomeNormalizer = Math.min(1.28, Math.max(0.72, selectedDistrict.medianIncome / 85000));

  const localExposure = Number(((baseAffectedPop * ruralMultiplier * businessMultiplier) / incomeNormalizer).toFixed(1));
  const impactConfidence = Number((sectionConfidence * selectedDistrict.trustBaseline).toFixed(2));

  return (
    <div className="bg-slate-900 text-slate-100 rounded-2xl p-5 sm:p-7 border border-slate-800 shadow-xl space-y-6 my-8 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-teal-400 font-serif font-bold text-lg">
            <Calculator className="w-5 h-5 text-teal-400" />
            <span>Bounded Local Exposure Model Calculator ($D$)</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Calculate localized exposure estimates adjusted for rural share ($q$), small business density ($s$), and median income ($m$).
          </p>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 font-mono text-xs font-semibold self-start sm:self-auto">
          Bounded Exposure Normalizer
        </span>
      </div>

      {/* District Selector & Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
          <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">Select District Profile</div>
          <div className="grid grid-cols-1 gap-2">
            {DISTRICTS.map((d) => (
              <button
                key={d.id}
                onClick={() => setSelectedDistrict(d)}
                className={`p-2.5 rounded-lg border text-left text-xs transition-colors ${
                  selectedDistrict.id === d.id
                    ? 'bg-amber-400/10 border-amber-400 text-amber-300 font-bold'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span>{d.name} ({d.state})</span>
                  <span className="font-mono text-[10px] text-slate-400">${d.medianIncome.toLocaleString()}</span>
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  Rural: {(d.ruralShare * 100).toFixed(0)}% • SMB: {(d.smallBusinessShare * 100).toFixed(0)}%
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
          <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">Section Policy Domain</div>
          <div className="flex gap-2">
            {(['infrastructure', 'tax', 'health'] as const).map((dom) => (
              <button
                key={dom}
                onClick={() => setDomain(dom)}
                className={`flex-1 py-2 px-3 rounded-lg border text-xs font-bold capitalize transition-colors ${
                  domain === dom
                    ? 'bg-teal-500/20 border-teal-400 text-teal-300'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'
                }`}
              >
                {dom}
              </button>
            ))}
          </div>

          <div>
            <div className="flex justify-between text-xs text-slate-300 mb-1 font-semibold">
              <span>Base Population Exposure ($P$)</span>
              <span className="font-mono text-amber-400">{baseAffectedPop}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="90"
              step="1"
              value={baseAffectedPop}
              onChange={(e) => setBaseAffectedPop(parseInt(e.target.value))}
              className="w-full accent-amber-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Output Display Card */}
      <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <div className="text-[10px] font-mono uppercase text-slate-400">Formula Calculation</div>
          <div className="font-mono text-xs text-slate-300 bg-slate-900 p-2 rounded-lg border border-slate-800">
            D = round({baseAffectedPop} × {ruralMultiplier.toFixed(3)} × {businessMultiplier.toFixed(3)} / {incomeNormalizer.toFixed(3)})
          </div>
        </div>

        <div className="flex items-center gap-6 shrink-0">
          <div className="text-right">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Localized Exposure ($D$)</div>
            <div className="text-3xl font-mono font-extrabold text-teal-300">
              {localExposure}%
            </div>
            <div className="text-[10px] text-slate-400">exposed pop equivalent</div>
          </div>

          <div className="text-right pl-6 border-l border-slate-800">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Impact Confidence</div>
            <div className="text-3xl font-mono font-bold text-amber-400">
              {impactConfidence}
            </div>
            <div className="text-[10px] text-slate-400 font-mono">C_s × C_d</div>
          </div>
        </div>
      </div>
    </div>
  );
};
