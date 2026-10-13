import React from 'react';
import { 
  X, Printer, Trophy, Star, Zap, CheckCircle2, 
  RotateCw, Calendar, Clock, User, School, GraduationCap, Award, Trash2 
} from 'lucide-react';
import { getRank, DEVELOPER_NAME, DEVELOPER_TITLE } from '../utils/storage';
import { sound } from '../utils/sound';

export default function ScoreRecordsModal({ 
  profile, 
  onClose, 
  onOpenProfile, 
  onClearRecords 
}) {
  const rank = getRank(profile.xp);
  const totalStars = Object.values(profile.caseScores || {}).reduce((acc, curr) => acc + (curr.stars || 0), 0);
  const records = profile.scoreRecords || [];

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-cyan-800/80 rounded-3xl shadow-2xl overflow-hidden my-4">
        
        {/* Top Control Bar (Hidden on print) */}
        <div className="no-print p-4 sm:p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-950/80 border border-amber-500/40 text-amber-400">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-cyber font-bold text-base text-white">
                BUKU REKOD PENCAPAIAN & MARKAH MURID
              </h3>
              <p className="text-xs text-slate-400 font-tech">
                CATATAN KEMENANGAN KES & PRESTASI RODA SIFIR
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-cyber font-bold text-xs flex items-center gap-1.5 shadow-md transition-all hover:scale-105"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak Slip Rekod</span>
            </button>
            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Printable Canvas Content */}
        <div className="p-5 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* Printable Header Box */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-cyan-900/60 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-inner">
            <div className="space-y-1.5">
              <span className="text-[11px] font-tech text-cyan-400 font-bold uppercase tracking-wider">
                MAKLUMAT PENTAKSIRAN MURID // KSSR SEMAKAN
              </span>
              <h2 className="text-xl sm:text-2xl font-cyber font-bold text-white flex items-center gap-2">
                <User className="w-5 h-5 text-cyan-400 shrink-0" />
                <span>{profile.agentName.toUpperCase()}</span>
              </h2>
              <div className="flex flex-wrap items-center gap-3 text-xs font-tech text-slate-300">
                <span className="flex items-center gap-1 text-amber-300 font-bold">
                  <GraduationCap className="w-4 h-4" />
                  KELAS: {profile.studentClass}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-slate-400">
                  <School className="w-4 h-4" />
                  {profile.schoolName}
                </span>
                <span>•</span>
                <span className="text-cyan-400 font-semibold">
                  KOD: {profile.agentCodename}
                </span>
              </div>
            </div>

            {/* Quick Edit Profile Button (Hidden on print) */}
            <div className="no-print shrink-0">
              <button
                onClick={() => {
                  sound.playClick();
                  onOpenProfile();
                }}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-tech text-cyan-300 hover:text-cyan-200 transition-colors"
              >
                Tukar Nama / Kelas Murid Lain
              </button>
            </div>
          </div>

          {/* Overall Stats Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center space-y-1">
              <span className="text-[10px] font-tech text-slate-400 uppercase">KES SELESAI</span>
              <p className="text-xl font-bold font-tech text-emerald-400">
                {profile.completedCases?.length || 0} / 8
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center space-y-1">
              <span className="text-[10px] font-tech text-slate-400 uppercase">JUMLAH BINTANG</span>
              <p className="text-xl font-bold font-tech text-amber-400 flex items-center justify-center gap-1">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{totalStars} / 24</span>
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center space-y-1">
              <span className="text-[10px] font-tech text-slate-400 uppercase">MATA XP</span>
              <p className="text-xl font-bold font-tech text-cyan-400 flex items-center justify-center gap-1">
                <Zap className="w-4 h-4" />
                <span>{profile.xp}</span>
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center space-y-1">
              <span className="text-[10px] font-tech text-slate-400 uppercase">PANGKAT EJEN</span>
              <p className={`text-xs font-bold font-cyber truncate ${rank.color}`}>
                {rank.title}
              </p>
            </div>
          </div>

          {/* Records Table */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-cyber font-bold text-sm text-slate-200 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                SENARAI LOG AKTIVITI & CATATAN KEMENANGAN ({records.length})
              </h4>
              {records.length > 0 && (
                <button
                  onClick={onClearRecords}
                  className="no-print text-[11px] font-tech text-rose-400 hover:text-rose-300 flex items-center gap-1 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Kosongkan Log</span>
                </button>
              )}
            </div>

            {records.length > 0 ? (
              <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/80 shadow-inner">
                <table className="w-full text-left text-xs font-tech">
                  <thead className="bg-slate-900/90 text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="p-3">TARIKH & MASA</th>
                      <th className="p-3">NAMA MURID & KELAS</th>
                      <th className="p-3">AKTIVITI / KES</th>
                      <th className="p-3">KEPUTUSAN / SKOR</th>
                      <th className="p-3 text-right">STATUS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    {records.map((rec) => (
                      <tr key={rec.id} className="hover:bg-slate-900/50 transition-colors">
                        <td className="p-3 text-slate-400 whitespace-nowrap">
                          <div>{rec.date}</div>
                          <div className="text-[10px] text-slate-500">{rec.time}</div>
                        </td>
                        <td className="p-3">
                          <div className="font-bold text-white">{rec.studentName}</div>
                          <div className="text-[10px] text-amber-300 font-semibold">{rec.studentClass}</div>
                        </td>
                        <td className="p-3">
                          <div className="font-semibold text-cyan-300">{rec.title}</div>
                          <div className="text-[10px] text-slate-500">{rec.category || 'Misi Siasatan'}</div>
                        </td>
                        <td className="p-3">
                          {rec.stars ? (
                            <div className="flex items-center gap-1 text-amber-400">
                              {[1, 2, 3].map(st => (
                                <Star 
                                  key={st} 
                                  className={`w-3 h-3 ${st <= rec.stars ? 'fill-amber-400 text-amber-400' : 'text-slate-700'}`} 
                                />
                              ))}
                              <span className="ml-1 text-slate-300 font-bold">+{rec.xp} XP</span>
                            </div>
                          ) : (
                            <div className="text-cyan-400 font-bold">
                              {rec.score} Mata ({rec.accuracy || '100%'})
                            </div>
                          )}
                        </td>
                        <td className="p-3 text-right whitespace-nowrap">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700/50 font-bold text-[10px]">
                            <CheckCircle2 className="w-3 h-3" />
                            MENANG
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-8 rounded-2xl bg-slate-950/40 border border-dashed border-slate-800 text-center space-y-2">
                <Trophy className="w-8 h-8 text-slate-600 mx-auto" />
                <p className="text-sm font-semibold text-slate-300">Belum ada rekod kemenangan dicatat.</p>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Mulakan mana-mana fail siasatan kes matematik atau mainkan Roda Sifir untuk mencatat rekod markah anda di sini!
                </p>
              </div>
            )}
          </div>

          {/* Teacher Assessment & Developer Sign-off Box (Visible on print and screen) */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 pt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs font-tech text-slate-400">
              
              {/* Teacher Notes */}
              <div className="space-y-2 border-b sm:border-b-0 sm:border-r border-slate-800 pb-4 sm:pb-0 sm:pr-4">
                <p className="font-bold text-slate-300">ULASAN / PENGESAHAN GURU MATEMATIK:</p>
                <div className="h-16 rounded-xl border border-dashed border-slate-700 p-2 text-slate-500 italic text-[11px]">
                  [Ruang untuk tandatangan, markah PBD, atau ulasan bimbingan guru...]
                </div>
                <div className="flex justify-between text-[11px] pt-1">
                  <span>Nama Guru: _____________________</span>
                  <span>Tarikh: {currentDate}</span>
                </div>
              </div>

              {/* Developer Official Credit & Attribution */}
              <div className="space-y-1.5 flex flex-col justify-between">
                <div>
                  <p className="font-bold text-cyan-300 uppercase tracking-wider text-[11px]">
                    PEMBANGUN SISTEM GAMIFIKASI:
                  </p>
                  <p className="text-sm sm:text-base font-extrabold font-cyber text-white">
                    {DEVELOPER_NAME}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    {DEVELOPER_TITLE}
                  </p>
                </div>
                <p className="text-[10px] text-slate-500 italic pt-2">
                  Hak Cipta Terpelihara © Sistem Pembelajaran Gamifikasi Matematik Tahun 6 KSSR Semakan.
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
