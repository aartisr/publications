import React, { useState, useEffect } from 'react';
import { Publication } from '../types';
import { documentExportService } from '../services/documentExportService';
import { ThermalScatterChart } from './charts/ThermalScatterChart';
import { MetropolitanHeatMap } from './charts/MetropolitanHeatMap';
import { MitigationSimulator } from './charts/MitigationSimulator';
import { GoogleEarthGISExplorer } from './GoogleEarthGISExplorer';
import { MonographAudioPlayer } from './MonographAudioPlayer';
import { PeerReviewModal } from './PeerReviewModal';
import { InteractiveMathSandbox } from './InteractiveMathSandbox';
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
  FileCode,
  Sparkles,
  Sliders,
  Type,
  Maximize2,
  Layers,
  ShieldCheck,
  AlertTriangle,
  Lightbulb,
  HelpCircle,
  Sigma,
  Copy,
  Globe,
  Heart,
  Printer,
  Headphones,
  UserCheck,
  Calculator
} from 'lucide-react';

interface ReadingInterfaceProps {
  publication: Publication;
  onBack: () => void;
  onOpenArchitecture: () => void;
  onOpenMathDeepDive?: () => void;
  onOpenDiscoverability?: () => void;
  onOpenGlobalCommunity?: (tab?: 'world-impact' | 'translations' | 'action-kit' | 'sdgs' | 'amplifier') => void;
  onOpenDownload?: (publication: Publication) => void;
}

