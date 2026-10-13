import React from 'react';
import { CASES_DATA } from '../data/casesData';
import { Lock, Play, CheckCircle2, Star, ShieldAlert, Zap, Compass, ChevronRight, RotateCw, Trophy, Smartphone } from 'lucide-react';
import { sound } from '../utils/sound';
import { getRank, getNextRank, DEVELOPER_NAME } from '../utils/storage';

export default function MissionMap({
  profile,
  onSelectCase,
  onOpenGuide,
  onOpenCertificate,
  onOpenRodaSifir,
  onOpenRecords,
  onOpenInstall
}) {
  const completedCases = profile.completedCases || [];
  const caseScores = profile.caseScores || {};
  const currentRank = getRank(profile.xp);
  const nextRank = getNextRank(profile.xp);

  const totalCases = CASES_DATA.length;
  const completedCount = completedCases.length;
  const progressPercent = Math.round((completedCount / totalCases) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8">
      
      {/* Hero Command Dispatch */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-cyan-950/60 border border-cyan-800/40 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-blue-500/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-tech">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
              PUSAT OPERASI RISIKAN SIBER NEGARA (ARMS)
            </div>
            
            <h2 className="text-2xl sm:text-4xl font-extrabold font-cyber tracking-tight text-white">
              PETA MISI: <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">8 FAIL KES SIBER</span>
            </h2>
            
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Selamat bertugas, <strong className="text-cyan-300">{profile.agentName}</strong> (Kelas: <strong className="text-amber-300 font-tech">{profile.studentClass}</strong> | Kod: {profile.agentCodename})! 
              Penggodam misteri <span className="text-rose-400 font-semibold">"The Glitch"</span> sedang mensabotaj sistem utama negara. 
              Selesaikan kes-kes matematik ini untuk membuka peti besi dan catat rekod markah kemenangan anda!
            </p>

            {/* Progression Bar */}
            <div className="pt-2 space-y-1.5">
              <div className="flex justify-between text-xs text-slate-400 font-tech">
                <span>KEMAJUAN KES: {completedCount} / {totalCases} SELESAI ({progressPercent}%)</span>
                <span>PANGKAT: <strong className={currentRank.color}>{currentRank.title}</strong></span>
              </div>
              <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 transition-all duration-700 ease-out"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
              {nextRank && (
                <p className="text-[11px] text-slate-400">
                  Perlukan <span className="text-cyan-300 font-semibold">{nextRank.minXp - profile.xp} XP</span> lagi untuk dinaikkan pangkat ke <span className={nextRank.color}>{nextRank.title}</span>.
                </p>
              )}
            </div>
          </div>

          {/* Quick Action Badges Box */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            {/* Roda Sifir & Boss Battle Button */}
            <button
              onClick={() => {
                sound.playClick();
                onOpenRodaSifir();
              }}
              className="flex items-center gap-3 p-3.5 rounded-xl bg-gradient-to-r from-rose-950/80 to-amber-950/80 hover:from-rose-900/80 hover:to-amber-900/80 border border-amber-500/60 hover:border-amber-400 transition-all text-left group shadow-lg"
            >
              <div className="p-2.5 rounded-lg bg-gradient-to-br from-amber-500 to-rose-500 text-slate-950 group-hover:scale-110 transition-transform">
                <RotateCw className="w-5 h-5 animate-spin" />
              </div>
              <div>
                <p className="text-[11px] text-amber-300 font-bold uppercase">Mode Bertarung Pantas</p>
                <p className="text-sm font-extrabold text-white group-hover:text-amber-200">Arena Bos & Roda Sifir ⚔️</p>
              </div>
            </button>

            {/* Calendar Score Records Button */}
            <button
              onClick={() => {
                sound.playClick();
                onOpenRecords();
              }}
              className="flex items-center gap-3 p-3.5 rounded-xl bg-cyan-950/80 hover:bg-cyan-900/80 border border-cyan-500/60 hover:border-cyan-400 transition-all text-left group shadow-lg"
            >
              <div className="p-2.5 rounded-lg bg-cyan-500 text-slate-950 group-hover:scale-110 transition-transform">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] text-cyan-300 font-bold uppercase">Log Aktiviti Bilik Darjah</p>
                <p className="text-sm font-extrabold text-white group-hover:text-cyan-200">Paparan Markah Kalendar 🗓️</p>
              </div>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onOpenGuide();
              }}
              className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-950/80 hover:bg-slate-900 border border-cyan-900/60 hover:border-cyan-500/50 transition-all text-left group"
            >
              <div className="p-2.5 rounded-lg bg-cyan-950 text-cyan-400 group-hover:scale-110 transition-transform">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">Rujukan Silibus KSSR</p>
                <p className="text-sm font-bold text-slate-200 group-hover:text-cyan-300">Buku Panduan & Formula</p>
              </div>
            </button>

            {completedCount === totalCases && (
              <button
                onClick={() => {
                  sound.playSuccess();
                  onOpenCertificate();
                }}
                className="flex items-center gap-3 p-3.5 rounded-xl bg-amber-950/40 hover:bg-amber-900/60 border border-amber-600/60 hover:border-amber-400 transition-all text-left group glow-amber"
              >
                <div className="p-2.5 rounded-lg bg-amber-900/80 text-amber-300 group-hover:scale-110 transition-transform">
                  <Star className="w-5 h-5 fill-amber-300" />
                </div>
                <div>
                  <p className="text-xs text-amber-300 font-medium">Tahniah Semua Selesai!</p>
                  <p className="text-sm font-bold text-amber-200">Cetak Sijil Detektif ARMS</p>
                </div>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* PWA Parents Callout Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-cyan-950/80 via-slate-900 to-emerald-950/80 border border-cyan-500/40 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden border-2 border-cyan-400 shadow-lg shadow-cyan-500/30 shrink-0">
            <img src="./pwa-icon-512.png" alt="Logo Detektif Siber" className="w-full h-full object-cover" />
          </div>
          <div>
            <span className="text-[10px] font-tech text-emerald-400 font-bold uppercase tracking-wider">
              📲 PANDUAN KHAS IBU BAPA & GURU
            </span>
            <h3 className="font-cyber font-bold text-base sm:text-lg text-white">
              Pasang Aplikasi Ini Terus Ke Telefon (Add to Home Screen)
            </h3>
            <p className="text-xs text-slate-300 font-tech">
              Mudah untuk anak-anak main bila-bila masa seperti aplikasi telefon biasa tanpa iklan!
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            sound.playClick();
            onOpenInstall();
          }}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-400 hover:from-cyan-400 hover:to-emerald-300 text-slate-950 font-cyber font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-950 hover:scale-105 active:scale-95 transition-all shrink-0"
        >
          <Smartphone className="w-4 h-4" />
          <span>CARA PASANG KE TELEFON</span>
        </button>
      </div>

      {/* Grid of 8 Cases */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold font-cyber text-slate-200 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-sm bg-cyan-400"></span>
            SENARAI FAIL SIASATAN (TOPIK 1 HINGGA 8)
          </h3>
          <span className="text-xs font-tech text-slate-400">
            KLIK MANA-MANA KES TERBUKA UNTUK MEMULAKAN
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {CASES_DATA.map((c, index) => {
            const isCompleted = completedCases.includes(c.id);
            // Case 1 is always unlocked. Others unlocked if previous case is completed OR currently completed
            const isUnlocked = index === 0 || completedCases.includes(CASES_DATA[index - 1].id) || isCompleted;
            const score = caseScores[c.id];
            const stars = score ? score.stars : 0;

            return (
              <div
                key={c.id}
                className={`relative flex flex-col rounded-2xl border transition-all duration-300 group overflow-hidden ${
                  c.isBoss
                    ? 'border-rose-700/60 bg-gradient-to-b from-slate-900 via-rose-950/20 to-slate-950 hover:border-rose-500 glow-rose md:col-span-2 lg:col-span-2'
                    : isCompleted
                    ? 'border-emerald-800/50 bg-slate-900/60 hover:border-emerald-500/70'
                    : isUnlocked
                    ? 'border-cyan-800/40 bg-slate-900/50 hover:border-cyan-400/70 hover:shadow-lg hover:shadow-cyan-950/50'
                    : 'border-slate-800/40 bg-slate-950/60 opacity-65'
                }`}
              >
                {/* Header Strip */}
                <div className="p-4 border-b border-slate-800/60 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-tech px-2 py-0.5 rounded font-bold ${
                      c.isBoss 
                        ? 'bg-rose-950 text-rose-300 border border-rose-600/40' 
                        : isCompleted
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-600/30'
                        : 'bg-slate-800 text-slate-300'
                    }`}>
                      {c.isBoss ? 'KES FINAL BOSS' : `KES 0${c.caseNumber}`}
                    </span>
                    <span className="text-[11px] text-slate-400 truncate max-w-[140px] sm:max-w-none">
                      {c.threatLevel}
                    </span>
                  </div>

                  {/* Status / Stars */}
                  {isCompleted ? (
                    <div className="flex items-center gap-1 text-amber-400">
                      {[1, 2, 3].map(st => (
                        <Star 
                          key={st} 
                          className={`w-3.5 h-3.5 ${st <= stars ? 'fill-amber-400 text-amber-400' : 'text-slate-700'}`} 
                        />
                      ))}
                    </div>
                  ) : !isUnlocked ? (
                    <div className="flex items-center gap-1 text-slate-500 text-xs font-tech">
                      <Lock className="w-3.5 h-3.5" />
                      <span>DIKUNCI</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-cyan-400 text-xs font-tech">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
                      <span>TERBUKA</span>
                    </div>
                  )}
                </div>

                {/* Case Info Body */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <p className="text-xs font-semibold text-cyan-400 mb-1">{c.topic}</p>
                    <h4 className="text-base font-bold font-cyber text-slate-100 group-hover:text-cyan-200 transition-colors line-clamp-1">
                      {c.title}
                    </h4>
                    <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                      {c.subtitle}
                    </p>
                  </div>

                  {/* Badge Preview */}
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-950/60 border border-slate-800/80 text-xs">
                    <span className="text-base">{c.badgeReward.icon}</span>
                    <div className="truncate">
                      <p className="font-semibold text-slate-300 text-[11px] truncate">{c.badgeReward.name}</p>
                      <p className="text-[10px] text-slate-500 truncate">{c.location}</p>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="pt-2">
                    {isUnlocked ? (
                      <button
                        onClick={() => {
                          sound.playClick();
                          onSelectCase(c);
                        }}
                        className={`w-full py-2.5 px-3 rounded-xl font-bold font-cyber text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
                          c.isBoss
                            ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-900/40 hover:scale-[1.02]'
                            : isCompleted
                            ? 'bg-emerald-950/70 hover:bg-emerald-900 text-emerald-300 border border-emerald-600/40'
                            : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-lg shadow-cyan-950 hover:scale-[1.02]'
                        }`}
                      >
                        {isCompleted ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            <span>KES SELESAI (SIASAT LAGI)</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4 fill-current" />
                            <span>MULAKAN SIASATAN</span>
                          </>
                        )}
                      </button>
                    ) : (
                      <div className="w-full py-2.5 px-3 rounded-xl bg-slate-900/50 border border-slate-800/60 text-slate-500 font-tech text-xs text-center flex items-center justify-center gap-1.5 cursor-not-allowed">
                        <Lock className="w-3.5 h-3.5" />
                        <span>SELESAIKAN KES 0{c.caseNumber - 1} DAHULU</span>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
