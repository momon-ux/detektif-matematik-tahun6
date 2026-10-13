import React, { useState, useMemo } from 'react';
import { 
  X, User, School, Shield, Award, Star, Zap, Check, 
  GraduationCap, Code, Search, CheckCircle2, ChevronRight, Edit3 
} from 'lucide-react';
import { 
  AVATARS, 
  getRank, 
  DEVELOPER_NAME, 
  DEVELOPER_TITLE, 
  getClassesConfig 
} from '../utils/storage';
import { sound } from '../utils/sound';

export default function ProfileModal({ profile, onSaveProfile, onClose }) {
  // Load dynamic classes
  const classesData = useMemo(() => getClassesConfig(), []);

  // Determine initial Year and Class
  const initialYear = profile.selectedGrade || (classesData.find(c => c.name === profile.studentClass)?.year || 'Tahun 6');
  const [selectedYear, setSelectedYear] = useState(initialYear);

  // Available classes for selected year
  const classesInYear = useMemo(() => {
    return classesData.filter(c => c.year === selectedYear);
  }, [classesData, selectedYear]);

  // Current selected class name
  const [studentClass, setStudentClass] = useState(() => {
    if (classesInYear.some(c => c.name === profile.studentClass)) {
      return profile.studentClass;
    }
    return classesInYear[0]?.name || classesData[0]?.name || '6 Khoir';
  });

  // Active class object
  const activeClassObj = useMemo(() => {
    return classesData.find(c => c.name === studentClass) || classesInYear[0] || classesData[0];
  }, [classesData, studentClass, classesInYear]);

  // Student name, search query & manual typing mode
  const [name, setName] = useState(profile.agentName || 'Ahmad Farhan bin Abdullah');
  const [nameSearch, setNameSearch] = useState('');
  const [isManualInput, setIsManualInput] = useState(false);

  // Other profile fields
  const [codename, setCodename] = useState(profile.agentCodename || 'ARMS-007');
  const [school, setSchool] = useState(profile.schoolName || 'SK Ranggu');
  const [selectedAvatar, setSelectedAvatar] = useState(profile.avatarId || 'agent-kilat');

  const rank = getRank(profile.xp);
  const totalStars = Object.values(profile.caseScores || {}).reduce((acc, curr) => acc + (curr.stars || 0), 0);

  // Unique years available
  const availableYears = useMemo(() => {
    const set = new Set(classesData.map(c => c.year));
    return Array.from(set);
  }, [classesData]);

  // Filtered roster for active class
  const filteredStudents = useMemo(() => {
    const list = activeClassObj?.students || [];
    if (!nameSearch.trim()) return list;
    return list.filter(st => st.toLowerCase().includes(nameSearch.toLowerCase()));
  }, [activeClassObj, nameSearch]);

  const handleYearChange = (year) => {
    sound.playClick();
    setSelectedYear(year);
    const inThisYear = classesData.filter(c => c.year === year);
    if (inThisYear.length > 0) {
      setStudentClass(inThisYear[0].name);
      // Select first student of the class if available
      if (inThisYear[0].students.length > 0) {
        setName(inThisYear[0].students[0]);
      }
    }
  };

  const handleClassChange = (clsName) => {
    sound.playClick();
    setStudentClass(clsName);
    const found = classesData.find(c => c.name === clsName);
    if (found && found.students.length > 0) {
      // If current name is not in this new class, select first student
      if (!found.students.includes(name)) {
        setName(found.students[0]);
      }
    }
  };

  const handleSelectStudent = (stName) => {
    sound.playClick();
    setName(stName);
    setIsManualInput(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sound.playSuccess();
    onSaveProfile({
      ...profile,
      agentName: name.trim() || 'Ejen Pelajar',
      agentCodename: codename.trim() || 'ARMS-007',
      studentClass: studentClass.trim() || '6 Khoir',
      selectedGrade: selectedYear,
      schoolName: school.trim() || 'SK Ranggu',
      avatarId: selectedAvatar
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-cyan-800/80 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[94vh] flex flex-col">
        
        {/* Header */}
        <div className="p-3.5 sm:p-4 bg-slate-950 border-b border-cyan-900/50 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-cyan-950/90 border border-cyan-500/40 text-cyan-400">
              <Shield className="w-4 h-4 text-cyan-400" />
            </div>
            <div>
              <h3 className="font-cyber font-bold text-sm sm:text-base text-white">
                KAD PENGENALAN EJEN & REKOD MURID
              </h3>
              <p className="text-[10px] text-cyan-400 font-tech">
                SILA PILIH TAHUN, KELAS & NAMA ANDA UNTUK MERIKODKAN MARKAH
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          
          {/* Detective Badge Preview */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-950 border border-cyan-900/60 flex items-center gap-3.5 shadow-inner">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-3xl shadow-lg shadow-cyan-950 border border-cyan-300/40 shrink-0">
              {AVATARS.find(a => a.id === selectedAvatar)?.emoji || '⚡'}
            </div>
            <div className="space-y-1 min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <span className={`text-[11px] font-tech font-bold ${rank.color}`}>
                  {rank.icon} {rank.title} (Tahap {rank.level})
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800/60">
                  {codename}
                </span>
              </div>
              <h4 className="text-base sm:text-lg font-bold font-cyber text-white truncate">
                {name || 'Ejen Tanpa Nama'}
              </h4>
              <p className="text-xs text-slate-300 font-tech truncate">
                <strong className="text-cyan-300">{selectedYear} — {studentClass}</strong> | {school}
              </p>
              <div className="flex items-center gap-3 pt-0.5 text-xs font-tech">
                <span className="text-amber-400 flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-current" /> {totalStars} Bintang
                </span>
                <span className="text-cyan-400 flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5" /> {profile.xp} XP
                </span>
              </div>
            </div>
          </div>

          {/* STEP 1: PILIHAN TAHUN & KELAS */}
          <div className="space-y-2.5 p-3.5 rounded-2xl bg-slate-950/80 border border-cyan-900/50">
            <div className="flex items-center justify-between">
              <label className="text-xs font-tech text-cyan-300 font-bold flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-cyan-400" />
                1. PILIH TAHUN & KELAS ANDA:
              </label>
              <span className="text-[10px] text-slate-400 font-tech">
                SK Ranggu (Ustaz / Cikgu Mohammad Fikrey)
              </span>
            </div>

            {/* Year Selector */}
            <div className="flex gap-2">
              {availableYears.map(yr => (
                <button
                  type="button"
                  key={yr}
                  onClick={() => handleYearChange(yr)}
                  className={`flex-1 py-2 px-3 rounded-xl border text-xs font-cyber font-bold transition-all flex items-center justify-center gap-1.5 ${
                    selectedYear === yr
                      ? 'bg-gradient-to-r from-cyan-600 to-blue-600 border-cyan-400 text-white shadow-md shadow-cyan-950 scale-[1.02]'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-850'
                  }`}
                >
                  <span>{yr}</span>
                  {selectedYear === yr && <Check className="w-3.5 h-3.5 text-white" />}
                </button>
              ))}
            </div>

            {/* Class Selector for Selected Year */}
            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 font-tech uppercase tracking-wider block">
                PILIH KELAS ({selectedYear}):
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {classesInYear.map(cls => (
                  <button
                    type="button"
                    key={cls.id}
                    onClick={() => handleClassChange(cls.name)}
                    className={`py-2 px-3 rounded-xl border text-xs font-cyber font-bold text-center transition-all ${
                      studentClass === cls.name
                        ? 'bg-cyan-950/90 border-cyan-400 text-cyan-300 shadow-md shadow-cyan-950 scale-[1.02]'
                        : 'bg-slate-900/90 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    <div>{cls.name}</div>
                    <div className="text-[10px] font-tech font-normal text-slate-500">
                      {cls.students.length} Murid
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* STEP 2: SCROLL SENARAI NAMA MURID */}
          <div className="space-y-2 p-3.5 rounded-2xl bg-slate-950/80 border border-cyan-900/50">
            <div className="flex items-center justify-between">
              <label className="text-xs font-tech text-cyan-300 font-bold flex items-center gap-1.5">
                <User className="w-4 h-4 text-cyan-400" />
                2. SCROLL & PILIH NAMA ANDA ({studentClass}):
              </label>
              
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setIsManualInput(!isManualInput);
                }}
                className="text-[11px] font-tech text-cyan-400 hover:text-cyan-300 underline flex items-center gap-1"
              >
                <Edit3 className="w-3 h-3" />
                <span>{isManualInput ? 'Pilih Dari Senarai' : 'Taip Nama Manual'}</span>
              </button>
            </div>

            {/* Manual Type Fallback */}
            {isManualInput ? (
              <div className="space-y-1.5 animate-fadeIn">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Taip nama penuh murid anda..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-cyan-500 text-sm text-cyan-200 focus:outline-none font-medium"
                />
                <p className="text-[10px] text-slate-400 font-tech">
                  Mod input manual aktif. Anda boleh menaip nama anda terus sekiranya nama tiada dalam senarai kelas.
                </p>
              </div>
            ) : (
              /* Scrollable List */
              <div className="space-y-2">
                {/* Search / Filter input */}
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={nameSearch}
                    onChange={(e) => setNameSearch(e.target.value)}
                    placeholder="Cari nama anda... (taip untuk tapis pantas)"
                    className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500"
                  />
                  {nameSearch && (
                    <button
                      type="button"
                      onClick={() => setNameSearch('')}
                      className="absolute right-2.5 top-2 text-slate-500 hover:text-slate-300 text-xs"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Scroll Box */}
                <div className="border border-cyan-900/40 rounded-xl bg-slate-900/90 max-h-40 sm:max-h-48 overflow-y-auto divide-y divide-slate-850 p-1 shadow-inner">
                  {filteredStudents.length === 0 ? (
                    <div className="p-4 text-center text-xs text-slate-400">
                      Nama tidak dijumpai dalam carian. Anda boleh klik <button type="button" onClick={() => setIsManualInput(true)} className="text-cyan-400 underline font-bold">Taip Nama Manual</button>.
                    </div>
                  ) : (
                    filteredStudents.map((stName, idx) => {
                      const isSelected = name.toLowerCase() === stName.toLowerCase();
                      return (
                        <button
                          type="button"
                          key={stName}
                          onClick={() => handleSelectStudent(stName)}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-all ${
                            isSelected
                              ? 'bg-cyan-950 border border-cyan-500 text-cyan-200 shadow-sm shadow-cyan-950 font-bold'
                              : 'hover:bg-slate-800/80 text-slate-300 border border-transparent'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span className={`w-6 text-[10px] font-mono text-right shrink-0 ${isSelected ? 'text-cyan-400 font-bold' : 'text-slate-500'}`}>
                              {idx + 1}.
                            </span>
                            <span className="text-xs truncate">
                              {stName}
                            </span>
                          </div>
                          {isSelected && (
                            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                          )}
                        </button>
                      );
                    })
                  )}
                </div>

                <div className="text-[11px] text-slate-400 font-tech flex items-center justify-between px-1">
                  <span>Murid dipilih: <strong className="text-cyan-300">{name}</strong></span>
                  <span className="text-slate-500">Jumlah: {activeClassObj?.students?.length || 0} orang</span>
                </div>
              </div>
            )}
          </div>

          {/* Avatar Selector */}
          <div className="space-y-2">
            <label className="text-xs font-tech text-slate-400">PILIH AVATAR EJEN:</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {AVATARS.map((av) => (
                <button
                  type="button"
                  key={av.id}
                  onClick={() => {
                    sound.playClick();
                    setSelectedAvatar(av.id);
                  }}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    selectedAvatar === av.id
                      ? 'bg-cyan-950/80 border-cyan-400 shadow-md shadow-cyan-950'
                      : 'bg-slate-950/60 hover:bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  <div className="text-2xl mb-1">{av.emoji}</div>
                  <p className="text-xs font-bold text-slate-200 truncate">{av.name}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Extra Fields: Codename & School */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-tech text-slate-400 mb-1">KOD EJEN ARMS:</label>
              <input
                type="text"
                required
                value={codename}
                onChange={(e) => setCodename(e.target.value)}
                placeholder="ARMS-007"
                className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-tech"
              />
            </div>

            <div>
              <label className="block text-[10px] font-tech text-slate-400 mb-1">NAMA SEKOLAH:</label>
              <input
                type="text"
                required
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                placeholder="SK Ranggu"
                className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* Developer Credit Attribution Box */}
          <div className="p-3 rounded-xl bg-slate-950/80 border border-cyan-900/40 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-950 text-cyan-400">
              <Code className="w-4 h-4" />
            </div>
            <div className="text-left text-xs">
              <p className="text-[10px] text-slate-400 uppercase font-tech tracking-wider">PEMBANGUN SISTEM:</p>
              <p className="font-bold text-cyan-300 font-cyber">{DEVELOPER_NAME}</p>
              <p className="text-[10px] text-slate-500">{DEVELOPER_TITLE}</p>
            </div>
          </div>

          {/* Footer Submit */}
          <div className="pt-2 flex justify-end gap-3 shrink-0">
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-cyber text-slate-300"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-xs font-cyber font-bold text-white flex items-center gap-1.5 shadow-lg shadow-cyan-950 transition-all hover:scale-105"
            >
              <Check className="w-4 h-4" />
              <span>Sahkan Profil & Mula Main</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
