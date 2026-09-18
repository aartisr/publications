import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  FastForward,
  RotateCcw,
  Headphones,
  Sparkles,
  ChevronRight,
  ListMusic,
  CheckCircle2
} from 'lucide-react';
import { Publication } from '../types';

interface MonographAudioPlayerProps {
  publication: Publication;
  onJumpToSection?: (sectionId: string) => void;
}

export const AUDIO_TRANSCRIPT_CHAPTERS = [
  {
    time: 0,
    timeFormatted: '00:00',
    sectionId: 'sec-abstract',
    title: '1. Executive Monograph Briefing',
    text: 'Welcome to the executive audio monograph for "Democratizing Urban Heat Resilience", authored by Aarti Sri Ravikumar. In this audio briefing, we explore how 100m satellite thermal radiometry and spectral graph theory are combined to address extreme urban heat islands.'
  },
  {
    time: 35,
    timeFormatted: '00:35',
    sectionId: 'sec-data-readiness',
    title: '2. Multi-Sensor Satellite Radiometry & 3D Google Earth',
    text: 'To capture street-scale thermal anomalies, our architecture synthesizes 6 dynamic Earth Observation layers: Landsat 8 and 9 thermal radiometry, 10-meter Sentinel-2 canopy vectors, NASA ECOSTRESS pre-dawn thermal inertia, CDC Social Vulnerability overlays, 3D extruded building envelopes, and convective graph airflow corridors.'
  },
  {
    time: 75,
    timeFormatted: '01:15',
    sectionId: 'sec-mitigation-sim',
    title: '3. Physical & Thermodynamic Trade-Offs',
    text: 'Urban heat mitigation is strictly bounded by thermodynamics. Trees require 15 to 20 years to mature, and close their stomata during high vapor pressure deficit heatwaves. Cool roof coatings experience exponential albedo degradation from soot soiling, losing 25% reflectance in 24 months.'
  },
  {
    time: 120,
    timeFormatted: '02:00',
    sectionId: 'sec-robustness-lab',
    title: '4. Spectral Graph Percolation Thresholds',
    text: 'Isolated tree plantings fail to cool neighborhoods until canopy connectivity crosses the critical bond percolation threshold of p_c ≈ 0.382 on urban street networks. Crossing this threshold forms continuous green corridors that channel cooling sea breezes.'
  }
];

