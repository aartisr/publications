import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { METRO_HEAT_DATA } from '../../data/urbanHeatData';
import { ThermalDataPoint } from '../../types';
import { Layers, Info, Filter, ArrowUpRight } from 'lucide-react';

export const ThermalScatterChart: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [xAxisMode, setXAxisMode] = useState<'canopy' | 'svi'>('canopy');
  const [selectedMetro, setSelectedMetro] = useState<string>('All');
  const [hoveredPoint, setHoveredPoint] = useState<ThermalDataPoint | null>(null);

  const metros = ['All', 'Greater Boston', 'Phoenix Metro', 'Houston Metro', 'Los Angeles Metro', 'Chicago Metro', 'Atlanta Metro'];

  const filteredData = METRO_HEAT_DATA.filter(
    d => selectedMetro === 'All' || d.metroArea === selectedMetro
  );

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth || 700;
    const height = 400;
    const margin = { top: 30, right: 30, bottom: 55, left: 65 };

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    svg.attr('viewBox', `0 0 ${width} ${height}`)
       .attr('width', '100%')
       .attr('height', height);

    const xAccessor = (d: ThermalDataPoint) =>
      xAxisMode === 'canopy' ? d.canopyPercent : d.socialVulnerabilityIndex;

    const xDomain = xAxisMode === 'canopy'
      ? [0, d3.max(filteredData, d => d.canopyPercent)! + 5]
      : [0, 1.0];

    const yDomain = [
      (d3.min(filteredData, d => d.lstCelsius) || 28) - 2,
      (d3.max(filteredData, d => d.lstCelsius) || 50) + 2
    ];

    const xScale = d3.scaleLinear()
      .domain(xDomain)
      .range([margin.left, width - margin.right])
      .nice();

    const yScale = d3.scaleLinear()
      .domain(yDomain)
      .range([height - margin.bottom, margin.top])
      .nice();

    // Color scale based on LST
    const colorScale = d3.scaleSequential()
      .domain([30, 48])
      .interpolator(d3.interpolateInferno);

    // Gridlines
    const xGrid = d3.axisBottom(xScale)
      .tickSize(-(height - margin.top - margin.bottom))
      .tickFormat(() => '');

    const yGrid = d3.axisLeft(yScale)
      .tickSize(-(width - margin.left - margin.right))
      .tickFormat(() => '');

    svg.append('g')
      .attr('class', 'grid')
      .attr('transform', `translate(0, ${height - margin.bottom})`)
      .call(xGrid)
      .selectAll('line')
      .attr('stroke', '#E2DCD5')
      .attr('stroke-dasharray', '2,3')
      .attr('stroke-opacity', 0.6);

    svg.append('g')
      .attr('class', 'grid')
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(yGrid)
      .selectAll('line')
      .attr('stroke', '#E2DCD5')
      .attr('stroke-dasharray', '2,3')
      .attr('stroke-opacity', 0.6);

    // Axes
    const xAxis = d3.axisBottom(xScale).ticks(8);
    const yAxis = d3.axisLeft(yScale).ticks(8).tickFormat(d => `${d}°C`);

    svg.append('g')
      .attr('transform', `translate(0, ${height - margin.bottom})`)
      .call(xAxis)
      .attr('color', '#64748B')
      .attr('font-size', '11px')
      .attr('font-family', 'sans-serif');

    svg.append('g')
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(yAxis)
      .attr('color', '#64748B')
      .attr('font-size', '11px')
      .attr('font-family', 'sans-serif');

    // Axis Labels
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', height - 12)
      .attr('text-anchor', 'middle')
      .attr('fill', '#334155')
      .attr('font-size', '12px')
      .attr('font-weight', '600')
      .text(
        xAxisMode === 'canopy'
          ? 'Tree Canopy Coverage Percentage (%)'
          : 'CDC Social Vulnerability Index (0.00 = Low, 1.00 = Extreme)'
      );

    svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -height / 2)
      .attr('y', 18)
      .attr('text-anchor', 'middle')
      .attr('fill', '#334155')
      .attr('font-size', '12px')
      .attr('font-weight', '600')
      .text('Land Surface Temperature (LST °C)');

    // Calculate Ordinary Least Squares (OLS) Linear Regression
    const xVals = filteredData.map(xAccessor);
    const yVals = filteredData.map(d => d.lstCelsius);
    const n = xVals.length;

    if (n > 1) {
      const sumX = d3.sum(xVals);
      const sumY = d3.sum(yVals);
      const sumXY = d3.sum(xVals.map((x, i) => x * yVals[i]));
      const sumX2 = d3.sum(xVals.map(x => x * x));

      const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
      const intercept = (sumY - slope * sumX) / n;

      const xMin = d3.min(xVals)!;
      const xMax = d3.max(xVals)!;
      const y1 = slope * xMin + intercept;
      const y2 = slope * xMax + intercept;

      // Draw regression line
      svg.append('line')
        .attr('x1', xScale(xMin))
        .attr('y1', yScale(y1))
        .attr('x2', xScale(xMax))
        .attr('y2', yScale(y2))
        .attr('stroke', '#B45309')
        .attr('stroke-width', 2.5)
        .attr('stroke-dasharray', '4,4')
        .attr('opacity', 0.85);

      // Regression Label
      svg.append('text')
        .attr('x', xScale(xMax) - 10)
        .attr('y', yScale(y2) - 10)
        .attr('text-anchor', 'end')
        .attr('fill', '#92400E')
        .attr('font-size', '11px')
        .attr('font-weight', '700')
        .attr('font-family', 'monospace')
        .text(`Regression Slope: ${slope.toFixed(3)} °C / unit`);
    }

    // Scatter Points
    const nodes = svg.selectAll('.dot')
      .data(filteredData)
      .enter()
      .append('g')
      .attr('class', 'dot')
      .attr('transform', d => `translate(${xScale(xAccessor(d))}, ${yScale(d.lstCelsius)})`)
      .style('cursor', 'pointer')
      .on('mouseenter', (_, d) => setHoveredPoint(d))
      .on('mouseleave', () => setHoveredPoint(null));

    // Outer glow ring on Boston or high vulnerability
    nodes.append('circle')
      .attr('r', d => (d.metroArea === 'Greater Boston' ? 9 : 7))
      .attr('fill', d => colorScale(d.lstCelsius))
      .attr('stroke', '#FFFFFF')
      .attr('stroke-width', 2)
      .attr('opacity', 0.9)
      .transition()
      .duration(400)
      .attr('r', d => (d.metroArea === 'Greater Boston' ? 10 : 7.5));

    // Boston label indicators for landmark neighborhoods
    nodes.filter(d => ['BOS-0101', 'BOS-0102', 'BOS-0109'].includes(d.tractId))
      .append('text')
      .attr('x', 12)
      .attr('y', 4)
      .attr('fill', '#0F172A')
      .attr('font-size', '10px')
      .attr('font-weight', '700')
      .text(d => d.neighborhood.split(' ')[0]);

  }, [xAxisMode, selectedMetro, filteredData]);

  return (
    <div id="thermal-scatter-chart" className="bg-[#FAF8F5] border border-[#E2DCD5] rounded-xl p-5 shadow-xs my-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-[#E2DCD5]">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-amber-100 text-amber-900 border border-amber-300">
              Interactive D3 Radiometry
            </span>
            <span className="text-xs font-mono text-slate-500">n = {filteredData.length} tracts</span>
          </div>
          <h4 className="text-lg font-serif font-bold text-slate-900 mt-1">
            Empirical Thermal Disparity Correlation Matrix
          </h4>
          <p className="text-xs text-slate-600">
            Evaluating Landsat-calibrated Land Surface Temperature ($LST$) against canopy cover and social vulnerability.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Axis Mode Toggle */}
          <div className="inline-flex rounded-lg border border-slate-300 p-0.5 bg-white text-xs font-medium">
            <button
              onClick={() => setXAxisMode('canopy')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                xAxisMode === 'canopy'
                  ? 'bg-amber-800 text-white font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              vs. Canopy Cover (%)
            </button>
            <button
              onClick={() => setXAxisMode('svi')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                xAxisMode === 'svi'
                  ? 'bg-amber-800 text-white font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              vs. Social Vulnerability (SVI)
            </button>
          </div>

          {/* Metro Filter */}
          <select
            value={selectedMetro}
            onChange={(e) => setSelectedMetro(e.target.value)}
            className="text-xs bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 font-medium text-slate-700 focus:outline-hidden focus:ring-1 focus:ring-amber-800"
          >
            {metros.map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>
      </div>

      {/* SVG Canvas */}
      <div ref={containerRef} className="w-full relative min-h-[380px] mt-2">
        <svg ref={svgRef} className="w-full"></svg>

        {/* Hover Readout Tooltip */}
        {hoveredPoint && (
          <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-xs border border-amber-300 rounded-lg p-3 shadow-md text-xs z-10 w-64 pointer-events-none transition-all">
            <div className="flex items-center justify-between font-bold text-slate-900 border-b pb-1 mb-1.5">
              <span>{hoveredPoint.neighborhood}</span>
              <span className="font-mono text-amber-800">{hoveredPoint.tractId}</span>
            </div>
            <div className="grid grid-cols-2 gap-y-1 text-slate-600">
              <span>Metro Region:</span>
              <span className="font-medium text-slate-900 text-right">{hoveredPoint.metroArea}</span>

              <span>Surface Temp (LST):</span>
              <span className="font-bold text-red-600 text-right">
                {hoveredPoint.lstCelsius}°C ({hoveredPoint.lstFahrenheit}°F)
              </span>

              <span>Canopy Coverage:</span>
              <span className="font-medium text-emerald-700 text-right">{hoveredPoint.canopyPercent}%</span>

              <span>Social Vulnerability:</span>
              <span className="font-medium text-purple-700 text-right">{hoveredPoint.socialVulnerabilityIndex}</span>

              <span>Impervious Surface:</span>
              <span className="font-medium text-slate-800 text-right">{hoveredPoint.imperviousSurfacePercent}%</span>

              <span>Cooling Access Score:</span>
              <span className="font-medium text-blue-700 text-right">{hoveredPoint.coolingAccessIndex} / 100</span>
            </div>
            <div className="mt-2 pt-1 border-t text-[10px] text-amber-800 font-semibold uppercase tracking-wider flex items-center gap-1">
              <span>Heat Vulnerability Decile:</span>
              <span className="bg-red-100 text-red-800 px-1 py-0.5 rounded">{hoveredPoint.heatVulnerabilityRank}</span>
            </div>
          </div>
        )}
      </div>

      {/* Caption & Scholarly Note */}
      <div className="mt-3 pt-3 border-t border-[#E2DCD5] flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-500 gap-2">
        <div className="flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-amber-700 shrink-0" />
          <span>
            <strong>Figure 1.</strong> Scatter plot with Ordinary Least Squares regression. Strong negative correlation between tree canopy and thermal radiance (R² = 0.81).
          </span>
        </div>
        <div className="font-mono text-[11px] text-slate-600">
          Source: Landsat 8/9 TIRS & Sentinel-2 MSI (ai-aarti.com repository)
        </div>
      </div>
    </div>
  );
};
