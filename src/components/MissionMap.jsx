import React, { useState } from 'react';
import { CASES_DATA } from '../data/casesData';
import { 
  Lock, Play, CheckCircle2, Star, Zap, ChevronRight, 
  RotateCw, Trophy, Swords, Smartphone, Award, Shield, Sparkles, Target,
  Hammer, Compass, Home
} from 'lucide-react';
import { sound } from '../utils/sound';
import { getRank, DEVELOPER_NAME, DEVELOPER_TITLE } from '../utils/storage';

export default function MissionMap({
  profile,
  onSelectCase,
  onOpenGuide,
  onOpenCertificate,
  onOpenWorld,
  onOpenQuest,
  onOpenRodaSifir,
  onOpenMathShooter,
  onOpenRecords,
  onOpenInstall
}) {
  const completedCases = profile.completedCases || [];
  const caseScores = profile.caseScores || {};
  const currentRank = getRank(profile.xp);
  const totalStars = Object.values(caseScores).reduce((acc, curr) => acc + (curr.stars || 0), 0);

  const [activeTab, setActiveTab] = useState('campaign'); // 'campaign' | 'boss'

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 py-4 space-y-4">
      
      {/* ======================================================== */}
      {/* 1. TOP TACTICAL HUD (Clean, No paragraph walls)          */}
      {/* ======================================================== */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 sm:p-4 rounded-2xl bg-slate-900/90 border border-cyan-800/60 shadow-xl backdrop-blur-md">
        
        {/* Left: Player Profile Badge */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-xl shadow-lg shadow-cyan-500/20 shrink-0 border border-cyan-300/40">
            {currentRank.icon}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm sm:text-base font-cyber font-bold text-white tracking-wide">
                {profile.agentName}
              </h2>
              <span className="text-[10px] font-tech font-bold px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300">
                {profile.selectedGrade ? `${profile.selectedGrade} • ` : ''}{profile.studentClass}
              </span>
            </div>
            <p className={`text-[11px] font-cyber font-semibold ${currentRank.color}`}>
              {currentRank.title} • <span className="text-cyan-400 font-tech">{profile.xp} XP</span>
            </p>
          </div>
        </div>

        {/* Center: Stars & Sector Tracker */}
        <div className="flex items-center gap-3 bg-slate-950/80 px-4 py-2 rounded-xl border border-slate-800">
          <div className="flex items-center gap-1.5 text-amber-400 font-cyber font-bold text-xs sm:text-sm">
            <Star className="w-4 h-4 fill-amber-400" />
            <span>{totalStars} / 24 BINTANG</span>
          </div>
          <div className="w-px h-4 bg-slate-700"></div>
          <div className="text-cyan-400 font-cyber font-bold text-xs sm:text-sm">
            <span>{completedCases.length} / 8 SEKTOR</span>
          </div>
        </div>

        {/* Right: Quick Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Calendar Records */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenRecords();
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-950/60 hover:bg-amber-900/80 border border-amber-500/50 text-amber-300 text-xs font-cyber font-bold shadow-md hover:scale-105 transition-all"
            title="Buka Papan Markah Murid"
          >
            <Trophy className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">MARKAH</span>
          </button>

          {/* Install PWA Button */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenInstall();
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-500/50 text-emerald-300 text-xs font-cyber font-bold shadow-md hover:scale-105 transition-all"
            title="Panduan Pasang Aplikasi ke Telefon"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">PASANG APP</span>
          </button>
        </div>

      </div>

      {/* ======================================================== */}
      {/* 2. DUA MOD UTAMA: DUNIA BLOK & KEMBARA QUEST             */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Card A: Dunia Blok Impian (Lapangan Rumput Saya) */}
        <div
          onClick={() => {
            sound.playClick();
            onOpenWorld();
          }}
          className="relative rounded-3xl bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950/80 border-2 border-emerald-500/70 hover:border-emerald-400 p-5 sm:p-6 cursor-pointer group shadow-2xl hover:scale-[1.01] transition-all overflow-hidden flex flex-col justify-between min-h-[190px]"
        >
          <div className="absolute top-0 right-0 w-44 h-44 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-cyber px-3 py-1 rounded-full bg-emerald-950 border border-emerald-400/60 text-emerald-300 font-extrabold uppercase tracking-wider shadow-sm flex items-center gap-1.5">
              <span>🏡 MINECRAFT & LEGO SANDBOX</span>
            </span>
            <span className="text-3xl animate-bounce">🏰</span>
          </div>

          <div className="my-3">
            <h3 className="text-lg sm:text-2xl font-cyber font-extrabold text-white group-hover:text-emerald-300 transition-colors flex items-center gap-2">
              <span>DUNIA BLOK & LAPANGAN RUMPUT</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-tech mt-1 leading-relaxed">
              Bina rumah impian, pasang bumbung genting, kolam ikan, pagar dan letak kereta sport atau roket angkasa menggunakan <strong>XP</strong> yang anda kumpul!
            </p>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="text-[11px] font-tech text-emerald-400 font-bold">
              🌿 12×12 Petak Lapangan Rumput • Beli Blok Menggunakan XP
            </div>
            <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-cyber font-extrabold text-xs shadow-lg shadow-emerald-950 flex items-center gap-1.5 shrink-0">
              <Hammer className="w-3.5 h-3.5" />
              <span>MASUK LAPANGAN</span>
            </button>
          </div>
        </div>

        {/* Card B: Kembara Quest Matematik (Adventure Quest) */}
        <div
          onClick={() => {
            sound.playClick();
            onOpenQuest();
          }}
          className="relative rounded-3xl bg-gradient-to-br from-cyan-950 via-slate-900 to-blue-950/80 border-2 border-cyan-500/70 hover:border-cyan-400 p-5 sm:p-6 cursor-pointer group shadow-2xl hover:scale-[1.01] transition-all overflow-hidden flex flex-col justify-between min-h-[190px]"
        >
          <div className="absolute top-0 right-0 w-44 h-44 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex items-center justify-between">
            <span className="text-[10px] font-cyber px-3 py-1 rounded-full bg-cyan-950 border border-cyan-400/60 text-cyan-300 font-extrabold uppercase tracking-wider shadow-sm flex items-center gap-1.5">
              <span>🧭 ADVENTURE QUEST TAHUN 5 & 6</span>
            </span>
            <span className="text-3xl animate-pulse">🏃‍♂️</span>
          </div>

          <div className="my-3">
            <h3 className="text-lg sm:text-2xl font-cyber font-extrabold text-white group-hover:text-cyan-300 transition-colors flex items-center gap-2">
              <span>KEMBARA QUEST MATEMATIK</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-tech mt-1 leading-relaxed">
              Jawab soalan matematik, avatar akan melangkah ke destinasi seterusnya di atas peta kembara merentasi 16 stesen & raih ganjaran ratusan <strong>XP</strong>!
            </p>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="text-[11px] font-tech text-cyan-400 font-bold">
              🗺️ 16 Destinasi • Pilih Avatar • Hadiah XP Melimpah Ruah
            </div>
            <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-cyber font-extrabold text-xs shadow-lg shadow-cyan-950 flex items-center gap-1.5 shrink-0">
              <Compass className="w-3.5 h-3.5" />
              <span>MULAKAN QUEST</span>
            </button>
          </div>
        </div>

      </div>

      {/* ======================================================== */}
      {/* 3. FOUR ARCADE & MINI-GAMES MODES (Kumpul XP Cepat)      */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        
        {/* Card 1: Math Shooter (Meriam Matematik) */}
        <div 
          onClick={() => {
            sound.playClick();
            onOpenMathShooter();
          }}
          className="relative rounded-2xl bg-gradient-to-br from-orange-950/80 via-slate-900 to-amber-950/70 border border-orange-500/60 hover:border-orange-400 p-4 sm:p-5 cursor-pointer group shadow-xl hover:scale-[1.02] transition-all overflow-hidden flex flex-col justify-between min-h-[160px]"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl pointer-events-none"></div>
          
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-cyber px-2.5 py-0.5 rounded-full bg-orange-950 border border-orange-500/40 text-orange-300 font-bold uppercase tracking-wider">
              🎯 ARCADE SHOOTER
            </span>
            <span className="text-2xl animate-bounce">🎈</span>
          </div>

          <div className="my-2">
            <h3 className="text-base sm:text-lg font-cyber font-extrabold text-white group-hover:text-orange-300 transition-colors">
              MATH SHOOTER
            </h3>
            <p className="text-xs text-slate-300 font-tech">
              Tembak meriam & letupkan belon jawapan sifir!
            </p>
          </div>

          <button className="w-full py-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-400 hover:to-amber-500 text-white font-cyber font-extrabold text-xs shadow-md flex items-center justify-center gap-1.5">
            <Target className="w-3.5 h-3.5" />
            <span>MAIN SEKARANG</span>
          </button>
        </div>

        {/* Card 2: Roda Sifir Arena */}
        <div 
          onClick={() => {
            sound.playClick();
            onOpenRodaSifir();
          }}
          className="relative rounded-2xl bg-gradient-to-br from-cyan-950/70 via-slate-900 to-blue-950/60 border border-cyan-500/50 hover:border-cyan-400 p-4 sm:p-5 cursor-pointer group shadow-xl hover:scale-[1.02] transition-all overflow-hidden flex flex-col justify-between min-h-[160px]"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none"></div>

          <div className="flex items-center justify-between">
            <span className="text-[10px] font-cyber px-2.5 py-0.5 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-bold uppercase tracking-wider">
              ⚡ SPEED BLITZ 360°
            </span>
            <span className="text-2xl animate-spin">🎡</span>
          </div>

          <div className="my-2">
            <h3 className="text-base sm:text-lg font-cyber font-extrabold text-white group-hover:text-cyan-300 transition-colors">
              ARENA RODA SIFIR
            </h3>
            <p className="text-xs text-slate-300 font-tech">
              Pecut masa 30s/60s, putaran bertuah & rentak sifir!
            </p>
          </div>

          <button className="w-full py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-cyber font-extrabold text-xs shadow-md flex items-center justify-center gap-1.5">
            <RotateCw className="w-3.5 h-3.5" />
            <span>PUTAR & JAWAB</span>
          </button>
        </div>

        {/* Card 3: Cyber Boss Battle */}
        <div 
          onClick={() => {
            sound.playClick();
            onOpenRodaSifir();
          }}
          className="relative rounded-2xl bg-gradient-to-br from-rose-950/70 via-slate-900 to-amber-950/60 border border-rose-500/50 hover:border-rose-400 p-4 sm:p-5 cursor-pointer group shadow-xl hover:scale-[1.02] transition-all overflow-hidden flex flex-col justify-between min-h-[160px]"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl pointer-events-none"></div>
          
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-cyber px-2.5 py-0.5 rounded-full bg-rose-950 border border-rose-500/40 text-rose-300 font-bold uppercase tracking-wider">
              ⚔️ RAID PERTEMPURAN
            </span>
            <span className="text-2xl animate-pulse">👾</span>
          </div>

          <div className="my-2">
            <h3 className="text-base sm:text-lg font-cyber font-extrabold text-white group-hover:text-rose-300 transition-colors">
              PERANG BOS SIBER
            </h3>
            <p className="text-xs text-slate-300 font-tech">
              Tumpaskan 3 Bos Penggodam dengan tembakan laser!
            </p>
          </div>

          <button className="w-full py-2 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-cyber font-extrabold text-xs shadow-md flex items-center justify-center gap-1.5">
            <Swords className="w-3.5 h-3.5" />
            <span>BATTLEFIELD</span>
          </button>
        </div>

        {/* Card 4: Certificate / Guide Quick Access */}
        <div 
          onClick={() => {
            sound.playClick();
            if (completedCases.length === CASES_DATA.length) {
              onOpenCertificate();
            } else {
              onOpenGuide();
            }
          }}
          className="relative rounded-2xl bg-gradient-to-br from-amber-950/70 via-slate-900 to-emerald-950/60 border border-amber-500/50 hover:border-amber-400 p-4 sm:p-5 cursor-pointer group shadow-xl hover:scale-[1.02] transition-all overflow-hidden flex flex-col justify-between min-h-[160px]"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-cyber px-2.5 py-0.5 rounded-full bg-amber-950 border border-amber-500/40 text-amber-300 font-bold uppercase tracking-wider">
              📜 REKOD & PANDUAN
            </span>
            <span className="text-2xl">🎓</span>
          </div>

          <div className="my-2">
            <h3 className="text-base sm:text-lg font-cyber font-extrabold text-white group-hover:text-amber-300 transition-colors">
              {completedCases.length === CASES_DATA.length ? 'SIJIL ARMS' : 'BUKU FORMULA'}
            </h3>
            <p className="text-xs text-slate-300 font-tech">
              {completedCases.length === CASES_DATA.length ? 'Semua selesai! Cetak sijil.' : 'Rujukan nota pantas Tahun 6.'}
            </p>
          </div>

          <button className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/40 font-cyber font-bold text-xs shadow-md flex items-center justify-center gap-1.5">
            <Award className="w-3.5 h-3.5" />
            <span>{completedCases.length === CASES_DATA.length ? 'LIHAT SIJIL' : 'BUKU FORMULA'}</span>
          </button>
        </div>

      </div>

      {/* ======================================================== */}
      {/* 3. TACTICAL 8-SECTOR CAMPAIGN MAP (Clash of Clans Style)  */}
      {/* ======================================================== */}
      <div className="rounded-2xl bg-slate-900/80 border border-cyan-900/60 p-4 sm:p-5 space-y-3 shadow-xl">
        
        {/* Title Ribbon */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
            <h3 className="font-cyber font-extrabold text-sm sm:text-base text-white tracking-wide uppercase">
              PETA KEMPEN 8 SEKTOR // KSSR SEMAKAN
            </h3>
          </div>
          <span className="text-[11px] font-tech text-slate-400">
            KLIK SEKTOR UNTUK BERTARUNG
          </span>
        </div>

        {/* 8 Sector Nodes Grid in Landscape (Clean 4x2 Cards) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {CASES_DATA.map((c, index) => {
            const isCompleted = completedCases.includes(c.id);
            const scoreData = caseScores[c.id];
            const stars = scoreData ? scoreData.stars : 0;
            const isUnlocked = index === 0 || completedCases.includes(CASES_DATA[index - 1].id);

            return (
              <button
                key={c.id}
                disabled={!isUnlocked}
                onClick={() => {
                  sound.playClick();
                  onSelectCase(c);
                }}
                className={`p-3.5 rounded-2xl border text-left transition-all relative flex flex-col justify-between min-h-[110px] ${
                  isCompleted
                    ? 'bg-slate-950 border-emerald-500/60 hover:border-emerald-400 hover:scale-105 shadow-md shadow-emerald-950/40'
                    : isUnlocked
                    ? 'bg-slate-950 border-cyan-500/60 hover:border-cyan-400 hover:scale-105 shadow-md shadow-cyan-950/40 ring-1 ring-cyan-500/30'
                    : 'bg-slate-950/40 border-slate-900 opacity-50 cursor-not-allowed'
                }`}
              >
                {/* Sector Header & Stars */}
                <div className="flex items-center justify-between w-full">
                  <span className={`text-[10px] font-tech font-bold px-2 py-0.5 rounded-md ${
                    isCompleted ? 'bg-emerald-950 text-emerald-300' : isUnlocked ? 'bg-cyan-950 text-cyan-300' : 'bg-slate-900 text-slate-600'
                  }`}>
                    SEKTOR 0{c.caseNumber}
                  </span>

                  {isCompleted ? (
                    <div className="flex items-center gap-0.5 text-amber-400">
                      {[1, 2, 3].map(st => (
                        <Star 
                          key={st} 
                          className={`w-3 h-3 ${st <= stars ? 'fill-amber-400 text-amber-400' : 'text-slate-800'}`} 
                        />
                      ))}
                    </div>
                  ) : !isUnlocked ? (
                    <Lock className="w-3.5 h-3.5 text-slate-600" />
                  ) : (
                    <span className="text-[10px] font-cyber text-cyan-400 font-bold animate-pulse">SIAP!</span>
                  )}
                </div>

                {/* Short Punchy Title (NO paragraph clutter) */}
                <div className="my-1">
                  <h4 className="font-cyber font-bold text-xs text-white leading-tight line-clamp-1">
                    {c.topic.replace(/^[0-9.]+\s*/, '')}
                  </h4>
                  <p className="text-[10px] text-slate-400 font-tech truncate mt-0.5">
                    {c.title}
                  </p>
                </div>

                {/* Action Trigger */}
                <div className="flex items-center justify-between text-[10px] font-tech pt-1 border-t border-slate-900">
                  <span className="text-slate-500">3 Fasa + Kod</span>
                  <span className={`font-bold flex items-center gap-0.5 ${
                    isCompleted ? 'text-emerald-400' : isUnlocked ? 'text-cyan-400' : 'text-slate-600'
                  }`}>
                    <span>{isCompleted ? 'ULANG' : 'MAIN'}</span>
                    <ChevronRight className="w-3 h-3" />
                  </span>
                </div>

              </button>
            );
          })}
        </div>

      </div>

      {/* Developer Footer Ribbon */}
      <div className="text-center text-[10px] font-tech text-slate-500 py-1">
        <span>Pembangun Sistem: <strong className="text-cyan-400">{DEVELOPER_NAME}</strong> • {DEVELOPER_TITLE}</span>
      </div>

    </div>
  );
}
