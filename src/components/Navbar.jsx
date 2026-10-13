import React from 'react';
import { 
  Shield, Star, Zap, Volume2, VolumeX, BookOpen, 
  Award, User, RotateCcw, RotateCw, Trophy, Smartphone, Settings, Crosshair 
} from 'lucide-react';
import { getRank } from '../utils/storage';
import { sound } from '../utils/sound';

export default function Navbar({
  profile,
  onOpenProfile,
  onOpenGuide,
  onOpenCertificate,
  onOpenRodaSifir,
  onOpenMathShooter,
  onOpenRecords,
  onOpenInstall,
  onOpenAdminSettings,
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
    <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-md border-b border-cyan-900/40 px-3 sm:px-6 py-1.5 sm:py-2 transition-all">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        
        {/* Brand / Logo */}
        <button 
          onClick={onHomeClick}
          className="flex items-center gap-2.5 sm:gap-3 group text-left focus:outline-none"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform border border-cyan-300/30 shrink-0">
            <Shield className="w-5 h-5 text-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-tech tracking-wider text-[10px] sm:text-xs px-1.5 py-0.2 rounded bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 font-semibold">
                ARMS CYBER-OPS
              </span>
              <span className="text-[10px] sm:text-xs text-slate-400 hidden xs:inline">KSSR SEMAKAN</span>
            </div>
            <h1 className="text-sm sm:text-lg font-bold font-cyber text-slate-100 tracking-wide group-hover:text-cyan-300 transition-colors">
              DETEKTIF SIBER <span className="text-cyan-400">MATEMATIK TAHUN 6</span>
            </h1>
          </div>
        </button>

        {/* Stats & Actions */}
        <div className="flex items-center gap-1.5 sm:gap-3 ml-auto">
          
          {/* XP & Stars Pills */}
          <div className="flex items-center gap-1.5 sm:gap-2 bg-slate-900/90 border border-slate-800 rounded-full px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm">
            <div className="flex items-center gap-1 text-amber-400 font-semibold text-xs sm:text-sm">
              <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-400" />
              <span>{totalStars} / 24</span>
            </div>
            <div className="w-px h-3.5 bg-slate-700 mx-0.5"></div>
            <div className="flex items-center gap-1 text-cyan-400 font-semibold text-xs sm:text-sm">
              <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400" />
              <span>{profile.xp} XP</span>
            </div>
          </div>

          {/* Detective Profile Button (With Name & Class) */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenProfile();
            }}
            className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 border border-cyan-800/40 hover:border-cyan-500/60 rounded-xl px-2.5 sm:px-3 py-1 sm:py-1.5 transition-all text-xs text-left"
            title="Tukar Nama & Kelas Murid"
          >
            <span className="text-base sm:text-lg">{rank.icon}</span>
            <div className="hidden md:block max-w-[130px] truncate">
              <p className="font-semibold text-slate-200 leading-tight truncate">{profile.agentName}</p>
              <p className="text-[10px] text-cyan-300 font-tech truncate">
                {profile.studentClass || '6 Inovatif'} • <span className={rank.color}>{rank.title}</span>
              </p>
            </div>
          </button>

          {/* Quick Buttons */}
          <div className="flex items-center gap-1">
            {/* Roda Sifir Button */}
            <button
              onClick={() => {
                sound.playClick();
                onOpenRodaSifir();
              }}
              className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-600/90 to-blue-600/90 hover:from-cyan-500 hover:to-blue-500 text-white border border-cyan-400/50 text-xs font-cyber font-bold shadow-md shadow-cyan-950 transition-all hover:scale-105"
              title="Permainan Roda Sifir"
            >
              <RotateCw className="w-3.5 h-3.5 animate-spin" />
              <span className="hidden sm:inline">RODA SIFIR</span>
            </button>

            {/* Math Shooter Button */}
            <button
              onClick={() => {
                sound.playClick();
                onOpenMathShooter();
              }}
              className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white border border-amber-400/50 text-xs font-cyber font-bold shadow-md shadow-orange-950 transition-all hover:scale-105"
              title="Permainan Math Shooter (Meriam Matematik)"
            >
              <Crosshair className="w-3.5 h-3.5 text-amber-200" />
              <span className="hidden sm:inline">MATH SHOOTER</span>
            </button>

            {/* Score Records Button */}
            <button
              onClick={() => {
                sound.playClick();
                onOpenRecords();
              }}
              className="flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-xl bg-amber-950/70 hover:bg-amber-900/80 text-amber-300 border border-amber-600/50 text-xs font-cyber font-bold transition-colors"
              title="Paparan Markah Kalendar Murid"
            >
              <Trophy className="w-3.5 h-3.5" />
              <span className="hidden md:inline">MARKAH</span>
            </button>

            {/* Install PWA Button */}
            <button
              onClick={() => {
                sound.playClick();
                onOpenInstall();
              }}
              className="flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-cyber font-extrabold text-xs shadow-md transition-all hover:scale-105"
              title="Pasang Aplikasi ke Telefon (Add to Home Screen)"
            >
              <Smartphone className="w-3.5 h-3.5 text-slate-950" />
              <span className="hidden sm:inline">PASANG APP</span>
            </button>

            {/* Guide Book */}
            <button
              onClick={() => {
                sound.playClick();
                onOpenGuide();
              }}
              className="p-1.5 sm:p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-cyan-400 border border-slate-800 transition-colors"
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

            {/* Admin Settings (Teacher Control Panel) */}
            <button
              onClick={() => {
                sound.playClick();
                onOpenAdminSettings();
              }}
              className="p-2 rounded-lg bg-slate-900 hover:bg-cyan-950/80 text-slate-300 hover:text-cyan-300 border border-slate-800 hover:border-cyan-700/60 transition-colors"
              title="Tetapan Guru & Admin (Urus Kelas & Murid)"
            >
              <Settings className="w-4 h-4 text-cyan-400" />
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
