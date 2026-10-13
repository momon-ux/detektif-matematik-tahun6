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
  { id: 'steve-builder', name: 'Steve Pembina', emoji: '⛏️🧑‍🌾', role: 'Pakar Arkitek & Pembina Voxel' },
  { id: 'alex-crafter', name: 'Alex Pereka', emoji: '🛠️👩‍🎨', role: 'Pakar Pertukangan & Halaman' },
  { id: 'agent-kilat', name: 'Ejen Kilat', emoji: '⚡🏃‍♂️', role: 'Pakar Operasi Pantas' },
  { id: 'agent-zetta', name: 'Ejen Zetta (Mecha)', emoji: '🤖🚀', role: 'Robot Analisis Masa Depan' },
  { id: 'agent-luna', name: 'Ejen Luna', emoji: '🕵️‍♀️🔍', role: 'Detektif Forensik Bijak' },
  { id: 'agent-orion', name: 'Angkasawan Orion', emoji: '👨‍🚀🪐', role: 'Peneroka Galaksi Marikh' },
  { id: 'wizard-al-khawarizmi', name: 'Penyihir Al-Khawarizmi', emoji: '🧙‍♂️✨', role: 'Sarjana Sihir Aljabar' },
  { id: 'ninja-bayang', name: 'Ninja Sifir Pantas', emoji: '🥷⚔️', role: 'Pendekar Pengiraan Kilat' },
  { id: 'dino-crafter', name: 'Dino Rex Builder', emoji: '🦖🏗️', role: 'Raksasa Pembina Megah' },
  { id: 'kitty-gamer', name: 'Kucing Gamer Meow', emoji: '🐱🎮', role: 'Pakar Strategi Comel' },
];

export const DEVELOPER_NAME = 'MOHAMMAD FIKREY BIN ABDUL GAPAR';
export const DEVELOPER_TITLE = 'Pembangun Sistem & Pereka Gamifikasi Matematik';
export const ADMIN_ACCESS_CODE = 'TS.FIKREY37'; // Kod sulit admin (tidak dipaparkan di skrin)

export const CLASSES_CONFIG_KEY = 'detektif_matematik_classes_roster';

