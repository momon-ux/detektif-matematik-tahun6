import React from 'react';
import { X, Printer, Award, Shield, Star, CheckCircle } from 'lucide-react';
import { getRank, AVATARS } from '../utils/storage';
import { sound } from '../utils/sound';

export default function CertificateModal({ profile, onClose }) {
  const rank = getRank(profile.xp);
  const totalStars = Object.values(profile.caseScores || {}).reduce((acc, curr) => acc + (curr.stars || 0), 0);
  const avatar = AVATARS.find(a => a.id === profile.avatarId) || AVATARS[0];

  const handlePrint = () => {
    sound.playClick();
    window.print();
  };

  const currentDate = new Date().toLocaleDateString('ms-MY', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-amber-600/50 rounded-3xl shadow-2xl overflow-hidden my-8">
        
        {/* Top Control Bar (Hidden during print) */}
        <div className="no-print p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-amber-400 font-tech text-xs">
            <Award className="w-4 h-4" />
            <span>SIJIL PENTAULIAHAN RASMI DETEKTIF SIBER ARMS</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-slate-950 font-cyber font-bold text-xs flex items-center gap-1.5 shadow-md"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak / Simpan PDF</span>
            </button>
            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Certificate Canvas */}
        <div className="p-8 sm:p-12 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border-8 border-double border-amber-500/40 text-center relative overflow-hidden">
          
          {/* Subtle Cyber Watermark */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
            <Shield className="w-96 h-96 text-cyan-400" />
          </div>

          <div className="relative z-10 space-y-6">
            
            {/* Certificate Header */}
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2 text-cyan-400 font-tech text-xs tracking-widest uppercase">
                <Shield className="w-4 h-4" />
                <span>AGENSI RISIKAN MATEMATIK SIBER (ARMS) MALAYSIA</span>
                <Shield className="w-4 h-4" />
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold font-cyber tracking-wider text-amber-300">
                SIJIL PENGHARGAAN & PENTAULIAHAN
              </h2>
              <p className="text-xs text-slate-400 font-tech tracking-wider">
                PROGRAM GAMIFIKASI MATEMATIK TAHUN 6 (KSSR SEMAKAN)
              </p>
            </div>

            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto"></div>

            {/* Recipient Details */}
            <div className="space-y-3 py-2">
              <p className="text-xs text-slate-400 uppercase tracking-wider font-tech">
                DENGAN INI DIPERAKUI BAHAWA
              </p>
              
              <h3 className="text-2xl sm:text-3xl font-extrabold font-cyber text-white tracking-wide border-b border-cyan-500/30 pb-2 inline-block px-8">
                {profile.agentName.toUpperCase()}
              </h3>

              <p className="text-xs text-cyan-300 font-tech">
                KOD EJEN: <strong className="text-white">{profile.agentCodename}</strong> | SEKOLAH: <strong className="text-white">{profile.schoolName}</strong>
              </p>
            </div>

            {/* Achievement Citation */}
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
              Telah berjaya menyiasat dan menyelesaikan misi kod keselamatan matematik yang merangkumi kesemua 8 topik teras DSKP Matematik Tahun 6 dengan kepujian berfikir aras tinggi (KBAT), serta membongkar kod peti besi The Glitch.
            </p>

            {/* Rank & Stats Seals */}
            <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto py-3">
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                <span className="text-xs font-tech text-slate-400">PANGKAT ARMS</span>
                <p className={`text-xs sm:text-sm font-bold font-cyber ${rank.color}`}>
                  {rank.title}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                <span className="text-xs font-tech text-slate-400">BINTANG SIASATAN</span>
                <p className="text-xs sm:text-sm font-bold font-tech text-amber-400">
                  {totalStars} / 24 Bintang
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                <span className="text-xs font-tech text-slate-400">MATA PENGALAMAN</span>
                <p className="text-xs sm:text-sm font-bold font-tech text-cyan-400">
                  {profile.xp} XP
                </p>
              </div>
            </div>

            {/* Signatures & Seal */}
            <div className="pt-6 border-t border-slate-800 flex items-center justify-between text-left text-xs font-tech text-slate-400 px-4">
              <div>
                <p className="text-slate-300 font-bold">KOD PENGESAHAN SIBER:</p>
                <p className="text-cyan-400 font-tech">#ARMS-MATH6-{profile.xp}-{totalStars}</p>
                <p className="text-[10px] text-slate-500 mt-1">Tarikh: {currentDate}</p>
              </div>

              {/* Gold Seal Graphic */}
              <div className="w-16 h-16 rounded-full border-2 border-amber-400/80 bg-gradient-to-tr from-amber-600 to-yellow-300 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/20 font-bold font-cyber text-[9px] text-center p-1 uppercase leading-tight">
                CAP RASMI ARMS
              </div>

              <div className="text-right">
                <p className="text-slate-300 font-bold">KETUA PESURUHJAYA ARMS</p>
                <p className="text-cyan-400 font-tech">PROF. ENIGMA KHALID</p>
                <p className="text-[10px] text-slate-500 mt-1">Pusat Keselamatan Siber Kebangsaan</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
