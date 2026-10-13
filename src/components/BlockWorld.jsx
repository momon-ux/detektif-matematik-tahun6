import React, { useState } from 'react';
import { 
  ArrowLeft, Home, ShoppingCart, Hammer, Pickaxe, Trash2, 
  Sparkles, Award, Star, Zap, Eye, RotateCcw, Plus, Check, AlertCircle,
  Car, Trees, Shield, Volume2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/sound';
import { 
  BLOCK_ITEMS, BLOCK_CATEGORIES, getBlockItem 
} from '../data/blockItems';
import { 
  buyBlockItem, placeBlockInWorld, removeBlockFromWorld, 
  clearWorldGrid, DEVELOPER_NAME, DEVELOPER_TITLE, getRank, AVATARS
} from '../utils/storage';

const GRID_SIZE = 12; // 12x12 = 144 grass plots

export default function BlockWorld({
  profile,
  onUpdateProfile,
  onBack,
  onNavigateQuest,
  onNavigateShooter,
  onNavigateRoda
}) {
  const [selectedTool, setSelectedTool] = useState('build'); // 'build' | 'remove'
  const [activeItemId, setActiveItemId] = useState('block-wood');
  const [showShop, setShowShop] = useState(false);
  const [shopCategory, setShopCategory] = useState('all');
  const [showShowcase, setShowShowcase] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const inventory = profile.inventory || {};
  const worldGrid = profile.worldGrid || {};
  const currentRank = getRank(profile.xp);
  const currentAvatar = AVATARS.find(a => a.id === profile.avatarId) || AVATARS[0];

  const totalBlocksPlaced = Object.keys(worldGrid).length;
  const totalWorldValue = Object.values(worldGrid).reduce((acc, itemId) => {
    const item = getBlockItem(itemId);
    return acc + (item ? item.cost : 0);
  }, 0);

  const showToast = (msg, isError = false) => {
    setToastMessage({ text: msg, isError });
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Handle click on grass plot
  const handleCellClick = (x, y) => {
    const coordKey = `${x},${y}`;
    const existing = worldGrid[coordKey];

    if (selectedTool === 'remove') {
      if (!existing) {
        sound.playWrong();
        showToast('Petak ini sudah kosong!', true);
        return;
      }
      sound.playClick();
      const res = removeBlockFromWorld(profile, coordKey);
      if (res.success) {
        onUpdateProfile(res.profile);
        showToast(`Blok berjaya dikembalikan ke inventori.`);
      }
    } else {
      // Build tool
      const itemDef = getBlockItem(activeItemId);
      if (!itemDef) return;

      const qty = inventory[activeItemId] || 0;
      if (qty <= 0) {
        sound.playWrong();
        showToast(`Tiada stok ${itemDef.name}! Sila beli di Kedai Blok.`, true);
        return;
      }

      sound.playKeypad();
      const res = placeBlockInWorld(profile, coordKey, activeItemId);
      if (res.success) {
        onUpdateProfile(res.profile);
      } else {
        showToast(res.reason, true);
      }
    }
  };

  // Buy item with XP
  const handleBuy = (item, qty = 1) => {
    const totalCost = item.cost * qty;
    if ((profile.xp || 0) < totalCost) {
      sound.playWrong();
      showToast(`XP tidak mencukupi! Anda perlukan ${totalCost} XP. Jawab soalan untuk kumpul XP!`, true);
      return;
    }

    sound.playSuccess();
    const res = buyBlockItem(profile, item.id, item.cost, qty);
    if (res.success) {
      onUpdateProfile(res.profile);
      setActiveItemId(item.id);
      showToast(`Berjaya membeli ${qty}x ${item.name}!`);
      confetti({
        particleCount: 25,
        spread: 60,
        origin: { y: 0.8 }
      });
    }
  };

  // Clear all
  const handleClearAll = () => {
    if (totalBlocksPlaced === 0) return;
    if (window.confirm('Adakah anda pasti mahu membersihkan seluruh lapangan rumput? Semua blok akan dikembalikan ke dalam inventori.')) {
      sound.playClick();
      const updated = clearWorldGrid(profile);
      onUpdateProfile(updated);
      showToast('Seluruh lapangan rumput telah dibersihkan!');
    }
  };

  // Filtered shop items
  const filteredShopItems = shopCategory === 'all'
    ? BLOCK_ITEMS
    : BLOCK_ITEMS.filter(it => it.category === shopCategory);

  return (
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-6 py-4 space-y-4">
      
      {/* ======================================================== */}
      {/* 1. TOP TACTICAL HUD & DUAL NAV BUTTONS                   */}
      {/* ======================================================== */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 sm:p-4 rounded-2xl bg-slate-900/90 border border-emerald-600/50 shadow-xl backdrop-blur-md">
        
        {/* Navigation Buttons: KEMBALI & LAMAN UTAMA */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              sound.playClick();
              onBack();
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-cyber font-bold text-slate-200 border border-slate-700 transition-all shadow active:scale-95"
            title="Kembali"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>KEMBALI</span>
          </button>
          <button
            onClick={() => {
              sound.playClick();
              onBack();
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-xs font-cyber font-bold text-white border border-emerald-400/60 transition-all shadow-md shadow-emerald-950 active:scale-95"
            title="Ke Laman Utama"
          >
            <Home className="w-3.5 h-3.5" />
            <span>LAMAN UTAMA</span>
          </button>
        </div>

        {/* Builder Profile Info */}
        <div className="flex items-center gap-2.5 bg-slate-950/80 px-3.5 py-1.5 rounded-xl border border-slate-800">
          <span className="text-2xl" title={currentAvatar.name}>{currentAvatar.emoji}</span>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-cyber font-bold text-white">{profile.agentName}</span>
              <span className="text-[10px] font-tech text-amber-300 px-1.5 py-0.2 rounded bg-amber-950/80 border border-amber-500/40 font-bold">
                {profile.selectedGrade || 'Tahun 6'} • {profile.studentClass}
              </span>
            </div>
            <p className="text-[10px] font-tech text-slate-400">
              Arkitek: <span className="text-emerald-400 font-bold">{currentAvatar.name}</span>
            </p>
          </div>
        </div>

        {/* Live Economy: XP Wallet & World Valuation */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-950/80 to-slate-950 border border-amber-500/60 shadow-md">
            <Zap className="w-4 h-4 text-amber-400 animate-pulse" />
            <div className="text-right">
              <p className="text-[9px] font-tech text-amber-300 uppercase leading-none">Baki XP</p>
              <p className="text-sm font-cyber font-extrabold text-white">{profile.xp} <span className="text-[10px] text-amber-400">XP</span></p>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-950/80 to-slate-950 border border-emerald-500/60 shadow-md">
            <Award className="w-4 h-4 text-emerald-400" />
            <div className="text-right">
              <p className="text-[9px] font-tech text-emerald-300 uppercase leading-none">Nilai Dunia</p>
              <p className="text-sm font-cyber font-extrabold text-white">{totalWorldValue} <span className="text-[10px] text-emerald-400">XP</span></p>
            </div>
          </div>
        </div>

      </div>

      {/* ======================================================== */}
      {/* TOAST ALERT NOTIFICATION                                 */}
      {/* ======================================================== */}
      {toastMessage && (
        <div className={`p-2.5 rounded-xl text-xs font-cyber font-bold flex items-center justify-center gap-2 shadow-lg transition-all animate-bounce ${
          toastMessage.isError 
            ? 'bg-rose-950 border border-rose-500 text-rose-200' 
            : 'bg-emerald-950 border border-emerald-500 text-emerald-200'
        }`}>
          {toastMessage.isError ? <AlertCircle className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. MAIN TOOLBAR & CONTROLS RIBBON                        */}
      {/* ======================================================== */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
        
        {/* Tools Selector: Hammer vs Pickaxe */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => { sound.playClick(); setSelectedTool('build'); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-cyber font-bold transition-all ${
              selectedTool === 'build'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Hammer className="w-3.5 h-3.5" />
            <span>TUKUL BINA</span>
          </button>

          <button
            onClick={() => { sound.playClick(); setSelectedTool('remove'); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-cyber font-bold transition-all ${
              selectedTool === 'remove'
                ? 'bg-gradient-to-r from-rose-600 to-amber-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Pickaxe className="w-3.5 h-3.5" />
            <span>CANGKUL / ALIH</span>
          </button>
        </div>

        {/* Action Buttons: Kedai Blok, Papar Rumah, Bersihkan */}
        <div className="flex items-center gap-2 ml-auto">
          
          {/* Kedai Blok Modal Trigger */}
          <button
            onClick={() => { sound.playClick(); setShowShop(true); }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white text-xs font-cyber font-bold shadow-md shadow-amber-950 active:scale-95"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>KEDAI BLOK & ITEM</span>
          </button>

          {/* Cari XP Quick Shortcut */}
          <button
            onClick={() => { sound.playClick(); onNavigateQuest(); }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-cyber font-bold shadow-md shadow-cyan-950 active:scale-95"
            title="Kumpul XP di Kembara Quest"
          >
            <Zap className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">KUMPUL XP QUEST</span>
          </button>

          {/* Papar Rumah Impian */}
          <button
            onClick={() => { sound.playClick(); setShowShowcase(true); }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-950 hover:bg-indigo-900 border border-indigo-500/50 text-indigo-300 text-xs font-cyber font-bold shadow-md active:scale-95"
            title="Lihat Sijil & Potret Dunia"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">TAYANG DUNIA</span>
          </button>

          {/* Bersihkan Padang */}
          <button
            onClick={handleClearAll}
            className="p-1.5 rounded-xl bg-slate-950 hover:bg-rose-950/60 border border-slate-800 hover:border-rose-600/50 text-slate-400 hover:text-rose-400 transition-colors"
            title="Kosongkan Lapangan Rumput"
          >
            <Trash2 className="w-4 h-4" />
          </button>

        </div>

      </div>

      {/* ======================================================== */}
      {/* 3. ACTIVE ITEM HOTBAR (Inventori di Tangan)              */}
      {/* ======================================================== */}
      <div className="bg-slate-900/90 rounded-2xl p-3 border border-slate-800 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-cyber font-bold text-slate-300 flex items-center gap-1.5">
            <span>🎒 BEG INVENTORI SAYA:</span>
            <span className="text-[10px] font-tech text-emerald-400">(Klik untuk pegang di tangan)</span>
          </span>
          <span className="text-slate-400 font-tech">
            {totalBlocksPlaced} / {GRID_SIZE * GRID_SIZE} petak terpasang
          </span>
        </div>

        {/* Horizontal Scrollable Inventory Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1.5 pt-1 scrollbar-thin">
          {BLOCK_ITEMS.map(item => {
            const qty = inventory[item.id] || 0;
            const isSelected = activeItemId === item.id;
            if (qty === 0 && !isSelected) return null; // Show only owned or currently active

            return (
              <button
                key={item.id}
                onClick={() => {
                  sound.playClick();
                  setActiveItemId(item.id);
                  setSelectedTool('build');
                }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border shrink-0 transition-all ${
                  isSelected && selectedTool === 'build'
                    ? 'bg-emerald-950/90 border-emerald-400 text-white ring-2 ring-emerald-400/50 scale-105'
                    : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <div className="text-left">
                  <p className="text-[11px] font-cyber font-bold truncate max-w-[90px]">{item.name}</p>
                  <p className="text-[10px] font-tech text-emerald-400 font-bold">x{qty} unit</p>
                </div>
              </button>
            );
          })}

          {/* Quick Buy Plus Button */}
          <button
            onClick={() => { sound.playClick(); setShowShop(true); }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-dashed border-amber-500/50 bg-amber-950/30 hover:bg-amber-950/60 text-amber-300 text-xs font-cyber font-bold shrink-0 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>BELI LAGI</span>
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 4. THE 12x12 GRASS FIELD CANVAS (Interactive Sandbox)    */}
      {/* ======================================================== */}
      <div className="rounded-3xl bg-gradient-to-b from-emerald-950/40 via-slate-950 to-slate-950 border-2 border-emerald-500/40 p-3 sm:p-5 shadow-2xl overflow-x-auto flex flex-col items-center">
        
        {/* Field Banner */}
        <div className="flex items-center justify-between w-full max-w-2xl mb-3 text-xs font-tech text-slate-400">
          <span className="flex items-center gap-1.5 text-emerald-400 font-bold font-cyber">
            <span>🌿 LAPANGAN RUMPUT HIJAU ({GRID_SIZE} × {GRID_SIZE})</span>
          </span>
          <span>Mod: <strong className={selectedTool === 'build' ? 'text-emerald-400' : 'text-rose-400'}>{selectedTool === 'build' ? '🔨 Meletak Blok' : '⛏️ Mengalih Blok'}</strong></span>
        </div>

        {/* 12x12 Grid Board */}
        <div 
          className="grid gap-1 sm:gap-1.5 p-3 rounded-2xl bg-emerald-900/20 border border-emerald-600/30 shadow-inner"
          style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))` }}
        >
          {Array.from({ length: GRID_SIZE }).map((_, y) => (
            Array.from({ length: GRID_SIZE }).map((_, x) => {
              const coordKey = `${x},${y}`;
              const itemId = worldGrid[coordKey];
              const item = itemId ? getBlockItem(itemId) : null;

              return (
                <button
                  key={coordKey}
                  onClick={() => handleCellClick(x, y)}
                  title={item ? `${item.name} (${x}, ${y})` : `Rumput Kosong (${x}, ${y})`}
                  className={`w-7 h-7 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center text-base sm:text-2xl transition-all relative group select-none ${
                    item
                      ? 'bg-slate-900 border border-emerald-400/50 shadow-md hover:scale-110 hover:z-20'
                      : 'bg-emerald-950/60 hover:bg-emerald-800/50 border border-emerald-700/20 hover:border-emerald-500/60'
                  }`}
                >
                  {/* Grass texture dot for empty tiles */}
                  {!item && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/20 group-hover:bg-emerald-400/60 pointer-events-none"></span>
                  )}

                  {/* Placed Item Graphic */}
                  {item && (
                    <span className="animate-in zoom-in-50 duration-200 drop-shadow-md">
                      {item.icon}
                    </span>
                  )}

                  {/* Subtle Coordinate Badge on Hover */}
                  <span className="absolute bottom-0 right-0 text-[7px] text-slate-500 opacity-0 group-hover:opacity-100 font-tech px-0.5 pointer-events-none">
                    {x},{y}
                  </span>
                </button>
              );
            })
          ))}
        </div>

        {/* Field Bottom Hint */}
        <p className="text-[11px] font-tech text-slate-400 mt-3 text-center">
          💡 <em>Petua: Pilih item dari beg di atas, kemudian klik mana-mana petak rumput untuk mendirikan dinding, atap, kolam ikan, atau meletakkan kereta & roket!</em>
        </p>

      </div>

      {/* ======================================================== */}
      {/* 5. MODAL KEDAI BLOK & ITEM (XP SHOPPING MART)            */}
      {/* ======================================================== */}
      {showShop && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-4xl max-h-[90vh] flex flex-col rounded-3xl bg-slate-900 border border-amber-500/60 shadow-2xl overflow-hidden">
            
            {/* Modal Header */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-amber-950 via-slate-900 to-slate-950 border-b border-amber-500/40 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/50 flex items-center justify-center text-2xl">
                  🛒
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-cyber font-extrabold text-white">
                    KEDAI BLOK & BAHAN BINAAN
                  </h3>
                  <p className="text-xs font-tech text-amber-300">
                    Baki XP Anda: <strong className="text-white text-sm">{profile.xp} XP</strong>
                  </p>
                </div>
              </div>

              <button
                onClick={() => { sound.playClick(); setShowShop(false); }}
                className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-cyber font-bold text-slate-300 hover:text-white"
              >
                TUTUP ✕
              </button>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 p-3 bg-slate-950 border-b border-slate-800 overflow-x-auto scrollbar-thin">
              {BLOCK_CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => { sound.playClick(); setShopCategory(cat.id); }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-cyber font-bold shrink-0 transition-colors ${
                    shopCategory === cat.id
                      ? 'bg-amber-500 text-slate-950 shadow-md'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                </button>
              ))}
            </div>

            {/* Product Cards Grid */}
            <div className="flex-1 overflow-y-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {filteredShopItems.map(item => {
                const canAfford = (profile.xp || 0) >= item.cost;
                const ownedQty = inventory[item.id] || 0;

                return (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-amber-500/50 flex flex-col justify-between transition-all group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-3xl p-1.5 rounded-xl bg-slate-900 border border-slate-800">
                          {item.icon}
                        </span>
                        <div className="text-right">
                          <span className="text-xs font-cyber font-extrabold text-amber-400">
                            {item.cost} XP
                          </span>
                          <p className="text-[10px] font-tech text-slate-400">
                            Miliki: <strong className="text-emerald-400">{ownedQty}</strong>
                          </p>
                        </div>
                      </div>

                      <h4 className="text-sm font-cyber font-bold text-white group-hover:text-amber-300">
                        {item.name}
                      </h4>
                      <p className="text-[11px] font-tech text-slate-300 mt-1 leading-snug">
                        {item.desc}
                      </p>
                    </div>

                    {/* Buy Actions */}
                    <div className="mt-3 pt-2.5 border-t border-slate-900 flex items-center gap-2">
                      <button
                        disabled={!canAfford}
                        onClick={() => handleBuy(item, 1)}
                        className={`flex-1 py-1.5 rounded-xl text-xs font-cyber font-bold flex items-center justify-center gap-1 transition-all ${
                          canAfford
                            ? 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white shadow-md active:scale-95'
                            : 'bg-slate-900 border border-slate-800 text-slate-600 cursor-not-allowed'
                        }`}
                      >
                        <span>Beli 1</span>
                      </button>

                      <button
                        disabled={(profile.xp || 0) < item.cost * 5}
                        onClick={() => handleBuy(item, 5)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-cyber font-bold transition-all ${
                          (profile.xp || 0) >= item.cost * 5
                            ? 'bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/40 active:scale-95'
                            : 'bg-slate-900 border border-slate-800 text-slate-700 cursor-not-allowed'
                        }`}
                        title={`Beli 5x (${item.cost * 5} XP)`}
                      >
                        +5x
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>

            {/* Modal Bottom: Shortcut to Earn XP */}
            <div className="p-3 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="text-slate-400 font-tech">
                💡 Perlukan lebih banyak XP untuk beli roket & kereta?
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => { setShowShop(false); onNavigateQuest(); }}
                  className="px-3 py-1 rounded-lg bg-cyan-950 border border-cyan-500/50 text-cyan-300 font-cyber font-bold hover:bg-cyan-900"
                >
                  🚀 Kembara Quest
                </button>
                <button
                  onClick={() => { setShowShop(false); onNavigateShooter(); }}
                  className="px-3 py-1 rounded-lg bg-orange-950 border border-orange-500/50 text-orange-300 font-cyber font-bold hover:bg-orange-900"
                >
                  🎯 Math Shooter
                </button>
                <button
                  onClick={() => { setShowShop(false); onNavigateRoda(); }}
                  className="px-3 py-1 rounded-lg bg-blue-950 border border-blue-500/50 text-blue-300 font-cyber font-bold hover:bg-blue-900"
                >
                  🎡 Roda Sifir
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 6. MODAL SHOWCASE / TAYANGAN RUMAH IMPIAN                */}
      {/* ======================================================== */}
      {showShowcase && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-xl rounded-3xl bg-slate-900 border-2 border-emerald-500/70 p-6 shadow-2xl space-y-5 text-center relative">
            
            <button
              onClick={() => { sound.playClick(); setShowShowcase(false); }}
              className="absolute top-4 right-4 text-xs font-cyber text-slate-400 hover:text-white"
            >
              TUTUP ✕
            </button>

            <div className="space-y-1">
              <span className="text-4xl animate-bounce inline-block">🏰</span>
              <h3 className="text-xl font-cyber font-extrabold text-white">
                POTRET RUMAH IMPIAN SAYA
              </h3>
              <p className="text-xs font-tech text-emerald-400 font-bold uppercase tracking-wider">
                KARYA ARKITEK MATEMATIK KSSR SEMAKAN
              </p>
            </div>

            {/* Student Credential Card */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-left space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-tech text-slate-400 uppercase">Nama Pereka</p>
                  <p className="text-sm font-cyber font-bold text-white">{profile.agentName}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-tech text-slate-400 uppercase">Kelas & Sekolah</p>
                  <p className="text-xs font-cyber font-bold text-amber-300">
                    {profile.selectedGrade} • {profile.studentClass} ({profile.schoolName})
                  </p>
                </div>
              </div>

              <div className="border-t border-slate-900 pt-2 grid grid-cols-3 gap-2 text-center">
                <div className="p-2 rounded-xl bg-slate-900/80">
                  <p className="text-[9px] font-tech text-slate-400">Blok Terpasang</p>
                  <p className="text-sm font-cyber font-bold text-emerald-400">{totalBlocksPlaced} unit</p>
                </div>
                <div className="p-2 rounded-xl bg-slate-900/80">
                  <p className="text-[9px] font-tech text-slate-400">Nilai Hartanah</p>
                  <p className="text-sm font-cyber font-bold text-amber-400">{totalWorldValue} XP</p>
                </div>
                <div className="p-2 rounded-xl bg-slate-900/80">
                  <p className="text-[9px] font-tech text-slate-400">Pangkat Arkitek</p>
                  <p className="text-sm font-cyber font-bold text-cyan-400">{currentRank.title}</p>
                </div>
              </div>
            </div>

            {/* Developer Credit Signature */}
            <div className="text-center pt-2 border-t border-slate-800/80">
              <p className="text-[10px] font-tech text-slate-400">
                Pembangun Sistem: <strong className="text-white">{DEVELOPER_NAME}</strong>
              </p>
              <p className="text-[9px] font-tech text-cyan-400/80">
                {DEVELOPER_TITLE}
              </p>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                confetti({ particleCount: 60, spread: 70 });
                setShowShowcase(false);
              }}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-cyber font-bold text-xs shadow-lg shadow-emerald-950"
            >
              KEMBALI KE LAPANGAN RUMPUT
            </button>

          </div>
        </div>
      )}

    </div>
  );
}
