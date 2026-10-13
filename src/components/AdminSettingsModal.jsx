import React, { useState, useEffect } from 'react';
import { 
  X, Lock, Unlock, ShieldCheck, ShieldAlert, Users, 
  Plus, Trash2, RotateCcw, Copy, Check, Search, 
  GraduationCap, FolderPlus, UserPlus, AlertTriangle, Code, ArrowRight
} from 'lucide-react';
import { 
  ADMIN_ACCESS_CODE, 
  getClassesConfig, 
  saveClassesConfig, 
  resetClassesConfig,
  addClassToConfig,
  deleteClassFromConfig,
  addStudentToClass,
  addMultipleStudentsToClass,
  deleteStudentFromClass,
  DEVELOPER_NAME, 
  DEVELOPER_TITLE 
} from '../utils/storage';
import { sound } from '../utils/sound';

export default function AdminSettingsModal({ onClose, onConfigUpdated }) {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessCodeInput, setAccessCodeInput] = useState('');
  const [authError, setAuthError] = useState(false);

  // Active Tab: 'students' | 'classes' | 'system'
  const [activeTab, setActiveTab] = useState('students');

  // Classes & Students data
  const [classesData, setClassesData] = useState(() => getClassesConfig());
  const [selectedClassId, setSelectedClassId] = useState(() => {
    const list = getClassesConfig();
    return list.length > 0 ? list[0].id : '';
  });

  // Urus Murid state
  const [studentSearch, setStudentSearch] = useState('');
  const [newStudentName, setNewStudentName] = useState('');
  const [bulkNamesText, setBulkNamesText] = useState('');
  const [showBulkInput, setShowBulkInput] = useState(false);
  const [studentSuccessMsg, setStudentSuccessMsg] = useState('');

  // Urus Kelas state
  const [newClassYear, setNewClassYear] = useState('Tahun 6');
  const [newClassName, setNewClassName] = useState('');
  const [classSuccessMsg, setClassSuccessMsg] = useState('');

  // Backup / Reset state
  const [copiedBackup, setCopiedBackup] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  // Reload config
  const refreshConfig = () => {
    const data = getClassesConfig();
    setClassesData(data);
    if (!data.some(c => c.id === selectedClassId) && data.length > 0) {
      setSelectedClassId(data[0].id);
    }
    if (onConfigUpdated) onConfigUpdated(data);
  };

  const handleVerifyCode = (e) => {
    e.preventDefault();
    if (accessCodeInput.trim().toUpperCase() === ADMIN_ACCESS_CODE.toUpperCase()) {
      sound.playSuccess();
      setIsAuthenticated(true);
      setAuthError(false);
    } else {
      sound.playWrong();
      setAuthError(true);
    }
  };

  const currentClass = classesData.find(c => c.id === selectedClassId) || classesData[0];

  // Filtered students
  const filteredStudents = (currentClass?.students || []).filter(name => 
    name.toLowerCase().includes(studentSearch.toLowerCase())
  );

  // Add single student
  const handleAddStudent = (e) => {
    e.preventDefault();
    if (!newStudentName.trim() || !selectedClassId) return;
    sound.playClick();
    addStudentToClass(selectedClassId, newStudentName.trim());
    setNewStudentName('');
    refreshConfig();
    setStudentSuccessMsg(`Murid berjaya ditambah ke ${currentClass?.name}!`);
    setTimeout(() => setStudentSuccessMsg(''), 3000);
  };

  // Bulk add students
  const handleBulkAddStudents = () => {
    if (!bulkNamesText.trim() || !selectedClassId) return;
    const lines = bulkNamesText.split('\n').map(l => l.trim()).filter(Boolean);
    if (lines.length === 0) return;

    sound.playSuccess();
    addMultipleStudentsToClass(selectedClassId, lines);
    setBulkNamesText('');
    setShowBulkInput(false);
    refreshConfig();
    setStudentSuccessMsg(`${lines.length} orang murid berjaya ditambah ke ${currentClass?.name}!`);
    setTimeout(() => setStudentSuccessMsg(''), 3000);
  };

  // Delete student
  const handleDeleteStudent = (studentName) => {
    if (window.confirm(`Adakah anda pasti ingin mengeluarkan ${studentName} daripada kelas ${currentClass?.name}?`)) {
      sound.playClick();
      deleteStudentFromClass(selectedClassId, studentName);
      refreshConfig();
    }
  };

  // Add Class
  const handleAddClass = (e) => {
    e.preventDefault();
    const formattedName = newClassName.trim();
    if (!formattedName) return;

    // Check duplicate
    if (classesData.some(c => c.name.toLowerCase() === formattedName.toLowerCase())) {
      alert(`Kelas "${formattedName}" telah wujud.`);
      return;
    }

    sound.playSuccess();
    const updated = addClassToConfig(newClassYear, formattedName);
    setNewClassName('');
    refreshConfig();
    const newAdded = updated[updated.length - 1];
    if (newAdded) setSelectedClassId(newAdded.id);
    setClassSuccessMsg(`Kelas ${formattedName} (${newClassYear}) berjaya ditambah!`);
    setTimeout(() => setClassSuccessMsg(''), 3000);
  };

  // Delete Class
  const handleDeleteClass = (cls) => {
    if (classesData.length <= 1) {
      alert('Sistem memerlukan sekurang-kurangnya satu kelas berdaftar.');
      return;
    }
    if (window.confirm(`Padam kelas "${cls.name}" bersama senarai ${cls.students.length} orang murid?`)) {
      sound.playClick();
      deleteClassFromConfig(cls.id);
      refreshConfig();
    }
  };

  // Reset to defaults
  const handleResetToDefaults = () => {
    sound.playClick();
    resetClassesConfig();
    refreshConfig();
    setConfirmReset(false);
    alert('Senarai kelas dan murid telah diset semula ke tetapan asal guru.');
  };

  // Copy JSON backup
  const handleCopyBackup = () => {
    navigator.clipboard.writeText(JSON.stringify(classesData, null, 2));
    setCopiedBackup(true);
    sound.playClick();
    setTimeout(() => setCopiedBackup(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-cyan-800/80 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Header Bar */}
        <div className="p-3.5 sm:p-4 bg-slate-950 border-b border-cyan-900/50 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-cyan-950/90 border border-cyan-500/40 text-cyan-400">
              {isAuthenticated ? <Unlock className="w-4 h-4 text-emerald-400" /> : <Lock className="w-4 h-4 text-cyan-400" />}
            </div>
            <div>
              <h3 className="font-cyber font-bold text-sm sm:text-base text-white flex items-center gap-2">
                TETAPAN GURU & PENTADBIR KELAS
              </h3>
              <p className="text-[10px] text-cyan-400 font-tech">
                {isAuthenticated ? 'PANEL KAWALAN DILEPASKAN • MOD PENGURUSAN AKTIF' : 'PENGESAHAN KOD KESELAMATAN ARMS'}
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

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 text-slate-200">
          
          {/* STAGE 1: AUTHENTICATION LOCK */}
          {!isAuthenticated ? (
            <div className="py-6 max-w-md mx-auto text-center space-y-5">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-950 border border-cyan-500/30 flex items-center justify-center shadow-lg shadow-cyan-950/50">
                <Lock className="w-8 h-8 text-cyan-400 animate-pulse" />
              </div>
              
              <div className="space-y-1.5">
                <h4 className="text-base sm:text-lg font-cyber font-bold text-white">
                  KOD AKSES PENTADBIR GURU
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Sila masukkan kod laluan pentadbir guru untuk mengurus kelas serta mendaftar senarai nama murid.
                </p>
              </div>

              <form onSubmit={handleVerifyCode} className="space-y-4 pt-2">
                <div>
                  <input
                    type="password"
                    autoFocus
                    required
                    value={accessCodeInput}
                    onChange={(e) => {
                      setAccessCodeInput(e.target.value);
                      if (authError) setAuthError(false);
                    }}
                    placeholder="Masukkan Kod Laluan..."
                    className="w-full text-center px-4 py-2.5 rounded-xl bg-slate-950 border border-cyan-900/80 focus:border-cyan-400 text-sm font-tech tracking-widest text-cyan-200 placeholder:text-slate-600 focus:outline-none transition-colors"
                  />
                  {authError && (
                    <p className="mt-2 text-xs font-semibold text-rose-400 flex items-center justify-center gap-1.5 animate-bounce">
                      <ShieldAlert className="w-3.5 h-3.5" /> Kod akses tidak sah. Akses ditolak!
                    </p>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-cyber text-slate-300 transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-xs font-cyber font-bold text-white shadow-lg shadow-cyan-950 flex items-center justify-center gap-1.5 transition-transform active:scale-95"
                  >
                    <span>Sahkan Akses</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>

              <div className="pt-4 border-t border-slate-800/80 text-[11px] text-slate-500 font-tech">
                Pembangun: <strong className="text-slate-400">{DEVELOPER_NAME}</strong>
              </div>
            </div>
          ) : (
            /* STAGE 2: AUTHENTICATED ADMIN DASHBOARD */
            <div className="space-y-4">
              
              {/* Navigation Tabs */}
              <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setActiveTab('students');
                  }}
                  className={`flex-1 py-2 px-3 rounded-lg text-xs font-cyber font-bold flex items-center justify-center gap-1.5 transition-all ${
                    activeTab === 'students'
                      ? 'bg-cyan-600 text-white shadow-md shadow-cyan-950'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>Urus Murid</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setActiveTab('classes');
                  }}
                  className={`flex-1 py-2 px-3 rounded-lg text-xs font-cyber font-bold flex items-center justify-center gap-1.5 transition-all ${
                    activeTab === 'classes'
                      ? 'bg-cyan-600 text-white shadow-md shadow-cyan-950'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Urus Kelas ({classesData.length})</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setActiveTab('system');
                  }}
                  className={`flex-1 py-2 px-3 rounded-lg text-xs font-cyber font-bold flex items-center justify-center gap-1.5 transition-all ${
                    activeTab === 'system'
                      ? 'bg-cyan-600 text-white shadow-md shadow-cyan-950'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Set Semula / Backup</span>
                </button>
              </div>

              {/* TAB 1: URUS MURID */}
              {activeTab === 'students' && (
                <div className="space-y-4">
                  {/* Class Picker & Stats Banner */}
                  <div className="p-3 bg-slate-950 rounded-xl border border-cyan-900/60 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2 flex-1 min-w-[200px]">
                      <label className="text-xs font-tech text-cyan-400 shrink-0">PILIH KELAS:</label>
                      <select
                        value={selectedClassId}
                        onChange={(e) => {
                          setSelectedClassId(e.target.value);
                          sound.playClick();
                        }}
                        className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-cyan-300 font-tech font-bold focus:outline-none focus:border-cyan-500"
                      >
                        {classesData.map(cls => (
                          <option key={cls.id} value={cls.id}>
                            {cls.year} — {cls.name} ({cls.students.length} murid)
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-tech text-slate-400">
                        Jumlah: <strong className="text-amber-400 font-bold">{currentClass?.students?.length || 0}</strong> orang
                      </span>
                      <button
                        type="button"
                        onClick={() => setShowBulkInput(!showBulkInput)}
                        className="px-2.5 py-1 rounded-lg bg-cyan-950/80 hover:bg-cyan-900 text-[11px] font-cyber text-cyan-300 border border-cyan-700/50 flex items-center gap-1"
                      >
                        <UserPlus className="w-3 h-3" />
                        <span>{showBulkInput ? 'Tutup Pukal' : 'Tampal Pukal'}</span>
                      </button>
                    </div>
                  </div>

                  {studentSuccessMsg && (
                    <div className="p-2 rounded-lg bg-emerald-950/80 border border-emerald-600/60 text-emerald-300 text-xs font-semibold flex items-center gap-2">
                      <Check className="w-3.5 h-3.5" />
                      <span>{studentSuccessMsg}</span>
                    </div>
                  )}

                  {/* Bulk Input Box */}
                  {showBulkInput && (
                    <div className="p-3 bg-slate-950 rounded-xl border border-cyan-800 space-y-2 animate-fadeIn">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-tech text-cyan-300 font-bold">
                          TAMPAL SENARAI NAMA MURID (SATU NAMA SETIAP BARIS):
                        </label>
                        <span className="text-[10px] text-slate-500">Contoh dari Fail Excel / WhatsApp</span>
                      </div>
                      <textarea
                        rows={4}
                        value={bulkNamesText}
                        onChange={(e) => setBulkNamesText(e.target.value)}
                        placeholder={`Ahmad Farhan bin Abdullah\nNurul Ain binti Suhaimi\nMuhammad Faizal bin Karim`}
                        className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200 font-mono focus:outline-none focus:border-cyan-400"
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setShowBulkInput(false)}
                          className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300"
                        >
                          Batal
                        </button>
                        <button
                          type="button"
                          onClick={handleBulkAddStudents}
                          className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-cyber font-bold text-white shadow"
                        >
                          Simpan Semua Murid
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Add Single Student Form */}
                  <form onSubmit={handleAddStudent} className="flex gap-2">
                    <input
                      type="text"
                      value={newStudentName}
                      onChange={(e) => setNewStudentName(e.target.value)}
                      placeholder="Taip nama penuh murid baru..."
                      className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-xs font-cyber font-bold text-white flex items-center gap-1.5 shrink-0"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Tambah</span>
                    </button>
                  </form>

                  {/* Search Bar & Student List */}
                  <div className="space-y-2">
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        value={studentSearch}
                        onChange={(e) => setStudentSearch(e.target.value)}
                        placeholder="Cari murid dalam kelas ini..."
                        className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div className="border border-slate-800 rounded-xl bg-slate-950/60 max-h-56 overflow-y-auto divide-y divide-slate-850 p-1">
                      {filteredStudents.length === 0 ? (
                        <div className="py-6 text-center text-xs text-slate-500">
                          Tiada rekod murid dijumpai. Sila tambah murid baru.
                        </div>
                      ) : (
                        filteredStudents.map((stName, idx) => (
                          <div
                            key={stName}
                            className="flex items-center justify-between px-3 py-1.5 hover:bg-slate-900/80 rounded-lg group transition-colors"
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <span className="w-6 text-[10px] font-mono text-slate-500 text-right">
                                {idx + 1}.
                              </span>
                              <span className="text-xs font-medium text-slate-200 truncate">
                                {stName}
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleDeleteStudent(stName)}
                              className="p-1 rounded text-slate-500 hover:text-rose-400 hover:bg-rose-950/40 opacity-70 group-hover:opacity-100 transition-all"
                              title="Padam murid daripada senarai"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                </div>
              )}

              {/* TAB 2: URUS KELAS */}
              {activeTab === 'classes' && (
                <div className="space-y-4">
                  {classSuccessMsg && (
                    <div className="p-2 rounded-lg bg-emerald-950/80 border border-emerald-600/60 text-emerald-300 text-xs font-semibold flex items-center gap-2">
                      <Check className="w-3.5 h-3.5" />
                      <span>{classSuccessMsg}</span>
                    </div>
                  )}

                  {/* Add Class Form */}
                  <form onSubmit={handleAddClass} className="p-3.5 bg-slate-950 rounded-xl border border-cyan-900/60 space-y-3">
                    <label className="text-xs font-tech text-cyan-300 font-bold block">
                      TAMBAH KELAS BARU:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <div>
                        <label className="block text-[10px] text-slate-400 mb-1">TINGKATAN / TAHUN:</label>
                        <select
                          value={newClassYear}
                          onChange={(e) => setNewClassYear(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-tech"
                        >
                          <option value="Tahun 5">Tahun 5</option>
                          <option value="Tahun 6">Tahun 6</option>
                          <option value="Tahun 4">Tahun 4</option>
                        </select>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[10px] text-slate-400 mb-1">NAMA KELAS:</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            required
                            value={newClassName}
                            onChange={(e) => setNewClassName(e.target.value)}
                            placeholder="Contoh: 6 Khoir, 5 Mumtaz..."
                            className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-tech font-bold"
                          />
                          <button
                            type="submit"
                            className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-xs font-cyber font-bold text-white flex items-center gap-1 shrink-0"
                          >
                            <FolderPlus className="w-3.5 h-3.5" />
                            <span>Cipta Kelas</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>

                  {/* Classes List Cards */}
                  <div className="space-y-2">
                    <label className="text-xs font-tech text-slate-400">SENARAI KELAS AKTIF:</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-60 overflow-y-auto p-1">
                      {classesData.map(cls => (
                        <div
                          key={cls.id}
                          className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-800/80 flex items-center justify-between transition-colors"
                        >
                          <div>
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 font-tech">
                              {cls.year}
                            </span>
                            <h5 className="font-cyber font-bold text-sm text-white mt-1">
                              {cls.name}
                            </h5>
                            <p className="text-[11px] text-slate-400 font-tech">
                              {cls.students.length} orang murid berdaftar
                            </p>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => {
                                sound.playClick();
                                setSelectedClassId(cls.id);
                                setActiveTab('students');
                              }}
                              className="px-2 py-1 rounded bg-slate-800 hover:bg-cyan-950 hover:text-cyan-300 text-[10px] font-cyber text-slate-300 transition-colors"
                            >
                              Buka
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteClass(cls)}
                              className="p-1 rounded text-slate-500 hover:text-rose-400 hover:bg-rose-950/40 transition-colors"
                              title="Padam kelas"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {/* TAB 3: SISTEM & BACKUP */}
              {activeTab === 'system' && (
                <div className="space-y-4">
                  {/* Backup Card */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <h5 className="text-xs font-cyber font-bold text-cyan-300 flex items-center gap-2">
                      <Copy className="w-4 h-4 text-cyan-400" />
                      SALIN DATA KELAS & SENARAI NAMA (BACKUP)
                    </h5>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Salin keseluruhan senarai kelas dan nama murid dalam format JSON untuk sandaran atau perpindahan ke peranti lain.
                    </p>
                    <button
                      type="button"
                      onClick={handleCopyBackup}
                      className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-tech text-cyan-300 flex items-center gap-1.5 border border-slate-700"
                    >
                      {copiedBackup ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedBackup ? 'Berjaya Disalin ke Papan Keratan!' : 'Salin Data JSON'}</span>
                    </button>
                  </div>

                  {/* Reset Defaults */}
                  <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/60 space-y-3">
                    <h5 className="text-xs font-cyber font-bold text-rose-400 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-rose-400" />
                      SET SEMULA KE SENARAI ASAL GURU
                    </h5>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Menetapkan semula semua kelas kepada 8 kelas utama SK Ranggu: <strong>Tahun 5 & Tahun 6 (Khoir, Mumtaz, Jahid, Eltizam)</strong> dengan senarai 282 orang murid asal.
                    </p>
                    {!confirmReset ? (
                      <button
                        type="button"
                        onClick={() => setConfirmReset(true)}
                        className="px-3.5 py-1.5 rounded-lg bg-rose-900/60 hover:bg-rose-800 text-xs font-cyber text-rose-200 border border-rose-700"
                      >
                        Set Semula Roster Asal
                      </button>
                    ) : (
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={handleResetToDefaults}
                          className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-xs font-cyber font-bold text-white shadow"
                        >
                          Pasti, Teruskan Set Semula
                        </button>
                        <button
                          type="button"
                          onClick={() => setConfirmReset(false)}
                          className="px-3 py-1.5 rounded-lg bg-slate-800 text-xs text-slate-300"
                        >
                          Batal
                        </button>
                      </div>
                    )}
                  </div>

                  {/* System & Developer Credits */}
                  <div className="p-3 rounded-xl bg-slate-950 border border-cyan-900/30 flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-cyan-950 text-cyan-400">
                      <Code className="w-4 h-4" />
                    </div>
                    <div className="text-xs">
                      <p className="text-[10px] text-slate-400 font-tech">PEMBANGUN SISTEM:</p>
                      <p className="font-cyber font-bold text-cyan-300">{DEVELOPER_NAME}</p>
                      <p className="text-[10px] text-slate-500">{DEVELOPER_TITLE}</p>
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

        </div>

        {/* Footer */}
        {isAuthenticated && (
          <div className="p-3 bg-slate-950 border-t border-slate-850 flex items-center justify-between text-xs font-tech shrink-0">
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setIsAuthenticated(false);
                setAccessCodeInput('');
              }}
              className="text-slate-500 hover:text-slate-300 flex items-center gap-1"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Kunci Semula Panel</span>
            </button>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 font-cyber text-slate-200"
            >
              Selesai / Tutup
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