export const DEFAULT_CLASSES_DATA = [
  {
    "id": "cls-5-khoir",
    "year": "Tahun 5",
    "name": "5 Khoir",
    "students": [
      "Adib Qayyum Syazwan bin Abdul Rahmat",
      "Aisyah Ayudia Inara binti Punanwi",
      "Amani Qistina binti Abdillah",
      "Aryan Zihni bin Sudirman",
      "Asyrafa Qurratuain binti Raman",
      "Izzat Izzuedin bin Arman",
      "Maimunah binti Jukdin",
      "Mas Elly Khushairy bin Masli",
      "Mohamad Muzillsyah bin Mohd Musa",
      "Mohammad Azaim Firdaus bin Yasri",
      "Muhammad Aqil Danish bin Maslan",
      "Muhammad Arif Lutfil bin Masudi",
      "Muhammad Arif Zikri bin Herman",
      "Muhammad Fayyadh Farhan bin Darwis",
      "Muhammad Haziq Uqasyah bin Mohd Nasdrul Ikram",
      "Muhammad Nifael Danish bin Azmen",
      "Muhammad Razaq bin Firdaus",
      "Muhammad Rizman bin James",
      "Muhammad Syah Hidayatullah bin Abdul Rahman",
      "Nabil Najmi bin Mohammad Razali",
      "Nur Aisyah binti Abdullah",
      "Nur Aleesya Dania binti Asdi",
      "Nur Alieya Safya",
      "Nur Arissa Sofia binti Abdullah",
      "Nur Azirah binti Aidi",
      "Nur Faiq Isham bin Shahruddin",
      "Nur Qaireen Damia binti Maksud",
      "Nur Shaza Syuhadah binti Azman",
      "Nur Syaqilah Syazwani binti Ardiadi",
      "Nur Zahira binti Kamarudin",
      "Nurul Afiqah Adawiyah binti Mohd Faizal",
      "Nurul Umairah binti Mohd Ghazali",
      "Nuwairah Qalbiya binti Arsip",
      "Qalesya Qistina binti Francis",
      "Qatreennada Nur Shahabiah binti Mu'ammar",
      "Ummu Masyitah binti Kamal"
    ]
  },
  {
    "id": "cls-5-mumtaz",
    "year": "Tahun 5",
    "name": "5 Mumtaz",
    "students": [
      "Ab Muhammad Nurasyraf bin Ab Azis",
      "Abdullah bin Saini",
      "Afifah Fitriyah binti Abraham",
      "Ahmad Ali Rizqi bin Mohd Sabri",
      "Davina Zaviera binti Rizan Hardinata",
      "Dayang Izz Ryna binti Ahmad",
      "Dayang Nur Shafiyyah binti Nasip",
      "Erisha Damia binti Nasrih",
      "Hamisya Amani binti Hamsah",
      "Lina Afiqah binti Abdullah",
      "Mohamad Dzaqierul Hamzah bin Mohamad Ridwan",
      "Mohammad Harith Mikail bin Ismail",
      "Mohammad Shaqri bin Saripuddin",
      "Mohammad Thaqif Harraz bin Sabri",
      "Muhamad Izzat bin Muhamad Sufri",
      "Muhammad Arsyad Maliq bin Sahrul",
      "Muhammad Arsyad Miqhael bin Sahrul",
      "Muhammad Faiz Daim bin Syamsuddin",
      "Muhammad Hadiff bin Sambran",
      "Muhammad Kamarul bin Kamal",
      "Muhammad Naufal Luthfi bin Mohd Syazwan",
      "Muhammad Syafiq Aiman bin Ahmad",
      "Muhammad Syahfiq bin Jupri",
      "Muhammad Syahrizan Uqasya bin Reduwan",
      "Muhammad Zahir Arrayyan bin Azman",
      "Nur Aisyah Zulaikha binti Mohd Rosman",
      "Nur Damia Qaisara binti Ramlan",
      "Nur Fitri Syafiyah binti Adzhar Khan",
      "Nur Izara Zulaiqah binti Abdullah",
      "Nur Qisya Adelia binti Hussien",
      "Nurul Shafiqah Senrose binti Asbidun",
      "Rayyan bin Suhaimi",
      "Razieq Azfar bin Ruslan",
      "Risqah Adriana binti Rais",
      "Siti Syazwanie binti Abdullah"
    ]
  },
  {
    "id": "cls-5-jahid",
    "year": "Tahun 5",
    "name": "5 Jahid",
    "students": [
      "Ameera Nur Izzatunnisa binti Amirullah",
      "Amzar Imtiyaz bin Muslihadir",
      "Andi Mohammad Syahir bin Andi Saharudin",
      "Aniq Khairiy Azhar bin Agus",
      "Ardiyani Syahzilah binti Mohd Arfian",
      "Devvieyona Elvira Herodiun",
      "Fatimah Azzahra binti Razaleh",
      "Ilham Razak bin Redwan",
      "Indrieyana Arendella binti Chrys",
      "Insyirah Rashanah binti Abdullah",
      "Mohammad Amirul bin Saripuddin",
      "Mohammad Mifzal Syahmie bin Mohammed Saifullah",
      "Mohammad Nazrin Shah bin Jumain Ajamaing",
      "Mohammad Noor Aiman bin Osman",
      "Muhammad Adam Aqil bin Jasman",
      "Muhammad Afiq Ziyad bin Rahmat Ali",
      "Muhammad Afnan Fariz bin Fari Akbar Nor",
      "Muhammad Aqif Iman bin Sofian",
      "Muhammad Aqil Zafran bin Sabir",
      "Muhammad Huzaifah bin Mohd.rizuwan",
      "Muhammad Iman Riziqin Hakim bin Abdul Rapiq",
      "Muhammad Irfan Jabar bin Mohamad Azhar",
      "Muhammad Mikail Arsya bin Abdullah",
      "Muhammad Nazreen bin Kenely",
      "Muhammad Syahziezan bin Iskandar",
      "Muhammad Yusuf Islam bin Mohd Irwan",
      "Norhafifah binti Hasmuran",
      "Nur Ainul Qistina binti Harris",
      "Nur Aisyah binti Abdul Rahman",
      "Nur Eryna Auni binti Muharam",
      "Nur Khairunnisa binti Muhamad Ikhram",
      "Nur Saadatul Aqilah binti Mazlan",
      "Nur Sumayyah Nabilah binti Abdullah",
      "Safiyya Hanna binti Rahim",
      "Sofieya Nur Arrissa binti Mohd Tri Awan",
      "Syafinaz Batrisya binti Mohd Umut"
    ]
  },
  {
    "id": "cls-5-eltizam",
    "year": "Tahun 5",
    "name": "5 Eltizam",
    "students": [
      "Aleesya Dania binti Arapa",
      "Amrin Huzaifah bin Jamaluddin",
      "Ariana Rayhana binti Ramlie",
      "As Syifah Nuruzzawany binti Abdullah",
      "Elmy Ridanish Haris bin Jaimi",
      "Fatihah Nurzulaikha binti Azman",
      "Hannah Syifa binti Suharman",
      "Hulyatul Auliyah binti Nurdin",
      "Mohammad Ikhwan Tarmizi",
      "Muhammad Adam Danial bin Lasattu",
      "Muhammad Adam Mikael bin Mohammad Nazrin",
      "Muhammad Adeeb Hanif bin Lahadu",
      "Muhammad Aimanshah bin Ishak",
      "Muhammad Azroy Azmi bin Raziff Azmi",
      "Muhammad Hakimi bin Samsul",
      "Muhammad Haziq bin Abdul Jabar",
      "Muhammad Ihtifazhuddin bin Mohd Adenan",
      "Muhammad In Amul Hasan bin Rusli",
      "Muhammad Iskandar bin Mohd Azrin",
      "Muhammad Rhaymie Sulaiman bin Rhaymayazlan",
      "Muhammad Shadzwan Muaafan bin Sharul",
      "Muhammad Shafie Ruzain bin Rahim",
      "Muhammad Shazan Muhayr bin Sharul",
      "Norlia binti Ali Hassan",
      "Nur Aina Maisarah binti Mohd Rizal",
      "Nur Alisha Safiya binti Haswan",
      "Nur Amirahtussoleha binti Mohmad Solih",
      "Nur Damia Batrisya binti Asmadi",
      "Nur Damia Izzati binti Mushrik Adiya",
      "Nur Fareeha Aulia binti Rashid",
      "Nuraisyah Syifa binti Yasmin",
      "Nurshuhada binti Abdullah",
      "Putra Syahrulnizam bin Haris",
      "Qalesya Ramadhani binti Azlan",
      "Shafiq Alyph Daniel bin Surianto",
      "Ummu Radhiah Shadrina binti Mohd Mihdad"
    ]
  },
  {
    "id": "cls-6-khoir",
    "year": "Tahun 6",
    "name": "6 Khoir",
    "students": [
      "Aadhan Muhriz bin Muhamad Haris",
      "Ahmad Rifqi bin Totong",
      "Aisha Damia binti Jamaluddin",
      "Aisyah Sarah binti Muhamad Shahruddin",
      "Casey Marcelina anak Jerome",
      "Daaniyatul Fathiyyah binti Suhaimi",
      "Hana Humaira binti Abd Rizam",
      "Harith Hakim bin Ibnu Suhud",
      "Khaireen Safiyyah binti Marsan",
      "Mohamad Nazri bin Laseal",
      "Mohamad Redzwan bin Supa",
      "Mohammad Qaizar Amar Mickhail bin Haeruddin",
      "Mohammad Trizuanshah bin Mohammad Hanapiah",
      "Muhamad Mikail Adam Mukriz bin Azlan",
      "Muhammad Adl Wafie bin Kasman",
      "Muhammad Fhirdaus Iskandar bin Abdullah",
      "Muhammad Haziq Adam bin Ekho Dynnie Arbianto",
      "Muhammad Hizqil bin Jukdin",
      "Muhammad Izman Izriansha bin Mohd Azman",
      "Muhammad Nazmi Faiq bin Mohamad Azizul Arifin",
      "Muhammad Rayyan Firdaus bin Rahim",
      "Muhammad Syamil bin Kamal",
      "Nur Adha Fatini binti Muslimin",
      "Nur Aiza Natasha binti Abdul Mucatill",
      "Nur Aqeela Safiya binti Mohd Naqiuddin Niyaz",
      "Nur Atiqah binti Amir",
      "Nur Farisya Haziqah binti Sukman",
      "Nur Jannah binti Ismail",
      "Nur Qiesya Aqeela binti Mohd Azman",
      "Nur Ramadhania binti Mohan",
      "Nur Syuhadah binti Yasmin",
      "Nurshazafeefa binti Muhamad Shazfaliq",
      "Ryandiee Izham bin Ilham",
      "Shareen Loin anak Simon"
    ]
  },
  {
    "id": "cls-6-mumtaz",
    "year": "Tahun 6",
    "name": "6 Mumtaz",
    "students": [
      "Afifah Auni Aqilah binti Jamidi",
      "Ahmad Izzat bin Suhardi",
      "Ahmed Eshan bin Abdullah",
      "Ammaara Luthfea binti Lukman Rizal",
      "Damia Adriana binti Jhon Pinero @ Mohammad Arif",
      "Maal Hizrayyan bin Abdullah",
      "Mohamad Ariz Zahran bin Jasni",
      "Muhamad Alifhamdan bin Wahid",
      "Muhammad Adli Adam bin Adil",
      "Muhammad Alif Firdaus bin Mohd Ghazali",
      "Muhammad Alif Syazwan bin Usman",
      "Muhammad Arfa Safaraz Az Zaim bin Darwis",
      "Muhammad Arief Rifqie bin Ashary",
      "Muhammad Aryan Ashraf bin Sabir",
      "Muhammad Iqbaal bin Japar",
      "Muhammad Izzrin bin Ahmad",
      "Muhammad Solihin Ishaq bin Asis",
      "Muhammad Syafieq Hakimi bin Suyuti",
      "Muhammad Syahmie bin Sultan",
      "Muhammad Zharif Aimin bin Kamaluddin @ Mohd Yasmin",
      "Naazhimah binti Nasarudin",
      "Nur Affiqah Hidayah binti Fari Akbar Nor",
      "Nur Delisya binti Mohamad",
      "Nur Haziqah binti Jumadi",
      "Nur Syafika binti Yasmansah",
      "Nur Syifa Raisah binti Roslan",
      "Nurfarah Khaalishah binti Mohamad Taufik",
      "Nurqistina Najwa binti Sadam",
      "Putri Syakilla Dania binti Abdullah",
      "Qayyum Nur Iman bin Amir",
      "Rania Awfiyah binti Ramle",
      "Samarulisam bin Abdullah",
      "Sayyidah Khaulah Al Azwar binti Mohd Mihdad",
      "Shazwi Shazia binti Azman",
      "Sumayyah Qaisara binti Alfian"
    ]
  },
  {
    "id": "cls-6-jahid",
    "year": "Tahun 6",
    "name": "6 Jahid",
    "students": [
      "Airis Nur Raysha Amanda binti Riduan",
      "Ariz Faiqh bin Mohd Rozaidy",
      "Aufa Hanifah binti Juari",
      "Izzat Nazhan bin Sumardi",
      "Linda Qaisarah binti Rajlan",
      "Mahirah Athilah binti M Sabran",
      "Mohammad Nizwan bin Azime",
      "Muhammad Afif Arsyad bin Hasrin",
      "Muhammad Aiman bin Ambo Masse",
      "Muhammad Ammar Syawal bin Sudeyansah",
      "Muhammad Ariq Adam bin Sanudin",
      "Muhammad Danish Zafwan bin Paisal",
      "Muhammad Dzar Dzikri bin Marindo @ Abd Karim",
      "Muhammad Faiz Izuddin bin Mohd Fairos",
      "Muhammad Fariz Izuddin bin Mohd Fairos",
      "Muhammad Haziq Syakir bin Aming",
      "Muhammad Khairul Muhaimin bin Muharam",
      "Muhammad Luthfi Wafi bin Abdullah",
      "Muhammad Mahdy bin Mazlan",
      "Muhammad Yuzwan Wafiy bin Yusuf",
      "Nur Adilah binti Abdul Malik",
      "Nur Eryna Naurah binti Jamal",
      "Nur Farah Fadillah binti Mohd Ardy",
      "Nur Humayraa Delisyah binti Herman",
      "Nur Khayrin Afiqah binti Jamidi",
      "Nur Subayya Azzahra binti Sahrul",
      "Nur Zhafirah binti Abdul Rashid",
      "Nuranis Fatihah binti Jamal",
      "Nurul Suhada binti Suryaman",
      "Nurzahra Zafirah binti Asis",
      "Rizq Irfan bin Mohd.azrul",
      "Siti Nur Adibah Syahirah binti Amrani",
      "Siti Nuralya Nabilah binti Hasrin",
      "Siti Nurfarzriekin binti Hery",
      "Yasin Muhammad Khairul bin Yusran"
    ]
  },
  {
    "id": "cls-6-eltizam",
    "year": "Tahun 6",
    "name": "6 Eltizam",
    "students": [
      "Adni Dafinah binti Mursalin",
      "Alfin Zikri bin Muhammad Zulkifli",
      "Aniq Izz Zarif bin Mohd Nor Azman",
      "Audhia Mulianie binti Ady Kurniawan",
      "Dayang Nur Athirah binti Datu Mohd Noor",
      "Farhana Alisya binti A.rahman",
      "Humaira Qairina binti Hassan",
      "Marzuqi Wahiduz Zaman bin Hermanshah",
      "Mas Syuhadah binti Masli",
      "Mohammad Iqqal Ruzayley bin Mohd Rusdi",
      "Mohammad Irfan bin Jasmyn",
      "Muhamad Aidil Azhari bin Mohamad Ali",
      "Muhammad Alif bin Ramil",
      "Muhammad Arrian bin Faizal",
      "Muhammad Arsyad Luqman bin Sahrul",
      "Muhammad Fahmi bin Misli",
      "Muhammad Fahril Uzayr bin Awal",
      "Muhammad Harith bin Abd Haliq",
      "Muhammad Izz Rizqi Rayyan bin Saharuddin",
      "Muhammad Nur Aiman bin Kriscylla",
      "Muhammad Yusuf Nizam bin Lukman",
      "Mustapha Irwansyah bin Buddahil",
      "Nur Farah Mawaddah binti Armiansah",
      "Nur Hana Afrina binti Herman",
      "Nur Hayla Dayyana binti Herman",
      "Nur Izzara Zulaikha binti Md Halim",
      "Nur Marissa Amanda binti Hamka",
      "Nurfatiha Adwa Qaisara binti Herman",
      "Nurhana Airisya Sofia binti Mohammad Sofian",
      "Nurul Syuhada binti Kahar",
      "Qaiser Mifdal bin Budiman",
      "Siti Nurshahira binti Kadir",
      "Suhaimah Fadila binti Zulkifly",
      "Syazanie Ashraf bin Sudirman",
      "Zarirah binti Patrisius"
    ]
  }
];

