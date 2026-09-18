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
  ChevronDown,
  Menu,
  X,
  Download,
  Sliders,
  ShieldCheck
} from 'lucide-react';
import { Publication } from '../types';
import { PublicationSwitcher } from './navbar/PublicationSwitcher';
import { LiveAppsMenu } from './navbar/LiveAppsMenu';
import { Logo } from './Logo';

interface NavbarProps {
  publications: Publication[];
  selectedPublication: Publication;
  onSelectPublication: (pub: Publication) => void;
  onOpenBenchmarks: () => void;
  onOpenArchitecture: () => void;
  onOpenMathDeepDive: () => void;
  onOpenSubscribe: () => void;
  onOpenDiscoverability: () => void;
  onOpenGlobalCommunity: (tab?: 'world-impact' | 'translations' | 'action-kit' | 'sdgs' | 'amplifier') => void;
  onOpenDownload?: (pub?: Publication) => void;
  onOpenAiAssistant?: () => void;
  activeView: 'portfolio' | 'reader';
  onToggleView: (view: 'portfolio' | 'reader') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  publications,
  selectedPublication,
  onSelectPublication,
  onOpenBenchmarks,
  onOpenArchitecture,
  onOpenMathDeepDive,
  onOpenSubscribe,
  onOpenDiscoverability,
  onOpenGlobalCommunity,
  onOpenDownload,
  onOpenAiAssistant,
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

  const handleSelectPaperAndRead = (pub: Publication) => {
    onSelectPublication(pub);
    onToggleView('reader');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E2DCD5] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3">
          
