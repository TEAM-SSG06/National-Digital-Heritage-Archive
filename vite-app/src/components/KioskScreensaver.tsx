import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, Hand, ShieldCheck } from "lucide-react"

interface KioskScreensaverProps {
  idleTimeoutSeconds?: number
  manualTrigger?: boolean
  onDismissManual?: () => void
}

export function KioskScreensaver({
  idleTimeoutSeconds = 75,
  manualTrigger = false,
  onDismissManual,
}: KioskScreensaverProps) {
  const [isIdle, setIsIdle] = useState(false)
  const [quoteIndex, setQuoteIndex] = useState(0)

  const slides = [
    {
      image: "/images/ambedkar-portrait.jpg",
      quote: "Cultivation of mind should be the ultimate aim of human existence.",
      source: "Writings and Speeches, Volume 1",
    },
    {
      image: "/images/ambedkar-delhi-1948.jpg",
      quote: "Political democracy cannot last unless there lies at the base of it social democracy.",
      source: "Constituent Assembly of India, 1949",
    },
    {
      image: "/images/ambedkar-reading-library.jpg",
      quote: "Educate, Agitate, Organise, have faith in yourselves.",
      source: "All-India Depressed Classes Conference, 1942",
    },
    {
      image: "/images/ambedkar-with-colleagues.jpg",
      quote: "I measure the progress of a community by the degree of progress which women have achieved.",
      source: "All-India Women's Conference, 1942",
    },
  ]

  // Idle timer listener
  useEffect(() => {
    let idleTimer: ReturnType<typeof setTimeout>

    const resetTimer = () => {
      if (manualTrigger) return // don't auto-dismiss if user explicitly clicked Kiosk Mode button
      setIsIdle(false)
      clearTimeout(idleTimer)
      idleTimer = setTimeout(() => {
        setIsIdle(true)
      }, idleTimeoutSeconds * 1000)
    }

    // Set initial timer
    idleTimer = setTimeout(() => {
      setIsIdle(true)
    }, idleTimeoutSeconds * 1000)

    const events = ["pointerdown", "pointermove", "keydown", "touchstart", "scroll"]
    events.forEach((ev) => window.addEventListener(ev, resetTimer, { passive: true }))

    return () => {
      clearTimeout(idleTimer)
      events.forEach((ev) => window.removeEventListener(ev, resetTimer))
    }
  }, [idleTimeoutSeconds, manualTrigger])

  // Cycle quotes during idle mode
  useEffect(() => {
    if (!isIdle && !manualTrigger) return

    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % slides.length)
    }, 7000)

    return () => clearInterval(interval)
  }, [isIdle, manualTrigger, slides.length])

  const showScreensaver = isIdle || manualTrigger

  const handleWakeUp = () => {
    setIsIdle(false)
    if (onDismissManual) onDismissManual()
  }

  if (!showScreensaver) return null

  const currentSlide = slides[quoteIndex]

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        onClick={handleWakeUp}
        className="fixed inset-0 z-50 flex flex-col justify-between bg-black text-white p-8 sm:p-16 select-none cursor-pointer overflow-hidden"
      >
        {/* Cinematic Background Image with Ken Burns Zoom & Pan */}
        <AnimatePresence mode="wait">
          <motion.div
            key={quoteIndex}
            initial={{ scale: 1.05, opacity: 0 }}
            animate={{ scale: 1.15, opacity: 0.38 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 7, ease: "linear" }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${currentSlide.image})` }}
          />
        </AnimatePresence>

        {/* Ambient Dark Gradient Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/80" />

        {/* Top Masthead */}
        <div className="relative z-10 flex items-center justify-between w-full border-b border-white/15 pb-6">
          <div className="flex items-center gap-3">
            <div className="size-11 rounded-full border border-white/30 overflow-hidden bg-black/60">
              <img
                src="/images/ambedkar-portrait.jpg"
                alt="Dr. B. R. Ambedkar"
                className="size-full object-cover"
              />
            </div>
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white">
                Dr. B. R. Ambedkar Digital Heritage Archive
              </h2>
              <span className="font-mono text-xs text-white/70 uppercase tracking-widest flex items-center gap-1.5 mt-0.5">
                <ShieldCheck className="size-3.5 text-amber-400" />
                Dr. Ambedkar International Centre • 15 Janpath, New Delhi
              </span>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-white/60 bg-white/10 px-3.5 py-1.5 rounded-full backdrop-blur-md border border-white/10">
            <Sparkles className="size-3.5 text-amber-400 animate-pulse" />
            <span>Museum Interactive Display • Attract Mode</span>
          </div>
        </div>

        {/* Central Archival Quote */}
        <div className="relative z-10 max-w-4xl mx-auto my-auto text-center px-4 py-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={quoteIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center gap-6"
            >
              <span className="font-serif text-6xl text-amber-400/80 leading-none">“</span>
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight -mt-6">
                {currentSlide.quote}
              </h1>
              <p className="font-mono text-sm sm:text-base text-amber-300/90 tracking-wide mt-2">
                — Babasaheb Dr. B. R. Ambedkar • {currentSlide.source}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Call to Action */}
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/15 pt-6">
          <span className="font-mono text-xs text-white/60">
            National Institutional Repository • 22 Volumes Digitized
          </span>

          <motion.div
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="flex items-center gap-2.5 px-6 py-3 rounded-full bg-white text-black font-semibold text-sm shadow-2xl hover:bg-white/90"
          >
            <Hand className="size-4 animate-bounce" />
            <span>Touch Screen Anywhere to Begin Archival Exploration</span>
          </motion.div>

          <div className="flex items-center gap-1.5 font-mono text-xs text-white/50">
            <span>Slide {quoteIndex + 1} of {slides.length}</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
