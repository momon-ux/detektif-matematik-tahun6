// LocalStorage management for Detective Profile & Game Progression

const STORAGE_KEY = 'detektif_matematik_tahun6_save';

export const RANKS = [
  { minXp: 0, title: 'Kadet Risikan ARMS', level: 1, icon: '🛡️', color: 'text-slate-400' },
  { minXp: 500, title: 'Detektif Muda Siber', level: 2, icon: '🔍', color: 'text-cyan-400' },
  { minXp: 1200, title: 'Sarjan Kripto ARMS', level: 3, icon: '⚡', color: 'text-blue-400' },
  { minXp: 2200, title: 'Inspektor Siber Utama', level: 4, icon: '⭐', color: 'text-amber-400' },
  { minXp: 3500, title: 'Ketua Pesuruhjaya Matematik ARMS', level: 5, icon: '👑', color: 'text-emerald-400' },
];

export const AVATARS = [
  { id: 'agent-kilat', name: 'Ejen Kilat', emoji: '⚡', role: 'Pakar Operasi Pantas' },
  { id: 'agent-zetta', name: 'Ejen Zetta', emoji: '🤖', role: 'Pakar Analisis Algoritma' },
  { id: 'agent-luna', name: 'Ejen Luna', emoji: '🕵️‍♀️', role: 'Pakar Forensik Kod' },
  { id: 'agent-orion', name: 'Ejen Orion', emoji: '🚀', role: 'Pakar Navigasi Ruang' },
];

export const DEVELOPER_NAME = 'MOHAMMAD FIKREY BIN ABDUL GAPAR';
export const DEVELOPER_TITLE = 'Pembangun Sistem & Pereka Gamifikasi Matematik';

export const DEFAULT_PROFILE = {
  agentName: 'Ejen Pelajar',
  agentCodename: 'ARMS-007',
  studentClass: '6 Inovatif',
  schoolName: 'SK Bestari Perdana',
  avatarId: 'agent-kilat',
  xp: 0,
  completedCases: [],
  caseScores: {},
  badges: [],
  scoreRecords: [], // Senarai rekod markah siasatan kes & roda sifir
  soundMuted: false,
};

export function loadProfile() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_PROFILE };
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_PROFILE,
      ...parsed,
      studentClass: parsed.studentClass || '6 Inovatif',
      scoreRecords: Array.isArray(parsed.scoreRecords) ? parsed.scoreRecords : []
    };
  } catch {
    return { ...DEFAULT_PROFILE };
  }
}

export function saveProfile(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save profile', e);
  }
}

export function recordScoreEntry(profile, entry) {
  const newRecord = {
    id: `rec-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    studentName: profile.agentName || 'Ejen Pelajar',
    studentClass: profile.studentClass || '6 Inovatif',
    schoolName: profile.schoolName || 'SK Bestari Perdana',
    date: new Date().toLocaleDateString('ms-MY', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }),
    time: new Date().toLocaleTimeString('ms-MY', {
      hour: '2-digit',
      minute: '2-digit'
    }),
    timestamp: Date.now(),
    ...entry
  };

  const updatedRecords = [newRecord, ...(profile.scoreRecords || [])].slice(0, 50); // Simpan 50 rekod terkini
  return {
    ...profile,
    scoreRecords: updatedRecords
  };
}

export function getRank(xp) {
  for (let i = RANKS.length - 1; i >= 0; i--) {
    if (xp >= RANKS[i].minXp) {
      return RANKS[i];
    }
  }
  return RANKS[0];
}

export function getNextRank(xp) {
  for (let i = 0; i < RANKS.length; i++) {
    if (xp < RANKS[i].minXp) {
      return RANKS[i];
    }
  }
  return null; // Max rank reached
}

export function resetAllProgress() {
  localStorage.removeItem(STORAGE_KEY);
  return { ...DEFAULT_PROFILE };
}
