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
export const ADMIN_ACCESS_CODE = 'TS.FIKREY37'; // Kod sulit admin (tidak dipaparkan di skrin)

export const CLASSES_CONFIG_KEY = 'detektif_matematik_classes_roster';

export const DEFAULT_CLASSES_DATA = [
  {
    id: 'cls-5-khoir',
    year: 'Tahun 5',
    name: '5 Khoir',
    students: [
      'Ahmad Danial bin Rosli',
      'Ainul Mardhiah binti Kamarudin',
      'Amirul Haziq bin Zakaria',
      'Aniq Rayyan bin Shahril',
      'Damia Batrisya binti Azlan',
      'Farah Nabilah binti Fauzi',
      'Harith Iskandar bin Zulkifli',
      'Iman Nur Qistina binti Razak',
      'Luqman Hakim bin Saiful',
      'Muhammad Adib bin Haikal',
      'Muhammad Aqil bin Zaki',
      'Muhammad Fikri bin Johari',
      'Nur Ain Syuhada binti Bakar',
      'Nur Alya Maisarah binti Azman',
      'Nur Imanina binti Shahrir',
      'Nur Qalesya binti Hamdan',
      'Nurul Izzah binti Mansor',
      'Rayyan Mikail bin Halim',
      'Sarah Amani binti Rizal',
      'Zarif Danish bin Shukri'
    ]
  },
  {
    id: 'cls-5-mumtaz',
    year: 'Tahun 5',
    name: '5 Mumtaz',
    students: [
      'Adam Haris bin Salleh',
      'Afrina Balqis binti Yusof',
      'Aisyah Humaira binti Nazri',
      'Aqil Zafri bin Syukor',
      'Danial Asyraf bin Latif',
      'Dhia Qaisara binti Ramli',
      'Farisya Hanum binti Jaafar',
      'Haziq Irfan bin Firdaus',
      'Izz Darwisy bin Osman',
      'Khairina Safiya binti Khairul',
      'Muhammad Alif bin Syafiq',
      'Muhammad Danish bin Borhan',
      'Muhammad Muaz bin Tahir',
      'Nur Damia binti Hisham',
      'Nur Farzana binti Daud',
      'Nur Medina binti Hafiz',
      'Nurin Jazlina binti Rosman',
      'Putera Rayyan bin Norman',
      'Siti Nurhaliza binti Wahid',
      'Syahmi Zhafran bin Zaki'
    ]
  },
  {
    id: 'cls-6-khoir',
    year: 'Tahun 6',
    name: '6 Khoir',
    students: [
      'Ahmad Farhan bin Abdullah',
      'Aina Sofea binti Ismail',
      'Amir Hamzah bin Kassim',
      'Batrisya Syamimi binti Ridzuan',
      'Danial Haikal bin Jamal',
      'Fakhrul Razi bin Zamri',
      'Hani Maisarah binti Jamil',
      'Ikhwan Naufal bin Zulkarnain',
      'Mia Sara binti Mazlan',
      'Muhammad Ammar bin Haziq',
      'Muhammad Faizal bin Karim',
      'Muhammad Hariz bin Azhar',
      'Nur Alya binti Mustapha',
      'Nur Atiqah binti Radzi',
      'Nur Farisha binti Yahya',
      'Nurul Ain binti Suhaimi',
      'Qistina Balqis binti Badrul',
      'Raziq Aiman bin Zainal',
      'Siti Sarah binti Shamsul',
      'Zulhilmi bin Arshad'
    ]
  },
  {
    id: 'cls-6-jahid',
    year: 'Tahun 6',
    name: '6 Jahid',
    students: [
      'Adib Zakwan bin Roslan',
      'Aiman Hafiz bin Khairi',
      'Aleya Natasha binti Murad',
      'Azim Hidayat bin Azmi',
      'Danish Iskandar bin Jalil',
      'Fikri Haikal bin Lokman',
      'Harraz Amsyar bin Sufian',
      'Idlan Hakimi bin Nawawi',
      'Khairul Anwar bin Basir',
      'Muhammad Aidil bin Zahid',
      'Muhammad Anas bin Zulkiflee',
      'Muhammad Arif bin Rosdi',
      'Nur Ainul binti Kamil',
      'Nur Fadhilah binti Sani',
      'Nur Kasih binti Borhan',
      'Nur Shahira binti Samad',
      'Puteri Nurul binti Asraf',
      'Syahir Asyraf bin Zahrin',
      'Tengku Danish bin Iskandar',
      'Zahra Alisya binti Mahadzir'
    ]
  },
  {
    id: 'cls-6-mumtaz',
    year: 'Tahun 6',
    name: '6 Mumtaz',
    students: [
      'Afiqah Nadhirah binti Khalid',
      'Ahmad Zikri bin Nizam',
      'Amirul Mukminin bin Osman',
      'Arissa Sofea binti Sallehuddin',
      'Danish Zafran bin Azhar',
      'Haziqah Irdina binti Mansur',
      'Iman Firdaus bin Mokhtar',
      'Liyana Zafirah binti Fuad',
      'Muhammad Adam bin Fikri',
      'Muhammad Danish bin Shahrul',
      'Muhammad Rayyan bin Zaidi',
      'Nadhirah Syuhada binti Shukor',
      'Nur Dania binti Zakaria',
      'Nur Hannan binti Hilmi',
      'Nur Rabiatul binti Adnan',
      'Nurul Syasya binti Wahab',
      'Rania Batrisya binti Helmi',
      'Sufi Rayyan bin Ghazali',
      'Syazwan Haziq bin Anuar',
      'Zarith Sofea binti Kamarul'
    ]
  }
];

