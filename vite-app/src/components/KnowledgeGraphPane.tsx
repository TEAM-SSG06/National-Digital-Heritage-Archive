import { useState, useMemo, useRef, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import {
  BookOpen,
  MapPin,
  Sparkles,
  Compass,
  Search,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Volume2,
  VolumeX,
  Layers,
  GitBranch,
  Network,
  RotateCcw,
  ChevronRight,
  ArrowRight,
  Info,
  Crosshair,
} from "lucide-react"
import { getTranslation } from "@/utils/translations"
import { sfx } from "@/utils/soundEffects"

// ── Types & Interfaces ────────────────────────────────────────────────────────
export type NodeCategory =
  | "Constitutional Jurisprudence"
  | "Social Liberation & Rights"
  | "Monetary Economics"
  | "Labour Legislation & Welfare"
  | "Navayana Philosophy"
  | "Global Pedagogy"

export interface KnowledgeNode {
  id: string
  label: string
  shortLabel: string
  category: NodeCategory
  year: number
  city: string
  x: number
  y: number
  icon: string
  archetype: "Treatise" | "Legislation" | "Civil Movement" | "Institution" | "Philosophy"
  quote: string
  summary: string
  significance: string
  connections: string[]
  relatedDocId?: string
  image: string
}

// ── Color System ─────────────────────────────────────────────────────────────
export const CATEGORY_THEMES: Record<
  NodeCategory,
  { primary: string; bg: string; border: string; glow: string; track: string; darkText: string }
> = {
  "Constitutional Jurisprudence": {
    primary: "#3B82F6",
    bg: "#EFF6FF",
    border: "#93C5FD",
    glow: "rgba(59, 130, 246, 0.4)",
    track: "#2563EB",
    darkText: "#1D4ED8",
  },
  "Social Liberation & Rights": {
    primary: "#EF4444",
    bg: "#FEF2F2",
    border: "#FCA5A5",
    glow: "rgba(239, 68, 68, 0.4)",
    track: "#DC2626",
    darkText: "#B91C1C",
  },
  "Monetary Economics": {
    primary: "#10B981",
    bg: "#ECFDF5",
    border: "#6EE7B7",
    glow: "rgba(16, 185, 129, 0.4)",
    track: "#059669",
    darkText: "#047857",
  },
  "Labour Legislation & Welfare": {
    primary: "#F59E0B",
    bg: "#FFFBEB",
    border: "#FCD34D",
    glow: "rgba(245, 158, 11, 0.4)",
    track: "#D97706",
    darkText: "#B45309",
  },
  "Navayana Philosophy": {
    primary: "#8B5CF6",
    bg: "#F5F3FF",
    border: "#C4B5FD",
    glow: "rgba(139, 92, 246, 0.4)",
    track: "#7C3AED",
    darkText: "#6D28D9",
  },
  "Global Pedagogy": {
    primary: "#06B6D4",
    bg: "#ECFEFF",
    border: "#67E8F9",
    glow: "rgba(6, 182, 212, 0.4)",
    track: "#0891B2",
    darkText: "#0e7490",
  },
}

// ── Complete Archival Knowledge Corpus (Coordinates on 1400 x 860 Space) ──────
export const KNOWLEDGE_NODES: KnowledgeNode[] = [
  // Constitutional Jurisprudence (North-West)
  {
    id: "const-draft",
    label: "Drafting the Constitution of India",
    shortLabel: "Drafting Committee",
    category: "Constitutional Jurisprudence",
    year: 1947,
    city: "New Delhi (CAD)",
    x: 420,
    y: 220,
    icon: "Scale",
    archetype: "Legislation",
    quote:
      "However good a Constitution may be, if those who are implementing it are not good, it will prove to be bad. However bad a Constitution may be, if those implementing it are good, it will prove to be good.",
    summary:
      "As Chairman of the Drafting Committee, Ambedkar authored and defended the foundational legal charter of the world's largest democracy, synthesizing universal adult franchise, fundamental liberties, and social democracy.",
    significance:
      "Guaranteed civic equality and outlawed untouchability (Article 17) for hundreds of millions.",
    connections: ["const-art32", "anarchy-warn", "hindu-code", "states-minorities"],
    relatedDocId: "DOC-002",
    image: "/images/ambedkar-constitution-presentation.jpg",
  },
  {
    id: "const-art32",
    label: "Article 32: Heart & Soul of Constitution",
    shortLabel: "Article 32 Writs",
    category: "Constitutional Jurisprudence",
    year: 1948,
    city: "New Delhi",
    x: 230,
    y: 160,
    icon: "Shield",
    archetype: "Legislation",
    quote:
      "If I was asked to name any particular article in this Constitution as the most important—an article without which this Constitution would be a nullity—I could not refer to any other article except Article 32.",
    summary:
      "Empowered every Indian citizen with direct access to the Supreme Court for judicial enforcement of fundamental rights through prerogative writs (Habeas Corpus, Mandamus, Certiorari).",
    significance:
      "Constitutional shield against executive high-handedness and majoritarian infringement.",
    connections: ["const-draft", "states-minorities", "anarchy-warn"],
    relatedDocId: "DOC-002",
    image: "/images/Dr._B._R._Ambedkar_at_Delhi_in_1948.jpg",
  },
  {
    id: "anarchy-warn",
    label: "Grammar of Anarchy & 26 Jan Warning",
    shortLabel: "Grammar of Anarchy",
    category: "Constitutional Jurisprudence",
    year: 1949,
    city: "New Delhi",
    x: 490,
    y: 110,
    icon: "Flame",
    archetype: "Treatise",
    quote:
      "On 26th January 1950, we are going to enter into a life of contradictions. In politics we will have equality and in social and economic life we will have inequality. In politics one man one vote, in society denial of one man one value.",
    summary:
      "Dr. Ambedkar's final Constituent Assembly valedictory speech warning the nation against unconstitutional methods, blind hero-worship (Bhakti) in politics, and preserving political democracy through social democracy.",
    significance:
      "The prophetic intellectual compass for Indian democratic resilience.",
    connections: ["const-draft", "annihilation-caste", "mahad-water"],
    relatedDocId: "DOC-006",
    image: "/images/Dr._Babasaheb_Ambedkar__chairman_of_the_Drafting_Committee__presenting_the_final_draft_of_the_Indian_Constitution_to_Dr._Rajendra_Prasad_on_25_November__1949.jpg",
  },
  {
    id: "states-minorities",
    label: "States and Minorities: State Socialism",
    shortLabel: "States & Minorities",
    category: "Constitutional Jurisprudence",
    year: 1947,
    city: "New Delhi",
    x: 210,
    y: 310,
    icon: "Landmark",
    archetype: "Treatise",
    quote:
      "Key industries shall be owned and run by the State. Agriculture shall be a State industry. The plan has two special features: it proposes State Socialism in important fields of economic life.",
    summary:
      "A visionary constitutional memorandum submitted to the Constituent Assembly proposing state-owned collective agriculture, nationalization of life insurance, and statutory minority rights commissions.",
    significance:
      "Foreshadowed public sector industrialization and social welfare frameworks.",
    connections: ["const-art32", "problem-rupee", "labour-8hr"],
    relatedDocId: "DOC-005",
    image: "/images/Dr._Ambedkar_signing_a_register_-_Closer_view.jpg",
  },
  {
    id: "hindu-code",
    label: "The Hindu Code Bill & Women's Rights",
    shortLabel: "Hindu Code Bill",
    category: "Constitutional Jurisprudence",
    year: 1951,
    city: "New Delhi",
    x: 380,
    y: 360,
    icon: "HeartHandshake",
    archetype: "Legislation",
    quote:
      "I measure the progress of a community by the degree of progress which women have achieved.",
    summary:
      "As independent India's first Law Minister, Ambedkar championed the comprehensive codification of Hindu personal law to grant women equal property inheritance, abolish polygamy, and establish legal divorce rights.",
    significance:
      "He chose to resign from the Nehru cabinet on principle when orthodox resistance stalled the bill.",
    connections: ["const-draft", "annihilation-caste", "maternity-benefit"],
    relatedDocId: "DOC-001",
    image: "/images/Dr._Babasaheb_Ambedkar_being_sworn_in_as_independent_India_s_first_Law_Minister_by_President_Dr._Rajendra_Prasad__Prime_Minister_Jawaharlal_Nehru_looks_on_May_8__1950.jpg",
  },

  // Social Liberation & Rights (South-West)
  {
    id: "annihilation-caste",
    label: "Annihilation of Caste (1936)",
    shortLabel: "Annihilation of Caste",
    category: "Social Liberation & Rights",
    year: 1936,
    city: "Lahore / Bombay",
    x: 390,
    y: 530,
    icon: "BookOpen",
    archetype: "Treatise",
    quote:
      "Democracy is not merely a form of Government. It is primarily a mode of associated living, of conjoint communicated experience. It is essentially an attitude of respect and reverence towards fellowmen.",
    summary:
      "The definitive sociological treatise demonstrating that caste is not a division of labour, but a division of labourers. Ambedkar proved caste could only be demolished by delegitimizing orthodox scripture.",
    significance:
      "Considered one of the most consequential anti-caste works in world literature.",
    connections: ["mahad-water", "poona-pact", "const-draft", "deeksha-nagpur", "columbia-dewey"],
    relatedDocId: "DOC-001",
    image: "/images/Dr_Babasaheb_Ambedkar_reading_a_book.jpg",
  },
  {
    id: "mahad-water",
    label: "Mahad Satyagraha: Water as Human Right",
    shortLabel: "Mahad Water March",
    category: "Social Liberation & Rights",
    year: 1927,
    city: "Mahad, Konkan",
    x: 230,
    y: 480,
    icon: "Users",
    archetype: "Civil Movement",
    quote:
      "We are not going to the Chavdar Tank merely to drink water. We are going to the tank to assert our human rights as equals in society. Water is nature's gift to all living beings equally.",
    summary:
      "On 20 March 1927, Ambedkar led thousands of Dalits to drink from the public Chavadar Tank, inaugurating modern India's first mass civil rights mobilization against ritual untouchability.",
    significance:
      "Established the principle that natural resources are fundamental universal human rights.",
    connections: ["annihilation-caste", "manusmriti-burn", "bahishkrit"],
    relatedDocId: "DOC-004",
    image: "/images/Babasaheb_and_Ramai_02.jpg",
  },
  {
    id: "manusmriti-burn",
    label: "Manusmriti Dahan: Symbolic Liberation",
    shortLabel: "Manusmriti Dahan",
    category: "Social Liberation & Rights",
    year: 1927,
    city: "Mahad, Konkan",
    x: 180,
    y: 630,
    icon: "Flame",
    archetype: "Civil Movement",
    quote:
      "The burning of Manusmriti is a protest against social inequality and injustice enshrined in the code that denies dignity to humans.",
    summary:
      "On 25 December 1927, during the second Mahad conference, Ambedkar and his associates publicly burned the ancient legal code Manusmriti to renounce ritual hierarchy.",
    significance:
      "Celebrated annually as Manusmriti Dahan Divas / Bharatiya Stree Mukti Divas.",
    connections: ["mahad-water", "annihilation-caste"],
    image: "/images/166-babasaheb-ambedkar.jpg",
  },
  {
    id: "kalaram-temple",
    label: "Kalaram Temple Entry Satyagraha",
    shortLabel: "Kalaram Satyagraha",
    category: "Social Liberation & Rights",
    year: 1930,
    city: "Nashik",
    x: 320,
    y: 680,
    icon: "Landmark",
    archetype: "Civil Movement",
    quote:
      "Our struggle is not for temple entry alone. It is for political power, self-respect, and civil dignity.",
    summary:
      "A five-year non-violent campaign mobilizing 15,000 volunteers demanding unrestricted access to the historic Kalaram Temple, demonstrating systemic orthodox bigotry to British authorities.",
    significance:
      "Taught the oppressed classes that religious entry was secondary to sovereign political empowerment.",
    connections: ["mahad-water", "poona-pact"],
    image: "/images/Dr._Babasaheb_Ambedkar_11.jpg",
  },
  {
    id: "bahishkrit",
    label: "Bahishkrit Hitakarini Sabha",
    shortLabel: "Educate, Agitate, Organize",
    category: "Social Liberation & Rights",
    year: 1924,
    city: "Bombay",
    x: 460,
    y: 660,
    icon: "Users",
    archetype: "Institution",
    quote:
      "Educate, Agitate, Organize; Have faith in yourselves; with justice on our side, I do not see how we can lose our battle.",
    summary:
      "Founded by Dr. Ambedkar in Damodar Hall, Parel to promote higher education, open hostels for depressed class youth, and publish independent research periodicals (Bahishkrit Bharat).",
    significance:
      "Gave modern India the immortal rallying slogan: 'Educate, Agitate, Organize'.",
    connections: ["mahad-water", "columbia-dewey"],
    image: "/images/Dr_Babasaheb_Ambedkar__the_Chairman_of_the_People_s_Education_Society_-_Mumbai__in_his_office.__Anand_Bhawan__Fort__Mumbai_.jpg",
  },
  {
    id: "poona-pact",
    label: "Poona Pact & Legislative Representation",
    shortLabel: "Poona Pact 1932",
    category: "Social Liberation & Rights",
    year: 1932,
    city: "Yerwada Jail, Poona",
    x: 520,
    y: 560,
    icon: "Scale",
    archetype: "Legislation",
    quote:
      "I have to safeguard two interests: the general interest of the country and the interest of the Untouchables.",
    summary:
      "Signed with M.K. Gandhi under pressure of the latter's fast unto death, replacing separate electorates with 148 reserved joint legislative seats for Depressed Classes.",
    significance:
      "Created the permanent foundation for political reservations in independent India.",
    connections: ["roundtable-uk", "annihilation-caste"],
    image: "/images/M.R._Jayakar__Tej_Bahadur_Sapru_and_Dr._Babasaheb_Ambedkar_at_Yerwada_jail__in_Poona__on_24_September_1932__the_day_the_Poona_Pact_was_signed.jpg",
  },

  // Monetary Economics (North-East)
  {
    id: "problem-rupee",
    label: "The Problem of the Rupee: DSc Thesis",
    shortLabel: "Problem of the Rupee",
    category: "Monetary Economics",
    year: 1923,
    city: "London School of Economics",
    x: 940,
    y: 220,
    icon: "Landmark",
    archetype: "Treatise",
    quote:
      "A gold bullion standard with controlled paper currency prevents exchange volatility, ensures internal price stability, and protects the purchasing power of the working poor.",
    summary:
      "Ambedkar's seminal D.Sc. dissertation under Edwin Cannan arguing for domestic monetary stabilization over manipulated exchange ratios favored by British colonial exporters.",
    significance:
      "Directly guided the Hilton Young Commission and established his reputation as a world-class monetary economist.",
    connections: ["rbi-genesis", "provincial-finance", "lse-cannan"],
    relatedDocId: "DOC-003",
    image: "/images/Ambedkar_house1.jpg",
  },
  {
    id: "rbi-genesis",
    label: "Hilton Young Testimony & Genesis of RBI",
    shortLabel: "RBI Genesis",
    category: "Monetary Economics",
    year: 1934,
    city: "Calcutta / Bombay",
    x: 1100,
    y: 160,
    icon: "Landmark",
    archetype: "Institution",
    quote:
      "The central bank must maintain exchange stability while serving as the lender of last resort. Sound monetary policy is the bedrock of national prosperity.",
    summary:
      "The Reserve Bank of India Act, 1934 was drafted around the principles, guidelines, and testimony provided by Dr. Ambedkar before the Royal Commission on Indian Currency and Finance (Hilton Young Commission).",
    significance:
      "Intellectual father and foundational architect of the Reserve Bank of India.",
    connections: ["problem-rupee", "states-minorities"],
    relatedDocId: "DOC-003",
    image: "/images/Dr_B_R_Ambedkar_as_Barrister_in_1922.jpg",
  },
  {
    id: "provincial-finance",
    label: "Evolution of Provincial Finance in British India",
    shortLabel: "Provincial Finance",
    category: "Monetary Economics",
    year: 1925,
    city: "Columbia University",
    x: 880,
    y: 120,
    icon: "BookOpen",
    archetype: "Treatise",
    quote:
      "Fiscal federalism requires clear devolution of revenue streams between center and provinces to avoid administrative friction and fiscal starvation.",
    summary:
      "Ambedkar's PhD dissertation dissecting financial decentralization from 1833 to 1919. It provided the conceptual blueprint for India's Finance Commission and federal devolution.",
    significance:
      "Foundational document for federal fiscal architecture in modern India.",
    connections: ["columbia-dewey", "problem-rupee"],
    image: "/images/Dr._Babasaheb_Ambedkar_in_Columbia_University.jpg",
  },
  {
    id: "small-holdings",
    label: "Small Holdings in India and Their Remedies",
    shortLabel: "Small Holdings",
    category: "Monetary Economics",
    year: 1918,
    city: "Bombay",
    x: 1140,
    y: 280,
    icon: "Scale",
    archetype: "Treatise",
    quote:
      "The remedy for fragmented agricultural holdings is not merely consolidation of land, but rapid industrialization to absorb surplus rural labor.",
    summary:
      "Ambedkar's early paper in the Journal of the Indian Economic Society analyzing agrarian distress, disguised unemployment, and proposing state-led industrialization as the cure for farm poverty.",
    significance:
      "Early articulation of structural transformation decades ahead of Arthur Lewis.",
    connections: ["damodar-valley", "labour-8hr"],
    image: "/images/Dr._Babasaheb_Ambedkar_02.jpg",
  },

  // Labour Legislation & Welfare (South-East)
  {
    id: "labour-8hr",
    label: "8-Hour Workday Act & Tripartite Council",
    shortLabel: "8-Hour Workday",
    category: "Labour Legislation & Welfare",
    year: 1942,
    city: "New Delhi",
    x: 960,
    y: 520,
    icon: "Users",
    archetype: "Legislation",
    quote:
      "Labour must have a voice in the government. The reduction of working hours from 12 to 8 is not a concession, but an absolute necessity for civil life and mental development.",
    summary:
      "As Labour Member in the Viceroy's Executive Council (1942–46), Ambedkar officially reduced factory working hours from 12 to 8 at the 7th Indian Labour Conference in New Delhi.",
    significance:
      "Set the universal labor work standard across India that endures to this day.",
    connections: ["maternity-benefit", "esi-insurance", "damodar-valley", "states-minorities"],
    image: "/images/Dr._Babasaheb_Ambedkar_14.jpg",
  },
  {
    id: "maternity-benefit",
    label: "Mandatory Maternity Benefits Act",
    shortLabel: "Maternity Benefits",
    category: "Labour Legislation & Welfare",
    year: 1942,
    city: "New Delhi",
    x: 1140,
    y: 490,
    icon: "HeartHandshake",
    archetype: "Legislation",
    quote:
      "It is in the interest of the nation that the mother should be protected before and after confinement. We must ensure social justice for working women.",
    summary:
      "Ambedkar drafted and passed the Mines Maternity Benefit Act and promoted nationwide statutory maternity leaves and equal pay for equal work for female industrial workers.",
    significance:
      "First national-level social security safety net for women workers in South Asia.",
    connections: ["labour-8hr", "hindu-code", "esi-insurance"],
    image: "/images/Dr._B.R._Ambedkar_with_wife_Dr._Savita_Ambedkar_in_1948.jpg",
  },
  {
    id: "esi-insurance",
    label: "Employees' State Insurance (ESI) Act",
    shortLabel: "ESI Healthcare",
    category: "Labour Legislation & Welfare",
    year: 1943,
    city: "New Delhi",
    x: 1140,
    y: 640,
    icon: "Shield",
    archetype: "Institution",
    quote:
      "A comprehensive insurance scheme against sickness, disablement, and death is fundamental to industrial efficiency and humane civilization.",
    summary:
      "Ambedkar instituted the Workmen's Health Insurance scheme under Prof. Adarkar's committee, which blossomed into the Employees' State Insurance Act (ESI) of 1948.",
    significance:
      "Protects tens of millions of organized workers with comprehensive medical care today.",
    connections: ["labour-8hr", "maternity-benefit"],
    image: "/images/Dr._Babasaheb_Ambedkar_08.jpg",
  },
  {
    id: "damodar-valley",
    label: "National Water Grid & Damodar Valley Corporation",
    shortLabel: "Damodar Valley (DVC)",
    category: "Labour Legislation & Welfare",
    year: 1944,
    city: "Central Waterways",
    x: 970,
    y: 670,
    icon: "Landmark",
    archetype: "Institution",
    quote:
      "Water is national wealth. Multi-purpose river valley projects should produce electricity, prevent floods, and irrigate parched soil.",
    summary:
      "Ambedkar founded the Central Waterways, Irrigation and Navigation Commission (CWINC) and conceived the Damodar Valley Corporation, Hirakud, and Sone River Valley projects.",
    significance:
      "Father of India's multi-purpose river valley development and electricity grid planning.",
    connections: ["small-holdings", "labour-8hr"],
    image: "/images/Dr._Babasaheb_Ambedkar_12.jpg",
  },

  // Navayana Philosophy (Bottom-Center)
  {
    id: "deeksha-nagpur",
    label: "Deekshabhoomi Nagpur: Dhamma Diksha",
    shortLabel: "Deekshabhoomi 1956",
    category: "Navayana Philosophy",
    year: 1956,
    city: "Nagpur, Maharashtra",
    x: 700,
    y: 640,
    icon: "Sparkles",
    archetype: "Civil Movement",
    quote:
      "I was born a Hindu, but I solemnly assure you I will not die as a Hindu. By embracing Buddhism, I have entered a new life of freedom, morality, and enlightenment.",
    summary:
      "On 14 October 1956, Ambedkar embraced Navayana Buddhism along with approximately 500,000 followers, conducting the largest peaceful mass conversion to ethical rationalism in world history.",
    significance:
      "Reborn as modern Bodhisattva; sparked the Buddhist renaissance in India.",
    connections: ["buddha-dhamma", "twenty-two-vows", "annihilation-caste"],
    image: "/images/Dr._Ambedkar_delivering_speech_during_conversion.jpg",
  },
  {
    id: "buddha-dhamma",
    label: "The Buddha and His Dhamma",
    shortLabel: "The Buddha & Dhamma",
    category: "Navayana Philosophy",
    year: 1956,
    city: "Delhi / Bombay",
    x: 610,
    y: 740,
    icon: "BookOpen",
    archetype: "Treatise",
    quote:
      "Religion must remain in the realm of morality. Dhamma is morality—not rituals, prayers, or sacrifices. Its purpose is to reconstruct the world in righteousness, fraternity, and compassion.",
    summary:
      "Ambedkar's magnum opus completing his lifelong philosophical quest: a rationalist, humanist interpretation of the Buddha's teachings as a social gospel of liberty, equality, and fraternity.",
    significance:
      "The sacred philosophical text for tens of millions in the Navayana Buddhist tradition.",
    connections: ["deeksha-nagpur", "twenty-two-vows"],
    image: "/images/Bhimrao_Ambedkar_image_and_Navayana_Buddhist_worship_at_Kanheri_caves_Mumbai.jpg",
  },
  {
    id: "twenty-two-vows",
    label: "The 22 Vows of Social & Moral Liberation",
    shortLabel: "The 22 Vows",
    category: "Navayana Philosophy",
    year: 1956,
    city: "Nagpur",
    x: 790,
    y: 740,
    icon: "Shield",
    archetype: "Philosophy",
    quote:
      "I shall believe in equality of all human beings. I shall endeavor to establish equality. I shall follow the Noble Eightfold Path of the Buddha.",
    summary:
      "Twenty-two specific ethical declarations administered by Dr. Ambedkar to his followers at Deekshabhoomi to dismantle superstitious rituals, caste discrimination, and establish rationalist humanism.",
    significance:
      "Charter of spiritual liberation and ethical renaissance for marginalized communities.",
    connections: ["deeksha-nagpur", "buddha-dhamma"],
    image: "/images/People_paying_tribute_at_the_central_statue_of_Bodhisattva_Babasaheb_Ambedkar_in_Dr._Babasaheb_Ambedkar_Marathwada_University__India.png",
  },

  // Global Pedagogy & Scholar Lineage (Top-Center)
  {
    id: "columbia-dewey",
    label: "Columbia University & John Dewey",
    shortLabel: "Columbia (Dewey)",
    category: "Global Pedagogy",
    year: 1913,
    city: "New York City",
    x: 630,
    y: 140,
    icon: "GraduationCap",
    archetype: "Institution",
    quote:
      "My student days at Columbia were a revelation. John Dewey taught me that democracy is not a form of government, but a mode of associated living.",
    summary:
      "Ambedkar studied economics, sociology, and philosophy at Columbia (1913–1916). Mentored by pragmatist philosopher John Dewey and Edwin Seligman, he absorbed the empirical method.",
    significance:
      "Shaped his lifelong definition of social democracy as conjoint communicated experience.",
    connections: ["provincial-finance", "annihilation-caste", "lse-cannan"],
    image: "/images/Dr._Babasaheb_Ambedkar_in_Columbia_University.jpg",
  },
  {
    id: "lse-cannan",
    label: "London School of Economics & Gray's Inn",
    shortLabel: "LSE & Gray's Inn",
    category: "Global Pedagogy",
    year: 1916,
    city: "London",
    x: 770,
    y: 140,
    icon: "GraduationCap",
    archetype: "Institution",
    quote:
      "I passed my days in the library from morning till closing time, consuming knowledge that would arm me for the liberation of my people.",
    summary:
      "Earning his M.Sc., D.Sc. in economics under Edwin Cannan, and called to the Bar at Gray's Inn. He combined British common law mastery with rigorous monetary econometrics.",
    significance:
      "One of the few scholars in world history to hold doctorates from both Columbia and LSE.",
    connections: ["problem-rupee", "roundtable-uk", "columbia-dewey"],
    image: "/images/Dr._B._R._Ambedkar_with_his_professors_and_friends_from_the_London_School_of_Economics_and_Political_Science__1916-17.jpg",
  },
  {
    id: "roundtable-uk",
    label: "Round Table Conferences (1930–1932)",
    shortLabel: "Round Table UK",
    category: "Global Pedagogy",
    year: 1930,
    city: "St. James's Palace, London",
    x: 700,
    y: 250,
    icon: "Landmark",
    archetype: "Legislation",
    quote:
      "We want our right to govern ourselves. We want our freedom as much as any other class in this country.",
    summary:
      "Ambedkar represented the Depressed Classes at all three Round Table Conferences in London, asserting their independent political identity on the global stage before British statesmen.",
    significance:
      "Secured the Communal Award and compelled the British Empire to recognize Dalit franchise.",
    connections: ["poona-pact", "lse-cannan"],
    image: "/images/Ambedkar_Barrister.jpg",
  },
]

// ── Connecting Arcs Generator ────────────────────────────────────────────────
interface ArteryEdge {
  id: string
  source: KnowledgeNode
  target: KnowledgeNode
  category: NodeCategory
}

function buildArteries(): ArteryEdge[] {
  const edges: ArteryEdge[] = []
  const seen = new Set<string>()

  KNOWLEDGE_NODES.forEach((source) => {
    source.connections.forEach((targetId) => {
      const pairKey = [source.id, targetId].sort().join("--")
      if (seen.has(pairKey)) return
      seen.add(pairKey)

      const target = KNOWLEDGE_NODES.find((n) => n.id === targetId)
      if (target) {
        edges.push({
          id: pairKey,
          source,
          target,
          category: source.category,
        })
      }
    })
  })
  return edges
}

// ── Subway / Transit Line Stations Data ──────────────────────────────────────
const TRANSIT_LINES: {
  category: NodeCategory
  label: string
  nodeIds: string[]
}[] = [
  {
    category: "Constitutional Jurisprudence",
    label: "Blue Line • Sovereign Constitution & Law",
    nodeIds: ["states-minorities", "const-draft", "const-art32", "anarchy-warn", "hindu-code"],
  },
  {
    category: "Social Liberation & Rights",
    label: "Red Line • Civil Rights & Caste Annihilation",
    nodeIds: ["bahishkrit", "mahad-water", "manusmriti-burn", "kalaram-temple", "poona-pact", "annihilation-caste"],
  },
  {
    category: "Monetary Economics",
    label: "Green Line • Monetary Policy & Central Bank",
    nodeIds: ["small-holdings", "provincial-finance", "problem-rupee", "rbi-genesis"],
  },
  {
    category: "Labour Legislation & Welfare",
    label: "Amber Line • Labor Rights & River Valleys",
    nodeIds: ["labour-8hr", "maternity-benefit", "esi-insurance", "damodar-valley"],
  },
  {
    category: "Navayana Philosophy",
    label: "Purple Line • Dhamma & Moral Renaissance",
    nodeIds: ["annihilation-caste", "deeksha-nagpur", "buddha-dhamma", "twenty-two-vows"],
  },
]

interface KnowledgeGraphPaneProps {
  onOpenDocument: (docId: string) => void
  currentLanguage?: string
}

export function KnowledgeGraphPane({
  onOpenDocument,
  currentLanguage = "english",
}: KnowledgeGraphPaneProps) {
  const t = getTranslation(currentLanguage)

  // ── States ──────────────────────────────────────────────────────────────────
  const [selectedId, setSelectedId] = useState<string>("const-draft")
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [filterCategory, setFilterCategory] = useState<string>("All")
  const [viewMode, setViewMode] = useState<"atlas" | "transit" | "matrix">("atlas")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false)

  // Canvas Pan & Zoom
  const [zoom, setZoom] = useState<number>(0.92)
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const canvasRef = useRef<HTMLDivElement>(null)

  // Sound & Speech
  const audioSpeechRef = useRef<SpeechSynthesisUtterance | null>(null)

  // Precomputed edges
  const arteries = useMemo(() => buildArteries(), [])

  // Selected Node Object
  const activeNode = useMemo(() => {
    return KNOWLEDGE_NODES.find((n) => n.id === selectedId) || KNOWLEDGE_NODES[0]
  }, [selectedId])

  // Filtered nodes
  const visibleNodes = useMemo(() => {
    let list = KNOWLEDGE_NODES
    if (filterCategory !== "All") {
      list = list.filter((n) => n.category === filterCategory)
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      list = list.filter(
        (n) =>
          n.label.toLowerCase().includes(q) ||
          n.shortLabel.toLowerCase().includes(q) ||
          n.summary.toLowerCase().includes(q) ||
          String(n.year).includes(q) ||
          n.city.toLowerCase().includes(q)
      )
    }
    return list
  }, [filterCategory, searchQuery])

  // Select node cleanly without jarring canvas displacement
  const handleSelectNode = useCallback(
    (node: KnowledgeNode, centerView: boolean = false) => {
      sfx.playMilestoneSelect()
      setSelectedId(node.id)

      if (centerView && canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect()
        const svgScreenScale = rect.width / 1400
        const targetPanX = (700 - node.x) * svgScreenScale * zoom
        const targetPanY = (430 - node.y) * svgScreenScale * zoom
        setPan({ x: targetPanX, y: targetPanY })
      }
    },
    [zoom]
  )

  // Reset Viewport
  const resetViewport = () => {
    sfx.playNavClick()
    setZoom(0.88)
    setPan({ x: 0, y: 0 })
  }

  // Zoom Helpers
  const handleZoom = (delta: number) => {
    sfx.playNavClick()
    setZoom((prev) => Math.min(Math.max(parseFloat((prev + delta).toFixed(2)), 0.5), 1.8))
  }

  const hasMovedRef = useRef<boolean>(false)

  // Pan interaction (Mouse)
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return
    const target = e.target as HTMLElement
    if (target.closest("[data-node-interactive]")) return
    setIsDragging(true)
    hasMovedRef.current = false
    dragStartRef.current = { x: e.clientX - pan.x, y: e.clientY - pan.y }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    const dx = e.clientX - (dragStartRef.current.x + pan.x)
    const dy = e.clientY - (dragStartRef.current.y + pan.y)
    if (Math.hypot(dx, dy) > 4) {
      hasMovedRef.current = true
    }
    setPan({
      x: e.clientX - dragStartRef.current.x,
      y: e.clientY - dragStartRef.current.y,
    })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Pan interaction (Touch)
  const handleTouchStart = (e: React.TouchEvent) => {
    const target = e.target as HTMLElement
    if (target.closest("[data-node-interactive]")) return
    if (e.touches.length === 1) {
      setIsDragging(true)
      hasMovedRef.current = false
      const touch = e.touches[0]
      dragStartRef.current = { x: touch.clientX - pan.x, y: touch.clientY - pan.y }
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return
    const touch = e.touches[0]
    setPan({
      x: touch.clientX - dragStartRef.current.x,
      y: touch.clientY - dragStartRef.current.y,
    })
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  // Smooth mouse wheel zoom over canvas
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    const delta = e.deltaY < 0 ? 0.08 : -0.08
    setZoom((prev) => Math.min(Math.max(parseFloat((prev + delta).toFixed(2)), 0.5), 1.8))
  }

  // Speech Narration
  const toggleSpeechNarration = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return

    if (isSpeaking) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
      sfx.playNavClick()
      return
    }

    window.speechSynthesis.cancel()
    sfx.playNavClick()

    const textToSpeak = `${activeNode.label}. Year ${activeNode.year}. Historical dictum: "${activeNode.quote}". Significance: ${activeNode.significance}`
    const utterance = new SpeechSynthesisUtterance(textToSpeak)
    utterance.rate = 0.95
    utterance.pitch = 1.0

    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)

    audioSpeechRef.current = utterance
    setIsSpeaking(true)
    window.speechSynthesis.speak(utterance)
  }

  // Stop speech on node change
  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
    }
  }, [selectedId])

  // Category List with Counts
  const categories: { label: string; count: number }[] = useMemo(() => {
    const counts: Record<string, number> = {}
    KNOWLEDGE_NODES.forEach((n) => {
      counts[n.category] = (counts[n.category] || 0) + 1
    })
    return [
      { label: "All", count: KNOWLEDGE_NODES.length },
      ...Object.keys(CATEGORY_THEMES).map((cat) => ({
        label: cat,
        count: counts[cat] || 0,
      })),
    ]
  }, [])

  return (
    <div className="flex flex-col gap-5 py-4">
      {/* ── Cartographic Header & Master Controls ───────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="flex h-2.5 w-2.5 rounded-full bg-blue-600 animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-wider text-blue-700 font-semibold flex items-center gap-1.5">
                <Compass className="size-3.5" />
                {t.mapBadge || "Intellectual Cartography & Concept Atlas"}
              </span>
              <span className="text-slate-300">•</span>
              <span className="font-mono text-xs text-slate-500 font-medium">
                1891–1956 • 24 Pivotal Ideas
              </span>
            </div>
            <h1 className="font-serif text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
              {t.mapTitle || "Ambedkar Knowledge Atlas"}
            </h1>
            <p className="mt-1 text-xs md:text-sm text-slate-600 max-w-3xl leading-relaxed">
              An interactive cartography of Dr. B. R. Ambedkar's foundational ideas, constitutional
              doctrines, economic theses, civil rights satyagrahas, and moral philosophy. Explore
              the neural pathways linking his seminal contributions to modern civilization.
            </p>
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl border border-slate-200 shrink-0 self-start lg:self-center">
            <button
              onClick={() => {
                sfx.playNavClick()
                setViewMode("atlas")
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === "atlas"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Network className="size-3.5 text-blue-600" />
              <span>Constellation Atlas</span>
            </button>
            <button
              onClick={() => {
                sfx.playNavClick()
                setViewMode("transit")
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === "transit"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <GitBranch className="size-3.5 text-emerald-600" />
              <span>Ideological Lineage</span>
            </button>
            <button
              onClick={() => {
                sfx.playNavClick()
                setViewMode("matrix")
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === "matrix"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Layers className="size-3.5 text-purple-600" />
              <span>Domain Matrix</span>
            </button>
          </div>
        </div>

        {/* Search & Domain Filter Bar */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Domain Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            {categories.map((cat) => {
              const theme =
                cat.label === "All"
                  ? { primary: "#0F172A", bg: "#F1F5F9", border: "#CBD5E1" }
                  : CATEGORY_THEMES[cat.label as NodeCategory]
              const isSelected = filterCategory === cat.label

              return (
                <button
                  key={cat.label}
                  onClick={() => {
                    sfx.playNavClick()
                    setFilterCategory(cat.label)
                  }}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-all border shrink-0 ${
                    isSelected
                      ? "text-white shadow-xs"
                      : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                  style={
                    isSelected
                      ? {
                          backgroundColor: theme.primary,
                          borderColor: theme.primary,
                        }
                      : {}
                  }
                >
                  {cat.label !== "All" && (
                    <span
                      className="size-2 rounded-full shrink-0"
                      style={{ backgroundColor: theme.primary }}
                    />
                  )}
                  <span>{cat.label === "All" ? t.mapAllLocations || "All Domains" : cat.label}</span>
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                      isSelected ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Quick Concept Jump Search */}
          <div className="relative min-w-[240px] md:w-72">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Jump to concept (e.g. Article 32, Rupee)..."
              className="w-full pl-8 pr-3 py-1.5 bg-slate-50 hover:bg-white focus:bg-white rounded-xl border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all font-sans"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Main Display Workspace (Grid: 8 Cols Map/Canvas + 4 Cols Deep Inspector) ── */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
        {/* VIEW MODE 1: Interactive Constellation Atlas */}
        {viewMode === "atlas" && (
          <div
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onWheel={handleWheel}
            className={`xl:col-span-8 rounded-2xl overflow-hidden border border-slate-200 bg-[#FAF8F5] relative shadow-md select-none touch-none ${
              isDragging ? "cursor-grabbing" : "cursor-grab"
            }`}
            style={{ height: 640 }}
          >
            {/* Top Toolbar overlay on Canvas */}
            <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
              {/* Compass Coordinate Badge */}
              <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200/80 shadow-xs pointer-events-auto flex items-center gap-2">
                <Compass className="size-3.5 text-blue-600 animate-spin-slow" />
                <span className="font-mono text-[10px] font-semibold text-slate-700 tracking-wider">
                  CANVAS: 1400×860 • ZOOM: {Math.round(zoom * 100)}%
                </span>
                <span className="text-slate-300">|</span>
                <span className="text-[10px] text-slate-500 font-medium">
                  {visibleNodes.length} Concepts Active
                </span>
              </div>

              {/* Navigation Tools */}
              <div className="flex items-center gap-1 bg-white/90 backdrop-blur-md p-1 rounded-xl border border-slate-200/80 shadow-xs pointer-events-auto">
                <button
                  onClick={() => handleZoom(0.12)}
                  title="Zoom In"
                  className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors"
                >
                  <ZoomIn className="size-3.5" />
                </button>
                <button
                  onClick={() => handleZoom(-0.12)}
                  title="Zoom Out"
                  className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors"
                >
                  <ZoomOut className="size-3.5" />
                </button>
                <button
                  onClick={resetViewport}
                  title="Reset View"
                  className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors"
                >
                  <RotateCcw className="size-3.5" />
                </button>
              </div>
            </div>

            {/* Interactive SVG Canvas Layer */}
            <svg
              className="w-full h-full absolute inset-0"
              style={{
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                transformOrigin: "center center",
                transition: isDragging ? "none" : "transform 0.15s ease-out",
              }}
              viewBox="0 0 1400 860"
            >
              <defs>
                {/* Subtle Dotted Grid */}
                <pattern id="archivalGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path
                    d="M 40 0 L 0 0 0 40"
                    fill="none"
                    stroke="#E2E8F0"
                    strokeWidth="0.75"
                    strokeDasharray="2 3"
                  />
                  <circle cx="0" cy="0" r="1.2" fill="#CBD5E1" />
                </pattern>

                {/* Central Radial Gradient */}
                <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.12" />
                  <stop offset="60%" stopColor="#6366F1" stopOpacity="0.04" />
                  <stop offset="100%" stopColor="#FAF8F5" stopOpacity="0" />
                </radialGradient>

                {/* Glow Filter for Active Edges */}
                <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Background Grid */}
              <rect width="1400" height="860" fill="url(#archivalGrid)" />

              {/* Quadrant / Domain Boundary Guide Rings */}
              <g opacity="0.6">
                <circle cx="700" cy="430" r="160" fill="none" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="4 6" />
                <circle cx="700" cy="430" r="320" fill="none" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="4 6" />
                <circle cx="700" cy="430" r="480" fill="none" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="6 8" />
                <circle cx="700" cy="430" r="320" fill="url(#centerGlow)" />

                {/* Major Cardinal Lines */}
                <line x1="700" y1="40" x2="700" y2="820" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="2 4" />
                <line x1="60" y1="430" x2="1340" y2="430" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="2 4" />

                {/* Quadrant Watermark Labels */}
                <text x="180" y="70" fill="#94A3B8" fontSize="11" fontFamily="monospace" fontWeight="600" letterSpacing="2">
                  QUADRANT I • CONSTITUTIONAL JURISPRUDENCE
                </text>
                <text x="180" y="800" fill="#94A3B8" fontSize="11" fontFamily="monospace" fontWeight="600" letterSpacing="2">
                  QUADRANT II • SOCIAL LIBERATION & RIGHTS
                </text>
                <text x="880" y="70" fill="#94A3B8" fontSize="11" fontFamily="monospace" fontWeight="600" letterSpacing="2">
                  QUADRANT III • MONETARY ARCHITECTURE
                </text>
                <text x="880" y="800" fill="#94A3B8" fontSize="11" fontFamily="monospace" fontWeight="600" letterSpacing="2">
                  QUADRANT IV • LABOUR & MORAL RENAISSANCE
                </text>
              </g>

              {/* Arteries / Connections Layer */}
              <g className="arteries-layer">
                {arteries.map((edge) => {
                  const isSourceVisible = visibleNodes.some((n) => n.id === edge.source.id)
                  const isTargetVisible = visibleNodes.some((n) => n.id === edge.target.id)
                  if (!isSourceVisible || !isTargetVisible) return null

                  const isConnectedToSelected =
                    activeNode.id === edge.source.id || activeNode.id === edge.target.id
                  const isConnectedToHovered =
                    hoveredId === edge.source.id || hoveredId === edge.target.id
                  const isHighlighted = isConnectedToSelected || isConnectedToHovered

                  // Curved quadratic bezier pathway
                  const dx = edge.target.x - edge.source.x
                  const dy = edge.target.y - edge.source.y
                  const cx = (edge.source.x + edge.target.x) / 2 - dy * 0.15
                  const cy = (edge.source.y + edge.target.y) / 2 + dx * 0.15

                  const theme = CATEGORY_THEMES[edge.category]

                  return (
                    <path
                      key={edge.id}
                      d={`M ${edge.source.x} ${edge.source.y} Q ${cx} ${cy} ${edge.target.x} ${edge.target.y}`}
                      fill="none"
                      stroke={isHighlighted ? theme.primary : "#CBD5E1"}
                      strokeWidth={isHighlighted ? 3 : 1.25}
                      strokeOpacity={isHighlighted ? 0.9 : 0.4}
                      strokeDasharray={isHighlighted ? "8 4" : "4 4"}
                      filter={isHighlighted ? "url(#glowEffect)" : undefined}
                      className={isHighlighted ? "animate-flow-dash transition-all duration-300" : "transition-all duration-300"}
                    />
                  )
                })}
              </g>

              {/* Central Nucleus Node: Babasaheb Dr. B. R. Ambedkar */}
              <g
                transform="translate(700, 430)"
                className="cursor-pointer"
                onClick={() => {
                  sfx.playNavClick()
                  setSelectedId("const-draft")
                }}
              >
                <circle r="48" fill="#FFFFFF" stroke="#3B82F6" strokeWidth="2.5" />
                <circle r="56" fill="none" stroke="#3B82F6" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" className="animate-spin-slow" />
                <circle r="68" fill="none" stroke="#60A5FA" strokeWidth="0.75" strokeDasharray="6 6" opacity="0.3" />

                {/* Central Portrait clip */}
                <clipPath id="centerPortraitClip">
                  <circle r="40" cx="0" cy="0" />
                </clipPath>
                <image
                  href="/images/ambedkar-portrait.jpg"
                  x="-40"
                  y="-40"
                  width="80"
                  height="80"
                  clipPath="url(#centerPortraitClip)"
                  preserveAspectRatio="xMidYMid slice"
                />

                {/* Center Label pill */}
                <g transform="translate(0, 58)">
                  <rect
                    x="-90"
                    y="0"
                    width="180"
                    height="24"
                    rx="12"
                    fill="#0F172A"
                    stroke="#3B82F6"
                    strokeWidth="1.5"
                  />
                  <text
                    x="0"
                    y="15"
                    fill="#FFFFFF"
                    fontSize="10"
                    fontWeight="700"
                    textAnchor="middle"
                    fontFamily="inherit"
                  >
                    Dr. B. R. AMBEDKAR
                  </text>
                </g>
              </g>

              {/* Knowledge Nodes Layer */}
              <g className="nodes-layer">
                {visibleNodes.map((node) => {
                  const isSelected = activeNode.id === node.id
                  const isHovered = hoveredId === node.id
                  const isConnected =
                    activeNode.connections.includes(node.id) ||
                    (hoveredId && KNOWLEDGE_NODES.find((n) => n.id === hoveredId)?.connections.includes(node.id))

                  const theme = CATEGORY_THEMES[node.category]

                  return (
                    <g
                      key={node.id}
                      data-node-interactive="true"
                      transform={`translate(${node.x}, ${node.y})`}
                      className="cursor-pointer group"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleSelectNode(node, false)
                      }}
                      onMouseEnter={() => setHoveredId(node.id)}
                      onMouseLeave={() => setHoveredId(null)}
                    >
                      {/* Generous invisible hit target for effortless clicking & tapping */}
                      <circle r="42" fill="transparent" pointerEvents="all" />
                      {/* Pulse Ring when Selected */}
                      {isSelected && (
                        <circle
                          r="32"
                          fill="none"
                          stroke={theme.primary}
                          strokeWidth="2"
                          opacity="0.8"
                          className="animate-ping"
                        />
                      )}

                      {/* Halo aura */}
                      {(isSelected || isHovered) && (
                        <circle
                          r="28"
                          fill={theme.glow}
                          opacity="0.6"
                          filter="url(#glowEffect)"
                        />
                      )}

                      {/* Outer Base Circle */}
                      <circle
                        r={isSelected ? 22 : 18}
                        fill="#FFFFFF"
                        stroke={isSelected ? theme.primary : isConnected ? theme.border : "#CBD5E1"}
                        strokeWidth={isSelected ? 3 : 2}
                        className="transition-all duration-200"
                      />

                      {/* Inner Category Dot / Fill */}
                      <circle
                        r={isSelected ? 14 : 11}
                        fill={theme.primary}
                        opacity={isSelected ? 1 : 0.9}
                      />

                      {/* White Center Pip */}
                      <circle r={isSelected ? 5 : 3.5} fill="#FFFFFF" />

                      {/* Year Badge */}
                      <g transform="translate(0, -26)">
                        <rect
                          x="-22"
                          y="-8"
                          width="44"
                          height="16"
                          rx="8"
                          fill={isSelected ? theme.primary : "#FFFFFF"}
                          stroke={theme.primary}
                          strokeWidth="1"
                        />
                        <text
                          x="0"
                          y="4"
                          fill={isSelected ? "#FFFFFF" : theme.darkText}
                          fontSize="9"
                          fontWeight="700"
                          fontFamily="monospace"
                          textAnchor="middle"
                        >
                          {node.year}
                        </text>
                      </g>

                      {/* Title Label Card below Node */}
                      <g transform="translate(0, 24)">
                        <rect
                          x="-65"
                          y="0"
                          width="130"
                          height="22"
                          rx="6"
                          fill={isSelected ? "#0F172A" : "#FFFFFF"}
                          stroke={isSelected ? theme.primary : "#E2E8F0"}
                          strokeWidth={isSelected ? 1.5 : 1}
                          filter="drop-shadow(0 2px 4px rgba(0,0,0,0.06))"
                        />
                        <text
                          x="0"
                          y="14"
                          fill={isSelected ? "#FFFFFF" : "#1E293B"}
                          fontSize="10"
                          fontWeight={isSelected ? "700" : "600"}
                          textAnchor="middle"
                          fontFamily="inherit"
                        >
                          {node.shortLabel}
                        </text>
                      </g>
                    </g>
                  )
                })}
              </g>
            </svg>

            {/* Bottom-left Mini-Radar / Legend */}
            <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md p-2.5 rounded-xl border border-slate-200 shadow-xs pointer-events-auto flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-[11px] text-slate-600 font-medium">
                <span className="size-2 rounded-full bg-blue-500" />
                <span>Drag to Pan</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-600 font-medium">
                <span className="size-2 rounded-full bg-emerald-500" />
                <span>Scroll to Zoom</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-600 font-medium">
                <span className="size-2 rounded-full bg-purple-500" />
                <span>Click Concept to Inspect</span>
              </div>
            </div>
          </div>
        )}

        {/* VIEW MODE 2: Ideological Lineage Transit Scheme */}
        {viewMode === "transit" && (
          <div
            className="xl:col-span-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-md overflow-y-auto"
            style={{ minHeight: 640 }}
          >
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-1">
                <GitBranch className="size-4 text-emerald-600" />
                <h3 className="font-serif text-lg font-bold text-slate-900">
                  Ideological Transit Lineage (1913–1956)
                </h3>
              </div>
              <p className="text-xs text-slate-500">
                A schematic transit-map tracing how core theoretical disciplines evolved in parallel
                stations from Dr. Ambedkar's student days to the Constitution and moral conversion.
              </p>
            </div>

            <div className="flex flex-col gap-6">
              {TRANSIT_LINES.map((line) => {
                const theme = CATEGORY_THEMES[line.category]
                const lineNodes = line.nodeIds
                  .map((id) => KNOWLEDGE_NODES.find((n) => n.id === id))
                  .filter(Boolean) as KnowledgeNode[]

                return (
                  <div
                    key={line.label}
                    className="p-4 rounded-xl border bg-slate-50/60"
                    style={{ borderColor: theme.border }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span
                          className="size-3 rounded-full"
                          style={{ backgroundColor: theme.primary }}
                        />
                        <h4
                          className="text-xs font-bold font-mono uppercase tracking-wider"
                          style={{ color: theme.darkText }}
                        >
                          {line.label}
                        </h4>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                        {lineNodes.length} Stations
                      </span>
                    </div>

                    {/* Subway Line Track with Station Nodes */}
                    <div className="relative pt-3 pb-2 overflow-x-auto">
                      {/* Connecting Line Track */}
                      <div
                        className="absolute top-7 left-4 right-4 h-1.5 rounded-full"
                        style={{ backgroundColor: theme.track }}
                      />

                      <div className="relative z-10 flex items-start justify-between min-w-[580px] gap-3">
                        {lineNodes.map((node) => {
                          const isSelected = activeNode.id === node.id
                          return (
                            <button
                              key={node.id}
                              onClick={() => {
                                sfx.playMilestoneSelect()
                                setSelectedId(node.id)
                              }}
                              className="flex flex-col items-center text-center group focus:outline-none"
                              style={{ width: 110 }}
                            >
                              <div
                                className={`size-7 rounded-full border-2 bg-white flex items-center justify-center font-mono text-[9px] font-bold transition-all shadow-xs ${
                                  isSelected
                                    ? "scale-125 ring-3 shadow-md"
                                    : "group-hover:scale-110"
                                }`}
                                style={{
                                  borderColor: theme.primary,
                                  color: theme.darkText,
                                  boxShadow: isSelected ? `0 0 12px ${theme.glow}` : undefined,
                                }}
                              >
                                {String(node.year).slice(2)}
                              </div>

                              <span className="mt-2 text-[11px] font-semibold text-slate-800 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
                                {node.shortLabel}
                              </span>
                              <span className="text-[9px] font-mono text-slate-500 mt-0.5">
                                {node.city.split("(")[0].trim()}
                              </span>
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* VIEW MODE 3: Domain Matrix Columns */}
        {viewMode === "matrix" && (
          <div
            className="xl:col-span-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-md overflow-y-auto"
            style={{ minHeight: 640 }}
          >
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-1">
                <Layers className="size-4 text-purple-600" />
                <h3 className="font-serif text-lg font-bold text-slate-900">
                  Domain Categorical Matrix
                </h3>
              </div>
              <p className="text-xs text-slate-500">
                Browse the complete intellectual corpus classified by doctrinal realms. Click any
                record to inspect primary quotes and manuscripts.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.keys(CATEGORY_THEMES).map((catName) => {
                const category = catName as NodeCategory
                const theme = CATEGORY_THEMES[category]
                const domainNodes = visibleNodes.filter((n) => n.category === category)
                if (domainNodes.length === 0) return null

                return (
                  <div
                    key={category}
                    className="p-4 rounded-xl border bg-slate-50/50 flex flex-col gap-2.5"
                    style={{ borderColor: theme.border }}
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                      <div className="flex items-center gap-2">
                        <span
                          className="size-2.5 rounded-full"
                          style={{ backgroundColor: theme.primary }}
                        />
                        <span
                          className="text-xs font-bold font-mono uppercase tracking-wider"
                          style={{ color: theme.darkText }}
                        >
                          {category}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500">
                        {domainNodes.length} Records
                      </span>
                    </div>

                    <div className="flex flex-col gap-2">
                      {domainNodes.map((node) => {
                        const isSelected = activeNode.id === node.id
                        return (
                          <button
                            key={node.id}
                            onClick={() => {
                              sfx.playMilestoneSelect()
                              setSelectedId(node.id)
                            }}
                            className={`flex items-start gap-2.5 p-2 rounded-lg text-left transition-all border ${
                              isSelected
                                ? "bg-white shadow-xs border-blue-400 ring-1 ring-blue-300"
                                : "bg-white/70 hover:bg-white border-slate-200/80 hover:border-slate-300"
                            }`}
                          >
                            <span className="font-mono text-[10px] font-bold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded-md shrink-0 mt-0.5">
                              {node.year}
                            </span>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-semibold text-slate-900 truncate">
                                {node.label}
                              </p>
                              <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                                {node.summary}
                              </p>
                            </div>
                            <ChevronRight className="size-3.5 text-slate-400 shrink-0 self-center" />
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* ── Right Column: Deep Concept Dossier / Inspector Panel ──────────── */}
        <div className="xl:col-span-4 flex flex-col gap-4">
          {/* Active Concept Dossier Card */}
          <div
            className="rounded-2xl border-2 bg-white p-5 shadow-sm flex flex-col gap-4 transition-all"
            style={{
              borderColor: CATEGORY_THEMES[activeNode.category].border,
              boxShadow: `0 4px 20px -2px ${CATEGORY_THEMES[activeNode.category].glow}`,
            }}
          >
            {/* Header: Category Badge + Year + Archetype */}
            <div className="flex items-center justify-between gap-2 flex-wrap pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span
                  className="size-2.5 rounded-full"
                  style={{ backgroundColor: CATEGORY_THEMES[activeNode.category].primary }}
                />
                <span
                  className="text-[10px] font-mono font-bold uppercase tracking-wider"
                  style={{ color: CATEGORY_THEMES[activeNode.category].darkText }}
                >
                  {activeNode.category}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-[10px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                  {activeNode.year}
                </span>
                <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                  {activeNode.archetype}
                </span>
              </div>
            </div>

            {/* Archival Thumbnail & Geographic Anchor */}
            <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-100 h-40 group">
              <img
                src={activeNode.image}
                alt={activeNode.label}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  // Fallback if image fails to load
                  ;(e.target as HTMLElement).style.display = "none"
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white">
                <div className="flex items-center gap-1.5 text-xs font-medium">
                  <MapPin className="size-3.5 text-red-400" />
                  <span>{activeNode.city}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleSelectNode(activeNode, true)}
                    className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-md transition-all text-white flex items-center gap-1 text-[10px] font-semibold"
                    title="Center this concept on the map canvas"
                  >
                    <Crosshair className="size-3 text-white" />
                    <span>Center</span>
                  </button>
                  <button
                    onClick={toggleSpeechNarration}
                    className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-md transition-all text-white flex items-center gap-1 text-[10px] font-semibold"
                    title="Listen to historical dictums"
                  >
                    {isSpeaking ? (
                      <>
                        <VolumeX className="size-3 text-red-300 animate-pulse" />
                        <span>Stop</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="size-3 text-white" />
                        <span>Listen</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Title */}
            <div>
              <h2 className="font-serif text-xl font-bold text-slate-900 leading-snug">
                {activeNode.label}
              </h2>
            </div>

            {/* Landmark Historical Dictum / Verbatim Quote */}
            <div
              className="p-3.5 rounded-xl border relative"
              style={{
                backgroundColor: CATEGORY_THEMES[activeNode.category].bg,
                borderColor: CATEGORY_THEMES[activeNode.category].border,
              }}
            >
              <div className="text-[10px] font-mono uppercase tracking-wider font-bold mb-1.5 flex items-center gap-1"
                style={{ color: CATEGORY_THEMES[activeNode.category].darkText }}>
                <Sparkles className="size-3" /> Landmark Dictum
              </div>
              <blockquote className="font-serif italic text-xs md:text-sm text-slate-800 leading-relaxed pl-2 border-l-2"
                style={{ borderColor: CATEGORY_THEMES[activeNode.category].primary }}>
                "{activeNode.quote}"
              </blockquote>
            </div>

            {/* Historical Analysis */}
            <div className="flex flex-col gap-1.5 text-xs text-slate-700 leading-relaxed">
              <p>{activeNode.summary}</p>
            </div>

            {/* Constitutional Significance */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <p className="text-[10px] font-mono uppercase tracking-wider font-bold text-slate-600 mb-1 flex items-center gap-1">
                <Info className="size-3 text-blue-600" /> Enduring Legacy
              </p>
              <p className="text-xs text-slate-800 leading-relaxed font-medium">
                {activeNode.significance}
              </p>
            </div>

            {/* Neural Interconnections (Clickable Chips) */}
            <div>
              <p className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold mb-2 flex items-center gap-1">
                <Network className="size-3 text-purple-600" /> Connected Ideological Nexus:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {activeNode.connections.map((targetId) => {
                  const target = KNOWLEDGE_NODES.find((n) => n.id === targetId)
                  if (!target) return null
                  const theme = CATEGORY_THEMES[target.category]

                  return (
                    <button
                      key={targetId}
                      onClick={() => handleSelectNode(target, true)}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border hover:shadow-xs transition-all"
                      style={{
                        borderColor: theme.border,
                        color: theme.darkText,
                        backgroundColor: theme.bg,
                      }}
                    >
                      <span className="size-1.5 rounded-full" style={{ backgroundColor: theme.primary }} />
                      <span>{target.shortLabel}</span>
                      <ArrowRight className="size-2.5 opacity-60" />
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Action Buttons: View Primary Document & Focus */}
            <div className="flex flex-col gap-2 pt-2 border-t border-slate-100">
              {activeNode.relatedDocId && (
                <Button
                  size="sm"
                  className="w-full gap-2 font-semibold bg-slate-900 hover:bg-slate-800 text-white"
                  onClick={() => {
                    sfx.playNavClick()
                    onOpenDocument(activeNode.relatedDocId!)
                  }}
                >
                  <BookOpen className="size-3.5 text-blue-400" />
                  <span>Examine Primary Archival Document ({activeNode.relatedDocId})</span>
                </Button>
              )}

              {viewMode === "atlas" && (
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full gap-2 text-xs font-medium text-slate-700 hover:text-slate-900"
                  onClick={() => handleSelectNode(activeNode, true)}
                >
                  <Maximize2 className="size-3.5" />
                  <span>Focus & Center Map on Concept</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
