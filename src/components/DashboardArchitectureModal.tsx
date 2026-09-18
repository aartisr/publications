import React, { useState } from 'react';
import { X, Server, Database, Cpu, Layers, Activity, Eye, ShieldCheck, Download, Code, GitBranch, ArrowRight, ExternalLink } from 'lucide-react';

interface DashboardArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DashboardArchitectureModal: React.FC<DashboardArchitectureModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'pipeline' | 'layers' | 'equations' | 'repository'>('pipeline');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white border border-[#E2DCD5] rounded-2xl max-w-4xl w-full shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="bg-[#0B192C] text-white p-6 flex items-start justify-between border-b border-slate-700">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                System Specification & Architecture Blueprint
              </span>
              <span className="text-xs font-mono text-slate-400">v2.4 Production Design</span>
            </div>
            <h3 className="text-2xl font-serif font-bold text-white mt-2">
              Metropolitan Thermal Intensity Dashboard Architecture
            </h3>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl">
              End-to-end computational pipeline for ingest, downscaling, thermodynamic simulation, and democratized D3.js visualization across metropolitan regions.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-3 gap-4 text-xs font-medium">
          <button
            onClick={() => setActiveTab('pipeline')}
            className={`pb-3 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'pipeline'
                ? 'border-amber-700 text-amber-900 font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Activity className="w-4 h-4" /> End-to-End Pipeline Flow
          </button>
          <button
            onClick={() => setActiveTab('layers')}
            className={`pb-3 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'layers'
                ? 'border-amber-700 text-amber-900 font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-4 h-4" /> 5-Tier Architecture Stack
          </button>
          <button
            onClick={() => setActiveTab('equations')}
            className={`pb-3 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'equations'
                ? 'border-amber-700 text-amber-900 font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Cpu className="w-4 h-4" /> Physical & Thermal Engines
          </button>
          <button
            onClick={() => setActiveTab('repository')}
            className={`pb-3 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'repository'
                ? 'border-amber-700 text-amber-900 font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <GitBranch className="w-4 h-4" /> GitHub & Production Spec
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-slate-800 text-sm">
          {activeTab === 'pipeline' && (
            <div className="space-y-6">
              {/* Visual Flow diagram */}
              <div className="bg-slate-900 text-slate-100 p-5 rounded-xl border border-slate-800 shadow-inner">
                <div className="text-xs font-mono text-amber-400 mb-3 uppercase tracking-wider">
                  Dataflow Pipeline Schematic
                </div>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-2 items-center text-center">
                  <div className="p-3 bg-slate-800/90 rounded-lg border border-slate-700">
                    <div className="text-[10px] text-amber-400 uppercase font-mono">01. Radiometry</div>
                    <div className="font-bold text-xs mt-1">Satellite Ingest</div>
                    <div className="text-[11px] text-slate-400 mt-1">Landsat 8/9 TIRS, Sentinel-2 MSI, ECOSTRESS</div>
                  </div>

                  <div className="hidden md:flex justify-center text-slate-500">
                    <ArrowRight className="w-4 h-4 text-amber-400" />
                  </div>

                  <div className="p-3 bg-slate-800/90 rounded-lg border border-slate-700">
                    <div className="text-[10px] text-amber-400 uppercase font-mono">02. Correction</div>
                    <div className="font-bold text-xs mt-1">Atmospheric ETL</div>
                    <div className="text-[11px] text-slate-400 mt-1">MODTRAN5 Radiative Transfer & FVC Emissivity</div>
                  </div>

                  <div className="hidden md:flex justify-center text-slate-500">
                    <ArrowRight className="w-4 h-4 text-amber-400" />
                  </div>

                  <div className="p-3 bg-slate-800/90 rounded-lg border border-slate-700">
                    <div className="text-[10px] text-amber-400 uppercase font-mono">03. Indexing</div>
                    <div className="font-bold text-xs mt-1">Spatial Engine</div>
                    <div className="text-[11px] text-slate-400 mt-1">H3 Hexagonal Grid & Census SVI Integration</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4 pt-4 border-t border-slate-800 text-center">
                  <div className="p-3 bg-amber-950/40 rounded-lg border border-amber-800/40">
                    <div className="text-[10px] text-amber-300 uppercase font-mono">04. Physics Simulation</div>
                    <div className="font-bold text-xs text-amber-100 mt-1">Thermodynamic Scenario Engine</div>
                    <div className="text-[11px] text-amber-200/70 mt-1">Sensible heat flux, cool roofs, tree canopy attenuation</div>
                  </div>

                  <div className="p-3 bg-blue-950/40 rounded-lg border border-blue-800/40">
                    <div className="text-[10px] text-blue-300 uppercase font-mono">05. Robustness Lab</div>
                    <div className="font-bold text-xs text-blue-100 mt-1">Spectral & Percolation Reasoning</div>
                    <div className="text-[11px] text-blue-200/70 mt-1">Connectivity phase transitions (pc = 0.38) & sensor drift audits</div>
                  </div>

                  <div className="p-3 bg-emerald-950/40 rounded-lg border border-emerald-800/40">
                    <div className="text-[10px] text-emerald-300 uppercase font-mono">06. Democratization UI</div>
                    <div className="font-bold text-xs text-emerald-100 mt-1">Client D3.js Visualization</div>
                    <div className="text-[11px] text-emerald-200/70 mt-1">Zero-install browser execution, transparent community audits</div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-serif font-bold text-lg text-slate-900">
                  Architectural Intent & Guiding Philosophy
                </h4>
                <p className="text-slate-600 leading-relaxed">
                  As articulated in Aarti Sri Ravikumar's technical documentation for <em>urban-heat.ai-aarti.com</em>, traditional municipal climate analytics are bottlenecked by high licensing fees, opaque proprietary modeling, and complex command-line GIS tools that disenfranchise the very communities bearing the disproportionate brunt of extreme heat.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  This architecture decouples heavy raster operations from client visualization. By preprocessing Earth Observation imagery into cloud-optimized formats and executing microclimate thermodynamic formulas natively in modern browsers via D3.js, community advocates, high school educators, and city council analysts inspect identical data with zero software installation.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'layers' && (
            <div className="space-y-4">
              <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                  <Database className="w-4 h-4 text-amber-700" /> Layer 1: Ingestion & Earth Observation Streams
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  Automated fetchers pull multi-spectral and thermal infrared passes from USGS EarthExplorer and Copernicus Open Access Hub.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2 font-mono text-[11px]">
                  <span className="bg-white p-2 rounded border border-slate-200">Landsat 8/9 (TIRS-2)</span>
                  <span className="bg-white p-2 rounded border border-slate-200">Sentinel-2 (MSI Red/NIR)</span>
                  <span className="bg-white p-2 rounded border border-slate-200">NASA ECOSTRESS (ISS)</span>
                  <span className="bg-white p-2 rounded border border-slate-200">CDC SVI Demographics</span>
                </div>
              </div>

              <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                  <Cpu className="w-4 h-4 text-amber-700" /> Layer 2: Radiative Calibration & Spatial Sharpening
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  Converts Digital Numbers (DN) to Top-Of-Atmosphere (TOA) spectral radiance, applies atmospheric water vapor corrections via MODTRAN5, and derives surface emissivity ε using NDVI-based Fractional Vegetation Cover (FVC).
                </p>
                <div className="mt-2 bg-white p-2.5 rounded border border-slate-200 text-xs font-mono text-slate-700">
                  DN &rarr; TOA Radiance (L_λ) &rarr; Brightness Temp (T_b) &rarr; Land Surface Temp (LST) @ 30m
                </div>
              </div>

              <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                  <Server className="w-4 h-4 text-amber-700" /> Layer 3: Spatial Indexing & Demographic Harmonization
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  Re-indexes continuous raster pixels into discrete municipal boundaries and H3 hexagonal hierarchical cells. Joins census-tract socio-economic indicators (income, elderly population, asthma morbidity).
                </p>
              </div>

              <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                  <Activity className="w-4 h-4 text-amber-700" /> Layer 4: Thermodynamic Scenarios & The Robustness Lab
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  Implements the cost-aware scenario engine. Calculates surface temperature depression ΔT based on tree canopy planting, cool roof coatings (albedo), and reflective pavements. Runs percolation connectivity checks to verify whether canopy patches form continuous cooling corridors.
                </p>
              </div>

              <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                  <Eye className="w-4 h-4 text-amber-700" /> Layer 5: Client-Side Interactive D3 Presentation
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  Responsive D3.js vector visualizations, real-time Ordinary Least Squares regression curves, dynamic parameter sliders, and accessible colorblind-safe thermal gradients (Turbo / Inferno).
                </p>
              </div>
            </div>
          )}

          {activeTab === 'equations' && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="text-xs font-mono text-amber-800 font-bold uppercase">Equation 1: Split-Window Radiative Transfer</div>
                <div className="my-2 p-3 bg-white border border-slate-200 rounded font-mono text-center text-sm font-semibold text-slate-900 overflow-x-auto">
                  LST = [ K₂ / ln( (K₁ / L_λ) + 1 ) ] · [ 1 / (1 + (λ · T_sensor / ρ) · ln(ε)) ]
                </div>
                <p className="text-xs text-slate-600">
                  Calibrates sensor thermal radiance L_λ into surface temperature, accounting for surface emissivity ε derived from Sentinel-2 vegetative indices.
                </p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="text-xs font-mono text-amber-800 font-bold uppercase">Equation 2: Thermodynamic Mitigation Attenuation</div>
                <div className="my-2 p-3 bg-white border border-slate-200 rounded font-mono text-center text-sm font-semibold text-slate-900 overflow-x-auto">
                  ΔT_LST = - [ α_tree · (ΔC_veg)^0.75 + β_albedo · Δa_roof · (1 - CF) + γ_pave · ΔP_perm ]
                </div>
                <p className="text-xs text-slate-600">
                  Exploratory scenario model computing net thermodynamic cooling depression from simultaneous vegetative expansion, cool roof retrofits, and permeable pavement.
                </p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="text-xs font-mono text-amber-800 font-bold uppercase">Equation 3: Canopy Percolation Connectivity Criterion</div>
                <div className="my-2 p-3 bg-white border border-slate-200 rounded font-mono text-center text-sm font-semibold text-slate-900 overflow-x-auto">
                  p_canopy ≥ p_c ≈ 0.382 &DoubleLongRightArrow; Convective Corridor Emergence
                </div>
                <p className="text-xs text-slate-600">
                  As shown in Aarti's Robustness Lab, cooling shifts from localized tree shade to macroscopic wind-cooling corridors only when canopy density crosses the critical percolation threshold.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'repository' && (
            <div className="space-y-4">
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-900">
                <div className="flex items-center gap-2 font-bold text-sm">
                  <ShieldCheck className="w-5 h-5 text-amber-700" />
                  Official Repository & Public Documentation
                </div>
                <p className="text-xs mt-1 text-amber-800">
                  The foundational code, open data readiness benchmarks, and Boston case study originate from Aarti Sri Ravikumar's public repository and live research portal.
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <a
                    href="https://github.com/aartisr/urban-heat-democratization"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800"
                  >
                    <Code className="w-3.5 h-3.5" /> github.com/aartisr/urban-heat-democratization <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://urban-heat.ai-aarti.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-800 text-white text-xs font-semibold hover:bg-amber-700"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> urban-heat.ai-aarti.com
                  </a>
                </div>
              </div>

              <div className="text-xs text-slate-600 space-y-2">
                <p>
                  <strong>Responsible Use Notice:</strong> Scenarios are exploratory benchmark aids rather than certified city-engineering guarantees. Local microclimate validation, ground sensors, maintenance schedules, and safety reviews should precede municipal bond or ordinance commitments.
                </p>
                <p>
                  <strong>Democratized Architecture Features:</strong> Automated reproducible workflows, exportable GeoJSON data packages, transparent assumption documentation, and accessible community learning paths.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 px-6 flex items-center justify-between text-xs text-slate-500">
          <div>Architecture Author: <strong>Aarti Sri Ravikumar</strong> (ai-aarti.com)</div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
          >
            Close Specification
          </button>
        </div>
      </div>
    </div>
  );
};
