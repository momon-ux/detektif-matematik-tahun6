import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { 
  ArrowLeft, RotateCw, Zap, Trophy, Flame, CheckCircle2, 
  XCircle, Timer, Volume2, Sparkles, HelpCircle, Eye, EyeOff,
  Shield, Swords, Skull, Heart, Gift, Play, Award, RefreshCw, Home
} from 'lucide-react';
import { sound } from '../utils/sound';
import { recordScoreEntry, DEVELOPER_NAME, DEVELOPER_TITLE } from '../utils/storage';

const SLICES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const SLICE_COLORS = [
  '#06b6d4', '#3b82f6', '#6366f1', '#8b5cf6', 
  '#ec4899', '#f43f5e', '#f97316', '#eab308', 
  '#10b981', '#14b8a6', '#0ea5e9', '#a855f7'
];

const BOSS_LIST = [
  {
    id: 'boss-1',
    name: 'Virus Bug-Byte',
    avatar: '👾',
    maxHp: 120,
    dmgPerHit: 25,
    attackTime: 9,
    tables: [2, 3, 4, 5],
    desc: 'Penceroboh sistem memori asas. Lemah pada sifir 2 hingga 5.',
    rewardXp: 180,
    color: 'from-emerald-500 to-cyan-500'
  },
  {
    id: 'boss-2',
    name: 'Trojan Overlord',
    avatar: '🤖',
    maxHp: 240,
    dmgPerHit: 30,
    attackTime: 8,
    tables: [6, 7, 8, 9],
    desc: 'Penggodam server utama ARMS. Menguji ketangkasan sifir 6 hingga 9.',
    rewardXp: 350,
    color: 'from-amber-500 to-rose-500'
  },
  {
    id: 'boss-3',
    name: 'Lord Glitch Matrix',
    avatar: '💀',
    maxHp: 380,
    dmgPerHit: 35,
    attackTime: 7,
    tables: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    desc: 'Bos Agresif Terhebat! Memerlukan gabungan semua sifir 2 hingga 12.',
    rewardXp: 600,
    color: 'from-purple-500 to-rose-600'
  }
];

