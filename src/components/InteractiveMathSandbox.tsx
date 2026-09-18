import React, { useState } from 'react';
import {
  Sliders,
  Calculator,
  Info,
  Sparkles,
  RotateCcw,
  Check,
  Activity,
  Trees,
  Sun,
  Wind
} from 'lucide-react';
import { MathFormula } from './MathFormula';

export const InteractiveMathSandbox: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'lst' | 'cheeger' | 'stomatal' | 'albedo'>('lst');

  // Equation 1: LST Radiometric Temperature
  const [radL, setRadL] = useState<number>(8.5); // Radiance L_lambda
  const [emissivity, setEmissivity] = useState<number>(0.96); // Emissivity
  const [wavelength, setWavelength] = useState<number>(10.8); // 10.8 microns (TIRS)

  // Calculated LST in Celsius
  const k1 = 774.88;
  const k2 = 1321.08;
  const brightnessTemp = k2 / Math.log(k1 / radL + 1);
  const calculatedLST = (brightnessTemp / (1 + (wavelength * brightnessTemp / 14388) * Math.log(emissivity))) - 273.15;

  // Equation 2: Spectral Graph Cheeger Cut
  const [lambda2, setLambda2] = useState<number>(0.42); // Algebraic connectivity
  const [edgeCut, setEdgeCut] = useState<number>(18);
  const [volS, setVolS] = useState<number>(45);
  const calculatedCheeger = edgeCut / volS;
  const cheegerBound = lambda2 / 2;

  // Equation 3: Stomatal Closure Latent Heat Flux
  const [vpd, setVpd] = useState<number>(2.2); // Vapor Pressure Deficit in kPa
  const [tempA, setTempA] = useState<number>(34); // Ambient temp °C
  const calculatedGs = Math.max(0.02, 0.45 * Math.exp(-0.6 * vpd)); // Stomatal conductance g_s
  const calculatedLE = calculatedGs * 380; // Latent heat flux LE in W/m^2
  const calculatedSensibleH = Math.max(0, (tempA - 28) * 15 * (1 - calculatedGs));

  // Equation 4: Albedo Soiling Kinetics
  const [alpha0, setAlpha0] = useState<number>(0.85); // Initial albedo
  const [months, setMonths] = useState<number>(12); // Time in months
  const alphaAged = 0.55 + (alpha0 - 0.55) * Math.exp(-months / 8);

  return (
    <div className="my-8 rounded-2xl border border-slate-300 bg-slate-900 text-slate-100 shadow-xl overflow-hidden font-sans">
      {/* Sandbox Header */}
      <div className="bg-slate-950 px-5 py-4 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-400">
            <Calculator className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-base font-serif font-bold text-slate-100">
                Live Mathematical Equation & Physics Sandbox
              </h4>
              <span className="px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-mono uppercase tracking-wider">
                Interactive Solver
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Manipulate physical variables in real-time to compute land surface temperatures, graph Cheeger cuts, and stomatal closure kinetics
            </p>
          </div>
        </div>

        {/* Equation Tabs */}
        <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs flex-wrap">
          <button
            onClick={() => setActiveTab('lst')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              activeTab === 'lst' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            1. LST Radiance
          </button>
          <button
            onClick={() => setActiveTab('cheeger')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              activeTab === 'cheeger' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            2. Cheeger Cut φ(G)
          </button>
          <button
            onClick={() => setActiveTab('stomatal')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              activeTab === 'stomatal' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            3. Stomatal Conductance g_s
          </button>
          <button
            onClick={() => setActiveTab('albedo')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              activeTab === 'albedo' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            4. Albedo Soiling
          </button>
        </div>
      </div>

      {/* Sandbox Body */}
      <div className="p-6">
        {/* Tab 1: LST Split-Window Solver */}
        {activeTab === 'lst' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider">Radiometric Split-Window Formula</span>
                <MathFormula
                  math="T_s = \frac{K_2}{\ln\left(\frac{K_1}{L_\lambda} + 1\right)} \cdot \frac{1}{1 + (\lambda T / \rho) \ln \varepsilon}"
                />
              </div>

              {/* Variable Sliders */}
              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300">Top-of-Atmosphere Radiance ($L_\lambda$):</span>
                    <span className="font-mono text-amber-400 font-bold">{radL.toFixed(2)} W/(m²·sr·µm)</span>
                  </div>
                  <input
                    type="range"
                    min="5.0"
                    max="12.0"
                    step="0.1"
                    value={radL}
                    onChange={(e) => setRadL(parseFloat(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300">Surface Emissivity ($\varepsilon$):</span>
                    <span className="font-mono text-emerald-400 font-bold">{emissivity.toFixed(2)} ({emissivity > 0.97 ? 'Tree Canopy' : 'Concrete Asphalt'})</span>
                  </div>
                  <input
                    type="range"
                    min="0.90"
                    max="0.99"
                    step="0.01"
                    value={emissivity}
                    onChange={(e) => setEmissivity(parseFloat(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Live Result Display */}
            <div className="lg:col-span-5 bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-xs text-slate-400 font-mono">Calculated Land Surface Temp (LST):</span>
                <div className="text-3xl font-serif font-bold text-amber-400 mt-1">
                  {calculatedLST.toFixed(1)}°C
                  <span className="text-sm font-normal text-slate-400 ml-2">
                    ({((calculatedLST * 9) / 5 + 32).toFixed(1)}°F)
                  </span>
                </div>
              </div>

              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-amber-400" />
                  <span>Physical Interpretation</span>
                </div>
                <p className="leading-relaxed">
                  Higher emissivity ($\varepsilon = 0.98$) from dense vegetation mitigates brightness temperature anomalies by downscaling apparent surface skin heat.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Spectral Graph Cheeger Cut */}
        {activeTab === 'cheeger' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider">Cheeger Inequality on Urban Graph G=(V,E)</span>
                <MathFormula
                  math="\phi(G) = \min_{S \subset V} \frac{|\partial S|}{\min(\text{vol}(S), \text{vol}(\bar{S}))} \ge \frac{\lambda_2}{2}"
                />
              </div>

              {/* Sliders */}
              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300">Edge Cut Boundary Capacity (|∂S|):</span>
                    <span className="font-mono text-amber-400 font-bold">{edgeCut} edges</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="40"
                    value={edgeCut}
                    onChange={(e) => setEdgeCut(parseInt(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300">Tract Graph Volume vol(S):</span>
                    <span className="font-mono text-cyan-400 font-bold">{volS} nodes</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="100"
                    value={volS}
                    onChange={(e) => setVolS(parseInt(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-xs text-slate-400 font-mono">Cheeger Cut Ratio φ(G):</span>
                <div className="text-3xl font-serif font-bold text-cyan-400 mt-1">
                  {calculatedCheeger.toFixed(3)}
                </div>
                <div className="text-xs text-slate-400 font-mono mt-1">
                  Cheeger Lower Bound (λ₂ / 2): <span className="text-emerald-400 font-bold">{cheegerBound.toFixed(3)}</span>
                </div>
              </div>

              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <Wind className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Convective Airflow Assessment</span>
                </div>
                <p className="leading-relaxed">
                  When φ(G) ≥ 0.382, spatial street connectivity crosses the critical bond percolation threshold, channeling microclimatic breezes.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Stomatal Closure Latent Heat Flux */}
        {activeTab === 'stomatal' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider">Stomatal Conductance & Latent Heat Flux</span>
                <MathFormula
                  math="g_s = g_0 \exp(-\gamma \cdot \text{VPD}), \quad LE = \lambda E = g_s \cdot \Delta q"
                />
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300">Vapor Pressure Deficit (VPD):</span>
                    <span className="font-mono text-amber-400 font-bold">{vpd.toFixed(1)} kPa {vpd > 2.5 ? '(Extreme Heatwave)' : '(Mild)'}</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="4.0"
                    step="0.1"
                    value={vpd}
                    onChange={(e) => setVpd(parseFloat(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300">Ambient Air Temperature (Ta):</span>
                    <span className="font-mono text-red-400 font-bold">{tempA}°C</span>
                  </div>
                  <input
                    type="range"
                    min="25"
                    max="42"
                    value={tempA}
                    onChange={(e) => setTempA(parseInt(e.target.value))}
                    className="w-full accent-red-500 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-xs text-slate-400 font-mono">Stomatal Conductance (gs):</span>
                <div className="text-2xl font-serif font-bold text-emerald-400 mt-1">
                  {calculatedGs.toFixed(3)} <span className="text-xs font-normal text-slate-400">mol/(m²·s)</span>
                </div>
                <div className="text-xs font-mono text-slate-300 mt-2">
                  Latent Cooling Flux (LE): <strong className="text-cyan-400">{calculatedLE.toFixed(0)} W/m²</strong>
                </div>
              </div>

              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <Trees className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Drought Shutdown Warning</span>
                </div>
                <p className="leading-relaxed">
                  {vpd > 2.5
                    ? 'CRITICAL: High VPD induces stomatal closure to prevent cavitation. Latent cooling halts, turning trees into sensible heat emitters!'
                    : 'Active transpiration provides ~150-300 W/m² of latent heat dissipation.'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Albedo Soiling Kinetics */}
        {activeTab === 'albedo' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider">Exponential Cool Roof Soiling Decay</span>
                <MathFormula
                  math="\alpha(t) = \alpha_{\text{aged}} + (\alpha_0 - \alpha_{\text{aged}}) e^{-t / \tau}"
                />
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300">Initial Coating Albedo (α₀):</span>
                    <span className="font-mono text-sky-400 font-bold">{alpha0.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.65"
                    max="0.90"
                    step="0.01"
                    value={alpha0}
                    onChange={(e) => setAlpha0(parseFloat(e.target.value))}
                    className="w-full accent-sky-500 cursor-pointer"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300">Coating Field Exposure Time (t):</span>
                    <span className="font-mono text-amber-400 font-bold">{months} Months</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="36"
                    value={months}
                    onChange={(e) => setMonths(parseInt(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-xs text-slate-400 font-mono">Aged Field Solar Reflectance (α_aged):</span>
                <div className="text-3xl font-serif font-bold text-sky-400 mt-1">
                  {alphaAged.toFixed(2)}
                  <span className="text-xs font-normal text-red-400 ml-2">
                    (-{(((alpha0 - alphaAged) / alpha0) * 100).toFixed(0)}% Decay)
                  </span>
                </div>
              </div>

              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span>Soiling Kinetics Insight</span>
                </div>
                <p className="leading-relaxed">
                  Soot particulates and particulate matter cause exponential albedo loss within 24 months unless rooftops undergo periodic washing or re-coating.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
