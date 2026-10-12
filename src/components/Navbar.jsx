import React from 'react';
import { Shield, Star, Zap, Volume2, VolumeX, BookOpen, Award, User, RotateCcw, RotateCw } from 'lucide-react';
import { getRank } from '../utils/storage';
import { sound } from '../utils/sound';

export default function Navbar({
  profile,
  onOpenProfile,
  onOpenGuide,
  onOpenCertificate,
  onOpenRodaSifir,
  onResetProgress,
  onHomeClick
}) {
  const [muted, setMuted] = React.useState(sound.isMuted());
  const rank = getRank(profile.xp);

  const toggleSound = () => {
    const isMuted = sound.toggleMute();
    setMuted(isMuted);
    if (!isMuted) sound.playClick();
  };

  const totalStars = Object.values(profile.caseScores || {}).reduce((acc, curr) => acc + (curr.stars || 0), 0);

  return (
    <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-md border-b border-cyan-900/40 px-4 lg:px-8 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        
        {/* Brand / Logo */}
        <button 
          onClick={onHomeClick}
          className="flex items-center gap-3 group text-left focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform border border-cyan-300/30">
            <Shield className="w-5 h-5 text-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-tech tracking-wider text-xs px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 font-semibold">
                ARMS CYBER-OPS
              </span>
              <span className="text-xs text-slate-400 hidden sm:inline">KSSR SEMAKAN</span>
            </div>
            <h1 className="text-base sm:text-lg font-bold font-cyber text-slate-100 tracking-wide group-hover:text-cyan-300 transition-colors">
              DETEKTIF SIBER <span className="text-cyan-400">MATEMATIK TAHUN 6</span>
            </h1>
          </div>
        </button>

        {/* Stats & Actions */}
        <div className="flex items-center gap-2 sm:gap-4 ml-auto">
          
          {/* XP & Stars Pills */}
          <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-800 rounded-full px-3 py-1.5 text-xs sm:text-sm">
            <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
              <Star className="w-4 h-4 fill-amber-400" />
              <span>{totalStars} / 24</span>
            </div>
            <div className="w-px h-4 bg-slate-700 mx-1"></div>
            <div className="flex items-center gap-1.5 text-cyan-400 font-semibold">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span>{profile.xp} XP</span>
            </div>
          </div>

          {/* Detective Profile Button */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenProfile();
            }}
            className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 border border-cyan-800/40 hover:border-cyan-500/60 rounded-xl px-2.5 sm:px-3 py-1.5 transition-all text-xs text-left"
            title="Profil Ejen"
          >
            <span className="text-lg">{rank.icon}</span>
            <div className="hidden md:block">
              <p className="font-semibold text-slate-200 leading-tight">{profile.agentName}</p>
              <p className={`text-[10px] ${rank.color}`}>{rank.title}</p>
            </div>
          </button>

          {/* Quick Buttons */}
          <div className="flex items-center gap-1.5">
            {/* Roda Sifir Button */}
            <button
              onClick={() => {
                sound.playClick();
                onOpenRodaSifir();
              }}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-600/90 to-blue-600/90 hover:from-cyan-500 hover:to-blue-500 text-white border border-cyan-400/50 text-xs font-cyber font-bold shadow-md shadow-cyan-950 transition-all hover:scale-105"
              title="Permainan Roda Sifir"
            >
              <RotateCw className="w-3.5 h-3.5 animate-spin" />
              <span className="hidden sm:inline">RODA SIFIR</span>
            </button>

            {/* Guide Book */}
            <button
              onClick={() => {
                sound.playClick();
                onOpenGuide();
              }}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-cyan-400 border border-slate-800 transition-colors"
              title="Buku Nota Formula & Panduan"
            >
              <BookOpen className="w-4 h-4" />
            </button>

            {/* Certificate */}
            <button
              onClick={() => {
                sound.playClick();
                onOpenCertificate();
              }}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-amber-400 border border-slate-800 transition-colors"
              title="Sijil Detektif"
            >
              <Award className="w-4 h-4" />
            </button>

            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-cyan-400 border border-slate-800 transition-colors"
              title={muted ? 'Buka Bunyi' : 'Senyapkan Bunyi'}
            >
              {muted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
            </button>

            {/* Reset Progress */}
            <button
              onClick={() => {
                sound.playClick();
                onResetProgress();
              }}
              className="p-2 rounded-lg bg-slate-900/60 hover:bg-rose-950/40 text-slate-500 hover:text-rose-400 border border-transparent hover:border-rose-900/50 transition-colors"
              title="Mula Semula Semua Kes"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </header>
  );
}