export const CLASSES_CONFIG_VERSION = 2; // Version 2: Lengkap 8 Kelas SK Ranggu (Tahun 5 & 6)
export const CLASSES_CONFIG_VERSION_KEY = 'detektif_matematik_classes_version_v2';

export function getClassesConfig() {
  try {
    const isV2 = localStorage.getItem(CLASSES_CONFIG_VERSION_KEY);
    if (!isV2) {
      saveClassesConfig(DEFAULT_CLASSES_DATA);
      localStorage.setItem(CLASSES_CONFIG_VERSION_KEY, '2');
      return DEFAULT_CLASSES_DATA;
    }
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
  avatarId: 'steve-builder',
  xp: 150, // Starter XP gift
  completedCases: [],
  caseScores: {},
  badges: [],
  scoreRecords: [],
  soundMuted: false,
  // Sandbox Builder & Quest Data
  inventory: {
    'block-wood': 8,
    'block-brick': 6,
    'door-wood': 1,
    'roof-red': 4,
    'nature-flowers': 2
  },
  worldGrid: {
    '5,5': 'block-brick',
    '6,5': 'door-wood',
    '7,5': 'block-brick',
    '5,4': 'roof-red',
    '6,4': 'roof-red',
    '7,4': 'roof-red',
    '4,6': 'nature-flowers',
    '8,6': 'nature-flowers'
  },
  questStep: 1,
  questCompletedSteps: []
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
      inventory: parsed.inventory || { ...DEFAULT_PROFILE.inventory },
      worldGrid: parsed.worldGrid || { ...DEFAULT_PROFILE.worldGrid },
      questStep: parsed.questStep || 1,
      questCompletedSteps: Array.isArray(parsed.questCompletedSteps) ? parsed.questCompletedSteps : [],
      scoreRecords: Array.isArray(parsed.scoreRecords) ? parsed.scoreRecords : []
    };
  } catch {
    return { ...DEFAULT_PROFILE };
  }
}

