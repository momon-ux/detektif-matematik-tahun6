import React, { useState } from 'react';
import { X, BookOpen, Search, BookmarkCheck, ChevronRight } from 'lucide-react';
import { sound } from '../utils/sound';

const TOPIC_NOTES = [
  {
    id: 1,
    title: '1. Nombor Bulat & Operasi Asas',
    icon: '🔢',
    color: 'border-cyan-500/50 text-cyan-400',
    content: (
      <div className="space-y-4 text-xs sm:text-sm text-slate-300">
        <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
          <p className="font-bold text-cyan-300">📌 Pecahan Juta & Perpuluhan Juta:</p>
          <ul className="list-disc list-inside space-y-1 text-slate-300">
            <li><code className="text-cyan-400">1/4 juta</code> = 250,000 (0.25 juta)</li>
            <li><code className="text-cyan-400">1/2 juta</code> = 500,000 (0.5 juta)</li>
            <li><code className="text-cyan-400">3/4 juta</code> = 750,000 (0.75 juta)</li>
            <li><code className="text-cyan-400">1/5 juta</code> = 200,000 (0.2 juta)</li>
            <li><code className="text-cyan-400">1/8 juta</code> = 125,000 (0.125 juta)</li>
          </ul>
        </div>

        <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
          <p className="font-bold text-cyan-300">📌 Nombor Perdana (Lingkungan 100):</p>
          <p className="text-slate-400">Nombor yang hanya boleh dibahagi dengan 1 dan dirinya sendiri (25 nombor):</p>
          <p className="font-tech text-amber-300 font-semibold">
            2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97.
          </p>
          <p className="text-[11px] text-slate-500">*Nombor 2 ialah satu-satunya nombor genap yang merupakan nombor perdana!</p>
        </div>

        <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
          <p className="font-bold text-cyan-300">📌 Tertib Operasi (BODMAS / KUBADURAT):</p>
          <p>1. Tanda Kurung <code>( )</code> → 2. Darab <code>×</code> atau Bahagi <code>÷</code> (kiri ke kanan) → 3. Tambah <code>+</code> atau Tolak <code>-</code> (kiri ke kanan).</p>
        </div>
      </div>
    )
  },

  {
    id: 2,
    title: '2. Pecahan, Perpuluhan & Peratus',
    icon: '🥧',
    color: 'border-emerald-500/50 text-emerald-400',
    content: (
      <div className="space-y-4 text-xs sm:text-sm text-slate-300">
        <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
          <p className="font-bold text-emerald-300">📌 Pendaraban Pecahan:</p>
          <p>Tukarkan nombor bercampur kepada pecahan tak wajar: <code>2 1/2 = 5/2</code>.</p>
          <p>Darab: <code>(Pengangka × Pengangka) ÷ (Penyebut × Penyebut)</code>. Kemudian permudahkan ke bentuk termudah.</p>
        </div>

        <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
          <p className="font-bold text-emerald-300">📌 Operasi Perpuluhan & Peratus:</p>
          <p>Penambahan/Penolakan Perpuluhan: Susun titik perpuluhan dalam satu lajur menegak lurus.</p>
          <p>Mencari Nilai Peratus: <code>(Peratus ÷ 100) × Jumlah Nilai</code>.</p>
        </div>
      </div>
    )
  },

  {
    id: 3,
    title: '3. Wang & Celik Kewangan',
    icon: '💰',
    color: 'border-amber-500/50 text-amber-400',
    content: (
      <div className="space-y-4 text-xs sm:text-sm text-slate-300">
        <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
          <p className="font-bold text-amber-300">📌 Faedah Mudah, Kompaun & Dividen:</p>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Faedah Mudah:</strong> Ganjaran wang simpanan pokok mengikut peratusan setahun.</li>
            <li><strong>Dividen:</strong> Sebahagian keuntungan syarikat/amanah saham yang diagihkan kepada pelabur.</li>
            <li><code>Faedah/Dividen = Wang Pokok × Kadar Peratus × Masa (tahun)</code></li>
          </ul>
        </div>

        <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
          <p className="font-bold text-amber-300">📌 Aset Lawan Liabiliti:</p>
          <div className="grid grid-cols-2 gap-2 text-xs pt-1">
            <div className="p-2 rounded bg-slate-900 border border-emerald-900/60">
              <strong className="text-emerald-400">ASET (Bernilai Positif):</strong>
              <p>Wang simpanan, emas, rumah kediaman, pelaburan saham.</p>
            </div>
            <div className="p-2 rounded bg-slate-900 border border-rose-900/60">
              <strong className="text-rose-400">LIABILITI (Tanggungan Hutang):</strong>
              <p>Baki pinjaman bank, hutang kad kredit, pinjaman kereta.</p>
            </div>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
          <p className="font-bold text-amber-300">📌 Cukai Perkhidmatan (Service Tax):</p>
          <p>Cukai yang dikenakan oleh kerajaan ke atas perkhidmatan tertentu (cth: 6% atau 8%).</p>
          <p><code>Jumlah Bayaran = Harga Asal + Nilai Cukai</code>.</p>
        </div>
      </div>
    )
  },

  {
    id: 4,
    title: '4. Masa & Waktu',
    icon: '⏰',
    color: 'border-blue-500/50 text-blue-400',
    content: (
      <div className="space-y-4 text-xs sm:text-sm text-slate-300">
        <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
          <p className="font-bold text-blue-300">📌 Sistem 24 Jam & Zon Masa Dunia:</p>
          <p>Jam 0000 (12:00 tengah malam) hingga Jam 2359 (11:59 malam).</p>
          <ul className="list-disc list-inside space-y-1 pt-1">
            <li><strong>Kuala Lumpur (Malaysia):</strong> UTC +8</li>
            <li><strong>London (UK):</strong> UTC +0 (Lewat 8 jam di belakang KL)</li>
            <li><strong>Tokyo (Jepun):</strong> UTC +9 (Awal 1 jam di hadapan KL)</li>
          </ul>
        </div>

        <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
          <p className="font-bold text-blue-300">📌 Menghitung Waktu Ketibaan Merentas Zon:</p>
          <p>1. Tukar waktu berlepas ke waktu tempatan destinasi (tambah/tolak beza zon masa).</p>
          <p>2. Tambahkan tempoh perjalanan penerbangan.</p>
        </div>
      </div>
    )
  },

  {
    id: 5,
    title: '5. Ukuran & Sukatan',
    icon: '📏',
    color: 'border-purple-500/50 text-purple-400',
    content: (
      <div className="space-y-4 text-xs sm:text-sm text-slate-300">
        <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
          <p className="font-bold text-purple-300">📌 Pertukaran Unit Metrik Utama:</p>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Panjang:</strong> 1 km = 1,000 m | 1 m = 100 cm | 1 cm = 10 mm</li>
            <li><strong>Jisim:</strong> 1 kg = 1,000 g</li>
            <li><strong>Isi Padu Cecair:</strong> 1 liter (ℓ) = 1,000 mililiter (mℓ)</li>
          </ul>
        </div>
        <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
          <p className="font-bold text-purple-300">📌 Petua Pantas:</p>
          <p>Daripada unit besar ke unit kecil: <strong>DARAB (×)</strong>.</p>
          <p>Daripada unit kecil ke unit besar: <strong>BAHAGI (÷)</strong>.</p>
        </div>
      </div>
    )
  },

  {
    id: 6,
    title: '6. Ruang & Geometri',
    icon: '📐',
    color: 'border-teal-500/50 text-teal-400',
    content: (
      <div className="space-y-4 text-xs sm:text-sm text-slate-300">
        <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
          <p className="font-bold text-teal-300">📌 Sudut Pedalaman Poligon Sekata:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Segi tiga sama sisi: <code>180° ÷ 3 = 60°</code></li>
            <li>Segi empat sama: <code>360° ÷ 4 = 90°</code> (sudut tegak)</li>
            <li>Pentagon sekata: <code>540° ÷ 5 = 108°</code></li>
            <li>Heksagon sekata: <code>720° ÷ 6 = 120°</code></li>
          </ul>
        </div>

        <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
          <p className="font-bold text-teal-300">📌 Formula Luas & Isi Padu Gabungan:</p>
          <p>• <strong>Luas Segi Tiga:</strong> <code>1/2 × Tapak × Tinggi</code></p>
          <p>• <strong>Luas Segi Empat:</strong> <code>Panjang × Lebar</code></p>
          <p>• <strong>Isi Padu Kubus / Kuboid:</strong> <code>Panjang × Lebar × Tinggi</code></p>
        </div>
      </div>
    )
  },

  {
    id: 7,
    title: '7. Koordinat, Nisbah & Kadaran',
    icon: '🎯',
    color: 'border-orange-500/50 text-orange-400',
    content: (
      <div className="space-y-4 text-xs sm:text-sm text-slate-300">
        <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
          <p className="font-bold text-orange-300">📌 Satah Cartes:</p>
          <p>Format koordinat: <code>(x, y)</code>. Nilai pertama ialah paksi-x (mengufuk), nilai kedua paksi-y (mencancang).</p>
          <p>Jarak mengufuk = Beza paksi-x | Jarak mencancang = Beza paksi-y.</p>
        </div>

        <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
          <p className="font-bold text-orange-300">📌 Nisbah & Kadaran:</p>
          <p>Nisbah ditulis <code>m : n</code> (tiada unit). Permudahkan dengan membahagikan faktor sepunya terbesar.</p>
          <p>Kadaran: Gunakan kaedah unitari (kira nilai bagi 1 unit dahulu).</p>
        </div>
      </div>
    )
  },

  {
    id: 8,
    title: '8. Pengurusan Data & Kebolehjadian',
    icon: '📊',
    color: 'border-rose-500/50 text-rose-400',
    content: (
      <div className="space-y-4 text-xs sm:text-sm text-slate-300">
        <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
          <p className="font-bold text-rose-300">📌 Istilah Kebolehjadian Peristiwa:</p>
          <ul className="list-disc list-inside space-y-1">
            <li><strong className="text-emerald-400">Pasti:</strong> Peristiwa yang dijamin 100% berlaku (cth: matahari terbit dari timur).</li>
            <li><strong className="text-blue-400">Besar Kemungkinan:</strong> Peluang berlaku sangat tinggi.</li>
            <li><strong className="text-amber-400">Sama Kemungkinan:</strong> Peluang 50%-50% (cth: lambung syiling dapat gambar atau nombor).</li>
            <li><strong className="text-orange-400">Kecil Kemungkinan:</strong> Peluang berlaku amat rendah.</li>
            <li><strong className="text-rose-400">Mustahil:</strong> Perkara yang tidak mungkin berlaku (cth: lambung dadu dapat nombor 9).</li>
          </ul>
        </div>

        <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
          <p className="font-bold text-rose-300">📌 Statistik Asas (Mod, Median, Min, Julat):</p>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Mod:</strong> Nilai dengan kekerapan paling tinggi.</li>
            <li><strong>Median:</strong> Nilai yang berada di tengah-tengah selepas susunan menaik/menurun.</li>
            <li><strong>Min (Purata):</strong> <code>Jumlah semua nilai ÷ Bilangan data</code>.</li>
            <li><strong>Julat:</strong> <code>Nilai maksimum - Nilai minimum</code>.</li>
          </ul>
        </div>
      </div>
    )
  }
];

