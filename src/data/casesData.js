// DSKP MATEMATIK TAHUN 6 (KSSR SEMAKAN) - KES-KES DETEKTIF SIBER ARMS

export const CASES_DATA = [
  {
    id: 'kes-01',
    caseNumber: 1,
    topic: '1. Nombor Bulat & Operasi Asas',
    title: 'Pencerobohan Bank Siber: Kod Vault Kripto',
    subtitle: 'Nyahkod nombor juta, nombor perdana & operasi bergabung kurungan',
    location: 'Pusat Simpanan Data Siber Cyberjaya',
    threatLevel: 'Rendah - Siasatan Awal',
    isBoss: false,
    badgeReward: {
      id: 'badge-01',
      name: 'Penyahkod Nombor Perdana',
      icon: '💎',
      desc: 'Membongkar kod transaksi bernilai jutaan ringgit.'
    },
    story: 'Penggodam bernombor kod "Enigma" telah mencuba memindahkan dana simpanan rakyat. Dia meninggalkan 3 kekunci kriptik berdasarkan nombor juta dan nombor perdana untuk mengunci peti besi pusat data.',
    stages: [
      {
        stageNumber: 1,
        title: 'Bukti A: Nilai Nombor Pecahan & Perpuluhan Juta',
        clueSnippet: 'LOG SISTEM: Penggodam cuba memindahkan 1 3/4 juta ringgit dan 0.25 juta ringgit.',
        situation: 'Audit menunjukkan penggodam membahagikan dana kepada dua transaksi: Transaksi pertama bernilai 1 3/4 juta ringgit, dan transaksi kedua bernilai 0.25 juta ringgit.',
        question: 'Berapakah JUMLAH wang keseluruhan dalam nombor bulat yang terlibat?',
        options: [
          'RM 1,750,000',
          'RM 2,000,000',
          'RM 2,250,000',
          'RM 1,950,000'
        ],
        correctIndex: 1,
        explanation: '1 3/4 juta = 1,750,000. Manakala 0.25 juta = 250,000. Jumlah keseluruhan = 1,750,000 + 250,000 = 2,000,000 (2 juta ringgit).',
        hints: [
          { level: 1, title: 'Kanta Risikan', text: 'Ingat perkaitan asas: 1/4 juta = 250,000, 1/2 juta = 500,000, 3/4 juta = 750,000.' },
          { level: 2, title: 'Analisis Data', text: 'Tukarkan kedua-dua nombor kepada nombor bulat dahulu: 1 3/4 juta = 1,750,000 dan 0.25 juta = 0.25 × 1,000,000 = 250,000.' },
          { level: 3, title: 'Bongkar Rahsia', text: 'Tambahkan 1,750,000 + 250,000 = 2,000,000 ringgit.' }
        ]
      },
      {
        stageNumber: 2,
        title: 'Bukti B: Kunci Nombor Perdana Tersembunyi',
        clueSnippet: 'PORT FIREWALL: "Hanya digit hasil tambah dua nombor perdana antara 10 dan 20 dibenarkan melintasi port."',
        situation: 'Untuk melepasi sekatan keselamatan, detektif perlu mengenal pasti nombor perdana dalam lingkungan 10 hingga 20.',
        question: 'Antara berikut, yang manakah SEMUA nombornya ialah nombor perdana antara 10 hingga 20?',
        options: [
          '11, 13, 15, 17',
          '11, 13, 17, 19',
          '11, 15, 17, 19',
          '13, 17, 19, 21'
        ],
        correctIndex: 1,
        explanation: 'Nombor perdana hanya boleh dibahagi dengan 1 dan dirinya sendiri. Antara 10 dan 20, nombor perdana ialah 11, 13, 17, dan 19. (15 boleh dibahagi 3 dan 5; 21 boleh dibahagi 3 dan 7).',
        hints: [
          { level: 1, title: 'Kanta Risikan', text: 'Nombor perdana mestilah lebih daripada 1 dan hanya mempunyai 2 faktor (1 dan dirinya sendiri).' },
          { level: 2, title: 'Analisis Data', text: 'Semak nombor ganjil: 15 (3×5=15 bukan perdana), 21 (3×7=21 bukan perdana).' },
          { level: 3, title: 'Bongkar Rahsia', text: 'Senarai tepat ialah 11, 13, 17, 19.' }
        ]
      },
      {
        stageNumber: 3,
        title: 'Bukti C: Operasi Bergabung & Tertib Pengiraan (BODMAS)',
        clueSnippet: 'KOD TERMINAL KESELAMATAN: Hitung nilai formula: 450,000 + (120 × 250) - 35,000 untuk menyahaktifkan siren.',
        situation: 'Sistem penggera bank mula berbunyi! Selesaikan persamaan ini dengan mematuhi tertib operasi (utamakan tanda kurung dan darab).',
        question: 'Berapakah nilai akhir kod penyahaktif penggera: 450,000 + (120 × 250) - 35,000 ?',
        options: [
          '445,000',
          '480,000',
          '415,000',
          '465,000'
        ],
        correctIndex: 0,
        explanation: 'Langkah 1: Selesaikan tanda kurung: 120 × 250 = 30,000. Langkah 2: Tambah: 450,000 + 30,000 = 480,000. Langkah 3: Tolak: 480,000 - 35,000 = 445,000.',
        hints: [
          { level: 1, title: 'Kanta Risikan', text: 'Utamakan kurungan terlebih dahulu mengikut hukum operasi bergabung.' },
          { level: 2, title: 'Analisis Data', text: 'Kira 120 × 250 dahulu. (Petua: 120 × 1,000 ÷ 4 = 120,000 ÷ 4 = 30,000).' },
          { level: 3, title: 'Bongkar Rahsia', text: '450,000 + 30,000 = 480,000. Kemudian tolak 35,000 = 445,000.' }
        ]
      }
    ],
    vault: {
      prompt: 'Masukkan KOD PIN 3 Digit Peti Besi: Digit pertama ialah hasil bahagi 2 juta ÷ 1 juta (2). Digit kedua ialah nombor perdana pertama terkecil (2). Digit ketiga ialah bilangan nombor perdana antara 10 hingga 20 (4).',
      targetCode: '224',
      clueText: 'Digit 1: (2 juta ÷ 1 juta = 2) | Digit 2: Nombor perdana terkecil (2) | Digit 3: Bilangan nombor perdana 10-20 (4).'
    }
  },

  {
    id: 'kes-02',
    caseNumber: 2,
    topic: '2. Pecahan, Perpuluhan & Peratus',
    title: 'Formula Antidot Makmal Rahsia',
    subtitle: 'Nyahkod operasi bergabung pecahan, perpuluhan dan peratusan dos penawar',
    location: 'Makmal Biologi Siber ARMS',
    threatLevel: 'Sederhana - Masa Suntuk',
    isBoss: false,
    badgeReward: {
      id: 'badge-02',
      name: 'Penyelamat Bio-Siber',
      icon: '🧪',
      desc: 'Mencampurkan ramuan penawar tepat mengikut sukatan pecahan.'
    },
    story: 'Virus komputer telah menjangkiti mesin pencampur formula penawar makmal. Kita perlu mengira nisbah pecahan dan peratusan bahan dengan tepat agar dos tidak rosak!',
    stages: [
      {
        stageNumber: 1,
        title: 'Bukti A: Pendaraban Pecahan Campuran',
        clueSnippet: 'RESEPI VAKSIN: Ambil 2 1/2 kali ganda daripada 3/5 liter sebatian aktif.',
        situation: 'Untuk membancuh satu tong cecair antidot, sistem memerlukan 2 1/2 daripada 3/5 liter sebatian aktif.',
        question: 'Berapakah liter sebatian aktif yang diperlukan dalam pecahan termudah?',
        options: [
          '1 1/2 liter',
          '1 1/5 liter',
          '1 3/10 liter',
          '2 liter'
        ],
        correctIndex: 0,
        explanation: '2 1/2 × 3/5 = 5/2 × 3/5 = (5 × 3) / (2 × 5) = 15/10 = 3/2 = 1 1/2 liter.',
        hints: [
          { level: 1, title: 'Kanta Risikan', text: 'Tukarkan nombor bercampur 2 1/2 kepada pecahan tak wajar terlebih dahulu (5/2).' },
          { level: 2, title: 'Analisis Data', text: 'Darabkan pengangka dengan pengangka, penyebut dengan penyebut: (5 × 3) / (2 × 5) = 15/10.' },
          { level: 3, title: 'Bongkar Rahsia', text: 'Permudahkan 15/10 dengan bahagi 5: 3/2 = 1 1/2 liter.' }
        ]
      },
      {
        stageNumber: 2,
        title: 'Bukti B: Operasi Bergabung Perpuluhan',
        clueSnippet: 'TEKANAN GAS: Nilai awal 8.45 bar, ditambah 3 tabung setiap satu 1.25 bar, kemudian dibebaskan 2.8 bar.',
        situation: 'Kira baki tekanan gas reaktor makmal selepas proses imbangan kimia dijalankan: 8.45 + (3 × 1.25) - 2.8.',
        question: 'Berapakah baki tekanan gas akhir dalam unit bar?',
        options: [
          '9.4 bar',
          '9.9 bar',
          '10.25 bar',
          '8.9 bar'
        ],
        correctIndex: 0,
        explanation: '3 × 1.25 = 3.75. Kemudian 8.45 + 3.75 = 12.20. Akhir sekali 12.20 - 2.80 = 9.40 (atau 9.4) bar.',
        hints: [
          { level: 1, title: 'Kanta Risikan', text: 'Selesaikan pendaraban (3 × 1.25) dahulu sebelum penambahan.' },
          { level: 2, title: 'Analisis Data', text: '3 × 1.25 = 3.75. Kemudian susun titik perpuluhan selari untuk menambah: 8.45 + 3.75 = 12.20.' },
          { level: 3, title: 'Bongkar Rahsia', text: 'Tolak 12.20 - 2.80 = 9.40 = 9.4 bar.' }
        ]
      },
      {
        stageNumber: 3,
        title: 'Bukti C: Potongan & Peningkatan Peratusan (KBAT)',
        clueSnippet: 'KAPASITI SERVER: Asal 500 Terabait. Selepas serangan virus, kapasiti merosot sebanyak 20%.',
        situation: 'Berapakah baki kapasiti storan server yang masih selamat dan berfungsi?',
        question: 'Hitung baki kapasiti storan yang selamat (dalam Terabait):',
        options: [
          '350 TB',
          '400 TB',
          '420 TB',
          '450 TB'
        ],
        correctIndex: 1,
        explanation: 'Kemerosotan 20% daripada 500 TB = (20/100) × 500 = 100 TB. Baki selamat = 500 - 100 = 400 TB (Atau baki ialah 80% daripada 500 = 400 TB).',
        hints: [
          { level: 1, title: 'Kanta Risikan', text: 'Jika merosot 20%, bermakna baki yang selamat ialah 100% - 20% = 80%.' },
          { level: 2, title: 'Analisis Data', text: 'Kira 20% daripada 500: (20/100) × 500 = 100 TB.' },
          { level: 3, title: 'Bongkar Rahsia', text: '500 TB - 100 TB = 400 TB.' }
        ]
      }
    ],
    vault: {
      prompt: 'Masukkan KOD AKSES DEKONTAMINASI 3-Digit: Digit 1 ialah penyebut bagi pecahan 1 1/2 (iaitu 2). Digit 2 ialah digit pertama bagi 400 TB (iaitu 4). Digit 3 ialah digit selepas perpuluhan bagi 9.4 (iaitu 4).',
      targetCode: '244',
      clueText: 'Penyebut 1 1/2 (2) + Angka ratus 400 TB (4) + Perpuluhan 9.4 (4).'
    }
  },

  {
    id: 'kes-03',
    caseNumber: 3,
    topic: '3. Wang & Celik Kewangan',
    title: 'Audit Forensik Sindiket Gelap',
    subtitle: 'Nyahkod faedah dividen, insurans, aset & liabiliti serta cukai perkhidmatan',
    location: 'Bursa Saham Digital Kuala Lumpur',
    threatLevel: 'Sederhana - Penipuan Siber',
    isBoss: false,
    badgeReward: {
      id: 'badge-03',
      name: 'Auditor Diraja Siber',
      icon: '💼',
      desc: 'Membongkar akaun palsu dan membezakan aset daripada liabiliti.'
    },
    story: 'Sindiket jenayah kewangan cuba memanipulasi pelaburan dan menyembunyikan liabiliti syarikat palsu. Detektif perlu mengaudit invois dan kadar dividen!',
    stages: [
      {
        stageNumber: 1,
        title: 'Bukti A: Pengiraan Dividen & Simpanan',
        clueSnippet: 'AKAUN PELABURAN: Simpanan pokok RM 20,000 menerima dividen tahunan sebanyak 4.5%.',
        situation: 'Mangsa melabur RM 20,000 dalam akaun amanah saham. Pihak bank mengisytiharkan dividen tahunan sebanyak 4.5% setahun.',
        question: 'Berapakah jumlah dividen yang diperoleh mangsa pada akhir tahun pertama?',
        options: [
          'RM 800',
          'RM 900',
          'RM 950',
          'RM 1,000'
        ],
        correctIndex: 1,
        explanation: 'Dividen = 4.5% × RM 20,000 = (4.5 / 100) × 20,000 = 4.5 × 200 = RM 900.',
        hints: [
          { level: 1, title: 'Kanta Risikan', text: 'Formula faedah / dividen = Prinsipal × Kadar %.' },
          { level: 2, title: 'Analisis Data', text: '(4.5 ÷ 100) × 20,000 = 4.5 × 200.' },
          { level: 3, title: 'Bongkar Rahsia', text: '4.5 × 200 = RM 900.' }
        ]
      },
      {
        stageNumber: 2,
        title: 'Bukti B: Cukai Perkhidmatan (Service Tax 6%)',
        clueSnippet: 'INVOIS FORENSIK: Kos sewaan pelayan cloud ialah RM 3,500 sebelum cukai perkhidmatan 6%.',
        situation: 'Sindiket membayar sewa pelayan pusat kawalan sebanyak RM 3,500 tertakluk kepada cukai perkhidmatan 6%.',
        question: 'Berapakah JUMLAH bayaran keseluruhan yang perlu dibayar termasuk cukai perkhidmatan?',
        options: [
          'RM 3,650',
          'RM 3,710',
          'RM 3,750',
          'RM 3,820'
        ],
        correctIndex: 1,
        explanation: 'Cukai = 6% × RM 3,500 = (6/100) × 3,500 = 6 × 35 = RM 210. Jumlah bayaran = RM 3,500 + RM 210 = RM 3,710.',
        hints: [
          { level: 1, title: 'Kanta Risikan', text: 'Kira nilai cukai dahulu: 6% daripada RM 3,500, kemudian tambahkan kepada harga asal.' },
          { level: 2, title: 'Analisis Data', text: '6 × 35 = 210 ringgit nilai cukai.' },
          { level: 3, title: 'Bongkar Rahsia', text: 'RM 3,500 + RM 210 = RM 3,710.' }
        ]
      },
      {
        stageNumber: 3,
        title: 'Bukti C: Pengelasan Aset & Liabiliti (KBAT)',
        clueSnippet: 'DOKUMEN KEWANGAN: Rumah sewa (menjana pendapatan), pinjaman bank kad kredit, wang tunai, baki pinjaman kereta.',
        situation: 'Detektif perlu membezakan Aset (apa yang kita miliki dan menambah nilai) dengan Liabiliti (tanggungan hutang yang perlu dibayar).',
        question: 'Antara berikut, pasangan manakah yang KEDUA-DUANYA merupakan LIABILITI?',
        options: [
          'Simpanan Tetap & Saham',
          'Hutang Kad Kredit & Pinjaman Perumahan',
          'Rumah Kediaman & Barang Kemas',
          'Wang Tunai & Dividen Amanah Saham'
        ],
        correctIndex: 1,
        explanation: 'Liabiliti ialah tanggungan hutang yang mesti dibayar atau mengalir keluar wang kita, seperti hutang kad kredit dan baki pinjaman perumahan.',
        hints: [
          { level: 1, title: 'Kanta Risikan', text: 'Aset mendatangkan wang / mempunyai nilai pemilikan positif. Liabiliti ialah hutang dan bebanan kewangan.' },
          { level: 2, title: 'Analisis Data', text: 'Semak pilihan: Hutang kad kredit dan pinjaman bank adalah obligasi kewangan (hutang).' },
          { level: 3, title: 'Bongkar Rahsia', text: 'Jawapannya ialah Hutang Kad Kredit & Pinjaman Perumahan.' }
        ]
      }
    ],
    vault: {
      prompt: 'Masukkan KOD PETI SULIT 3-Digit: Digit 1 ialah angka ratus dividen (iaitu 9 daripada RM 900). Digit 2 ialah nilai cukai RM 210 dibahagi 100 dibundarkan (iaitu 2). Digit 3 ialah digit pertama jumlah invois RM 3,710 (iaitu 3).',
      targetCode: '923',
      clueText: 'Angka ratus dividen (9) + Angka ratus cukai (2) + Digit pertama invois (3).'
    }
  },

  {
    id: 'kes-04',
    caseNumber: 4,
    topic: '4. Masa & Waktu',
    title: 'Penggodaman Satelit Orbit Global',
    subtitle: 'Nyahkod zon masa dunia, perbezaan masa antarabangsa & sistem 24 jam',
    location: 'Stesen Pencerapan Angkasa Langkawi',
    threatLevel: 'Tinggi - Krisis Waktu',
    isBoss: false,
    badgeReward: {
      id: 'badge-04',
      name: 'Penjaga Garis Masa',
      icon: '⏱️',
      desc: 'Menyelaraskan jam navigasi satelit antarabangsa tanpa sesaat pun ralat.'
    },
    story: 'Satelit komunikasi negara telah dinyahsegerakkan oleh malware masa. Penggodam menukar koordinat waktu antara Kuala Lumpur, London, dan Tokyo!',
    stages: [
      {
        stageNumber: 1,
        title: 'Bukti A: Perbezaan Zon Masa Dunia',
        clueSnippet: 'LOG RADAR: Kuala Lumpur berada di zon masa UTC+8. London berada di UTC+0 (lewat 8 jam di belakang KL).',
        situation: 'Waktu di Kuala Lumpur menunjukkan jam 0930 pada hari Isnin. Sebuah isyarat kecemasan dihantar ke pangkalan di London.',
        question: 'Pukul berapakah waktu di London ketika isyarat itu diterima pada hari yang sama?',
        options: [
          'Jam 0130 hari Isnin',
          'Jam 1730 hari Ahad',
          'Jam 0230 hari Isnin',
          'Jam 1830 hari Isnin'
        ],
        correctIndex: 0,
        explanation: 'London lewat 8 jam di belakang Kuala Lumpur. Jam 0930 - 8 jam = Jam 0130 pada hari yang sama (Isnin).',
        hints: [
          { level: 1, title: 'Kanta Risikan', text: 'Kuala Lumpur berada di sebelah timur (UTC+8), maka London berada di sebelah barat (lewat 8 jam).' },
          { level: 2, title: 'Analisis Data', text: 'Tolak 8 jam daripada Jam 0930: 9 jam - 8 jam = 1 jam. Minit kekal 30 minit.' },
          { level: 3, title: 'Bongkar Rahsia', text: 'Jam 0130 hari Isnin (iaitu 1:30 pagi).' }
        ]
      },
      {
        stageNumber: 2,
        title: 'Bukti B: Waktu Perjalanan Merentas Zon (KBAT)',
        clueSnippet: 'PENERBANGAN EKSKUSIF: Pesawat dron ARMS berlepas dari Kuala Lumpur (UTC+8) pada Jam 2200 hari Selasa ke Tokyo (UTC+9). Tempoh penerbangan ialah 7 jam.',
        situation: 'Waktu di Tokyo ialah 1 jam LEBIH AWAL mendahului Kuala Lumpur. Hitung waktu dron mendarat di Tokyo mengikut waktu tempatan Tokyo.',
        question: 'Bilakah waktu mendarat dron di Tokyo (Waktu Tempatan Tokyo)?',
        options: [
          'Jam 0500 hari Rabu',
          'Jam 0600 hari Rabu',
          'Jam 0700 hari Rabu',
          'Jam 0600 hari Selasa'
        ],
        correctIndex: 1,
        explanation: 'Waktu berlepas mengikut waktu Tokyo: Jam 2200 + 1 jam beza = Jam 2300 Selasa. Tambah tempoh penerbangan 7 jam: Jam 2300 + 7 jam = Jam 0600 hari Rabu!',
        hints: [
          { level: 1, title: 'Kanta Risikan', text: 'Tokyo lebih awal 1 jam berbanding Kuala Lumpur (UTC+9 vs UTC+8).' },
          { level: 2, title: 'Analisis Data', text: 'Jika di KL jam 2200 Selasa, di Tokyo sudah jam 2300 Selasa. Tambahkan tempoh 7 jam.' },
          { level: 3, title: 'Bongkar Rahsia', text: 'Jam 2300 + 1 jam = Jam 0000 (Rabu), baki 6 jam lagi menjadikannya Jam 0600 hari Rabu.' }
        ]
      },
      {
        stageNumber: 3,
        title: 'Bukti C: Tempoh Masa Hari dan Jam',
        clueSnippet: 'SIASATAN KEROSAKAN: Transmisi data terhenti dari Jam 1445 pada 12 Mac hingga Jam 0815 pada 14 Mac.',
        situation: 'Kira jumlah tempoh masa sebenar transmisi data satelit terputus.',
        question: 'Berapakah jumlah masa terputus dalam hari dan jam/minit?',
        options: [
          '1 hari 17 jam 30 minit',
          '2 hari 2 jam 30 minit',
          '1 hari 16 jam 30 minit',
          '2 hari 6 jam 30 minit'
        ],
        correctIndex: 0,
        explanation: 'Dari 12 Mac Jam 1445 hingga 13 Mac Jam 1445 = 1 hari (24 jam). Dari 13 Mac Jam 1445 hingga 14 Mac Jam 0815 = 17 jam 30 minit. Jumlah = 1 hari 17 jam 30 minit.',
        hints: [
          { level: 1, title: 'Kanta Risikan', text: 'Kira dahulu tempoh 1 hari genap (24 jam dari waktu yang sama pada hari berikutnya).' },
          { level: 2, title: 'Analisis Data', text: '12 Mac 1445 ke 13 Mac 1445 = 24 jam (1 hari). Dari 1445 hingga 2400 (tengah malam) = 9 jam 15 minit. Tambah 0815 = 17 jam 30 minit.' },
          { level: 3, title: 'Bongkar Rahsia', text: 'Jumlahnya ialah 1 hari 17 jam 30 minit.' }
        ]
      }
    ],
    vault: {
      prompt: 'Masukkan KOD PINTU KAWALAN SATELIT 3-Digit: Digit 1 ialah jam waktu London (iaitu 1 daripada Jam 0130). Digit 2 ialah jam waktu pendaratan Tokyo (iaitu 6 daripada Jam 0600). Digit 3 ialah beza zon masa KL dengan London (iaitu 8 jam).',
      targetCode: '168',
      clueText: 'Jam London (1) + Jam Tokyo (6) + Beza zon KL-London (8 jam).'
    }
  },

  {
    id: 'kes-05',
    caseNumber: 5,
    topic: '5. Ukuran & Sukatan',
    title: 'Sabotaj Tangki Reaktor Penyejuk',
    subtitle: 'Nyahkod sukatan panjang, jisim dan isi padu cecair operasi gabungan',
    location: 'Loji Janakuasa Hidroelektrik Bakun Siber',
    threatLevel: 'Tinggi - Amaran Haba',
    isBoss: false,
    badgeReward: {
      id: 'badge-05',
      name: 'Pakar Kalibrasi Metrik',
      icon: '⚙️',
      desc: 'Menyelamatkan reaktor daripada meletup dengan kiraan sukatan tepat.'
    },
    story: 'Injap automatik reaktor telah disabotaj. Penggodam mengubah unit antara kilogram, gram, liter, mililiter dan kilometer agar sensor sistem keliru.',
    stages: [
      {
        stageNumber: 1,
        title: 'Bukti A: Operasi Bergabung Isi Padu Cecair',
        clueSnippet: 'TANGKI PENYEJUK: Tangki mengandungi 45 liter cecair. Sebanyak 8 botol penyejuk khas (setiap satu 750 ml) ditambah, kemudian 12.5 liter dikeluarkan.',
        situation: 'Kira baki cecair penyejuk dalam tangki dalam unit liter.',
        question: 'Berapakah baki cecair penyejuk yang tinggal di dalam tangki?',
        options: [
          '38.5 liter',
          '36.5 liter',
          '40.2 liter',
          '39.5 liter'
        ],
        correctIndex: 0,
        explanation: '8 botol × 750 ml = 6,000 ml = 6 liter. Jumlah cecair = 45 liter + 6 liter = 51 liter. Dikeluarkan 12.5 liter: 51 - 12.5 = 38.5 liter.',
        hints: [
          { level: 1, title: 'Kanta Risikan', text: 'Tukarkan 750 ml kepada liter atau darab dahulu botol: 8 × 750 ml = 6,000 ml.' },
          { level: 2, title: 'Analisis Data', text: 'Ingat: 1,000 ml = 1 liter. Maka 6,000 ml = 6 liter. Jumlah baru = 45 + 6 = 51 liter.' },
          { level: 3, title: 'Bongkar Rahsia', text: '51 liter - 12.5 liter = 38.5 liter.' }
        ]
      },
      {
        stageNumber: 2,
        title: 'Bukti B: Siasatan Jisim Logam Teras (kg dan g)',
        clueSnippet: 'KOTAK PENAPIS: 5 ketul rod penapis berjisim sama. Jumlah jisimnya bersama sebuah bekas 1.2 kg ialah 13.7 kg.',
        situation: 'Kira jisim bagi SATU ketul rod penapis dalam kilogram dan gram.',
        question: 'Berapakah jisim bagi seketul rod penapis tersebut?',
        options: [
          '2 kg 500 g',
          '2 kg 400 g',
          '2 kg 250 g',
          '2 kg 600 g'
        ],
        correctIndex: 0,
        explanation: 'Jisim 5 ketul rod = 13.7 kg - 1.2 kg = 12.5 kg. Jisim seketul rod = 12.5 kg ÷ 5 = 2.5 kg = 2 kg 500 g.',
        hints: [
          { level: 1, title: 'Kanta Risikan', text: 'Tolak jisim bekas terlebih dahulu daripada jumlah keseluruhan jisim.' },
          { level: 2, title: 'Analisis Data', text: '13.7 kg - 1.2 kg = 12.5 kg untuk 5 rod. Kemudian bahagi 5.' },
          { level: 3, title: 'Bongkar Rahsia', text: '12.5 ÷ 5 = 2.5 kg. 0.5 kg = 500 g. Jadi jawapannya 2 kg 500 g.' }
        ]
      },
      {
        stageNumber: 3,
        title: 'Bukti C: Jarak Kabel Gentian Optik (km dan m)',
        clueSnippet: 'JARINGAN KABEL: Panjang asal kabel kawalan 4.2 km. Diberikan pembaikan sepanjang 3 gulung kabel (setiap satu 650 m).',
        situation: 'Berapakah jumlah panjang keseluruhan kabel kawalan sekarang dalam unit km?',
        question: 'Hitung panjang keseluruhan kabel dalam km:',
        options: [
          '5.85 km',
          '6.15 km',
          '6.05 km',
          '5.95 km'
        ],
        correctIndex: 1,
        explanation: '3 × 650 m = 1,950 m = 1.95 km. Jumlah panjang = 4.2 km + 1.95 km = 6.15 km.',
        hints: [
          { level: 1, title: 'Kanta Risikan', text: 'Kira panjang 3 gulung kabel: 3 × 650 m.' },
          { level: 2, title: 'Analisis Data', text: '3 × 650 m = 1,950 m. Tukar ke km (bahagi 1,000) = 1.95 km.' },
          { level: 3, title: 'Bongkar Rahsia', text: '4.2 km + 1.95 km = 6.15 km.' }
        ]
      }
    ],
    vault: {
      prompt: 'Masukkan KOD INJAP KESELAMATAN REAKTOR 3-Digit: Digit 1 ialah digit perpuluhan bagi 38.5 liter (iaitu 5). Digit 2 ialah angka ratus bagi jisim rod 2 kg 500 g (iaitu 5). Digit 3 ialah digit pertama bagi panjang kabel 6.15 km (iaitu 6).',
      targetCode: '556',
      clueText: 'Perpuluhan 38.5 (5) + Angka ratus jisim 500g (5) + Digit pertama kabel 6.15km (6).'
    }
  },

  {
    id: 'kes-06',
    caseNumber: 6,
    topic: '6. Ruang & Geometri',
    title: 'Labirin Laser & Zon Tersembunyi',
    subtitle: 'Nyahkod sudut pedalaman poligon, luas bentuk gabungan 2D dan isi padu 3D',
    location: 'Pangkalan Bawah Tanah Kubu Siber',
    threatLevel: 'Tinggi - Perangkap Geometri',
    isBoss: false,
    badgeReward: {
      id: 'badge-06',
      name: 'Arkitek Geometri Siber',
      icon: '📐',
      desc: 'Membelah jerangkap laser dengan pengiraan sudut dan perimeter jitu.'
    },
    story: 'Pintu bilik kawalan terlindung di sebalik perangkap laser cermin optik. Sudut pantulan dan saiz perimeter bilik mesti dikira dengan formula poligon!',
    stages: [
      {
        stageNumber: 1,
        title: 'Bukti A: Sudut Pedalaman Poligon Sekata',
        clueSnippet: 'SENSOR CERMIN: Laser dipantulkan pada sebuah cermin berbentuk Segi Tiga Sama Sisi dan Segi Empat Sama.',
        situation: 'Kira hasil tambah satu sudut pedalaman segi tiga sama sisi dan satu sudut pedalaman segi empat sama.',
        question: 'Berapakah hasil tambah kedua-dua sudut tersebut?',
        options: [
          '135°',
          '150°',
          '160°',
          '120°'
        ],
        correctIndex: 1,
        explanation: 'Sudut pedalaman segi tiga sama sisi = 180° ÷ 3 = 60°. Sudut segi empat sama = 90°. Hasil tambah = 60° + 90° = 150°.',
        hints: [
          { level: 1, title: 'Kanta Risikan', text: 'Jumlah sudut pedalaman segi tiga ialah 180°. Oleh sebab sama sisi, bahagi 3.' },
          { level: 2, title: 'Analisis Data', text: '180° ÷ 3 = 60°. Manakala setiap sudut segi empat sama ialah 90° (sudut tegak).' },
          { level: 3, title: 'Bongkar Rahsia', text: '60° + 90° = 150°.' }
        ]
      },
      {
        stageNumber: 2,
        title: 'Bukti B: Luas Bentuk Gabungan 2D (Segi Empat & Segi Tiga)',
        clueSnippet: 'LANTAI SENSOR: Sebuah bilik gabungan terdiri daripada segi empat tepat (panjang 8 m, lebar 5 m) bercantum dengan segi tiga bersudut tegak (tapak 6 m, tinggi 5 m).',
        situation: 'Kira luas keseluruhan lantai bilik kawalan tersebut untuk menentukan perimeter grid perlindungan.',
        question: 'Berapakah luas keseluruhan lantai bentuk gabungan tersebut (dalam meter persegi, m²)?',
        options: [
          '50 m²',
          '55 m²',
          '65 m²',
          '45 m²'
        ],
        correctIndex: 1,
        explanation: 'Luas segi empat tepat = 8 m × 5 m = 40 m². Luas segi tiga = 1/2 × tapak × tinggi = 1/2 × 6 m × 5 m = 15 m². Luas gabungan = 40 + 15 = 55 m².',
        hints: [
          { level: 1, title: 'Kanta Risikan', text: 'Luas segi empat tepat = Panjang × Lebar. Luas segi tiga = 1/2 × Tapak × Tinggi.' },
          { level: 2, title: 'Analisis Data', text: 'Kira segi empat: 8 × 5 = 40 m². Kira segi tiga: 1/2 × 6 × 5 = 15 m².' },
          { level: 3, title: 'Bongkar Rahsia', text: 'Tambah kedua-dua bahagian: 40 + 15 = 55 m².' }
        ]
      },
      {
        stageNumber: 3,
        title: 'Bukti C: Isi Padu Bentuk Gabungan 3D (Kubus & Kuboid)',
        clueSnippet: 'KOTAK SERVER SERVER 3D: Kubus dengan sisi 4 cm diletakkan di atas sebuah kuboid berukuran panjang 10 cm, lebar 4 cm dan tinggi 6 cm.',
        situation: 'Kira jumlah isi padu gabungan kedua-dua bongkah server 3D tersebut.',
        question: 'Berapakah jumlah isi padu bongkah gabungan dalam cm³?',
        options: [
          '280 cm³',
          '304 cm³',
          '320 cm³',
          '264 cm³'
        ],
        correctIndex: 1,
        explanation: 'Isi padu kubus = 4 × 4 × 4 = 64 cm³. Isi padu kuboid = 10 × 4 × 6 = 240 cm³. Jumlah isi padu = 64 + 240 = 304 cm³.',
        hints: [
          { level: 1, title: 'Kanta Risikan', text: 'Isi padu kubus = panjang × lebar × tinggi (4 × 4 × 4). Isi padu kuboid = 10 × 4 × 6.' },
          { level: 2, title: 'Analisis Data', text: 'Kubus: 4 × 4 × 4 = 64 cm³. Kuboid: 10 × 4 × 6 = 240 cm³.' },
          { level: 3, title: 'Bongkar Rahsia', text: 'Tambah keduanya: 64 + 240 = 304 cm³.' }
        ]
      }
    ],
    vault: {
      prompt: 'Masukkan KOD PINTU LABIRIN LASER 3-Digit: Digit 1 ialah angka ratus sudut gabungan 150° (iaitu 1). Digit 2 ialah digit pertama luas lantai 55 m² (iaitu 5). Digit 3 ialah digit terakhir isi padu 304 cm³ (iaitu 4).',
      targetCode: '154',
      clueText: 'Angka ratus sudut 150° (1) + Digit pertama luas 55m² (5) + Digit terakhir isi padu 304cm³ (4).'
    }
  },

  {
    id: 'kes-07',
    caseNumber: 7,
    topic: '7. Koordinat, Nisbah & Kadaran',
    title: 'Jejak Radar Dron & Satah Cartes',
    subtitle: 'Nyahkod satah Cartes, jarak mengufuk/mencancang serta nisbah & kadaran',
    location: 'Menara Kawalan Trafik Udara Siber Putrajaya',
    threatLevel: 'Tinggi - Sasaran Bergerak',
    isBoss: false,
    badgeReward: {
      id: 'badge-07',
      name: 'Pengemudi Satah Cartes',
      icon: '🎯',
      desc: 'Menjejak koordinat penggodam dengan perkadaran nisbah yang sempurna.'
    },
    story: 'Sebuah van penggodam bergerak di sekitar bandar sambil memancarkan isyarat gangguan. Radar memetakan kedudukan van dan dron pemintas pada Satah Cartes!',
    stages: [
      {
        stageNumber: 1,
        title: 'Bukti A: Satah Cartes Jarak Mengufuk & Mencancang',
        clueSnippet: 'RADAR GPS: Dron ARMS berada di koordinat A(2, 3). Isyarat van penggodam dikesan di koordinat B(8, 7).',
        situation: 'Kira jarak mengufuk (paksi-x) dan jarak mencancang (paksi-y) dari titik A ke titik B.',
        question: 'Berapakah jarak mengufuk dan jarak mencancang di antara dua lokasi tersebut?',
        options: [
          '6 unit mengufuk dan 4 unit mencancang',
          '5 unit mengufuk dan 5 unit mencancang',
          '4 unit mengufuk dan 6 unit mencancang',
          '8 unit mengufuk dan 3 unit mencancang'
        ],
        correctIndex: 0,
        explanation: 'Jarak mengufuk = paksi-x: 8 - 2 = 6 unit. Jarak mencancang = paksi-y: 7 - 3 = 4 unit. Jadi jaraknya 6 unit mengufuk dan 4 unit mencancang.',
        hints: [
          { level: 1, title: 'Kanta Risikan', text: 'Koordinat ialah (x, y). Jarak mengufuk merujuk kepada perbezaan paksi-x. Jarak mencancang merujuk kepada paksi-y.' },
          { level: 2, title: 'Analisis Data', text: 'Mengufuk: 8 tolak 2 = 6 unit. Mencancang: 7 tolak 3 = 4 unit.' },
          { level: 3, title: 'Bongkar Rahsia', text: 'Jawapannya ialah 6 unit mengufuk dan 4 unit mencancang.' }
        ]
      },
      {
        stageNumber: 2,
        title: 'Bukti B: Nisbah Kuantiti Termudah',
        clueSnippet: 'ANALISIS BATERI: Dron terbang sejauh 24 km dan menggunakan 16 liter bateri cecair sejuk.',
        situation: 'Nyatakan nisbah jarak penerbangan (dalam km) kepada penggunaan cecair (dalam liter) dalam bentuk termudah.',
        question: 'Apakah bentuk termudah bagi nisbah 24 : 16 ?',
        options: [
          '2 : 3',
          '3 : 2',
          '4 : 3',
          '6 : 4'
        ],
        correctIndex: 1,
        explanation: '24 : 16 kedua-duanya boleh dibahagi dengan 8 (Faktor Sepunya Terbesar). 24 ÷ 8 = 3, 16 ÷ 8 = 2. Nisbah termudah ialah 3 : 2.',
        hints: [
          { level: 1, title: 'Kanta Risikan', text: 'Cari nombor terbesar yang boleh membahagi tepat kedua-dua 24 dan 16 (sifir 8).' },
          { level: 2, title: 'Analisis Data', text: '24 ÷ 8 = 3. 16 ÷ 8 = 2.' },
          { level: 3, title: 'Bongkar Rahsia', text: 'Nisbah termudah ialah 3 : 2.' }
        ]
      },
      {
        stageNumber: 3,
        title: 'Bukti C: Kadaran Perkadaran Kelajuan (KBAT)',
        clueSnippet: 'KAEDAH KADARAN: Untuk memintas jarak 15 km, dron mengambil masa 12 minit dengan kelajuan malar.',
        situation: 'Berapakah masa yang diambil oleh dron jika van musuh memecut sejauh 35 km?',
        question: 'Kira masa (dalam minit) yang diperlukan untuk perjalanan 35 km:',
        options: [
          '24 minit',
          '28 minit',
          '30 minit',
          '32 minit'
        ],
        correctIndex: 1,
        explanation: 'Gunakan kaedah unitari atau kadaran silang: 15 km = 12 minit (1 km = 12/15 = 4/5 minit = 0.8 minit). Untuk 35 km = 35 × (12/15) = 35 × 0.8 = 28 minit.',
        hints: [
          { level: 1, title: 'Kanta Risikan', text: 'Gunakan perkadaran: (Masa ÷ Jarak) × Jarak Baru, atau cari masa bagi 1 km dahulu.' },
          { level: 2, title: 'Analisis Data', text: '15 km bersamaan 12 minit. Maka 35 km = (12 ÷ 15) × 35. Boleh permudahkan 12/15 menjadi 4/5.' },
          { level: 3, title: 'Bongkar Rahsia', text: '4/5 × 35 = 4 × 7 = 28 minit!' }
        ]
      }
    ],
    vault: {
      prompt: 'Masukkan KOD FREKUENSI RADAR 3-Digit: Digit 1 ialah jarak mengufuk (iaitu 6). Digit 2 ialah nombor pertama nisbah 3 : 2 (iaitu 3). Digit 3 ialah digit terakhir bagi masa 28 minit (iaitu 8).',
      targetCode: '638',
      clueText: 'Jarak mengufuk (6) + Angka pertama nisbah (3) + Digit akhir masa 28 minit (8).'
    }
  },

  {
    id: 'kes-08',
    caseNumber: 8,
    topic: '8. Pengurusan Data & Kebolehjadian',
    title: 'PERTARUNGAN TERAKHIR: Nyahkod The Glitch!',
    subtitle: 'Boss Final: Kebolehjadian peristiwa, carta pai, mod, median, min & julat',
    location: 'Teras Pelayan Utama Gelap Siber (Dark Core HQ)',
    threatLevel: 'KRITIKAL - BOSS BATTLE FINAL',
    isBoss: true,
    badgeReward: {
      id: 'badge-08',
      name: 'Grand Master Detektif ARMS',
      icon: '👑',
      desc: 'Menewaskan The Glitch dan menamatkan ancaman siber matematik negara!'
    },
    story: 'Peringatan Merah! The Glitch telah mengaktifkan Bom Logik di pelayan induk negara. Hanya dengan menganalisis graf data forensik dan menentukan kebolehjadian peristiwa kita dapat mematikan kod bom sebelum terlambat!',
    stages: [
      {
        stageNumber: 1,
        title: 'Bukti A: Istilah Kebolehjadian Peristiwa',
        clueSnippet: 'KOTAK LOGIK PERISTIWA: Penggodam mendakwa: "Sebiji dadu adil dilambung dan akan mendapat nombor 7."',
        situation: 'Dalam satu ujian keselamatan, sebuah dadu adil bernombor 1 hingga 6 dilambung.',
        question: 'Apakah kebolehjadian bagi peristiwa mendapat nombor 7?',
        options: [
          'Pasti',
          'Mustahil',
          'Sama kemungkinan',
          'Besar kemungkinan'
        ],
        correctIndex: 1,
        explanation: 'Sebuah dadu adil hanya mempunyai nombor 1, 2, 3, 4, 5, dan 6. Nombor 7 tidak wujud pada dadu tersebut, maka peristiwa mendapat nombor 7 adalah MUSTAHIL berlaku.',
        hints: [
          { level: 1, title: 'Kanta Risikan', text: 'Kaji nombor-nombor pada dadu biasa (1 hingga 6).' },
          { level: 2, title: 'Analisis Data', text: 'Adakah mungkin mendapat nombor 7 pada dadu yang hanya ada 1 hingga 6?' },
          { level: 3, title: 'Bongkar Rahsia', text: 'Ia tidak akan berlaku sama sekali, jadi kebolehjadiannya ialah MUSTAHIL.' }
        ]
      },
      {
        stageNumber: 2,
        title: 'Bukti B: Analisis Forensik Carta Pai (Peratusan & Kuantiti)',
        clueSnippet: 'CARTA PAI SERANGAN: Jumlah 800 serangan siber. 50% Phishing, 25% Ransomware, 15% Trojan, selebihnya Malware DDoS.',
        situation: 'Berdasarkan carta pai serangan siber di atas, berapakah bilangan serangan sebenar bagi Malware DDoS?',
        question: 'Hitung bilangan serangan Malware DDoS:',
        options: [
          '60 serangan',
          '80 serangan',
          '100 serangan',
          '120 serangan'
        ],
        correctIndex: 1,
        explanation: 'Peratus Malware DDoS = 100% - (50% + 25% + 15%) = 100% - 90% = 10%. Bilangan serangan DDoS = 10% daripada 800 = (10/100) × 800 = 80 serangan.',
        hints: [
          { level: 1, title: 'Kanta Risikan', text: 'Jumlah peratus keseluruhan bulatan carta pai mestilah 100%.' },
          { level: 2, title: 'Analisis Data', text: 'Cari baki peratus DDoS: 100% - (50% + 25% + 15%) = 10%.' },
          { level: 3, title: 'Bongkar Rahsia', text: 'Kira 10% daripada 800 serangan: 0.1 × 800 = 80 serangan.' }
        ]
      },
      {
        stageNumber: 3,
        title: 'Bukti C: Pengiraan Min, Median, Mod & Julat (KBAT Final)',
        clueSnippet: 'SET DATA ANCAMAN: Masa tindak balas keselamatan (dalam saat): 12, 15, 18, 12, 24, 12, 26.',
        situation: 'Untuk menolak kod pemusnah The Glitch, detektif perlu mencari nilai MOD dan MIN bagi set data di atas.',
        question: 'Apakah nilai MOD dan MIN bagi set data masa tersebut?',
        options: [
          'Mod = 12, Min = 17',
          'Mod = 12, Min = 16',
          'Mod = 15, Min = 17',
          'Mod = 18, Min = 16'
        ],
        correctIndex: 0,
        explanation: 'Mod ialah nilai dengan kekerapan tertinggi: 12 muncul 3 kali (Mod = 12). Min = Jumlah data ÷ Bilangan data = (12 + 15 + 18 + 12 + 24 + 12 + 26) ÷ 7 = 119 ÷ 7 = 17 saat.',
        hints: [
          { level: 1, title: 'Kanta Risikan', text: 'Mod = nilai yang paling kerap berulang. Min = jumlah semua nilai dibahagikan dengan bilangan nilai.' },
          { level: 2, title: 'Analisis Data', text: 'Nombor 12 berulang 3 kali (mod = 12). Tambahkan semua nombor: 12+15+18+12+24+12+26 = 119. Bahagi dengan 7 data.' },
          { level: 3, title: 'Bongkar Rahsia', text: '119 ÷ 7 = 17. Jadi Mod = 12 dan Min = 17.' }
        ]
      }
    ],
    vault: {
      prompt: 'NYAHKOD KOD BOM LOGIK BOSS FINAL (3-Digit): Digit 1 ialah huruf pertama perkataan Mustahil dalam nilai abjad (M = huruf ke-13, ambil digit akhir iaitu 3)? Tidak! Kod rasmi ARMS: Digit 1 ialah bilangan serangan DDoS dibahagi 10 (80 ÷ 10 = 8). Digit 2 ialah digit pertama bagi nilai Mod 12 (iaitu 1). Digit 3 ialah digit terakhir bagi nilai Min 17 (iaitu 7).',
      targetCode: '817',
      clueText: 'DDoS ÷ 10 (8) + Digit pertama Mod 12 (1) + Digit terakhir Min 17 (7).'
    }
  }
];
