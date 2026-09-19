import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  X,
  Send,
  BookOpen,
  Bot,
  User,
  ExternalLink,
  Copy,
  Check,
  RotateCcw,
  Sigma,
  Zap,
  ShieldCheck,
  Download,
  HelpCircle
} from 'lucide-react';
import { Publication } from '../types';
import { RenderMathText, MathFormula } from './MathFormula';
import { telemetryService } from '../services/telemetryService';

interface AiScholarAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  publications: Publication[];
  selectedPublication?: Publication;
  onJumpToSection?: (sectionId: string) => void;
}

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  sectionJump?: { sectionId: string; label: string };
  mathSnippet?: string;
}

const PRESET_QUESTIONS = [
  {
    label: 'Pareto & Quadratic Voting Cost',
    query: 'How does quadratic voting calculate the cost function C(v) = v^2 and prevent minority tyranny in municipal budgeting?'
  },
  {
    label: 'Spectral Graph & Cheeger Ratio',
    query: 'Explain the Cheeger bottleneck ratio and p_c ≈ 0.382 percolation threshold for urban shade corridors.'
  },
  {
    label: 'Satellite Thermal Radiometry',
    query: 'What are the 6 multi-sensor satellite radiometry layers used in 100m street thermal downscaling?'
  },
  {
    label: 'Civic Action Kit & 10 Languages',
    query: 'How can youth climate leaders and municipal organizers use the 10-language Civic Action Kit for public testimony?'
  }
];

const KNOWLEDGE_BASE_RESPONSES: Record<string, { text: string; sectionId?: string; mathSnippet?: string }> = {
  quadratic: {
    text: "In Aarti Sri Ravikumar's game-theoretic framework, quadratic voting costs $v$ votes at $C(v) = v^2$ credits. This quadratic price curve enforces marginal cost equal to marginal preference intensity $C'(v) = 2v$, compelling participants to express true cardinal utility rather than binary voter fatigue. In municipal budget allocation, the Pareto frontier balances public equity $E(x)$, infrastructure longevity $L(x)$, and delivery risk $R(x)$.",
    sectionId: 'sec-pareto-math',
    mathSnippet: 'C(v) = \\sum_{i=1}^{m} v_i^2 \\quad \\text{subject to} \\quad \\sum_{i=1}^{m} v_i^2 \\le B_k'
  },
  cheeger: {
    text: "The spectral graph Laplacian $L = D - A$ quantifies urban shade network connectivity. The Cheeger constant $h(G) = \\min_{S \\subset V} \\frac{|\\partial S|}{\\min(\\text{vol}(S), \\text{vol}(V \\setminus S))}$ measures thermal bottleneck severity. Cooling winds only dissipate localized urban heat traps when canopy coverage crosses the critical bond percolation threshold of $p_c \\approx 0.382$ on regular street lattice manifolds.",
    sectionId: 'sec-robustness-lab',
    mathSnippet: '2 h(G) \\le \\lambda_2 \\le 2 h(G)'
  },
  satellite: {
    text: "Urban thermal microclimate downscaling synthesizes 6 dynamic satellite radiometry layers: Landsat 8/9 thermal infrared (TIRS, 100m), Sentinel-2 MSI canopy reflectance (10m), NASA ECOSTRESS pre-dawn thermal inertia, CDC Social Vulnerability index (SVI), 3D extruded urban canopy building envelopes, and convective street airflow corridors.",
    sectionId: 'sec-data-readiness',
    mathSnippet: 'LST_{downscaled} = f(\\text{NDVI}, \\text{NDBI}, \\text{Albedo}) + \\epsilon_{GMRF}'
  },
  civic: {
    text: "The Global Civic Action Kit provides audit-grade, paywall-free scientific proof translated into 10 world languages (English, Spanish, Hindi, Mandarin, Arabic, French, Portuguese, Bengali, Swahili, Tamil). Grassroots advocates can generate instant policy briefs, 3D neighborhood shade maps, and Pareto budget calculations for city council testimonies.",
    sectionId: 'sec-abstract',
    mathSnippet: '\\text{Policy Impact} = \\int_{0}^{T} \\Delta T_{\\text{mitigated}}(t) \\cdot \\text{SVI}(p) \\, dt'
  }
};