export default function RodaSifir({ profile, onUpdateProfile, onBack }) {
  const [gameMode, setGameMode] = useState('boss'); // 'boss' | 'timed' | 'spin' | 'clock' | 'beat'
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
  
  // Power-Ups in Speed/Boss Mode
  const [powerShield, setPowerShield] = useState(false);
  const [powerFreezeUsed, setPowerFreezeUsed] = useState(false);
  const [powerFiftyUsed, setPowerFiftyUsed] = useState(false);
  const [disabledOptions, setDisabledOptions] = useState([]);

  // Boss Battle State
  const [selectedBossIndex, setSelectedBossIndex] = useState(0);
  const [bossHp, setBossHp] = useState(BOSS_LIST[0].maxHp);
  const [playerLives, setPlayerLives] = useState(3);
  const [bossTimer, setBossTimer] = useState(BOSS_LIST[0].attackTime);
  const [isBossActive, setIsBossActive] = useState(false);
  const [bossStatus, setBossStatus] = useState('idle'); // 'idle' | 'fighting' | 'won' | 'lost'
  const [floatingDamage, setFloatingDamage] = useState(null);
  const [screenShake, setScreenShake] = useState(false);

  // Clock Wheel Mode State (12 slices completion)
  const [clockCompleted, setClockCompleted] = useState({});
  const [activeClockSlice, setActiveClockSlice] = useState(null);

  // Timed Mode State
  const [timeLimitOption, setTimeLimitOption] = useState(60); // 30, 60, 90, or 999 (Survival)
  const [timeLeft, setTimeLeft] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Mystery Box State
  const [showMysteryBox, setShowMysteryBox] = useState(false);
  const [mysteryReward, setMysteryReward] = useState(null);

  // Table Cheat Sheet Modal
  const [showCheatSheet, setShowCheatSheet] = useState(false);

  // Audio & Animation refs
  const lastTickAngle = useRef(0);
  const bossTimerRef = useRef(null);

  const activeBoss = BOSS_LIST[selectedBossIndex];

  // Generate 4 Multiple Choice Options
  const generateOptions = (table, multiplier) => {
    const correct = table * multiplier;
    const opts = new Set([correct]);
    
    while (opts.size < 4) {
      const offset = (Math.floor(Math.random() * 5) - 2) * table;
      const fake = correct + offset;
      if (fake > 0 && fake !== correct) {
        opts.add(fake);
      } else {
        const randomNum = (table + Math.floor(Math.random() * 3) - 1) * (multiplier + Math.floor(Math.random() * 3) - 1);
        if (randomNum > 0 && randomNum !== correct) {
          opts.add(randomNum);
        } else {
          opts.add(correct + (Math.floor(Math.random() * 8) + 1));
        }
      }
    }
    return Array.from(opts).sort(() => Math.random() - 0.5);
  };

  // Setup Next Question
  const nextQuestionForMode = (mode = gameMode) => {
    setSelectedOption(null);
    setIsAnswerChecked(false);
    setIsCorrect(false);
    setDisabledOptions([]);

    let table;
    let mult;

    if (mode === 'boss') {
      const allowedTables = activeBoss.tables;
      table = allowedTables[Math.floor(Math.random() * allowedTables.length)];
      mult = Math.floor(Math.random() * 12) + 1;
      setBossTimer(activeBoss.attackTime);
    } else if (mode === 'timed') {
      table = selectedTable === 'random' ? Math.floor(Math.random() * 11) + 2 : Number(selectedTable);
      mult = Math.floor(Math.random() * 12) + 1;
    } else {
      table = selectedTable === 'random' ? Math.floor(Math.random() * 11) + 2 : Number(selectedTable);
      mult = Math.floor(Math.random() * 12) + 1;
    }

    setCurrentTableNum(table);
    setCurrentMultiplier(mult);
    setOptions(generateOptions(table, mult));
  };

  // Start Boss Battle
  const handleStartBossBattle = (index = selectedBossIndex) => {
    setSelectedBossIndex(index);
    const boss = BOSS_LIST[index];
    setBossHp(boss.maxHp);
    setPlayerLives(3);
    setStreak(0);
    setBossTimer(boss.attackTime);
    setBossStatus('fighting');
    setIsBossActive(true);
    setPowerShield(false);
    setPowerFreezeUsed(false);
    setPowerFiftyUsed(false);
    sound.playClick();

    // Generate first question
    const table = boss.tables[Math.floor(Math.random() * boss.tables.length)];
    const mult = Math.floor(Math.random() * 12) + 1;
    setCurrentTableNum(table);
    setCurrentMultiplier(mult);
    setOptions(generateOptions(table, mult));
    setSelectedOption(null);
    setIsAnswerChecked(false);
  };

  // Boss Attack Countdown Timer
  useEffect(() => {
    let interval;
    if (gameMode === 'boss' && bossStatus === 'fighting' && isBossActive) {
      interval = setInterval(() => {
        setBossTimer(prev => {
          if (prev <= 1) {
            // Boss strikes because player ran out of time!
            handleBossAttackPlayer('Masa Menjawab Tamat! Serangan Bos Kena!');
            return activeBoss.attackTime;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameMode, bossStatus, isBossActive, selectedBossIndex, playerLives, powerShield]);

  // When Boss Attacks Player
  const handleBossAttackPlayer = (reasonText = '') => {
    if (powerShield) {
      // Shield absorbs blow
      sound.playPowerUp();
      setPowerShield(false);
      setFloatingDamage({ text: '🛡️ PERISAI MENYELAMATKAN ANDA!', type: 'shield' });
      setTimeout(() => setFloatingDamage(null), 1500);
      nextQuestionForMode('boss');
      return;
    }

    sound.playBossAttack();
    setScreenShake(true);
    setTimeout(() => setScreenShake(false), 500);

    setStreak(0);
    setPlayerLives(prev => {
      const nextLives = prev - 1;
      if (nextLives <= 0) {
        // Player defeated
        setBossStatus('lost');
        setIsBossActive(false);
        sound.playWrong();
        return 0;
      }
      return nextLives;
    });

    setFloatingDamage({ text: `-1 NYAWA! ${reasonText}`, type: 'player-hit' });
    setTimeout(() => setFloatingDamage(null), 1500);
    nextQuestionForMode('boss');
  };

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
        const xpEarned = Math.round(score / 4);
        const updated = recordScoreEntry(profile, {
          category: `Roda Sifir (Pecut ${timeLimitOption}s)`,
          title: `Roda Sifir: Pecut ${timeLimitOption} Saat (Skor ${score})`,
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

  // Spin Wheel Logic
  const handleSpinWheel = () => {
    if (isSpinning) return;
    sound.playClick();
    setIsSpinning(true);
    setLandedNumber(null);
    setSelectedOption(null);
    setIsAnswerChecked(false);

    const randomRotations = 5 + Math.floor(Math.random() * 5);
    const targetSlice = Math.floor(Math.random() * 12) + 1;
    const sliceAngle = 360 / 12;
    const targetAngle = (targetSlice - 1) * sliceAngle;
    const finalRotation = rotation + (randomRotations * 360) + (360 - (rotation % 360)) + (360 - targetAngle);

    setRotation(finalRotation);

    const tickInterval = setInterval(() => {
      sound.playWheelTick(1200 + Math.random() * 400);
    }, 140);

    setTimeout(() => {
      clearInterval(tickInterval);
      setIsSpinning(false);
      setLandedNumber(targetSlice);
      sound.playSuccess();

      const activeTable = selectedTable === 'random' 
        ? Math.floor(Math.random() * 11) + 2 
        : Number(selectedTable);

      setCurrentTableNum(activeTable);
      setCurrentMultiplier(targetSlice);
      setOptions(generateOptions(activeTable, targetSlice));
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

      const isCritical = newStreak >= 3;
      const damage = isCritical ? activeBoss.dmgPerHit * 2 : activeBoss.dmgPerHit;

      // Boss Battle Damage Logic
      if (gameMode === 'boss' && bossStatus === 'fighting') {
        sound.playLaser();
        setTimeout(() => sound.playBossHit(), 100);
        if (isCritical) {
          setTimeout(() => sound.playCriticalHit(), 150);
          confetti({ particleCount: 40, spread: 45, origin: { y: 0.4 } });
        }

        setFloatingDamage({
          text: isCritical ? `💥 CRITICAL HIT! -${damage} HP` : `⚡ SERANGAN SIBER! -${damage} HP`,
          type: isCritical ? 'crit' : 'hit'
        });
        setTimeout(() => setFloatingDamage(null), 1200);

        setBossHp(prevHp => {
          const nextHp = prevHp - damage;
          if (nextHp <= 0) {
            // Boss Defeated!
            setBossStatus('won');
            setIsBossActive(false);
            sound.playBossDefeat();
            confetti({ particleCount: 220, spread: 100, origin: { y: 0.5 } });

            // Record Boss Victory
            if (onUpdateProfile) {
              const updated = recordScoreEntry(profile, {
                category: 'Pertarungan Bos Siber (Roda Sifir)',
                title: `Kemenangan Bos: ${activeBoss.name} Ditewaskan!`,
                score: activeBoss.rewardXp * 3,
                accuracy: '100% K.O',
                xp: activeBoss.rewardXp
              });
              onUpdateProfile({
                ...updated,
                xp: updated.xp + activeBoss.rewardXp
              });
            }
            return 0;
          }
          return nextHp;
        });

        // Next Boss Question after short delay
        setTimeout(() => {
          if (bossHp - damage > 0) {
            nextQuestionForMode('boss');
          }
        }, 1200);
        return;
      }

      // Streaks Fanfare
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

      // If in timed mode, auto advance
      if (gameMode === 'timed') {
        setTimeout(() => {
          nextQuestionForMode('timed');
        }, 800);
      }

      // Update player profile XP in storage
      if (onUpdateProfile) {
        onUpdateProfile({
          ...profile,
          xp: profile.xp + earnedXp
        });
      }
    } else {
      // Wrong Answer
      sound.playWrong();
      setStreak(0);

      if (gameMode === 'boss' && bossStatus === 'fighting') {
        handleBossAttackPlayer('Jawapan Salah! Bos Menyerang!');
      }
    }
  };

  // Power Up 1: 50/50
  const handleUseFiftyFifty = () => {
    if (powerFiftyUsed || !options.length || isAnswerChecked) return;
    sound.playClick();
    setPowerFiftyUsed(true);
    const correct = currentTableNum * currentMultiplier;
    const wrongs = options.filter(o => o !== correct);
    const toDisable = wrongs.slice(0, 2);
    setDisabledOptions(toDisable);
    sound.playPowerUp();
  };

  // Power Up 2: Freeze Time (+5s)
  const handleUseFreezeTime = () => {
    if (powerFreezeUsed) return;
    sound.playPowerUp();
    setPowerFreezeUsed(true);
    if (gameMode === 'boss') {
      setBossTimer(prev => prev + 5);
    } else if (gameMode === 'timed') {
      setTimeLeft(prev => prev + 10);
    }
  };

  // Power Up 3: Shield
  const handleUseShield = () => {
    if (powerShield) return;
    sound.playPowerUp();
    setPowerShield(true);
  };

  // Mystery Box Reward Trigger
  const handleOpenMysteryCrate = () => {
    sound.playLevelUp();
    const rewards = [
      { xp: 100, text: '💎 Peti Kristal Siber: +100 XP!' },
      { xp: 200, text: '⭐ Cip Kripto Emas: +200 XP!' },
      { xp: 300, text: '👑 Mahkota Sifir Legenda: +300 XP!' }
    ];
    const picked = rewards[Math.floor(Math.random() * rewards.length)];
    setMysteryReward(picked);
    confetti({ particleCount: 150, spread: 70 });
    if (onUpdateProfile) {
      onUpdateProfile({
        ...profile,
        xp: profile.xp + picked.xp
      });
    }
  };

  // Reset Timed Mode
  const handleResetTimed = (timeSec = 60) => {
    setTimeLimitOption(timeSec);
    setTimeLeft(timeSec);
    setIsTimerRunning(false);
    setScore(0);
    setStreak(0);
    setTotalAnswered(0);
    setTotalCorrect(0);
    setCurrentMultiplier(null);
  };

  return (
    <div className={`max-w-6xl mx-auto px-4 py-8 space-y-6 ${screenShake ? 'animate-shake' : ''}`}>
      
      {/* Top Header & Back Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sound.playClick();
                onBack();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-cyber font-bold text-slate-200 hover:text-cyan-400 border border-slate-700 transition-all shadow"
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
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-xs font-cyber font-bold text-white border border-emerald-400/60 transition-all shadow-md shadow-emerald-950"
              title="Ke Laman Utama (Peta Misi)"
            >
              <Home className="w-3.5 h-3.5" />
              <span>LAMAN UTAMA</span>
            </button>
          </div>

          <span className="text-slate-600 hidden sm:inline">•</span>

          <div className="text-xs font-tech text-slate-300 flex items-center gap-1.5 bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-800">
            <span>EJEN: <strong className="text-cyan-400">{profile.agentName}</strong></span>
            <span>|</span>
            <span>KELAS: <strong className="text-amber-300 font-bold">{profile.selectedGrade ? `${profile.selectedGrade} - ` : ''}{profile.studentClass}</strong></span>
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
            <span>XP: {profile.xp}</span>
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
              ARENA KILAT ARMS // PERMAINAN MATEMATIK TAHUN 6
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-cyber text-white">
              RODA SIFIR <span className="text-cyan-400">& PERTARUNGAN BOS SIBER</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Pilih mod permainan: Tumpaskan Bos Hacker, Pecut Masa 60s, atau Putar Roda Bertuah!
            </p>
          </div>

          {/* Mode Selector Tabs */}
          <div className="flex flex-wrap p-1 rounded-2xl bg-slate-950 border border-slate-800 shrink-0 text-xs font-cyber font-bold gap-1">
            <button
              onClick={() => {
                sound.playClick();
                setGameMode('boss');
              }}
              className={`px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all ${
                gameMode === 'boss'
                  ? 'bg-gradient-to-r from-rose-600 to-amber-600 text-white shadow-lg shadow-rose-950'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Swords className="w-3.5 h-3.5" />
              <span>Bos Siber</span>
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setGameMode('timed');
                handleResetTimed(60);
              }}
              className={`px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all ${
                gameMode === 'timed'
                  ? 'bg-amber-600 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Timer className="w-3.5 h-3.5" />
              <span>Pecut Masa</span>
            </button>
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
              Roda Putar
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setGameMode('beat');
              }}
              className={`px-3.5 py-2 rounded-xl transition-all ${
                gameMode === 'beat'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Carta Sifir 1-12
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* MODE 1: PERTARUNGAN BOS SIBER (CYBER BOSS BATTLE)        */}
        {/* ======================================================== */}
        {gameMode === 'boss' && (
          <div className="pt-6 space-y-6">
            
            {/* Boss Select Ribbon */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {BOSS_LIST.map((boss, idx) => (
                <button
                  key={boss.id}
                  onClick={() => handleStartBossBattle(idx)}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    selectedBossIndex === idx
                      ? 'bg-slate-950 border-rose-500 shadow-lg shadow-rose-950/40 ring-1 ring-rose-500'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{boss.avatar}</span>
                    <span className="text-[10px] font-tech px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-amber-400 font-bold">
                      +{boss.rewardXp} XP
                    </span>
                  </div>
                  <h4 className="font-cyber font-bold text-sm text-white mt-2">{boss.name}</h4>
                  <p className="text-[11px] text-slate-400 font-tech mt-0.5">{boss.desc}</p>
                </button>
              ))}
            </div>

            {/* Boss Battle Arena Stage */}
            <div className="relative rounded-2xl bg-slate-950 border border-rose-900/40 p-6 sm:p-8 space-y-6 overflow-hidden">
              
              {/* Floating Combat Damage Text */}
              {floatingDamage && (
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 font-cyber font-extrabold text-lg sm:text-2xl px-4 py-2 rounded-xl backdrop-blur-md animate-bounce shadow-2xl ${
                  floatingDamage.type === 'crit'
                    ? 'bg-amber-500/90 text-slate-950 border border-amber-300'
                    : floatingDamage.type === 'shield'
                    ? 'bg-cyan-500/90 text-slate-950 border border-cyan-300'
                    : floatingDamage.type === 'player-hit'
                    ? 'bg-rose-600/90 text-white border border-rose-400'
                    : 'bg-cyan-600/90 text-white'
                }`}>
                  {floatingDamage.text}
                </div>
              )}

              {/* Boss Info & HP Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-rose-950/80 border border-rose-500/50 flex items-center justify-center text-3xl shadow-lg animate-pulse">
                    {activeBoss.avatar}
                  </div>
                  <div>
                    <span className="text-[10px] font-tech text-rose-400 uppercase tracking-wider font-bold">
                      PENGGODAM SIBER BERBAHAYA
                    </span>
                    <h3 className="text-xl sm:text-2xl font-cyber font-extrabold text-white">
                      {activeBoss.name}
                    </h3>
                    <p className="text-xs text-slate-400 font-tech">
                      HP: <strong className="text-rose-400">{bossHp}</strong> / {activeBoss.maxHp}
                    </p>
                  </div>
                </div>

                {/* Player Lives & Power-Ups */}
                <div className="flex flex-wrap items-center gap-3">
                  {/* Hearts */}
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-1.5">
                    <span className="text-[10px] font-tech text-slate-400 mr-1">NYAWA:</span>
                    {[1, 2, 3].map(h => (
                      <Heart 
                        key={h} 
                        className={`w-5 h-5 ${h <= playerLives ? 'fill-rose-500 text-rose-500 animate-pulse' : 'text-slate-700'}`} 
                      />
                    ))}
                  </div>

                  {/* Power-up: Shield */}
                  <button
                    onClick={handleUseShield}
                    disabled={powerShield}
                    className={`p-2.5 rounded-xl border flex items-center gap-1 text-xs font-tech transition-all ${
                      powerShield
                        ? 'bg-cyan-500 text-slate-950 border-cyan-300 font-bold'
                        : 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-cyan-400'
                    }`}
                    title="Aktifkan Perisai Kebal Serangan Bos"
                  >
                    <Shield className="w-4 h-4" />
                    <span>{powerShield ? 'Perisai Aktif' : 'Guna Perisai'}</span>
                  </button>

                  {/* Power-up: Freeze Time */}
                  <button
                    onClick={handleUseFreezeTime}
                    disabled={powerFreezeUsed}
                    className={`p-2.5 rounded-xl border flex items-center gap-1 text-xs font-tech transition-all ${
                      powerFreezeUsed
                        ? 'bg-slate-900/50 border-slate-800 text-slate-600 cursor-not-allowed'
                        : 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-amber-400'
                    }`}
                    title="Tambah +5 saat masa menjawab"
                  >
                    <Timer className="w-4 h-4" />
                    <span>+5s Masa</span>
                  </button>
                </div>
              </div>

              {/* Boss HP Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-tech">
                  <span className="text-rose-400 font-bold">BAR TENAGA BOS ({Math.max(0, Math.round((bossHp / activeBoss.maxHp) * 100))}%)</span>
                  <span className="text-amber-400 font-bold flex items-center gap-1">
                    <Timer className="w-3.5 h-3.5" />
                    Masa Serang Balas: {bossTimer}s
                  </span>
                </div>
                <div className="w-full h-4 bg-slate-900 rounded-full overflow-hidden border border-rose-950 p-0.5">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-500 via-rose-500 to-red-600 transition-all duration-300 rounded-full"
                    style={{ width: `${Math.max(0, (bossHp / activeBoss.maxHp) * 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* Combat Playfield: Question or Victory / Loss */}
              {bossStatus === 'fighting' && currentMultiplier !== null && (
                <div className="p-6 rounded-2xl bg-slate-900/90 border border-cyan-900/50 space-y-6">
                  
                  <div className="text-center space-y-2">
                    <span className="text-xs font-tech text-cyan-400 font-bold uppercase tracking-wider">
                      TEMBAK KOD SIFIR UNTUK MELANCARKAN SERANGAN LASER
                    </span>
                    <h2 className="text-3xl sm:text-5xl font-extrabold font-cyber text-white">
                      {currentTableNum} × {currentMultiplier} = <span className="text-cyan-400">?</span>
                    </h2>
                    {streak > 1 && (
                      <p className="text-xs font-tech text-amber-300 font-bold animate-pulse">
                        🔥 KOMBO ×{streak}! Jawab betul sekarang untuk CRITICAL HIT DOUBLE DAMAGE!
                      </p>
                    )}
                  </div>

                  {/* 4 Choices */}
                  <div className="grid grid-cols-2 gap-3 max-w-lg mx-auto">
                    {options.map((opt, idx) => {
                      const isDisabled = disabledOptions.includes(opt);
                      const isSelected = selectedOption === opt;
                      const correctAnswer = currentTableNum * currentMultiplier;
                      const isAnswerCorrect = opt === correctAnswer;

                      let btnStyle = 'bg-slate-950/80 hover:bg-cyan-950/40 border-slate-800 text-slate-200';
                      if (isDisabled) {
                        btnStyle = 'opacity-30 bg-slate-950 border-slate-900 text-slate-600 cursor-not-allowed';
                      } else if (isAnswerChecked) {
                        if (isAnswerCorrect) {
                          btnStyle = 'bg-emerald-950 border-emerald-500 text-emerald-300 ring-2 ring-emerald-500';
                        } else if (isSelected) {
                          btnStyle = 'bg-rose-950 border-rose-500 text-rose-300';
                        }
                      } else if (isSelected) {
                        btnStyle = 'bg-cyan-950 border-cyan-500 text-cyan-300';
                      }

                      return (
                        <button
                          key={idx}
                          disabled={isAnswerChecked || isDisabled}
                          onClick={() => handleAnswer(opt)}
                          className={`p-4 rounded-xl border text-xl sm:text-2xl font-cyber font-extrabold transition-all hover:scale-105 active:scale-95 ${btnStyle}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {/* 50:50 Helper Button */}
                  <div className="flex justify-center">
                    <button
                      onClick={handleUseFiftyFifty}
                      disabled={powerFiftyUsed || isAnswerChecked}
                      className={`px-3 py-1.5 rounded-xl border text-xs font-tech flex items-center gap-1.5 transition-all ${
                        powerFiftyUsed
                          ? 'opacity-40 bg-slate-950 border-slate-800 text-slate-500 cursor-not-allowed'
                          : 'bg-slate-950 hover:bg-slate-800 border-cyan-500/40 text-cyan-300'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{powerFiftyUsed ? 'Bantuan 50:50 Telah Diguna' : 'Bantuan 50:50 (Buang 2 Jawapan Salah)'}</span>
                    </button>
                  </div>

                </div>
              )}

              {/* Boss Defeated Victory Banner */}
              {bossStatus === 'won' && (
                <div className="p-8 rounded-2xl bg-emerald-950/80 border border-emerald-500 text-center space-y-4 animate-fadeIn">
                  <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center text-4xl shadow-xl shadow-emerald-500/30">
                    🏆
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-cyber font-extrabold text-white">
                    TAHNIAH! {activeBoss.name.toUpperCase()} BERJAYA DITUMPASKAN!
                  </h3>
                  <p className="text-sm text-emerald-200 max-w-md mx-auto font-tech">
                    Anda telah menyelamatkan server utama agensi ARMS dengan ketepatan congak sifir yang pantas! Markah kemenangan telah direkodkan ke buku rekod anda.
                  </p>
                  
                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <button
                      onClick={() => handleStartBossBattle(selectedBossIndex)}
                      className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-cyber font-bold text-slate-200 flex items-center gap-2"
                    >
                      <RefreshCw className="w-4 h-4" />
                      <span>Lawan Semula Bos Ini</span>
                    </button>
                    {selectedBossIndex < BOSS_LIST.length - 1 && (
                      <button
                        onClick={() => handleStartBossBattle(selectedBossIndex + 1)}
                        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-400 hover:to-rose-500 text-slate-950 font-cyber font-bold text-xs flex items-center gap-2 shadow-lg hover:scale-105"
                      >
                        <Swords className="w-4 h-4" />
                        <span>Cabar Bos Seterusnya!</span>
                      </button>
                    )}
                    <button
                      onClick={handleOpenMysteryCrate}
                      className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-cyber font-bold text-xs flex items-center gap-2 shadow-md hover:scale-105"
                    >
                      <Gift className="w-4 h-4" />
                      <span>Buka Peti Misteri Ganjaran</span>
                    </button>
                  </div>

                  {/* Mystery Crate Modal Result */}
                  {mysteryReward && (
                    <div className="p-4 rounded-xl bg-slate-950 border border-cyan-400 max-w-sm mx-auto text-cyan-300 font-cyber font-bold text-sm animate-bounce">
                      {mysteryReward.text}
                    </div>
                  )}
                </div>
              )}

              {/* Player Defeated Loss Screen */}
              {bossStatus === 'lost' && (
                <div className="p-8 rounded-2xl bg-rose-950/80 border border-rose-500 text-center space-y-4 animate-fadeIn">
                  <div className="w-20 h-20 mx-auto rounded-full bg-rose-600 text-white flex items-center justify-center text-4xl shadow-xl">
                    💥
                  </div>
                  <h3 className="text-2xl font-cyber font-extrabold text-white">
                    PERISAI SIBER DIBOBOL! JANGAN PUTUS ASA!
                  </h3>
                  <p className="text-sm text-slate-300 max-w-md mx-auto font-tech">
                    {activeBoss.name} menyerang balas sebelum sempat anda selesaikan kiraan. Lakukan serangan semula dan balas dendam sekarang!
                  </p>
                  <button
                    onClick={() => handleStartBossBattle(selectedBossIndex)}
                    className="px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-cyber font-bold text-xs shadow-lg hover:scale-105"
                  >
                    Cuba Lawan Semula Sekarang!
                  </button>
                </div>
              )}

            </div>

          </div>
        )}

        {/* ======================================================== */}
        {/* MODE 2: PECUT MASA KILAT (SPEED TIME RUSH)              */}
        {/* ======================================================== */}
        {gameMode === 'timed' && (
          <div className="pt-6 space-y-6">
            
            {/* Control Bar: Time Limit Selector */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xs font-tech text-slate-400">PILIH MASA PECUT:</span>
                {[30, 60, 90].map(sec => (
                  <button
                    key={sec}
                    onClick={() => handleResetTimed(sec)}
                    className={`px-3 py-1 rounded-xl text-xs font-cyber font-bold transition-all ${
                      timeLimitOption === sec
                        ? 'bg-amber-500 text-slate-950'
                        : 'bg-slate-900 text-slate-400 hover:text-white'
                    }`}
                  >
                    {sec}s
                  </button>
                ))}
              </div>

              {/* Sifir Picker */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-tech text-slate-400">SIFIR:</span>
                <select
                  value={selectedTable}
                  onChange={(e) => {
                    setSelectedTable(e.target.value === 'random' ? 'random' : Number(e.target.value));
                    handleResetTimed(timeLimitOption);
                  }}
                  className="bg-slate-900 border border-slate-800 text-cyan-400 rounded-xl px-3 py-1.5 text-xs font-cyber"
                >
                  <option value="random">Semua Sifir (Rawak 2-12)</option>
                  {[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(t => (
                    <option key={t} value={t}>Sifir {t}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Timed Playfield */}
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-950 border border-amber-900/40 text-center space-y-6">
              
              {/* Timer & Score Display */}
              <div className="flex items-center justify-around max-w-md mx-auto p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
                <div>
                  <span className="text-[10px] font-tech text-slate-400 uppercase">BAKI MASA</span>
                  <p className={`text-3xl font-extrabold font-cyber ${timeLeft <= 10 ? 'text-rose-500 animate-ping' : 'text-amber-400'}`}>
                    {timeLeft}s
                  </p>
                </div>
                <div className="h-8 w-px bg-slate-800"></div>
                <div>
                  <span className="text-[10px] font-tech text-slate-400 uppercase">SKOR MATA</span>
                  <p className="text-3xl font-extrabold font-cyber text-cyan-400">
                    {score}
                  </p>
                </div>
                <div className="h-8 w-px bg-slate-800"></div>
                <div>
                  <span className="text-[10px] font-tech text-slate-400 uppercase">KOMBO</span>
                  <p className="text-3xl font-extrabold font-cyber text-emerald-400">
                    {streak}x
                  </p>
                </div>
              </div>

              {!isTimerRunning && timeLeft === timeLimitOption && (
                <div className="py-6 space-y-4">
                  <p className="text-sm text-slate-300 font-tech">
                    Jawab seberapa banyak soalan sifir dalam masa {timeLimitOption} saat! Dapatkan kombo berterusan untuk menggandakan markah.
                  </p>
                  <button
                    onClick={() => {
                      sound.playClick();
                      setIsTimerRunning(true);
                      nextQuestionForMode('timed');
                    }}
                    className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-cyber font-extrabold text-sm shadow-xl hover:scale-105 transition-all"
                  >
                    MULA PECUT SEKARANG! ⏱️
                  </button>
                </div>
              )}

              {isTimerRunning && currentMultiplier !== null && (
                <div className="space-y-6">
                  <h3 className="text-4xl sm:text-6xl font-extrabold font-cyber text-white">
                    {currentTableNum} × {currentMultiplier} = <span className="text-amber-400">?</span>
                  </h3>

                  <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
                    {options.map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleAnswer(opt)}
                        className="p-4 rounded-xl bg-slate-900 hover:bg-amber-950/50 border border-slate-800 hover:border-amber-400 text-xl font-cyber font-extrabold text-white transition-all hover:scale-105 active:scale-95"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {timeLeft === 0 && (
                <div className="py-6 space-y-3">
                  <h3 className="text-2xl font-cyber font-extrabold text-amber-400">
                    MASA TAMAT! KEPUTUSAN PECUT:
                  </h3>
                  <p className="text-sm font-tech text-slate-300">
                    Skor: <strong className="text-white text-lg">{score}</strong> | Ketepatan: <strong className="text-emerald-400">{totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0}%</strong>
                  </p>
                  <button
                    onClick={() => handleResetTimed(timeLimitOption)}
                    className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-cyber font-bold text-cyan-300"
                  >
                    Main Semula
                  </button>
                </div>
              )}

            </div>

          </div>
        )}

        {/* ======================================================== */}
        {/* MODE 3: RODA BERTUAH KLASIK & 360 CLOCK                  */}
        {/* ======================================================== */}
        {(gameMode === 'spin' || gameMode === 'clock') && (
          <div className="pt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Wheel Canvas Container (Left) */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center space-y-6">
              
              <div className="relative w-72 h-72 sm:w-88 sm:h-88 flex items-center justify-center">
                
                {/* Pointer Indicator */}
                <div className="absolute -top-3 z-20 flex flex-col items-center pointer-events-none">
                  <div className="w-6 h-7 bg-rose-500 clip-triangle shadow-lg shadow-rose-950 animate-bounce"></div>
                </div>

                {/* Outer Neon Glowing Ring */}
                <div className="absolute inset-0 rounded-full border-4 border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.3)] pointer-events-none"></div>

                {/* Rotating SVG Wheel */}
                <div 
                  className="w-full h-full rounded-full transition-transform duration-[3200ms] cubic-bezier(0.15, 0.9, 0.2, 1)"
                  style={{ transform: `rotate(${rotation}deg)` }}
                >
                  <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                    {SLICES.map((slice, i) => {
                      const startAngle = (i * 30) * (Math.PI / 180);
                      const endAngle = ((i + 1) * 30) * (Math.PI / 180);
                      const x1 = 50 + 50 * Math.cos(startAngle);
                      const y1 = 50 + 50 * Math.sin(startAngle);
                      const x2 = 50 + 50 * Math.cos(endAngle);
                      const y2 = 50 + 50 * Math.sin(endAngle);
                      const path = `M 50 50 L ${x1} ${y1} A 50 50 0 0 1 ${x2} ${y2} Z`;

                      const isCompletedInClock = clockCompleted[slice];

                      return (
                        <g 
                          key={slice} 
                          onClick={() => gameMode === 'clock' && handleAnswer(slice)}
                          className={gameMode === 'clock' ? 'cursor-pointer hover:opacity-80' : ''}
                        >
                          <path
                            d={path}
                            fill={isCompletedInClock ? '#10b981' : SLICE_COLORS[i]}
                            stroke="#0f172a"
                            strokeWidth="0.8"
                          />
                          <text
                            x={50 + 36 * Math.cos((i * 30 + 15) * (Math.PI / 180))}
                            y={50 + 36 * Math.sin((i * 30 + 15) * (Math.PI / 180))}
                            fill="#ffffff"
                            fontSize="5.5"
                            fontWeight="bold"
                            textAnchor="middle"
                            dominantBaseline="central"
                            transform={`rotate(${(i * 30 + 15) + 90}, ${50 + 36 * Math.cos((i * 30 + 15) * (Math.PI / 180))}, ${50 + 36 * Math.sin((i * 30 + 15) * (Math.PI / 180))})`}
                          >
                            {slice}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>

                {/* Wheel Center Hub */}
                <div className="absolute w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-slate-950 border-4 border-cyan-400 shadow-xl flex flex-col items-center justify-center text-center z-10">
                  <span className="text-[10px] font-tech text-cyan-300 font-bold">SIFIR</span>
                  <span className="text-xl sm:text-2xl font-extrabold font-cyber text-white">
                    {selectedTable === 'random' ? '?' : selectedTable}
                  </span>
                </div>

              </div>

              {/* Spin Action Button */}
              <button
                disabled={isSpinning}
                onClick={handleSpinWheel}
                className={`px-8 py-3.5 rounded-2xl font-cyber font-bold text-sm flex items-center gap-2 shadow-xl transition-all ${
                  isSpinning
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 hover:scale-105 active:scale-95'
                }`}
              >
                <RotateCw className={`w-4 h-4 ${isSpinning ? 'animate-spin' : ''}`} />
                <span>{isSpinning ? 'SEDANG BERPUTAR...' : 'PUTAR RODA SEKARANG!'}</span>
              </button>

            </div>

            {/* Right Question & Answer Console */}
            <div className="lg:col-span-6 space-y-6">
              {currentMultiplier !== null ? (
                <div className="p-6 rounded-2xl bg-slate-950 border border-cyan-900/50 space-y-6 text-center">
                  <span className="text-xs font-tech text-cyan-400 font-bold uppercase tracking-wider">
                    SOALAN SIFIR HASIL PUTARAN
                  </span>
                  <h3 className="text-4xl sm:text-5xl font-extrabold font-cyber text-white">
                    {currentTableNum} × {currentMultiplier} = <span className="text-cyan-400">?</span>
                  </h3>

                  <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
                    {options.map((opt, idx) => (
                      <button
                        key={idx}
                        disabled={isAnswerChecked}
                        onClick={() => handleAnswer(opt)}
                        className={`p-4 rounded-xl border text-xl font-cyber font-extrabold transition-all ${
                          isAnswerChecked
                            ? opt === currentTableNum * currentMultiplier
                              ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                              : opt === selectedOption
                              ? 'bg-rose-950 border-rose-500 text-rose-300'
                              : 'bg-slate-900 border-slate-800 text-slate-500'
                            : 'bg-slate-900 hover:bg-cyan-950/40 border-slate-800 hover:border-cyan-400 text-white'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>

                  {isAnswerChecked && (
                    <button
                      onClick={handleSpinWheel}
                      className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-cyber font-bold text-xs"
                    >
                      Putar Seterusnya
                    </button>
                  )}
                </div>
              ) : (
                <div className="p-8 rounded-2xl bg-slate-950/60 border border-dashed border-slate-800 text-center space-y-3">
                  <p className="text-sm font-cyber font-bold text-slate-300">Tekan Butang Putar Roda Untuk Mulakan Soalan!</p>
                  <p className="text-xs text-slate-500 font-tech">Nombor yang ditunjuk jarum merah akan menjadi pengali soalan sifir anda.</p>
                </div>
              )}
            </div>

          </div>
        )}

        {/* ======================================================== */}
        {/* MODE 4: CARTA AUDIO SIFIR 1-12 (BEATS & REFERENCE GRID)  */}
        {/* ======================================================== */}
        {gameMode === 'beat' && (
          <div className="pt-6 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="text-xs font-tech text-purple-400 font-bold uppercase">
                PILIH SIFIR UNTUK CARTA LENGKAP & BUNYI NOTA
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(tbl => (
                  <button
                    key={tbl}
                    onClick={() => {
                      sound.playTone(300 + tbl * 40, 'sine', 0.1);
                      setSelectedTable(tbl);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-cyber font-bold transition-all ${
                      Number(selectedTable) === tbl
                        ? 'bg-purple-600 text-white shadow-md'
                        : 'bg-slate-900 text-slate-400 hover:text-white'
                    }`}
                  >
                    Sifir {tbl}
                  </button>
                ))}
              </div>
            </div>

            {/* 12 Multiplication Cards Grid with Audio Chime */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(m => {
                const ans = (Number(selectedTable) || 6) * m;
                return (
                  <button
                    key={m}
                    onClick={() => {
                      sound.playTone(400 + m * 50, 'triangle', 0.15, 0.15);
                    }}
                    className="p-4 rounded-2xl bg-slate-950 hover:bg-purple-950/40 border border-slate-800 hover:border-purple-500 text-left transition-all hover:scale-105 active:scale-95 group"
                  >
                    <span className="text-[10px] font-tech text-slate-500 group-hover:text-purple-400">
                      LANGKAH 0{m}
                    </span>
                    <p className="text-base font-cyber font-bold text-slate-300 group-hover:text-white mt-1">
                      {Number(selectedTable) || 6} × {m}
                    </p>
                    <p className="text-2xl font-extrabold font-cyber text-purple-400 group-hover:text-purple-300 mt-1">
                      = {ans}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

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
