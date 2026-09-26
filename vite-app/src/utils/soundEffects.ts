// Web Audio API Synthesizer for Institutional Kiosk Sound Effects
// Studio-Grade Procedural Acoustics: Organic, warm, tactile, zero harsh electronic noise.

class SoundEffectsEngine {
  private ctx: AudioContext | null = null
  private enabled: boolean = true

  constructor() {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("daic_sound_enabled")
      if (stored !== null) {
        this.enabled = stored === "true"
      }
    }
  }

  private getAudioContext(): AudioContext | null {
    if (typeof window === "undefined") return null
    if (!this.ctx) {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (AudioContextClass) {
        this.ctx = new AudioContextClass()
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {})
    }
    return this.ctx
  }

  public isEnabled(): boolean {
    return this.enabled
  }

  public setEnabled(val: boolean) {
    this.enabled = val
    if (typeof window !== "undefined") {
      localStorage.setItem("daic_sound_enabled", String(val))
    }
  }

  public toggle(): boolean {
    this.setEnabled(!this.enabled)
    return this.enabled
  }

  /**
   * Warm, soft mechanical keyboard keystroke.
   * Uses a muted organic low-frequency thud with subtle micro-click.
   * Completely avoids harsh, piercing treble or abrasive white noise.
   */
  public playKeyClick(keyType: "standard" | "space" | "enter" | "backspace" = "standard") {
    if (!this.enabled) return
    const ctx = this.getAudioContext()
    if (!ctx) return

    const now = ctx.currentTime

    let baseFreq = 260
    let duration = 0.028
    let gainLevel = 0.045

    if (keyType === "space") {
      baseFreq = 180
      duration = 0.038
      gainLevel = 0.05
    } else if (keyType === "enter") {
      baseFreq = 220
      duration = 0.042
      gainLevel = 0.055
    } else if (keyType === "backspace") {
      baseFreq = 240
      duration = 0.03
      gainLevel = 0.04
    }

    // Micro-pitch randomization (+/- 7%) for natural tactile rhythm
    const shift = (Math.random() - 0.5) * 0.14
    const freq = baseFreq * (1 + shift)

    // Warm body oscillator (sine wave with gentle exponential decay)
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = "sine"
    osc.frequency.setValueAtTime(freq, now)
    osc.frequency.exponentialRampToValueAtTime(freq * 0.45, now + duration)

    gain.gain.setValueAtTime(gainLevel, now)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration)

    // Soft low-pass filter to guarantee warm acoustic tone
    const filter = ctx.createBiquadFilter()
    filter.type = "lowpass"
    filter.frequency.setValueAtTime(800, now)

    osc.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)

    osc.start(now)
    osc.stop(now + duration)
  }

  /**
   * Gentle, rounded tactile pop for UI buttons, tabs, and selectors.
   * Sounds like a smooth luxury haptic tap (marimba/woodblock pop).
   */
  public playNavClick() {
    if (!this.enabled) return
    const ctx = this.getAudioContext()
    if (!ctx) return

    const now = ctx.currentTime
    const duration = 0.032

    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = "sine"
    osc.frequency.setValueAtTime(420, now)
    osc.frequency.exponentialRampToValueAtTime(220, now + duration)

    gain.gain.setValueAtTime(0.065, now)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start(now)
    osc.stop(now + duration)
  }

  /**
   * Resonant, crystal singing chime for milestone & concept selection.
   * Tuned to soothing harmonics (A4 440Hz + E5 659.25Hz).
   */
  public playMilestoneSelect() {
    if (!this.enabled) return
    const ctx = this.getAudioContext()
    if (!ctx) return

    const now = ctx.currentTime
    const tones = [
      { freq: 440.0, gain: 0.08, duration: 0.35 },
      { freq: 659.25, gain: 0.05, duration: 0.45 },
    ]

    tones.forEach(({ freq, gain: toneGain, duration }) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = "sine"
      osc.frequency.setValueAtTime(freq, now)

      gain.gain.setValueAtTime(toneGain, now)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(now)
      osc.stop(now + duration)
    })
  }

  /**
   * Uplifting harmonic arpeggio when adding an item to Research Dossier.
   * Gentle major triad (C5 -> E5 -> G5).
   */
  public playDossierSuccess() {
    if (!this.enabled) return
    const ctx = this.getAudioContext()
    if (!ctx) return

    const now = ctx.currentTime
    const notes = [
      { freq: 523.25, delay: 0.0 },   // C5
      { freq: 659.25, delay: 0.07 },  // E5
      { freq: 783.99, delay: 0.14 },  // G5
    ]

    notes.forEach(({ freq, delay }) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = "sine"
      osc.frequency.setValueAtTime(freq, now + delay)

      gain.gain.setValueAtTime(0.0001, now)
      gain.gain.setValueAtTime(0.07, now + delay)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + 0.28)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(now + delay)
      osc.stop(now + delay + 0.28)
    })
  }

  /**
   * Soft, air-cushion acoustic swoosh for drawer and dialog transitions.
   */
  public playSwoosh(direction: "open" | "close" = "open") {
    if (!this.enabled) return
    const ctx = this.getAudioContext()
    if (!ctx) return

    const now = ctx.currentTime
    const duration = 0.09
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = "sine"
    if (direction === "open") {
      osc.frequency.setValueAtTime(180, now)
      osc.frequency.exponentialRampToValueAtTime(380, now + duration)
    } else {
      osc.frequency.setValueAtTime(320, now)
      osc.frequency.exponentialRampToValueAtTime(160, now + duration)
    }

    gain.gain.setValueAtTime(0.04, now)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start(now)
    osc.stop(now + duration)
  }
}

export const sfx = new SoundEffectsEngine()

/**
 * Global keyboard sound hook that attaches to the window.
 * Whenever an input, textarea, or contenteditable is typed in, it plays the click sound.
 */
export function initGlobalTypingSounds() {
  if (typeof window === "undefined") return () => {}

  const handleKeyDown = (e: KeyboardEvent) => {
    // Ignore pure modifier keys
    if (["Shift", "Control", "Alt", "Meta", "CapsLock", "Tab", "Escape"].includes(e.key)) {
      return
    }

    // Check if user is typing into an active text field
    const target = e.target as HTMLElement | null
    const isTextInput =
      target &&
      (target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable)

    if (isTextInput) {
      if (e.key === " " || e.code === "Space") {
        sfx.playKeyClick("space")
      } else if (e.key === "Enter") {
        sfx.playKeyClick("enter")
      } else if (e.key === "Backspace" || e.key === "Delete") {
        sfx.playKeyClick("backspace")
      } else if (e.key.length === 1) {
        sfx.playKeyClick("standard")
      }
    }
  }

  window.addEventListener("keydown", handleKeyDown, { passive: true })
  return () => {
    window.removeEventListener("keydown", handleKeyDown)
  }
}
