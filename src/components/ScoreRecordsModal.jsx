import React, { useState, useMemo } from 'react';
import { 
  X, Printer, Trophy, Star, Zap, CheckCircle2, 
  RotateCw, Calendar, Clock, User, School, GraduationCap, Award, Trash2,
  ChevronLeft, ChevronRight, Search, Filter, Plus, Swords, Timer, UserCheck
} from 'lucide-react';
import { 
  getRank, DEVELOPER_NAME, DEVELOPER_TITLE, 
  getAllMasterRecords, saveAllMasterRecords, clearMasterRecords,
  getClassesConfig
} from '../utils/storage';
import { sound } from '../utils/sound';

export default function ScoreRecordsModal({ 
  profile, 
  onClose, 
  onOpenProfile, 
  onClearRecords,
  onSwitchStudent
}) {
  const [selectedIsoDate, setSelectedIsoDate] = useState(null); // null = All dates, or 'YYYY-MM-DD'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClassFilter, setSelectedClassFilter] = useState('ALL');
  const [calendarMonthOffset, setCalendarMonthOffset] = useState(0); // 0 = current month
  const [quickAddName, setQuickAddName] = useState('');
  const [quickAddClass, setQuickAddClass] = useState('');
  const [showQuickAddForm, setShowQuickAddForm] = useState(false);

  // Master records from unified storage + profile records
  const masterRecords = getAllMasterRecords();
  const allRecords = useMemo(() => {
    // Merge master records and local profile records without duplicates
    const combined = [...masterRecords];
    (profile.scoreRecords || []).forEach(localRec => {
      if (!combined.some(r => r.id === localRec.id)) {
        combined.push(localRec);
      }
    });
    // Sort descending by timestamp
    return combined.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
  }, [masterRecords, profile.scoreRecords]);

  // Unique classes for filter
  const classList = useMemo(() => {
    const set = new Set();
    const configClasses = getClassesConfig();
    configClasses.forEach(c => set.add(c.name));
    allRecords.forEach(r => {
      if (r.studentClass) set.add(r.studentClass);
    });
    return Array.from(set);
  }, [allRecords]);

  // Calendar Date helper
  const now = new Date();
  const displayedDate = new Date(now.getFullYear(), now.getMonth() + calendarMonthOffset, 1);
  const displayedYear = displayedDate.getFullYear();
  const displayedMonth = displayedDate.getMonth(); // 0-11
  const displayedMonthName = displayedDate.toLocaleDateString('ms-MY', { month: 'long', year: 'numeric' });

  // Compute days in displayed month
  const daysInMonth = new Date(displayedYear, displayedMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(displayedYear, displayedMonth, 1).getDay(); // 0 = Sunday

  // Group records by isoDate for Calendar Badges
  const recordsByIsoDate = useMemo(() => {
    const map = {};
    allRecords.forEach(rec => {
      const iso = rec.isoDate || (rec.timestamp ? new Date(rec.timestamp).toISOString().split('T')[0] : null);
      if (iso) {
        if (!map[iso]) map[iso] = [];
        map[iso].push(rec);
      }
    });
    return map;
  }, [allRecords]);

  // Filtered records
  const filteredRecords = useMemo(() => {
    return allRecords.filter(rec => {
      // 1. Calendar Date Filter
      if (selectedIsoDate) {
        const recIso = rec.isoDate || (rec.timestamp ? new Date(rec.timestamp).toISOString().split('T')[0] : null);
        if (recIso !== selectedIsoDate) return false;
      }

      // 2. Class Filter
      if (selectedClassFilter !== 'ALL' && rec.studentClass !== selectedClassFilter) {
        return false;
      }

      // 3. Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const nameMatch = (rec.studentName || '').toLowerCase().includes(q);
        const classMatch = (rec.studentClass || '').toLowerCase().includes(q);
        const titleMatch = (rec.title || '').toLowerCase().includes(q);
        if (!nameMatch && !classMatch && !titleMatch) return false;
      }

      return true;
    });
  }, [allRecords, selectedIsoDate, selectedClassFilter, searchQuery]);

  // Group filtered records by date for timeline scrolling
  const groupedByDate = useMemo(() => {
    const groups = {};
    filteredRecords.forEach(rec => {
      const dateLabel = rec.date || 'Tarikh Tidak Dinyatakan';
      if (!groups[dateLabel]) groups[dateLabel] = [];
      groups[dateLabel].push(rec);
    });
    return groups;
  }, [filteredRecords]);

  const handlePrint = () => {
    sound.playClick();
    window.print();
  };

  const handleClearAll = () => {
    sound.playClick();
    if (window.confirm('Adakah anda pasti ingin memadam semua rekod markah kalendar murid ini?')) {
      clearMasterRecords();
      if (onClearRecords) onClearRecords();
    }
  };

  const handleQuickRegister = (e) => {
    e.preventDefault();
    if (!quickAddName.trim()) return;
    sound.playSuccess();
    if (onSwitchStudent) {
      onSwitchStudent(quickAddName.trim(), quickAddClass.trim() || '6 Inovatif');
    }
    setShowQuickAddForm(false);
    setQuickAddName('');
    setQuickAddClass('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-slate-900 border border-cyan-800/80 rounded-3xl shadow-2xl overflow-hidden my-4 flex flex-col max-h-[92vh]">
        
        {/* Top Control Bar (Hidden on print) */}
        <div className="no-print p-4 sm:p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-950/80 border border-amber-500/40 text-amber-400">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-cyber font-bold text-base sm:text-lg text-white">
                PAPARAN MARKAH & KALENDAR AKTIVITI MURID
              </h3>
              <p className="text-xs text-slate-400 font-tech">
                LOG HARIAN • KEMENANGAN MISI • REKOD PBD BILIK DARJAH
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-cyber font-bold text-xs flex items-center gap-1.5 shadow-md transition-all hover:scale-105"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Cetak Laporan</span>
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

        {/* Scrollable Container Body */}
        <div className="p-4 sm:p-6 space-y-6 overflow-y-auto flex-1">
          
          {/* Printable Header Box (Visible on Print) */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-cyan-900/60 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-inner">
            <div className="space-y-1">
              <span className="text-[11px] font-tech text-cyan-400 font-bold uppercase tracking-wider">
                SISTEM PENTAKSIRAN GAMIFIKASI MATEMATIK TAHUN 6 KSSR SEMAKAN
              </span>
              <h2 className="text-xl sm:text-2xl font-cyber font-bold text-white flex items-center gap-2">
                <User className="w-5 h-5 text-cyan-400 shrink-0" />
                <span>EJEN SEMASA: {profile.agentName.toUpperCase()}</span>
              </h2>
              <div className="flex flex-wrap items-center gap-3 text-xs font-tech text-slate-300">
                <span className="text-amber-300 font-bold">KELAS: {profile.selectedGrade ? `${profile.selectedGrade} — ` : ''}{profile.studentClass}</span>
                <span>•</span>
                <span className="text-slate-400">{profile.schoolName}</span>
                <span>•</span>
                <span className="text-cyan-400 font-semibold">JUMLAH REKOD: {allRecords.length} KEMENANGAN</span>
              </div>
            </div>

            {/* Quick Switch Student Button (Hidden on Print) */}
            <div className="no-print flex items-center gap-2 shrink-0">
              <button
                onClick={() => {
                  sound.playClick();
                  setShowQuickAddForm(prev => !prev);
                }}
                className="px-3.5 py-2 rounded-xl bg-cyan-950 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-900/60 text-xs font-cyber font-bold flex items-center gap-1.5 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Tukar / Tambah Murid</span>
              </button>
            </div>
          </div>

          {/* Quick Register / Switch Student Form Modal */}
          {showQuickAddForm && (
            <form 
              onSubmit={handleQuickRegister}
              className="no-print p-4 rounded-2xl bg-slate-950 border border-cyan-500/50 space-y-3 animate-fadeIn"
            >
              <h4 className="text-xs font-cyber font-bold text-cyan-300">
                TUKAR GILIRAN MURID (SESI BILIK DARJAH)
              </h4>
              <p className="text-[11px] text-slate-400 font-tech">
                Masukkan nama murid seterusnya yang ingin bermain. Rekod markah akan disimpan atas nama mereka mengikut tarikh kalendar hari ini.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Nama Murid (cth: Ahmad Zikri)"
                  value={quickAddName}
                  onChange={(e) => setQuickAddName(e.target.value)}
                  className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-tech text-white focus:outline-none focus:border-cyan-400"
                />
                <input
                  type="text"
                  placeholder="Kelas (cth: 6 Cemerlang)"
                  value={quickAddClass}
                  onChange={(e) => setQuickAddClass(e.target.value)}
                  className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-tech text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowQuickAddForm(false)}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 text-xs text-slate-400 hover:text-white"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-cyber font-bold text-xs"
                >
                  Aktifkan Murid Ini
                </button>
              </div>
            </form>
          )}

          {/* ======================================================== */}
          {/* SECTION 1: INTERACTIVE CALENDAR SELECTOR (NO PRINT)      */}
          {/* ======================================================== */}
          <div className="no-print p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
            
            {/* Calendar Month Header & Navigation */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-cyan-400" />
                <span className="font-cyber font-bold text-sm text-white uppercase">
                  {displayedMonthName}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setCalendarMonthOffset(prev => prev - 1)}
                  className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300"
                  title="Bulan Sebelumnya"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setCalendarMonthOffset(0)}
                  className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-[11px] font-tech text-cyan-300"
                >
                  Bulan Ini
                </button>
                <button
                  onClick={() => setCalendarMonthOffset(prev => prev + 1)}
                  className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300"
                  title="Bulan Seterusnya"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Calendar Days Grid */}
            <div className="grid grid-cols-7 gap-1 text-center font-tech text-xs">
              {['Ahd', 'Isn', 'Sel', 'Rab', 'Kha', 'Jum', 'Sab'].map((d, i) => (
                <div key={i} className="py-1 text-[11px] font-bold text-slate-500">
                  {d}
                </div>
              ))}

              {/* Empty leading days */}
              {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                <div key={`empty-${i}`} className="h-10 rounded-lg bg-transparent"></div>
              ))}

              {/* Day cells */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const dayNum = i + 1;
                const mStr = String(displayedMonth + 1).padStart(2, '0');
                const dStr = String(dayNum).padStart(2, '0');
                const dayIso = `${displayedYear}-${mStr}-${dStr}`;

                const dayRecords = recordsByIsoDate[dayIso] || [];
                const hasRecords = dayRecords.length > 0;
                const isSelected = selectedIsoDate === dayIso;

                return (
                  <button
                    key={dayIso}
                    onClick={() => {
                      sound.playClick();
                      if (isSelected) {
                        setSelectedIsoDate(null); // Unselect to show all
                      } else {
                        setSelectedIsoDate(dayIso);
                      }
                    }}
                    className={`h-11 rounded-xl flex flex-col items-center justify-center p-1 transition-all relative ${
                      isSelected
                        ? 'bg-cyan-500 text-slate-950 font-extrabold ring-2 ring-cyan-300 shadow-lg scale-105 z-10'
                        : hasRecords
                        ? 'bg-cyan-950/70 border border-cyan-500/50 text-cyan-200 hover:bg-cyan-900/60'
                        : 'bg-slate-900/50 hover:bg-slate-900 text-slate-400'
                    }`}
                  >
                    <span className="text-xs">{dayNum}</span>
                    {hasRecords && (
                      <span className={`text-[9px] font-bold px-1 rounded-full ${
                        isSelected ? 'bg-slate-950 text-cyan-300' : 'bg-emerald-500 text-slate-950'
                      }`}>
                        {dayRecords.length}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Calendar Filter Indicator & Reset */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-900 text-xs font-tech">
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Penapis Kalendar:</span>
                {selectedIsoDate ? (
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-950 border border-cyan-400 text-cyan-300 font-bold">
                    Tarikh Dipilih: {selectedIsoDate} ({filteredRecords.length} rekod)
                  </span>
                ) : (
                  <span className="text-slate-500 italic">Semua Tarikh Dipaparkan ({allRecords.length} rekod)</span>
                )}
              </div>

              {selectedIsoDate && (
                <button
                  onClick={() => setSelectedIsoDate(null)}
                  className="text-[11px] text-cyan-400 hover:underline font-bold"
                >
                  Papar Semua Tarikh
                </button>
              )}
            </div>

          </div>

          {/* ======================================================== */}
          {/* SECTION 2: SEARCH & FILTER BAR                           */}
          {/* ======================================================== */}
          <div className="no-print flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Cari nama murid, kelas, atau aktiviti..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-tech text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-500" />
              <select
                value={selectedClassFilter}
                onChange={(e) => setSelectedClassFilter(e.target.value)}
                className="px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-tech text-cyan-300 focus:outline-none"
              >
                <option value="ALL">Semua Kelas ({allRecords.length})</option>
                {classList.map(cls => (
                  <option key={cls} value={cls}>Kelas: {cls}</option>
                ))}
              </select>
            </div>
          </div>

          {/* ======================================================== */}
          {/* SECTION 3: SCROLLABLE FEED REKOD MARKAH IKUT KALENDAR    */}
          {/* ======================================================== */}
          <div className="space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h4 className="font-cyber font-bold text-sm text-slate-200 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
                <span>SENARAI REKOD MARKAH MENGIKUT KALENDAR ({filteredRecords.length})</span>
              </h4>

              {allRecords.length > 0 && (
                <button
                  onClick={handleClearAll}
                  className="no-print text-[11px] font-tech text-rose-400 hover:text-rose-300 flex items-center gap-1 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Kosongkan Semua Log</span>
                </button>
              )}
            </div>

            {/* Scrollable Container with Date Grouping */}
            <div className="space-y-6 max-h-[55vh] overflow-y-auto pr-1">
              
              {Object.keys(groupedByDate).length > 0 ? (
                Object.entries(groupedByDate).map(([dateLabel, records]) => (
                  <div key={dateLabel} className="space-y-2">
                    
                    {/* Sticky Date Timeline Badge */}
                    <div className="sticky top-0 z-10 py-1 bg-slate-900/95 backdrop-blur-sm border-b border-cyan-950 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                        <span className="font-cyber font-bold text-xs text-cyan-300 uppercase">
                          {dateLabel}
                        </span>
                      </div>
                      <span className="text-[10px] font-tech text-slate-400 px-2 py-0.5 rounded-full bg-slate-950 border border-slate-800">
                        {records.length} Aktiviti Selesai
                      </span>
                    </div>

                    {/* Cards Grid / Table for this date */}
                    <div className="grid grid-cols-1 gap-2.5">
                      {records.map((rec) => (
                        <div 
                          key={rec.id}
                          className="p-3.5 sm:p-4 rounded-2xl bg-slate-950/90 hover:bg-slate-950 border border-slate-800/80 hover:border-cyan-800 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md"
                        >
                          {/* Student & Class Info */}
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-lg shrink-0">
                              {rec.avatarId === 'agent-zetta' ? '🤖' : rec.avatarId === 'agent-luna' ? '🕵️‍♀️' : rec.avatarId === 'agent-orion' ? '🚀' : '⚡'}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h5 className="font-cyber font-bold text-sm text-white">
                                  {rec.studentName}
                                </h5>
                                <span className="text-[10px] font-tech font-bold px-2 py-0.5 rounded-full bg-amber-950/80 border border-amber-600/40 text-amber-300">
                                  {rec.studentClass}
                                </span>
                              </div>
                              <p className="text-xs text-cyan-300 font-semibold mt-0.5">
                                {rec.title}
                              </p>
                              <div className="flex items-center gap-2 text-[10px] font-tech text-slate-500 mt-0.5">
                                <Clock className="w-3 h-3" />
                                <span>{rec.time}</span>
                                <span>•</span>
                                <span>{rec.category || 'Misi Siasatan'}</span>
                              </div>
                            </div>
                          </div>

                          {/* Score & Victory Status */}
                          <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 border-slate-900 pt-2 sm:pt-0">
                            <div className="text-left sm:text-right">
                              <p className="text-sm font-extrabold font-cyber text-amber-400">
                                +{rec.score || rec.xp || 100} MATA
                              </p>
                              {rec.stars ? (
                                <div className="flex items-center gap-1 justify-start sm:justify-end text-amber-400">
                                  {[1, 2, 3].map(st => (
                                    <Star 
                                      key={st} 
                                      className={`w-3 h-3 ${st <= rec.stars ? 'fill-amber-400 text-amber-400' : 'text-slate-700'}`} 
                                    />
                                  ))}
                                  <span className="text-[10px] text-slate-400 font-tech ml-1">+{rec.xp} XP</span>
                                </div>
                              ) : (
                                <p className="text-[10px] font-tech text-emerald-400">
                                  {rec.accuracy || '100% K.O'}
                                </p>
                              )}
                            </div>

                            <div className="shrink-0">
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700/60 font-cyber font-bold text-[10px] shadow-sm">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                MENANG
                              </span>
                            </div>
                          </div>

                        </div>
                      ))}
                    </div>

                  </div>
                ))
              ) : (
                /* Empty Feed Prompt */
                <div className="p-12 rounded-2xl bg-slate-950/40 border border-dashed border-slate-800 text-center space-y-3">
                  <Trophy className="w-10 h-10 text-slate-600 mx-auto" />
                  <h4 className="text-sm font-bold font-cyber text-slate-300">
                    Tiada Rekod Dijumpai Untuk Tapisan Ini
                  </h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto font-tech">
                    {selectedIsoDate
                      ? `Tiada murid bermain pada tarikh ${selectedIsoDate}. Pilih tarikh lain atau tekan butang 'Papar Semua Tarikh'.`
                      : 'Mulakan Misi Siasatan atau Pertarungan Bos Roda Sifir untuk mula mencatat markah murid mengikut kalendar!'}
                  </p>
                </div>
              )}

            </div>

          </div>

          {/* ======================================================== */}
          {/* SECTION 4: TEACHER SIGN-OFF & DEVELOPER ATTRIBUTION      */}
          {/* ======================================================== */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 pt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs font-tech text-slate-400">
              
              {/* Teacher Assessment */}
              <div className="space-y-2 border-b sm:border-b-0 sm:border-r border-slate-800 pb-4 sm:pb-0 sm:pr-4">
                <p className="font-bold text-slate-300 uppercase">ULASAN & PENGESAHAN GURU MATEMATIK:</p>
                <div className="h-14 rounded-xl border border-dashed border-slate-700 p-2 text-slate-500 italic text-[11px]">
                  [Ruang untuk tandatangan guru, markah PBD, dan ulasan bimbingan bilik darjah...]
                </div>
                <div className="flex justify-between text-[11px] pt-1">
                  <span>Nama Guru: _____________________</span>
                  <span>Tarikh Cetakan: {now.toLocaleDateString('ms-MY')}</span>
                </div>
              </div>

              {/* Developer Attribution Box */}
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
