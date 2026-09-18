import React, { useState } from 'react';
import { METRO_HEAT_DATA } from '../../data/urbanHeatData';
import { ThermalDataPoint } from '../../types';
import { Flame, ShieldAlert, Sparkles, Navigation, Layers, Compass } from 'lucide-react';

export const MetropolitanHeatMap: React.FC = () => {
  const [activeMetro, setActiveMetro] = useState<string>('Greater Boston');
  const [selectedTract, setSelectedTract] = useState<ThermalDataPoint>(METRO_HEAT_DATA[0]);
  const [rankFilter, setRankFilter] = useState<string>('All');

  const metros = ['Greater Boston', 'Phoenix Metro', 'Houston Metro', 'Los Angeles Metro', 'Chicago Metro', 'Atlanta Metro'];

  const metroData = METRO_HEAT_DATA.filter(d => d.metroArea === activeMetro);
  const displayedTracts = metroData.filter(d => rankFilter === 'All' || d.heatVulnerabilityRank === rankFilter);

  // Baseline ambient regional air temperature for delta comparison
  const regionalBaseline = activeMetro === 'Phoenix Metro' ? 41.5 : activeMetro === 'Houston Metro' ? 34.2 : 31.0;

  return (
    <div id="metropolitan-heat-map" className="bg-[#FAF8F5] border border-[#E2DCD5] rounded-xl p-5 shadow-xs my-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-[#E2DCD5]">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-red-100 text-red-900 border border-red-300">
              <Flame className="w-3 h-3 mr-1 text-red-600" /> Spatial Microclimate Matrix
            </span>
            <span className="text-xs font-mono text-slate-500">Landsat 30m Grid</span>
          </div>
          <h4 className="text-lg font-serif font-bold text-slate-900 mt-1">
            Metropolitan Thermal Intensity & Cooling Deficit Grid
          </h4>
          <p className="text-xs text-slate-600">
            Spatial thermal anomaly distribution across target metropolitan microclimates. Click any tract cell to probe radiometric readings.
          </p>
        </div>

        {/* Metro Switcher */}
        <div className="flex flex-wrap items-center gap-1.5">
          {metros.map(metro => (
            <button
              key={metro}
              onClick={() => {
                setActiveMetro(metro);
                const first = METRO_HEAT_DATA.find(d => d.metroArea === metro);
                if (first) setSelectedTract(first);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeMetro === metro
                  ? 'bg-slate-900 text-white font-semibold shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {metro.replace(' Metro', '')}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid & Deep Inspector Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-4">
        {/* Left: Interactive Microclimate Tract Tiles */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-600">
            <span className="font-semibold text-slate-800">
              {activeMetro} Study Tracts ({displayedTracts.length})
            </span>
            <div className="flex items-center gap-1">
              <span className="text-slate-500">Filter Vulnerability:</span>
              <select
                value={rankFilter}
                onChange={(e) => setRankFilter(e.target.value)}
                className="bg-white border border-slate-300 rounded px-2 py-0.5 text-xs text-slate-700"
              >
                <option value="All">All Tiers</option>
                <option value="Extreme">Extreme Risk</option>
                <option value="High">High Risk</option>
                <option value="Moderate">Moderate</option>
                <option value="Low">Low Risk</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[380px] overflow-y-auto pr-1">
            {displayedTracts.map(tract => {
              const deltaT = tract.lstCelsius - regionalBaseline;
              const isSelected = selectedTract.tractId === tract.tractId;
              const isExtreme = tract.heatVulnerabilityRank === 'Extreme';

              // Color coding based on temperature
              const tempColor = tract.lstCelsius >= 42
                ? 'border-purple-300 bg-purple-50/50'
                : tract.lstCelsius >= 37
                ? 'border-red-300 bg-red-50/60'
                : tract.lstCelsius >= 34
                ? 'border-amber-300 bg-amber-50/50'
                : 'border-emerald-300 bg-emerald-50/50';

              return (
                <div
                  key={tract.tractId}
                  onClick={() => setSelectedTract(tract)}
                  className={`p-3 rounded-lg border text-left cursor-pointer transition-all ${tempColor} ${
                    isSelected ? 'ring-2 ring-slate-900 shadow-sm scale-[1.01]' : 'hover:border-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 truncate pr-2">
                      {tract.neighborhood}
                    </span>
                    <span className="font-mono text-[10px] text-slate-500 shrink-0">
                      {tract.tractId}
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between mt-2">
                    <div>
                      <span className="text-xl font-bold font-serif text-slate-900">
                        {tract.lstCelsius}°C
                      </span>
                      <span className="text-xs text-slate-500 ml-1">
                        ({tract.lstFahrenheit}°F)
                      </span>
                    </div>

                    <div className="text-right">
                      <span className={`text-xs font-semibold px-1.5 py-0.5 rounded ${
                        deltaT > 5 ? 'bg-red-200 text-red-900' : deltaT > 2 ? 'bg-amber-200 text-amber-900' : 'bg-emerald-200 text-emerald-900'
                      }`}>
                        {deltaT >= 0 ? `+${deltaT.toFixed(1)}` : deltaT.toFixed(1)}°C Δ
                      </span>
                    </div>
                  </div>

                  {/* Micro Indicators */}
                  <div className="grid grid-cols-2 gap-1 mt-2.5 pt-2 border-t border-slate-200/60 text-[11px] text-slate-600">
                    <div>Canopy: <strong className="text-slate-800">{tract.canopyPercent}%</strong></div>
                    <div>Cooling: <strong className="text-slate-800">{tract.coolingAccessIndex}/100</strong></div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Color Scale Legend */}
          <div className="bg-white rounded-lg p-3 border border-slate-200">
            <div className="flex items-center justify-between text-[11px] text-slate-600 mb-1">
              <span>Cooling Zone (28°C)</span>
              <span className="font-semibold text-slate-700">Surface Thermal Radiance Scale (LST)</span>
              <span>Extreme Heat Anomaly (50°C)</span>
            </div>
            <div className="h-3 rounded-full w-full bg-gradient-to-r from-emerald-500 via-amber-400 via-red-500 to-purple-800"></div>
          </div>
        </div>

        {/* Right: Focused Tract Thermal Profile Inspector */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-4 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center justify-between border-b pb-2">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-amber-800 flex items-center gap-1">
                <Compass className="w-3.5 h-3.5" /> Tract Radiometric Probe
              </span>
              <span className="font-mono text-xs px-2 py-0.5 bg-slate-100 rounded text-slate-700">
                {selectedTract.tractId}
              </span>
            </div>

            <h5 className="font-serif font-bold text-lg text-slate-900 mt-2">
              {selectedTract.neighborhood}
            </h5>
            <p className="text-xs text-slate-500">
              {selectedTract.metroArea} • Population: {selectedTract.population.toLocaleString()} residents
            </p>

            {/* Thermal Big Stat */}
            <div className="mt-4 p-3.5 rounded-xl bg-amber-50/70 border border-amber-200">
              <div className="text-xs text-amber-900 font-medium">Peak Surface Temperature (LST):</div>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-3xl font-serif font-extrabold text-red-700">
                  {selectedTract.lstCelsius}°C
                </span>
                <span className="text-base text-slate-700 font-medium">
                  / {selectedTract.lstFahrenheit}°F
                </span>
              </div>
              <div className="text-xs text-slate-600 mt-1">
                Thermal Anomaly above regional baseline:{' '}
                <strong className="text-red-700">
                  +{(selectedTract.lstCelsius - regionalBaseline).toFixed(1)}°C (+{((selectedTract.lstCelsius - regionalBaseline) * 1.8).toFixed(1)}°F)
                </strong>
              </div>
            </div>

            {/* Granular Sensor Metrics */}
            <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <div className="text-slate-500 text-[11px]">Vegetative Canopy:</div>
                <div className="text-base font-bold text-emerald-700 mt-0.5">{selectedTract.canopyPercent}%</div>
                <div className="text-[10px] text-slate-500">Sentinel-2 NDVI: {selectedTract.ndvi}</div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <div className="text-slate-500 text-[11px]">Social Vulnerability:</div>
                <div className="text-base font-bold text-purple-700 mt-0.5">{selectedTract.socialVulnerabilityIndex}</div>
                <div className="text-[10px] text-slate-500">CDC SVI percentile</div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <div className="text-slate-500 text-[11px]">Impervious Surface:</div>
                <div className="text-base font-bold text-slate-800 mt-0.5">{selectedTract.imperviousSurfacePercent}%</div>
                <div className="text-[10px] text-slate-500">Albedo factor: {selectedTract.albedo}</div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <div className="text-slate-500 text-[11px]">Cooling Access Score:</div>
                <div className="text-base font-bold text-blue-700 mt-0.5">{selectedTract.coolingAccessIndex}/100</div>
                <div className="text-[10px] text-slate-500">Public shade & refuge</div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200">
            <div className="text-[11px] text-slate-500 leading-snug">
              <strong>Academic Audit Note:</strong> As defined in Aarti's Urban Heat Democratization architecture, this data incorporates atmospheric radiative transfer calibration (MODTRAN5) and split-window algorithms.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
