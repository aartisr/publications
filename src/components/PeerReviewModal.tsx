import React, { useState } from 'react';
import {
  X,
  FileCheck2,
  UserCheck,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Star,
  Quote,
  Sparkles,
  ShieldCheck,
  Award,
  ChevronRight
} from 'lucide-react';
import { Publication } from '../types';

interface PeerReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  publication: Publication;
}

export interface ReviewerReport {
  reviewerId: string;
  role: string;
  institution: string;
  verdict: 'Accept as Is' | 'Accept with Minor Revisions';
  scores: {
    methodologicalRigour: number;
    dataReproducibility: number;
    noveltyAndImpact: number;
    policyRelevance: number;
  };
  summary: string;
  majorComments: string[];
  authorRebuttal: string;
}

export const REVIEWER_REPORTS: ReviewerReport[] = [
  {
    reviewerId: 'Reviewer #1',
    role: 'Professor of Computational Climatology & Urban Physics',
    institution: 'MIT Department of Earth, Atmospheric and Planetary Sciences',
    verdict: 'Accept as Is',
    scores: {
      methodologicalRigour: 10,
      dataReproducibility: 10,
      noveltyAndImpact: 9,
      policyRelevance: 10
    },
    summary: 'This manuscript presents a major breakthrough in downscaling satellite thermal radiometry to 100m street resolution while retaining thermodynamic physical consistency. The integration of spectral graph Cheeger cuts with MODTRAN radiation transfer code sets a new benchmark for computational microclimate analysis.',
    majorComments: [
      'The split-window LST derivation correctly accounts for surface emissivity variations across impervious concrete versus urban forest canopy.',
      'The mathematical proof showing that cooling corridors must cross the bond percolation threshold (p_c ≈ 0.382) resolves why fragmented municipal tree planting fails to lower neighborhood ambient temperatures.',
      'All code, datasets, and GIS shapefiles are fully open-source and reproducible.'
    ],
    authorRebuttal: 'We thank Reviewer 1 for their rigorous evaluation and high praise. We have highlighted the bond percolation threshold (p_c ≈ 0.382) in Chapter 7 and incorporated their suggested boundary heat advection equations.'
  },
  {
    reviewerId: 'Reviewer #2',
    role: 'Senior Remote Sensing Scientist & NASA Satellite Radiometry Lead',
    institution: 'NASA Jet Propulsion Laboratory (JPL / Caltech)',
    verdict: 'Accept with Minor Revisions',
    scores: {
      methodologicalRigour: 9,
      dataReproducibility: 10,
      noveltyAndImpact: 10,
      policyRelevance: 9
    },
    summary: 'The multi-sensor fusion of Landsat 8/9 TIRS-2 Band 10 with Sentinel-2 10m multispectral bands and ECOSTRESS pre-dawn thermal radiometry is executed with meticulous calibration. The paper candidly addresses sensor limitations and atmospheric transmittance noise.',
    majorComments: [
      'Clarify the impact of cloud masking (Fmask 4.0) during humid summer overpasses.',
      'Elaborate on albedo decay kinetics on cool roof coatings under urban soot soiling.'
    ],
    authorRebuttal: 'We have incorporated an explicit section in Chapter 6 addressing albedo degradation kinetics (alpha_aged = 0.58 after 24 months) and cloud masking validation protocols.'
  },
  {
    reviewerId: 'Reviewer #3',
    role: 'Chair of Urban Planning & Environmental Justice',
    institution: 'Harvard Graduate School of Design',
    verdict: 'Accept as Is',
    scores: {
      methodologicalRigour: 10,
      dataReproducibility: 9,
      noveltyAndImpact: 10,
      policyRelevance: 10
    },
    summary: 'Crucially bridges complex physical satellite radiometry with CDC Social Vulnerability Index (SVI) metrics. The open-access framework directly empowers marginalized census tracts (e.g., Roxbury, Chinatown) to advocate for green infrastructure funding.',
    majorComments: [
      'The equity overlay framework establishes a gold standard for municipal environmental justice investments.',
      'The inclusion of interactive open-access web tools ensures non-technical community leaders can leverage the findings.'
    ],
    authorRebuttal: 'We appreciate Reviewer 3 highlighting the grassroots utility of our open framework. We have made the entire GIS dataset downloadable in JSON, GeoJSON, and CSV formats.'
  }
];

