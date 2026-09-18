import React, { useMemo, useState } from 'react';
import katex from 'katex';
import { Copy, Check, Code } from 'lucide-react';

interface MathFormulaProps {
  math: string;
  label?: string;
  explanation?: string;
  equationNumber?: number | string;
  className?: string;
}

export const MathFormula: React.FC<MathFormulaProps> = ({
  math,
  label,
  explanation,
  equationNumber,
  className = ''
}) => {
  const [copied, setCopied] = useState(false);
  const [showLatex, setShowLatex] = useState(false);

  const html = useMemo(() => {
    try {
      return katex.renderToString(math, {
        displayMode: true,
        throwOnError: false,
        strict: false
      });
    } catch (e) {
      console.error('KaTeX rendering error:', e);
      return `<code class="font-mono text-amber-800">${math}</code>`;
    }
  }, [math]);

  const handleCopy = () => {
    navigator.clipboard.writeText(math);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`my-6 rounded-2xl border border-[#E2DCD5] bg-gradient-to-b from-[#FFFDF9] to-white p-5 sm:p-6 shadow-xs ${className}`}>
      {/* Formula Header */}
      {label && (
        <div className="flex items-center justify-between gap-3 pb-3 border-b border-[#F0EBE1] text-xs font-mono">
          <div className="font-bold text-amber-900 uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-600"></span>
            <span>{label}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowLatex(!showLatex)}
              className="text-[11px] text-slate-500 hover:text-slate-800 px-2 py-0.5 rounded border border-slate-200 hover:bg-slate-50 transition-colors flex items-center gap-1"
              title="Toggle LaTeX source"
            >
              <Code className="w-3 h-3" />
              <span>{showLatex ? 'Hide TeX' : 'LaTeX'}</span>
            </button>

            <button
              onClick={handleCopy}
              className="text-[11px] text-slate-500 hover:text-slate-800 px-2 py-0.5 rounded border border-slate-200 hover:bg-slate-50 transition-colors flex items-center gap-1"
              title="Copy LaTeX formula to clipboard"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Typeset Equation Display */}
      <div className="relative py-4 sm:py-6 overflow-x-auto flex items-center justify-center">
        <div
          className="text-slate-900 text-base sm:text-lg lg:text-xl font-serif text-center select-all px-2"
          dangerouslySetInnerHTML={{ __html: html }}
        />
        {equationNumber && (
          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 font-serif text-sm italic select-none">
            ({equationNumber})
          </span>
        )}
      </div>

      {/* Raw LaTeX Drawer if user clicks toggle */}
      {showLatex && (
        <div className="mt-2 mb-3 p-2.5 bg-slate-900 text-amber-300 font-mono text-xs rounded-lg overflow-x-auto select-all">
          <code>{math}</code>
        </div>
      )}

      {/* Mathematical Variable Explanation */}
      {explanation && (
        <div className="mt-3 pt-3 border-t border-[#F0EBE1] text-xs text-slate-600 leading-relaxed font-sans">
          <RenderMathText text={explanation} />
        </div>
      )}
    </div>
  );
};

/**
 * InlineMath renders small mathematical snippets inline, e.g. $\Delta T_{LST}$ or $p_c \approx 0.382$
 */
export const InlineMath: React.FC<{ math: string; className?: string }> = ({ math, className = '' }) => {
  const html = useMemo(() => {
    try {
      return katex.renderToString(math, {
        displayMode: false,
        throwOnError: false,
        strict: false
      });
    } catch (e) {
      return math;
    }
  }, [math]);

  return (
    <span
      className={`inline-block font-serif text-slate-900 align-baseline ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

/**
 * Helper to parse a paragraph and replace $math$ tokens with KaTeX inline renderings
 */
export const RenderMathText: React.FC<{ text: string }> = ({ text }) => {
  const parts = useMemo(() => {
    // Regex splits by $...$
    const tokens = text.split(/(\$[^$]+\$)/g);
    return tokens.map((token, idx) => {
      if (token.startsWith('$') && token.endsWith('$') && token.length > 2) {
        const mathContent = token.slice(1, -1);
        try {
          const html = katex.renderToString(mathContent, {
            displayMode: false,
            throwOnError: false
          });
          return (
            <span
              key={idx}
              className="inline-block px-0.5 text-slate-900 font-serif align-baseline"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          );
        } catch (e) {
          return <span key={idx}>{token}</span>;
        }
      }
      return <span key={idx}>{token}</span>;
    });
  }, [text]);

  return <p className="leading-relaxed">{parts}</p>;
};
