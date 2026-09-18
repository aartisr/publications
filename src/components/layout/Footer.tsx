import React from 'react';
import { ExternalLink, Sigma, Award, Layers, Bell, Globe, Heart, FileText } from 'lucide-react';

interface FooterProps {
  onOpenMathDeepDive: () => void;
  onOpenBenchmarks: () => void;
  onOpenArchitecture: () => void;
  onOpenSubscribe: () => void;
  onOpenDiscoverability: () => void;
  onOpenGlobalCommunity?: (tab?: 'world-impact' | 'translations' | 'action-kit' | 'sdgs' | 'amplifier') => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenMathDeepDive,
  onOpenBenchmarks,
  onOpenArchitecture,
  onOpenSubscribe,
  onOpenDiscoverability,
  onOpenGlobalCommunity
}) => {
  return (
    <footer className="bg-[#0B192C] text-slate-300 border-t border-slate-800 py-12 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-800">
          {/* Col 1 */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-amber-400 text-slate-950 font-serif font-bold flex items-center justify-center text-xs">
                ASR
              </span>
              <span className="font-serif font-bold text-base text-white">
                Aarti Sri Ravikumar Academic Archive
              </span>
            </div>
            <p className="text-slate-400 text-xs max-w-md leading-relaxed">
              The official open-access academic repository and research portfolio of Aarti Sri Ravikumar. Dedicated to public-interest climate resilience, satellite radiometry downscaling, spectral graph calculus, and urban heat democratization.
            </p>
            <div className="text-[11px] text-slate-400">
              Principal Investigator: <strong className="text-white">ai-aarti.com</strong> • PCSS-II
            </div>
          </div>

          {/* Col 2 */}
          <div className="space-y-2">
            <div className="font-serif font-bold text-white text-xs uppercase tracking-wider">
              Research Repositories
            </div>
            <ul className="space-y-1.5 text-slate-400">
              <li>
                <a
                  href="https://github.com/aartisr/urban-heat-democratization"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-amber-300 transition-colors flex items-center gap-1"
                >
                  <span>urban-heat-democratization</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://urban-heat.ai-aarti.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-amber-300 transition-colors flex items-center gap-1"
                >
                  <span>urban-heat.ai-aarti.com</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://ai-aarti.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-amber-300 transition-colors flex items-center gap-1"
                >
                  <span>ai-aarti.com (Official Site)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/aartisr/publications"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-amber-300 transition-colors flex items-center gap-1"
                >
                  <span>publications (Source Code)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-2">
            <div className="font-serif font-bold text-white text-xs uppercase tracking-wider">
              Academic Actions
            </div>
            <ul className="space-y-1.5 text-slate-400">
              {onOpenGlobalCommunity && (
                <li>
                  <button
                    onClick={() => onOpenGlobalCommunity('world-impact')}
                    className="hover:text-teal-300 transition-colors text-left font-bold text-teal-300 flex items-center gap-1"
                  >
                    <Globe className="w-3.5 h-3.5 text-teal-400" />
                    <span>Worldwide Community Impact Hub</span>
                  </button>
                </li>
              )}
              {onOpenGlobalCommunity && (
                <li>
                  <button
                    onClick={() => onOpenGlobalCommunity('translations')}
                    className="hover:text-teal-300 transition-colors text-left font-medium text-slate-300 flex items-center gap-1"
                  >
                    <Heart className="w-3.5 h-3.5 text-rose-400" />
                    <span>Read in 10 Languages (Audio Included)</span>
                  </button>
                </li>
              )}
              {onOpenGlobalCommunity && (
                <li>
                  <button
                    onClick={() => onOpenGlobalCommunity('action-kit')}
                    className="hover:text-teal-300 transition-colors text-left font-medium text-slate-300 flex items-center gap-1"
                  >
                    <FileText className="w-3.5 h-3.5 text-amber-400" />
                    <span>Grassroots & STEM Action Kits</span>
                  </button>
                </li>
              )}
              <li>
                <button
                  onClick={onOpenDiscoverability}
                  className="hover:text-amber-300 transition-colors text-left font-semibold text-emerald-300 flex items-center gap-1"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span>AI Citations, SEO & /llms.txt</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenMathDeepDive}
                  className="hover:text-amber-300 transition-colors text-left font-medium text-amber-200/90 flex items-center gap-1"
                >
                  <Sigma className="w-3.5 h-3.5 text-amber-400" />
                  <span>Math & Spectral Theory Defense</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenBenchmarks}
                  className="hover:text-amber-300 transition-colors text-left flex items-center gap-1"
                >
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span>Top 10 Journals Design Dossier</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenArchitecture}
                  className="hover:text-amber-300 transition-colors text-left flex items-center gap-1"
                >
                  <Layers className="w-3.5 h-3.5 text-amber-400" />
                  <span>Dashboard Architecture Blueprint</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenSubscribe}
                  className="hover:text-amber-300 transition-colors text-left flex items-center gap-1"
                >
                  <Bell className="w-3.5 h-3.5 text-amber-400" />
                  <span>Subscribe for Research Alerts</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Machine & AI Discovery Endpoints */}
        <div className="pt-6 pb-4 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-mono text-amber-400 font-bold">AI & Agent Ingestion Endpoints:</span>
          </div>
          <div className="flex flex-wrap items-center gap-3 font-mono">
            <a href="/llms.txt" target="_blank" rel="noreferrer" className="text-slate-300 hover:text-amber-300 underline">
              /llms.txt
            </a>
            <span>•</span>
            <a href="/sitemap.xml" target="_blank" rel="noreferrer" className="text-slate-300 hover:text-amber-300 underline">
              /sitemap.xml
            </a>
            <span>•</span>
            <a href="/citation.cff" target="_blank" rel="noreferrer" className="text-slate-300 hover:text-amber-300 underline">
              /citation.cff
            </a>
            <span>•</span>
            <a href="/robots.txt" target="_blank" rel="noreferrer" className="text-slate-300 hover:text-amber-300 underline">
              /robots.txt
            </a>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-400 text-[11px]">
          <div>
            &copy; {new Date().getFullYear()} Aarti Sri Ravikumar. All research licensed under Open Science CC-BY-4.0.
          </div>
          <div className="flex items-center gap-3">
            <span>Indexed on Google Scholar</span>
            <span>•</span>
            <span>Zenodo Open Archive</span>
            <span>•</span>
            <span>ORCID: 0009-0004-8921-9302</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
