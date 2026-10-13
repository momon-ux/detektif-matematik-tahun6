// Katalog Blok, Bahan Binaan, Hiasan & Kenderaan untuk Dunia Blok Impian
// Setiap item mempunyai harga XP yang murid perlu perolehi melalui kuiz & mini-game

export const BLOCK_CATEGORIES = [
  { id: 'all', name: 'Semua Item', icon: '✨' },
  { id: 'blocks', name: 'Blok & Dinding', icon: '🧱' },
  { id: 'roofs', name: 'Bumbung & Pintu', icon: '🏠' },
  { id: 'garden', name: 'Halaman & Alam', icon: '🌳' },
  { id: 'furniture', name: 'Perabot & Hiasan', icon: '🛋️' },
  { id: 'vehicles', name: 'Kenderaan Hebat', icon: '🚗' },
];

export const BLOCK_ITEMS = [
  // ==========================================
  // 1. BLOK ASAS & DINDING
  // ==========================================
  {
    id: 'block-wood',
    name: 'Papan Kayu Oak',
    category: 'blocks',
    cost: 15,
    icon: '🪵',
    color: 'bg-amber-800 border-amber-600 text-amber-200',
    desc: 'Kayu hutan oak tahan lasak untuk tiang & lantai rumah.'
  },
  {
    id: 'block-brick',
    name: 'Bata Merah Klasik',
    category: 'blocks',
    cost: 20,
    icon: '🧱',
    color: 'bg-red-900 border-red-600 text-red-200',
    desc: 'Bata merah kukuh untuk membina dinding rumah impian.'
  },
  {
    id: 'block-stone',
    name: 'Batu Istana (Cobblestone)',
    category: 'blocks',
    cost: 25,
    icon: '🪨',
    color: 'bg-stone-700 border-stone-500 text-stone-200',
    desc: 'Batu gunung purba sesuai untuk benteng & asas kukuh.'
  },
  {
    id: 'block-glass',
    name: 'Kaca Kristal Biru',
    category: 'blocks',
    cost: 30,
    icon: '🪟',
    color: 'bg-cyan-900/80 border-cyan-400 text-cyan-200',
    desc: 'Kaca lutsinar moden untuk tingkap pandangan indah.'
  },
  {
    id: 'block-marble',
    name: 'Marmar Putih Diraja',
    category: 'blocks',
    cost: 45,
    icon: '🏛️',
    color: 'bg-slate-200 border-slate-400 text-slate-800',
    desc: 'Lantai marmar mewah berkilau bak istana megah.'
  },
  {
    id: 'block-glowstone',
    name: 'Blok Neon Glowstone',
    category: 'blocks',
    cost: 60,
    icon: '💡',
    color: 'bg-yellow-500 border-yellow-300 text-yellow-950 shadow-[0_0_15px_rgba(234,179,8,0.6)]',
    desc: 'Blok bercahaya kuning neon yang menyinari malam.'
  },
  {
    id: 'block-gold',
    name: 'Blok Emas Murni',
    category: 'blocks',
    cost: 85,
    icon: '🪙',
    color: 'bg-amber-500 border-amber-300 text-amber-950 shadow-[0_0_15px_rgba(245,158,11,0.5)]',
    desc: 'Blok emas padu 916 lambang kekayaan ilmu matematik.'
  },
  {
    id: 'block-diamond',
    name: 'Blok Berlian Biru',
    category: 'blocks',
    cost: 130,
    icon: '💎',
    color: 'bg-sky-400 border-sky-200 text-sky-950 shadow-[0_0_20px_rgba(56,189,248,0.7)]',
    desc: 'Blok berlian paling bernilai dan tahan lasak di dunia.'
  },
  {
    id: 'block-obsidian',
    name: 'Blok Obsidia Gelap',
    category: 'blocks',
    cost: 160,
    icon: '🔮',
    color: 'bg-purple-950 border-purple-600 text-purple-200 shadow-[0_0_15px_rgba(168,85,247,0.4)]',
    desc: 'Batu gunung berapi ungu pekat kalis sebarang letupan.'
  },

  // ==========================================
  // 2. BUMBUNG & SENIBINA
  // ==========================================
  {
    id: 'roof-red',
    name: 'Bumbung Genting Merah',
    category: 'roofs',
    cost: 35,
    icon: '🛖',
    color: 'bg-rose-900 border-rose-600 text-rose-200',
    desc: 'Bumbung genting merah tradisional yang teduh.'
  },
  {
    id: 'roof-blue',
    name: 'Bumbung Moden Biru',
    category: 'roofs',
    cost: 45,
    icon: '🏠',
    color: 'bg-blue-900 border-blue-500 text-blue-200',
    desc: 'Bumbung seni bina moden kalis cuaca tropika.'
  },
  {
    id: 'roof-golden-dome',
    name: 'Kubah Menara Emas',
    category: 'roofs',
    cost: 110,
    icon: '🕌',
    color: 'bg-yellow-600 border-yellow-400 text-yellow-100',
    desc: 'Kubah emas tersergam indah di puncak bangunan.'
  },
  {
    id: 'door-wood',
    name: 'Pintu Kayu Solid',
    category: 'roofs',
    cost: 25,
    icon: '🚪',
    color: 'bg-amber-900 border-amber-700 text-amber-200',
    desc: 'Pintu masuk kayu jati yang selamat dan mesra tetamu.'
  },
  {
    id: 'door-gate',
    name: 'Pintu Gerbang Sakura',
    category: 'roofs',
    cost: 75,
    icon: '⛩️',
    color: 'bg-red-800 border-red-500 text-red-100',
    desc: 'Gerbang selamat datang ala Torii taman Jepun.'
  },
  {
    id: 'decor-chimney',
    name: 'Cerobong Asap Asli',
    category: 'roofs',
    cost: 50,
    icon: '🏭',
    color: 'bg-slate-700 border-slate-500 text-slate-200',
    desc: 'Cerobong asap bata untuk pendiangan rumah sejuk.'
  },

  // ==========================================
  // 3. HALAMAN & ALAM SEMULA JADI
  // ==========================================
  {
    id: 'nature-flowers',
    name: 'Taman Bunga Ros & Tulip',
    category: 'garden',
    cost: 15,
    icon: '🌸',
    color: 'bg-pink-900/60 border-pink-500 text-pink-200',
    desc: 'Bunga segar yang mewangikan kawasan halaman.'
  },
  {
    id: 'nature-sakura',
    name: 'Pokok Sakura Merah Jambu',
    category: 'garden',
    cost: 55,
    icon: '🌸🌳',
    color: 'bg-fuchsia-900/70 border-fuchsia-400 text-fuchsia-200',
    desc: 'Pokok sakura berkembang mekar dengan kelopak gugur.'
  },
  {
    id: 'nature-pine',
    name: 'Pokok Pine Salji',
    category: 'garden',
    cost: 45,
    icon: '🌲',
    color: 'bg-emerald-900/80 border-emerald-500 text-emerald-200',
    desc: 'Pokok malar hijau yang tinggi menghiasi taman.'
  },
  {
    id: 'nature-palm',
    name: 'Pokok Kelapa Pantai',
    category: 'garden',
    cost: 40,
    icon: '🌴',
    color: 'bg-teal-900/80 border-teal-500 text-teal-200',
    desc: 'Pokok kelapa teduh sesuai untuk suasana tepi kolam.'
  },
  {
    id: 'nature-pond',
    name: 'Kolam Air Ikan Koi',
    category: 'garden',
    cost: 70,
    icon: '🌊',
    color: 'bg-blue-900/80 border-blue-400 text-blue-200',
    desc: 'Kolam air jernih dengan ikan koi berenang riang.'
  },
  {
    id: 'nature-fountain',
    name: 'Air Pancut Marmar',
    category: 'garden',
    cost: 110,
    icon: '⛲',
    color: 'bg-cyan-900/80 border-cyan-400 text-cyan-200',
    desc: 'Air pancut berirama megah di tengah-tengah halaman.'
  },
  {
    id: 'nature-fence',
    name: 'Pagar Kayu Putih',
    category: 'garden',
    cost: 20,
    icon: '🪵',
    color: 'bg-slate-800 border-slate-600 text-slate-200',
    desc: 'Pagar keselamatan comel untuk melindungi rumah.'
  },
  {
    id: 'nature-lamp',
    name: 'Lampu Tanglung Taman',
    category: 'garden',
    cost: 30,
    icon: '🏮',
    color: 'bg-orange-950 border-orange-500 text-orange-200',
    desc: 'Tanglung merah menyala menceriakan laluan pejalan kaki.'
  },
  {
    id: 'nature-campfire',
    name: 'Unggun Api Unggunan',
    category: 'garden',
    cost: 35,
    icon: '🔥',
    color: 'bg-amber-950 border-amber-500 text-amber-200',
    desc: 'Unggun api hangat untuk berkumpul bersama rakan sekelas.'
  },

  // ==========================================
  // 4. PERABOT & HIASAN
  // ==========================================
  {
    id: 'item-bed',
    name: 'Katil Gamer Cyber LED',
    category: 'furniture',
    cost: 60,
    icon: '🛏️',
    color: 'bg-indigo-950 border-indigo-500 text-indigo-200',
    desc: 'Katil empuk dengan pencahayaan neon untuk berehat.'
  },
  {
    id: 'item-computer',
    name: 'Meja Belajar & PC Gaming',
    category: 'furniture',
    cost: 75,
    icon: '💻',
    color: 'bg-cyan-950 border-cyan-500 text-cyan-200',
    desc: 'Stesen komputer canggih untuk menyiasat kod matematik.'
  },
  {
    id: 'item-chest',
    name: 'Peti Harta Karun (Chest)',
    category: 'furniture',
    cost: 80,
    icon: '🧰',
    color: 'bg-amber-950 border-amber-600 text-amber-200',
    desc: 'Peti rahsia untuk menyimpan trofi & rekod kemenangan.'
  },
  {
    id: 'item-bookshelf',
    name: 'Rak Buku Menara Ilmu',
    category: 'furniture',
    cost: 45,
    icon: '📚',
    color: 'bg-stone-900 border-stone-600 text-stone-200',
    desc: 'Koleksi ensiklopedia matematik dan nota formula bijak.'
  },
  {
    id: 'item-telescope',
    name: 'Teleskop Cerap Bintang',
    category: 'furniture',
    cost: 95,
    icon: '🔭',
    color: 'bg-blue-950 border-blue-500 text-blue-200',
    desc: 'Teleskop canggih untuk mencerap buruj & galaksi angkasa.'
  },
  {
    id: 'item-sofa',
    name: 'Sofa Santai Baldu',
    category: 'furniture',
    cost: 50,
    icon: '🛋️',
    color: 'bg-purple-950 border-purple-500 text-purple-200',
    desc: 'Sofa lembut dan selesa untuk melayan tetamu datang.'
  },
  {
    id: 'item-tv',
    name: 'Smart TV 4K OLED',
    category: 'furniture',
    cost: 85,
    icon: '📺',
    color: 'bg-slate-900 border-slate-600 text-slate-200',
    desc: 'Televisyen skrin gergasi untuk menonton siaran sains.'
  },
  {
    id: 'item-flag',
    name: 'Jalur Gemilang Kebanggaan',
    category: 'furniture',
    cost: 40,
    icon: '🇲🇾',
    color: 'bg-red-950 border-red-500 text-white',
    desc: 'Bendera Malaysia berkibar megah di halaman rumah.'
  },

  // ==========================================
  // 5. KENDERAAN HEBAT (VEHICLES)
  // ==========================================
  {
    id: 'veh-bicycle',
    name: 'Basikal Gunung Lasak',
    category: 'vehicles',
    cost: 75,
    icon: '🚲',
    color: 'bg-emerald-950 border-emerald-500 text-emerald-200',
    desc: 'Basikal pantas untuk meronda sekitar kawasan lapangan.'
  },
  {
    id: 'veh-scooter',
    name: 'Skuter Elektrik Neon',
    category: 'vehicles',
    cost: 100,
    icon: '🛴',
    color: 'bg-cyan-950 border-cyan-500 text-cyan-200',
    desc: 'Skuter bateri mesra alam untuk pergerakan pantas.'
  },
  {
    id: 'veh-sportscar',
    name: 'Kereta Sport Merah Laju',
    category: 'vehicles',
    cost: 260,
    icon: '🏎️',
    color: 'bg-red-950 border-red-500 text-red-200',
    desc: 'Kereta lumba berkuasa turbo berderum di hadapan garaj!'
  },
  {
    id: 'veh-police',
    name: 'Kereta Peronda Detektif',
    category: 'vehicles',
    cost: 290,
    icon: '🚓',
    color: 'bg-blue-950 border-blue-500 text-blue-200',
    desc: 'Kenderaan rasmi skuad ARMS lengkap dengan siren berlampu.'
  },
  {
    id: 'veh-tractor',
    name: 'Traktor Kebun Kuat',
    category: 'vehicles',
    cost: 210,
    icon: '🚜',
    color: 'bg-amber-950 border-amber-500 text-amber-200',
    desc: 'Traktor lasak untuk menggembur tanah dan meratakan padang.'
  },
  {
    id: 'veh-boat',
    name: 'Bot Laju Tasik',
    category: 'vehicles',
    cost: 230,
    icon: '🚤',
    color: 'bg-sky-950 border-sky-500 text-sky-200',
    desc: 'Bot laju berkembar enjin untuk meredah tasik taman.'
  },
  {
    id: 'veh-heli',
    name: 'Helikopter Penyelamat ARMS',
    category: 'vehicles',
    cost: 450,
    icon: '🚁',
    color: 'bg-orange-950 border-orange-500 text-orange-200',
    desc: 'Helikopter mendarat di atas helipad bumbung rumah!'
  },
  {
    id: 'veh-jet',
    name: 'Jet Pejuang Supersonik',
    category: 'vehicles',
    cost: 650,
    icon: '✈️',
    color: 'bg-indigo-950 border-indigo-500 text-indigo-200',
    desc: 'Pesawat jet pantas membelah awan dengan kelajuan cahaya.'
  },
  {
    id: 'veh-ufo',
    name: 'Hovercraft Graviti Sifar',
    category: 'vehicles',
    cost: 550,
    icon: '🛸',
    color: 'bg-purple-950 border-purple-500 text-purple-200',
    desc: 'Kenderaan terapung futuristik tanpa tayar meluncur senyap.'
  },
  {
    id: 'veh-rocket',
    name: 'Roket Angkasa Lepas ARMS',
    category: 'vehicles',
    cost: 1000,
    icon: '🚀',
    color: 'bg-rose-950 border-rose-500 text-rose-200 shadow-[0_0_25px_rgba(244,63,94,0.6)]',
    desc: 'Karya agung terhebat! Roket angkasa meluncur ke Marikh.'
  },
];

// Helper to look up an item by ID
export function getBlockItem(id) {
  return BLOCK_ITEMS.find(item => item.id === id) || null;
}
