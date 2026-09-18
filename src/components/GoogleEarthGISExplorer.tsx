import React, { useState } from 'react';
import {
  Layers,
  Globe,
  Maximize2,
  Eye,
  EyeOff,
  Sliders,
  ExternalLink,
  MapPin,
  Trees,
  Sun,
  Building2,
  Wind,
  ShieldAlert,
  Info,
  Check,
  Activity
} from 'lucide-react';
import { METRO_HEAT_DATA } from '../data/urbanHeatData';

export interface GISLayerConfig {
  id: string;
  name: string;
  category: 'Radiometry' | 'Vegetation' | 'Demographics' | '3D Infrastructure' | 'Airflow Graph';
  sensorSource: string;
  resolution: string;
  description: string;
  mathFormula?: string;
  colorScale: string[];
  active: boolean;
  opacity: number;
}

export const INITIAL_GIS_LAYERS: GISLayerConfig[] = [
  {
    id: 'layer-lst-thermal',
    name: '100m Downscaled Thermal LST Radiometry',
    category: 'Radiometry',
    sensorSource: 'Landsat 8/9 TIRS Band 10 & Sentinel-2 MSI',
    resolution: '100m resampled to 30m',
    description: 'Instantaneous Land Surface Temperature (LST) calculated via split-window atmospheric radiance correction and emissivity modeling.',
    mathFormula: 'T_s = \\frac{K_2}{\\ln\\left(\\frac{K_1}{L_\\lambda} + 1\\right)} \\cdot \\frac{1}{1 + (\\lambda T / \\rho) \\ln \\varepsilon}',
    colorScale: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#7f1d1d'],
    active: true,
    opacity: 85
  },
  {
    id: 'layer-canopy-ndvi',
    name: '10m Sentinel-2 Canopy & NDVI Vector Field',
    category: 'Vegetation',
    sensorSource: 'Sentinel-2A/B MultiSpectral Instrument (B4, B8)',
    resolution: '10m spatial grid',
    description: 'High-precision Normalized Difference Vegetation Index (NDVI) and Fractional Vegetation Cover (FVC) calculating tree shade density.',
    mathFormula: 'NDVI = \\frac{NIR - Red}{NIR + Red}, \\quad FVC = \\left(\\frac{NDVI - NDVI_{soil}}{NDVI_{veg} - NDVI_{soil}}\\right)^2',
    colorScale: ['#fef08a', '#86efac', '#22c55e', '#15803d', '#052e16'],
    active: true,
    opacity: 70
  },
  {
    id: 'layer-ecostress-diurnal',
    name: 'ECOSTRESS ISS Nocturnal Heat Trapping',
    category: 'Radiometry',
    sensorSource: 'NASA International Space Station Thermal Radiometer',
    resolution: '70m x 70m overpass',
    description: 'Pre-dawn thermal inertia metrics quantifying nighttime heat release from high thermal mass concrete and masonry facades.',
    mathFormula: 'P = \\frac{\\sqrt{k \\cdot \\rho \\cdot C_p}}{\\Delta T_{diurnal}}',
    colorScale: ['#1e1b4b', '#312e81', '#6366f1', '#a855f7', '#ec4899'],
    active: false,
    opacity: 65
  },
  {
    id: 'layer-cdc-svi',
    name: 'CDC Social Vulnerability Index (SVI) Equity Overlay',
    category: 'Demographics',
    sensorSource: 'CDC/ATSDR SVI & US Census ACS 5-Year Tracts',
    resolution: 'Census Tract Level',
    description: 'Composite socioeconomic vulnerability incorporating poverty, elderly isolation, language barriers, and asthma hospitalizations.',
    mathFormula: 'SVI = \\sum_{i=1}^{16} \\text{PercentileRank}(x_i) \\in [0.00, 1.00]',
    colorScale: ['#f0fdf4', '#bbf7d0', '#fde047', '#f97316', '#b91c1c'],
    active: true,
    opacity: 60
  },
  {
    id: 'layer-3d-buildings',
    name: '3D Buildings & Rooftop Albedo Retrofit Vector Envelopes',
    category: '3D Infrastructure',
    sensorSource: 'Boston GIS Open Data & High-Res LIDAR Point Clouds',
    resolution: 'Building Footprint Vector Polygons (3D extruded height)',
    description: '3D building geometry highlighting flat rooftop square footage suitable for high-albedo coatings (alpha = 0.85) vs vertical canyon wall re-radiation.',
    mathFormula: 'S_{refl} = \\alpha_{roof} \\cdot S_\\downarrow \\cdot \\cos(\\theta_{canyon})',
    colorScale: ['#94a3b8', '#64748b', '#334155', '#38bdf8', '#0284c7'],
    active: false,
    opacity: 80
  },
  {
    id: 'layer-cheeger-graph',
    name: 'Convective Airflow & Graph Laplacian Cheeger Cut Corridors',
    category: 'Airflow Graph',
    sensorSource: 'Spectral Graph Theory on Urban Street Edge Networks',
    resolution: 'Graph Node/Edge Topology (p_c ≈ 0.382)',
    description: 'Optimal green infrastructure corridor cuts breaking connected thermal heat islands and drawing sea/river breezes into dense tracts.',
    mathFormula: '\\phi(G) = \\min_{S \\subset V} \\frac{|\\partial S|}{\\min(\\text{vol}(S), \\text{vol}(\\bar{S}))} \\ge \\frac{\\lambda_2}{2}',
    colorScale: ['#06b6d4', '#0891b2', '#0e7490', '#155e75', '#164e63'],
    active: true,
    opacity: 75
  }
];