          {/* Brand / Scholarly Identity (Generic & Peer-Reviewed) */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onToggleView('portfolio')}
              className="text-left group flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-lg p-1"
            >
              <Logo size="md" className="shrink-0" />
              <div>
                <h1 className="font-serif font-bold text-base sm:text-lg tracking-tight text-slate-900 group-hover:text-amber-900 transition-colors">
                  Aarti Sri Ravikumar
                </h1>
                <p className="text-[10px] sm:text-[11px] font-sans text-slate-500 tracking-wider uppercase font-medium">
                  Open Science Archives • Computational Policy
                </p>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Controls */}
          <nav className="hidden lg:flex items-center gap-2" aria-label="Main Navigation">
            {/* View Switcher: Back to All Papers */}
            {activeView === 'reader' && (
              <button
                onClick={() => onToggleView('portfolio')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors border border-slate-300/80"
              >
                <BookOpen className="w-3.5 h-3.5 text-amber-800" />
                <span>All Papers</span>
              </button>
            )}

            {/* Publication Switcher Dropdown Component */}
            <PublicationSwitcher
              publications={publications}
              selectedPublication={selectedPublication}
              onSelectPublication={handleSelectPaperAndRead}
              onOpenDownload={onOpenDownload}
            />

            {/* Live Web Applications Dropdown */}
            <LiveAppsMenu />

            {/* Global Community Hub Button */}
            <button
              onClick={() => onOpenGlobalCommunity('world-impact')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-950 border border-emerald-300/80 text-xs font-semibold transition-all shadow-2xs group"
              title="10-language translations, global metro data, and grassroots civic action kits"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-700 group-hover:rotate-12 transition-transform" />
              <span>Community</span>
            </button>

            {/* Research Dossiers Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDossiersOpen(!isDossiersOpen)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                  isDossiersOpen
                    ? 'bg-slate-900 text-amber-300 border-slate-900 shadow-xs'
                    : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-300 shadow-2xs'
                }`}
                aria-expanded={isDossiersOpen}
                aria-haspopup="true"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Dossiers</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isDossiersOpen ? 'rotate-180 text-amber-300' : ''}`} />
              </button>

              {/* Dossiers Popover Menu */}
              {isDossiersOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-88 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-bold">
                      Theoretical & Design Dossiers
                    </span>
                    <span className="text-[10px] font-mono text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
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
                          <span>Spectral Math & Game Theory</span>
                        </div>
                        <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                          Laplacian calculus, Cheeger bounds & Pareto frontiers
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
                          Nature, Science, Cell & IEEE design standards
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
          <div className="hidden sm:flex items-center gap-2">
            {/* AI Scholarly Co-Pilot Drawer Trigger */}
            {onOpenAiAssistant && (
              <button
                onClick={onOpenAiAssistant}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-300/80 text-xs font-bold transition-all shadow-2xs group"
                title="Launch AI Scholarly Co-Pilot & Q&A Assistant"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600 group-hover:rotate-12 transition-transform" />
                <span>AI Co-Pilot</span>
              </button>
            )}

            {/* Download Monograph Button */}
            {onOpenDownload && (
              <button
                onClick={() => onOpenDownload(selectedPublication)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-100/90 hover:bg-amber-200/90 text-amber-950 border border-amber-300/80 text-xs font-semibold transition-all shadow-2xs group"
                title="Download Research Monograph in top formats (PDF, Markdown, BibTeX)"
              >
                <Download className="w-3.5 h-3.5 text-amber-800 group-hover:translate-y-0.5 transition-transform" />
                <span>Reprints</span>
              </button>
            )}

            {/* Subscribe Action */}
            <button
              onClick={onOpenSubscribe}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#0B192C] hover:bg-slate-800 text-amber-300 text-xs font-bold shadow-xs transition-all"
            >
              <Bell className="w-3.5 h-3.5 text-amber-400" />
              <span>Subscribe</span>
            </button>
          </div>

          {/* Mobile Navigation Hamburger Trigger */}
          <div className="flex items-center gap-2 lg:hidden">
            {onOpenDownload && (
              <button
                onClick={() => onOpenDownload(selectedPublication)}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-amber-100 border border-amber-300 text-amber-950 text-xs font-bold shadow-2xs"
              >
                <Download className="w-3 h-3 text-amber-800" />
                <span>PDF/MD</span>
              </button>
            )}

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

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-[#FAF8F5] px-4 pt-3 pb-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200 shadow-xl max-h-[85vh] overflow-y-auto">
          {/* Active Publication Quick Switcher on Mobile */}
          <div className="p-3 bg-white rounded-2xl border border-slate-200 space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold block">
              Active Monograph
            </span>
            <div className="text-xs font-serif font-bold text-slate-900">
              {selectedPublication.title}
            </div>
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onToggleView('portfolio');
                }}
                className="flex-1 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold text-center border border-slate-300"
              >
                Browse All Papers ({publications.length})
              </button>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenGlobalCommunity('world-impact');
              }}
              className="flex flex-col items-start p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950"
            >
              <Globe className="w-4 h-4 text-emerald-700 mb-1" />
              <span className="text-xs font-bold">Global Community</span>
              <span className="text-[10px] text-emerald-700 font-mono">10 Languages</span>
            </button>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenDiscoverability();
              }}
              className="flex flex-col items-start p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-950"
            >
              <Sparkles className="w-4 h-4 text-amber-700 mb-1" />
              <span className="text-xs font-bold">AI Citations</span>
              <span className="text-[10px] text-amber-800 font-mono">Schema.org JSON-LD</span>
            </button>
          </div>

          {/* Live Interactive Web Apps section */}
          <div className="p-3 bg-white rounded-2xl border border-slate-200 space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold flex items-center justify-between">
              <span>Live Interactive Web Apps</span>
              <span className="text-teal-800 bg-teal-50 px-1.5 py-0.2 rounded font-bold">3 Verified</span>
            </span>
            <div className="space-y-1.5 text-xs">
              <a
                href="https://governanceapp.ai-aarti.com/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-900 border border-slate-200 font-medium"
              >
                <span>Civic Accord (Governance App)</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>
              <a
                href="https://urban-heat.ai-aarti.com/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-900 border border-slate-200 font-medium"
              >
                <span>Urban Heat Island Platform</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>
              <a
                href="https://publications.ai-aarti.com/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-900 border border-slate-200 font-medium"
              >
                <span>Open Research Repository</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>
            </div>
          </div>

          {/* Theoretical Dossiers */}
          <div className="space-y-1 pt-1">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold px-1">
              Research Dossiers & Benchmarks
            </div>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenMathDeepDive();
              }}
              className="w-full text-left p-2.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-900 flex items-center justify-between"
            >
              <span>Spectral Math & Game Theory Proofs</span>
              <Sigma className="w-4 h-4 text-amber-700" />
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenBenchmarks();
              }}
              className="w-full text-left p-2.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-900 flex items-center justify-between"
            >
              <span>Top 10 Journals Benchmark Study</span>
              <Award className="w-4 h-4 text-amber-700" />
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenArchitecture();
              }}
              className="w-full text-left p-2.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-900 flex items-center justify-between"
            >
              <span>Metropolitan Architecture Blueprint</span>
              <Layers className="w-4 h-4 text-slate-700" />
            </button>
          </div>

          {/* Subscribe CTA on Mobile */}
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onOpenSubscribe();
            }}
            className="w-full py-3 rounded-xl bg-[#0B192C] text-amber-300 font-bold text-xs flex items-center justify-center gap-2 shadow-md"
          >
            <Bell className="w-4 h-4 text-amber-400" />
            <span>Subscribe to Research Updates</span>
          </button>
        </div>
      )}
    </header>
  );
};
