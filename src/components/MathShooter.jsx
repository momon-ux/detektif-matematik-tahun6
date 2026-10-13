import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  ArrowLeft, RotateCcw, Volume2, VolumeX, Trophy, 
  Star, Zap, Award, Target, Flame, Sparkles, CheckCircle2, 
  HelpCircle, Play, Pause, ChevronRight, Crosshair, Home
} from 'lucide-react';
import { sound } from '../utils/sound';
import { recordScoreEntry, DEVELOPER_NAME } from '../utils/storage';

// Question generator for Math Shooter
function generateQuestion(mode, grade = 'Tahun 6') {
  let text = '';
  let correct = 0;
  let distractors = [];

  if (mode === 'sifir') {
    // Sifir 2 - 12
    const a = Math.floor(Math.random() * 11) + 2; // 2 - 12
    const b = Math.floor(Math.random() * 11) + 2; // 2 - 12
    text = `${a} × ${b}`;
    correct = a * b;

    // Distractors close to answer
    const deltas = [-3, -2, -1, 1, 2, 3, 5, -5, 10, -10];
    const set = new Set([correct]);
    while (set.size < 4) {
      const delta = deltas[Math.floor(Math.random() * deltas.length)];
      const val = correct + delta;
      if (val > 0) set.add(val);
    }
    distractors = Array.from(set).filter(v => v !== correct).slice(0, 3);

  } else if (mode === 'tambah-tolak') {
    // Basic addition & subtraction (including negative numbers like the example photo -8)
    const isSub = Math.random() > 0.4;
    if (isSub) {
      const isNeg = Math.random() > 0.6;
      if (isNeg) {
        // Results in negative, e.g. 5 - 13 = -8
        const ans = -(Math.floor(Math.random() * 12) + 2);
        const a = Math.floor(Math.random() * 10) + 1;
        const b = a - ans;
        text = `${a} − ${b}`;
        correct = ans;
      } else {
        const a = Math.floor(Math.random() * 60) + 15;
        const b = Math.floor(Math.random() * (a - 5)) + 3;
        text = `${a} − ${b}`;
        correct = a - b;
      }
    } else {
      const a = Math.floor(Math.random() * 45) + 5;
      const b = Math.floor(Math.random() * 45) + 5;
      text = `${a} + ${b}`;
      correct = a + b;
    }

    const set = new Set([correct]);
    while (set.size < 4) {
      const delta = (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 8) + 1);
      set.add(correct + delta);
    }
    distractors = Array.from(set).filter(v => v !== correct).slice(0, 3);

  } else if (mode === 'bahagi') {
    // Sifir Bahagi
    const b = Math.floor(Math.random() * 10) + 2; // 2 - 11
    const ans = Math.floor(Math.random() * 11) + 2; // 2 - 12
    const a = b * ans;
    text = `${a} ÷ ${b}`;
    correct = ans;

    const set = new Set([correct]);
    while (set.size < 4) {
      const delta = (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 4) + 1);
      const val = correct + delta;
      if (val > 0) set.add(val);
    }
    distractors = Array.from(set).filter(v => v !== correct).slice(0, 3);

  } else {
    // Tahun 5 & 6 Campuran (Peratus & Darab Pantas)
    const type = Math.floor(Math.random() * 3);
    if (type === 0) {
      // Peratus: 10%, 20%, 25%, 50%
      const pList = [10, 20, 25, 50];
      const p = pList[Math.floor(Math.random() * pList.length)];
      const base = (Math.floor(Math.random() * 8) + 2) * (p === 25 ? 40 : 20);
      text = `${p}% daripada ${base}`;
      correct = (p / 100) * base;
    } else if (type === 1) {
      // Wang RM
      const p1 = Math.floor(Math.random() * 20) + 5;
      const p2 = Math.floor(Math.random() * 20) + 5;
      text = `RM${p1} + RM${p2}`;
      correct = p1 + p2;
    } else {
      // Pecahan mudah
      const a = Math.floor(Math.random() * 9) + 2;
      const b = Math.floor(Math.random() * 9) + 2;
      text = `${a} × ${b}`;
      correct = a * b;
    }

    const set = new Set([correct]);
    while (set.size < 4) {
      const delta = (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 6) + 2);
      const val = correct + delta;
      set.add(val);
    }
    distractors = Array.from(set).filter(v => v !== correct).slice(0, 3);
  }

  // Shuffle options into 3 or 4 balloons
  const allAnswers = [correct, ...distractors.slice(0, 2)]; // 3 balloons like in user's image!
  allAnswers.sort(() => Math.random() - 0.5);

  return {
    questionText: text,
    correctAnswer: correct,
    options: allAnswers
  };
}

