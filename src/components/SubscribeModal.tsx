import React, { useState } from 'react';
import { X, Mail, CheckCircle, Bell, Sparkles, Rss, Calendar, ShieldCheck } from 'lucide-react';
import { SubscriberPreferences } from '../types';

interface SubscribeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SubscribeModal: React.FC<SubscribeModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [institution, setInstitution] = useState('');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([
    'Urban Heat Island & Microclimates',
    'Open Code Repositories & Data Drops'
  ]);
  const [frequency, setFrequency] = useState<'immediate' | 'monthly' | 'quarterly'>('monthly');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const topicsList = [
    'Urban Heat Island & Microclimates',
    'Satellite Remote Sensing & Sensor Swarms',
    'Environmental Equity & Climate Policy Memos',
    'Federal Grants & Funding Dispatches',
    'Open Code Repositories & Data Drops'
  ];

  const toggleTopic = (topic: string) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter(t => t !== topic));
    } else {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    const subscriberData: SubscriberPreferences = {
      email,
      name,
      institution,
      topics: selectedTopics,
      frequency,
      format: 'summary'
    };

    // Store in localStorage
    try {
      const existing = JSON.parse(localStorage.getItem('aarti_academic_subscribers') || '[]');
      existing.push({ ...subscriberData, timestamp: new Date().toISOString() });
      localStorage.setItem('aarti_academic_subscribers', JSON.stringify(existing));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }

    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setEmail('');
    setName('');
    setInstitution('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white border border-[#E2DCD5] rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[#0B192C] text-white p-6 border-b border-slate-700 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 uppercase tracking-wider">
              <Bell className="w-3.5 h-3.5" /> Peer & Follower Research Dispatch
            </div>
            <h3 className="text-xl font-serif font-bold text-white mt-1">
              Subscribe to Aarti Sri Ravikumar's Publications
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              Receive notifications on new preprints, peer-reviewed articles, grant disclosures, and open-source data drops.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-serif font-bold text-slate-900">
              Subscription Confirmed
            </h4>
            <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
              Thank you, <strong>{name || email}</strong>. You will receive research notifications for {selectedTopics.length} selected topics at a <strong>{frequency}</strong> cadence.
            </p>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-left space-y-2 text-xs">
              <div className="flex items-center gap-2 font-semibold text-slate-800">
                <Rss className="w-4 h-4 text-amber-700" /> RSS Feed URL:
              </div>
              <div className="p-2 bg-white rounded border font-mono text-[11px] text-slate-600 break-all select-all">
                https://urban-heat.ai-aarti.com/rss/publications.xml
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={handleReset}
                className="w-full py-2.5 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition-colors"
              >
                Return to Portfolio
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-800 mb-1">
                Institutional or Academic Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                placeholder="colleague@university.edu or researcher@lab.org"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-amber-800 focus:outline-hidden"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Dr. / Prof. / Scholar"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-amber-800 focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  Affiliation / University
                </label>
                <input
                  type="text"
                  placeholder="e.g. MIT, Harvard, NOAA"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-amber-800 focus:outline-hidden"
                />
              </div>
            </div>

            {/* Research Track Interests */}
            <div>
              <label className="block font-semibold text-slate-800 mb-1.5">
                Research Tracks & Topic Alerts:
              </label>
              <div className="space-y-1.5">
                {topicsList.map(topic => {
                  const checked = selectedTopics.includes(topic);
                  return (
                    <label
                      key={topic}
                      className={`flex items-center gap-2 p-2 rounded-lg border text-xs cursor-pointer transition-colors ${
                        checked ? 'bg-amber-50 border-amber-300 text-amber-950 font-medium' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleTopic(topic)}
                        className="rounded accent-amber-800"
                      />
                      <span>{topic}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Notification Cadence */}
            <div>
              <label className="block font-semibold text-slate-800 mb-1">
                Dispatch Frequency:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'immediate', label: 'Instant Alerts', desc: 'Preprints as posted' },
                  { id: 'monthly', label: 'Monthly Digest', desc: 'Curated monthly round-up' },
                  { id: 'quarterly', label: 'Quarterly Memo', desc: 'Executive grant overview' }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setFrequency(item.id as any)}
                    className={`p-2 rounded-lg border text-left transition-all ${
                      frequency === item.id
                        ? 'border-amber-800 bg-amber-50 text-amber-950 ring-1 ring-amber-800'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="font-bold text-[11px]">{item.label}</div>
                    <div className="text-[10px] text-slate-500">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-2.5 bg-[#0B192C] text-white rounded-xl text-xs font-semibold hover:bg-slate-800 shadow-sm transition-colors flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4" /> Join Academic Dispatch
              </button>
              <p className="text-[10px] text-slate-400 text-center mt-2 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-600" /> Strict privacy policy. Zero advertising or commercial dissemination.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
