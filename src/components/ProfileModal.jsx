import React, { useState } from 'react';
import { X, User, School, Shield, Award, Star, Zap, Check, GraduationCap, Code } from 'lucide-react';
import { AVATARS, getRank, DEVELOPER_NAME, DEVELOPER_TITLE } from '../utils/storage';
import { sound } from '../utils/sound';

export default function ProfileModal({ profile, onSaveProfile, onClose }) {
  const [name, setName] = useState(profile.agentName || 'Ejen Pelajar');
  const [codename, setCodename] = useState(profile.agentCodename || 'ARMS-007');
  const [studentClass, setStudentClass] = useState(profile.studentClass || '6 Inovatif');
  const [school, setSchool] = useState(profile.schoolName || 'SK Ranggu');
  const [selectedAvatar, setSelectedAvatar] = useState(profile.avatarId || 'agent-kilat');

  const rank = getRank(profile.xp);
  const totalStars = Object.values(profile.caseScores || {}).reduce((acc, curr) => acc + (curr.stars || 0), 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    sound.playSuccess();
    onSaveProfile({
      ...profile,
      agentName: name.trim() || 'Ejen Pelajar',
      agentCodename: codename.trim() || 'ARMS-007',
      studentClass: studentClass.trim() || '6 Inovatif',
      schoolName: school.trim() || 'SK Ranggu',
      avatarId: selectedAvatar
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-lg bg-slate-900 border border-cyan-800/60 rounded-3xl shadow-2xl overflow-hidden my-4">
        
        {/* Header */}
        <div className="p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Shield className="w-5 h-5 text-cyan-400" />
            <h3 className="font-cyber font-bold text-base text-white">
              KAD PENGENALAN EJEN & REKOD MURID
            </h3>
          </div>
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

        {/* Content Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          
          {/* Detective Badge Preview */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-cyan-900/60 flex items-center gap-4 shadow-inner">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-3xl shadow-lg shadow-cyan-950 border border-cyan-300/40 shrink-0">
              {AVATARS.find(a => a.id === selectedAvatar)?.emoji || '⚡'}
            </div>
            <div className="space-y-1 overflow-hidden">
              <span className={`text-xs font-tech font-bold ${rank.color}`}>
                {rank.icon} {rank.title} (Tahap {rank.level})
              </span>
              <h4 className="text-lg font-bold font-cyber text-white truncate">
                {name || 'Ejen Tanpa Nama'}
              </h4>
              <p className="text-xs text-slate-300 font-tech truncate">
                KELAS: <strong className="text-cyan-300">{studentClass}</strong> | {school}
              </p>
              <div className="flex items-center gap-3 pt-1 text-xs font-tech">
                <span className="text-amber-400 flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-current" /> {totalStars} Bintang
                </span>
                <span className="text-cyan-400 flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5" /> {profile.xp} XP
                </span>
              </div>
            </div>
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
                  className={`p-3 rounded-xl border text-center transition-all ${
                    selectedAvatar === av.id
                      ? 'bg-cyan-950/80 border-cyan-400 shadow-md shadow-cyan-950'
                      : 'bg-slate-950/60 hover:bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  <div className="text-2xl mb-1">{av.emoji}</div>
                  <p className="text-xs font-bold text-slate-200">{av.name}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Form Fields: Name, Class, School, Codename */}
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-tech text-slate-400 mb-1">NAMA PENUH MURID / EJEN:</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Muhammad Arif Bin Faizal"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-200 focus:outline-none focus:border-cyan-500 font-medium"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-tech text-slate-400 mb-1">KELAS TAHUN 6:</label>
                <input
                  type="text"
                  required
                  value={studentClass}
                  onChange={(e) => setStudentClass(e.target.value)}
                  placeholder="Contoh: 6 Inovatif"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-cyan-300 focus:outline-none focus:border-cyan-500 font-tech font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-tech text-slate-400 mb-1">KOD EJEN ARMS:</label>
                <input
                  type="text"
                  required
                  value={codename}
                  onChange={(e) => setCodename(e.target.value)}
                  placeholder="ARMS-007"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-200 focus:outline-none focus:border-cyan-500 font-tech"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-tech text-slate-400 mb-1">NAMA SEKOLAH:</label>
              <input
                type="text"
                required
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                placeholder="Contoh: SK Ranggu"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* Developer Credit Attribution Box */}
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-cyan-900/40 flex items-center gap-3">
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
          <div className="pt-2 flex justify-end gap-3">
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
              className="px-6 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-xs font-cyber font-bold text-white flex items-center gap-1.5 shadow-lg shadow-cyan-950 transition-all hover:scale-105"
            >
              <Check className="w-4 h-4" />
              <span>Simpan Profil & Rekod</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