const BALLOON_COLORS = [
  { bg: 'from-orange-500 to-amber-600', border: 'border-orange-800', textColor: 'text-white', shadow: 'shadow-orange-950/60' },
  { bg: 'from-rose-500 to-red-600', border: 'border-rose-800', textColor: 'text-white', shadow: 'shadow-rose-950/60' },
  { bg: 'from-amber-500 to-yellow-600', border: 'border-amber-800', textColor: 'text-white', shadow: 'shadow-amber-950/60' },
];

export default function MathShooter({ profile, onUpdateProfile, onBack }) {
  // Game Setup
  const [gameMode, setGameMode] = useState('sifir'); // 'sifir' | 'tambah-tolak' | 'bahagi' | 'campuran'
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  // Live Game State
  const [currentQ, setCurrentQ] = useState(null);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [floatingFeedback, setFloatingFeedback] = useState(null); // { text, type, x, y }

  // Cannon & Projectile Animation State
  const [cannonAngle, setCannonAngle] = useState(45); // degrees
  const [isFiring, setIsFiring] = useState(false);
  const [projectile, setProjectile] = useState(null); // { x, y, targetIdx, isHit }
  const [poppedIndex, setPoppedIndex] = useState(null);
  const [particles, setParticles] = useState([]);

  const arenaRef = useRef(null);

  // Start new round
  const startGame = (mode = gameMode) => {
    sound.playClick();
    setGameMode(mode);
    setScore(0);
    setCombo(0);
    setMaxCombo(0);
    setTimeLeft(60);
    setTotalAnswered(0);
    setTotalCorrect(0);
    setGameOver(false);
    setIsPlaying(true);
    setCurrentQ(generateQuestion(mode, profile.selectedGrade || 'Tahun 6'));
  };

  // Timer countdown
  useEffect(() => {
    if (!isPlaying || gameOver) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          handleGameOver();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying, gameOver]);

  // Handle Game Over & Save records
  const handleGameOver = () => {
    setIsPlaying(false);
    setGameOver(true);
    sound.playVictory();

    const xpEarned = Math.round(score * 1.5) + (totalCorrect * 20);
    const updated = recordScoreEntry(profile, {
      category: `Math Shooter: ${gameMode.toUpperCase()}`,
      title: `Meriam Matematik (${score} Mata)`,
      score: score,
      accuracy: totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0,
      xpEarned: xpEarned,
      isVictory: totalCorrect >= 8
    });

    if (onUpdateProfile) {
      onUpdateProfile({
        ...updated,
        xp: (profile.xp || 0) + xpEarned
      });
    }
  };

  // Shoot at balloon index
  const handleShootBalloon = (optionVal, balloonIdx) => {
    if (isFiring || !isPlaying || gameOver || !currentQ) return;

    // Calculate angle towards balloon
    // Balloon 0 is top-left, 1 is top-center, 2 is top-right
    const angles = [28, 48, 68];
    const targetAngle = angles[balloonIdx] || 45;
    setCannonAngle(targetAngle);

    // Play cannon shot sound
    sound.playCannonShot();
    setIsFiring(true);

    const isCorrect = optionVal === currentQ.correctAnswer;

    // Trigger projectile flight
    setProjectile({
      targetIdx: balloonIdx,
      isCorrect: isCorrect,
      val: optionVal
    });

    // Impact after short trajectory (300ms)
    setTimeout(() => {
      if (isCorrect) {
        sound.playBalloonPop();
        sound.playCombo();
        setPoppedIndex(balloonIdx);

        // Spawn colorful burst particles
        const burst = Array.from({ length: 16 }).map((_, i) => ({
          id: Math.random(),
          angle: (i / 16) * 360,
          speed: Math.random() * 60 + 40,
          color: ['#f97316', '#eab308', '#ef4444', '#38bdf8', '#4ade80'][i % 5]
        }));
        setParticles(burst);

        const newCombo = combo + 1;
        setCombo(newCombo);
        if (newCombo > maxCombo) setMaxCombo(newCombo);

        const points = 100 + (newCombo * 20);
        setScore(s => s + points);
        setTotalCorrect(c => c + 1);
        setTotalAnswered(a => a + 1);

        setFloatingFeedback({ text: `+${points} TEPAT! 🎯`, type: 'success' });

        // Next question after pop
        setTimeout(() => {
          setPoppedIndex(null);
          setParticles([]);
          setIsFiring(false);
          setProjectile(null);
          setFloatingFeedback(null);
          setCurrentQ(generateQuestion(gameMode, profile.selectedGrade || 'Tahun 6'));
        }, 450);

      } else {
        sound.playWrong();
        setCombo(0);
        setTotalAnswered(a => a + 1);
        setFloatingFeedback({ text: `SALAH! ❌`, type: 'wrong' });

        setTimeout(() => {
          setIsFiring(false);
          setProjectile(null);
          setFloatingFeedback(null);
        }, 400);
      }
    }, 280);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 py-2 space-y-3">
      
      {/* Top Header Bar */}
      <div className="flex items-center justify-between gap-2 p-2.5 sm:p-3 rounded-2xl bg-slate-900/90 border border-cyan-800/60 shadow-lg backdrop-blur-md">
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Prominent Back & Home Buttons */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => {
                sound.playClick();
                onBack();
              }}
              className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-cyber font-bold transition-all shadow active:scale-95"
              title="Kembali ke Peta Misi"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>KEMBALI</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onBack();
              }}
              className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white border border-emerald-400/60 text-xs font-cyber font-bold shadow-md shadow-emerald-950 transition-all active:scale-95"
              title="Kembali ke Laman Utama"
            >
              <Home className="w-3.5 h-3.5 text-emerald-300" />
              <span>LAMAN UTAMA</span>
            </button>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-lg bg-orange-500/20 text-orange-400 border border-orange-500/40 hidden xs:inline-flex">
              <Crosshair className="w-4 h-4 animate-spin" />
            </span>
            <div>
              <h2 className="text-xs sm:text-sm font-cyber font-extrabold text-white tracking-wide">
                MATH SHOOTER // <span className="text-orange-400">MERIAM MATEMATIK</span>
              </h2>
              <p className="text-[10px] text-cyan-300 font-tech">
                EJEN: {profile.agentName} ({profile.studentClass})
              </p>
            </div>
          </div>
        </div>

        {/* Stats Pills during gameplay */}
        {isPlaying && (
          <div className="flex items-center gap-2 sm:gap-3 text-xs font-tech font-bold">
            <div className="px-2.5 py-1 rounded-xl bg-amber-950/80 border border-amber-600/60 text-amber-300 flex items-center gap-1">
              <Trophy className="w-3.5 h-3.5" />
              <span>{score} MATA</span>
            </div>

            <div className="px-2.5 py-1 rounded-xl bg-rose-950/80 border border-rose-600/60 text-rose-300 flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-rose-400" />
              <span>{combo}x COMBO</span>
            </div>

            <div className={`px-2.5 py-1 rounded-xl border flex items-center gap-1 ${
              timeLeft <= 10 ? 'bg-rose-900 border-rose-500 text-white animate-pulse' : 'bg-slate-950 border-cyan-800 text-cyan-300'
            }`}>
              <span>⏱️ {timeLeft}s</span>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* MAIN GAME ARENA (Cartoon Math Shooter Scene)                              */}
      {/* ========================================================================= */}
      <div 
        ref={arenaRef}
        className="relative w-full aspect-[16/9] min-h-[360px] max-h-[75vh] rounded-3xl overflow-hidden border-4 border-slate-900 shadow-2xl select-none bg-gradient-to-b from-sky-400 via-sky-300 to-sky-200 flex flex-col justify-between"
      >
        {/* In-Arena Floating Home & Back Navigation */}
        <div className="absolute top-2 left-2 z-30 flex items-center gap-1.5">
          <button
            onClick={() => {
              sound.playClick();
              onBack();
            }}
            className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-950/80 hover:bg-slate-900 text-slate-200 hover:text-white border border-slate-700/80 text-[11px] font-cyber font-bold backdrop-blur-md shadow-lg transition-transform active:scale-95"
            title="Kembali"
          >
            <ArrowLeft className="w-3 h-3" />
            <span>KEMBALI</span>
          </button>
          <button
            onClick={() => {
              sound.playClick();
              onBack();
            }}
            className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 hover:text-white border border-emerald-500/50 text-[11px] font-cyber font-bold backdrop-blur-md shadow-lg transition-transform active:scale-95"
            title="Ke Laman Utama"
          >
            <Home className="w-3 h-3 text-emerald-400" />
            <span>LAMAN UTAMA</span>
          </button>
        </div>

        {/* Floating Clouds Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-6 left-10 w-28 h-12 bg-white/70 rounded-full blur-[1px] animate-pulse"></div>
          <div className="absolute top-10 left-20 w-16 h-10 bg-white/80 rounded-full"></div>
          <div className="absolute top-14 right-20 w-36 h-14 bg-white/60 rounded-full blur-[1px]"></div>
          <div className="absolute top-8 right-32 w-20 h-10 bg-white/80 rounded-full"></div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* TOP: QUESTION BOARD (Like the user photo: 2 + 3)               */}
        {/* ------------------------------------------------------------- */}
        <div className="relative z-20 pt-4 sm:pt-6 text-center">
          {isPlaying && currentQ ? (
            <div className="inline-block px-6 sm:px-10 py-2 sm:py-3.5 rounded-3xl bg-amber-400/90 border-4 border-amber-600 shadow-xl shadow-amber-950/30 transform hover:scale-105 transition-transform">
              <span className="text-2xl sm:text-4xl md:text-5xl font-black font-cyber text-amber-950 tracking-wider drop-shadow-sm">
                {currentQ.questionText}
              </span>
            </div>
          ) : (
            <div className="inline-block px-5 py-2 rounded-2xl bg-slate-950/80 border border-cyan-500/50 shadow-xl backdrop-blur-md">
              <h3 className="text-lg sm:text-2xl font-cyber font-extrabold text-amber-300 tracking-wider">
                🎯 MATH SHOOTER // MERIAM SIFIR
              </h3>
              <p className="text-xs text-cyan-200 font-tech">
                PILIH MOD PERMAINAN DI BAWAH & TEMBAK BELON JAWAPAN YANG TEPAT!
              </p>
            </div>
          )}

          {/* Floating Feedback Popup */}
          {floatingFeedback && (
            <div className={`mt-2 text-sm sm:text-base font-cyber font-black animate-bounce ${
              floatingFeedback.type === 'success' ? 'text-emerald-700 drop-shadow' : 'text-rose-700'
            }`}>
              {floatingFeedback.text}
            </div>
          )}
        </div>

        {/* ------------------------------------------------------------- */}
        {/* MIDDLE: FLOATING BALLOONS (Targets to Shoot)                  */}
        {/* ------------------------------------------------------------- */}
        {isPlaying && currentQ ? (
          <div className="relative z-20 flex-1 flex items-center justify-center px-4 sm:px-12">
            <div className="w-full max-w-2xl grid grid-cols-3 gap-4 sm:gap-8 items-center justify-items-center">
              {currentQ.options.map((val, idx) => {
                const color = BALLOON_COLORS[idx % BALLOON_COLORS.length];
                const isPopped = poppedIndex === idx;

                return (
                  <button
                    key={`${currentQ.questionText}-${idx}`}
                    onClick={() => handleShootBalloon(val, idx)}
                    disabled={isFiring || isPopped}
                    className={`group relative flex flex-col items-center focus:outline-none transition-transform transform active:scale-95 ${
                      isPopped ? 'scale-0 opacity-0 transition-all duration-300' : 'animate-bounce'
                    }`}
                    style={{ animationDuration: `${2.2 + idx * 0.3}s` }}
                    title={`Tembak Belon: ${val}`}
                  >
                    {/* Balloon Body */}
                    <div className={`w-20 h-24 sm:w-28 sm:h-32 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] bg-gradient-to-tr ${color.bg} border-4 ${color.border} ${color.shadow} shadow-2xl flex items-center justify-center relative overflow-hidden transition-all group-hover:scale-110 group-hover:brightness-110`}>
                      {/* Glossy Balloon Highlight */}
                      <div className="absolute top-2 left-3 w-4 h-8 bg-white/40 rounded-full rotate-[-25deg]"></div>
                      
                      {/* Big Number Label */}
                      <span className="text-2xl sm:text-4xl font-black font-cyber text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
                        {val}
                      </span>
                    </div>

                    {/* Balloon Knot & String */}
                    <div className="w-3 h-2 bg-orange-800 rounded-b-md mt-[-2px]"></div>
                    <div className="w-0.5 h-6 sm:h-8 bg-slate-700/60"></div>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          /* START SCREEN: CHOOSE MODE */
          <div className="relative z-20 flex-1 flex flex-col items-center justify-center p-4">
            {!gameOver && (
              <div className="bg-slate-950/90 border-2 border-amber-500/60 rounded-3xl p-5 sm:p-6 shadow-2xl max-w-lg w-full text-center space-y-4 backdrop-blur-md animate-fadeIn">
                <h4 className="text-sm sm:text-base font-cyber font-bold text-white flex items-center justify-center gap-2">
                  <Target className="w-4 h-4 text-orange-400" />
                  <span>PILIH MOD CABARAN:</span>
                </h4>

                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    onClick={() => startGame('sifir')}
                    className="p-3 rounded-2xl bg-gradient-to-br from-amber-600 to-orange-700 hover:from-amber-500 hover:to-orange-600 text-white font-cyber font-bold text-xs shadow-lg transition-transform hover:scale-105 border border-amber-300/40 text-left"
                  >
                    <div className="text-lg">✖️ SIFIR PANTAS</div>
                    <div className="text-[10px] text-amber-200 font-tech">Sifir Darab 2 - 12</div>
                  </button>

                  <button
                    onClick={() => startGame('tambah-tolak')}
                    className="p-3 rounded-2xl bg-gradient-to-br from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white font-cyber font-bold text-xs shadow-lg transition-transform hover:scale-105 border border-cyan-300/40 text-left"
                  >
                    <div className="text-lg">➕ TAMBAH & TOLAK</div>
                    <div className="text-[10px] text-cyan-200 font-tech">Termasuk Negatif (-8)</div>
                  </button>

                  <button
                    onClick={() => startGame('bahagi')}
                    className="p-3 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-cyber font-bold text-xs shadow-lg transition-transform hover:scale-105 border border-emerald-300/40 text-left"
                  >
                    <div className="text-lg">➗ BAHAGI SIBER</div>
                    <div className="text-[10px] text-emerald-200 font-tech">Sifir Bahagi Laju</div>
                  </button>

                  <button
                    onClick={() => startGame('campuran')}
                    className="p-3 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-700 hover:from-purple-500 hover:to-pink-600 text-white font-cyber font-bold text-xs shadow-lg transition-transform hover:scale-105 border border-purple-300/40 text-left"
                  >
                    <div className="text-lg">⚡ TAHUN 5 & 6</div>
                    <div className="text-[10px] text-purple-200 font-tech">Peratus & Pecahan</div>
                  </button>
                </div>

                <p className="text-[11px] text-slate-400 font-tech">
                  🎮 Sentuh belon jawapan yang betul untuk melepaskan tembakan meriam!
                </p>
              </div>
            )}
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* BOTTOM: GRASSY HILL & CARTOON CANNON (Just like the photo!)   */}
        {/* ------------------------------------------------------------- */}
        <div className="relative z-10 w-full h-24 sm:h-28">
          {/* Green Grassy Mound */}
          <div className="absolute inset-x-0 bottom-0 h-20 sm:h-24 bg-gradient-to-t from-emerald-700 to-emerald-500 rounded-t-[100%_40px] border-t-4 border-emerald-800 shadow-inner">
            <div className="absolute bottom-2 left-10 flex gap-1">
              <div className="w-2 h-4 bg-emerald-400 rounded-full rotate-[-15deg]"></div>
              <div className="w-2 h-5 bg-emerald-300 rounded-full rotate-[10deg]"></div>
            </div>
            <div className="absolute bottom-2 right-20 flex gap-1">
              <div className="w-2 h-5 bg-emerald-300 rounded-full rotate-[-10deg]"></div>
              <div className="w-2 h-4 bg-emerald-400 rounded-full rotate-[15deg]"></div>
            </div>
          </div>

          {/* Green Cartoon Cannon (Bottom Left) */}
          <div className="absolute bottom-2 left-6 sm:left-14 flex items-end">
            <div className="relative">
              {/* Cannon Barrel (Rotatable Angle) */}
              <div 
                className="w-16 sm:w-24 h-8 sm:h-11 bg-gradient-to-r from-emerald-800 to-emerald-600 border-4 border-emerald-950 rounded-r-xl origin-bottom-left shadow-2xl transition-transform duration-200 relative"
                style={{ transform: `rotate(-${cannonAngle}deg)` }}
              >
                {/* Barrel Rim / Muzzle */}
                <div className="absolute right-0 top-[-2px] bottom-[-2px] w-3.5 bg-emerald-950 rounded-r-md"></div>
                
                {/* Cannonball Fired Animation */}
                {isFiring && (
                  <div className="absolute right-[-14px] top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 border-2 border-yellow-200 shadow-lg shadow-orange-500 animate-ping"></div>
                )}
              </div>

              {/* Cannon Mount & Wheel Base */}
              <div className="relative z-10 mt-[-10px]">
                {/* Turret Mount */}
                <div className="w-12 sm:w-16 h-8 sm:h-10 bg-emerald-800 border-4 border-emerald-950 rounded-t-full shadow-lg"></div>
                {/* Heavy Base Sled */}
                <div className="w-16 sm:w-20 h-4 sm:h-5 bg-emerald-900 border-4 border-emerald-950 rounded-full mt-[-4px]"></div>
              </div>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* GAME OVER MODAL                                               */}
        {/* ------------------------------------------------------------- */}
        {gameOver && (
          <div className="absolute inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-slate-900 border-2 border-amber-500/80 rounded-3xl p-6 shadow-2xl max-w-md w-full text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-500/20 border border-amber-400/50 flex items-center justify-center text-3xl shadow-lg">
                🏆
              </div>

              <div>
                <h3 className="text-xl font-cyber font-black text-amber-300">
                  TAMAT MISI MATH SHOOTER!
                </h3>
                <p className="text-xs text-slate-300 font-tech">
                  REKOD MARKAH TELAH DISIMPAN KE BUKU LOG KALENDAR KELAS
                </p>
              </div>

              {/* Score Recap */}
              <div className="grid grid-cols-3 gap-2 p-3 bg-slate-950 rounded-2xl border border-slate-800 text-center">
                <div>
                  <span className="text-[10px] text-slate-400 font-tech">SKOR</span>
                  <p className="text-lg font-cyber font-bold text-amber-400">{score}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-tech">KETEPATAN</span>
                  <p className="text-lg font-cyber font-bold text-emerald-400">
                    {totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0}%
                  </p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-tech">MAX COMBO</span>
                  <p className="text-lg font-cyber font-bold text-rose-400">{maxCombo}x</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => startGame(gameMode)}
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-xs font-cyber font-bold text-white shadow-lg flex items-center justify-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Main Lagi</span>
                </button>
                <button
                  onClick={onBack}
                  className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-cyber font-bold text-slate-200 flex items-center justify-center gap-1.5"
                >
                  <Home className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Laman Utama</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Slim Game Footer */}
      <div className="text-center text-[10px] font-tech text-slate-500">
        Math Shooter KSSR Semakan • Dibangunkan oleh <strong className="text-amber-400">{DEVELOPER_NAME}</strong>
      </div>

    </div>
  );
}