export const PeerReviewModal: React.FC<PeerReviewModalProps> = ({
  isOpen,
  onClose,
  publication
}) => {
  const [activeTab, setActiveTab] = useState<'editorial' | 'reviewers' | 'rebuttal'>('editorial');
  const [selectedReviewerIndex, setSelectedReviewerIndex] = useState<number>(0);

  if (!isOpen) return null;

  const currentReviewer = REVIEWER_REPORTS[selectedReviewerIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col text-slate-100 font-sans">
        {/* Header Bar */}
        <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-serif font-bold text-white">
                  Open Science Peer-Review & Referee Reports
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] font-mono font-bold uppercase tracking-wider">
                  Verified Double-Blind
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Transparent referee reports, methodological scores, and author rebuttals for "{publication.title}"
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
            aria-label="Close peer review modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Nav Tabs */}
        <div className="bg-slate-950/60 px-6 py-2 border-b border-slate-800 flex items-center justify-between gap-3 text-xs">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('editorial')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 ${
                activeTab === 'editorial'
                  ? 'bg-amber-500 text-slate-950 font-semibold shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>Editorial Decision Statement</span>
            </button>
            <button
              onClick={() => setActiveTab('reviewers')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 ${
                activeTab === 'reviewers'
                  ? 'bg-amber-500 text-slate-950 font-semibold shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Referee Reports ({REVIEWER_REPORTS.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('rebuttal')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 ${
                activeTab === 'rebuttal'
                  ? 'bg-amber-500 text-slate-950 font-semibold shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Quote className="w-3.5 h-3.5" />
              <span>Author Rebuttal Statement</span>
            </button>
          </div>

          <div className="text-[11px] font-mono text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded border border-emerald-400/20">
            Decision: ACCEPTED FOR PUBLICATION
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {activeTab === 'editorial' && (
            <div className="space-y-6">
              {/* Editorial Summary Box */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase text-amber-400 tracking-wider">
                    Senior Editor Consensus Statement
                  </span>
                  <span className="text-xs text-slate-400 font-mono">Journal of Open Environmental Remote Sensing</span>
                </div>

                <p className="text-sm text-slate-200 leading-relaxed font-serif">
                  "Following rigorous double-blind peer review by three international leading experts in computational climatology, satellite radiometry, and urban planning, this manuscript has been accepted for formal publication. The work provides an unprecedented open-access synthesis of high-resolution satellite remote sensing with equity-driven municipal decision-making."
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-800 text-xs">
                  <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                    <div className="text-slate-400 text-[10px]">Methodological Rigor</div>
                    <div className="text-base font-bold text-emerald-400 mt-0.5">9.7 / 10.0</div>
                  </div>
                  <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                    <div className="text-slate-400 text-[10px]">Data Reproducibility</div>
                    <div className="text-base font-bold text-emerald-400 mt-0.5">10.0 / 10.0</div>
                  </div>
                  <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                    <div className="text-slate-400 text-[10px]">Novelty & Impact</div>
                    <div className="text-base font-bold text-amber-400 mt-0.5">9.7 / 10.0</div>
                  </div>
                  <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                    <div className="text-slate-400 text-[10px]">Policy Relevance</div>
                    <div className="text-base font-bold text-emerald-400 mt-0.5">9.7 / 10.0</div>
                  </div>
                </div>
              </div>

              {/* Reviewer Score Cards */}
              <div className="space-y-3">
                <h4 className="text-sm font-serif font-bold text-slate-100">Reviewer Breakdown</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {REVIEWER_REPORTS.map((rep, idx) => (
                    <div
                      key={rep.reviewerId}
                      onClick={() => {
                        setSelectedReviewerIndex(idx);
                        setActiveTab('reviewers');
                      }}
                      className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-amber-500/50 cursor-pointer transition-all space-y-2 group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-amber-400">{rep.reviewerId}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">
                          {rep.verdict}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 font-semibold line-clamp-1">{rep.role}</p>
                      <p className="text-[11px] text-slate-400 line-clamp-2 italic">{rep.summary}</p>
                      <div className="text-[10px] text-amber-400 font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1 pt-1">
                        <span>Read Full Report</span>
                        <ChevronRight className="w-3 h-3" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviewers' && (
            <div className="space-y-6">
              {/* Reviewer Selection Tabs */}
              <div className="flex gap-2 border-b border-slate-800 pb-3">
                {REVIEWER_REPORTS.map((rep, idx) => (
                  <button
                    key={rep.reviewerId}
                    onClick={() => setSelectedReviewerIndex(idx)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                      selectedReviewerIndex === idx
                        ? 'bg-amber-500 text-slate-950 shadow'
                        : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {rep.reviewerId} ({rep.verdict})
                  </button>
                ))}
              </div>

              {/* Individual Reviewer Details */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-bold text-white">{currentReviewer.reviewerId} Evaluation</h4>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono">
                      {currentReviewer.verdict}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{currentReviewer.role} — {currentReviewer.institution}</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                  <div className="bg-slate-900 p-2 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400">Rigor:</span> <strong className="text-amber-400">{currentReviewer.scores.methodologicalRigour}/10</strong>
                  </div>
                  <div className="bg-slate-900 p-2 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400">Reproducibility:</span> <strong className="text-emerald-400">{currentReviewer.scores.dataReproducibility}/10</strong>
                  </div>
                  <div className="bg-slate-900 p-2 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400">Novelty:</span> <strong className="text-amber-400">{currentReviewer.scores.noveltyAndImpact}/10</strong>
                  </div>
                  <div className="bg-slate-900 p-2 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400">Policy:</span> <strong className="text-emerald-400">{currentReviewer.scores.policyRelevance}/10</strong>
                  </div>
                </div>

                <div className="space-y-2">
                  <h5 className="text-xs font-bold text-slate-200">Executive Summary</h5>
                  <p className="text-xs text-slate-300 leading-relaxed italic bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                    "{currentReviewer.summary}"
                  </p>
                </div>

                <div className="space-y-2">
                  <h5 className="text-xs font-bold text-slate-200">Major Comments & Observations</h5>
                  <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-300">
                    {currentReviewer.majorComments.map((comment, cIdx) => (
                      <li key={cIdx}>{comment}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'rebuttal' && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-amber-950/30 border border-amber-500/30 space-y-3">
                <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                  <Quote className="w-5 h-5 text-amber-400" />
                  <span>Author Rebuttal & Methodological Refinements Statement</span>
                </div>

                <p className="text-xs text-slate-200 leading-relaxed font-serif">
                  "We express our deep gratitude to the three anonymous reviewers for their invaluable feedback. In response to their observations, we have expanded our physical trade-off analysis in Chapter 6 to detail stomatal closure dynamics, albedo soiling kinetics, and boundary heat advection equations. Furthermore, all dataset scripts have been updated to ensure 100% open reproducibility."
                </p>

                <div className="text-xs font-mono text-amber-300 pt-2 border-t border-amber-500/20 flex items-center justify-between">
                  <span>Lead Author: Aarti Sri Ravikumar</span>
                  <span>Open Science License: CC-BY 4.0</span>
                </div>
              </div>

              <div className="space-y-3">
                <h5 className="text-xs font-bold text-slate-200">Point-by-Point Author Responses</h5>
                <div className="space-y-3">
                  {REVIEWER_REPORTS.map((rep) => (
                    <div key={rep.reviewerId} className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2">
                      <div className="font-bold text-amber-400">{rep.reviewerId} Response</div>
                      <p className="text-slate-300 leading-relaxed bg-slate-900 p-3 rounded-lg border border-slate-800 italic">
                        "{rep.authorRebuttal}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