export default function DossierGuide({ onClose }) {
  const [activeTopic, setActiveTopic] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const currentNote = TOPIC_NOTES.find(t => t.id === activeTopic) || TOPIC_NOTES[0];

  const filteredTopics = TOPIC_NOTES.filter(t => 
    t.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-cyan-800/60 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Modal Top Header */}
        <div className="p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-cyber font-bold text-base text-white">
                BUKU NOTA FORMULA DETEKTIF SIBER
              </h3>
              <p className="text-xs text-slate-400 font-tech">
                PANDUAN LENGKAP SILIBUS MATEMATIK TAHUN 6 (KSSR SEMAKAN)
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Topic Selector */}
        <div className="grid grid-cols-1 md:grid-cols-3 flex-1 overflow-hidden">
          
          {/* Left Topic Sidebar */}
          <div className="border-r border-slate-800 bg-slate-950/60 p-4 space-y-3 overflow-y-auto max-h-[300px] md:max-h-none">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Cari topik..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="space-y-1.5">
              {filteredTopics.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    sound.playClick();
                    setActiveTopic(item.id);
                  }}
                  className={`w-full p-2.5 rounded-xl text-left text-xs font-semibold flex items-center justify-between transition-all ${
                    activeTopic === item.id
                      ? 'bg-cyan-950/80 border border-cyan-500/50 text-cyan-200 shadow-md'
                      : 'bg-slate-900/40 hover:bg-slate-900 border border-transparent text-slate-400'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span>{item.icon}</span>
                    <span className="truncate">{item.title}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-50 shrink-0" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Notes Content */}
          <div className="md:col-span-2 p-6 overflow-y-auto space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
              <span className="text-2xl">{currentNote.icon}</span>
              <div>
                <h4 className="font-cyber font-bold text-lg text-white">
                  {currentNote.title}
                </h4>
                <span className="text-xs font-tech text-cyan-400">
                  NOTA PADAT & FORMULA PENTING
                </span>
              </div>
            </div>

            {currentNote.content}
          </div>

        </div>

        {/* Modal Bottom Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p className="text-[11px] font-tech text-slate-400">
            DSKP KSSR SEMAKAN TERKINI • PEMBANGUN SISTEM: <strong className="text-cyan-400">MOHAMMAD FIKREY BIN ABDUL GAPAR</strong>
          </p>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-cyber font-semibold text-slate-200"
          >
            Tutup Buku Panduan
          </button>
        </div>

      </div>
    </div>
  );
}