export function getClassesConfig() {
  try {
    const raw = localStorage.getItem(CLASSES_CONFIG_KEY);
    if (!raw) return DEFAULT_CLASSES_DATA;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_CLASSES_DATA;
  } catch {
    return DEFAULT_CLASSES_DATA;
  }
}

export function saveClassesConfig(data) {
  try {
    localStorage.setItem(CLASSES_CONFIG_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save classes config', e);
  }
}

export function resetClassesConfig() {
  saveClassesConfig(DEFAULT_CLASSES_DATA);
  return DEFAULT_CLASSES_DATA;
}

export function addClassToConfig(year, name) {
  const current = getClassesConfig();
  const id = `cls-${year.toLowerCase().replace(/\s+/g, '')}-${name.toLowerCase().replace(/\s+/g, '')}-${Date.now()}`;
  const updated = [...current, { id, year, name, students: [] }];
  saveClassesConfig(updated);
  return updated;
}

export function deleteClassFromConfig(classId) {
  const current = getClassesConfig();
  const updated = current.filter(c => c.id !== classId);
  saveClassesConfig(updated);
  return updated;
}

export function addStudentToClass(classId, studentName) {
  const current = getClassesConfig();
  const trimmed = studentName.trim();
  if (!trimmed) return current;

  const updated = current.map(cls => {
    if (cls.id === classId) {
      if (cls.students.includes(trimmed)) return cls;
      return {
        ...cls,
        students: [...cls.students, trimmed].sort((a, b) => a.localeCompare(b, 'ms'))
      };
    }
    return cls;
  });
  saveClassesConfig(updated);
  return updated;
}

export function addMultipleStudentsToClass(classId, studentNamesArray) {
  const current = getClassesConfig();
  const validNames = studentNamesArray
    .map(n => n.trim())
    .filter(n => n.length > 0);

  if (validNames.length === 0) return current;

  const updated = current.map(cls => {
    if (cls.id === classId) {
      const set = new Set(cls.students);
      validNames.forEach(n => set.add(n));
      return {
        ...cls,
        students: Array.from(set).sort((a, b) => a.localeCompare(b, 'ms'))
      };
    }
    return cls;
  });
  saveClassesConfig(updated);
  return updated;
}

export function deleteStudentFromClass(classId, studentName) {
  const current = getClassesConfig();
  const updated = current.map(cls => {
    if (cls.id === classId) {
      return {
        ...cls,
        students: cls.students.filter(s => s !== studentName)
      };
    }
    return cls;
  });
  saveClassesConfig(updated);
  return updated;
}

export const DEFAULT_PROFILE = {
  agentName: 'Ahmad Farhan bin Abdullah',
  agentCodename: 'ARMS-007',
  studentClass: '6 Khoir',
  selectedGrade: 'Tahun 6',
  schoolName: 'SK Ranggu',
  avatarId: 'agent-kilat',
  xp: 0,
  completedCases: [],
  caseScores: {},
  badges: [],
  scoreRecords: [],
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
      studentClass: parsed.studentClass || '6 Khoir',
      selectedGrade: parsed.selectedGrade || 'Tahun 6',
      schoolName: parsed.schoolName || 'SK Ranggu',
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

export const MASTER_RECORDS_KEY = 'arms_master_score_records';

export function getAllMasterRecords() {
  try {
    const raw = localStorage.getItem(MASTER_RECORDS_KEY);
    if (!raw) return [];
    const list = JSON.parse(raw);
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

export function saveAllMasterRecords(records) {
  try {
    localStorage.setItem(MASTER_RECORDS_KEY, JSON.stringify(records));
  } catch (e) {
    console.error('Failed to save master records', e);
  }
}

export function recordScoreEntry(profile, entry) {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const isoDate = `${year}-${month}-${day}`;

  const newRecord = {
    id: `rec-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    studentName: profile.agentName || 'Ejen Pelajar',
    studentClass: profile.studentClass || '6 Khoir',
    schoolName: profile.schoolName || 'SK Ranggu',
    avatarId: profile.avatarId || 'agent-kilat',
    isoDate: isoDate,
    date: now.toLocaleDateString('ms-MY', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }),
    time: now.toLocaleTimeString('ms-MY', {
      hour: '2-digit',
      minute: '2-digit'
    }),
    timestamp: Date.now(),
    ...entry
  };

  // 1. Profile local records (up to 50)
  const updatedRecords = [newRecord, ...(profile.scoreRecords || [])].slice(0, 50);

  // 2. Master class-wide calendar log (up to 300)
  const masterList = getAllMasterRecords();
  const updatedMaster = [newRecord, ...masterList.filter(r => r.id !== newRecord.id)].slice(0, 300);
  saveAllMasterRecords(updatedMaster);

  return {
    ...profile,
    scoreRecords: updatedRecords
  };
}

export function clearMasterRecords() {
  try {
    localStorage.removeItem(MASTER_RECORDS_KEY);
  } catch (e) {
    console.error('Failed to clear master records', e);
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
