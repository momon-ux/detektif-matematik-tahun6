import React, { useState } from 'react';
import { 
  ArrowLeft, Home, Zap, Award, CheckCircle2, Lock, Play, 
  Sparkles, HelpCircle, ChevronRight, RotateCcw, User, Hammer,
  Compass, MapPin, Star, AlertCircle, ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/sound';
import { QUEST_STEPS, QUEST_ZONES } from '../data/questData';
import { 
  advanceQuestStep, AVATARS, saveProfile, DEVELOPER_NAME, DEVELOPER_TITLE, getRank 
} from '../utils/storage';

export default function AdventureQuest({
  profile,
  onUpdateProfile,
  onBack,
  onNavigateWorld,
  onNavigateShooter,
  onNavigateRoda
}) {
  const currentStepId = profile.questStep || 1;
  const completedSteps = profile.questCompletedSteps || [];
  const currentRank = getRank(profile.xp);
  const currentAvatar = AVATARS.find(a => a.id === profile.avatarId) || AVATARS[0];

  const [activeStepData, setActiveStepData] = useState(() => {
    return QUEST_STEPS.find(s => s.stepId === currentStepId) || QUEST_STEPS[0];
  });
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [showVictoryModal, setShowVictoryModal] = useState(false);
  const [earnedXp, setEarnedXp] = useState(0);

  // Select a step to view or play
  const handleSelectStep = (step) => {
    sound.playClick();
    setActiveStepData(step);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setIsAnswerCorrect(false);
    setShowHint(false);
  };

  // Answer question
  const handleOptionSelect = (index) => {
    if (isAnswerSubmitted && isAnswerCorrect) return;
    sound.playClick();
    setSelectedOption(index);
  };

  // Submit Answer
  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;

    if (selectedOption === activeStepData.correctIndex) {
      sound.playSuccess();
      setIsAnswerSubmitted(true);
      setIsAnswerCorrect(true);
      setEarnedXp(activeStepData.xpReward);

      // Trigger Confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });

      // Update profile in storage
      const updatedProfile = advanceQuestStep(profile, activeStepData.stepId, activeStepData.xpReward);
      onUpdateProfile(updatedProfile);

      setShowVictoryModal(true);
    } else {
      sound.playWrong();
      setIsAnswerSubmitted(true);
      setIsAnswerCorrect(false);
      setShowHint(true);
    }
  };

  // Move to next step
  const handleNextDestination = () => {
    setShowVictoryModal(false);
    const nextStep = QUEST_STEPS.find(s => s.stepId === activeStepData.stepId + 1);
    if (nextStep) {
      handleSelectStep(nextStep);
    }
  };

  // Switch avatar
  const handleAvatarChange = (avatarId) => {
    sound.playClick();
    const updated = {
      ...profile,
      avatarId
    };
    saveProfile(updated);
    onUpdateProfile(updated);
    setShowAvatarModal(false);
    confetti({ particleCount: 30, spread: 50 });
  };

  const isCurrentStepUnlocked = (stepId) => {
    return stepId <= currentStepId;
  };

  const isStepCompleted = (stepId) => {
    return completedSteps.includes(stepId);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-6 py-4 space-y-4">
      
      {/* ======================================================== */}
      {/* 1. TOP TACTICAL HUD & NAVIGATION                         */}
      {/* ======================================================== */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 sm:p-4 rounded-2xl bg-slate-900/90 border border-cyan-600/50 shadow-xl backdrop-blur-md">
        
        {/* Navigation Buttons: KEMBALI & LAMAN UTAMA */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => { sound.playClick(); onBack(); }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-cyber font-bold text-slate-200 border border-slate-700 transition-all shadow active:scale-95"
            title="Kembali"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>KEMBALI</span>
          </button>
          <button
            onClick={() => { sound.playClick(); onBack(); }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-xs font-cyber font-bold text-white border border-emerald-400/60 transition-all shadow-md shadow-emerald-950 active:scale-95"
            title="Ke Laman Utama"
          >
            <Home className="w-3.5 h-3.5" />
            <span>LAMAN UTAMA</span>
          </button>
        </div>

        {/* Current Avatar & Switch Button */}
        <div className="flex items-center gap-2.5 bg-slate-950/80 px-3.5 py-1.5 rounded-xl border border-slate-800">
          <span className="text-3xl animate-bounce" title={currentAvatar.name}>{currentAvatar.emoji}</span>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-cyber font-bold text-white">{profile.agentName}</span>
              <button
                onClick={() => { sound.playClick(); setShowAvatarModal(true); }}
                className="text-[9px] font-cyber px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-500/50 text-cyan-300 hover:bg-cyan-900 transition-colors"
              >
                TUKAR AVATAR
              </button>
            </div>
            <p className="text-[10px] font-tech text-slate-400">
              Avatar: <strong className="text-cyan-400">{currentAvatar.name}</strong> • {profile.studentClass}
            </p>
          </div>
        </div>

        {/* Live Wallet & Shortcut to Dunia Blok */}
        <div className="flex items-center gap-2.5 ml-auto">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-950/80 to-slate-950 border border-amber-500/60 shadow-md">
            <Zap className="w-4 h-4 text-amber-400 animate-pulse" />
            <div className="text-right">
              <p className="text-[9px] font-tech text-amber-300 uppercase leading-none">Baki XP</p>
              <p className="text-sm font-cyber font-extrabold text-white">{profile.xp} <span className="text-[10px] text-amber-400">XP</span></p>
            </div>
          </div>

          <button
            onClick={() => { sound.playClick(); onNavigateWorld(); }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-cyber font-extrabold shadow-lg shadow-emerald-950 active:scale-95"
            title="Guna XP untuk membina rumah di lapangan rumput"
          >
            <Hammer className="w-3.5 h-3.5" />
            <span>BINA RUMAH SAYA</span>
          </button>
        </div>

      </div>

      {/* ======================================================== */}
      {/* 2. ADVENTURE BANNER & PROGRESS TRACKER                   */}
      {/* ======================================================== */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-cyan-950/50 to-slate-900 border border-cyan-700/50 p-4 flex flex-wrap items-center justify-between gap-3 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center text-2xl shadow-inner">
            🧭
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-cyber font-extrabold text-white">
              KEMBARA QUEST MATEMATIK
            </h2>
            <p className="text-xs text-slate-300 font-tech">
              Jawab soalan matematik dengan betul untuk menggerakkan avatar mara ke destinasi seterusnya & kumpul XP!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-slate-950/80 px-4 py-2 rounded-xl border border-slate-800">
          <div className="text-right">
            <p className="text-[10px] font-tech text-slate-400 uppercase">Kemajuan Kembara</p>
            <p className="text-xs font-cyber font-bold text-cyan-400">
              {completedSteps.length} / {QUEST_STEPS.length} Destinasi Selesai
            </p>
          </div>
          <div className="w-20 sm:w-28 bg-slate-800 h-2.5 rounded-full overflow-hidden border border-slate-700">
            <div 
              className="bg-gradient-to-r from-cyan-400 to-emerald-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${(completedSteps.length / QUEST_STEPS.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 3. MAIN QUEST LAYOUT (Trail Map on Left, Challenge Right)*/}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* LEFT COLUMN: THE QUEST PATH / WAYPOINT STATIONS (5 Cols) */}
        <div className="lg:col-span-5 rounded-2xl bg-slate-900/90 border border-slate-800 p-4 space-y-3 max-h-[620px] overflow-y-auto scrollbar-thin shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-xs font-cyber font-bold text-slate-300 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-cyan-400" />
              <span>LALUAN CHECKPOINT QUEST:</span>
            </span>
            <span className="text-[10px] font-tech text-slate-400">Klik stesen untuk cabaran</span>
          </div>

          <div className="space-y-2 relative">
            {QUEST_STEPS.map((step) => {
              const unlocked = isCurrentStepUnlocked(step.stepId);
              const done = isStepCompleted(step.stepId);
              const isSelected = activeStepData.stepId === step.stepId;
              const isHeroCurrentStanding = currentStepId === step.stepId;

              return (
                <div
                  key={step.stepId}
                  onClick={() => unlocked && handleSelectStep(step)}
                  className={`p-3 rounded-2xl border transition-all relative flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-slate-950 border-cyan-400 ring-2 ring-cyan-400/40 shadow-lg scale-[1.01]'
                      : done
                      ? 'bg-slate-950/90 border-emerald-500/50 hover:border-emerald-400'
                      : unlocked
                      ? 'bg-slate-950/70 border-cyan-800/60 hover:border-cyan-500'
                      : 'bg-slate-950/30 border-slate-900 opacity-40 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Station Number / Status Icon */}
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-cyber font-bold text-xs shrink-0 ${
                      done
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/60'
                        : isHeroCurrentStanding
                        ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/40 animate-pulse'
                        : unlocked
                        ? 'bg-slate-800 text-cyan-300 border border-slate-700'
                        : 'bg-slate-900 text-slate-600 border border-slate-800'
                    }`}>
                      {done ? <CheckCircle2 className="w-4 h-4" /> : !unlocked ? <Lock className="w-3.5 h-3.5" /> : `0${step.stepId}`}
                    </div>

                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-cyber font-bold text-white truncate max-w-[170px]">
                          {step.name}
                        </span>
                        {isHeroCurrentStanding && (
                          <span className="text-lg animate-bounce" title="Avatar Anda Berada Di Sini!">
                            {currentAvatar.emoji}
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] font-tech text-slate-400">
                        {step.biome} • <span className="text-amber-400 font-bold">+{step.xpReward} XP</span>
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    {done ? (
                      <span className="text-[10px] font-tech font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/40">
                        SELESAI ⭐
                      </span>
                    ) : isHeroCurrentStanding ? (
                      <span className="text-[10px] font-cyber font-bold text-cyan-400 px-2 py-0.5 rounded bg-cyan-950 border border-cyan-400 animate-pulse">
                        DI SINI 🚩
                      </span>
                    ) : unlocked ? (
                      <span className="text-[10px] font-tech text-slate-400">
                        TERBUKA
                      </span>
                    ) : (
                      <Lock className="w-3.5 h-3.5 text-slate-700 inline" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: ACTIVE CHALLENGE STAGE (7 Cols) */}
        <div className="lg:col-span-7 rounded-2xl bg-slate-900/90 border border-cyan-800/60 p-4 sm:p-6 shadow-xl flex flex-col justify-between space-y-4">
          
          {/* Challenge Header */}
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{activeStepData.icon}</span>
                <div>
                  <span className="text-[10px] font-tech font-bold px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/40 text-cyan-300 uppercase">
                    DESTINASI 0{activeStepData.stepId} // {activeStepData.topic}
                  </span>
                  <h3 className="text-base sm:text-lg font-cyber font-extrabold text-white mt-0.5">
                    {activeStepData.name}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/50 text-amber-300 text-xs font-cyber font-bold">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>GANJARAN +{activeStepData.xpReward} XP</span>
              </div>
            </div>

            {/* Story Prompt */}
            <div className="mt-3 p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-tech text-slate-300 leading-relaxed">
              <p className="italic text-cyan-300 font-semibold mb-1">
                📜 Catatan Kembara:
              </p>
              {activeStepData.story}
            </div>

            {/* Question Card */}
            <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-slate-950 to-cyan-950/40 border border-cyan-500/40 shadow-inner">
              <p className="text-[11px] font-tech text-slate-400 uppercase tracking-widest mb-1">
                SOALAN MATEMATIK:
              </p>
              <h4 className="text-base sm:text-lg font-cyber font-bold text-white leading-snug">
                {activeStepData.question}
              </h4>
            </div>

            {/* Options Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-4">
              {activeStepData.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = isAnswerSubmitted && idx === activeStepData.correctIndex;
                const isWrongSelected = isAnswerSubmitted && isSelected && !isAnswerCorrect;

                return (
                  <button
                    key={idx}
                    disabled={isAnswerSubmitted && isAnswerCorrect}
                    onClick={() => handleOptionSelect(idx)}
                    className={`p-3.5 rounded-xl border text-left text-xs sm:text-sm font-cyber font-bold transition-all flex items-center justify-between ${
                      isCorrect
                        ? 'bg-emerald-950 border-emerald-400 text-emerald-200 ring-2 ring-emerald-400'
                        : isWrongSelected
                        ? 'bg-rose-950 border-rose-500 text-rose-200 ring-2 ring-rose-500'
                        : isSelected
                        ? 'bg-cyan-950 border-cyan-400 text-white ring-2 ring-cyan-400/50'
                        : 'bg-slate-950 hover:bg-slate-800 border-slate-800 text-slate-200'
                    }`}
                  >
                    <span>{opt}</span>
                    {isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-1" />}
                  </button>
                );
              })}
            </div>

            {/* Hint Box (If wrong or asked) */}
            {showHint && (
              <div className="mt-3 p-3 rounded-xl bg-amber-950/50 border border-amber-500/50 text-xs font-tech text-amber-200 animate-in fade-in">
                <span className="font-bold flex items-center gap-1 mb-1">
                  <HelpCircle className="w-3.5 h-3.5" /> PETUNJUK FORMULA:
                </span>
                <p>{activeStepData.hint}</p>
              </div>
            )}
          </div>

          {/* Action Button */}
          <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-3">
            <button
              onClick={() => { sound.playClick(); setShowHint(!showHint); }}
              className="text-xs font-tech text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-1"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{showHint ? 'Sembunyikan Petunjuk' : 'Minta Petunjuk Formula'}</span>
            </button>

            <button
              disabled={selectedOption === null || (isAnswerSubmitted && isAnswerCorrect)}
              onClick={handleSubmitAnswer}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 font-cyber font-extrabold text-xs sm:text-sm shadow-lg shadow-cyan-950 transition-all active:scale-95 flex items-center gap-2"
            >
              <span>{isAnswerSubmitted && isAnswerCorrect ? 'DESTINASI SELESAI!' : 'SAHKAN JAWAPAN & MARA'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

      {/* ======================================================== */}
      {/* 4. MODAL VICTORY & ADVANCE DESTINATION                   */}
      {/* ======================================================== */}
      {showVictoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-lg rounded-3xl bg-slate-900 border-2 border-emerald-500/70 p-6 shadow-2xl space-y-4 text-center">
            
            <div className="space-y-1">
              <span className="text-4xl animate-bounce inline-block">🎉</span>
              <h3 className="text-xl font-cyber font-extrabold text-white">
                TAHNIAH! JAWAPAN TEPAT!
              </h3>
              <p className="text-xs font-tech text-emerald-400 font-bold uppercase">
                Avatar anda mara ke destinasi seterusnya!
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-center gap-2 text-2xl font-cyber font-extrabold text-amber-400">
                <Zap className="w-6 h-6 fill-amber-400" />
                <span>+{earnedXp} XP DIPEROLEHI!</span>
              </div>
              <p className="text-xs font-tech text-slate-300">
                {activeStepData.funFact}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
              <button
                onClick={handleNextDestination}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-cyber font-extrabold text-xs shadow-md active:scale-95 flex items-center justify-center gap-1.5"
              >
                <span>TERUSKAN QUEST</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => { setShowVictoryModal(false); onNavigateWorld(); }}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-cyber font-extrabold text-xs shadow-md active:scale-95 flex items-center justify-center gap-1.5"
              >
                <Hammer className="w-3.5 h-3.5" />
                <span>BELI BLOK & BINA RUMAH</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 5. MODAL TUKAR AVATAR                                    */}
      {/* ======================================================== */}
      {showAvatarModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-xl max-h-[85vh] flex flex-col rounded-3xl bg-slate-900 border border-cyan-500/60 shadow-2xl overflow-hidden">
            
            <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">👤</span>
                <h3 className="text-base font-cyber font-bold text-white">
                  PILIH AVATAR & IDENTITI PENGEMBARA
                </h3>
              </div>
              <button
                onClick={() => { sound.playClick(); setShowAvatarModal(false); }}
                className="text-xs font-cyber text-slate-400 hover:text-white"
              >
                TUTUP ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {AVATARS.map(av => {
                const isCurrent = profile.avatarId === av.id;

                return (
                  <button
                    key={av.id}
                    onClick={() => handleAvatarChange(av.id)}
                    className={`p-3 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                      isCurrent
                        ? 'bg-cyan-950/90 border-cyan-400 ring-2 ring-cyan-400/50 shadow-md'
                        : 'bg-slate-950 hover:bg-slate-800 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <span className="text-3xl p-2 rounded-xl bg-slate-900 border border-slate-800">
                      {av.emoji}
                    </span>
                    <div>
                      <h4 className="text-xs font-cyber font-bold text-white">{av.name}</h4>
                      <p className="text-[10px] font-tech text-slate-400">{av.role}</p>
                      {isCurrent && (
                        <span className="text-[9px] font-cyber text-cyan-400 font-bold uppercase mt-1 inline-block">
                          AKTIF DIPILIH ✓
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