export const GoogleEarthGISExplorer: React.FC = () => {
  const [layers, setLayers] = useState<GISLayerConfig[]>(INITIAL_GIS_LAYERS);
  const [selectedTractId, setSelectedTractId] = useState<string>('BOS-0101'); // Roxbury default
  const [is3DTilted, setIs3DTilted] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'map' | 'layers' | 'honesty-physics' | 'raw-data'>('map');

  const selectedTract = METRO_HEAT_DATA.find((t) => t.tractId === selectedTractId) || METRO_HEAT_DATA[0];

  const toggleLayer = (id: string) => {
    setLayers((prev) =>
      prev.map((l) => (l.id === id ? { ...l, active: !l.active } : l))
    );
  };

  const updateOpacity = (id: string, opacity: number) => {
    setLayers((prev) =>
      prev.map((l) => (l.id === id ? { ...l, opacity } : l))
    );
  };

  return (
    <div className="my-8 rounded-2xl border border-slate-300 bg-slate-900 text-slate-100 shadow-xl overflow-hidden font-sans">
      {/* Explorer Top Header Bar */}
      <div className="bg-slate-950 px-5 py-4 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-400">
            <Globe className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-lg font-serif font-bold text-slate-100">
                Interactive Google Earth / Multi-Layer GIS Explorer
              </h4>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] font-mono uppercase tracking-wider">
                Live Spatial Stack
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Multi-sensor satellite radiometry, 3D urban canyons, spectral graph cuts & CDC equity overlays from <code className="text-amber-300 font-mono">urban-heat.ai-aarti.com</code>
            </p>
          </div>
        </div>

        {/* View Mode Tabs & Launch Live Website */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setActiveTab('map')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 ${
                activeTab === 'map'
                  ? 'bg-amber-500 text-slate-950 font-semibold shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>3D Map View</span>
            </button>
            <button
              onClick={() => setActiveTab('layers')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 ${
                activeTab === 'layers'
                  ? 'bg-amber-500 text-slate-950 font-semibold shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>GIS Layer Stack ({layers.filter((l) => l.active).length})</span>
            </button>
            <button
              onClick={() => setActiveTab('honesty-physics')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 ${
                activeTab === 'honesty-physics'
                  ? 'bg-amber-500 text-slate-950 font-semibold shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Physical Trade-Offs</span>
            </button>
          </div>

          <a
            href="https://urban-heat.ai-aarti.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-slate-950 text-xs font-semibold transition-all shadow-md hover:scale-[1.02]"
          >
            <span>Live Earth Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Main Container Layout */}
      {activeTab === 'map' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
          {/* Main Simulated Google Earth Viewport (Columns 8/12) */}
          <div className="lg:col-span-8 relative bg-slate-950 flex flex-col justify-between p-4 overflow-hidden border-b lg:border-b-0 lg:border-r border-slate-800 min-h-[420px]">
            {/* Background Satellite Base Imagery Pattern */}
            <div
              className={`absolute inset-0 bg-cover bg-center transition-transform duration-700 ${
                is3DTilted ? 'scale-105 rotate-1 perspective-1000' : 'scale-100'
              }`}
              style={{
                backgroundImage:
                  'radial-gradient(circle at 50% 50%, rgba(15, 23, 42, 0.4) 0%, rgba(2, 6, 23, 0.95) 100%), url("https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80")',
                backgroundBlendMode: 'overlay'
              }}
            />

            {/* Layer Heatmap Canvas Overlays */}
            <div className="absolute inset-0 pointer-events-none opacity-80">
              {layers.find((l) => l.id === 'layer-lst-thermal')?.active && (
                <div
                  className="absolute inset-0 bg-gradient-to-tr from-blue-600/30 via-amber-500/40 to-red-600/60 transition-opacity duration-300"
                  style={{
                    opacity: (layers.find((l) => l.id === 'layer-lst-thermal')?.opacity || 80) / 100
                  }}
                />
              )}
              {layers.find((l) => l.id === 'layer-canopy-ndvi')?.active && (
                <div
                  className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/50 via-transparent to-transparent transition-opacity duration-300"
                  style={{
                    opacity: (layers.find((l) => l.id === 'layer-canopy-ndvi')?.opacity || 70) / 100
                  }}
                />
              )}
              {layers.find((l) => l.id === 'layer-cheeger-graph')?.active && (
                <svg className="absolute inset-0 w-full h-full stroke-cyan-400/80 stroke-2" style={{ filter: 'drop-shadow(0 0 6px #06b6d4)' }}>
                  <path d="M 100 200 Q 250 150 400 300 T 700 180" fill="none" strokeDasharray="6,6" />
                  <path d="M 150 350 Q 350 280 600 380" fill="none" strokeDasharray="4,4" />
                </svg>
              )}
            </div>

            {/* Map Top Overlay Controls */}
            <div className="relative z-10 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-xl px-3 py-1.5 text-xs text-slate-200">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-semibold text-white">{selectedTract.neighborhood}</span>
                <span className="text-slate-400 font-mono text-[11px]">({selectedTract.tractId})</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIs3DTilted(!is3DTilted)}
                  className={`px-2.5 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 backdrop-blur-md transition-colors ${
                    is3DTilted
                      ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                      : 'bg-slate-900/80 border-slate-700 text-slate-300 hover:text-white'
                  }`}
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>{is3DTilted ? '3D Isometric View' : '2D Top-Down View'}</span>
                </button>
              </div>
            </div>

            {/* Interactive Census Tract Pins on Map */}
            <div className="relative z-10 my-auto grid grid-cols-2 sm:grid-cols-4 gap-3 py-6">
              {METRO_HEAT_DATA.slice(0, 4).map((t) => {
                const isSelected = t.tractId === selectedTractId;
                const isExtreme = t.heatVulnerabilityRank === 'Extreme';

                return (
                  <button
                    key={t.tractId}
                    onClick={() => setSelectedTractId(t.tractId)}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? 'bg-slate-900/95 border-amber-400 shadow-lg shadow-amber-500/10 ring-2 ring-amber-400/30 scale-[1.03]'
                        : 'bg-slate-950/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900/80'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-xs font-bold text-slate-200 truncate">{t.neighborhood}</span>
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                          isExtreme ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        }`}
                      >
                        {t.lstFahrenheit.toFixed(0)}°F
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-400 flex items-center justify-between">
                      <span>SVI: {t.socialVulnerabilityIndex.toFixed(2)}</span>
                      <span>Tree: {t.canopyPercent}%</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Map Bottom Legend Bar */}
            <div className="relative z-10 bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-xl p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-slate-400 font-mono text-[11px]">Active Palette:</span>
                <div className="flex items-center gap-1">
                  <span className="text-[10px] text-blue-400 font-mono">28°C (Cool)</span>
                  <div className="w-24 h-2.5 rounded-full bg-gradient-to-r from-blue-500 via-emerald-400 via-amber-400 to-red-600" />
                  <span className="text-[10px] text-red-400 font-mono">42°C (Extreme)</span>
                </div>
              </div>

              <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-amber-400" />
                <span>Selected: <strong className="text-white">{selectedTract.neighborhood}</strong> ({selectedTract.lstCelsius}°C / {selectedTract.lstFahrenheit}°F)</span>
              </div>
            </div>
          </div>

          {/* Right Inspector & Active Layer Panel (Columns 4/12) */}
          <div className="lg:col-span-4 p-5 bg-slate-900/80 flex flex-col justify-between space-y-5">
            {/* Tract Physical Profile HUD */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h5 className="text-sm font-serif font-bold text-slate-100 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  Tract Microclimate Profile
                </h5>
                <span className="text-xs font-mono text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                  {selectedTract.tractId}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <div className="text-slate-400 text-[10px]">Land Surface Temp</div>
                  <div className="text-base font-bold text-amber-400 mt-0.5">
                    {selectedTract.lstCelsius}°C <span className="text-xs font-normal text-slate-400">({selectedTract.lstFahrenheit}°F)</span>
                  </div>
                </div>

                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <div className="text-slate-400 text-[10px]">Tree Canopy Cover</div>
                  <div className="text-base font-bold text-emerald-400 mt-0.5">
                    {selectedTract.canopyPercent}% <span className="text-xs font-normal text-slate-400">(NDVI {selectedTract.ndvi})</span>
                  </div>
                </div>

                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <div className="text-slate-400 text-[10px]">Impervious Surface</div>
                  <div className="text-base font-bold text-slate-200 mt-0.5">
                    {selectedTract.imperviousSurfacePercent}%
                  </div>
                </div>

                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <div className="text-slate-400 text-[10px]">CDC Vulnerability (SVI)</div>
                  <div className="text-base font-bold text-red-400 mt-0.5">
                    {selectedTract.socialVulnerabilityIndex.toFixed(2)} / 1.00
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Layer Visibility Toggles */}
            <div className="space-y-2.5 border-t border-slate-800 pt-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-300">Active GIS Stack Layers</span>
                <span className="text-slate-400 text-[11px]">{layers.filter((l) => l.active).length} / {layers.length} Active</span>
              </div>

              <div className="space-y-1.5 max-h-[180px] overflow-y-auto pr-1">
                {layers.map((layer) => (
                  <div
                    key={layer.id}
                    onClick={() => toggleLayer(layer.id)}
                    className={`p-2 rounded-xl border text-xs cursor-pointer transition-all flex items-center justify-between ${
                      layer.active
                        ? 'bg-slate-800/90 border-slate-700 text-slate-200'
                        : 'bg-slate-950/60 border-slate-800 text-slate-500 opacity-60'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      {layer.active ? (
                        <Eye className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                      ) : (
                        <EyeOff className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                      )}
                      <span className="truncate text-[11px] font-medium">{layer.name}</span>
                    </div>

                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-400">
                      {layer.category}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Insight Footer */}
            <div className="bg-amber-950/30 border border-amber-500/20 rounded-xl p-3 text-[11px] text-amber-200/90 space-y-1">
              <div className="font-semibold text-amber-300 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-amber-400" />
                <span>Google Earth Layer Coupling</span>
              </div>
              <p className="leading-relaxed text-slate-300">
                On the live website, these layers render over high-resolution Photorealistic 3D Google Earth tiles, allowing municipal planners to simulate vertical urban canyon cooling.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Full GIS Layer Stack Inspector */}
      {activeTab === 'layers' && (
        <div className="p-6 space-y-6">
          <div className="border-b border-slate-800 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <h5 className="text-base font-serif font-bold text-slate-100 flex items-center gap-2">
                <Layers className="w-5 h-5 text-amber-400" />
                Full 6-Layer Multi-Sensor Spatial GIS Architecture
              </h5>
              <p className="text-xs text-slate-400 mt-1">
                In-depth sensor calibration specifications, mathematical equations, spatial resolutions, and layer opacity controls.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {layers.map((layer) => (
              <div
                key={layer.id}
                className={`p-4 rounded-2xl border transition-all ${
                  layer.active
                    ? 'bg-slate-800/80 border-slate-700 text-slate-100'
                    : 'bg-slate-950/80 border-slate-800 text-slate-400 opacity-70'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                      {layer.category}
                    </span>
                    <h6 className="text-sm font-bold text-white mt-1.5">{layer.name}</h6>
                  </div>

                  <button
                    onClick={() => toggleLayer(layer.id)}
                    className={`px-3 py-1 rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors ${
                      layer.active
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-slate-900 text-slate-400 border border-slate-700 hover:text-white'
                    }`}
                  >
                    {layer.active ? <Check className="w-3.5 h-3.5" /> : null}
                    <span>{layer.active ? 'Active' : 'Disabled'}</span>
                  </button>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-3">{layer.description}</p>

                <div className="space-y-2 text-[11px] font-mono bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-slate-300">
                  <div><strong className="text-slate-400 font-sans">Sensor Source:</strong> {layer.sensorSource}</div>
                  <div><strong className="text-slate-400 font-sans">Resolution:</strong> {layer.resolution}</div>
                  {layer.mathFormula && (
                    <div className="text-amber-300 pt-1 border-t border-slate-800">
                      <strong className="text-slate-400 font-sans">Formulation:</strong> <code className="bg-slate-900 px-1 py-0.5 rounded">{layer.mathFormula}</code>
                    </div>
                  )}
                </div>

                {/* Opacity Control Slider */}
                {layer.active && (
                  <div className="mt-3 flex items-center gap-3 text-xs">
                    <Sliders className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-slate-400 text-[11px]">Layer Opacity:</span>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={layer.opacity}
                      onChange={(e) => updateOpacity(layer.id, parseInt(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                    <span className="font-mono text-amber-400 text-[11px] w-8">{layer.opacity}%</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Brutal Physical & Thermodynamic Honesty */}
      {activeTab === 'honesty-physics' && (
        <div className="p-6 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h5 className="text-base font-serif font-bold text-amber-300 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-400" />
              Mathematical & Physical Trade-Offs in Urban Heat Mitigation
            </h5>
            <p className="text-xs text-slate-400 mt-1">
              An unvarnished, mathematically honest analysis of thermodynamic realities, time-lags, and physical limits often omitted in policy proposals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Strategy 1: Tree Canopy / Afforestation */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <Trees className="w-4 h-4" />
                <span>1. Urban Tree Canopy (Afforestation)</span>
              </div>

              <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
                <p>
                  <strong className="text-white">15-20 Year Maturity Time-Lag:</strong> Young saplings offer minimal shading (<code className="text-amber-300 font-mono">LAI &lt; 0.8</code>). Full evapotranspirative cooling capacity requires 15–20 years of continuous municipal maintenance and sapling survival.
                </p>
                <p>
                  <strong className="text-white">Drought & Stomatal Shutdown:</strong> During severe heatwaves with high Vapor Pressure Deficit (<code className="text-amber-300 font-mono">VPD &gt; 2.8 kPa</code>), trees experience stomatal closure (<code className="text-amber-300 font-mono">g_s → 0</code>) to prevent xylem cavitation. This shuts off latent heat flux (<code className="text-amber-300 font-mono">LE → 0</code>), raising leaf temperature above ambient air and dumping sensible heat <code className="text-amber-300 font-mono">H</code> into the local environment.
                </p>
                <p>
                  <strong className="text-white">Boundary Heat Advection:</strong> Isolated tree plantings smaller than the critical radius (<code className="text-amber-300 font-mono">R_crit ≈ 250m</code>) are overwhelmed by heat advected from surrounding hot asphalt (<code className="text-amber-300 font-mono">T_s &gt; 48°C</code>).
                </p>
              </div>
            </div>

            {/* Strategy 2: Cool Roofs & High Albedo Coatings */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-sky-400 font-bold text-sm">
                <Sun className="w-4 h-4" />
                <span>2. Cool Roofs (High Albedo Coatings)</span>
              </div>

              <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
                <p>
                  <strong className="text-white">Soiling & Albedo Decay:</strong> Initial high reflectance (<code className="text-amber-300 font-mono">α₀ = 0.85</code>) degrades by 20–30% within 24 months due to atmospheric soot, diesel particulates, and microbial biofilm soiling (<code className="text-amber-300 font-mono">α_aged ≈ 0.58</code>) unless recoated or washed.
                </p>
                <p>
                  <strong className="text-white">Urban Canyon Re-Radiation:</strong> Reflected shortwave solar radiation from cool flat roofs is absorbed by adjacent vertical building glass/brick facades, increasing building envelope cooling loads in dense urban canyons.
                </p>
                <p>
                  <strong className="text-white">Northern Winter Heating Penalty:</strong> In temperate latitudes like Boston (42°N), high roof albedo increases winter space heating energy consumption (<code className="text-amber-300 font-mono font-bold font-mono">ΔE_winter &gt; 0</code>) during non-cooling months.
                </p>
              </div>
            </div>

            {/* Strategy 3: Permeable & Reflective Pavements */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <Building2 className="w-4 h-4" />
                <span>3. Cool & Permeable Pavements</span>
              </div>

              <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
                <p>
                  <strong className="text-white">Soil Moisture Requirement:</strong> Permeable pavements cool exclusively through latent heat flux (<code className="text-amber-300 font-mono">LE = λE</code>). During rainless summer heatwaves, soil moisture drops below residual content (<code className="text-amber-300 font-mono">SM &lt; SM_res</code>), shutting down evaporative cooling.
                </p>
                <p>
                  <strong className="text-white">Higher Daytime Surface Skin Temp:</strong> Dry permeable asphalt has lower thermal mass than solid concrete, resulting in higher surface skin temperatures (<code className="text-amber-300 font-mono">T_s</code>) during peak afternoon solar radiation (12:00–15:00).
                </p>
                <p>
                  <strong className="text-white">Pedestrian Mean Radiant Stress:</strong> Reflective pavements (<code className="text-amber-300 font-mono">α ≥ 0.40</code>) bounce radiation directly onto pedestrians at 1.5m height, increasing Mean Radiant Temperature (MRT) and physiological heat stress.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-emerald-950/30 border border-emerald-500/30 p-4 rounded-2xl flex items-start gap-3 text-xs text-emerald-200">
            <Wind className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-emerald-300 font-bold">The Spatial Solution: Spectral Graph Percolation Corridors</strong>
              <p className="mt-1 leading-relaxed text-slate-300">
                To overcome individual trade-offs, interventions must cross the bond percolation threshold (<code className="text-amber-300 font-mono font-bold font-mono">p_c ≈ 0.382</code>). Concentrating trees, cool roofs, and permeable pavements into continuous linear corridors connects microclimatic cooling networks, inducing convective pressure gradients (<code className="text-amber-300 font-mono font-bold font-mono">ΔP = -ρ g (ΔT/T₀) Δz</code>) that draw sea breezes into dense inland tracts.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