// Beli Blok Menggunakan XP
export function buyBlockItem(profile, itemId, cost, qty = 1) {
  const totalCost = cost * qty;
  if ((profile.xp || 0) < totalCost) {
    return { success: false, reason: 'XP tidak mencukupi!', profile };
  }
  const currentInv = { ...(profile.inventory || {}) };
  currentInv[itemId] = (currentInv[itemId] || 0) + qty;

  const updatedProfile = {
    ...profile,
    xp: profile.xp - totalCost,
    inventory: currentInv
  };
  saveProfile(updatedProfile);
  return { success: true, profile: updatedProfile };
}

// Letak Blok di Petak Lapangan Rumput
export function placeBlockInWorld(profile, coordKey, itemId) {
  const currentInv = { ...(profile.inventory || {}) };
  const currentGrid = { ...(profile.worldGrid || {}) };

  // Semak jika blok sedia ada di petak tersebut (pulangkan ke inventori dulu jika ada)
  const existingItem = currentGrid[coordKey];
  if (existingItem) {
    currentInv[existingItem] = (currentInv[existingItem] || 0) + 1;
  }

  // Tolak 1 daripada inventori
  if ((currentInv[itemId] || 0) <= 0) {
    return { success: false, reason: 'Tiada stok dalam inventori! Sila beli di Kedai Blok.', profile };
  }
  currentInv[itemId] = currentInv[itemId] - 1;
  currentGrid[coordKey] = itemId;

  const updatedProfile = {
    ...profile,
    inventory: currentInv,
    worldGrid: currentGrid
  };
  saveProfile(updatedProfile);
  return { success: true, profile: updatedProfile };
}