export const MonographAudioPlayer: React.FC<MonographAudioPlayerProps> = ({
  publication,
  onJumpToSection
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [isMuted, setIsMuted] = useState(false);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [isSpeechSupported, setIsSpeechSupported] = useState(false);

  const duration = 150; // 2:30 total briefing length in seconds
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setIsSpeechSupported('speechSynthesis' in window);
  }, []);

  // Update playback timer
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000 / playbackSpeed);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, playbackSpeed]);

  // Sync active transcript chapter based on currentTime
  useEffect(() => {
    const chapterIdx = AUDIO_TRANSCRIPT_CHAPTERS.reduce((acc, chap, idx) => {
      if (currentTime >= chap.time) return idx;
      return acc;
    }, 0);
    setActiveChapterIndex(chapterIdx);
  }, [currentTime]);

  const togglePlay = () => {
    if (!isPlaying && 'speechSynthesis' in window && !isMuted) {
      // Optional browser speech utterance trigger
      window.speechSynthesis.cancel();
      const currentChapter = AUDIO_TRANSCRIPT_CHAPTERS[activeChapterIndex];
      const utterance = new SpeechSynthesisUtterance(currentChapter.text);
      utterance.rate = playbackSpeed;
      window.speechSynthesis.speak(utterance);
    } else if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (seconds: number) => {
    setCurrentTime(seconds);
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  };

  const jumpToChapter = (idx: number) => {
    const chap = AUDIO_TRANSCRIPT_CHAPTERS[idx];
    setCurrentTime(chap.time);
    setActiveChapterIndex(idx);
    if (onJumpToSection) onJumpToSection(chap.sectionId);
    if (isPlaying && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(chap.text);
      utterance.rate = playbackSpeed;
      window.speechSynthesis.speak(utterance);
    }
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = Math.floor(secs % 60);
    return `${mins}:${remainingSecs < 10 ? '0' : ''}${remainingSecs}`;
  };

  return (
    <div className="my-6 rounded-2xl border border-amber-200 bg-amber-50/80 p-5 shadow-sm font-sans">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-amber-200/80">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-amber-900 text-amber-100 shadow-sm flex items-center justify-center">
            <Headphones className="w-5 h-5 animate-pulse text-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-serif font-bold text-amber-950">
                Executive Audio Briefing & Monograph Podcast
              </h4>
              <span className="px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 text-[10px] font-mono font-bold uppercase">
                AI Voice Synced
              </span>
            </div>
            <p className="text-xs text-amber-800/90 mt-0.5">
              Listen to a synthesized 2.5-minute research briefing narrated by Aarti Sri Ravikumar
            </p>
          </div>
        </div>

        {/* Speed Controls */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono font-medium text-amber-800">Speed:</span>
          {[1.0, 1.25, 1.5, 2.0].map((spd) => (
            <button
              key={spd}
              onClick={() => setPlaybackSpeed(spd)}
              className={`px-2 py-1 rounded-lg text-xs font-mono font-semibold transition-all ${
                playbackSpeed === spd
                  ? 'bg-amber-900 text-amber-100 shadow-2xs'
                  : 'bg-amber-100/80 text-amber-900 hover:bg-amber-200'
              }`}
            >
              {spd}x
            </button>
          ))}
        </div>
      </div>

      {/* Main Player Bar Controls */}
      <div className="mt-4 flex flex-col sm:flex-row items-center gap-4">
        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className="p-3.5 rounded-2xl bg-amber-900 hover:bg-amber-800 text-amber-100 shadow-md hover:scale-105 transition-all flex items-center justify-center flex-shrink-0"
          aria-label={isPlaying ? 'Pause briefing' : 'Play briefing'}
        >
          {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
        </button>

        {/* Progress Bar & Scrubber */}
        <div className="w-full space-y-1">
          <div className="flex justify-between text-xs font-mono text-amber-900">
            <span>{formatTime(currentTime)}</span>
            <span className="font-semibold text-amber-950">
              {AUDIO_TRANSCRIPT_CHAPTERS[activeChapterIndex].title}
            </span>
            <span>{formatTime(duration)}</span>
          </div>

          <div className="relative w-full h-3 bg-amber-200/80 rounded-full overflow-hidden cursor-pointer">
            <div
              className="h-full bg-gradient-to-r from-amber-700 to-amber-900 transition-all duration-300 rounded-full"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
            <input
              type="range"
              min="0"
              max={duration}
              value={currentTime}
              onChange={(e) => handleSeek(parseFloat(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
        </div>

        {/* Mute Toggle */}
        <button
          onClick={() => {
            setIsMuted(!isMuted);
            if ('speechSynthesis' in window) window.speechSynthesis.cancel();
          }}
          className="p-2.5 rounded-xl bg-amber-100 text-amber-900 hover:bg-amber-200 transition-colors flex-shrink-0"
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-red-600" /> : <Volume2 className="w-4 h-4 text-amber-900" />}
        </button>
      </div>

      {/* Chapter Transcript Nav & Current Segment Text */}
      <div className="mt-4 pt-4 border-t border-amber-200/80 grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Chapter List */}
        <div className="md:col-span-5 space-y-1.5">
          <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-900 mb-2 flex items-center gap-1.5">
            <ListMusic className="w-3.5 h-3.5 text-amber-800" />
            <span>Audio Chapter Index</span>
          </div>

          {AUDIO_TRANSCRIPT_CHAPTERS.map((chap, idx) => {
            const isActive = idx === activeChapterIndex;
            return (
              <button
                key={chap.time}
                onClick={() => jumpToChapter(idx)}
                className={`w-full text-left p-2 rounded-xl text-xs transition-all flex items-center justify-between ${
                  isActive
                    ? 'bg-amber-900 text-amber-100 font-semibold shadow-2xs'
                    : 'bg-amber-100/60 text-amber-900 hover:bg-amber-200/70'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <span className={`font-mono text-[11px] ${isActive ? 'text-amber-300' : 'text-amber-700'}`}>
                    {chap.timeFormatted}
                  </span>
                  <span className="truncate">{chap.title}</span>
                </div>
                <ChevronRight className={`w-3.5 h-3.5 ${isActive ? 'text-amber-300' : 'text-amber-600'}`} />
              </button>
            );
          })}
        </div>

        {/* Synced Live Transcript Box */}
        <div className="md:col-span-7 bg-amber-100/70 p-3.5 rounded-xl border border-amber-200/90 text-xs text-amber-950 leading-relaxed flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1 text-[10px] font-mono font-bold text-amber-800">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-700 animate-pulse" />
                Live Transcript Segment
              </span>
              <span>Chapter {activeChapterIndex + 1} / {AUDIO_TRANSCRIPT_CHAPTERS.length}</span>
            </div>
            <p className="italic text-amber-900/90">
              "{AUDIO_TRANSCRIPT_CHAPTERS[activeChapterIndex].text}"
            </p>
          </div>

          <div className="mt-3 pt-2 border-t border-amber-200 text-[11px] flex items-center justify-between text-amber-800">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
              <span>Synced with Chapter Text</span>
            </span>
            {onJumpToSection && (
              <button
                onClick={() => onJumpToSection(AUDIO_TRANSCRIPT_CHAPTERS[activeChapterIndex].sectionId)}
                className="font-bold underline hover:text-amber-950"
              >
                Jump to Text Section →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
