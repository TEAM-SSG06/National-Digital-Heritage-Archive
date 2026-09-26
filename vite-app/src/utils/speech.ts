// High-Quality Text-to-Speech (TTS) Voice Engine for Museum Kiosk

export function stopSpeech() {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel()
  }
}

export function speakText(
  text: string,
  language: string = "english",
  onEnd?: () => void,
  rate: number = 0.92
) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return

  window.speechSynthesis.cancel()

  const cleanText = text.replace(/[“”—\n]/g, " ").trim()
  if (!cleanText) return

  const speak = () => {
    const utterance = new SpeechSynthesisUtterance(cleanText)
    const voices = window.speechSynthesis.getVoices()

    let matchedVoice: SpeechSynthesisVoice | undefined

    if (language === "hindi") {
      utterance.lang = "hi-IN"
      matchedVoice = voices.find(
        (v) =>
          v.lang.startsWith("hi") ||
          v.name.toLowerCase().includes("hindi") ||
          v.name.includes("Hemant") ||
          v.name.includes("Kalpana") ||
          v.name.includes("हिन्दी")
      )
    } else if (language === "marathi") {
      utterance.lang = "mr-IN"
      matchedVoice = voices.find(
        (v) =>
          v.lang.startsWith("mr") ||
          v.name.toLowerCase().includes("marathi") ||
          v.name.includes("मराठी")
      )
      // Fallback to high-clarity Indian English or Hindi if Marathi voice is not installed on OS
      if (!matchedVoice) {
        matchedVoice = voices.find((v) => v.lang === "hi-IN" || v.lang === "en-IN")
      }
    } else if (language === "tamil") {
      utterance.lang = "ta-IN"
      matchedVoice = voices.find(
        (v) =>
          v.lang.startsWith("ta") ||
          v.name.toLowerCase().includes("tamil") ||
          v.name.includes("தமிழ்")
      )
    } else {
      // English: Prefer high-clarity natural neural/studio voices
      utterance.lang = "en-IN"
      const preferredEnglish = [
        "Microsoft Neerja Online (Natural) - English (India)",
        "Google UK English Female",
        "Google US English",
        "Microsoft Zira - English (United States)",
        "Microsoft David - English (United States)",
        "en-IN",
        "Samantha",
        "Karen",
      ]

      for (const name of preferredEnglish) {
        matchedVoice = voices.find((v) => v.name.includes(name) || v.lang === name)
        if (matchedVoice) break
      }

      if (!matchedVoice) {
        matchedVoice =
          voices.find((v) => v.lang.startsWith("en") && !v.name.includes("eSpeak")) ||
          voices[0]
      }
    }

    if (matchedVoice) {
      utterance.voice = matchedVoice
    }

    utterance.rate = rate
    utterance.pitch = 1.02
    utterance.volume = 1.0

    if (onEnd) {
      utterance.onend = onEnd
      utterance.onerror = onEnd
    }

    window.speechSynthesis.speak(utterance)
  }

  if (window.speechSynthesis.getVoices().length > 0) {
    speak()
  } else {
    window.speechSynthesis.onvoiceschanged = () => {
      speak()
      window.speechSynthesis.onvoiceschanged = null
    }
  }
}
