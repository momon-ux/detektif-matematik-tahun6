import React, { useState } from 'react';
import { 
  X, Smartphone, Share, PlusSquare, CheckCircle2, 
  ArrowDown, Download, Sparkles, Shield, ExternalLink 
} from 'lucide-react';
import { sound } from '../utils/sound';
import { DEVELOPER_NAME, DEVELOPER_TITLE } from '../utils/storage';

export default function InstallPwaModal({ 
  onClose, 
  deferredPrompt, 
  onTriggerInstall 
}) {
  const [deviceTab, setDeviceTab] = useState('android'); // 'android' | 'ios'

  const handleInstallClick = () => {
    sound.playClick();
    if (onTriggerInstall) {
      onTriggerInstall();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-lg bg-slate-900 border border-cyan-500/60 rounded-3xl shadow-2xl overflow-hidden my-4">
        
        {/* Top Header */}
        <div className="p-4 sm:p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-950 border border-cyan-500/40 text-cyan-400">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-cyber font-bold text-base text-white">
                PASANG KE SKRIN UTAMA (PWA)
              </h3>
              <p className="text-[11px] text-cyan-400 font-tech">
                ADD TO HOME SCREEN • PANDUAN IBU BAPA & MURID
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-6">
          
          {/* App Icon & Hero Feature Showcase */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-950 border border-cyan-900/60">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-cyan-400/60 shadow-xl shadow-cyan-500/20 shrink-0">
              <img 
                src="./pwa-icon-512.png" 
                alt="Logo PWA Detektif Siber Matematik Tahun 6" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/20 rounded-2xl pointer-events-none"></div>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-tech px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-bold uppercase">
                APLIKASI WEB PROGRESIF (PWA)
              </span>
              <h4 className="font-cyber font-extrabold text-base text-white leading-tight">
                Detektif Siber Matematik M6
              </h4>
              <p className="text-xs text-slate-300 font-tech">
                KSSR Semakan & Roda Sifir Interaktif
              </p>
              <div className="flex flex-wrap gap-2 text-[10px] font-tech text-emerald-400 pt-0.5">
                <span>✓ Tiada Iklan</span>
                <span>•</span>
                <span>✓ Sangat Ringan</span>
                <span>•</span>
                <span>✓ Skrin Penuh</span>
              </div>
            </div>
          </div>

          {/* Native 1-Click Install Button (If browser supports beforeinstallprompt) */}
          {deferredPrompt && (
            <button
              onClick={handleInstallClick}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-cyber font-extrabold text-sm flex items-center justify-center gap-2 shadow-xl shadow-cyan-950 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Download className="w-4 h-4" />
              <span>PASANG SEKARANG KE TELEFON (1-KLIK)</span>
            </button>
          )}

          {/* OS Switcher Tabs */}
          <div className="space-y-3">
            <div className="flex p-1 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-cyber font-bold">
              <button
                onClick={() => {
                  sound.playClick();
                  setDeviceTab('android');
                }}
                className={`flex-1 py-2 rounded-xl transition-all ${
                  deviceTab === 'android'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                🤖 Android (Chrome / Samsung)
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setDeviceTab('ios');
                }}
                className={`flex-1 py-2 rounded-xl transition-all ${
                  deviceTab === 'ios'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                🍎 iPhone / iPad (Safari)
              </button>
            </div>

            {/* Android Instructions */}
            {deviceTab === 'android' && (
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-xs font-tech text-slate-300 animate-fadeIn">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-950 border border-emerald-500/50 text-emerald-400 font-bold flex items-center justify-center shrink-0">
                    1
                  </div>
                  <div>
                    <p className="font-bold text-white">Buka di Pelayar Google Chrome</p>
                    <p className="text-[11px] text-slate-400">Pastikan pautan dibuka menggunakan Chrome pada telefon pintar anda.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-950 border border-emerald-500/50 text-emerald-400 font-bold flex items-center justify-center shrink-0">
                    2
                  </div>
                  <div>
                    <p className="font-bold text-white">Tekan Menu Tiga Titik (⋮)</p>
                    <p className="text-[11px] text-slate-400">Terletak di sudut atas kanan pelayar Chrome anda.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-950 border border-emerald-500/50 text-emerald-400 font-bold flex items-center justify-center shrink-0">
                    3
                  </div>
                  <div>
                    <p className="font-bold text-white">Pilih "Tambah ke Skrin Utama" / "Install app"</p>
                    <p className="text-[11px] text-slate-400">Tekan "Pasang" (Install). Ikon logo rasmi akan muncul di skrin telefon anak anda!</p>
                  </div>
                </div>
              </div>
            )}

            {/* iOS Safari Instructions */}
            {deviceTab === 'ios' && (
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-xs font-tech text-slate-300 animate-fadeIn">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-950 border border-blue-500/50 text-blue-400 font-bold flex items-center justify-center shrink-0">
                    1
                  </div>
                  <div>
                    <p className="font-bold text-white">Buka Laman Menggunakan Safari</p>
                    <p className="text-[11px] text-slate-400">Pada iPhone atau iPad, buka pautan di aplikasi pelayar Safari.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-950 border border-blue-500/50 text-blue-400 font-bold flex items-center justify-center shrink-0">
                    2
                  </div>
                  <div>
                    <p className="font-bold text-white">Tekan Butang Kongsi (Share Icon <Share className="w-3.5 h-3.5 inline text-blue-400" />)</p>
                    <p className="text-[11px] text-slate-400">Ikon segi empat dengan anak panah ke atas di bahagian bawah skrin Safari.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-950 border border-blue-500/50 text-blue-400 font-bold flex items-center justify-center shrink-0">
                    3
                  </div>
                  <div>
                    <p className="font-bold text-white">Tatal Ke Bawah & Tekan "Add to Home Screen" <PlusSquare className="w-3.5 h-3.5 inline text-amber-400" /></p>
                    <p className="text-[11px] text-slate-400">Pilih "Tambah ke Skrin Utama", kemudian tekan "Add" di bucu atas kanan. Siap!</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Developer Attribution Box */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-1 text-xs font-tech">
            <p className="text-slate-400 text-[11px]">
              Disediakan khas untuk kemudahan murid & ibu bapa oleh:
            </p>
            <p className="font-cyber font-bold text-cyan-300">
              {DEVELOPER_NAME}
            </p>
            <p className="text-[10px] text-slate-500">
              {DEVELOPER_TITLE}
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
