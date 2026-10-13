// Procedural Web Audio API Sound Synthesizer for Cyber Detective Math
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.muted = false;
    // Load mute preference
    try {
      this.muted = localStorage.getItem('arms_sound_muted') === 'true';
    } catch {
      this.muted = false;
    }
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    try {
      localStorage.setItem('arms_sound_muted', this.muted);
    } catch (e) {
      console.error(e);
    }
    return this.muted;
  }

  isMuted() {
    return this.muted;
  }

  playTone(freq, type = 'sine', duration = 0.1, gainVal = 0.15) {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // AudioContext fallback
    }
  }

  playClick() {
    this.playTone(1200, 'triangle', 0.04, 0.08);
  }

  playKeypad() {
    this.playTone(850 + Math.random() * 200, 'sine', 0.08, 0.12);
  }

  playSuccess() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 'sine', 0.15, 0.15);
      }, idx * 60);
    });
  }

  playWrong() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    this.playTone(220, 'sawtooth', 0.2, 0.18);
    setTimeout(() => {
      this.playTone(164.81, 'sawtooth', 0.25, 0.2);
    }, 120);
  }

  playVaultUnlock() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    // Heavy mechanical unlock chime
    this.playTone(300, 'square', 0.08, 0.15);
    setTimeout(() => this.playTone(450, 'square', 0.08, 0.15), 90);
    setTimeout(() => {
      const victoryChords = [587.33, 739.99, 880.00, 1174.66]; // D-maj chime
      victoryChords.forEach((freq, idx) => {
        setTimeout(() => this.playTone(freq, 'sine', 0.4, 0.2), idx * 80);
      });
    }, 200);
  }

  playLevelUp() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const fanfare = [440, 554.37, 659.25, 880, 1108.73, 1318.51];
    fanfare.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 'triangle', 0.25, 0.2);
      }, idx * 100);
    });
  }

  playHint() {
    this.playTone(987.77, 'sine', 0.1, 0.1);
    setTimeout(() => this.playTone(1318.51, 'sine', 0.18, 0.12), 80);
  }

  playWheelTick(freq = 1400) {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    this.playTone(freq, 'triangle', 0.02, 0.05);
  }

  playCombo() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    const notes = [659.25, 830.61, 987.77, 1318.51];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 'sine', 0.12, 0.15);
      }, idx * 50);
    });
  }

  playLaser() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(1600, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, this.ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.15);
    } catch {}
  }

  playBossHit() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    this.playTone(120, 'square', 0.18, 0.25);
    setTimeout(() => this.playTone(90, 'sawtooth', 0.15, 0.2), 50);
  }

  playBossAttack() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    this.playTone(180, 'sawtooth', 0.25, 0.25);
    setTimeout(() => this.playTone(130, 'square', 0.2, 0.25), 80);
  }

  playCriticalHit() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    const freqs = [523.25, 783.99, 1046.5, 1567.98];
    freqs.forEach((f, i) => {
      setTimeout(() => this.playTone(f, 'triangle', 0.12, 0.2), i * 40);
    });
  }

  playBossDefeat() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    // Major triumphant cyber fanfare
    const fanfare = [392, 523.25, 659.25, 783.99, 1046.5, 1318.51, 1567.98];
    fanfare.forEach((f, i) => {
      setTimeout(() => this.playTone(f, 'sine', 0.35, 0.22), i * 80);
    });
  }

  playPowerUp() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    const chime = [880, 1108.73, 1318.51, 1760];
    chime.forEach((f, i) => {
      setTimeout(() => this.playTone(f, 'sine', 0.12, 0.15), i * 45);
    });
  }
}

export const sound = new SoundEngine();

