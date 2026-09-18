import React, { useState, useRef, useEffect } from 'react';
import {
  Award,
  BookOpen,
  Layers,
  Bell,
  ExternalLink,
  Code,
  Sparkles,
  Sigma,
  Globe,
  Heart,
  ChevronDown,
  Menu,
  X,
  FileText,
  ShieldCheck,
  Zap,
  Download
} from 'lucide-react';

interface NavbarProps {
  onOpenBenchmarks: () => void;
  onOpenArchitecture: () => void;
  onOpenMathDeepDive: () => void;
  onOpenSubscribe: () => void;
  onOpenDiscoverability: () => void;
  onOpenGlobalCommunity: (tab?: 'world-impact' | 'translations' | 'action-kit' | 'sdgs' | 'amplifier') => void;
  onOpenDownload?: () => void;
  activeView: 'portfolio' | 'reader';
  onToggleView: (view: 'portfolio' | 'reader') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBenchmarks,
  onOpenArchitecture,
  onOpenMathDeepDive,
  onOpenSubscribe,
  onOpenDiscoverability,
  onOpenGlobalCommunity,
  onOpenDownload,
  activeView,
  onToggleView
}) => {
  const [isDossiersOpen, setIsDossiersOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDossiersOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsDossiersOpen(false);
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E2DCD5] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand / Scholarly Identity */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onToggleView('portfolio')}
              className="text-left group flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-lg p-1"
            >
              <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#0B192C] text-amber-400 flex items-center justify-center font-serif font-bold text-sm sm:text-base border border-amber-500/40 shadow-xs transition-transform group-hover:scale-105">
                ASR
              </span>
              <div>
                <h1 className="font-serif font-bold text-base sm:text-lg tracking-tight text-slate-900 group-hover:text-amber-900 transition-colors">
                  Aarti Sri Ravikumar
                </h1>
                <p className="text-[10px] sm:text-[11px] font-sans text-slate-500 tracking-wider uppercase font-medium">
                  Planetary Resilience • Urban Heat Archive
                </p>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Group (Clean, Uncrowded & Sophisticated) */}
          <nav className="hidden lg:flex items-center gap-3" aria-label="Main Navigation">
            {/* View Switcher / Portfolio Button */}
            {activeView === 'reader' && (
              <button
                onClick={() => onToggleView('portfolio')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>All Publications</span>
              </button>
            )}

            {/* Global Community & Universal Access (Primary Mission) */}
            <button
              onClick={() => onOpenGlobalCommunity('world-impact')}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-teal-50 hover:bg-teal-100/90 text-teal-950 border border-teal-300 text-xs font-bold transition-all shadow-2xs group"
              title="Explore 10-language translations, global metro data, and grassroots civic action kits"
            >
              <Globe className="w-3.5 h-3.5 text-teal-700 group-hover:rotate-12 transition-transform" />
              <span>Global Community</span>
              <span className="px-1.5 py-0.2 rounded-full bg-teal-200 text-teal-900 text-[10px] font-mono font-bold">10 Langs</span>
            </button>

            {/* Direct 3D Google Earth GIS Map Button */}
            <button
              onClick={() => {
                if (activeView !== 'reader') onToggleView('reader');
                setTimeout(() => {
                  const el = document.getElementById('sec-data-readiness');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 120);
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold transition-all shadow-2xs group"
              title="Jump directly to the 3D Google Earth & Multi-Layer GIS Explorer"
            >
              <Layers className="w-3.5 h-3.5 text-emerald-300" />
              <span>3D GIS Map</span>
            </button>

            {/* Research Dossiers Dropdown (Consolidates 4 deep-dive modules) */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDossiersOpen(!isDossiersOpen)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  isDossiersOpen
                    ? 'bg-slate-900 text-amber-300 border-slate-900 shadow-xs'
                    : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-300 shadow-2xs'
                }`}
                aria-expanded={isDossiersOpen}
                aria-haspopup="true"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Research Dossiers</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isDossiersOpen ? 'rotate-180 text-amber-300' : ''}`} />
              </button>

              {/* Dossiers Popover Menu */}
              {isDossiersOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-88 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-bold">
                      Theoretical & Design Dossiers
                    </span>
                    <span className="text-[10px] font-mono text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      Peer-Reviewed
                    </span>
                  </div>

                  <div className="p-1.5 space-y-1">
                    {/* Item 1: Spectral Math Deep Dive */}
                    <button
                      onClick={() => {
                        setIsDossiersOpen(false);
                        onOpenMathDeepDive();
                      }}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-amber-50/70 transition-colors flex items-start gap-3 group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center shrink-0 border border-amber-300/80 group-hover:scale-105 transition-transform">
                        <Sigma className="w-4 h-4 text-amber-800" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                          <span>Spectral Math & Graph Proofs</span>
                        </div>
                        <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                          Laplacian calculus, Cheeger bounds & percolation limits
                        </p>
                      </div>
                    </button>

                    {/* Item 2: AI Citations & Discoverability */}
                    <button
                      onClick={() => {
                        setIsDossiersOpen(false);
                        onOpenDiscoverability();
                      }}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-emerald-50/70 transition-colors flex items-start gap-3 group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-900 flex items-center justify-center shrink-0 border border-emerald-300 group-hover:scale-105 transition-transform">
                        <Sparkles className="w-4 h-4 text-emerald-700" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                          <span>AI Discoverability & Citations</span>
                          <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-bold">100%</span>
                        </div>
                        <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                          Schema.org JSON-LD, Dublin Core & /llms.txt ready
                        </p>
                      </div>
                    </button>

                    {/* Item 3: Top 10 Scientific Journals Study */}
                    <button
                      onClick={() => {
                        setIsDossiersOpen(false);
                        onOpenBenchmarks();
                      }}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 transition-colors flex items-start gap-3 group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center shrink-0 border border-slate-300 group-hover:scale-105 transition-transform">
                        <Award className="w-4 h-4 text-amber-700" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-slate-900">
                          Top 10 Scientific Journals Benchmark
                        </div>
                        <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                          Nature, Science, Cell & IEEE design standard comparison
                        </p>
                      </div>
                    </button>

                    {/* Item 4: Metropolitan Architecture Blueprint */}
                    <button
                      onClick={() => {
                        setIsDossiersOpen(false);
                        onOpenArchitecture();
                      }}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 transition-colors flex items-start gap-3 group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center shrink-0 border border-slate-300 group-hover:scale-105 transition-transform">
                        <Layers className="w-4 h-4 text-slate-700" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-slate-900">
                          Metropolitan Dashboard Blueprint
                        </div>
                        <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                          Multi-tier real-time thermal microclimate architecture
                        </p>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Right Action Icons & Subscribe CTA */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Download Monograph Button */}
            {onOpenDownload && (
              <button
                onClick={onOpenDownload}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-950 border border-amber-300 text-xs font-bold transition-all shadow-2xs group"
                title="Download Research Monograph in top 3 formats (PDF, Markdown, BibTeX)"
              >
                <Download className="w-3.5 h-3.5 text-amber-800 group-hover:translate-y-0.5 transition-transform" />
                <span>Download Monograph</span>
              </button>
            )}

            {/* Live Interactive Platform */}
            <a
              href="https://urban-heat.ai-aarti.com/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-medium transition-colors shadow-2xs"
              title="Visit live interactive platform at urban-heat.ai-aarti.com"
            >
              <span>urban-heat.ai-aarti.com</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>

            {/* GitHub Code Repo */}
            <a
              href="https://github.com/aartisr/urban-heat-democratization"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors"
              title="GitHub: aartisr/urban-heat-democratization"
            >
              <Code className="w-4 h-4" />
            </a>

            {/* Subscribe Action */}
            <button
              onClick={onOpenSubscribe}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#0B192C] hover:bg-slate-800 text-amber-300 text-xs font-semibold shadow-xs transition-all"
            >
              <Bell className="w-3.5 h-3.5 text-amber-400" />
              <span>Subscribe</span>
            </button>
          </div>

          {/* Mobile Navigation Hamburger Trigger */}
          <div className="flex items-center gap-2 lg:hidden">
            {onOpenDownload && (
              <button
                onClick={onOpenDownload}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-amber-100 border border-amber-300 text-amber-950 text-xs font-bold shadow-2xs"
              >
                <Download className="w-3 h-3 text-amber-800" />
                <span>PDF/MD</span>
              </button>
            )}

            <button
              onClick={onOpenSubscribe}
              className="sm:hidden inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#0B192C] text-amber-300 text-xs font-semibold shadow-xs"
            >
              <Bell className="w-3 h-3 text-amber-400" />
              <span>Alerts</span>
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-xl bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 text-slate-900" /> : <Menu className="w-5 h-5 text-slate-900" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Overlay Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-[#FAF8F5] px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-4 duration-200 shadow-xl">
          <div className="grid grid-cols-3 gap-2 pt-1">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenGlobalCommunity('world-impact');
              }}
              className="flex flex-col items-start p-2.5 rounded-xl bg-teal-50 border border-teal-200 text-teal-950"
            >
              <Globe className="w-4 h-4 text-teal-700 mb-1" />
              <span className="text-[11px] font-bold">Global</span>
              <span className="text-[9px] text-teal-700 font-mono">10 Langs</span>
            </button>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                if (activeView !== 'reader') onToggleView('reader');
                setTimeout(() => {
                  const el = document.getElementById('sec-data-readiness');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 120);
              }}
              className="flex flex-col items-start p-2.5 rounded-xl bg-emerald-800 text-white"
            >
              <Layers className="w-4 h-4 text-emerald-300 mb-1" />
              <span className="text-[11px] font-bold">3D GIS</span>
              <span className="text-[9px] text-emerald-200 font-mono">Map View</span>
            </button>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenDiscoverability();
              }}
              className="flex flex-col items-start p-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-900"
            >
              <Sparkles className="w-4 h-4 text-emerald-700 mb-1" />
              <span className="text-[11px] font-bold">AI & SEO</span>
              <span className="text-[9px] text-slate-500 font-mono">Discover</span>
            </button>
          </div>

          <div className="bg-white rounded-2xl p-2 border border-slate-200 space-y-1">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenMathDeepDive();
              }}
              className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-amber-50 text-left text-xs font-bold text-slate-900"
            >
              <div className="flex items-center gap-2">
                <Sigma className="w-4 h-4 text-amber-800" />
                <span>Spectral Math & Proofs</span>
              </div>
              <span className="text-[10px] text-amber-800 font-mono bg-amber-100 px-2 py-0.5 rounded">Defense</span>
            </button>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenBenchmarks();
              }}
              className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 text-left text-xs font-semibold text-slate-800"
            >
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-700" />
                <span>Top 10 Journals Study</span>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">Nature/IEEE</span>
            </button>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenArchitecture();
              }}
              className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 text-left text-xs font-semibold text-slate-800"
            >
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-slate-600" />
                <span>Dashboard Architecture</span>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">Blueprint</span>
            </button>
          </div>

          {/* External Links & Subscribe */}
          <div className="pt-2 flex flex-col gap-2">
            <a
              href="https://urban-heat.ai-aarti.com/"
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl bg-white border border-slate-300 text-xs font-semibold text-slate-800 shadow-2xs"
            >
              <Globe className="w-3.5 h-3.5 text-slate-500" />
              <span>urban-heat.ai-aarti.com</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenSubscribe();
              }}
              className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl bg-[#0B192C] text-amber-300 text-xs font-bold shadow-sm"
            >
              <Bell className="w-3.5 h-3.5 text-amber-400" />
              <span>Subscribe for Research Releases</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

