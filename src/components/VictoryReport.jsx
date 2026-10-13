import React, { useEffect } from 'react';
import { Award, Star, Zap, CheckCircle2, ArrowRight, RotateCcw, Share2, ShieldCheck, Trophy } from 'lucide-react';
import { sound } from '../utils/sound';
import { getRank, DEVELOPER_NAME, DEVELOPER_TITLE } from '../utils/storage';

export default function VictoryReport({
  caseData,
  totalHintsUsed,
  onReturnToMap,
  onReplayCase,
  onOpenCertificate,
  onOpenRecords,
  profile
}) {
  // Calculate Stars
  let stars = 3;
  if (totalHintsUsed >= 4) {
    stars = 1;
  } else if (totalHintsUsed >= 2) {
    stars = 2;
  }

  const xpEarned = caseData.isBoss ? 800 : 450 + (stars * 50);
  const currentRank = getRank(profile.xp);

  useEffect(() => {
    sound.playLevelUp();
  }, []);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      
      {/* Victory Debriefing Card */}
      <div className="relative rounded-3xl bg-slate-900/90 border border-emerald-600/60 p-6 sm:p-8 shadow-2xl glow-emerald text-center space-y-6 overflow-hidden">
        
        {/* Holographic Watermark Badge */}
        <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/30 text-white animate-bounce">
          <ShieldCheck className="w-10 h-10" />
        </div>

        {/* Case Closed Title */}
        <div className="space-y-1">
          <span className="font-tech text-xs tracking-widest text-emerald-400 font-bold uppercase bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-600/40">
            [ LAPORAN STATUS: KES SELESAI // DITUTUP DENGAN JAYA ]
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-cyber text-white pt-2">
            TAHNIAH, {profile.agentName.toUpperCase()}!
          </h2>
          <p className="text-xs font-tech text-amber-300">
            KELAS: <strong className="text-white">{profile.studentClass}</strong> | KOD: <strong className="text-cyan-300">{profile.agentCodename}</strong>
          </p>
          <p className="text-xs sm:text-sm text-slate-300 pt-1">
            Peti keselamatan siber berjaya dibuka dan rekod kemenangan anda telah dicatat dalam Buku Rekod Pentaksiran!
          </p>
        </div>

        {/* Stars Rating */}
        <div className="flex items-center justify-center gap-2 py-2">
          {[1, 2, 3].map(st => (
            <div
              key={st}
              className={`p-2 rounded-2xl transition-transform ${
                st <= stars ? 'scale-110' : 'opacity-30'
              }`}
            >
              <Star
                className={`w-10 h-10 ${
                  st <= stars
                    ? 'text-amber-400 fill-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.6)]'
                    : 'text-slate-700'
                }`}
              />
            </div>
          ))}
        </div>
        <p className="text-xs font-tech text-amber-300">
          PENILAIAN: {stars} BINTANG SIASATAN ({totalHintsUsed} petunjuk digunakan)
        </p>

        {/* XP and Rewards Grid */}
        <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
          {/* XP Box */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-cyan-800/50 space-y-1">
            <div className="flex items-center justify-center gap-1.5 text-cyan-400 text-xs font-tech">
              <Zap className="w-4 h-4" />
              <span>GANJARAN XP</span>
            </div>
            <p className="text-2xl font-bold font-tech text-white">
              +{xpEarned} XP
            </p>
          </div>

          {/* Badge Box */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-emerald-800/50 space-y-1">
            <div className="flex items-center justify-center gap-1.5 text-emerald-400 text-xs font-tech">
              <Award className="w-4 h-4" />
              <span>LENCANA DIBUKA</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <span className="text-xl">{caseData.badgeReward.icon}</span>
              <p className="text-xs font-bold text-slate-200 truncate">
                {caseData.badgeReward.name}
              </p>
            </div>
          </div>
        </div>

        {/* Rank Status */}
        <div className="p-3.5 rounded-xl bg-slate-950/50 border border-slate-800 text-xs text-slate-300 flex items-center justify-center gap-2">
          <span>{currentRank.icon}</span>
          <span>Pangkat Semasa Ejen: <strong className={currentRank.color}>{currentRank.title}</strong></span>
        </div>

        {/* Navigation Action Buttons */}
        <div className="space-y-3 pt-2">
          <button
            onClick={() => {
              sound.playClick();
              onReturnToMap();
            }}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-cyber font-bold text-sm flex items-center justify-center gap-2 shadow-xl shadow-emerald-950 hover:scale-[1.02] transition-transform"
          >
            <span>KEMBALI KE PETA MISI</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="flex flex-col sm:flex-row gap-2.5">
            <button
              onClick={() => {
                sound.playClick();
                onReplayCase();
              }}
              className="flex-1 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 font-tech text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Siasat Semula</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onOpenRecords();
              }}
              className="flex-1 py-2.5 rounded-xl bg-amber-950/40 hover:bg-amber-900/60 border border-amber-600/50 text-amber-300 font-tech text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <Trophy className="w-3.5 h-3.5" />
              <span>Buku Rekod Markah</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onOpenCertificate();
              }}
              className="flex-1 py-2.5 rounded-xl bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-600/50 text-cyan-300 font-tech text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <Award className="w-3.5 h-3.5" />
              <span>Lihat Sijil</span>
            </button>
          </div>
        </div>

        {/* Developer Attribution in Victory Report */}
        <div className="pt-2 border-t border-slate-800/80 text-[11px] font-tech text-slate-500">
          Pembangun Sistem: <strong className="text-cyan-400">{DEVELOPER_NAME}</strong>
        </div>

      </div>

    </div>
  );
}