export const ReadingInterface: React.FC<ReadingInterfaceProps> = ({
  publication,
  onBack,
  onOpenArchitecture,
  onOpenMathDeepDive,
  onOpenDiscoverability,
  onOpenGlobalCommunity,
  onOpenDownload
}) => {
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xl'>('normal');
  const [fontSerif, setFontSerif] = useState<boolean>(true);
  const [activeSectionId, setActiveSectionId] = useState<string>('sec-abstract');
  const [copiedBibtex, setCopiedBibtex] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showBibtexDrawer, setShowBibtexDrawer] = useState(false);
  const [isPeerReviewOpen, setIsPeerReviewOpen] = useState(false);

  // Derive sections or provide standard scholarly fallback sections
  const sections = publication.fullContent?.sections || [
    {
      id: 'sec-abstract',
      title: '1. Abstract & Scope of Investigation',
      contentHtml: `<p class="leading-relaxed text-slate-700 mb-4">${publication.abstract}</p>`
    },
    {
      id: 'sec-methodology',
      title: '2. Open-Science Methodology & Theoretical Framework',
      contentHtml: `
        <p class="leading-relaxed text-slate-700 mb-4">
          This publication develops rigorous computational models utilizing open-access federal datasets, satellite telemetry, and reproducible algorithms.
        </p>
        <p class="leading-relaxed text-slate-700">
          Topics covered in this research include: <strong>${publication.topics.join(', ')}</strong>.
        </p>
      `,
      callout: {
        type: 'key_insight' as const,
        title: 'Open Science Standards',
        text: 'All equations, code repositories, and datasets associated with this publication are verified and licensed under Open Science CC-BY-4.0.'
      }
    },
    {
      id: 'sec-citations',
      title: '3. Citation & Academic Archival Standard',
      contentHtml: `
        <p class="leading-relaxed text-slate-700 mb-2">
          To cite this publication in academic literature, research proposals, or policy briefs:
        </p>
      `
    }
  ];

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

  const handleShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
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

          {/* Reading Customization Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Font Family Switcher */}
            <button
              onClick={() => setFontSerif(!fontSerif)}
              className={`p-1.5 sm:px-2.5 sm:py-1 rounded-lg border text-xs font-medium transition-colors ${
                fontSerif
                  ? 'bg-amber-100 border-amber-300 text-amber-900'
                  : 'bg-white border-slate-200 text-slate-700'
              }`}
              title="Toggle Serif / Sans Font"
            >
              <span className="font-serif font-bold">Aa</span>
              <span className="hidden sm:inline ml-1 text-[11px]">{fontSerif ? 'Serif' : 'Sans'}</span>
            </button>

            {/* Font Size Adjuster */}
            <div className="flex items-center bg-white border border-slate-200 rounded-lg p-0.5 text-xs">
              <button
                onClick={() => setFontSize('normal')}
                className={`px-2 py-0.5 rounded ${fontSize === 'normal' ? 'bg-slate-900 text-white font-bold' : 'text-slate-600'}`}
                title="Normal Text Size"
              >
                A
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-2 py-0.5 rounded text-sm ${fontSize === 'large' ? 'bg-slate-900 text-white font-bold' : 'text-slate-600'}`}
                title="Large Text Size"
              >
                A+
              </button>
              <button
                onClick={() => setFontSize('xl')}
                className={`px-2 py-0.5 rounded text-base ${fontSize === 'xl' ? 'bg-slate-900 text-white font-bold' : 'text-slate-600'}`}
                title="Extra Large Text Size"
              >
                A++
              </button>
            </div>

            {/* Global Community Translations & Audio Shortcut */}
            {onOpenGlobalCommunity && (
              <button
                onClick={() => onOpenGlobalCommunity('translations')}
                className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-teal-50 hover:bg-teal-100 border border-teal-300 text-teal-950 text-xs font-bold transition-colors shadow-2xs"
                title="Read plain-language summaries in 10 world languages with audio playback"
              >
                <Globe className="w-3.5 h-3.5 text-teal-700" />
                <span className="hidden md:inline">10 Languages</span>
                <span className="md:hidden">10L</span>
              </button>
            )}

            {/* Discoverability & AI Metadata Shortcut */}
            {onOpenDiscoverability && (
              <button
                onClick={onOpenDiscoverability}
                className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-950 text-xs font-bold transition-colors shadow-2xs"
                title="Inspect AI Citations, Schema.org JSON-LD, and Highwire Press tags for this publication"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                <span>AI / SEO</span>
              </button>
            )}

            {/* Peer Review Button */}
            <button
              onClick={() => setIsPeerReviewOpen(true)}
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 text-emerald-950 text-xs font-bold transition-colors shadow-2xs"
              title="Inspect Double-Blind Peer Review Reports & Author Rebuttals"
            >
              <UserCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>Peer Review</span>
            </button>

            {/* Math Deep Dive Shortcut */}
            {onOpenMathDeepDive && (
              <button
                onClick={onOpenMathDeepDive}
                className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-100 hover:bg-amber-200 border border-amber-300 text-amber-950 text-xs font-bold transition-colors shadow-2xs"
                title="Inspect Mathematical Proofs & Spectral Formulas"
              >
                <Sigma className="w-3.5 h-3.5 text-amber-700" />
                <span>Math</span>
              </button>
            )}

            {/* Download Monograph Action */}
            <button
              onClick={() => onOpenDownload ? onOpenDownload(publication) : documentExportService.downloadPdfOrPrint(publication)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-900 hover:bg-slate-900 text-amber-200 hover:text-white text-xs font-bold transition-all shadow-2xs group"
              title="Download Research Monograph in top 3 formats (PDF, Markdown, BibTeX)"
            >
              <Download className="w-3.5 h-3.5 text-amber-400 group-hover:translate-y-0.5 transition-transform" />
              <span>Download Monograph</span>
            </button>

            {/* BibTeX Action */}
            <button
              onClick={handleCopyBibtex}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-semibold shadow-2xs transition-colors"
              title="Copy BibTeX Citation"
            >
              {copiedBibtex ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Quote className="w-3.5 h-3.5 text-slate-600" />}
              <span className="hidden sm:inline">{copiedBibtex ? 'Copied BibTeX' : 'BibTeX'}</span>
            </button>

            {/* Share link */}
            <button
              onClick={handleShareLink}
              className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs transition-colors"
              title="Share Publication"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5 text-slate-600" />}
            </button>
          </div>
        </div>
      </div>

      {/* Hero Paper Header */}
      <header className="max-w-4xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14">
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
              Principal Investigator & Author:
            </div>
            <div className="text-base font-serif font-bold text-slate-900 mt-0.5">
              {publication.authors[0]?.name}
              <span className="text-xs font-sans text-amber-800 font-medium ml-2">
                ({publication.authors[0]?.affiliation})
              </span>
            </div>
            {publication.authors[0]?.orcid && (
              <div className="text-xs font-mono text-slate-500 mt-0.5">
                ORCID: {publication.authors[0].orcid}
              </div>
            )}
          </div>

          {/* Quick External Links */}
          <div className="flex items-center gap-2">
            {publication.openScience?.githubUrl && (
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

            {publication.openScience?.liveUrl && (
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

        {/* Download Monograph in Top 3 Formats Highlight Banner */}
        <div className="mt-4 p-4 bg-[#FAF8F5] rounded-2xl border-2 border-amber-300 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <Download className="w-4 h-4 text-amber-700 font-bold" />
              <span>Download Research Monograph in Top 3 Formats</span>
            </div>
            <div className="text-[11px] text-slate-600 mt-0.5">
              Available as <strong>PDF Academic Reprint</strong>, <strong>Scientific Markdown (.md)</strong> with LaTeX, and <strong>BibTeX (.bib)</strong> citation bundle.
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => documentExportService.downloadPdfOrPrint(publication)}
              className="px-3 py-1.5 rounded-lg bg-amber-900 hover:bg-slate-900 text-white font-bold text-xs flex items-center gap-1.5 shadow-2xs transition-colors"
              title="Download/Print PDF Academic Reprint"
            >
              <Printer className="w-3.5 h-3.5 text-amber-400" />
              <span>1. PDF</span>
            </button>

            <button
              onClick={() => documentExportService.downloadMarkdown(publication)}
              className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-2xs transition-colors"
              title="Download Scientific Markdown with YAML frontmatter"
            >
              <FileCode className="w-3.5 h-3.5 text-emerald-200" />
              <span>2. Markdown</span>
            </button>

            <button
              onClick={() => documentExportService.downloadBibtex(publication)}
              className="px-3 py-1.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-2xs transition-colors"
              title="Download BibTeX Citation file"
            >
              <Quote className="w-3.5 h-3.5 text-blue-200" />
              <span>3. BibTeX</span>
            </button>

            {onOpenDownload && (
              <button
                onClick={() => onOpenDownload(publication)}
                className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-bold text-xs flex items-center gap-1 transition-colors"
                title="Open Download Modal"
              >
                <span>More</span>
              </button>
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

        {/* Executive Audio Briefing Player */}
        <MonographAudioPlayer
          publication={publication}
          onJumpToSection={(secId) => {
            const el = document.getElementById(secId);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* For the Love of Community: Multilingual & Action Hub Callout */}
        <div className="mt-4 p-4 bg-gradient-to-r from-teal-900 via-emerald-900 to-slate-900 text-white rounded-xl border border-teal-700/60 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-start gap-2.5">
            <Heart className="w-4 h-4 text-rose-400 fill-rose-400 shrink-0 mt-0.5 animate-pulse" />
            <div>
              <div className="text-xs font-bold text-teal-200">
                For the Love of Community & Universal Access
              </div>
              <div className="text-[11px] text-teal-100/80 mt-0.5">
                Read plain-language summaries in 10 world languages, listen to audio overviews, or download civic town-hall scripts.
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
            {onOpenGlobalCommunity && (
              <button
                onClick={() => onOpenGlobalCommunity('translations')}
                className="w-full sm:w-auto px-3.5 py-1.5 rounded-lg bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
              >
                <Globe className="w-3.5 h-3.5 text-slate-950" />
                <span>10 Languages & Audio</span>
              </button>
            )}
            {onOpenGlobalCommunity && (
              <button
                onClick={() => onOpenGlobalCommunity('action-kit')}
                className="w-full sm:w-auto px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-colors flex items-center justify-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5 text-teal-300" />
                <span>Action Kit</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Reading Container: Dual-Column with Sticky TOC on Desktop */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Sticky Table of Contents */}
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
                          ? 'bg-amber-100 text-amber-950 font-bold border-l-2 border-amber-700'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                    >
                      {sec.title}
                    </a>
                  );
                })}
              </nav>

              {/* Quick Downloads Card in Sidebar */}
              <div className="pt-3 border-t border-slate-200 space-y-2">
                <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-bold">
                  Download Monograph
                </div>
                <div className="grid grid-cols-1 gap-1.5 text-xs">
                  <button
                    onClick={() => documentExportService.downloadPdfOrPrint(publication)}
                    className="w-full p-2 rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-950 font-semibold flex items-center justify-between transition-colors text-left"
                  >
                    <span className="flex items-center gap-1.5">
                      <Printer className="w-3.5 h-3.5 text-amber-700" />
                      PDF Reprint
                    </span>
                    <span className="text-[10px] font-mono text-amber-800">.pdf</span>
                  </button>

                  <button
                    onClick={() => documentExportService.downloadMarkdown(publication)}
                    className="w-full p-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-950 font-semibold flex items-center justify-between transition-colors text-left"
                  >
                    <span className="flex items-center gap-1.5">
                      <FileCode className="w-3.5 h-3.5 text-emerald-700" />
                      Markdown
                    </span>
                    <span className="text-[10px] font-mono text-emerald-800">.md</span>
                  </button>

                  <button
                    onClick={() => documentExportService.downloadBibtex(publication)}
                    className="w-full p-2 rounded-lg bg-blue-50 hover:bg-blue-100 border border-blue-300 text-blue-950 font-semibold flex items-center justify-between transition-colors text-left"
                  >
                    <span className="flex items-center gap-1.5">
                      <Quote className="w-3.5 h-3.5 text-blue-700" />
                      BibTeX
                    </span>
                    <span className="text-[10px] font-mono text-blue-800">.bib</span>
                  </button>
                </div>
              </div>

              {/* Research Blueprint Link */}
              <div className="pt-4 border-t border-slate-200">
                <button
                  onClick={onOpenArchitecture}
                  className="w-full text-left p-3 rounded-xl bg-[#0B192C] text-white hover:bg-slate-800 transition-colors shadow-2xs"
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

                  {/* Interactive Google Earth Multi-Layer GIS Explorer in Section 2 */}
                  {sec.id === 'sec-data-readiness' && (
                    <div className="my-8">
                      <GoogleEarthGISExplorer />
                    </div>
                  )}

                  {/* Inline D3 Visualizations */}
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
                    <div className="my-8 space-y-8">
                      <InteractiveMathSandbox />
                      <MitigationSimulator />
                    </div>
                  )}
                </section>
              );
            })}

            {/* BibTeX Citation Section */}
            <section className="bg-slate-900 text-slate-200 rounded-2xl p-6 border border-slate-800">
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2 font-serif font-bold text-white text-sm">
                  <Quote className="w-4 h-4 text-amber-400" />
                  <span>BibTeX Citation</span>
                </div>
                <button
                  onClick={handleCopyBibtex}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-amber-400 text-slate-950 rounded-lg text-xs font-bold hover:bg-amber-300 transition-colors"
                >
                  {copiedBibtex ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedBibtex ? 'Copied' : 'Copy BibTeX'}</span>
                </button>
              </div>
              <pre className="font-mono text-xs text-amber-200/90 bg-slate-950 p-4 rounded-xl overflow-x-auto border border-slate-800">
                {publication.bibtex}
              </pre>
            </section>

            {/* Academic Archival Integration Footer */}
            <div className="mt-16 pt-8 border-t-2 border-slate-300 text-xs text-slate-600 space-y-4 font-sans">
              <div className="font-serif font-bold text-base text-slate-900">
                Academic Archival & Open Science Verification
              </div>
              <p className="leading-relaxed">
                This manuscript is maintained as a living computational archive in collaboration with <em>ai-aarti.com</em>. All underlying datasets, Docker containers, satellite radiometric calibrations, and D3 vector modules are open-access under the MIT License and Creative Commons Attribution 4.0 International (CC BY 4.0).
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                {publication.openScience?.githubUrl && (
                  <a
                    href={publication.openScience.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-amber-800 hover:text-amber-950 underline flex items-center gap-1"
                  >
                    <GitBranch className="w-3.5 h-3.5" /> GitHub Source Repository
                  </a>
                )}
                {publication.openScience?.liveUrl && (
                  <a
                    href={publication.openScience.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-amber-800 hover:text-amber-950 underline flex items-center gap-1"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> Live Research Tool
                  </a>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Peer Review Modal */}
      <PeerReviewModal
        isOpen={isPeerReviewOpen}
        onClose={() => setIsPeerReviewOpen(false)}
        publication={publication}
      />
    </div>
  );
};
