import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { 
  ArrowLeft, RotateCw, Zap, Trophy, Flame, CheckCircle2, 
  XCircle, Timer, Volume2, Sparkles, HelpCircle, Eye, EyeOff 
} from 'lucide-react';
import { sound } from '../utils/sound';
import { recordScoreEntry, DEVELOPER_NAME, DEVELOPER_TITLE } from '../utils/storage';

const SLICES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const SLICE_COLORS = [
  '#06b6d4', '#3b82f6', '#6366f1', '#8b5cf6', 
  '#ec4899', '#f43f5e', '#f97316', '#eab308', 
  '#10b981', '#14b8a6', '#0ea5e9', '#a855f7'
];

export default function RodaSifir({ profile, onUpdateProfile, onBack }) {
  const [gameMode, setGameMode] = useState('spin'); // 'spin' | 'clock' | 'timed'
  const [selectedTable, setSelectedTable] = useState(6); // 2 to 12, or 'random'
  
  // Wheel State
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [landedNumber, setLandedNumber] = useState(null);
  
  // Question & Answer State
  const [currentMultiplier, setCurrentMultiplier] = useState(null);
  const [currentTableNum, setCurrentTableNum] = useState(6);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  
  // Scoring & Streaks
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);
  
  // Clock Wheel Mode State (12 slices completion)
  const [clockCompleted, setClockCompleted] = useState({}); // { 1: true, 2: true, ... }
  const [activeClockSlice, setActiveClockSlice] = useState(null);

  // Timed Mode State
  const [timeLeft, setTimeLeft] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Table Cheat Sheet Modal
  const [showCheatSheet, setShowCheatSheet] = useState(false);

  // Audio Tick animation tracking
  const lastTickAngle = useRef(0);
  const wheelRef = useRef(null);

  // Timer loop for Timed Mode
  useEffect(() => {
    let timerId;
    if (gameMode === 'timed' && isTimerRunning && timeLeft > 0) {
      timerId = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      sound.playLevelUp();
      confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
      if (onUpdateProfile && score > 0) {
        const accuracy = totalAnswered > 0 ? `${Math.round((totalCorrect / totalAnswered) * 100)}%` : '100%';
        const xpEarned = Math.round(score / 5);
        const updated = recordScoreEntry(profile, {
          category: 'Roda Sifir (Pecut 60s)',
          title: `Roda Sifir: Pecut 60 Saat (Skor ${score})`,
          score: score,
          accuracy: accuracy,
          xp: xpEarned
        });
        onUpdateProfile({
          ...updated,
          xp: updated.xp + xpEarned
        });
      }
    }
    return () => clearInterval(timerId);
  }, [gameMode, isTimerRunning, timeLeft]);

  // Generate 4 Multiple Choice Options
  const generateOptions = (table, multiplier) => {
    const correct = table * multiplier;
    const opts = new Set([correct]);
    
    while (opts.size < 4) {
      // Generate plausible distractors
      const offset = (Math.floor(Math.random() * 5) - 2) * table;
      const fake = correct + offset;
      if (fake > 0 && fake !== correct) {
        opts.add(fake);
      } else {
        const randomNum = (table + Math.floor(Math.random() * 3) - 1) * (multiplier + Math.floor(Math.random() * 3) - 1);
        if (randomNum > 0 && randomNum !== correct) {
          opts.add(randomNum);
        }
      }
    }
    return Array.from(opts).sort(() => Math.random() - 0.5);
  };

  // Spin the wheel with realistic deceleration
  const handleSpinWheel = () => {
    if (isSpinning) return;
    sound.playClick();

    setIsSpinning(true);
    setSelectedOption(null);
    setIsAnswerChecked(false);
    setLandedNumber(null);

    // Pick target number 1 to 12
    const targetSlice = Math.floor(Math.random() * 12) + 1; // 1 to 12
    const sliceAngle = 360 / 12; // 30 deg each

    // Slices are laid out clockwise starting from top (0 deg).
    // Pointer is at TOP (0 deg / 360 deg).
    // To land slice N at top: target angle = (360 - (N - 1) * 30) - 15 (center of slice)
    const targetSliceCenter = (12 - (targetSlice - 1)) * sliceAngle - 15;

    // Add 5 to 8 full spins (1800 to 2880 deg)
    const extraSpins = (5 + Math.floor(Math.random() * 4)) * 360;
    const currentBase = Math.floor(rotation / 360) * 360;
    const newTotalRotation = currentBase + extraSpins + targetSliceCenter;

    // Simulate sound ticks during spin
    let tickCount = 0;
    const tickInterval = setInterval(() => {
      sound.playWheelTick(1200 + Math.random() * 300);
      tickCount++;
      if (tickCount > 24) clearInterval(tickInterval);
    }, 120);

    setRotation(newTotalRotation);

    setTimeout(() => {
      clearInterval(tickInterval);
      setIsSpinning(false);
      setLandedNumber(targetSlice);

      const activeTable = selectedTable === 'random' 
        ? Math.floor(Math.random() * 11) + 2 // 2 to 12
        : Number(selectedTable);

      setCurrentTableNum(activeTable);
      setCurrentMultiplier(targetSlice);
      setOptions(generateOptions(activeTable, targetSlice));

      if (gameMode === 'timed' && !isTimerRunning && timeLeft === 60) {
        setIsTimerRunning(true);
      }
    }, 3200);
  };

  // Handle Answer Selection
  const handleAnswer = (chosen) => {
    if (isAnswerChecked) return;
    sound.playClick();
    setSelectedOption(chosen);

    const correctAnswer = currentTableNum * currentMultiplier;
    const correct = chosen === correctAnswer;
    setIsCorrect(correct);
    setIsAnswerChecked(true);
    setTotalAnswered(prev => prev + 1);

    if (correct) {
      sound.playSuccess();
      setTotalCorrect(prev => prev + 1);
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > bestStreak) setBestStreak(newStreak);

      // Streak Combo Fanfare
      if (newStreak % 5 === 0) {
        sound.playCombo();
        confetti({ particleCount: 60, spread: 50, origin: { y: 0.7 } });
      }

      // Add XP & Score
      const earnedXp = 15 + Math.min(newStreak * 2, 30);
      setScore(prev => prev + (100 * Math.min(newStreak, 5)));

      // If in clock mode, mark slice completed
      if (gameMode === 'clock') {
        const nextClock = { ...clockCompleted, [currentMultiplier]: true };
        setClockCompleted(nextClock);
        if (Object.keys(nextClock).length === 12) {
          sound.playLevelUp();
          confetti({ particleCount: 200, spread: 100, origin: { y: 0.5 } });
          if (onUpdateProfile) {
            const updated = recordScoreEntry(profile, {
              category: 'Roda Sifir (Roda Jam 360°)',
              title: `Roda Jam Sifir ${selectedTable}: Lengkap 12/12`,
              score: 1200,
              accuracy: '100%',
              xp: 200
            });
            onUpdateProfile({
              ...updated,
              xp: updated.xp + earnedXp + 200
            });
            return;
          }
        }
      }

      // Update player profile XP in storage
      if (onUpdateProfile) {
        onUpdateProfile({
          ...profile,
          xp: profile.xp + earnedXp
        });
      }
    } else {
      sound.playWrong();
      setStreak(0);
    }
  };

  // Clock Mode: Direct select slice
  const handleSelectClockSlice = (slice) => {
    if (isSpinning) return;
    sound.playClick();
    setActiveClockSlice(slice);
    setCurrentMultiplier(slice);
    setCurrentTableNum(Number(selectedTable === 'random' ? 6 : selectedTable));
    setOptions(generateOptions(Number(selectedTable === 'random' ? 6 : selectedTable), slice));
    setSelectedOption(null);
    setIsAnswerChecked(false);
  };

  // Reset Timed Mode
  const handleResetTimed = () => {
    setTimeLeft(60);
    setIsTimerRunning(false);
    setScore(0);
    setStreak(0);
    setTotalAnswered(0);
    setTotalCorrect(0);
    setCurrentMultiplier(null);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      
      {/* Top Header & Back Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              sound.playClick();
              onBack();
            }}
            className="inline-flex items-center gap-2 text-xs font-tech text-slate-400 hover:text-cyan-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            KEMBALI KE PETA MISI
          </button>

          <span className="text-slate-600 hidden sm:inline">•</span>

          <div className="text-xs font-tech text-slate-300 flex items-center gap-1.5 bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-800">
            <span>EJEN: <strong className="text-cyan-400">{profile.agentName}</strong></span>
            <span>|</span>
            <span>KELAS: <strong className="text-amber-300 font-bold">{profile.studentClass}</strong></span>
          </div>
        </div>

        {/* Live Streaks & XP Indicator */}
        <div className="flex items-center gap-3">
          {streak > 1 && (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/60 text-amber-300 text-xs font-tech font-bold animate-pulse">
              <Flame className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>KOMBO ×{streak}!</span>
            </div>
          )}

          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-cyan-800/50 text-xs font-tech text-cyan-400">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span>MATA SIFIR: {score}</span>
          </div>

          <button
            onClick={() => setShowCheatSheet(prev => !prev)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-tech hover:text-cyan-300 transition-colors"
          >
            {showCheatSheet ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span>{showCheatSheet ? 'Tutup Sifir' : 'Jadual Sifir'}</span>
          </button>
        </div>
      </div>

      {/* Main Game Card */}
      <div className="relative rounded-3xl bg-slate-900/90 border border-cyan-800/50 p-6 sm:p-8 shadow-2xl overflow-hidden">
        
        {/* Banner Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-400 text-[11px] font-tech font-bold uppercase mb-1">
              <RotateCw className="w-3 h-3 animate-spin" />
              ARENA KILAT ARMS // LATIHAN REFLEKS SIFIR
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-cyber text-white">
              RODA SIFIR <span className="text-cyan-400">MATEMATIK KEBANGSAAN</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Putar roda pengali, uji ketepatan sifir asas 1 hingga 12, dan kumpul mata kombo XP!
            </p>
          </div>

          {/* Mode Selector Tabs */}
          <div className="flex p-1 rounded-2xl bg-slate-950 border border-slate-800 shrink-0 text-xs font-cyber font-bold">
            <button
              onClick={() => {
                sound.playClick();
                setGameMode('spin');
              }}
              className={`px-3.5 py-2 rounded-xl transition-all ${
                gameMode === 'spin'
                  ? 'bg-cyan-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Putar & Jawab
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setGameMode('clock');
              }}
              className={`px-3.5 py-2 rounded-xl transition-all ${
                gameMode === 'clock'
                  ? 'bg-cyan-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Roda Jam 360°
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setGameMode('timed');
                handleResetTimed();
              }}
              className={`px-3.5 py-2 rounded-xl transition-all ${
                gameMode === 'timed'
                  ? 'bg-rose-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Pecut 60s
            </button>
          </div>
        </div>

        {/* Table Selector Pills */}
        <div className="py-4 flex items-center gap-2 overflow-x-auto text-xs font-tech">
          <span className="text-slate-400 shrink-0 font-bold">PILIH SIFIR:</span>
          {[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(tbl => (
            <button
              key={tbl}
              onClick={() => {
                sound.playClick();
                setSelectedTable(tbl);
                setClockCompleted({});
                setCurrentMultiplier(null);
              }}
              className={`px-3 py-1.5 rounded-xl border shrink-0 transition-all font-bold ${
                selectedTable === tbl
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md shadow-cyan-950'
                  : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              Sifir {tbl}
            </button>
          ))}
          <button
            onClick={() => {
              sound.playClick();
              setSelectedTable('random');
              setClockCompleted({});
              setCurrentMultiplier(null);
            }}
            className={`px-3.5 py-1.5 rounded-xl border shrink-0 transition-all font-bold ${
              selectedTable === 'random'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-pink-400 shadow-md'
                : 'bg-slate-950 text-purple-400 border-purple-900/60 hover:border-purple-600'
            }`}
          >
            🎲 Campuran
          </button>
        </div>

        {/* Timed Mode Countdown Banner */}
        {gameMode === 'timed' && (
          <div className="mb-4 p-4 rounded-2xl bg-rose-950/40 border border-rose-600/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Timer className="w-6 h-6 text-rose-400 animate-pulse" />
              <div>
                <p className="text-xs font-tech text-rose-300 font-bold uppercase">CABARAN PECUTAN SIFIR 60 SAAT</p>
                <p className="text-sm font-semibold text-white">Jawab sebanyak mungkin sebelum pemasa tamat!</p>
              </div>
            </div>
            <div className="text-right">
              <span className={`text-3xl font-extrabold font-tech ${timeLeft <= 10 ? 'text-rose-400 animate-ping' : 'text-amber-400'}`}>
                {timeLeft}s
              </span>
            </div>
          </div>
        )}

        {/* Center Arena: Wheel & Questions Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4">
          
          {/* Wheel Graphic Container (Col 6) */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center relative">
            
            {/* Top Pointer Needle */}
            <div className="relative z-20 -mb-5 flex flex-col items-center">
              <div className="w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[28px] border-t-amber-400 drop-shadow-[0_4px_8px_rgba(251,191,36,0.6)] animate-pulse"></div>
            </div>

            {/* SVG Interactive Rotating Wheel */}
            <div className="relative w-72 h-72 sm:w-84 sm:h-84 rounded-full p-2 bg-gradient-to-br from-cyan-900/40 to-slate-950 border-4 border-cyan-500/50 shadow-2xl glow-cyan flex items-center justify-center">
              <div 
                ref={wheelRef}
                style={{ 
                  transform: `rotate(${rotation}deg)`,
                  transition: isSpinning ? 'transform 3.2s cubic-bezier(0.15, 0.95, 0.35, 1)' : 'none'
                }}
                className="w-full h-full rounded-full relative overflow-hidden"
              >
                <svg viewBox="0 0 400 400" className="w-full h-full">
                  {SLICES.map((num, i) => {
                    const startAngle = i * 30;
                    const endAngle = (i + 1) * 30;
                    // SVG sector path
                    const x1 = 200 + 195 * Math.sin((startAngle * Math.PI) / 180);
                    const y1 = 200 - 195 * Math.cos((startAngle * Math.PI) / 180);
                    const x2 = 200 + 195 * Math.sin((endAngle * Math.PI) / 180);
                    const y2 = 200 - 195 * Math.cos((endAngle * Math.PI) / 180);
                    
                    const isClockDone = gameMode === 'clock' && clockCompleted[num];
                    const fillColor = isClockDone ? '#10b981' : SLICE_COLORS[i % SLICE_COLORS.length];

                    // Text position
                    const textAngle = startAngle + 15;
                    const tx = 200 + 140 * Math.sin((textAngle * Math.PI) / 180);
                    const ty = 200 - 140 * Math.cos((textAngle * Math.PI) / 180);

                    return (
                      <g 
                        key={num} 
                        className={gameMode === 'clock' ? 'cursor-pointer hover:opacity-85' : ''}
                        onClick={() => gameMode === 'clock' && handleSelectClockSlice(num)}
                      >
                        <path
                          d={`M 200 200 L ${x1} ${y1} A 195 195 0 0 1 ${x2} ${y2} Z`}
                          fill={fillColor}
                          stroke="#020617"
                          strokeWidth="2.5"
                          opacity={isClockDone ? 0.9 : 0.85}
                        />
                        <circle
                          cx={200 + 185 * Math.sin((startAngle * Math.PI) / 180)}
                          cy={200 - 185 * Math.cos((startAngle * Math.PI) / 180)}
                          r="3"
                          fill="#ffffff"
                        />
                        <text
                          x={tx}
                          y={ty}
                          fill="#ffffff"
                          fontSize="22"
                          fontWeight="800"
                          fontFamily="Share Tech Mono"
                          textAnchor="middle"
                          dominantBaseline="central"
                          transform={`rotate(${textAngle}, ${tx}, ${ty})`}
                        >
                          {num}
                        </text>
                      </g>
                    );
                  })}
                </svg>

                {/* Inner Center Hub */}
                <div className="absolute inset-0 m-auto w-24 h-24 rounded-full bg-slate-950 border-4 border-cyan-400 shadow-inner flex flex-col items-center justify-center text-center z-10">
                  <span className="text-[10px] font-tech text-cyan-400 font-bold uppercase leading-none">
                    {selectedTable === 'random' ? 'CAMPUR' : 'SIFIR'}
                  </span>
                  <span className="text-2xl font-cyber font-extrabold text-white leading-tight">
                    {selectedTable === 'random' ? '🎲' : `×${selectedTable}`}
                  </span>
                </div>
              </div>
            </div>

            {/* Spin CTA Button */}
            <div className="mt-6 w-full max-w-xs">
              <button
                disabled={isSpinning || (gameMode === 'timed' && timeLeft === 0)}
                onClick={handleSpinWheel}
                className={`w-full py-4 rounded-2xl font-cyber font-extrabold text-sm sm:text-base text-white shadow-xl flex items-center justify-center gap-2.5 transition-all active:scale-95 ${
                  isSpinning
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 glow-cyan hover:scale-105'
                }`}
              >
                <RotateCw className={`w-5 h-5 ${isSpinning ? 'animate-spin' : ''}`} />
                <span>{isSpinning ? 'RODA SEDANG BERPUTAR...' : 'PUTAR RODA SEKARANG!'}</span>
              </button>
            </div>

          </div>

          {/* Question & Answer Card (Col 6) */}
          <div className="lg:col-span-6 space-y-5">
            
            {currentMultiplier !== null ? (
              <div className="p-6 rounded-2xl bg-slate-950/90 border border-cyan-700/60 shadow-xl space-y-6 animate-fadeIn">
                
                {/* Math Prompt Display */}
                <div className="text-center space-y-2">
                  <span className="text-xs font-tech text-cyan-400 font-bold tracking-wider">
                    SOALAN SIFIR DETEKTIF
                  </span>
                  <div className="flex items-center justify-center gap-3 font-tech text-4xl sm:text-5xl font-extrabold text-white">
                    <span className="text-amber-400">{currentTableNum}</span>
                    <span className="text-cyan-400">×</span>
                    <span className="text-emerald-400">{currentMultiplier}</span>
                    <span className="text-slate-400">=</span>
                    <span className="text-cyan-300">?</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Pilih jawapan yang betul sepantas mungkin:
                  </p>
                </div>

                {/* 4 Options Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {options.map((opt, idx) => {
                    const isSelected = selectedOption === opt;
                    const isTargetCorrect = opt === (currentTableNum * currentMultiplier);

                    return (
                      <button
                        key={idx}
                        disabled={isAnswerChecked}
                        onClick={() => handleAnswer(opt)}
                        className={`p-4 rounded-xl font-tech text-lg sm:text-xl font-bold border transition-all flex items-center justify-center gap-2 ${
                          isAnswerChecked && isTargetCorrect
                            ? 'bg-emerald-950 border-emerald-400 text-emerald-300 shadow-lg shadow-emerald-950'
                            : isAnswerChecked && isSelected && !isCorrect
                            ? 'bg-rose-950 border-rose-500 text-rose-300'
                            : isSelected
                            ? 'bg-cyan-950 border-cyan-400 text-cyan-200'
                            : 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-100 hover:border-cyan-500/50'
                        }`}
                      >
                        <span>{opt}</span>
                        {isAnswerChecked && isTargetCorrect && (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        )}
                        {isAnswerChecked && isSelected && !isCorrect && (
                          <XCircle className="w-5 h-5 text-rose-400" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Result Feedback Banner */}
                {isAnswerChecked && (
                  <div className={`p-4 rounded-xl border flex items-center justify-between ${
                    isCorrect
                      ? 'bg-emerald-950/60 border-emerald-600 text-emerald-300'
                      : 'bg-rose-950/60 border-rose-600 text-rose-300'
                  }`}>
                    <div>
                      <p className="font-bold text-sm font-cyber">
                        {isCorrect ? 'Tahniah! Jawapan Tepat!' : 'Kurang Tepat!'}
                      </p>
                      <p className="text-xs font-tech">
                        {currentTableNum} × {currentMultiplier} = <strong className="text-white">{currentTableNum * currentMultiplier}</strong>
                      </p>
                    </div>

                    <button
                      onClick={handleSpinWheel}
                      className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-cyber font-bold text-xs flex items-center gap-1.5 shadow-md"
                    >
                      <span>Putar Lagi</span>
                      <RotateCw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

              </div>
            ) : (
              /* Idle Prompt Card */
              <div className="p-8 rounded-2xl bg-slate-950/60 border border-dashed border-slate-800 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400 text-2xl shadow-inner">
                  🎯
                </div>
                <div>
                  <h4 className="text-lg font-bold font-cyber text-white">
                    {gameMode === 'clock' ? 'Pilih Mana-Mana Hirisan Sifir' : 'Sedia untuk Berputar?'}
                  </h4>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1 leading-relaxed">
                    {gameMode === 'clock'
                      ? 'Klik mana-mana nombor pada roda untuk menyelesaikan sifir tersebut atau tekan butang Putar.'
                      : 'Tekan butang "PUTAR RODA SEKARANG!" di bawah roda untuk memulakan cabaran sifir anda.'}
                  </p>
                </div>
              </div>
            )}

            {/* Performance Stats Strip */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-center">
                <span className="text-[10px] font-tech text-slate-400 uppercase">JUMLAH SOALAN</span>
                <p className="text-lg font-bold font-tech text-slate-200">{totalAnswered}</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-center">
                <span className="text-[10px] font-tech text-slate-400 uppercase">KETEPATAN</span>
                <p className="text-lg font-bold font-tech text-emerald-400">
                  {totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0}%
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-center">
                <span className="text-[10px] font-tech text-slate-400 uppercase">KOMBO TERBAIK</span>
                <p className="text-lg font-bold font-tech text-amber-400">{bestStreak}x</p>
              </div>
            </div>

            {/* Clock Mode Completion Progress */}
            {gameMode === 'clock' && (
              <div className="p-4 rounded-xl bg-slate-950 border border-emerald-900/50 space-y-2">
                <div className="flex justify-between text-xs font-tech text-emerald-400 font-bold">
                  <span>KEMAJUAN RODA JAM SIFIR {selectedTable}:</span>
                  <span>{Object.keys(clockCompleted).length} / 12 LENGKAP</span>
                </div>
                <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-emerald-500 transition-all duration-500"
                    style={{ width: `${(Object.keys(clockCompleted).length / 12) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Quick Cheat Sheet Modal */}
      {showCheatSheet && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-cyan-800/80 shadow-2xl animate-fadeIn space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h4 className="font-cyber font-bold text-base text-cyan-300">
              JADUAL SIFIR RUJUKAN PANTAS (SIFIR 2 HINGGA 12)
            </h4>
            <button
              onClick={() => setShowCheatSheet(false)}
              className="text-xs text-slate-400 hover:text-white"
            >
              Tutup
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 text-xs font-tech">
            {[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(tbl => (
              <div key={tbl} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <p className="font-bold text-cyan-400 border-b border-slate-800 pb-1">SIFIR {tbl}</p>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(m => (
                  <p key={m} className="text-slate-300 text-[11px]">
                    {tbl} × {m} = <strong className="text-white">{tbl * m}</strong>
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Developer Attribution in Roda Sifir */}
      <div className="text-center pt-2 text-[11px] font-tech text-slate-500">
        <p>Pembangun Sistem: <strong className="text-cyan-400">{DEVELOPER_NAME}</strong> ({DEVELOPER_TITLE})</p>
      </div>

    </div>
  );
}
