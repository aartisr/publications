import React, { useState, useEffect } from 'react';
import {
  Globe,
  Heart,
  Users,
  Volume2,
  VolumeX,
  Copy,
  Check,
  Download,
  Share2,
  Sparkles,
  Award,
  BookOpen,
  MapPin,
  MessageSquare,
  FileText,
  Shield,
  Layers,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  CheckCircle2,
  Send,
  X
} from 'lucide-react';
import {
  GLOBAL_CITIES_IMPACT,
  MULTILINGUAL_BRIEFS,
  COMMUNITY_ACTION_TOOLS,
  UN_SDG_ALIGNMENTS,
  GlobalCityImpact,
  MultilingualBrief,
  CommunityActionTool
} from '../../data/globalCommunityData';

interface GlobalCommunityHubModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'world-impact' | 'translations' | 'action-kit' | 'sdgs' | 'amplifier';
}

export const GlobalCommunityHubModal: React.FC<GlobalCommunityHubModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'world-impact'
}) => {
  const [activeTab, setActiveTab] = useState<'world-impact' | 'translations' | 'action-kit' | 'sdgs' | 'amplifier'>(initialTab);
  const [selectedCity, setSelectedCity] = useState<GlobalCityImpact>(GLOBAL_CITIES_IMPACT[0]);
  const [selectedLang, setSelectedLang] = useState<MultilingualBrief>(MULTILINGUAL_BRIEFS[0]);
  const [selectedTool, setSelectedTool] = useState<CommunityActionTool>(COMMUNITY_ACTION_TOOLS[0]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  // Audio Speech Synthesis state
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [speechSynthesisAvailable, setSpeechSynthesisAvailable] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setSpeechSynthesisAvailable(true);
    }
  }, []);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  // Clean up audio when switching languages or closing modal
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    }
  }, [selectedLang, isOpen, activeTab]);

  if (!isOpen) return null;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleDownloadText = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const toggleSpeech = () => {
    if (!('speechSynthesis' in window)) return;

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    const textToSpeak = `${selectedLang.title}. ${selectedLang.executiveSummary} Key community takeaways: ${selectedLang.keyCommunityTakeaways.join('. ')}. Call to action: ${selectedLang.callToAction}`;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    
    // Attempt language mapping
    if (selectedLang.langCode === 'es') utterance.lang = 'es-ES';
    else if (selectedLang.langCode === 'fr') utterance.lang = 'fr-FR';
    else if (selectedLang.langCode === 'hi') utterance.lang = 'hi-IN';
    else if (selectedLang.langCode === 'zh') utterance.lang = 'zh-CN';
    else if (selectedLang.langCode === 'pt') utterance.lang = 'pt-BR';
    else if (selectedLang.langCode === 'ar') utterance.lang = 'ar-SA';
    else if (selectedLang.langCode === 'de') utterance.lang = 'de-DE';
    else if (selectedLang.langCode === 'ja') utterance.lang = 'ja-JP';
    else utterance.lang = 'en-US';

    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    window.speechSynthesis.speak(utterance);
    setIsPlayingAudio(true);
  };

  const shareText = `Explore groundbreaking open-access urban heat & environmental justice research by Aarti Sri Ravikumar (ai-aarti.com). 100% free satellite maps & spectral graph formulas for community resilience: https://ai-aarti.com`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 backdrop-blur-xs p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-5xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header Ribbon: Love of Community & Global Awareness */}
        <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white px-6 py-5 border-b border-emerald-700/50 flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-bold shadow-md shrink-0 mt-0.5">
              <Globe className="w-6 h-6 text-emerald-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-400/20 text-emerald-300 border border-emerald-400/40">
                  <Heart className="w-3 h-3 text-rose-400 fill-rose-400" /> For the Love of Community
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-teal-400/20 text-teal-200 border border-teal-400/30">
                  Global Open Science Initiative
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-white mt-1">
                Worldwide Community Impact & Awareness Hub
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100/80 mt-0.5 max-w-2xl font-sans">
                Championing global climate justice through audit-grade spectral mathematics, satellite radiometry downscaling, and barrier-free multilingual community advocacy toolkits.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-emerald-200 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 px-6 border-b border-slate-200 bg-[#FAF8F5] overflow-x-auto text-xs font-semibold py-2">
          <button
            onClick={() => setActiveTab('world-impact')}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 whitespace-nowrap transition-all ${
              activeTab === 'world-impact'
                ? 'bg-emerald-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>Worldwide Impact Map ({GLOBAL_CITIES_IMPACT.length} Hubs)</span>
          </button>

          <button
            onClick={() => setActiveTab('translations')}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 whitespace-nowrap transition-all ${
              activeTab === 'translations'
                ? 'bg-emerald-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Multilingual Briefs (10 Languages)</span>
          </button>

          <button
            onClick={() => setActiveTab('action-kit')}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 whitespace-nowrap transition-all ${
              activeTab === 'action-kit'
                ? 'bg-emerald-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Community Action Kit</span>
          </button>

          <button
            onClick={() => setActiveTab('sdgs')}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 whitespace-nowrap transition-all ${
              activeTab === 'sdgs'
                ? 'bg-emerald-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>UN SDGs & UNESCO Open Science</span>
          </button>

          <button
            onClick={() => setActiveTab('amplifier')}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 whitespace-nowrap transition-all ${
              activeTab === 'amplifier'
                ? 'bg-emerald-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Share2 className="w-4 h-4" />
            <span>1-Click Awareness Amplifier</span>
          </button>
        </div>

        {/* Tab Contents */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* TAB 1: WORLDWIDE IMPACT MAP & CASE HUBS */}
          {activeTab === 'world-impact' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-white p-5 rounded-2xl border border-emerald-200 flex flex-col sm:flex-row items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800">
                    Worldwide Open Science In Action
                  </div>
                  <h3 className="text-lg font-serif font-bold text-slate-900 mt-1">
                    Equipping Frontline Communities with Rigorous Physical Evidence
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 mt-1 max-w-2xl leading-relaxed">
                    Aarti Sri Ravikumar's open-access mathematical algorithms and satellite downscaling models are deliberately designed without commercial software paywalls. Here is how grassroots organizers and municipal planners are deploying this research across continents.
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-950 font-bold text-xs border border-emerald-300">
                    🌍 8 Global Case Studies
                  </span>
                </div>
              </div>

              {/* City Selector Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {GLOBAL_CITIES_IMPACT.map((city) => (
                  <button
                    key={city.id}
                    onClick={() => setSelectedCity(city)}
                    className={`p-3.5 rounded-xl text-left border transition-all ${
                      selectedCity.id === city.id
                        ? 'bg-emerald-900 text-white border-emerald-900 shadow-md ring-2 ring-emerald-400/40'
                        : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-semibold uppercase tracking-wider opacity-75">
                        {city.region}
                      </span>
                      <span className={`text-[11px] font-bold px-1.5 py-0.5 rounded ${
                        selectedCity.id === city.id ? 'bg-emerald-800 text-emerald-200' : 'bg-rose-50 text-rose-700'
                      }`}>
                        {city.tempDisparity}
                      </span>
                    </div>
                    <div className="font-serif font-bold text-sm mt-1 truncate">
                      {city.city}
                    </div>
                    <div className="text-xs opacity-80 mt-0.5">
                      {city.country}
                    </div>
                  </button>
                ))}
              </div>

              {/* Detailed City Card */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
                        {selectedCity.partnerType}
                      </span>
                      <span className="text-xs font-mono text-slate-500">
                        Lat/Lng: [{selectedCity.coordinates[0]}, {selectedCity.coordinates[1]}]
                      </span>
                    </div>
                    <h4 className="text-xl font-serif font-bold text-slate-900 mt-1">
                      {selectedCity.city}, {selectedCity.country}
                    </h4>
                  </div>
                  <div className="flex items-center gap-2">
                    {selectedCity.sdgFocus.map((sdg) => (
                      <span key={sdg} className="px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-900 border border-emerald-300">
                        {sdg}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  <div className="p-4 bg-rose-50/70 rounded-xl border border-rose-200">
                    <div className="text-xs font-mono uppercase font-bold text-rose-800 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" /> Thermal Vulnerability
                    </div>
                    <div className="text-sm text-slate-800 mt-2 font-medium leading-relaxed">
                      {selectedCity.vulnerabilityChallenge}
                    </div>
                    <div className="mt-3 pt-2 border-t border-rose-200/60 text-xs font-bold text-rose-900">
                      Local Disparity Penalty: {selectedCity.tempDisparity}
                    </div>
                  </div>

                  <div className="p-4 bg-amber-50/70 rounded-xl border border-amber-200">
                    <div className="text-xs font-mono uppercase font-bold text-amber-800 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5" /> Applied Mathematics
                    </div>
                    <div className="text-sm text-slate-800 mt-2 font-medium leading-relaxed">
                      {selectedCity.appliedMethodology}
                    </div>
                    <div className="mt-3 pt-2 border-t border-amber-200/60 text-xs font-bold text-amber-900">
                      Sensor: Landsat 9 TIRS + Sentinel-2
                    </div>
                  </div>

                  <div className="p-4 bg-emerald-50/70 rounded-xl border border-emerald-200">
                    <div className="text-xs font-mono uppercase font-bold text-emerald-800 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5" /> Community Outcome
                    </div>
                    <div className="text-sm text-slate-800 mt-2 font-medium leading-relaxed">
                      {selectedCity.communityOutcome}
                    </div>
                    <div className="mt-3 pt-2 border-t border-emerald-200/60 text-xs font-bold text-emerald-900">
                      Impact: Verifiable Policy Proof
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MULTILINGUAL BRIEFS */}
          {activeTab === 'translations' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-amber-50 via-white to-amber-50 p-5 rounded-2xl border border-amber-200 flex flex-col sm:flex-row items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-amber-900">
                    Universal Global Language Access
                  </div>
                  <h3 className="text-lg font-serif font-bold text-slate-900 mt-1">
                    Plain-Language Research Summaries in 10 World Languages
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 mt-1 max-w-2xl leading-relaxed">
                    Language should never be a gatekeeper to climate science. These peer-reviewed executive briefs translate rigorous spectral mathematics into clear, actionable terms for neighborhood organizers, youth, and municipal advocates worldwide.
                  </p>
                </div>
                
                {speechSynthesisAvailable && (
                  <button
                    onClick={toggleSpeech}
                    className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shrink-0 ${
                      isPlayingAudio
                        ? 'bg-rose-600 text-white animate-pulse shadow-md'
                        : 'bg-emerald-900 text-white hover:bg-emerald-800 shadow-xs'
                    }`}
                  >
                    {isPlayingAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    <span>{isPlayingAudio ? 'Stop Audio Overview' : 'Listen to Audio Summary'}</span>
                  </button>
                )}
              </div>

              {/* Language Selector Pills */}
              <div className="flex flex-wrap items-center gap-2">
                {MULTILINGUAL_BRIEFS.map((brief) => (
                  <button
                    key={brief.langCode}
                    onClick={() => setSelectedLang(brief)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                      selectedLang.langCode === brief.langCode
                        ? 'bg-emerald-900 text-white shadow-xs'
                        : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                    }`}
                  >
                    <span>{brief.flag}</span>
                    <span>{brief.nativeName}</span>
                    <span className="text-[10px] opacity-75">({brief.languageName})</span>
                  </button>
                ))}
              </div>

              {/* Selected Language Content Card */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{selectedLang.flag}</span>
                    <div>
                      <h4 className="font-serif font-bold text-slate-900 text-base sm:text-lg">
                        {selectedLang.languageName} • {selectedLang.nativeName}
                      </h4>
                      <div className="text-xs text-emerald-800 font-mono font-medium">
                        {selectedLang.translatorNote}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopy(`${selectedLang.title}\n\n${selectedLang.executiveSummary}\n\nKey Takeaways:\n${selectedLang.keyCommunityTakeaways.map(t => `• ${t}`).join('\n')}\n\nCall to Action:\n${selectedLang.callToAction}`, selectedLang.langCode)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors"
                    >
                      {copiedId === selectedLang.langCode ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedId === selectedLang.langCode ? 'Copied' : 'Copy Text'}</span>
                    </button>

                    <button
                      onClick={() => handleDownloadText(`${selectedLang.title}\n\n${selectedLang.executiveSummary}\n\nKey Takeaways:\n${selectedLang.keyCommunityTakeaways.map(t => `• ${t}`).join('\n')}\n\nCall to Action:\n${selectedLang.callToAction}\n\nResearch by Aarti Sri Ravikumar (ai-aarti.com)`, `Aarti_Ravikumar_Research_Brief_${selectedLang.langCode}.txt`)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-950 text-xs font-semibold transition-colors border border-emerald-300"
                    >
                      <Download className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Download TXT</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="text-xs font-mono uppercase font-bold text-slate-500">Official Title</div>
                    <div className="text-base sm:text-lg font-serif font-bold text-slate-900 mt-1">
                      {selectedLang.title}
                    </div>
                  </div>

                  <div>
                    <div className="text-xs font-mono uppercase font-bold text-slate-500">Executive Summary for Grassroots Leaders</div>
                    <p className="text-sm text-slate-700 mt-1.5 leading-relaxed bg-[#FAF8F5] p-4 rounded-xl border border-slate-200">
                      {selectedLang.executiveSummary}
                    </p>
                  </div>

                  <div>
                    <div className="text-xs font-mono uppercase font-bold text-slate-500">Key Community Takeaways</div>
                    <div className="grid grid-cols-1 gap-2.5 mt-2">
                      {selectedLang.keyCommunityTakeaways.map((takeaway, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-3 bg-emerald-50/50 rounded-xl border border-emerald-200/80 text-xs sm:text-sm text-slate-800">
                          <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                          <span>{takeaway}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <div className="text-xs font-mono uppercase font-bold text-amber-800">Call to Action & Municipal Next Steps</div>
                    <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-xs sm:text-sm font-semibold text-amber-950 mt-1.5">
                      {selectedLang.callToAction}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: COMMUNITY ACTION KIT */}
          {activeTab === 'action-kit' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-teal-50 via-white to-teal-50 p-5 rounded-2xl border border-teal-200 flex flex-col sm:flex-row items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-teal-800">
                    Barrier-Free Grassroots Action Kit
                  </div>
                  <h3 className="text-lg font-serif font-bold text-slate-900 mt-1">
                    Free Templates, Scripts, Curriculum & Grant Frameworks
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 mt-1 max-w-2xl leading-relaxed">
                    Designed specifically for high school educators, neighborhood organizers, tenant leaders, and municipal sustainability staff to turn scientific proof into municipal legislation and community funding.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                {COMMUNITY_ACTION_TOOLS.map((tool) => (
                  <button
                    key={tool.id}
                    onClick={() => setSelectedTool(tool)}
                    className={`p-3.5 rounded-xl text-left border transition-all ${
                      selectedTool.id === tool.id
                        ? 'bg-emerald-900 text-white border-emerald-900 shadow-md ring-2 ring-emerald-400/40'
                        : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200'
                    }`}
                  >
                    <div className="text-[11px] font-mono uppercase font-semibold opacity-75 truncate">
                      {tool.category}
                    </div>
                    <div className="font-serif font-bold text-sm mt-1 leading-snug">
                      {tool.title}
                    </div>
                  </button>
                ))}
              </div>

              {/* Selected Tool View */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-3">
                  <div>
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-teal-100 text-teal-900 border border-teal-300">
                      {selectedTool.category}
                    </span>
                    <h4 className="text-xl font-serif font-bold text-slate-900 mt-1.5">
                      {selectedTool.title}
                    </h4>
                    <div className="text-xs text-slate-500 mt-0.5">
                      Target: <strong className="text-slate-700">{selectedTool.targetAudience}</strong>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopy(selectedTool.contentTemplate, selectedTool.id)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors"
                    >
                      {copiedId === selectedTool.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                      <span>{copiedId === selectedTool.id ? 'Copied' : 'Copy Template'}</span>
                    </button>

                    <button
                      onClick={() => handleDownloadText(selectedTool.contentTemplate, selectedTool.downloadFileName)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-900 hover:bg-emerald-800 text-white text-xs font-semibold transition-colors shadow-xs"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download Kit</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="text-xs font-mono uppercase font-bold text-slate-500">How to Put This Into Practice</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-2">
                      {selectedTool.practicalSteps.map((step, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700">
                          <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-900 font-mono font-bold flex items-center justify-center shrink-0 text-[11px]">
                            {idx + 1}
                          </span>
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="text-xs font-mono uppercase font-bold text-slate-500">Complete Editable Template Content</div>
                    <pre className="mt-2 p-4 bg-slate-900 text-slate-100 rounded-xl text-xs font-mono whitespace-pre-wrap leading-relaxed max-h-72 overflow-y-auto border border-slate-800">
                      {selectedTool.contentTemplate}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: UN SDGS & OPEN SCIENCE */}
          {activeTab === 'sdgs' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 via-white to-blue-50 p-5 rounded-2xl border border-blue-200">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-blue-800">
                  Global Climate Alignment
                </div>
                <h3 className="text-lg font-serif font-bold text-slate-900 mt-1">
                  United Nations Sustainable Development Goals (SDGs) & UNESCO Open Science
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 mt-1 max-w-2xl leading-relaxed">
                  Aarti Sri Ravikumar’s research is pledged under the <strong>UNESCO Recommendation on Open Science</strong>, ensuring unconstrained global knowledge sharing, open data pipelines, and equitable environmental protection.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {UN_SDG_ALIGNMENTS.map((sdg) => (
                  <div key={sdg.code} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-900 border border-blue-300">
                          {sdg.code}
                        </span>
                        <span className="text-xs font-mono font-semibold text-slate-500">
                          {sdg.target}
                        </span>
                      </div>
                      <h4 className="text-base font-serif font-bold text-slate-900 mt-2">
                        {sdg.name}
                      </h4>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {sdg.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 bg-emerald-50/70 p-3 rounded-xl border border-emerald-200">
                      <div className="text-[11px] font-mono font-bold uppercase text-emerald-900">
                        Aarti's Mathematical Contribution
                      </div>
                      <div className="text-xs text-slate-800 mt-0.5 leading-relaxed font-medium">
                        {sdg.contribution}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* UNESCO Open Science Declaration Box */}
              <div className="p-5 bg-gradient-to-r from-emerald-950 to-slate-950 text-white rounded-2xl border border-emerald-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-mono font-bold uppercase text-emerald-300 tracking-wider">
                      Open Science Manifesto
                    </span>
                  </div>
                  <div className="font-serif font-bold text-base text-white">
                    Zero Paywalls • Public Code • Reproducible Satellites
                  </div>
                  <p className="text-xs text-emerald-100/80 max-w-xl">
                    Every algorithm, raster matrix calculation, and graph cut is published under Creative Commons CC-BY-4.0 and MIT license on GitHub for anyone to clone, verify, and run locally.
                  </p>
                </div>
                <a
                  href="https://github.com/aartisr"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-colors shrink-0 shadow-md flex items-center gap-1.5"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Inspect GitHub Repos</span>
                </a>
              </div>
            </div>
          )}

          {/* TAB 5: 1-CLICK AWARENESS AMPLIFIER */}
          {activeTab === 'amplifier' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-purple-50 via-white to-purple-50 p-5 rounded-2xl border border-purple-200">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-purple-800">
                  Global Amplification & Grassroots Network
                </div>
                <h3 className="text-lg font-serif font-bold text-slate-900 mt-1">
                  Spread Rigorous Research for the Love of Community
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 mt-1 max-w-2xl leading-relaxed">
                  Empower your local community by sharing these findings across social channels, community email newsletters, WhatsApp organizing groups, and direct outreach to elected officials.
                </p>
              </div>

              {/* Direct Share Actions */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-950 flex flex-col justify-between transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm font-serif">WhatsApp Broadcast</span>
                    <Send className="w-4 h-4 text-emerald-700" />
                  </div>
                  <p className="text-xs text-slate-600 mt-2">
                    Share research links directly into neighborhood organizing & mutual aid group chats.
                  </p>
                  <span className="text-xs font-bold text-emerald-800 underline mt-3">Share on WhatsApp &rarr;</span>
                </a>

                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-4 rounded-xl bg-sky-50 hover:bg-sky-100 border border-sky-300 text-sky-950 flex flex-col justify-between transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm font-serif">X (Twitter) Thread</span>
                    <Share2 className="w-4 h-4 text-sky-700" />
                  </div>
                  <p className="text-xs text-slate-600 mt-2">
                    Amplify Aarti's mathematical findings to climate scientists and policy makers.
                  </p>
                  <span className="text-xs font-bold text-sky-800 underline mt-3">Post to X &rarr;</span>
                </a>

                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://ai-aarti.com')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-4 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-300 text-blue-950 flex flex-col justify-between transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm font-serif">LinkedIn Network</span>
                    <ExternalLink className="w-4 h-4 text-blue-700" />
                  </div>
                  <p className="text-xs text-slate-600 mt-2">
                    Connect urban planning professionals, university researchers, and grant foundations.
                  </p>
                  <span className="text-xs font-bold text-blue-800 underline mt-3">Share to LinkedIn &rarr;</span>
                </a>
              </div>

              {/* Ready-Made Social Explainer Post */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <span className="text-xs font-mono font-bold uppercase text-slate-700">
                      Copyable Explainer Post (For Instagram, Bluesky, Substack & Newsletters)
                    </span>
                  </div>
                  <button
                    onClick={() => handleCopy(`🌍 For the Love of Community: Transforming Climate Justice with Open Science\n\nWhy are low-income neighborhoods up to 14°F hotter than wealthy districts during heatwaves? Because urban heat is not accidental—it's an environmental injustice.\n\nYouth researcher Aarti Sri Ravikumar (ai-aarti.com) has developed an open-source framework combining Landsat-9 satellite radiometry with spectral graph theory (Cheeger cuts) to pinpoint exactly where tree canopies and reflective roofs can save the most lives.\n\n✅ 100% Free & Open Access\n✅ Audited Satellite Precision\n✅ Multilingual Community Action Kits in 10 Languages\n\nExplore and download the free tools: https://ai-aarti.com`, 'social-post')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors"
                  >
                    {copiedId === 'social-post' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId === 'social-post' ? 'Copied Post' : 'Copy Post'}</span>
                  </button>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 font-sans leading-relaxed space-y-2">
                  <p className="font-bold text-slate-900">
                    🌍 For the Love of Community: Transforming Climate Justice with Open Science
                  </p>
                  <p>
                    Why are low-income neighborhoods up to 14°F hotter than wealthy districts during heatwaves? Because urban heat is not accidental—it's an environmental injustice.
                  </p>
                  <p>
                    Youth researcher Aarti Sri Ravikumar (ai-aarti.com) has developed an open-source framework combining Landsat-9 satellite radiometry with spectral graph theory (Cheeger cuts) to pinpoint exactly where tree canopies and reflective roofs can save the most lives.
                  </p>
                  <div className="font-mono text-emerald-800 text-xs">
                    ✅ 100% Free & Open Access • ✅ Audited Satellite Precision • ✅ Multilingual Action Kits in 10 Languages
                  </div>
                  <p className="text-slate-600 text-xs">
                    Explore and download the free tools: <strong>https://ai-aarti.com</strong>
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="bg-[#FAF8F5] border-t border-slate-200 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>Dedicated to community health, open science, and universal environmental equity.</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold shadow-xs transition-colors"
          >
            Done Exploring
          </button>
        </div>

      </div>
    </div>
  );
};
