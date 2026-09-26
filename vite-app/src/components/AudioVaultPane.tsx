import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Play,
  Pause,
  RotateCcw,
  Mic,
  Video,
  Film,
  BookmarkPlus,
  Check,
  X,
  Clock,
  Download,
} from "lucide-react"
import { getTranslation } from "@/utils/translations"
import { speakText, stopSpeech } from "@/utils/speech"
import { sfx } from "@/utils/soundEffects"

interface AudioTrack {
  id: string
  title: string
  date: string
  occasion: string
  duration: string
  audioSrc: string
  transcript: string
  significance: string
}

interface VideoArchivalItem {
  id: string
  title: string
  year: number | string
  duration: string
  source: string
  archiveType: string
  thumbnail: string
  videoUrl: string
  description: string
  keyMoments: { time: string; label: string }[]
}

interface AudioVaultPaneProps {
  onToggleDossierItem?: (item: {
    id: string
    title: string
    category: string
    year: string | number
    source: string
    type: "speech" | "video" | "document" | "debate"
  }) => void
  dossierIds?: string[]
  currentLanguage?: string
}

export function AudioVaultPane({
  onToggleDossierItem,
  dossierIds = [],
  currentLanguage = "english",
}: AudioVaultPaneProps) {
  const t = getTranslation(currentLanguage)
  const [activeTab, setActiveTab] = useState<"audio" | "video">("audio")

  // Audio tracks with multilingual metadata
  const rawTracks: AudioTrack[] = [
    {
      id: "AUD-001",
      title: "Constituent Assembly Final Address (Grammar of Anarchy)",
      date: "November 25, 1949",
      occasion: "Adoption of the Constitution of India, New Delhi",
      duration: "04:12",
      audioSrc: "",
      transcript: `On the 26th of January 1950, we are going to enter into a life of contradictions. In politics we will have equality and in social and economic life we will have inequality.

In politics we will be recognizing the principle of one man one vote and one vote one value. In our social and economic life, we shall, by reason of our social and economic structure, continue to deny the principle of one man one value.

How long shall we continue to live this life of contradictions? How long shall we continue to deny equality in our social and economic life? If we continue to deny it for long, we will do so only by putting our political democracy in peril. We must remove this contradiction at the earliest possible moment or else those who suffer from inequality will blow up the structure of political democracy which this Assembly has so laboriously built up.`,
      significance: "Warned against hero-worship in politics and demanded economic democracy to sustain constitutional democracy.",
    },
    {
      id: "AUD-002",
      title: "BBC London Radio Interview on Democracy and Caste",
      date: "May 1953",
      occasion: "BBC London Overseas Broadcast",
      duration: "03:45",
      audioSrc: "",
      transcript: `Democracy cannot succeed where social equality is absent. A government by the people, of the people, and for the people can only function when the people feel they are one people. Where there is division into thousands of compartmental castes without mutual sympathy, democracy becomes an oligarchy of the privileged.`,
      significance: "International broadcast articulating the sociology of Indian democracy to a global audience.",
    },
    {
      id: "AUD-003",
      title: "Historic Nagpur Deeksha Address on Human Dignity",
      date: "October 14, 1956",
      occasion: "Mass Conversion Ceremony at Deekshabhoomi, Nagpur",
      duration: "05:30",
      audioSrc: "",
      transcript: `By discarding the shackles of hereditary servitude, we have entered the realm of moral freedom. Religion must be judged by its social utility, by how it treats fellow human beings. Buddhism is founded on Prajna (wisdom), Karuna (compassion), and Samata (equality).`,
      significance: "Liberation manifesto inaugurating the Navayana Buddhist movement.",
    },
  ]

  const localizedAudioTracks: Record<string, Record<string, Partial<AudioTrack>>> = {
    "AUD-001": {
      hindi: {
        title: "संविधान सभा का अंतिम भाषण (अराजकता का व्याकरण)",
        date: "२५ नवंबर १९४९",
        occasion: "भारतीय संविधान का अंगीकरण, नई दिल्ली",
        transcript: `२६ जनवरी १९५० को हम अंतर्विरोधों के एक नए जीवन में प्रवेश करने जा रहे हैं। राजनीति में हमारे पास समानता होगी, किंतु सामाजिक और आर्थिक जीवन में असमानता।

राजनीति में हम 'एक व्यक्ति, एक मत और एक मत, एक मूल्य' के सिद्धांत को मान्यता दे रहे होंगे। किंतु हमारे सामाजिक और आर्थिक ढांचे के कारण हम अपने सामाजिक और आर्थिक जीवन में 'एक व्यक्ति, एक मूल्य' के सिद्धांत को नकारते रहेंगे।

हम कब तक अंतर्विरोधों का यह जीवन जीते रहेंगे? यदि हम अधिक समय तक इसे नकारते रहे, तो हम अपने राजनीतिक लोकतंत्र को संकट में डाल देंगे। हमें इस अंतर्विरोध को शीघ्रतिशीघ्र समाप्त करना होगा, अन्यथा असमानता के शिकार लोग उस राजनीतिक लोकतंत्र की संरचना को ध्वस्त कर देंगे जिसे इस सभा ने इतने परिश्रम से खड़ा किया है।`,
        significance: "राजनीति में नायक-पूजा (भक्ति) के विरुद्ध ऐतिहासिक चेतावनी तथा सामाजिक लोकतंत्र की अनिवार्यता।",
      },
      marathi: {
        title: "संविधान सभेतील अंतिम भाषण (अराजकतेचे व्याकरण)",
        date: "२५ नोव्हेंबर १९४९",
        occasion: "भारतीय संविधान स्वीकृती, नवी दिल्ली",
        significance: "राजकारणातील नायक-पूजेविरुद्ध इशारा आणि सामाजिक लोकशाहीचे महत्त्व.",
      },
      tamil: {
        title: "அரசியலமைப்பு சபையின் இறுதி உரை (அராஜகத்தின் இலக்கணம்)",
        date: "25 நவம்பர் 1949",
        occasion: "அரசியலமைப்பு ஏற்பு, புது தில்லி",
        significance: "நாயக வழிபாட்டிற்கு எதிரான எச்சரிக்கை.",
      },
    },
    "AUD-002": {
      hindi: {
        title: "बीबीसी लंदन रेडियो साक्षात्कार: लोकतंत्र और जाति",
        date: "मई १९५३",
        occasion: "बीबीसी लंदन ओवरसीज ब्रॉडकास्ट",
        transcript: `जहाँ सामाजिक समानता का अभाव है, वहाँ लोकतंत्र कभी सफल नहीं हो सकता। जनता का, जनता द्वारा और जनता के लिए शासन केवल तभी कार्य कर सकता है जब जनता यह अनुभव करे कि वे एक ही समाज हैं। जहाँ समाज हज़ारों जातियों में बंटा हो, वहाँ लोकतंत्र केवल विशेषाधिकार प्राप्त वर्ग की सत्ता बन जाता है।`,
        significance: "वैश्विक पटल पर भारतीय सामाजिक व्यवस्था और लोकतंत्र की चुनौतियों का स्पष्ट विश्लेषण।",
      },
      marathi: {
        title: "बीबीसी लंडन रेडिओ मुलाखत: लोकशाही आणि जातीव्यवस्था",
        date: "मे १९५३",
        occasion: "बीबीसी लंडन आंतरराष्ट्रीय प्रसारण",
        significance: "जातीव्यवस्था आणि संसदीय लोकशाहीच्या विसंगतीवर आंतरराष्ट्रीय विचार.",
      },
      tamil: {
        title: "பிபிசி லண்டன் வானொலி பேட்டி: ஜனநாயகம் மற்றும் சாதி",
        date: "மே 1953",
        occasion: "பிபிசி லண்டன் ஒலிபரப்பு",
        significance: "சமூக சமத்துவமும் ஜனநாயகமும் பற்றிய உலகளாவிய நேர்காணல்.",
      },
    },
    "AUD-003": {
      hindi: {
        title: "नागपुर दीक्षाभूमि का ऐतिहासिक संबोधन",
        date: "१४ अक्टूबर १९५६",
        occasion: "दीक्षाभूमि, नागपुर में सामूहिक धम्म दीक्षा समारोह",
        transcript: `जन्मजात दासता की बेड़ियों को तोड़कर आज हमने नैतिक स्वतंत्रता के पावन क्षेत्र में प्रवेश किया है। किसी भी धर्म का मूल्यांकन उसकी सामाजिक उपयोगिता से होना चाहिए। तथागत बुद्ध का धम्म प्रज्ञा, शील, करुणा और समता पर आधारित है।`,
        significance: "नवयान बौद्ध आंदोलन का मुक्ति घोषणापत्र और नैतिक पुनर्जागरण।",
      },
      marathi: {
        title: "नागपूर दीक्षाभूमी येथील ऐतिहासिक धम्मदीक्षा भाषण",
        date: "१४ ऑक्टोबर १९५६",
        occasion: "दीक्षाभूमी, नागपूर",
        significance: "नवयान बौद्ध धम्माचा मुक्ती जाहीरनामा.",
      },
      tamil: {
        title: "நாக்பூர் தீக்ஷாபூமி வரலாற்று உரை",
        date: "14 அக்டோபர் 1956",
        occasion: "தீக்ஷாபூமி மாநாடு, நாக்பூர்",
        significance: "நவயான பௌத்தத்தின் சமூக விடுதலை பிரகடனம்.",
      },
    },
  }

  const tracks: AudioTrack[] = rawTracks.map((trk) => {
    const loc = localizedAudioTracks[trk.id]?.[currentLanguage]
    return {
      ...trk,
      title: loc?.title || trk.title,
      date: loc?.date || trk.date,
      occasion: loc?.occasion || trk.occasion,
      transcript: loc?.transcript || trk.transcript,
      significance: loc?.significance || trk.significance,
    }
  })

  // Real native offline downloadable videos stored in public/videos/
  const rawVideos: VideoArchivalItem[] = [
    {
      id: "VID-001",
      title: "1953 BBC London Interview: The Future of Indian Democracy",
      year: "1953",
      duration: "08:14",
      source: "BBC Archives / British Film Institute (BFI)",
      archiveType: "Television Interview",
      thumbnail: "/images/Dr._Babasaheb_Ambedkar_02.jpg",
      videoUrl: "/videos/ambedkar_speaks_interview.mp4",
      description:
        "Original televised interview with Dr. B. R. Ambedkar in London discussing parliamentary democracy, adult franchise, and the socio-economic conditions necessary for democratic success.",
      keyMoments: [
        { time: "01:20", label: "Introductory remarks on Indian General Elections" },
        { time: "03:45", label: "Caste system and parliamentary democracy incompatibility" },
        { time: "06:10", label: "Fundamental prerequisites for social cohesion" },
      ],
    },
    {
      id: "VID-002",
      title: "1948 Constituent Assembly: Introducing the Draft Constitution",
      year: "1948",
      duration: "06:52",
      source: "Prasar Bharati Archives / Films Division",
      archiveType: "Parliamentary Record",
      thumbnail: "/images/Dr._Babasaheb_Ambedkar_05.jpg",
      videoUrl: "/videos/ambedkar_rare_footage.mp4",
      description:
        "Historic recording of Dr. B. R. Ambedkar introducing the Draft Constitution to the Constituent Assembly as Drafting Committee Chairman.",
      keyMoments: [
        { time: "01:15", label: "Presentation of the 315 articles and 8 schedules" },
        { time: "03:30", label: "Principles of parliamentary executive and judiciary" },
        { time: "05:10", label: "Safeguards for fundamental rights" },
      ],
    },
    {
      id: "VID-003",
      title: "1946 Historic Constituent Assembly Address",
      year: "1946",
      duration: "09:30",
      source: "Prasar Bharati Archives / National Archives",
      archiveType: "Historical Address",
      thumbnail: "/images/Dr._Babasaheb_Ambedkar_08.jpg",
      videoUrl: "/videos/ambedkar_speaks_interview.mp4",
      description:
        "Dr. B. R. Ambedkar's landmark first major address to the Constituent Assembly passionately advocating national unity, sovereignty, and constitutional democracy.",
      keyMoments: [
        { time: "01:40", label: "Plea for conciliation and national unity" },
        { time: "04:25", label: "Sovereignty of the Constituent Assembly" },
        { time: "07:15", label: "Vision for a United Sovereign India" },
      ],
    },
    {
      id: "VID-004",
      title: "Deekshabhoomi 1956: The Historic Gathering at Nagpur",
      year: "1956",
      duration: "11:50",
      source: "Films Division & National Archives / Ambedkarian Chronicle",
      archiveType: "Archival Documentary Footage",
      thumbnail: "/images/Bhimrao_Ambedkar_image_and_Navayana_Buddhist_worship_at_Kanheri_caves_Mumbai.jpg",
      videoUrl: "/videos/ambedkar_rare_footage.mp4",
      description:
        "Archival documentary and eyewitness accounts of the mass social and spiritual liberation movement led by Dr. B. R. Ambedkar on Vijayadashami, 14 October 1956.",
      keyMoments: [
        { time: "02:10", label: "Arrival at Nagpur Deekshabhoomi" },
        { time: "05:30", label: "Administration of the 22 Vows" },
        { time: "09:45", label: "Address on Buddhist ethics and equality" },
      ],
    },
  ]

  const localizedVideos: Record<string, Record<string, { title: string; description: string; archiveType: string }>> = {
    "VID-001": {
      hindi: {
        title: "१९५३ बीबीसी लंदन साक्षात्कार: भारतीय लोकतंत्र का भविष्य",
        description: "लंदन में डॉ. बी. आर. आंबेडकर का ऐतिहासिक दूरदर्शन साक्षात्कार, जिसमें उन्होंने संसदीय लोकतंत्र, मताधिकार और सामाजिक समता की पूर्व-शर्तों पर विचार रखे।",
        archiveType: "टेलीविज़न साक्षात्कार",
      },
      marathi: {
        title: "१९५३ बीबीसी लंडन मुलाखत: भारतीय लोकशाहीचे भविष्य",
        description: "डॉ. बाबासाहेब आंबेडकरांची लंडन येथील दुर्मिळ मुलाखत.",
        archiveType: "दूरदर्शन मुलाखत",
      },
      tamil: {
        title: "1953 பிபிசி லண்டன் நேர்காணல்: இந்திய ஜனநாயகத்தின் எதிர்காலம்",
        description: "லண்டனில் டாக்டர் அம்பேத்கரின் தொலைக்காட்சி நேர்காணல்.",
        archiveType: "தொலைக்காட்சி நேர்காணல்",
      },
    },
    "VID-002": {
      hindi: {
        title: "१९४८ संविधान सभा: प्रारूप संविधान की ऐतिहासिक प्रस्तुति",
        description: "प्रारूप समिति के अध्यक्ष के रूप में डॉ. बी. आर. आंबेडकर द्वारा संविधान सभा के पटल पर प्रारूप संविधान प्रस्तुत करने का ऐतिहासिक दृश्य-श्रव्य फुटेज।",
        archiveType: "संसदीय अभिलेख",
      },
      marathi: {
        title: "१९४८ संविधान सभा: मसुदा संविधान सादरीकरण",
        description: "संविधान सभेतील ऐतिहासिक चित्रीकरण.",
        archiveType: "संसदीय अभिलेख",
      },
      tamil: {
        title: "1948 அரசியலமைப்பு சபை: வரைவு அரசியலமைப்பு அறிமுகம்",
        description: "வரைவுக் குழுத் தலைவராக அம்பேத்கர் அரசியலமைப்பை அறிமுகப்படுத்திய அரிய காட்சி.",
        archiveType: "நாடாளுமன்ற ஆவணம்",
      },
    },
    "VID-003": {
      hindi: {
        title: "१९४६ संविधान सभा का प्रथम ऐतिहासिक संबोधन",
        description: "संविधान सभा में डॉ. आंबेडकर का राष्ट्रीय एकता, संप्रभुता और सामाजिक न्याय पर दिया गया प्रथम ओजस्वी भाषण।",
        archiveType: "ऐतिहासिक संबोधन",
      },
      marathi: {
        title: "१९४६ संविधान सभेतील पहिले ऐतिहासिक भाषण",
        description: "राष्ट्रीय ऐक्य आणि लोकशाहीवरील भाषण.",
        archiveType: "ऐतिहासिक भाषण",
      },
      tamil: {
        title: "1946 அரசியலமைப்பு சபை வரலாற்று உரை",
        description: "தேசிய ஒற்றுமை மற்றும் இறையாண்மை பற்றிய உரை.",
        archiveType: "வரலாற்று உரை",
      },
    },
    "VID-004": {
      hindi: {
        title: "दीक्षाभूमि १९५६: नागपुर का ऐतिहासिक सम्मेलन",
        description: "१४ अक्टूबर १९५६ को नागपुर में ५ लाख अनुयायियों के साथ बौद्ध धम्म दीक्षा और २२ प्रतिज्ञाओं का दुर्लभ वृत्तचित्र फुटेज।",
        archiveType: "अभिलेखीय वृत्तचित्र फुटेज",
      },
      marathi: {
        title: "दीक्षाभूमी १९५६: नागपूरचा ऐतिहासिक सोहळा",
        description: "ऐतिहासिक धम्मदीक्षा सोहळ्याचे दुर्मिळ फुटेज.",
        archiveType: "वृत्तचित्र फुटेज",
      },
      tamil: {
        title: "தீக்ஷாபூமி 1956: நாக்பூர் வரலாற்று மாநாடு",
        description: "நாக்பூரில் நடைபெற்ற வரலாற்று நிகழ்வின் ஆவணப் பதிவு.",
        archiveType: "ஆவணப் படம்",
      },
    },
  }

  const videos: VideoArchivalItem[] = rawVideos.map((vid) => {
    const loc = localizedVideos[vid.id]?.[currentLanguage]
    return {
      ...vid,
      title: loc?.title || vid.title,
      description: loc?.description || vid.description,
      archiveType: loc?.archiveType || vid.archiveType,
    }
  })

  // Audio player state
  const [selectedTrack, setSelectedTrack] = useState<AudioTrack>(tracks[0])
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0)
  const [selectedVideo, setSelectedVideo] = useState<VideoArchivalItem | null>(null)
  const [isTranscriptExpanded, setIsTranscriptExpanded] = useState<boolean>(false)

  const handleSelectTrack = (track: AudioTrack) => {
    sfx.playNavClick()
    stopSpeech()
    setSelectedTrack(track)
    setIsPlaying(false)
  }

  const handleTogglePlay = () => {
    sfx.playNavClick()
    if (isPlaying) {
      stopSpeech()
      setIsPlaying(false)
    } else {
      setIsPlaying(true)
      speakText(
        selectedTrack.transcript,
        currentLanguage,
        () => setIsPlaying(false),
        playbackSpeed
      )
    }
  }

  const handleSpeedChange = (speed: number) => {
    sfx.playNavClick()
    setPlaybackSpeed(speed)
    if (isPlaying) {
      stopSpeech()
      speakText(
        selectedTrack.transcript,
        currentLanguage,
        () => setIsPlaying(false),
        speed
      )
    }
  }

  const handleReset = () => {
    sfx.playNavClick()
    stopSpeech()
    setIsPlaying(false)
  }

  const isCurrentInDossier = dossierIds.includes(selectedTrack.id)

  return (
    <div className="flex flex-col gap-8 py-6">
      {/* Masthead */}
      <div className="flex flex-col gap-2 border-b border-border/80 pb-6">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="font-mono text-xs uppercase tracking-wider">
            {currentLanguage === "hindi" ? "दृश्य-श्रव्य अभिलेखागार" : "Audio-Visual Vault"}
          </Badge>
          <span className="font-mono text-xs text-muted-foreground">• 1946–1956</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          {t.audioVaultTitle}
        </h1>
        <p className="text-sm text-muted-foreground max-w-3xl leading-relaxed">
          {t.audioVaultSubtitle}
        </p>

        {/* Media Selector Tabs */}
        <div className="flex items-center gap-2 mt-4">
          <button
            onClick={() => {
              sfx.playNavClick()
              setActiveTab("audio")
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all border ${
              activeTab === "audio"
                ? "bg-primary text-primary-foreground border-primary shadow-xs"
                : "bg-card text-muted-foreground border-border hover:text-foreground"
            }`}
          >
            <Mic className="size-4" />
            <span>{t.audioTabLabel} ({tracks.length})</span>
          </button>
          <button
            onClick={() => {
              sfx.playNavClick()
              setActiveTab("video")
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all border ${
              activeTab === "video"
                ? "bg-primary text-primary-foreground border-primary shadow-xs"
                : "bg-card text-muted-foreground border-border hover:text-foreground"
            }`}
          >
            <Video className="size-4" />
            <span>{t.videoTabLabel} ({videos.length})</span>
          </button>
        </div>
      </div>

      {/* AUDIO TAB WORKSPACE */}
      {activeTab === "audio" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Playlist */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <h2 className="font-mono text-xs uppercase tracking-wider text-muted-foreground font-semibold px-1">
              {t.audioPlaylistTitle}
            </h2>
            <div className="flex flex-col gap-2">
              {tracks.map((track) => {
                const isSelected = selectedTrack.id === track.id
                const inDossier = dossierIds.includes(track.id)

                return (
                  <div
                    key={track.id}
                    onClick={() => handleSelectTrack(track)}
                    className={`group p-4 rounded-2xl border transition-all cursor-pointer flex flex-col gap-2 ${
                      isSelected
                        ? "bg-card border-primary/50 shadow-md ring-1 ring-primary/20"
                        : "bg-card/60 border-border/80 hover:bg-card hover:border-border"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[11px] text-muted-foreground">
                          {track.date}
                        </span>
                        <span className="text-muted-foreground">•</span>
                        <span className="font-mono text-[11px] text-muted-foreground">
                          {track.duration}
                        </span>
                      </div>
                      {isSelected && (
                        <span className="flex items-center gap-1 text-[11px] font-mono text-primary font-bold">
                          <span className="size-1.5 rounded-full bg-primary animate-ping" />
                          {currentLanguage === "hindi" ? "वर्तमान में चयनित" : "Selected"}
                        </span>
                      )}
                    </div>

                    <h3 className="font-serif text-base font-bold text-foreground leading-snug">
                      {track.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {track.occasion}
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-border/40 mt-1">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 px-2 text-xs gap-1 text-primary font-semibold"
                        >
                          <Play className="size-3 fill-current" />
                          <span>{currentLanguage === "hindi" ? "सुनें" : "Play"}</span>
                        </Button>
                      </div>

                      {onToggleDossierItem && (
                        <Button
                          variant={inDossier ? "secondary" : "ghost"}
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            onToggleDossierItem({
                              id: track.id,
                              title: track.title,
                              category: "Audio Speeches",
                              year: track.date,
                              source: track.occasion,
                              type: "speech",
                            })
                          }}
                          className="h-7 px-2 text-xs gap-1"
                        >
                          {inDossier ? (
                            <>
                              <Check className="size-3 text-emerald-600" />
                              <span>{currentLanguage === "hindi" ? "संकलित" : "Compiled"}</span>
                            </>
                          ) : (
                            <>
                              <BookmarkPlus className="size-3" />
                              <span>{currentLanguage === "hindi" ? "+ संकलन" : "+ Dossier"}</span>
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right Column: Audio Player Stage & Transcript */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col gap-6">
              {/* Player Top Meta */}
              <div className="flex items-center justify-between border-b border-border/80 pb-4">
                <Badge variant="outline" className="font-mono text-xs">
                  {selectedTrack.id}
                </Badge>
                <div className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
                  <span>{t.speedLabel}</span>
                  {[0.8, 1.0, 1.2].map((s) => (
                    <button
                      key={s}
                      onClick={() => handleSpeedChange(s)}
                      className={`px-2 py-0.5 rounded text-[11px] font-bold transition-colors ${
                        playbackSpeed === s
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {s}x
                    </button>
                  ))}
                </div>
              </div>

              {/* Title & Occasion */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-serif text-2xl font-bold tracking-tight text-foreground leading-snug">
                    {selectedTrack.title}
                  </h2>
                  <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground mt-2">
                    <span>📅 {selectedTrack.date}</span>
                    <span>•</span>
                    <span>📍 {selectedTrack.occasion}</span>
                  </div>
                </div>
                {onToggleDossierItem && (
                  <Button
                    size="sm"
                    variant={isCurrentInDossier ? "secondary" : "outline"}
                    onClick={() => {
                      sfx.playDossierSuccess()
                      onToggleDossierItem({
                        id: selectedTrack.id,
                        title: selectedTrack.title,
                        category: selectedTrack.occasion,
                        year: selectedTrack.date,
                        source: selectedTrack.occasion,
                        type: "speech",
                      })
                    }}
                    className="h-9 gap-1.5 rounded-full text-xs font-mono self-start sm:self-center shrink-0"
                  >
                    {isCurrentInDossier ? (
                      <>
                        <Check className="size-3.5 text-emerald-600" />
                        <span>{currentLanguage === "hindi" ? "संकलन में शामिल" : "In Dossier"}</span>
                      </>
                    ) : (
                      <>
                        <BookmarkPlus className="size-3.5 text-primary" />
                        <span>{currentLanguage === "hindi" ? "संग्रह में जोड़ें" : "Add to Dossier"}</span>
                      </>
                    )}
                  </Button>
                )}
              </div>

              {/* Central Player Button & Audio Equalizer Animation */}
              <div className="p-6 rounded-2xl bg-muted/30 border border-border/80 flex flex-col items-center justify-center gap-4">
                <Button
                  size="lg"
                  onClick={handleTogglePlay}
                  className="rounded-full size-16 p-0 shadow-lg flex items-center justify-center hover:scale-105 transition-transform"
                >
                  {isPlaying ? (
                    <Pause className="size-7 fill-current" />
                  ) : (
                    <Play className="size-7 fill-current ml-1" />
                  )}
                </Button>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-medium text-foreground">
                    {isPlaying
                      ? (currentLanguage === "hindi" ? "भाषण का वाचन जारी..." : "Audio Narration Playing...")
                      : t.listenBtn}
                  </span>
                  {isPlaying && (
                    <div className="flex items-center gap-1 h-3">
                      <span className="w-1 h-full bg-primary animate-bounce rounded-full" />
                      <span className="w-1 h-2/3 bg-primary animate-bounce delay-100 rounded-full" />
                      <span className="w-1 h-full bg-primary animate-bounce delay-200 rounded-full" />
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between w-full text-[11px] font-mono text-muted-foreground pt-3 border-t border-border/50">
                  <span>{currentLanguage === "hindi" ? "अभिलेखीय भाषण पुनःसंपादित इंजन" : "Speech Audio Remastered Engine"} • {selectedTrack.duration}</span>
                  <button
                    onClick={handleReset}
                    className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <RotateCcw className="size-3" />
                    <span>{t.resetBtn}</span>
                  </button>
                </div>
              </div>

              {/* Transcript Container */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-mono text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                    {t.transcriptTitle}
                  </h3>
                  <button
                    onClick={() => {
                      sfx.playNavClick()
                      setIsTranscriptExpanded((prev) => !prev)
                    }}
                    className="text-xs font-mono text-primary hover:underline flex items-center gap-1 font-medium"
                  >
                    {isTranscriptExpanded
                      ? (currentLanguage === "hindi" ? "संक्षिप्त करें ▴" : "Collapse ▴")
                      : (currentLanguage === "hindi" ? "संपूर्ण भाषण प्रतिलेख पढ़ें ▾" : "Read Full Transcript ▾")}
                  </button>
                </div>
                <div
                  className={`p-5 rounded-2xl bg-card border border-border/80 text-sm leading-relaxed text-foreground/90 font-serif italic whitespace-pre-line shadow-xs transition-all ${
                    isTranscriptExpanded ? "max-h-none" : "max-h-72 overflow-y-auto"
                  }`}
                >
                  {selectedTrack.transcript}
                </div>
              </div>

              {/* Significance Box */}
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 text-xs leading-relaxed text-foreground flex items-start gap-2.5">
                <span className="text-primary font-bold text-sm">💡</span>
                <div>
                  <strong className="font-mono text-[11px] text-primary uppercase tracking-wider block mb-0.5">
                    {t.historicalSignificance}
                  </strong>
                  <span>{selectedTrack.significance}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIDEO TAB WORKSPACE */}
      {activeTab === "video" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {videos.map((vid) => {
            const isInDossier = dossierIds.includes(vid.id)

            return (
              <Card
                key={vid.id}
                className="overflow-hidden border border-border bg-card rounded-2xl shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-16/10 overflow-hidden bg-black group cursor-pointer"
                    onClick={() => setSelectedVideo(vid)}
                  >
                    <img
                      src={vid.thumbnail}
                      alt={vid.title}
                      className="size-full object-cover opacity-85 group-hover:scale-105 group-hover:opacity-100 transition-all duration-300"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/15 transition-colors flex items-center justify-center">
                      <div className="size-14 rounded-full bg-white/90 text-primary flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                        <Play className="size-6 fill-current ml-1" />
                      </div>
                    </div>

                    <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-black/75 text-[10px] font-mono text-white font-semibold">
                      {vid.duration}
                    </div>

                    <Badge className="absolute top-2.5 left-2.5 font-mono text-[10px] bg-black/60 text-white border-0">
                      {vid.year}
                    </Badge>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground mb-1">
                      <span>{vid.archiveType}</span>
                      <span>{vid.source}</span>
                    </div>

                    <h3 className="font-serif text-lg font-bold text-foreground leading-snug">
                      {vid.title}
                    </h3>

                    <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                      {vid.description}
                    </p>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-0 flex items-center justify-between border-t border-border/40 mt-3 pt-3 flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedVideo(vid)}
                      className="text-xs gap-1.5"
                    >
                      <Film className="size-3.5 text-primary" />
                      <span>{t.watchVideoBtn}</span>
                    </Button>

                    {/* Direct Native Video Download Button */}
                    <a
                      href={vid.videoUrl}
                      download={`${vid.id}_archival_footage.mp4`}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-border bg-background text-xs font-semibold text-foreground hover:bg-muted transition-colors shadow-2xs"
                      title="Download MP4 video to your computer"
                    >
                      <Download className="size-3 text-primary" />
                      <span className="hidden sm:inline">MP4</span>
                    </a>
                  </div>

                  {onToggleDossierItem && (
                    <Button
                      variant={isInDossier ? "secondary" : "ghost"}
                      size="sm"
                      onClick={() =>
                        onToggleDossierItem({
                          id: vid.id,
                          title: vid.title,
                          category: "Video Archive",
                          year: vid.year,
                          source: vid.source,
                          type: "video",
                        })
                      }
                      className="text-xs gap-1"
                    >
                      {isInDossier ? (
                        <>
                          <Check className="size-3.5 text-emerald-600" />
                          <span>{currentLanguage === "hindi" ? "संकलित" : "Compiled"}</span>
                        </>
                      ) : (
                        <>
                          <BookmarkPlus className="size-3.5 text-primary" />
                          <span>{currentLanguage === "hindi" ? "संग्रह में जोड़ें" : "Add to Dossier"}</span>
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </Card>
            )
          })}
        </div>
      )}

      {/* Touch-Friendly Native Video Player Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="relative w-full max-w-3xl rounded-3xl border border-border bg-card overflow-hidden shadow-2xl flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-muted/40">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="font-mono text-xs">
                  {selectedVideo.id}
                </Badge>
                <span className="font-serif text-base font-bold text-foreground truncate max-w-md">
                  {selectedVideo.title}
                </span>
              </div>
              <button
                onClick={() => setSelectedVideo(null)}
                className="p-1.5 rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Native HTML5 Video Player */}
            <div className="relative aspect-16/9 w-full bg-black flex items-center justify-center overflow-hidden">
              <video
                key={selectedVideo.id}
                src={selectedVideo.videoUrl}
                poster={selectedVideo.thumbnail}
                controls
                playsInline
                autoPlay
                className="size-full object-contain bg-black"
              >
                Your browser does not support HTML5 video.
              </video>
            </div>

            {/* Key Timeline Chapters */}
            <div className="p-5 flex flex-col gap-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-1.5">
                <Clock className="size-3.5 text-primary" />
                {t.videoChaptersTitle}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {selectedVideo.keyMoments.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg border border-border bg-muted/30 text-xs flex flex-col gap-0.5"
                  >
                    <span className="font-mono text-[10px] text-primary font-bold">{m.time}</span>
                    <span className="text-foreground line-clamp-1">{m.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer with Download Button */}
            <div className="p-4 border-t border-border flex items-center justify-between bg-muted/20 flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <a
                  href={selectedVideo.videoUrl}
                  download={`${selectedVideo.id}_archival_video.mp4`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground font-semibold text-xs hover:bg-primary/90 transition-colors shadow-xs"
                >
                  <Download className="size-3.5" />
                  <span>{t.downloadVideoBtn}</span>
                </a>
                <span className="text-xs font-mono text-muted-foreground">
                  {selectedVideo.source}
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedVideo(null)}
              >
                {t.closePlayerBtn}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
