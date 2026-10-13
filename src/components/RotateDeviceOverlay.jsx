import React, { useState, useEffect } from 'react';
import { RotateCw, Smartphone, Play } from 'lucide-react';
import { sound } from '../utils/sound';

export default function RotateDeviceOverlay() {
  const [isPortrait, setIsPortrait] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      // If height is noticeably greater than width and device width is mobile/tablet size
      const portrait = window.innerHeight > window.innerWidth && window.innerWidth < 900;
      setIsPortrait(portrait);
    };

    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);
    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);

  if (!isPortrait || dismissed) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-950/95 backdrop-blur-xl animate-fadeIn text-center">
      <div className="max-w-sm w-full space-y-6">
        
        {/* Animated Rotating Phone Device Graphic */}
        <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-cyan-500/20 animate-ping"></div>
          <div className="w-20 h-14 rounded-2xl border-2 border-cyan-400 bg-slate-900 shadow-2xl shadow-cyan-500/30 flex items-center justify-center text-cyan-400 animate-bounce">
            <Smartphone className="w-8 h-8 rotate-90 text-cyan-400" />
          </div>
        </div>

        {/* Text Instructions */}
        <div className="space-y-2">
          <span className="text-[10px] font-tech px-3 py-1 rounded-full bg-cyan-950 border border-cyan-500/50 text-cyan-300 font-bold uppercase tracking-wider">
            GAMING EXPERIENCE // 16:9 LANDSCAPE
          </span>
          <h3 className="font-cyber font-extrabold text-xl text-white">
            PUSING TELEFON KE MOD MELINTANG (LANDSCAPE)
          </h3>
          <p className="text-xs text-slate-300 font-tech leading-relaxed">
            Permainan ini direka khas untuk dimainkan secara melintang seperti <strong className="text-amber-400">Mobile Legends</strong>, <strong className="text-cyan-400">Warcraft</strong>, & <strong className="text-emerald-400">Clash of Clans</strong> untuk pandangan luas dan selesa.
          </p>
        </div>

        {/* Action Button if auto-rotate is locked on phone */}
        <div className="pt-2 space-y-2">
          <button
            onClick={() => {
              sound.playClick();
              setDismissed(true);
            }}
            className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-tech text-slate-400 hover:text-white transition-colors"
          >
            Teruskan Dalam Mod Potret (Jika Kunci Skrin Aktif)
          </button>
        </div>

      </div>
    </div>
  );
}
