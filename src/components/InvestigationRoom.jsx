import React, { useState } from 'react';
import { ArrowLeft, Lightbulb, CheckCircle2, XCircle, ArrowRight, HelpCircle, Lock, ShieldCheck, AlertCircle } from 'lucide-react';
import { sound } from '../utils/sound';

export default function InvestigationRoom({
  caseData,
  onProceedToVault,
  onBackToBriefing
}) {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [activeHintLevel, setActiveHintLevel] = useState(0); // 0 = none, 1, 2, 3
  const [totalHintsUsed, setTotalHintsUsed] = useState(0);

  const stage = caseData.stages[currentStageIndex];
  const isLastStage = currentStageIndex === caseData.stages.length - 1;

  const handleSelectOption = (index) => {
    if (isAnswerChecked && isCorrect) return; // Prevent change after correct
    sound.playClick();
    setSelectedOption(index);
  };

  const handleCheckAnswer = () => {
    if (selectedOption === null) return;

    if (selectedOption === stage.correctIndex) {
      sound.playSuccess();
      setIsCorrect(true);
      setIsAnswerChecked(true);
      setShowExplanation(true);
    } else {
      sound.playWrong();
      setIsCorrect(false);
      setIsAnswerChecked(true);
    }
  };

  const handleUnlockHint = (level) => {
    sound.playHint();
    if (level > activeHintLevel) {
      setActiveHintLevel(level);
      setTotalHintsUsed(prev => prev + 1);
    }
  };

  const handleNextStage = () => {
    sound.playClick();
    if (isLastStage) {
      // Proceed to the final vault decoding puzzle!
      onProceedToVault(totalHintsUsed);
    } else {
      setCurrentStageIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerChecked(false);
      setIsCorrect(false);
      setShowExplanation(false);
      setActiveHintLevel(0);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      
      {/* Top Header & Stage Tracker */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          onClick={() => {
            sound.playClick();
            onBackToBriefing();
          }}
          className="inline-flex items-center gap-2 text-xs font-tech text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          KEMBALI KE TAKLIMAT KES
        </button>

        {/* Stage Progress Pills */}
        <div className="flex items-center gap-2">
          {caseData.stages.map((st, idx) => (
            <div
              key={st.stageNumber}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-tech transition-all ${
                idx === currentStageIndex
                  ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/60 shadow-lg shadow-cyan-950/50'
                  : idx < currentStageIndex
                  ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-700/50'
                  : 'bg-slate-900 text-slate-600 border border-slate-800'
              }`}
            >
              {idx < currentStageIndex ? (
                <CheckCircle2 className="w-3.5 h-3.5" />
              ) : (
                <span className="w-2 h-2 rounded-full bg-current"></span>
              )}
              <span>BUKTI 0{st.stageNumber}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Investigation Terminal Screen */}
      <div className="relative rounded-2xl bg-slate-900/90 border border-cyan-800/40 shadow-2xl overflow-hidden">
        
        {/* Terminal Header */}
        <div className="bg-slate-950 px-6 py-3.5 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></span>
            <span className="font-tech text-xs text-cyan-300">
              TERMINAL ANALISIS FORENSIK // BUKTI {stage.stageNumber} DARI 3
            </span>
          </div>
          <span className="text-xs font-tech text-slate-400">
            {caseData.topic}
          </span>
        </div>

        {/* Card Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Stage Clue Callout Banner */}
          <div className="p-4 rounded-xl bg-slate-950/90 border-l-4 border-cyan-400 border-y border-r border-slate-800/80 shadow-inner">
            <p className="text-xs font-tech text-cyan-400 font-bold tracking-wider mb-1">
              [PINTU LOG DATA YANG DIPINTAS]
            </p>
            <p className="font-tech text-sm sm:text-base text-slate-200">
              {stage.clueSnippet}
            </p>
          </div>

          {/* Situation & Question */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold font-cyber text-white">
              {stage.title}
            </h3>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {stage.situation}
            </p>

            <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-700/40 text-cyan-200 font-semibold text-sm sm:text-base">
              ❓ {stage.question}
            </div>
          </div>

          {/* Multiple Choice Options Grid */}
          <div className="space-y-3">
            <p className="text-xs font-tech text-slate-400 tracking-wider">
              PILIH JAWAPAN DEDUKSI ANDA:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {stage.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const isThisCorrect = isAnswerChecked && idx === stage.correctIndex;
                const isThisWrong = isAnswerChecked && isSelected && !isCorrect;

                return (
                  <button
                    key={idx}
                    disabled={isAnswerChecked && isCorrect}
                    onClick={() => handleSelectOption(idx)}
                    className={`relative p-4 rounded-xl text-left border transition-all text-sm sm:text-base font-medium flex items-center justify-between ${
                      isThisCorrect
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-lg shadow-emerald-950/50'
                        : isThisWrong
                        ? 'bg-rose-950/80 border-rose-500 text-rose-200 shake'
                        : isSelected
                        ? 'bg-cyan-950/60 border-cyan-400 text-cyan-100 shadow-md shadow-cyan-950/50 scale-[1.01]'
                        : 'bg-slate-950/60 hover:bg-slate-800/80 border-slate-800 hover:border-slate-700 text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-tech text-xs font-bold ${
                        isThisCorrect
                          ? 'bg-emerald-500 text-slate-950'
                          : isThisWrong
                          ? 'bg-rose-500 text-white'
                          : isSelected
                          ? 'bg-cyan-400 text-slate-950'
                          : 'bg-slate-800 text-slate-400'
                      }`}>
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{opt}</span>
                    </div>

                    {isThisCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    )}
                    {isThisWrong && (
                      <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Check Answer / Next */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            
            {/* Feedback Message */}
            <div>
              {isAnswerChecked && isCorrect && (
                <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold">
                  <ShieldCheck className="w-5 h-5" />
                  <span>Deduksi Tepat! Kod keselamatan berjaya dinyahkod.</span>
                </div>
              )}
              {isAnswerChecked && !isCorrect && (
                <div className="flex items-center gap-2 text-rose-400 text-sm font-semibold">
                  <AlertCircle className="w-5 h-5" />
                  <span>Deduksi Kurang Tepat. Sila cuba lagi atau buka Kanta Risikan!</span>
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              {!isCorrect ? (
                <button
                  disabled={selectedOption === null}
                  onClick={handleCheckAnswer}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-cyber font-bold text-sm transition-transform active:scale-95 shadow-lg shadow-cyan-950"
                >
                  SAHKAN JAWAPAN
                </button>
              ) : (
                <button
                  onClick={handleNextStage}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-cyber font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950 transition-all hover:scale-105"
                >
                  <span>{isLastStage ? 'BUKA PETI BESI VAULT' : 'KE BUKTI SETERUSNYA'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>

          </div>

          {/* Pedagogical Step-by-Step Explanation Banner */}
          {showExplanation && (
            <div className="p-5 rounded-xl bg-slate-950/90 border border-emerald-700/50 space-y-2 animate-fadeIn">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-tech font-bold uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4" />
                PENJELASAN MATEMATIK LANGKAH DEMI LANGKAH:
              </div>
              <p className="text-slate-200 text-sm leading-relaxed">
                {stage.explanation}
              </p>
            </div>
          )}

        </div>
      </div>

      {/* Tiered Hints (Kanta Risikan Detektif) */}
      <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-amber-400">
            <Lightbulb className="w-5 h-5" />
            <h4 className="font-cyber font-bold text-sm text-slate-200">
              KANTA RISIKAN (PETUNJUK BERPERINGKAT KBAT)
            </h4>
          </div>
          <span className="text-xs font-tech text-slate-500">
            {activeHintLevel} / 3 PETUNJUK DIBUKA
          </span>
        </div>

        <p className="text-xs text-slate-400">
          Jika anda menghadapi kesukaran, buka petunjuk secara berperingkat untuk membimbing pemikiran anda.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {stage.hints.map((h) => {
            const isUnlocked = activeHintLevel >= h.level;
            return (
              <div
                key={h.level}
                className={`p-3.5 rounded-xl border transition-all ${
                  isUnlocked
                    ? 'bg-slate-950 border-amber-500/50 text-slate-200'
                    : 'bg-slate-950/40 border-slate-800 text-slate-500'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-tech font-bold ${isUnlocked ? 'text-amber-400' : 'text-slate-500'}`}>
                    ARAS {h.level}: {h.title}
                  </span>
                  {!isUnlocked && (
                    <button
                      onClick={() => handleUnlockHint(h.level)}
                      className="text-[11px] font-tech text-cyan-400 hover:text-cyan-300 underline"
                    >
                      Buka Petunjuk
                    </button>
                  )}
                </div>

                {isUnlocked ? (
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {h.text}
                  </p>
                ) : (
                  <p className="text-xs text-slate-600 italic">
                    [Petunjuk Aras {h.level} terkunci. Klik untuk membuka bantuan.]
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
