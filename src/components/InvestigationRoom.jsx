import React, { useState } from 'react';
import { 
  ArrowLeft, Lightbulb, CheckCircle2, XCircle, ArrowRight, 
  HelpCircle, ShieldCheck, Zap, Star 
} from 'lucide-react';
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
  const [activeHintLevel, setActiveHintLevel] = useState(0); // 0 = none, 1, 2, 3
  const [totalHintsUsed, setTotalHintsUsed] = useState(0);

  const stage = caseData.stages[currentStageIndex];
  const isLastStage = currentStageIndex === caseData.stages.length - 1;

  const handleSelectOption = (index) => {
    if (isAnswerChecked && isCorrect) return;
    sound.playClick();
    setSelectedOption(index);

    // Instant answer checking for fast game feel
    if (index === stage.correctIndex) {
      sound.playSuccess();
      setIsCorrect(true);
      setIsAnswerChecked(true);
    } else {
      sound.playWrong();
      setIsCorrect(false);
      setIsAnswerChecked(true);
    }
  };

  const handleUnlockHint = () => {
    sound.playHint();
    const nextLevel = Math.min(activeHintLevel + 1, stage.hints ? stage.hints.length : 1);
    setActiveHintLevel(nextLevel);
    setTotalHintsUsed(prev => prev + 1);
  };

  const handleNextStage = () => {
    sound.playClick();
    if (isLastStage) {
      onProceedToVault(totalHintsUsed);
    } else {
      setCurrentStageIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerChecked(false);
      setIsCorrect(false);
      setActiveHintLevel(0);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-3 sm:px-6 py-4 space-y-4">
      
      {/* ======================================================== */}
      {/* 1. TOP TACTICAL HUD                                      */}
      {/* ======================================================== */}
      <div className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-slate-900/90 border border-cyan-800/60 shadow-lg">
        
        {/* Back Button */}
        <button
          onClick={() => {
            sound.playClick();
            onBackToBriefing();
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-xs font-cyber font-bold text-slate-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>LOBI</span>
        </button>

        {/* Stage Nodes Indicator */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-tech text-cyan-400 font-bold uppercase hidden sm:inline">
            SEKTOR 0{caseData.caseNumber} //
          </span>
          {caseData.stages.map((st, idx) => (
            <div
              key={st.stageNumber}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-cyber font-bold transition-all ${
                idx === currentStageIndex
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                  : idx < currentStageIndex
                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/50'
                  : 'bg-slate-950 text-slate-600 border border-slate-800'
              }`}
            >
              {idx < currentStageIndex ? (
                <CheckCircle2 className="w-3.5 h-3.5" />
              ) : (
                <span>0{st.stageNumber}</span>
              )}
            </div>
          ))}
          <div className="text-[10px] font-cyber px-2 py-0.5 rounded-full bg-amber-950/60 border border-amber-500/40 text-amber-300">
            PETI BESI 🔑
          </div>
        </div>

        {/* KBAT Hint Button */}
        <button
          onClick={handleUnlockHint}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-cyan-950/60 border border-cyan-500/40 text-xs font-cyber font-bold text-cyan-300 transition-colors"
          title="Buka Petunjuk KBAT"
        >
          <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden sm:inline">PETUNJUK</span>
        </button>

      </div>

      {/* ======================================================== */}
      {/* 2. BATTLE / STAGE ARENA DISPLAY (No word walls!)         */}
      {/* ======================================================== */}
      <div className="rounded-3xl bg-slate-900/90 border border-cyan-800/60 p-5 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
        
        {/* Question Header & Title */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-400 text-[11px] font-cyber font-bold uppercase">
            <span>BUKTI {stage.stageNumber} DARI 3: {stage.title.split(':')[0]}</span>
          </div>

          {/* Clean Big Math Prompt (Stripped of text walls) */}
          <h2 className="text-xl sm:text-3xl font-cyber font-extrabold text-white max-w-2xl mx-auto leading-snug">
            {stage.question}
          </h2>

          {/* Short Situation Highlight if available */}
          {stage.clueSnippet && (
            <p className="text-xs sm:text-sm font-tech text-cyan-300 max-w-xl mx-auto">
              ⚡ {stage.clueSnippet.replace(/^LOG SISTEM:\s*/, '').replace(/^PORT FIREWALL:\s*/, '').replace(/^KOD TERMINAL KESELAMATAN:\s*/, '')}
            </p>
          )}
        </div>

        {/* Hint Box (If requested) */}
        {activeHintLevel > 0 && stage.hints && stage.hints[activeHintLevel - 1] && (
          <div className="p-3.5 rounded-2xl bg-amber-950/40 border border-amber-500/50 max-w-lg mx-auto text-center space-y-1 animate-fadeIn">
            <span className="text-[10px] font-cyber font-bold text-amber-400 uppercase tracking-wider">
              💡 {stage.hints[activeHintLevel - 1].title}:
            </span>
            <p className="text-xs text-amber-200 font-tech">
              {stage.hints[activeHintLevel - 1].text}
            </p>
          </div>
        )}

        {/* 4 Big Tactical Choice Buttons in 2x2 Grid (Gamepad Style) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
          {stage.options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            const isAnswerCorrect = idx === stage.correctIndex;

            let btnStyle = 'bg-slate-950 hover:bg-slate-800 border-slate-800 text-slate-200 hover:border-cyan-500/60';
            if (isAnswerChecked) {
              if (isAnswerCorrect) {
                btnStyle = 'bg-emerald-950 border-emerald-400 text-emerald-200 ring-2 ring-emerald-500 font-bold';
              } else if (isSelected) {
                btnStyle = 'bg-rose-950 border-rose-500 text-rose-300';
              } else {
                btnStyle = 'bg-slate-950/50 border-slate-900 text-slate-600 opacity-40';
              }
            }

            return (
              <button
                key={idx}
                disabled={isAnswerChecked && isCorrect}
                onClick={() => handleSelectOption(idx)}
                className={`p-4 rounded-2xl border text-base sm:text-lg font-cyber font-bold text-center transition-all hover:scale-[1.02] active:scale-[0.98] shadow-md flex items-center justify-between ${btnStyle}`}
              >
                <span className="text-xs font-tech text-slate-500 w-6">0{idx + 1}</span>
                <span className="flex-1 px-2">{opt}</span>
                <span className="w-6 text-right">
                  {isAnswerChecked && isAnswerCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400 inline" />}
                  {isAnswerChecked && isSelected && !isAnswerCorrect && <XCircle className="w-5 h-5 text-rose-400 inline" />}
                </span>
              </button>
            );
          })}
        </div>

        {/* Result Action Bar */}
        {isAnswerChecked && (
          <div className="flex flex-col items-center justify-center gap-3 pt-2 animate-fadeIn">
            {isCorrect ? (
              <div className="text-center space-y-3">
                <p className="text-xs font-tech text-emerald-400 font-bold">
                  ✓ JAWAPAN TEPAT! {stage.explanation}
                </p>
                <button
                  onClick={handleNextStage}
                  className="px-8 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-cyber font-extrabold text-sm shadow-xl shadow-emerald-950 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                >
                  <span>{isLastStage ? 'NYAHKOD PETI BESI 🔑' : 'SETERUSNYA ➡️'}</span>
                </button>
              </div>
            ) : (
              <div className="text-center space-y-2">
                <p className="text-xs font-tech text-rose-400 font-bold">
                  ✗ Belum tepat. Sila cuba pilih jawapan lain atau semak petunjuk!
                </p>
              </div>
            )}
          </div>
        )}

      </div>

    </div>
  );
}
