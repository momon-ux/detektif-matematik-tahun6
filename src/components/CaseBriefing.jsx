import React from 'react';
import { ArrowLeft, ShieldAlert, MapPin, Target, Award, Play, Terminal } from 'lucide-react';
import { sound } from '../utils/sound';

export default function CaseBriefing({ caseData, onStartInvestigation, onBack }) {
  React.useEffect(() => {
    sound.playHint();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Top Navigation */}
      <button
        onClick={() => {
          sound.playClick();
          onBack();
        }}
        className="inline-flex items-center gap-2 text-xs font-tech text-slate-400 hover:text-cyan-400 transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        KEMBALI KE PETA MISI
      </button>

      {/* Briefing Dossier Card */}
      <div className={`relative overflow-hidden rounded-2xl border bg-slate-900/90 shadow-2xl ${
        caseData.isBoss 
          ? 'border-rose-600/60 glow-rose' 
          : 'border-cyan-600/40 glow-cyan'
      }`}>
        {/* Terminal Header */}
        <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-cyan-400" />
            <span className="font-tech text-xs tracking-wider text-cyan-400">
              FAIL SIASATAN RASMI // {caseData.id.toUpperCase()}
            </span>
          </div>
          <span className="px-2.5 py-0.5 rounded text-xs font-tech font-bold uppercase bg-rose-950/80 border border-rose-500/40 text-rose-300">
            SULIT & PERSENDIRIAN
          </span>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Title & Metadata */}
          <div>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 font-tech mb-2">
              <span className="flex items-center gap-1 text-cyan-400">
                <MapPin className="w-3.5 h-3.5" />
                {caseData.location}
              </span>
              <span>•</span>
              <span className="text-amber-400 font-medium">
                TOPIK: {caseData.topic}
              </span>
              <span>•</span>
              <span className="text-rose-400 font-bold">
                TAHAP ANCAMAN: {caseData.threatLevel}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold font-cyber text-white">
              {caseData.title}
            </h2>
            <p className="text-sm text-cyan-300/80 mt-1 font-medium">
              {caseData.subtitle}
            </p>
          </div>

          {/* Narrative Briefing Box */}
          <div className="rounded-xl bg-slate-950/80 border border-slate-800 p-5 space-y-3">
            <p className="text-xs font-tech text-slate-400 tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              ARAHAN OPERASI DARIPADA IBU PEJABAT ARMS:
            </p>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed italic">
              "{caseData.story}"
            </p>
          </div>

          {/* Mission Objectives */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 space-y-1">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-tech">
                <Target className="w-4 h-4" />
                <span>OBJEKTIF 1</span>
              </div>
              <p className="text-xs text-slate-300 font-semibold">
                Selesaikan 3 Bukti Soalan KBAT Matematik.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 space-y-1">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-tech">
                <ShieldAlert className="w-4 h-4" />
                <span>OBJEKTIF 2</span>
              </div>
              <p className="text-xs text-slate-300 font-semibold">
                Buka Peti Besi dengan Kod Rahsia 3-Digit.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 space-y-1">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-tech">
                <Award className="w-4 h-4" />
                <span>GANJARAN</span>
              </div>
              <p className="text-xs text-slate-300 font-semibold flex items-center gap-1.5">
                <span>{caseData.badgeReward.icon}</span>
                <span>{caseData.badgeReward.name}</span>
              </p>
            </div>
          </div>

          {/* Action CTA */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800/80">
            <div className="text-xs text-slate-400 font-tech text-center sm:text-left">
              ⭐ Kumpul 3 Bintang jika menjawab tanpa membuka semua petunjuk rahsia!
            </div>

            <button
              onClick={() => {
                sound.playClick();
                onStartInvestigation();
              }}
              className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-cyber font-bold text-sm text-white shadow-xl flex items-center justify-center gap-2 transition-transform hover:scale-105 active:scale-95 ${
                caseData.isBoss
                  ? 'bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 shadow-rose-950/60'
                  : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-cyan-950/60'
              }`}
            >
              <Play className="w-4 h-4 fill-current" />
              <span>MASUK KE BILIK SIASATAN KES</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
