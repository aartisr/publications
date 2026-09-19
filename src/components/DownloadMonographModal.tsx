import React, { useState } from 'react';
import { Publication } from '../types';
import { documentExportService } from '../services/documentExportService';
import { telemetryService } from '../services/telemetryService';
import {
  X,
  Download,
  FileText,
  FileCode,
  Quote,
  Database,
  Check,
  Copy,
  Printer,
  Sparkles,
  ExternalLink,
  BookOpen,
  Layers,
  ArrowDown
} from 'lucide-react';

interface DownloadMonographModalProps {
  isOpen: boolean;
  onClose: () => void;
  publication: Publication;
}

export const DownloadMonographModal: React.FC<DownloadMonographModalProps> = ({
  isOpen,
  onClose,
  publication
}) => {
  const [activeFormat, setActiveFormat] = useState<'pdf' | 'md' | 'bib' | 'json'>('pdf');
  const [copiedText, setCopiedText] = useState(false);
  const [citationStyle, setCitationStyle] = useState<'bibtex' | 'apa' | 'ieee' | 'mla' | 'chicago' | 'ris'>('bibtex');

  if (!isOpen) return null;

  const citations = documentExportService.generateCitations(publication);
  const markdownText = documentExportService.generateMarkdown(publication);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const handleDownloadActive = () => {
    if (activeFormat === 'pdf') {
      documentExportService.downloadPdfOrPrint(publication);
    } else if (activeFormat === 'md') {
      documentExportService.downloadMarkdown(publication);
    } else if (activeFormat === 'bib') {
      documentExportService.downloadBibtex(publication);
    } else if (activeFormat === 'json') {
      documentExportService.downloadJson(publication);
    }
    telemetryService.trackDownload(publication.title, activeFormat);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl border border-amber-300/80 shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden"
        role="dialog"
        aria-labelledby="download-modal-title"
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-[#0B192C] via-slate-900 to-[#182a44] text-white flex items-start justify-between gap-4 border-b border-slate-800">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 shadow-md">
              <Download className="w-5 h-5 font-bold" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 uppercase tracking-wide">
                  Top 3 Scholarly Formats
                </span>
                <span className="text-xs text-slate-400 font-mono">Open Science CC-BY-4.0</span>
              </div>
              <h2 id="download-modal-title" className="text-lg sm:text-xl font-serif font-bold text-white mt-1">
                Download Research Monograph
              </h2>
              <p className="text-xs text-slate-300 mt-0.5 max-w-2xl line-clamp-1">
                {publication.title}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close download dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Format Selector Bar */}
        <div className="bg-[#FAF8F5] border-b border-[#E2DCD5] px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => setActiveFormat('pdf')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-2xs ${
                activeFormat === 'pdf'
                  ? 'bg-amber-900 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <FileText className="w-4 h-4 text-amber-400" />
              <span>1. PDF Academic Reprint (.pdf)</span>
            </button>

            <button
              onClick={() => setActiveFormat('md')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-2xs ${
                activeFormat === 'md'
                  ? 'bg-amber-900 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <FileCode className="w-4 h-4 text-emerald-500" />
              <span>2. Scientific Markdown (.md)</span>
            </button>

            <button
              onClick={() => setActiveFormat('bib')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-2xs ${
                activeFormat === 'bib'
                  ? 'bg-amber-900 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Quote className="w-4 h-4 text-blue-500" />
              <span>3. BibTeX / Citation (.bib)</span>
            </button>

            <button
              onClick={() => setActiveFormat('json')}
              className={`hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                activeFormat === 'json'
                  ? 'bg-amber-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Database className="w-3.5 h-3.5 text-purple-500" />
              <span>JSON Data</span>
            </button>
          </div>

          {/* Quick Action Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadActive}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>
                Download {activeFormat.toUpperCase()}
              </span>
            </button>
          </div>
        </div>

        {/* Format Specific Preview Area */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 bg-white space-y-4">
          {/* 1. PDF TAB */}
          {activeFormat === 'pdf' && (
            <div className="space-y-4">
              <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <div className="font-serif font-bold text-amber-950 text-sm flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-700" />
                    Official Academic Reprint & Typeset Monograph
                  </div>
                  <p className="text-xs text-amber-900/80 mt-0.5">
                    Complete with formal headers, author ORCIDs, KaTeX equations, D3 empirical data tables, and standard peer-review layout.
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => documentExportService.downloadPdfOrPrint(publication)}
                    className="px-4 py-2 bg-slate-900 hover:bg-amber-900 text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-2 transition-colors"
                  >
                    <Printer className="w-4 h-4 text-amber-400" />
                    <span>Open Printable / Save as PDF</span>
                  </button>
                </div>
              </div>

              {/* PDF Preview Card */}
              <div className="border border-slate-300 rounded-2xl p-6 bg-[#FCFBF9] font-serif shadow-inner max-h-80 overflow-y-auto space-y-4 text-slate-800 text-xs sm:text-sm">
                <div className="border-b pb-3 text-center">
                  <div className="text-[10px] font-sans uppercase tracking-widest text-slate-500 font-semibold">
                    ai-aarti.com Research Monograph Series • Open Access (CC-BY-4.0)
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-2">
                    {publication.title}
                  </h3>
                  <div className="text-xs text-slate-600 italic mt-1">{publication.subtitle}</div>
                  <div className="text-xs font-sans font-bold text-slate-800 mt-2">
                    {publication.authors.map((a) => a.name).join(', ')}
                  </div>
                  <div className="text-[11px] font-sans text-slate-500">
                    {publication.authors[0].affiliation} • DOI: {publication.doi}
                  </div>
                </div>

                <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs font-sans">
                  <strong>Abstract:</strong> {publication.abstract}
                </div>

                <div className="text-xs space-y-2 font-sans">
                  <div className="font-bold text-slate-900">Key Contents Included:</div>
                  <ul className="list-disc pl-5 space-y-1 text-slate-700">
                    <li>Multi-Sensor Satellite Radiometry (Landsat 8/9 TIRS-2 Band 10 & Sentinel-2 MSI)</li>
                    <li>Greater Boston Socio-Thermal Disparity Transects (Roxbury, East Boston vs Back Bay)</li>
                    <li>Surface Thermodynamic Heat Flux Equations ($R_n = H + LE + G$) & Bowen Ratio</li>
                    <li>The Robustness Lab: Percolation phase transition ($p_c \approx 0.382$)</li>
                    <li>Empirical Census Tract Data Matrix & Cross-Metro Benchmarks</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* 2. MARKDOWN TAB */}
          {activeFormat === 'md' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div className="text-xs text-slate-600">
                  Full Scientific Markdown with YAML Frontmatter and LaTeX equations for Obsidian, Zotero, Jupyter, and LLMs.
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopy(markdownText)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-semibold shadow-2xs transition-colors"
                  >
                    {copiedText ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedText ? 'Copied' : 'Copy Markdown'}</span>
                  </button>
                  <button
                    onClick={() => documentExportService.downloadMarkdown(publication)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download .md</span>
                  </button>
                </div>
              </div>

              <pre className="p-4 bg-slate-950 text-emerald-300 font-mono text-xs rounded-2xl max-h-80 overflow-y-auto border border-slate-800 selection:bg-emerald-800 selection:text-white">
                {markdownText}
              </pre>
            </div>
          )}

          {/* 3. BIBTEX & MULTI-STYLE CITATION TAB */}
          {activeFormat === 'bib' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
                  {(['bibtex', 'apa', 'ieee', 'mla', 'chicago', 'ris'] as const).map((style) => (
                    <button
                      key={style}
                      onClick={() => setCitationStyle(style)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold uppercase transition-all ${
                        citationStyle === style
                          ? 'bg-slate-900 text-white shadow-2xs'
                          : 'text-slate-600 hover:text-slate-950'
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopy(citations[citationStyle])}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-semibold shadow-2xs transition-colors"
                  >
                    {copiedText ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedText ? 'Copied' : `Copy ${citationStyle.toUpperCase()}`}</span>
                  </button>
                  <button
                    onClick={() => documentExportService.downloadBibtex(publication)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download .bib</span>
                  </button>
                </div>
              </div>

              <div className="bg-slate-900 text-amber-200 p-4 rounded-2xl font-mono text-xs max-h-72 overflow-y-auto border border-slate-800">
                <pre className="whitespace-pre-wrap">{citations[citationStyle]}</pre>
              </div>
            </div>
          )}

          {/* 4. JSON TAB */}
          {activeFormat === 'json' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div className="text-xs text-slate-600">
                  Machine-readable JSON schema containing publication metadata, D3 series, tract metrics, and thermodynamic equations.
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopy(JSON.stringify(publication, null, 2))}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-semibold shadow-2xs transition-colors"
                  >
                    {copiedText ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedText ? 'Copied' : 'Copy JSON'}</span>
                  </button>
                  <button
                    onClick={() => documentExportService.downloadJson(publication)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-bold transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download .json</span>
                  </button>
                </div>
              </div>

              <pre className="p-4 bg-slate-950 text-purple-300 font-mono text-xs rounded-2xl max-h-72 overflow-y-auto border border-slate-800">
                {JSON.stringify(publication, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* Footer with Multi-format download bundle */}
        <div className="p-4 sm:p-5 bg-[#FAF8F5] border-t border-[#E2DCD5] flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-600 font-mono text-[11px]">
            <span>DOI: {publication.doi}</span>
            <span>•</span>
            <a
              href="https://urban-heat.ai-aarti.com/"
              target="_blank"
              rel="noreferrer"
              className="text-amber-800 hover:underline flex items-center gap-1"
            >
              urban-heat.ai-aarti.com <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => documentExportService.downloadPdfOrPrint(publication)}
              className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-800 hover:bg-slate-100 font-medium"
            >
              PDF
            </button>
            <button
              onClick={() => documentExportService.downloadMarkdown(publication)}
              className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-800 hover:bg-slate-100 font-medium"
            >
              Markdown
            </button>
            <button
              onClick={() => documentExportService.downloadBibtex(publication)}
              className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-800 hover:bg-slate-100 font-medium"
            >
              BibTeX
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-slate-900 text-white font-bold hover:bg-slate-800 transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
