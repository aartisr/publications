import React, { useState, useRef, useEffect } from 'react';
import { Globe, ExternalLink, ChevronDown, Sparkles, Code, Layers, ShieldCheck } from 'lucide-react';

export const LiveAppsMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const liveApps = [
    {
      id: 'app-governance',
      title: 'Civic Accord (Digital Democracy)',
      url: 'https://governanceapp.ai-aarti.com/',
      domain: 'governanceapp.ai-aarti.com',
      github: 'https://github.com/aartisr/governance-app',
      category: 'Digital Democracy & Game Theory',
      description: 'Multi-objective Pareto optimizer, quadratic voting budget calculator & Monte Carlo policy risk simulator.',
      badge: 'Interactive Monograph App'
    },
    {
      id: 'app-urban-heat',
      title: 'Urban Heat Island Platform',
      url: 'https://urban-heat.ai-aarti.com/',
      domain: 'urban-heat.ai-aarti.com',
      github: 'https://github.com/aartisr/urban-heat-democratization',
      category: 'Planetary Equity & Climate Analytics',
      description: '3D Google Earth GIS multi-sensor satellite radiometry downscaling & urban canopy mitigation simulator.',
      badge: '3D GIS Map & Simulators'
    },
    {
      id: 'app-publications',
      title: 'Open Research Repository',
      url: 'https://publications.ai-aarti.com/',
      domain: 'publications.ai-aarti.com',
      github: 'https://github.com/aartisr/publications-archive',
      category: 'Open Science Architecture',
      description: '100% open-access academic reprints, Highwire Press metadata, BibTeX citations & 10-language toolkits.',
      badge: 'Open Science Archive'
    }
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
          isOpen
            ? 'bg-emerald-950 text-emerald-200 border-emerald-950 shadow-xs'
            : 'bg-emerald-50/90 hover:bg-emerald-100/90 text-emerald-950 border-emerald-300/80 shadow-2xs'
        }`}
        aria-expanded={isOpen}
        aria-label="Live Applications"
      >
        <span className="relative flex h-2.5 w-2.5 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
        </span>
        <span className="font-bold tracking-tight">Live</span>
        <ChevronDown className={`w-3.5 h-3.5 text-emerald-700 transition-transform ${isOpen ? 'rotate-180 text-emerald-200' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-[90vw] sm:w-88 bg-white rounded-2xl shadow-2xl border border-slate-200 py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="px-4 pb-2 border-b border-slate-100 flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-teal-700" />
              Live Interactive Platforms
            </span>
            <span className="text-[10px] font-mono text-teal-900 font-bold bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
              Verified Web Apps
            </span>
          </div>

          <div className="p-2 space-y-2">
            {liveApps.map((app) => (
              <div
                key={app.id}
                className="p-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 transition-all flex flex-col gap-2 group"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[9px] font-mono uppercase tracking-wider text-teal-800 font-bold bg-teal-50 px-1.5 py-0.5 rounded border border-teal-200">
                      {app.badge}
                    </span>
                    <h4 className="text-xs font-serif font-bold text-slate-900 mt-1 group-hover:text-teal-900 transition-colors">
                      {app.title}
                    </h4>
                  </div>
                </div>

                <p className="text-[11px] text-slate-600 leading-snug">
                  {app.description}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px]">
                  <a
                    href={app.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-slate-600 hover:text-slate-900 text-[10px] font-mono font-medium"
                  >
                    <Code className="w-3 h-3 text-slate-500" />
                    <span>Source Code</span>
                  </a>

                  <a
                    href={app.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-teal-800 hover:bg-teal-900 text-white font-bold text-[10px] transition-all shadow-2xs"
                  >
                    <span>{app.domain}</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
