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

export const DEFAULT_PROFILE = {
  agentName: 'Ejen Pelajar',
  agentCodename: 'ARMS-007',
  avatarId: 'agent-kilat',
  schoolName: 'SK Bestari Perdana',
  xp: 0,
  completedCases: [],
  caseScores: {},
  badges: [],
  soundMuted: false,
};

export function loadProfile() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_PROFILE };
    return { ...DEFAULT_PROFILE, ...JSON.parse(raw) };
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