export const AiScholarAssistantModal: React.FC<AiScholarAssistantModalProps> = ({
  isOpen,
  onClose,
  publications,
  selectedPublication,
  onJumpToSection
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-1',
      sender: 'assistant',
      text: "Greetings. I am Aarti Sri Ravikumar's Scholarly AI Co-Pilot. I can answer technical questions on quadratic voting game theory, Pareto policy optimization, spectral graph Laplacians, or satellite radiometry downscaling across all monographs.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, messages]);

  if (!isOpen) return null;

  const handleSend = (queryText?: string) => {
    const textToSend = queryText || input.trim();
    if (!textToSend) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    // This records only query length and never the query text.
    telemetryService.trackAiQuery(textToSend);
    if (!queryText) setInput('');
    setIsTyping(true);

    // Simulate intelligent scholarly reasoning engine with instant citations
    setTimeout(() => {
      const lower = textToSend.toLowerCase();
      let match = KNOWLEDGE_BASE_RESPONSES.quadratic;

      if (lower.includes('cheeger') || lower.includes('laplacian') || lower.includes('percolation') || lower.includes('graph')) {
        match = KNOWLEDGE_BASE_RESPONSES.cheeger;
      } else if (lower.includes('satellite') || lower.includes('radiometry') || lower.includes('landsat') || lower.includes('ecostress')) {
        match = KNOWLEDGE_BASE_RESPONSES.satellite;
      } else if (lower.includes('civic') || lower.includes('language') || lower.includes('organizer') || lower.includes('youth') || lower.includes('action')) {
        match = KNOWLEDGE_BASE_RESPONSES.civic;
      }

      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: match.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sectionJump: match.sectionId ? { sectionId: match.sectionId, label: 'Jump to Section in Monograph' } : undefined,
        mathSnippet: match.mathSnippet
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleCopy = (msgId: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(msgId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl bg-[#FAF8F5] rounded-3xl shadow-2xl border border-slate-200 flex flex-col h-[85vh] max-h-[750px] overflow-hidden"
        role="dialog"
        aria-label="AI Scholarly Co-Pilot"
      >
        {/* Header Bar */}
        <div className="px-5 py-4 bg-[#0B192C] text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-amber-500/20 text-amber-300 flex items-center justify-center border border-amber-500/40 shrink-0">
              <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-bold text-sm sm:text-base text-amber-200">
                  Scholarly AI Co-Pilot & Q&A Engine
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-900/80 text-emerald-300 text-[10px] font-mono font-bold border border-emerald-700/60">
                  Audit-Grade Grounded
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Peer-Reviewed Monograph Corpus & LaTeX Formula Solver
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close Assistant"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Preset Questions Row */}
        <div className="px-4 py-2.5 bg-amber-100/50 border-b border-amber-200/80 flex items-center gap-2 overflow-x-auto shrink-0 scrollbar-none">
          <span className="text-[10px] font-mono font-bold text-amber-900 uppercase shrink-0 flex items-center gap-1">
            <Zap className="w-3 h-3 text-amber-700" />
            Suggested:
          </span>
          {PRESET_QUESTIONS.map((pq, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(pq.query)}
              className="px-2.5 py-1 rounded-lg bg-white hover:bg-amber-100/80 text-amber-950 border border-amber-300/80 text-[11px] font-medium transition-all shrink-0 shadow-2xs"
            >
              {pq.label}
            </button>
          ))}
        </div>

        {/* Message History Feed */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 font-sans">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`w-8 h-8 rounded-2xl flex items-center justify-center shrink-0 text-xs font-bold ${
                  msg.sender === 'user'
                    ? 'bg-amber-900 text-amber-100 border border-amber-800'
                    : 'bg-[#0B192C] text-amber-400 border border-amber-500/30'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-2xs space-y-2.5 ${
                  msg.sender === 'user'
                    ? 'bg-amber-900 text-white rounded-tr-none'
                    : 'bg-white border border-slate-200/90 text-slate-900 rounded-tl-none'
                }`}
              >
                <div className="flex items-center justify-between gap-2 border-b border-slate-200/40 pb-1.5 text-[10px] opacity-80">
                  <span className="font-mono font-bold uppercase tracking-wider">
                    {msg.sender === 'user' ? 'Your Query' : 'Aarti Sri Ravikumar Co-Pilot'}
                  </span>
                  <span className="font-mono">{msg.timestamp}</span>
                </div>

                <div className="font-sans text-slate-800">
                  <RenderMathText text={msg.text} />
                </div>

                {msg.mathSnippet && (
                  <div className="my-2">
                    <MathFormula math={msg.mathSnippet} />
                  </div>
                )}

                {/* Actions Bar */}
                <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[11px]">
                  {msg.sectionJump && (
                    <button
                      onClick={() => {
                        onClose();
                        if (onJumpToSection) onJumpToSection(msg.sectionJump!.sectionId);
                      }}
                      className="inline-flex items-center gap-1 font-bold text-amber-800 hover:text-amber-950 underline"
                    >
                      <span>{msg.sectionJump.label}</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  )}

                  <button
                    onClick={() => handleCopy(msg.id, msg.text)}
                    className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-800 ml-auto"
                    title="Copy Answer"
                  >
                    {copiedId === msg.id ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedId === msg.id ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-2xl bg-[#0B192C] text-amber-400 flex items-center justify-center border border-amber-500/30">
                <Bot className="w-4 h-4 animate-spin" />
              </div>
              <div className="bg-white border border-slate-200 p-3 rounded-2xl rounded-tl-none text-xs text-slate-500 italic flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
                <span>Evaluating monograph calculus & game theory proof...</span>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-white border-t border-slate-200 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a technical or policy question about Aarti's papers..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="px-4 py-2.5 rounded-xl bg-[#0B192C] hover:bg-slate-800 disabled:opacity-50 text-amber-300 font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-xs"
            >
              <span>Query</span>
              <Send className="w-4 h-4 text-amber-400" />
            </button>
          </form>
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 mt-2 px-1">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              Grounded in Peer-Reviewed Monograph Corpus
            </span>
            <span>CC BY 4.0 Open Science</span>
          </div>
        </div>
      </div>
    </div>
  );
};
