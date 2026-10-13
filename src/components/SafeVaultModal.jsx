import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Lock, Unlock, KeyRound, AlertTriangle, Delete, Check, ArrowLeft, Home } from 'lucide-react';
import { sound } from '../utils/sound';

export default function SafeVaultModal({ 
  caseData, 
  totalHintsUsed, 
  onVaultUnlocked,
  onBack,
  onHome 
}) {
  const [inputCode, setInputCode] = useState('');
  const [errorAnim, setErrorAnim] = useState(false);
  const [unlockedAnim, setUnlockedAnim] = useState(false);

  const targetCode = caseData.vault.targetCode;

  const handleKeyPress = (num) => {
    if (unlockedAnim) return;
    if (inputCode.length >= 3) return;
    sound.playKeypad();
    setInputCode(prev => prev + num);
  };

  const handleClear = () => {
    if (unlockedAnim) return;
    sound.playClick();
    setInputCode('');
  };

  const handleBackspace = () => {
    if (unlockedAnim) return;
    sound.playClick();
    setInputCode(prev => prev.slice(0, -1));
  };

  const handleUnlock = () => {
    if (inputCode.length !== 3) return;

    if (inputCode === targetCode) {
      sound.playVaultUnlock();
      setUnlockedAnim(true);

      // Trigger Confetti Celebration
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });

      setTimeout(() => {
        onVaultUnlocked();
      }, 1800);
    } else {
      sound.playWrong();
      setErrorAnim(true);
      setTimeout(() => {
        setErrorAnim(false);
        setInputCode('');
      }, 900);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      
      {/* Top Navigation */}
      {(onBack || onHome) && (
        <div className="flex items-center gap-2">
          {onBack && (
            <button
              onClick={() => {
                sound.playClick();
                onBack();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-cyber font-bold text-slate-200 hover:text-cyan-400 border border-slate-700 transition-all shadow active:scale-95"
              title="Kembali ke Bilik Siasatan"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>KEMBALI</span>
            </button>
          )}
          {onHome && (
            <button
              onClick={() => {
                sound.playClick();
                onHome();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-xs font-cyber font-bold text-white border border-emerald-400/60 transition-all shadow-md shadow-emerald-950 active:scale-95"
              title="Ke Laman Utama (Peta Misi)"
            >
              <Home className="w-3.5 h-3.5" />
              <span>LAMAN UTAMA</span>
            </button>
          )}
        </div>
      )}

      {/* Top Header Banner */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 text-xs font-tech">
          <KeyRound className="w-3.5 h-3.5" />
          PINTU PETI KESELAMATAN BIOMETRIK SIBER
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold font-cyber text-white">
          NYAHKOD PIN 3-DIGIT PETI BESI
        </h2>
        <p className="text-xs sm:text-sm text-slate-400">
          Masukkan 3 digit kod rahsia yang diperolehi daripada analisis bukti matematik tadi.
        </p>
      </div>

      {/* Vault Safe Terminal Box */}
      <div className={`relative rounded-3xl bg-slate-900 border p-6 sm:p-8 shadow-2xl transition-all duration-500 ${
        unlockedAnim
          ? 'border-emerald-500 glow-emerald scale-105'
          : errorAnim
          ? 'border-rose-500 glow-rose'
          : 'border-cyan-800/60 shadow-cyan-950/50'
      }`}>
        
        {/* Physical Vault Wheel / Lock Graphic */}
        <div className="flex flex-col items-center justify-center space-y-4 mb-6">
          <div className={`w-24 h-24 rounded-full border-4 flex items-center justify-center shadow-inner transition-all duration-700 ${
            unlockedAnim
              ? 'border-emerald-400 bg-emerald-950/50 text-emerald-400 rotate-180 scale-110'
              : 'border-cyan-500/60 bg-slate-950 text-cyan-400'
          }`}>
            {unlockedAnim ? (
              <Unlock className="w-10 h-10 animate-bounce" />
            ) : (
              <Lock className="w-10 h-10" />
            )}
          </div>

          {/* LED Code Display */}
          <div className="w-full max-w-xs bg-slate-950 rounded-2xl border border-cyan-900/80 p-4 shadow-inner text-center">
            <p className="text-[10px] font-tech text-cyan-500 uppercase tracking-widest mb-1">
              STATUS KOD TERMINAL
            </p>
            <div className={`font-tech text-4xl sm:text-5xl tracking-[0.4em] font-bold ${
              unlockedAnim 
                ? 'text-emerald-400' 
                : errorAnim 
                ? 'text-rose-400' 
                : 'text-cyan-400'
            }`}>
              {unlockedAnim
                ? targetCode
                : errorAnim
                ? 'ERR'
                : inputCode.padEnd(3, '_')}
            </div>
          </div>
        </div>

        {/* Clue Prompt */}
        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 space-y-1.5 mb-6">
          <div className="flex items-center gap-1.5 text-amber-400 font-semibold font-tech">
            <AlertTriangle className="w-4 h-4" />
            PETUNJUK KOD PETI BESI:
          </div>
          <p className="text-slate-200 leading-relaxed">
            {caseData.vault.prompt}
          </p>
          <div className="pt-1 text-[11px] text-cyan-400/90 font-tech">
            Rumusan: {caseData.vault.clueText}
          </div>
        </div>

        {/* High-Tech Number Keypad */}
        <div className="max-w-xs mx-auto space-y-2.5">
          <div className="grid grid-cols-3 gap-2.5">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
              <button
                key={num}
                onClick={() => handleKeyPress(String(num))}
                className="h-14 rounded-2xl bg-slate-950 hover:bg-slate-800 active:bg-cyan-950 border border-slate-800 hover:border-cyan-500/50 text-xl font-bold font-tech text-slate-100 shadow-md transition-all active:scale-95"
              >
                {num}
              </button>
            ))}

            {/* Clear Button */}
            <button
              onClick={handleClear}
              className="h-14 rounded-2xl bg-slate-950 hover:bg-rose-950/40 border border-slate-800 hover:border-rose-700/50 text-sm font-bold font-tech text-rose-400 shadow-md transition-all active:scale-95 flex items-center justify-center"
              title="Padam Semua"
            >
              C
            </button>

            {/* 0 Key */}
            <button
              onClick={() => handleKeyPress('0')}
              className="h-14 rounded-2xl bg-slate-950 hover:bg-slate-800 active:bg-cyan-950 border border-slate-800 hover:border-cyan-500/50 text-xl font-bold font-tech text-slate-100 shadow-md transition-all active:scale-95"
            >
              0
            </button>

            {/* Backspace Button */}
            <button
              onClick={handleBackspace}
              className="h-14 rounded-2xl bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-cyan-700 text-sm font-bold font-tech text-slate-300 shadow-md transition-all active:scale-95 flex items-center justify-center"
              title="Padam Satu Digit"
            >
              <Delete className="w-5 h-5" />
            </button>
          </div>

          {/* Unlock Submit Button */}
          <button
            disabled={inputCode.length !== 3 || unlockedAnim}
            onClick={handleUnlock}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-cyber font-bold text-sm flex items-center justify-center gap-2 shadow-xl shadow-cyan-950/60 transition-transform active:scale-95 mt-2"
          >
            <Check className="w-4 h-4" />
            <span>SAHKAN & BUKA PETI BESI</span>
          </button>
        </div>

      </div>

    </div>
  );
}
