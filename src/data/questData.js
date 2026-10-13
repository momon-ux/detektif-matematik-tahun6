// Koleksi Stesen Destinasi Kembara Quest Matematik (Tahun 5 & Tahun 6)
// Menjawab soalan dengan betul akan menggerakkan avatar mara ke destinasi seterusnya + ganjaran XP!

export const QUEST_ZONES = [
  { id: 'zone-1', name: 'Zon 1: Dataran Hijau Nombor Juta', color: 'from-emerald-900 to-teal-950', badge: '🌲' },
  { id: 'zone-2', name: 'Zon 2: Lembah Pecahan & Nisbah', color: 'from-cyan-900 to-blue-950', badge: '🌊' },
  { id: 'zone-3', name: 'Zon 3: Gurun Perpuluhan & Peratus', color: 'from-amber-900 to-orange-950', badge: '🏜️' },
  { id: 'zone-4', name: 'Zon 4: Kota Kewangan & Pelaburan', color: 'from-yellow-900 to-amber-950', badge: '🏦' },
  { id: 'zone-5', name: 'Zon 5: Pergunungan Masa & Isipadu', color: 'from-purple-900 to-indigo-950', badge: '🏔️' },
  { id: 'zone-6', name: 'Zon 6: Puncak Angkasa Matematik', color: 'from-rose-900 to-slate-950', badge: '🚀' },
];

