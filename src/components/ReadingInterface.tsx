import React, { useState, useEffect } from 'react';
import { Publication } from '../types';
import { ThermalScatterChart } from './charts/ThermalScatterChart';
import { MetropolitanHeatMap } from './charts/MetropolitanHeatMap';
import { MitigationSimulator } from './charts/MitigationSimulator';
import { MathFormula } from './MathFormula';
import {
  ArrowLeft,
  BookOpen,
  Download,
  Quote,
  Check,
  GitBranch,
  ExternalLink,
  Share2,
  FileText,
  Sparkles,
  Sliders,
  Type,
  Maximize2,
  Layers,
  ShieldCheck,
  AlertTriangle,
  Lightbulb,
  HelpCircle
} from 'lucide-react';

interface ReadingInterfaceProps {
  publication: Publication;
  onBack: () => void;
  onOpenArchitecture: () => void;
}

export const ReadingInterface: React.FC<ReadingInterfaceProps> = ({
  publication,
  onBack,
  onOpenArchitecture
}) => {
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xl'>('normal');
  const [fontSerif, setFontSerif] = useState<boolean>(true);
  const [activeSectionId, setActiveSectionId] = useState<string>('sec-abstract');
  const [copiedBibtex, setCopiedBibtex] = useState(false);
  const [showBibtexDrawer, setShowBibtexDrawer] = useState(false);

  const sections = publication.fullContent?.sections || [];

  // Scroll spy to highlight active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSectionId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );

    sections.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  const handleCopyBibtex = () => {
    navigator.clipboard.writeText(publication.bibtex);
    setCopiedBibtex(true);
    setTimeout(() => setCopiedBibtex(false), 2500);
  };

  const handleDownloadDataset = () => {
    const jsonStr = JSON.stringify(publication, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${publication.slug}-metadata-dataset.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-slate-900 pb-24">
      {/* Top Reader Toolbar */}
      <div className="sticky top-0 z-30 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E2DCD5] px-4 sm:px-8 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-950 p-1.5 rounded-lg hover:bg-slate-200/60 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Portfolio</span>
          </button>

          {/* Title Snippet */}
          <div className="truncate text-xs font-serif font-semibold text-slate-600 max-w-xs sm:max-w-md hidden md:block">
            {publication.title}
          </div>

          {/* Reader Preferences & Actions */}
          <div className="flex items-center gap-2">
            {/* Font Family Toggle */}
            <button
              onClick={() => setFontSerif(!fontSerif)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${
                fontSerif ? 'bg-white border-slate-300 text-slate-900' : 'bg-slate-200 border-slate-400 text-slate-900 font-bold'
              }`}
              title="Toggle Serif / Sans Font"
            >
              {fontSerif ? 'Serif' : 'Sans'}
            </button>

            {/* Font Size Adjust */}
            <div className="inline-flex items-center rounded-md border border-slate-300 bg-white text-xs">
              <button
                onClick={() => setFontSize('normal')}
                className={`px-2 py-1 ${fontSize === 'normal' ? 'bg-slate-200 font-bold' : 'text-slate-600'}`}
              >
                A
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-2 py-1 ${fontSize === 'large' ? 'bg-slate-200 font-bold' : 'text-slate-600'} text-[13px]`}
              >
                A+
              </button>
              <button
                onClick={() => setFontSize('xl')}
                className={`px-2 py-1 ${fontSize === 'xl' ? 'bg-slate-200 font-bold' : 'text-slate-600'} text-[15px]`}
              >
                A++
              </button>
            </div>

            {/* BibTeX Button */}
            <button
              onClick={() => setShowBibtexDrawer(!showBibtexDrawer)}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-white border border-slate-300 text-slate-700 hover:bg-slate-100"
            >
              <Quote className="w-3.5 h-3.5 text-amber-700" />
              <span className="hidden sm:inline">BibTeX</span>
            </button>

            {/* Dataset Download */}
            <button
              onClick={handleDownloadDataset}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300"
              title="Export Dataset and Open Science Metadata"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export JSON</span>
            </button>
          </div>
        </div>
      </div>

      {/* BibTeX Drawer Modal */}
      {showBibtexDrawer && (
        <div className="max-w-4xl mx-auto px-4 mt-4 animate-in fade-in duration-200">
          <div className="bg-white border border-amber-300 rounded-xl p-4 shadow-md">
            <div className="flex items-center justify-between pb-2 border-b">
              <span className="text-xs font-mono font-bold text-amber-900 flex items-center gap-1">
                <Quote className="w-3.5 h-3.5" /> Canonical BibTeX Citation
              </span>
              <button
                onClick={handleCopyBibtex}
                className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded bg-amber-800 text-white hover:bg-amber-900"
              >
                {copiedBibtex ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Quote className="w-3.5 h-3.5" />}
                <span>{copiedBibtex ? 'Copied to Clipboard!' : 'Copy BibTeX'}</span>
              </button>
            </div>
            <pre className="p-3 bg-slate-900 text-amber-200 text-xs font-mono rounded-lg mt-2 overflow-x-auto whitespace-pre-wrap select-all">
              {publication.bibtex}
            </pre>
          </div>
        </div>
      )}

      {/* Article Header */}
      <header className="max-w-4xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14 pb-8 border-b border-[#E2DCD5]">
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-3">
          <span className="font-serif italic text-amber-900 font-semibold text-sm">
            {publication.journalOrVenue}
          </span>
          <span>•</span>
          <span className="font-mono">{publication.date}</span>
          <span>•</span>
          <span className="font-mono text-slate-600">DOI: {publication.doi}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-slate-900 tracking-tight leading-[1.18]">
          {publication.title}
        </h1>

        {publication.subtitle && (
          <p className="font-serif text-lg sm:text-xl text-slate-600 italic mt-3 leading-snug">
            {publication.subtitle}
          </p>
        )}

        {/* Author Byline */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
              Principal Investigator & Architecture Author:
            </div>
            <div className="text-base font-serif font-bold text-slate-900 mt-0.5">
              {publication.authors[0].name}
              <span className="text-xs font-sans text-amber-800 font-medium ml-2">
                ({publication.authors[0].affiliation})
              </span>
            </div>
            {publication.authors[0].orcid && (
              <div className="text-xs font-mono text-slate-500 mt-0.5">
                ORCID: {publication.authors[0].orcid}
              </div>
            )}
          </div>

          {/* Quick External Links */}
          <div className="flex items-center gap-2">
            {publication.openScience.githubUrl && (
              <a
                href={publication.openScience.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors shadow-2xs"
              >
                <GitBranch className="w-3.5 h-3.5" />
                <span>GitHub Repository</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}

            {publication.openScience.liveUrl && (
              <a
                href={publication.openScience.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-800 text-white rounded-lg text-xs font-semibold hover:bg-amber-700 transition-colors shadow-2xs"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Live Research Site</span>
              </a>
            )}
          </div>
        </div>

        {/* Executive Summary Card */}
        {publication.fullContent?.executiveSummary && (
          <div className="mt-6 p-4 bg-white rounded-xl border border-amber-200/90 shadow-2xs">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5 mb-1.5">
              <Sparkles className="w-4 h-4 text-amber-700" />
              Executive Research Synopsis
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
              {publication.fullContent.executiveSummary}
            </p>
          </div>
        )}
      </header>

      {/* Main Reading Container: Dual-Column with Sticky TOC on Desktop */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Sticky Table of Contents (Nature & Science motivated) */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-20 space-y-4">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold border-b pb-2">
                Manuscript Outline
              </div>

              <nav className="space-y-1 text-xs">
                {sections.map((sec) => {
                  const isActive = activeSectionId === sec.id;
                  return (
                    <a
                      key={sec.id}
                      href={`#${sec.id}`}
                      className={`block px-2.5 py-1.5 rounded-md transition-all ${
                        isActive
                          ? 'bg-amber-100/80 text-amber-950 font-bold border-l-2 border-amber-800'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                      }`}
                    >
                      {sec.title}
                    </a>
                  );
                })}
              </nav>

              {/* Research Blueprint Shortcut */}
              <div className="pt-4 border-t border-slate-200">
                <button
                  onClick={onOpenArchitecture}
                  className="w-full text-left p-3 rounded-xl bg-slate-900 text-white text-xs hover:bg-slate-800 transition-colors shadow-2xs"
                >
                  <div className="flex items-center gap-1.5 text-amber-300 font-bold">
                    <Layers className="w-4 h-4" /> System Blueprint
                  </div>
                  <div className="text-[11px] text-slate-300 mt-1 leading-snug">
                    Inspect 5-tier architecture & data pipelines
                  </div>
                </button>
              </div>
            </div>
          </aside>

          {/* Center/Right: Manuscript Body */}
          <main className="lg:col-span-9 max-w-3xl space-y-12">
            {sections.map((sec) => {
              const fontClasses = fontSerif ? 'font-serif' : 'font-sans';
              const textClasses =
                fontSize === 'normal'
                  ? 'text-sm sm:text-base leading-relaxed'
                  : fontSize === 'large'
                  ? 'text-base sm:text-lg leading-relaxed'
                  : 'text-lg sm:text-xl leading-relaxed';

              return (
                <section key={sec.id} id={sec.id} className="scroll-mt-24">
                  <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 pb-2 border-b border-slate-200 mb-4">
                    {sec.title}
                  </h2>

                  {/* HTML Content */}
                  <div
                    className={`${fontClasses} ${textClasses} text-slate-800`}
                    dangerouslySetInnerHTML={{ __html: sec.contentHtml }}
                  />

                  {/* Mathematical Formulation Callout */}
                  {sec.equation && (
                    <MathFormula
                      math={sec.equation.latex}
                      label={sec.equation.label}
                      explanation={sec.equation.explanation}
                    />
                  )}

                  {/* Scholarly Callout Box */}
                  {sec.callout && (
                    <div className={`my-6 p-4 rounded-xl border text-xs sm:text-sm leading-relaxed ${
                      sec.callout.type === 'key_insight' || sec.callout.type === 'nobel_insight'
                        ? 'bg-amber-50/80 border-amber-300 text-amber-950'
                        : sec.callout.type === 'caution'
                        ? 'bg-red-50/80 border-red-300 text-red-950'
                        : sec.callout.type === 'policy_impact'
                        ? 'bg-purple-50/80 border-purple-300 text-purple-950'
                        : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}>
                      <div className="font-bold flex items-center gap-1.5 mb-1 text-xs uppercase tracking-wider">
                        {(sec.callout.type === 'key_insight' || sec.callout.type === 'nobel_insight') && <Sparkles className="w-4 h-4 text-amber-700" />}
                        {sec.callout.type === 'caution' && <AlertTriangle className="w-4 h-4 text-red-700" />}
                        {sec.callout.type === 'policy_impact' && <Lightbulb className="w-4 h-4 text-purple-700" />}
                        {sec.callout.type === 'methodology' && <ShieldCheck className="w-4 h-4 text-slate-700" />}
                        <span>{sec.callout.title}</span>
                      </div>
                      <p className="font-sans text-xs sm:text-sm">{sec.callout.text}</p>
                    </div>
                  )}

                  {/* Inline D3 Visualizations based on section requirement */}
                  {sec.hasD3Chart === 'scatter' && (
                    <div className="my-8">
                      <ThermalScatterChart />
                    </div>
                  )}

                  {sec.hasD3Chart === 'heatmap' && (
                    <div className="my-8">
                      <MetropolitanHeatMap />
                    </div>
                  )}

                  {sec.hasD3Chart === 'simulator' && (
                    <div className="my-8">
                      <MitigationSimulator />
                    </div>
                  )}
                </section>
              );
            })}

            {/* Academic Archival Integration Footer */}
            <div className="mt-16 pt-8 border-t-2 border-slate-300 text-xs text-slate-600 space-y-4 font-sans">
              <div className="font-serif font-bold text-base text-slate-900">
                Academic Archival & Open Science Verification
              </div>
              <p className="leading-relaxed">
                This manuscript is maintained as a living computational archive in collaboration with <em>ai-aarti.com</em>. All underlying datasets, Docker containers, satellite radiometric calibrations, and D3 vector modules are open-access under the MIT License and Creative Commons Attribution 4.0 International (CC BY 4.0).
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href="https://github.com/aartisr/urban-heat-democratization"
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-amber-800 hover:text-amber-950 underline flex items-center gap-1"
                >
                  <GitBranch className="w-3.5 h-3.5" /> aartisr/urban-heat-democratization
                </a>
                <a
                  href="https://urban-heat.ai-aarti.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-amber-800 hover:text-amber-950 underline flex items-center gap-1"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> urban-heat.ai-aarti.com
                </a>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