// Buang / Cangkul Blok dari Padang (Pulangkan semula ke inventori)
export function removeBlockFromWorld(profile, coordKey) {
  const currentGrid = { ...(profile.worldGrid || {}) };
  const currentInv = { ...(profile.inventory || {}) };
  const itemToRemove = currentGrid[coordKey];

  if (!itemToRemove) {
    return { success: false, profile };
  }

  delete currentGrid[coordKey];
  currentInv[itemToRemove] = (currentInv[itemToRemove] || 0) + 1;

  const updatedProfile = {
    ...profile,
    inventory: currentInv,
    worldGrid: currentGrid
  };
  saveProfile(updatedProfile);
  return { success: true, profile: updatedProfile };
}

// Padam Bersih Semua Blok di Padang (Pulangkan semua ke inventori)
export function clearWorldGrid(profile) {
  const currentGrid = { ...(profile.worldGrid || {}) };
  const currentInv = { ...(profile.inventory || {}) };

  Object.values(currentGrid).forEach(itemId => {
    currentInv[itemId] = (currentInv[itemId] || 0) + 1;
  });

  const updatedProfile = {
    ...profile,
    inventory: currentInv,
    worldGrid: {}
  };
  saveProfile(updatedProfile);
  return updatedProfile;
}

// Ganjaran Quest Mara ke Hadapan
export function advanceQuestStep(profile, stepId, xpReward) {
  const completed = Array.from(new Set([...(profile.questCompletedSteps || []), stepId]));
  const nextStep = Math.max(profile.questStep || 1, stepId + 1);
  const updatedProfile = {
    ...profile,
    xp: (profile.xp || 0) + xpReward,
    questStep: nextStep,
    questCompletedSteps: completed
  };
  saveProfile(updatedProfile);
  return updatedProfile;
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
