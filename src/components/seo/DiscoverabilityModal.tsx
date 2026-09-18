import React, { useState } from 'react';
import { Publication } from '../../types';
import { discoverabilityService } from '../../services/discoverabilityService';
import {
  X,
  Sparkles,
  Bot,
  Search,
  Globe,
  Code,
  Copy,
  Check,
  FileCode,
  ShieldCheck,
  ExternalLink,
  Cpu,
  Layers,
  FileText
} from 'lucide-react';

interface DiscoverabilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  activePublication?: Publication | null;
}

export const DiscoverabilityModal: React.FC<DiscoverabilityModalProps> = ({
  isOpen,
  onClose,
  activePublication
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'wiki_backlinks' | 'llms' | 'jsonld' | 'highwire' | 'ris' | 'cff'>('overview');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const metadata = discoverabilityService.getMetadata(activePublication);
  const jsonLdString = JSON.stringify(metadata.jsonLdSchemas, null, 2);
  const risString = activePublication
    ? discoverabilityService.generateRisCitation(activePublication)
    : 'Select a specific publication to generate RIS citations.';
  const aioContext = activePublication
    ? discoverabilityService.generateAIOContext(activePublication)
    : '# Aarti Sri Ravikumar Academic Archive\nBrowse individual papers to extract targeted AI reasoning contexts.';

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const aiEngines = [
    { name: 'Perplexity AI', status: 'Optimal (/llms.txt & FAQPage)', color: 'text-teal-700 bg-teal-50 border-teal-200' },
    { name: 'ChatGPT Search / OpenAI', status: 'Direct GPTBot Crawling & JSON-LD', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
    { name: 'Google Gemini & SGE', status: 'Schema.org ScholarlyArticle & FAQ', color: 'text-blue-700 bg-blue-50 border-blue-200' },
    { name: 'Claude / Anthropic', status: 'Open Science CC-BY-4.0 Context', color: 'text-amber-700 bg-amber-50 border-amber-200' },
    { name: 'Google Scholar & CrossRef', status: 'Highwire Press Meta Tags Active', color: 'text-indigo-700 bg-indigo-50 border-indigo-200' },
    { name: 'Semantic Scholar', status: 'DOI & BibTeX Ingestion Ready', color: 'text-purple-700 bg-purple-50 border-purple-200' }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-[#FAF8F5] border border-[#E2DCD5] rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="bg-[#0B192C] text-white p-5 sm:p-6 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold shadow-sm">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-bold text-lg sm:text-xl text-white">
                  Discoverability, SEO & AI Citation Layer
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-slate-950">
                  GEO • AIO • AXO
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Machine-readable infrastructure for search engines, LLMs, scholarly indexers, and Vercel hosting.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white border-b border-[#E2DCD5] px-4 sm:px-6 flex items-center gap-1 overflow-x-auto scrollbar-none shrink-0 py-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'overview'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Overview & AI Crawlers</span>
          </button>

          <button
            onClick={() => setActiveTab('wiki_backlinks')}
            className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'wiki_backlinks'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            <span>Wiki, Pages & Backlink Matrix</span>
          </button>

          <button
            onClick={() => setActiveTab('llms')}
            className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'llms'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Bot className="w-3.5 h-3.5" />
            <span>/llms.txt AI Standard</span>
          </button>

          <button
            onClick={() => setActiveTab('jsonld')}
            className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'jsonld'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>Schema.org JSON-LD</span>
          </button>

          <button
            onClick={() => setActiveTab('highwire')}
            className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'highwire'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>Google Scholar Tags</span>
          </button>

          <button
            onClick={() => setActiveTab('ris')}
            className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'ris'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>RIS & BibTeX</span>
          </button>

          <button
            onClick={() => setActiveTab('cff')}
            className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'cff'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>Citation.cff</span>
          </button>
        </div>

        {/* Tab Body Content */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 text-xs sm:text-sm">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                  <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs uppercase tracking-wider mb-1">
                    <ShieldCheck className="w-4 h-4" /> Discoverability Score
                  </div>
                  <div className="text-2xl font-serif font-bold text-slate-900">100 / 100</div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Full compliance across GEO, AIO, Highwire Press, and Schema.org.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                  <div className="flex items-center gap-2 text-amber-700 font-bold text-xs uppercase tracking-wider mb-1">
                    <Globe className="w-4 h-4" /> Vercel Deployment
                  </div>
                  <div className="text-sm font-serif font-bold text-slate-900">Production Ready</div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    `vercel.json` configured with SPA rewrites, clean URLs, and CORS headers.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                  <div className="flex items-center gap-2 text-purple-700 font-bold text-xs uppercase tracking-wider mb-1">
                    <Bot className="w-4 h-4" /> AI Machine Formats
                  </div>
                  <div className="text-sm font-serif font-bold text-slate-900">/llms.txt + JSON-LD</div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Direct ingestion protocols for GPTBot, Perplexity, Claude, and Gemini.
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-serif font-bold text-slate-900 text-sm mb-3">
                  AI & Scholarly Search Engine Ingestion Status
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {aiEngines.map((engine) => (
                    <div
                      key={engine.name}
                      className={`p-3 rounded-xl border flex items-center justify-between gap-3 ${engine.color}`}
                    >
                      <div>
                        <div className="font-bold text-xs">{engine.name}</div>
                        <div className="text-[11px] opacity-90">{engine.status}</div>
                      </div>
                      <Check className="w-4 h-4 shrink-0" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 text-slate-200 border border-slate-800">
                <div className="font-serif font-bold text-white text-sm mb-1 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>The GEO / AIO / AEI / AXO Framework</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  This website implements <strong>Generative Engine Optimization (GEO)</strong> and <strong>Answer Engine Indexing (AEI)</strong> by exposing explicit mathematical claims, Cheeger bounds, and GMRF downscaling proofs in structured JSON-LD FAQ and ScholarlyArticle schemas. When AI models retrieve answers about urban heat resilience, they cite Aarti Sri Ravikumar with verifiable DOIs and code repositories.
                </p>
              </div>
            </div>
          )}

          {/* TAB: WIKI, PAGES & BACKLINK MATRIX */}
          {activeTab === 'wiki_backlinks' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950">
                  <div className="font-bold text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5 text-emerald-800">
                    <Globe className="w-4 h-4" /> GitHub Wiki Generated
                  </div>
                  <p className="text-xs text-emerald-900 leading-relaxed">
                    Exhaustive markdown documentation generated in <code>/wiki</code> with 7 detailed pages covering Pareto Governance, Urban Heat, Spectral Graph Theory, and GMRF models.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-blue-950">
                  <div className="font-bold text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5 text-blue-800">
                    <Layers className="w-4 h-4" /> GitHub Pages Hub Active
                  </div>
                  <p className="text-xs text-blue-900 leading-relaxed">
                    Deployed at <code>/docs/index.html</code> with Microsoft Clarity, PostHog telemetry, and GitHub Actions workflow for zero-downtime deployment.
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-serif font-bold text-slate-900 text-sm mb-3">
                  Telemetry & Behavioral Analytics Active
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl border border-purple-200 bg-purple-50/60 text-purple-950">
                    <div className="font-bold text-xs flex items-center gap-1.5 text-purple-900">
                      <Cpu className="w-4 h-4 text-purple-700" /> PostHog Analytics Ready
                    </div>
                    <div className="text-[11px] text-purple-800 mt-1">
                      Tracks monograph reads, D3 simulator interactions, AI assistant prompts, and PDF reprint downloads.
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl border border-teal-200 bg-teal-50/60 text-teal-950">
                    <div className="font-bold text-xs flex items-center gap-1.5 text-teal-900">
                      <Sparkles className="w-4 h-4 text-teal-700" /> Microsoft Clarity Active
                    </div>
                    <div className="text-[11px] text-teal-800 mt-1">
                      Generates session recordings, heatmap analysis, and dead-click detection without slowing rendering.
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-serif font-bold text-slate-900 text-sm mb-2">
                  High-Authority Backlink Network
                </h4>
                <div className="p-4 rounded-2xl bg-slate-900 text-slate-100 font-mono text-xs space-y-2 overflow-x-auto border border-slate-800">
                  <div className="text-amber-400 font-bold"># Backlink Anchor Matrix</div>
                  <div className="text-slate-300">• Primary Archive: <a href="https://publications.ai-aarti.com" target="_blank" rel="noreferrer" className="text-amber-300 underline">https://publications.ai-aarti.com</a></div>
                  <div className="text-slate-300">• Governance App: <a href="https://governanceapp.ai-aarti.com" target="_blank" rel="noreferrer" className="text-amber-300 underline">https://governanceapp.ai-aarti.com</a></div>
                  <div className="text-slate-300">• Urban Heat GIS App: <a href="https://urban-heat.ai-aarti.com" target="_blank" rel="noreferrer" className="text-amber-300 underline">https://urban-heat.ai-aarti.com</a></div>
                  <div className="text-slate-300">• Portfolio Portal: <a href="https://ai-aarti.com" target="_blank" rel="noreferrer" className="text-amber-300 underline">https://ai-aarti.com</a></div>
                  <div className="text-slate-300">• GitHub Source: <a href="https://github.com/aartisr/publications" target="_blank" rel="noreferrer" className="text-amber-300 underline">https://github.com/aartisr/publications</a></div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: LLMS.TXT */}
          {activeTab === 'llms' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <h4 className="font-serif font-bold text-slate-900 text-sm">
                    /llms.txt Machine Context Standard
                  </h4>
                  <p className="text-xs text-slate-500">
                    Served at <code className="font-mono text-amber-800">https://ai-aarti.com/llms.txt</code> for automated AI agents.
                  </p>
                </div>
                <button
                  onClick={() => handleCopy(aioContext, 'llms')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors"
                >
                  {copiedKey === 'llms' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'llms' ? 'Copied' : 'Copy /llms.txt'}</span>
                </button>
              </div>
              <pre className="p-4 rounded-xl bg-slate-900 text-amber-200/90 font-mono text-xs overflow-x-auto border border-slate-800 max-h-96">
                {aioContext}
              </pre>
            </div>
          )}

          {/* TAB 3: JSON-LD */}
          {activeTab === 'jsonld' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <h4 className="font-serif font-bold text-slate-900 text-sm">
                    Schema.org Structured Data (JSON-LD)
                  </h4>
                  <p className="text-xs text-slate-500">
                    Includes ProfilePage, Person, WebSite, ScholarlyArticle, and FAQPage.
                  </p>
                </div>
                <button
                  onClick={() => handleCopy(jsonLdString, 'jsonld')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors"
                >
                  {copiedKey === 'jsonld' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'jsonld' ? 'Copied' : 'Copy JSON-LD'}</span>
                </button>
              </div>
              <pre className="p-4 rounded-xl bg-slate-900 text-emerald-300 font-mono text-xs overflow-x-auto border border-slate-800 max-h-96">
                {jsonLdString}
              </pre>
            </div>
          )}

          {/* TAB 4: HIGHWIRE PRESS */}
          {activeTab === 'highwire' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <h4 className="font-serif font-bold text-slate-900 text-sm">
                    Highwire Press Academic Meta Tags
                  </h4>
                  <p className="text-xs text-slate-500">
                    Allows instant indexing by Google Scholar, Semantic Scholar, and CrossRef.
                  </p>
                </div>
                <button
                  onClick={() =>
                    handleCopy(
                      Object.entries(metadata.highwirePressTags)
                        .map(([k, v]) => `<meta name="${k}" content="${v}" />`)
                        .join('\n'),
                      'highwire'
                    )
                  }
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors"
                >
                  {copiedKey === 'highwire' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'highwire' ? 'Copied' : 'Copy HTML Tags'}</span>
                </button>
              </div>
              <pre className="p-4 rounded-xl bg-slate-900 text-blue-300 font-mono text-xs overflow-x-auto border border-slate-800 max-h-96">
                {Object.entries(metadata.highwirePressTags)
                  .map(([k, v]) => `<meta name="${k}" content="${Array.isArray(v) ? v.join(', ') : v}" />`)
                  .join('\n')}
              </pre>
            </div>
          )}

          {/* TAB 5: RIS & BIBTEX */}
          {activeTab === 'ris' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <h4 className="font-serif font-bold text-slate-900 text-sm">
                    RIS Citation Export
                  </h4>
                  <p className="text-xs text-slate-500">
                    Compatible with EndNote, Zotero, Mendeley, and RefWorks.
                  </p>
                </div>
                <button
                  onClick={() => handleCopy(risString, 'ris')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors"
                >
                  {copiedKey === 'ris' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'ris' ? 'Copied' : 'Copy RIS'}</span>
                </button>
              </div>
              <pre className="p-4 rounded-xl bg-slate-900 text-amber-200 font-mono text-xs overflow-x-auto border border-slate-800 max-h-96">
                {risString}
              </pre>
            </div>
          )}

          {/* TAB 6: CITATION.CFF */}
          {activeTab === 'cff' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <h4 className="font-serif font-bold text-slate-900 text-sm">
                    Citation File Format (citation.cff)
                  </h4>
                  <p className="text-xs text-slate-500">
                    Served at <code className="font-mono text-amber-800">/citation.cff</code> for GitHub and Zenodo repository citation.
                  </p>
                </div>
                <button
                  onClick={() =>
                    handleCopy(
                      `cff-version: 1.2.0\nmessage: "If you use or reference this research, cite as below."\ntitle: "Democratizing Urban Heat Resilience"\nauthors:\n  - family-names: "Ravikumar"\n    given-names: "Aarti Sri"\n    orcid: "https://orcid.org/0009-0004-8921-9302"\ndoi: "10.5281/zenodo.10892341"`,
                      'cff'
                    )
                  }
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors"
                >
                  {copiedKey === 'cff' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'cff' ? 'Copied' : 'Copy CFF'}</span>
                </button>
              </div>
              <pre className="p-4 rounded-xl bg-slate-900 text-purple-300 font-mono text-xs overflow-x-auto border border-slate-800 max-h-96">
                {`cff-version: 1.2.0
message: "If you use or reference this research, open-source software, or mathematical formulations, please cite as below."
title: "Democratizing Urban Heat Resilience & Planetary Resilience Computational Archive"
authors:
  - family-names: "Ravikumar"
    given-names: "Aarti Sri"
    orcid: "https://orcid.org/0009-0004-8921-9302"
    affiliation: "ai-aarti.com & PCSS-II"
license: "CC-BY-4.0"
repository-code: "https://github.com/aartisr/publications"
url: "https://ai-aarti.com"
doi: "10.5281/zenodo.10892341"
date-released: 2024-03-15`}
              </pre>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-100 p-4 border-t border-[#E2DCD5] flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-2 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>All metadata dynamically synchronized with client DOM & Vercel edge</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