export const QUEST_STEPS = [
  // ========================================================
  // ZON 1: DATARAN HIJAU NOMBOR BULAT & JUTA
  // ========================================================
  {
    stepId: 1,
    zoneId: 'zone-1',
    name: 'Pondok Permulaan Rimba',
    biome: '🌲 Dataran Rumput Hijau',
    icon: '🏡',
    xpReward: 80,
    topic: 'Nombor Hingga Tujuh Digit',
    story: 'Avatar anda memulakan ekspedisi dari pondok perintis. Papan tanda rimba meminta nilai nombor juta.',
    question: 'Tukarkan 3 1/2 juta kepada nombor bulat.',
    options: [
      '3,500,000',
      '3,200,000',
      '3,050,000',
      '350,000'
    ],
    correctIndex: 0,
    hint: 'Ingat: 1/2 juta bersamaan 500,000. Jadi 3 juta + 500,000 = 3,500,000.',
    funFact: 'Tahniah! Anda dapat 80 XP. Cukup untuk beli 4 blok bata atau pokok sakura di Lapangan Rumput!'
  },
  {
    stepId: 2,
    zoneId: 'zone-1',
    name: 'Jambatan Gantung Buluh',
    biome: '🪵 Lembah Sungai Jernih',
    icon: '🌉',
    xpReward: 90,
    topic: 'Nilai Tempat & Nilai Digit',
    story: 'Untuk melintasi jambatan gantung, masukkan digit yang betul bagi nilai tempat ratus ribu.',
    question: 'Apakah nilai tempat bagi digit 7 dalam nombor 4,728,150?',
    options: [
      'Puluh ribu',
      'Ratus ribu',
      'Juta',
      'Ratus'
    ],
    correctIndex: 1,
    hint: 'Susunan nilai tempat dari kanan: sa, puluh, ratus, ribu, puluh ribu, ratus ribu, juta.',
    funFact: 'Hebat! Anda melangkah ke seberang sungai dan meraih 90 XP!'
  },
  {
    stepId: 3,
    zoneId: 'zone-1',
    name: 'Gua Nombor Perdana',
    biome: '🪨 Pergunungan Batu Kapur',
    icon: '⛰️',
    xpReward: 100,
    topic: 'Nombor Perdana',
    story: 'Pintu gua ini hanya terbuka jika anda memilih nombor yang hanya boleh dibahagi dengan 1 dan dirinya sendiri.',
    question: 'Antara nombor berikut, yang manakah merupakan NOMBOR PERDANA?',
    options: [
      '27 (boleh bahagi 3 dan 9)',
      '31 (hanya boleh bahagi 1 dan 31)',
      '35 (boleh bahagi 5 dan 7)',
      '39 (boleh bahagi 3 dan 13)'
    ],
    correctIndex: 1,
    hint: 'Nombor perdana tidak terdapat dalam mana-mana sifir selain sifir 1 dan sifirnya sendiri.',
    funFact: 'Luar biasa! Pintu gua terbuka luas dan ganjaran 100 XP dimasukkan ke poket anda!'
  },

  // ========================================================
  // ZON 2: LEMBAH PECAHAN & NISBAH
  // ========================================================
  {
    stepId: 4,
    zoneId: 'zone-2',
    name: 'Air Terjun Pecahan Kristal',
    biome: '🌊 Air Terjun Mengalir',
    icon: '💧',
    xpReward: 100,
    topic: 'Penambahan & Penolakan Pecahan',
    story: 'Air terjun ini mengalirkan tenaga pecahan. Anda perlu mencari jumlah pecahan yang setara.',
    question: 'Hitung: 2/5 + 1/2 = ?',
    options: [
      '3/7',
      '9/10',
      '3/10',
      '1 1/10'
    ],
    correctIndex: 1,
    hint: 'Samakan penyebut kepada 10: 2/5 = 4/10, dan 1/2 = 5/10. Maka 4/10 + 5/10 = 9/10.',
    funFact: 'Tepat sekali! Avatar melompat melintasi batu sungai dengan selamat (+100 XP).'
  },
  {
    stepId: 5,
    zoneId: 'zone-2',
    name: 'Laluan Hutan Buluh Bersilang',
    biome: '🎋 Hutan Buluh Hijau',
    icon: '🎋',
    xpReward: 110,
    topic: 'Pendaraban Pecahan',
    story: 'Penjaga hutan meminta anda mengira sebahagian daripada kuantiti benih tanaman.',
    question: 'Berapakah 3/4 daripada 24 batang buluh?',
    options: [
      '16 batang',
      '18 batang',
      '20 batang',
      '12 batang'
    ],
    correctIndex: 1,
    hint: 'Darabkan: (3 × 24) ÷ 4 = 72 ÷ 4 = 18 batang buluh.',
    funFact: 'Syabas! Anda membawa pulang 18 batang buluh dan meraih 110 XP!'
  },
  {
    stepId: 6,
    zoneId: 'zone-2',
    name: 'Kubu Nisbah & Kadaran',
    biome: '🏰 Kubu Purba Kayu',
    icon: '🏯',
    xpReward: 110,
    topic: 'Nisbah & Kadaran',
    story: 'Di pintu kubu, nisbah bilangan askar pemanah kepada askar pedang ialah 3 : 5.',
    question: 'Jika terdapat 15 orang askar pemanah, berapakah bilangan askar pedang?',
    options: [
      '20 orang',
      '25 orang',
      '30 orang',
      '35 orang'
    ],
    correctIndex: 1,
    hint: '3 bahagian = 15, maka 1 bahagian = 5. Askar pedang = 5 bahagian × 5 = 25 orang.',
    funFact: 'Kubu ditawan dengan mudah! Tambahan 110 XP berjaya diraih!'
  },

  // ========================================================
  // ZON 3: GURUN PERPULUHAN & PERATUS
  // ========================================================
  {
    stepId: 7,
    zoneId: 'zone-3',
    name: 'Oasis Pasir Keemasan',
    biome: '🏜️ Gurun Pasir Luas',
    icon: '🌴',
    xpReward: 120,
    topic: 'Pendaraban Perpuluhan',
    story: 'Di tengah oasis, unta memerlukan 2.45 liter air setiap jam selama 10 jam perjalanan.',
    question: 'Kira jumlah air yang diperlukan: 2.45 × 10 = ?',
    options: [
      '24.5 liter',
      '245 liter',
      '0.245 liter',
      '2.450 liter'
    ],
    correctIndex: 0,
    hint: 'Bila darab dengan 10, gerakkan titik perpuluhan satu langkah ke kanan: 2.45 -> 24.5.',
    funFact: 'Bekalan air mencukupi! Anda merentasi padang pasir dengan ganjaran 120 XP!'
  },
  {
    stepId: 8,
    zoneId: 'zone-3',
    name: 'Piramid Rahsia Peratusan',
    biome: '🔺 Monumen Piramid Purba',
    icon: '🏛️',
    xpReward: 120,
    topic: 'Penukaran Pecahan ke Peratus',
    story: 'Pintu piramid terkunci dengan enigma peratusan. Pecahan 4/5 perlu diubah kepada peratus.',
    question: 'Tukarkan 4/5 kepada bentuk peratusan (%).',
    options: [
      '45%',
      '75%',
      '80%',
      '85%'
    ],
    correctIndex: 2,
    hint: 'Darabkan pecahan dengan 100%: 4/5 × 100% = 400 ÷ 5 = 80%.',
    funFact: 'Harta karun piramid terbuka! Anda menerima 120 XP berharga!'
  },
  {
    stepId: 9,
    zoneId: 'zone-3',
    name: 'Menara Tinjau Cahaya Gurun',
    biome: '🏮 Menara Jam Gurun',
    icon: '🗼',
    xpReward: 130,
    topic: 'Peratusan Kuantiti',
    story: 'Menara ini memerlukan 25% daripada 400 tenaga bateri solar untuk menyalakan suar.',
    question: 'Berapakah nilai 25% daripada 400 unit bateri?',
    options: [
      '50 unit',
      '80 unit',
      '100 unit',
      '125 unit'
    ],
    correctIndex: 2,
    hint: '25% bersamaan 1/4. Maka 400 ÷ 4 = 100 unit.',
    funFact: 'Suar menyala terang menunjuk jalan! 130 XP menjadi milik anda!'
  },

  // ========================================================
  // ZON 4: KOTA KEWANGAN & PELABURAN
  // ========================================================
  {
    stepId: 10,
    zoneId: 'zone-4',
    name: 'Pasar Dagang Bandar Cyber',
    biome: '🏙️ Bandaraya Moden',
    icon: '🏬',
    xpReward: 130,
    topic: 'Untung & Rugi',
    story: 'Peniaga membeli sebuah basikal berharga RM 180 dan menjualnya pada harga RM 250.',
    question: 'Berapakah UNTUNG yang diperoleh oleh peniaga tersebut?',
    options: [
      'RM 60',
      'RM 70',
      'RM 80',
      'RM 90'
    ],
    correctIndex: 1,
    hint: 'Untung = Harga Jual - Harga Kos = RM 250 - RM 180 = RM 70.',
    funFact: 'Urus niaga bijak! Anda meraih 130 XP untuk membeli kereta atau perabot!'
  },
  {
    stepId: 11,
    zoneId: 'zone-4',
    name: 'Bank Simpanan Emas Negara',
    biome: '🏦 Bangunan Kripto Bank',
    icon: '🪙',
    xpReward: 140,
    topic: 'Faedah Mudah & Simpanan',
    story: 'Farhan menyimpan RM 2,000 di bank dengan kadar faedah 3% setahun.',
    question: 'Berapakah FAEDAH yang diterima selepas 1 tahun?',
    options: [
      'RM 30',
      'RM 60',
      'RM 90',
      'RM 120'
    ],
    correctIndex: 1,
    hint: 'Faedah = RM 2,000 × 3/100 = 20 × 3 = RM 60.',
    funFact: 'Simpanan bertambah lumayan! Bank menghadiahkan 140 XP kepada anda!'
  },
  {
    stepId: 12,
    zoneId: 'zone-4',
    name: 'Gudang Diskaun Mega Cyber',
    biome: '🛍️ Pusat Beli-Belah',
    icon: '🛒',
    xpReward: 140,
    topic: 'Diskaun & Rebat',
    story: 'Sebuah komputer riba berharga RM 1,500 diberi diskaun sebanyak 20%.',
    question: 'Berapakah nilai potongan DISKAUN tersebut?',
    options: [
      'RM 250',
      'RM 300',
      'RM 350',
      'RM 200'
    ],
    correctIndex: 1,
    hint: 'Diskaun = 20/100 × RM 1,500 = 20 × 15 = RM 300.',
    funFact: 'Penjimatan hebat! Tambahan 140 XP kini di tangan anda!'
  },

  // ========================================================
  // ZON 5: PERGUNUNGAN MASA & ISIPADU
  // ========================================================
  {
    stepId: 13,
    zoneId: 'zone-5',
    name: 'Stesen Jam Astronomi Purba',
    biome: '🕰️ Menara Jam Salji',
    icon: '⏳',
    xpReward: 150,
    topic: 'Sistem 24 Jam & Tempoh Masa',
    story: 'Kereta api ekspres bertolak pada Jam 0830 dan tiba di stesen gunung pada Jam 1415.',
    question: 'Berapakah TEMPOH masa perjalanan kereta api tersebut?',
    options: [
      '5 jam 15 minit',
      '5 jam 45 minit',
      '6 jam 15 minit',
      '6 jam 45 minit'
    ],
    correctIndex: 1,
    hint: 'Dari 0830 ke 1430 ialah 6 jam. Tolak 15 minit (kerana 1415) = 5 jam 45 minit.',
    funFact: 'Masa perjalanan direkod tepat! Anda dikurniakan 150 XP!'
  },
  {
    stepId: 14,
    zoneId: 'zone-5',
    name: 'Lembah Geometri & Luas Tanah',
    biome: '📐 Dataran Geometri Prisma',
    icon: '📏',
    xpReward: 150,
    topic: 'Luas Segi Empat',
    story: 'Sebidang tanah lapang berbentuk segi empat tepat berukuran panjang 12 meter dan lebar 8 meter.',
    question: 'Hitung LUAS kawasan tanah lapang tersebut dalam meter persegi (m²).',
    options: [
      '84 m²',
      '96 m²',
      '108 m²',
      '40 m²'
    ],
    correctIndex: 1,
    hint: 'Luas = Panjang × Lebar = 12 m × 8 m = 96 m².',
    funFact: 'Tanah lapangan sedia untuk didirikan rumah impian! +150 XP!'
  },
  {
    stepId: 15,
    zoneId: 'zone-5',
    name: 'Takungan Air Isipadu Padu',
    biome: '🧊 Tasik Ais Kristal',
    icon: '🧊',
    xpReward: 160,
    topic: 'Isipadu Kuboid',
    story: 'Sebuah tangki air berbentuk kuboid mempunyai panjang 5m, lebar 3m dan tinggi 2m.',
    question: 'Berapakah ISIPADU tangki tersebut dalam meter padu (m³)?',
    options: [
      '25 m³',
      '30 m³',
      '35 m³',
      '40 m³'
    ],
    correctIndex: 1,
    hint: 'Isipadu Kuboid = Panjang × Lebar × Tinggi = 5 × 3 × 2 = 30 m³.',
    funFact: 'Tangki air berfungsi sempurna! Anda menerima ganjaran besar 160 XP!'
  },

  // ========================================================
  // ZON 6: PUNCAK ANGKA TERAGUNG (MEGA QUEST BOSS)
  // ========================================================
  {
    stepId: 16,
    zoneId: 'zone-6',
    name: 'Pusat Pelancaran Roket ARMS',
    biome: '🚀 Pangkalan Angkasa Marikh',
    icon: '🛰️',
    xpReward: 300,
    topic: 'Koordinat & Jarak Cartes',
    story: 'CABARAN TERAKHIR! Roket ARMS berada di titik (2, 3) dan satelit sasaran berada di titik (7, 3).',
    question: 'Berapakah unit jarak mengufuk dari roket ke satelit tersebut?',
    options: [
      '3 unit',
      '4 unit',
      '5 unit',
      '6 unit'
    ],
    correctIndex: 2,
    hint: 'Jarak mengufuk = x₂ - x₁ = 7 - 2 = 5 unit.',
    funFact: 'KEMENANGAN MUTLAK! Roket berjaya dilancarkan ke angkasa! Anda dianugerahkan MEGA 300 XP!'
  }
];
