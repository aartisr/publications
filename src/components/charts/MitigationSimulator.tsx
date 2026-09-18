import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Sliders, RefreshCw, Zap, TrendingDown, DollarSign, CheckCircle2, ShieldAlert } from 'lucide-react';

export const MitigationSimulator: React.FC = () => {
  const chartRef = useRef<SVGSVGElement>(null);
  const [canopyIncrease, setCanopyIncrease] = useState<number>(15); // +15%
  const [albedoIncrease, setAlbedoIncrease] = useState<number>(0.35); // +0.35 albedo
  const [permeableIncrease, setPermeableIncrease] = useState<number>(20); // +20% permeable
  const [targetTract, setTargetTract] = useState<string>('Roxbury (Nubian Sq)');

  // Baseline conditions for key study tracts
  const tractBaselines: Record<string, { baselineLST: number; canopy: number; svi: number }> = {
    'Roxbury (Nubian Sq)': { baselineLST: 38.4, canopy: 8.2, svi: 0.94 },
    'Chinatown / Leather Dist': { baselineLST: 39.8, canopy: 4.1, svi: 0.88 },
    'East Boston (Maverick)': { baselineLST: 37.6, canopy: 9.8, svi: 0.89 },
    'Dorchester (Four Corners)': { baselineLST: 37.1, canopy: 14.5, svi: 0.85 },
    'South Phoenix / Maryvale': { baselineLST: 49.2, canopy: 3.2, svi: 0.96 }
  };

  const currentBaseline = tractBaselines[targetTract] || tractBaselines['Roxbury (Nubian Sq)'];

  // Physics-based empirical cooling model:
  // deltaT_LST = -(0.28 * canopy^0.75 + 11.4 * albedo * 0.85 + 0.14 * permeable)
  const canopyCooling = 0.28 * Math.pow(canopyIncrease, 0.75);
  const albedoCooling = 11.4 * albedoIncrease * 0.75;
  const pavementCooling = 0.12 * permeableIncrease;

  const totalDeltaLST = canopyCooling + albedoCooling + pavementCooling;
  const mitigatedLST = Math.max(22, currentBaseline.baselineLST - totalDeltaLST);

  // Projected ambient air temperature relief (empirical ratio ~ 0.38 of LST)
  const airRelief = totalDeltaLST * 0.42;

  // Emergency heat visits avoided (per 10,000 population during 5-day heat wave)
  const heatVisitsAvoided = Math.round(airRelief * 14.2);

  // Estimated implementation cost index vs. cooling ratio
  const costIndex = (canopyIncrease * 1.8 + albedoIncrease * 120 + permeableIncrease * 2.2);

  useEffect(() => {
    if (!chartRef.current) return;

    const width = 460;
    const height = 220;
    const margin = { top: 25, right: 30, bottom: 40, left: 90 };

    const svg = d3.select(chartRef.current);
    svg.selectAll('*').remove();

    svg.attr('viewBox', `0 0 ${width} ${height}`)
       .attr('width', '100%')
       .attr('height', height);

    const data = [
      { label: 'Baseline LST', value: currentBaseline.baselineLST, color: '#DC2626' },
      { label: 'Mitigated LST', value: mitigatedLST, color: '#059669' }
    ];

    const yScale = d3.scaleBand()
      .domain(data.map(d => d.label))
      .range([margin.top, height - margin.bottom])
      .padding(0.35);

    const xScale = d3.scaleLinear()
      .domain([0, Math.max(55, currentBaseline.baselineLST + 5)])
      .range([margin.left, width - margin.right]);

    // Gridlines
    svg.append('g')
      .attr('transform', `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(xScale).ticks(5).tickFormat(d => `${d}°C`))
      .attr('color', '#94A3B8')
      .attr('font-size', '10px');

    // Bars
    svg.selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('y', d => yScale(d.label)!)
      .attr('x', margin.left)
      .attr('height', yScale.bandwidth())
      .attr('width', d => xScale(d.value) - margin.left)
      .attr('fill', d => d.color)
      .attr('rx', 4);

    // Value Labels inside/next to bars
    svg.selectAll('.bar-label')
      .data(data)
      .enter()
      .append('text')
      .attr('y', d => yScale(d.label)! + yScale.bandwidth() / 2 + 4)
      .attr('x', d => xScale(d.value) + 8)
      .attr('fill', '#0F172A')
      .attr('font-size', '12px')
      .attr('font-weight', '700')
      .text(d => `${d.value.toFixed(1)}°C (${(d.value * 9/5 + 32).toFixed(1)}°F)`);

    // Y Axis Labels
    svg.append('g')
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(yScale))
      .attr('color', '#334155')
      .attr('font-size', '11px')
      .attr('font-weight', '600');

  }, [currentBaseline, mitigatedLST]);

  const handleReset = () => {
    setCanopyIncrease(15);
    setAlbedoIncrease(0.35);
    setPermeableIncrease(20);
  };

  return (
    <div id="mitigation-simulator" className="bg-[#FAF8F5] border border-[#E2DCD5] rounded-xl p-5 shadow-xs my-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#E2DCD5]">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-emerald-100 text-emerald-900 border border-emerald-300">
              <Sliders className="w-3 h-3 mr-1 text-emerald-700" /> D3 Thermodynamic Simulator
            </span>
            <span className="text-xs font-mono text-slate-500">Benchmark Mode</span>
          </div>
          <h4 className="text-lg font-serif font-bold text-slate-900 mt-1">
            Cost-Aware Urban Heat Mitigation Scenario Engine
          </h4>
          <p className="text-xs text-slate-600">
            Interactive parameter exploration based on Aarti Sri Ravikumar's Urban Heat Democratization formulations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={targetTract}
            onChange={(e) => setTargetTract(e.target.value)}
            className="text-xs bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 font-medium text-slate-800"
          >
            {Object.keys(tractBaselines).map(name => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>

          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1 text-xs text-slate-600 hover:text-slate-900 bg-white border border-slate-300 rounded-lg px-2.5 py-1.5"
            title="Reset parameters"
          >
            <RefreshCw className="w-3 h-3" /> Reset
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-4">
        {/* Left: Sliders */}
        <div className="lg:col-span-6 space-y-4">
          {/* Slider 1: Tree Canopy */}
          <div className="bg-white p-3.5 rounded-lg border border-slate-200">
            <div className="flex items-center justify-between text-xs font-medium">
              <span className="text-slate-800 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                Tree Canopy Expansion (ΔCanopy %)
              </span>
              <span className="font-mono font-bold text-emerald-800">+{canopyIncrease}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="35"
              step="1"
              value={canopyIncrease}
              onChange={(e) => setCanopyIncrease(Number(e.target.value))}
              className="w-full mt-2 accent-emerald-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>0% (Status Quo)</span>
              <span>+15% (Target)</span>
              <span>+35% (Max Urban Density)</span>
            </div>
            <div className="text-[11px] text-emerald-700 mt-1">
              Thermodynamic relief: -{canopyCooling.toFixed(2)}°C surface depression
            </div>
          </div>

          {/* Slider 2: Cool Roof Albedo */}
          <div className="bg-white p-3.5 rounded-lg border border-slate-200">
            <div className="flex items-center justify-between text-xs font-medium">
              <span className="text-slate-800 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                Cool Roof Albedo Increase (Δα)
              </span>
              <span className="font-mono font-bold text-blue-800">+{albedoIncrease.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="0"
              max="0.60"
              step="0.05"
              value={albedoIncrease}
              onChange={(e) => setAlbedoIncrease(Number(e.target.value))}
              className="w-full mt-2 accent-blue-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>+0.0 (Standard Asphalt)</span>
              <span>+0.35 (Reflective Coating)</span>
              <span>+0.60 (High-Solar Albedo)</span>
            </div>
            <div className="text-[11px] text-blue-700 mt-1">
              Thermodynamic relief: -{albedoCooling.toFixed(2)}°C surface depression
            </div>
          </div>

          {/* Slider 3: Permeable Pavement */}
          <div className="bg-white p-3.5 rounded-lg border border-slate-200">
            <div className="flex items-center justify-between text-xs font-medium">
              <span className="text-slate-800 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                Permeable / Cool Pavements (ΔPave %)
              </span>
              <span className="font-mono font-bold text-amber-800">+{permeableIncrease}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="40"
              step="2"
              value={permeableIncrease}
              onChange={(e) => setPermeableIncrease(Number(e.target.value))}
              className="w-full mt-2 accent-amber-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>0%</span>
              <span>+20% (Main Corridors)</span>
              <span>+40% (Comprehensive Retrofit)</span>
            </div>
            <div className="text-[11px] text-amber-700 mt-1">
              Thermodynamic relief: -{pavementCooling.toFixed(2)}°C surface depression
            </div>
          </div>
        </div>

        {/* Right: Real-time D3 Outputs & Outcome Metrics */}
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-xl p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b pb-2 mb-2">
              <span className="text-xs font-bold text-slate-800">
                Thermodynamic Impact for {targetTract}
              </span>
              <span className="text-[11px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-semibold">
                ΔT: -{totalDeltaLST.toFixed(1)}°C (-{(totalDeltaLST * 1.8).toFixed(1)}°F)
              </span>
            </div>

            {/* D3 Comparison Bar Chart */}
            <svg ref={chartRef} className="w-full"></svg>

            {/* Outcome KPI Cards */}
            <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-100 text-center">
              <div className="p-2 bg-slate-50 rounded-lg">
                <div className="text-[10px] text-slate-500 font-medium">Pedestrian Air Relief</div>
                <div className="text-base font-bold text-emerald-700 mt-0.5">
                  -{airRelief.toFixed(1)}°C
                </div>
                <div className="text-[9px] text-slate-400">Ambient convective</div>
              </div>

              <div className="p-2 bg-slate-50 rounded-lg">
                <div className="text-[10px] text-slate-500 font-medium">ER Heat Visits Avoided</div>
                <div className="text-base font-bold text-purple-700 mt-0.5">
                  ~{heatVisitsAvoided}
                </div>
                <div className="text-[9px] text-slate-400">per 10k during heatwave</div>
              </div>

              <div className="p-2 bg-slate-50 rounded-lg">
                <div className="text-[10px] text-slate-500 font-medium">Cost-Impact Score</div>
                <div className="text-base font-bold text-amber-700 mt-0.5">
                  {((totalDeltaLST / (costIndex + 1)) * 100).toFixed(1)}
                </div>
                <div className="text-[9px] text-slate-400">Efficiency index</div>
              </div>
            </div>
          </div>

          <div className="mt-3 p-2.5 rounded-lg bg-amber-50/70 border border-amber-200 text-[11px] text-amber-900 flex items-start gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <span>
              <strong>Methodological Integrity:</strong> Scenarios are exploratory planning aids based on published satellite coefficients, not unvalidated engineering promises. Field ground truthing recommended before municipal budget commitment.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
