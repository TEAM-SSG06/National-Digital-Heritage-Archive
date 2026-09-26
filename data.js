// Dr. B. R. Ambedkar Digital Heritage Archive Data Repository

const ARCHIVE_DATA = {
  // Archive Documents & Writings
  documents: [
    {
      id: "DOC-001",
      title: "Annihilation of Caste",
      year: 1936,
      category: "Writings & Speeches",
      volume: "BAWS Volume 1",
      source: "Undelivered Speech for Jat-Pat-Todak Mandal",
      pages: 112,
      language: "English",
      image: "images/ambedkar-reading-library.jpg",
      imageCaption: "Dr. B. R. Ambedkar in his personal library with thousands of books, authoring seminal treatises on social equality.",
      summary: "A radical critique of the Hindu caste system, advocating for complete social restructuring, equality, liberty, and fraternity. Dr. Ambedkar analyzes the mechanisms of caste and proposes rationalist reform.",
      fullText: `Indiscriminate promotion of caste spirit leads to destruction of social efficiency. Caste has killed public spirit. Caste has destroyed the sense of public charity. Caste has made public opinion impossible... Virtue has become caste-ridden and morality has become caste-bound.

The real remedy is to destroy the belief in the sanctity of the Shastras. Make every man and woman free from the thraldom of the Shastras, cleanse their minds of the neurosis of the Shastras, and he or she will find no difficulty in eating and marrying without any hindrance.

What is fundamental is social democracy. Democracy is not merely a form of Government. It is primarily a mode of associated living, of conjoint communicated experience. It is essentially an attitude of respect and reverence towards fellowmen.`,
      translations: {
        hindi: "जाति का विनाश (1936) - सामाजिक दक्षता और बंधुत्व का मौलिक ग्रंथ। लोकतंत्र केवल सरकार का रूप नहीं है, बल्कि यह सहयोगपूर्ण जीवन जीने की एक पद्धति है।",
        marathi: "जातीचा उच्छेद (१९३६) - सामाजिक समता, स्वातंत्र्य आणि बंधुता यांचा पाया रचणारा विचार। लोकतंत्र म्हणजे परस्पर आदराची भावना होय।",
        tamil: "சாதி ஒழிப்பு (1936) - சமூக சமத்துவம் மற்றும் சுதந்திரத்தின் அடிப்படை கோட்பாடுகள்."
      },
      tags: ["Social Reform", "Equality", "Annihilation of Caste", "Fraternity", "BAWS Vol 1"]
    },
    {
      id: "DOC-002",
      title: "Constituent Assembly Speech on Article 32 (Right to Constitutional Remedies)",
      year: 1948,
      category: "Constituent Assembly Debates",
      volume: "CAD Volume VII",
      source: "Constituent Assembly of India, New Delhi",
      pages: 18,
      language: "English",
      image: "images/ambedkar-delhi-1948.jpg",
      imageCaption: "Dr. B. R. Ambedkar at New Delhi in 1948 during the historic drafting of Fundamental Rights.",
      summary: "Dr. Ambedkar defines Article 32 as the 'Heart and Soul of the Indian Constitution', providing citizens direct enforcement of Fundamental Rights through the Supreme Court.",
      fullText: `If I was asked to name any particular article in this Constitution as the most important—an article without which this Constitution would be a nullity—I could not refer to any other article except this one. It is the very soul of the Constitution and the very heart of it and I am glad that the House has realized its importance.

The fundamental rights conferred by Part III cannot be rendered illusory. By providing a constitutional remedy through Writs of Habeas Corpus, Mandamus, Prohibition, Quo Warranto and Certiorari, we ensure that individual liberty is guarded against state high-handedness.`,
      translations: {
        hindi: "अनुच्छेद 32 संविधान की 'आत्मा और हृदय' है। इसके बिना संविधान शून्य के समान है। यह नागरिकों के मौलिक अधिकारों की गारंटी देता है।",
        marathi: "कलम ३२ ही भारतीय संविधानाचा आत्मा आणि हृदय आहे. मूलभूत हक्कांच्या संरक्षणासाठी हे सर्वोच्च साधन आहे.",
        tamil: "அரசியலமைப்பு சட்டப்பிரிவு 32 இந்திய அரசியலமைப்பின் 'இதயம் மற்றும் ஆன்மா' ஆகும்."
      },
      tags: ["Constitution", "Article 32", "Fundamental Rights", "Supreme Court", "CAD"]
    },
    {
      id: "DOC-003",
      title: "The Problem of the Rupee: Its Origin and Its Solution",
      year: 1923,
      category: "Economic Writings",
      volume: "BAWS Volume 6",
      source: "Doctorate Dissertation, London School of Economics",
      pages: 304,
      language: "English",
      image: "images/ambedkar-barrister-1922.jpg",
      imageCaption: "Dr. B. R. Ambedkar as Barrister-at-Law and D.Sc. scholar at the London School of Economics (1922–1923).",
      summary: "Dr. Ambedkar's seminal economic thesis evaluating currency exchange standard vs. gold standard. This research formed the foundational framework for the establishment of the Reserve Bank of India (RBI) in 1935.",
      fullText: `Trade is an exchange of commodities for commodities. Money is only a medium of exchange. The stability of currency standard is indispensable to economic development. A gold bullion standard with controlled paper currency prevents exchange volatility and protects domestic purchasing power.

The central bank must maintain exchange stability while serving as the lender of last resort. Sound monetary policy is the bedrock of national prosperity.`,
      translations: {
        hindi: "रुपये की समस्या: इसका उद्गम और समाधान (1923) - डॉ. आंबेडकर का यह अर्थशास्त्रीय शोध ग्रंथ भारतीय रिजर्व बैंक (RBI) की स्थापना का मुख्य आधार बना।",
        marathi: "रुपयाची समस्या (१९२३) - रिझर्व्ह बँक ऑफ इंडियाच्या स्थापनेचा आधारस्तंभ असलेला अर्थशास्त्रीय प्रबंध.",
        tamil: "ரூபாயின் பிரச்சனை (1923) - ரிசர்வ் வங்கி உருவாக்கத்திற்கு வழிகாட்டிய பொருளாதார ஆய்வு."
      },
      tags: ["Economics", "Currency", "RBI", "Rupee Problem", "Monetary Policy"]
    },
    {
      id: "DOC-004",
      title: "Mahad Satyagraha Declaration: Water Rights as Human Rights",
      year: 1927,
      category: "Speeches & Movement",
      volume: "BAWS Volume 17",
      source: "Chavdar Tale, Mahad, Maharashtra",
      pages: 12,
      language: "English",
      image: "images/ambedkar-portrait.jpg",
      imageCaption: "Dr. B. R. Ambedkar, champion of civil liberties, leading the fight for human rights and universal equality.",
      summary: "Dr. Ambedkar's historic address asserting equal rights to public water resources at Chavdar Lake, marking the formal launching of the civil rights movement in India.",
      fullText: `We are not going to the Chavdar Tank merely to drink water. We are going to the tank to assert our human rights as equals in society. Water is nature's gift to all living beings equally. Denying access to public water resources is a denial of basic human dignity.

Our struggle is not for water alone, but for self-respect and social liberation. Until social equality is established, political independence remains incomplete.`,
      translations: {
        hindi: "महाड सत्याग्रह भाषण (1927) - हम केवल पानी पीने चवदार तालाब नहीं जा रहे हैं, बल्कि मानव अधिकारों और स्वाभिमान की स्थापना के लिए जा रहे हैं।",
        marathi: "महाड सत्याग्रह (१९२७) - हा लढा केवळ पाण्यासाठी नसून मानवी हक्क आणि आत्मसन्मानासाठी आहे.",
        tamil: "மகத் சத்தியாகிரகம் (1927) - குடிநீர் உரிமை என்பது அடிப்படை மனித உரிமை."
      },
      tags: ["Mahad Satyagraha", "Civil Rights", "Human Rights", "Chavdar Tank", "1927"]
    },
    {
      id: "DOC-005",
      title: "States and Minorities: Memorandum on Fundamental Rights and Safeguards",
      year: 1947,
      category: "Constitutional Proposals",
      volume: "BAWS Volume 1",
      source: "Memorandum submitted to the Constituent Assembly",
      pages: 78,
      language: "English",
      image: "images/ambedkar-signing-constitution.jpg",
      imageCaption: "Dr. B. R. Ambedkar signing the official register of the Constitution of India.",
      summary: "A proposed constitution for the United States of India featuring state socialism, nationalization of key industries, land redistribution, and robust minority rights protections.",
      fullText: `Key industries shall be owned and run by the State. Agriculture shall be a State industry. The State shall acquire land belonging to agricultural sector and distribute it into farms of standard size for collective cultivation.

Minorities shall be protected against majoritarian tyranny through constitutional guarantees, weighted representation, and anti-discrimination commissions.`,
      translations: {
        hindi: "राज्य और अल्पसंख्यक (1947) - राज्य समाजवाद, उद्योगों का राष्ट्रीयकरण और अल्पसंख्यकों के अधिकारों के लिए आंबेडकर का संवैधानिक मॉडल।",
        marathi: "राज्य आणि अल्पसंख्याक (१९४७) - राज्य समाजवाद आणि अल्पसंख्यांकांच्या सुरक्षेचा घटनात्मक मसुदा.",
        tamil: "மாநிலங்களும் சிறுபான்மையினரும் (1947) - சமூக நீதி மற்றும் அரசு சோசலிசத் திட்டம்."
      },
      tags: ["State Socialism", "Minority Rights", "Constitution", "Economics", "Land Reform"]
    },
    {
      id: "DOC-006",
      title: "Grammar of Anarchy (Final Constituent Assembly Speech)",
      year: 1949,
      category: "Constituent Assembly Debates",
      volume: "CAD Volume XI",
      source: "Constituent Assembly of India, New Delhi",
      pages: 24,
      language: "English",
      image: "images/ambedkar-constitution-presentation.jpg",
      imageCaption: "Dr. B. R. Ambedkar presenting the final draft of the Constitution to Dr. Rajendra Prasad on 25 November 1949.",
      summary: "Dr. Ambedkar's landmark warning to the nation upon adopting the Constitution: abandon unconstitutional methods, do not lay liberty at the feet of great men, and convert political democracy into social democracy.",
      fullText: `On the 26th of January 1950, we are going to enter into a life of contradictions. In politics we will have equality and in social and economic life we will have inequality. In politics we will be recognizing the principle of one man one vote and one vote one value. In our social and economic life, we shall, by reason of our social and economic structure, continue to deny the principle of one man one value.

We must make our political democracy a social democracy as well. Political democracy cannot last unless there lies at the base of it social democracy.

Bhakti in religion may be a road to the salvation of the soul. But in politics, Bhakti or hero-worship is a sure road to degradation and to eventual dictatorship.`,
      translations: {
        hindi: "संविधान सभा का अंतिम भाषण (25 नवंबर 1949) - राजनीतिक लोकतंत्र को सामाजिक लोकतंत्र में बदलना होगा। राजनीति में नायक-पूजा तानाशाही का सीधा मार्ग है।",
        marathi: "संविधान सभेतील शेवटचे ऐतिहासिक भाषण (१९४९) - राजकीय लोकशाहीचे सामाजिक लोकशाहीत रूपांतर करणे अनिवार्य आहे.",
        tamil: "அரசியலமைப்பு சபையின் இறுதி உரை (1949) - சமூக ஜனநாயகம் இல்லாமல் அரசியல் ஜனநாயகம் நிலைக்காது."
      },
      tags: ["Grammar of Anarchy", "Democracy", "Hero Worship", "26 January 1950", "CAD Final"]
    }
  ],

  // Historical Timeline Milestones (1891–1956)
  timeline: [
    {
      id: "MS-1891",
      year: 1891,
      decade: "1890s",
      date: "April 14, 1891",
      era: "early-life",
      eraLabel: "Formative Years",
      category: "Early Life",
      badge: "Birth",
      title: "Birth at Mhow Cantonment",
      location: "Mhow, Central Provinces (now MP)",
      description: "Bhimrao Ramji Ambedkar was born to Ramji Maloji Sakpal and Bhimabai Sakpal in the military cantonment town of Mhow, the fourteenth child in a Kabirpanthi family dedicated to disciplined learning and moral rectitude.",
      quote: "My father was a military officer who instilled in us an uncompromising passion for books, honesty, and self-reliance.",
      impact: "Birth of the Father of Modern India",
      image: "images/ambedkar-portrait.jpg",
      relatedDocId: null,
      relatedType: null
    },
    {
      id: "MS-1907",
      year: 1907,
      decade: "1900s",
      date: "1907",
      era: "early-life",
      eraLabel: "Formative Years",
      category: "Early Life",
      badge: "Matriculation",
      title: "Elphinstone High School Matriculation",
      location: "Bombay",
      description: "Became the first student from his community to pass the matriculation examination from Elphinstone High School. At a public felicitation presided over by social reformer S. K. Bole, scholar Krishnaji Arjun Keluskar presented him with a biography of Gautama Buddha, sparking a lifelong philosophical bond.",
      quote: "Life should be great rather than long.",
      impact: "Historic Matriculation & Gift of Buddha Biography",
      image: "images/ambedkar-scholar.jpg",
      relatedDocId: null,
      relatedType: null
    },
    {
      id: "MS-1913",
      year: 1913,
      decade: "1910s",
      date: "1913–1916",
      era: "education",
      eraLabel: "Columbia & London",
      category: "Education",
      badge: "Columbia Univ",
      title: "Scholarly Studies at Columbia University",
      location: "New York, USA",
      description: "Awarded a Baroda State scholarship by Maharaja Sayajirao Gaekwad III to study at Columbia University in New York. Under the mentorship of John Dewey and Edwin Seligman, earned his M.A. and Ph.D. in Economics, presenting his seminal anthropological paper 'Castes in India: Their Mechanism, Genesis and Development'.",
      quote: "My chief pleasure was my studies. I had no other recreation, and for months together I would study for 18 hours a day.",
      impact: "M.A. & Ph.D. in Economics under John Dewey",
      image: "images/ambedkar-scholar.jpg",
      relatedDocId: null,
      relatedType: null
    },
    {
      id: "MS-1920",
      year: 1920,
      decade: "1920s",
      date: "January 31, 1920",
      era: "civil-rights",
      eraLabel: "Civil Rights Vanguard",
      category: "Journalism",
      badge: "Mooknayak",
      title: "Launch of 'Mooknayak' (Leader of the Silent)",
      location: "Bombay",
      description: "Founded the fortnightly journal 'Mooknayak' in Bombay with financial assistance from Chhatrapati Shahu Maharaj of Kolhapur. The paper established a courageous intellectual platform to fearlessly articulate civil rights, human dignity, and democratic liberation.",
      quote: "If any part of the human body is paralyzed, the whole body suffers. So long as millions are denied rights, India cannot be a healthy nation.",
      impact: "Founding of Independent Civil Rights Journalism",
      image: "images/ambedkar-scholar.jpg",
      relatedDocId: null,
      relatedType: null
    },
    {
      id: "MS-1923",
      year: 1923,
      decade: "1920s",
      date: "1921–1923",
      era: "education",
      eraLabel: "Columbia & London",
      category: "Economics",
      badge: "LSE & Gray's Inn",
      title: "D.Sc. at London School of Economics & Barrister at Gray's Inn",
      location: "London, UK",
      description: "Awarded the coveted Doctor of Science (D.Sc.) in Economics from the London School of Economics for his thesis 'The Problem of the Rupee: Its Origin and Its Solution', and was called to the Bar at Gray's Inn, London. His monetary treatise later became the blueprint for the Reserve Bank of India.",
      quote: "The stability of currency standard is indispensable to national economic development.",
      impact: "Foundational Framework for Reserve Bank of India (RBI)",
      image: "images/ambedkar-barrister-1922.jpg",
      relatedDocId: "DOC-003",
      relatedType: "document"
    },
    {
      id: "MS-1924",
      year: 1924,
      decade: "1920s",
      date: "July 20, 1924",
      era: "civil-rights",
      eraLabel: "Civil Rights Vanguard",
      category: "Civil Rights",
      badge: "Bahishkrit Sabha",
      title: "Establishment of Bahishkrit Hitakarini Sabha",
      location: "Damodar Hall, Parel, Bombay",
      description: "Founded the central organization for depressed classes welfare with the legendary motto: 'Educate, Agitate, Organize'. The society opened student hostels, libraries, night schools, and industrial training centers to build autonomous community power.",
      quote: "Educate, Agitate, and Organize; have faith in yourselves and never lose hope.",
      impact: "Birth of the Historic Clarion Call 'Educate, Agitate, Organize'",
      image: "images/ambedkar-reading-library.jpg",
      relatedDocId: null,
      relatedType: null
    },
    {
      id: "MS-1927",
      year: 1927,
      decade: "1920s",
      date: "March 20, 1927",
      era: "civil-rights",
      eraLabel: "Civil Rights Vanguard",
      category: "Civil Rights",
      badge: "Mahad Satyagraha",
      title: "Mahad Water Satyagraha at Chavdar Lake",
      location: "Mahad, Kolaba District, Maharashtra",
      description: "Led thousands of disciplined delegates to Chavdar Lake in Mahad to drink water from the public reservoir, asserting equal access to water as a non-negotiable human right. This event is commemorated annually across India as Social Empowerment Day.",
      quote: "It is not for water that we went to Mahad; it is to assert our human dignity and establish that we too are human beings.",
      impact: "First Large-Scale Civil Rights Movement for Public Resources",
      image: "images/ambedkar-portrait.jpg",
      relatedDocId: "DOC-004",
      relatedType: "document"
    },
    {
      id: "MS-1930",
      year: 1930,
      decade: "1930s",
      date: "1930–1932",
      era: "civil-rights",
      eraLabel: "Civil Rights Vanguard",
      category: "Political Movement",
      badge: "Round Table",
      title: "Round Table Conferences & Kalaram Temple Satyagraha",
      location: "London, UK / Nashik",
      description: "Represented India's Depressed Classes at the First, Second, and Third Round Table Conferences at St. James's Palace in London, directly presenting constitutional demands for adult franchise, separate representation, and anti-untouchability penal legislation.",
      quote: "We demand to be placed on a footing of equality with every other citizen in the civic life of the country.",
      impact: "International Elevation of Indian Depressed Classes Rights",
      image: "images/ambedkar-barrister-1922.jpg",
      relatedDocId: null,
      relatedType: null
    },
    {
      id: "MS-1932",
      year: 1932,
      decade: "1930s",
      date: "September 24, 1932",
      era: "civil-rights",
      eraLabel: "Civil Rights Vanguard",
      category: "Political Movement",
      badge: "Poona Pact",
      title: "The Historic Poona Pact Agreement",
      location: "Yerwada Central Jail, Pune",
      description: "Signed the historic compromise with Mahatma Gandhi and Hindu leaders at Yerwada Jail. The pact replaced separate electorates with 148 reserved seats in provincial legislatures—more than double the 71 seats previously proposed—establishing legislative affirmative action.",
      quote: "I am ready to sacrifice my life for the interests of my people, but I will not sacrifice their legitimate rights.",
      impact: "148 Reserved Legislative Seats Secured (Precursor to Constitutional Quotas)",
      image: "images/ambedkar-reading-library.jpg",
      relatedDocId: null,
      relatedType: null
    },
    {
      id: "MS-1936",
      year: 1936,
      decade: "1930s",
      date: "May 1936",
      era: "civil-rights",
      eraLabel: "Civil Rights Vanguard",
      category: "Political Movement",
      badge: "ILP & Treatise",
      title: "Founding of Independent Labour Party & 'Annihilation of Caste'",
      location: "Bombay",
      description: "Established the Independent Labour Party (ILP) representing agricultural tenants and industrial mill-workers, winning 14 of 17 contested seats in the 1937 Bombay Legislative Assembly. In the same year, authored the world-renowned treatise 'Annihilation of Caste'.",
      quote: "You cannot build anything on the foundations of caste. You cannot build up a nation, you cannot build up a morality.",
      impact: "Seminal Philosophical Treatise & Radical Social Democracy Manifesto",
      image: "images/ambedkar-reading-library.jpg",
      relatedDocId: "DOC-001",
      relatedType: "document"
    },
    {
      id: "MS-1942",
      year: 1942,
      decade: "1940s",
      date: "1942–1946",
      era: "labour-governance",
      eraLabel: "Labour & Governance",
      category: "Labour Rights",
      badge: "Labour Member",
      title: "Labour Member on Viceroy's Executive Council",
      location: "New Delhi",
      description: "Appointed Minister for Labour in the Government of India. Transformed India's industrial landscape by reducing working hours from 12 to 8 hours per day, establishing the Tripartite Labour Conference, creating the Employees' State Insurance (ESI) framework, maternity benefit legislation, and establishing national river valley projects (Damodar & Hirakud).",
      quote: "Labour must have equal participation in political power and economic democracy.",
      impact: "National 8-Hour Workday, ESI Social Security & River Valley Infrastructure",
      image: "images/ambedkar-delhi-1948.jpg",
      relatedDocId: null,
      relatedType: null
    },
    {
      id: "MS-1946",
      year: 1946,
      decade: "1940s",
      date: "1946",
      era: "labour-governance",
      eraLabel: "Labour & Governance",
      category: "Education",
      badge: "People's Education",
      title: "Founding of Siddharth College & 'Who Were the Shudras?'",
      location: "Bombay",
      description: "Established the People's Education Society and founded Siddharth College in Bombay to democratize higher learning for disadvantaged youths. Published his groundbreaking historical treatise 'Who Were the Shudras?', dedicated to 19th-century social revolutionary Jyotirao Phule.",
      quote: "Knowledge is the foundation of a man's life.",
      impact: "Institutional Democratization of Higher University Education",
      image: "images/ambedkar-scholar.jpg",
      relatedDocId: null,
      relatedType: null
    },
    {
      id: "MS-1947",
      year: 1947,
      decade: "1940s",
      date: "August 29, 1947",
      era: "constitution",
      eraLabel: "Constitution Architect",
      category: "Constitution",
      badge: "Drafting Chairman",
      title: "Elected Chairman of the Drafting Committee & First Law Minister",
      location: "Constitution House, New Delhi",
      description: "Appointed Independent India's First Law Minister by Prime Minister Jawaharlal Nehru, and unanimously elected by the Constituent Assembly as Chairman of the 7-member Drafting Committee to draft the Constitution of India. Authored 'States and Minorities' proposing constitutional state socialism.",
      quote: "I am grateful to the Constituent Assembly for this trust. I entered this assembly with no other ambition than to safeguard the rights of my people.",
      impact: "Chief Architect of the Sovereign Democratic Constitution of India",
      image: "images/ambedkar-delhi-1948.jpg",
      relatedDocId: "DOC-005",
      relatedType: "document"
    },
    {
      id: "MS-1948",
      year: 1948,
      decade: "1940s",
      date: "November 4, 1948",
      era: "constitution",
      eraLabel: "Constitution Architect",
      category: "Constitution",
      badge: "Draft Introduction",
      title: "Introduction of Draft Constitution & Defense of Article 32",
      location: "Constituent Assembly, New Delhi",
      description: "Formally presented the Draft Constitution of 315 Articles and 8 Schedules to the Assembly in an acclaimed 2-hour expository address. Delivered his historic defense of Article 32, designating the Right to Constitutional Remedies through Supreme Court writs as the 'Heart and Soul of the Constitution'.",
      quote: "Article 32 is the very soul of the Constitution and the very heart of it. Without it, the Constitution would be a nullity.",
      impact: "Enshrinement of Enforceable Fundamental Rights & Judicial Review",
      image: "images/ambedkar-delhi-1948.jpg",
      relatedDocId: "DOC-002",
      relatedType: "document"
    },
    {
      id: "MS-1949",
      year: 1949,
      decade: "1940s",
      date: "November 25–26, 1949",
      era: "constitution",
      eraLabel: "Constitution Architect",
      category: "Constitution",
      badge: "Grammar of Anarchy",
      title: "Adoption of the Constitution & 'Grammar of Anarchy' Address",
      location: "Constituent Assembly Hall, New Delhi",
      description: "Delivered his prophetic final address warning that political equality ('one man, one vote') must swiftly be matched by economic and social equality ('one man, one value'), denouncing blind hero-worship in politics. The Assembly adopted the Constitution on November 26, 1949.",
      quote: "On the 26th of January 1950, we are going to enter into a life of contradictions. We must make our political democracy a social democracy as well.",
      impact: "Final Adoption of the World's Longest Living Written Democratic Constitution",
      image: "images/ambedkar-constitution-presentation.jpg",
      relatedDocId: "DOC-006",
      relatedType: "document"
    },
    {
      id: "MS-1950",
      year: 1950,
      decade: "1950s",
      date: "January 24–26, 1950",
      era: "constitution",
      eraLabel: "Constitution Architect",
      category: "Constitution",
      badge: "Republic Enacted",
      title: "Signing of the Constitution & Enactment of the Republic",
      location: "Central Hall of Parliament, New Delhi",
      description: "Signed the official calligraphic English and Hindi registers of the Constitution of India alongside Dr. Rajendra Prasad, Jawaharlal Nehru, and assembly delegates. On January 26, 1950, the Constitution took effect, officially birthing the sovereign Republic of India.",
      quote: "The Constitution can provide only the organs of State. The factor on which the working of those organs depends is the people and the political parties.",
      impact: "Enactment of Sovereign Republic & Universal Adult Suffrage",
      image: "images/ambedkar-signing-constitution.jpg",
      relatedDocId: "AUD-002",
      relatedType: "audio"
    },
    {
      id: "MS-1951",
      year: 1951,
      decade: "1950s",
      date: "September 27, 1951",
      era: "legacy",
      eraLabel: "Navayana & Legacy",
      category: "Political Movement",
      badge: "Hindu Code Bill",
      title: "Resignation over the Hindu Code Bill for Women's Rights",
      location: "Parliament of India, New Delhi",
      description: "Resigned from Prime Minister Nehru's Cabinet in principled protest after orthodox resistance stalled the Hindu Code Bill. The bill sought to revolutionize women's rights by codifying equal property inheritance, outlawing polygamy, and guaranteeing divorce and guardianship rights.",
      quote: "I measure the progress of a community by the degree of progress which women have achieved.",
      impact: "Pioneering Codification of Gender Equality & Women's Property Rights",
      image: "images/ambedkar-1950.jpg",
      relatedDocId: null,
      relatedType: null
    },
    {
      id: "MS-1953",
      year: 1953,
      decade: "1950s",
      date: "May 1953",
      era: "legacy",
      eraLabel: "Navayana & Legacy",
      category: "Journalism",
      badge: "BBC Broadcast",
      title: "BBC Radio Broadcast on Parliamentary Democracy",
      location: "BBC London / New Delhi",
      description: "Recorded a world-broadcast lecture for BBC Radio exploring the structural conditions necessary for successful parliamentary democracy in post-colonial nations: absence of glaring social inequalities, existence of an effective opposition, equality in law, and constitutional morality.",
      quote: "Democracy is not merely a form of government; it is primarily a mode of associated living, of conjoint communicated experience.",
      impact: "Archival Recording of Global Democratic Theory & Governance",
      image: "images/ambedkar-1950.jpg",
      relatedDocId: "AUD-001",
      relatedType: "audio"
    },
    {
      id: "MS-1956A",
      year: 1956,
      decade: "1950s",
      date: "October 14, 1956",
      era: "legacy",
      eraLabel: "Navayana & Legacy",
      category: "Spiritual Renaissance",
      badge: "Deekshabhoomi",
      title: "Historic Dhamma Deeksha at Deekshabhoomi, Nagpur",
      location: "Deekshabhoomi, Nagpur, Maharashtra",
      description: "Embraced Buddhism along with his wife Dr. Savita Ambedkar and administered the 22 historic vows to over 500,000 followers, inaugurating the Navayana Buddhist revival emphasizing rationalism, liberty, equality, and compassion (prajna, samata, and karuna).",
      quote: "I prefer Buddhism because it gives three principles in combination: prajna (understanding as against superstition), karuna (love), and samata (equality).",
      impact: "Largest Mass Civil Conversion & Rebirth of Rational Buddhism in India",
      image: "images/ambedkar-1950.jpg",
      relatedDocId: "AUD-003",
      relatedType: "audio"
    },
    {
      id: "MS-1956B",
      year: 1956,
      decade: "1950s",
      date: "December 6, 1956",
      era: "legacy",
      eraLabel: "Navayana & Legacy",
      category: "Memorial",
      badge: "Mahaparinirvan",
      title: "Mahaparinirvan & Immortal National Legacy",
      location: "26 Alipur Road, New Delhi / Chaityabhoomi, Mumbai",
      description: "Passed away in his sleep at his New Delhi residence days after completing his magnum opus 'The Buddha and His Dhamma'. More than one million citizens assembled at Chaityabhoomi, Dadar, Mumbai to pay homage. Conferred India's highest civilian honor, the Bharat Ratna, in 1990.",
      quote: "Be educated, be agitated, be organized. Trust in yourself. We are going to shine.",
      impact: "Posthumous Bharat Ratna (1990) & Universal Civil Rights Icon",
      image: "images/ambedkar-portrait.jpg",
      relatedDocId: null,
      relatedType: null
    }
  ],

  // Interactive Knowledge Graph Connections
  knowledgeNodes: [
    { id: "ambedkar", label: "Dr. B. R. Ambedkar", group: "core", val: 32, color: "#111827" },
    { id: "constitution", label: "Constitution of India", group: "legal", val: 24, color: "#0066CC" },
    { id: "article32", label: "Article 32 (Writs)", group: "legal", val: 18, color: "#2563EB" },
    { id: "annihilation", label: "Annihilation of Caste", group: "writings", val: 22, color: "#B45309" },
    { id: "mahad", label: "Mahad Satyagraha (1927)", group: "movements", val: 20, color: "#059669" },
    { id: "rbi", label: "Reserve Bank of India", group: "economics", val: 18, color: "#D97706" },
    { id: "rupee", label: "Problem of the Rupee (1923)", group: "economics", val: 16, color: "#F59E0B" },
    { id: "poona", label: "Poona Pact (1932)", group: "movements", val: 18, color: "#7C3AED" },
    { id: "columbia", label: "Columbia University", group: "education", val: 16, color: "#4F46E5" },
    { id: "social_democracy", label: "Social Democracy", group: "philosophy", val: 20, color: "#DC2626" },
    { id: "buddhism", label: "Navayana Buddhism", group: "philosophy", val: 18, color: "#9333EA" },
    { id: "hindu_code", label: "Hindu Code Bill", group: "legal", val: 18, color: "#0284C7" }
  ],
  knowledgeLinks: [
    { source: "ambedkar", target: "constitution", label: "Drafting Committee Chairman" },
    { source: "constitution", target: "article32", label: "Heart and Soul" },
    { source: "ambedkar", target: "annihilation", label: "Authored in 1936" },
    { source: "ambedkar", target: "mahad", label: "Led Water Satyagraha" },
    { source: "ambedkar", target: "rupee", label: "Ph.D. Dissertation at LSE" },
    { source: "rupee", target: "rbi", label: "Inspired RBI Foundation" },
    { source: "ambedkar", target: "poona", label: "Signed Agreement" },
    { source: "ambedkar", target: "columbia", label: "Alumnus (1913-1916)" },
    { source: "annihilation", target: "social_democracy", label: "Advocates Equality" },
    { source: "constitution", target: "social_democracy", label: "Guarantees Rights" },
    { source: "ambedkar", target: "buddhism", label: "Deekshabhoomi 1956" },
    { source: "ambedkar", target: "hindu_code", label: "Resigned as Law Minister for Women Rights" }
  ],

  // Audio-Video Archival Recordings
  mediaVault: [
    {
      id: "AV-101",
      type: "Audio",
      title: "BBC Interview: Dr. Ambedkar on Democracy & Social Justice (1953)",
      duration: "08:45",
      speaker: "Dr. B. R. Ambedkar",
      date: "May 1953",
      source: "BBC Radio Archive",
      image: "images/ambedkar-delhi-1948.jpg",
      description: "Dr. Ambedkar's rare broadcast interview discussing Indian democracy, parliamentary governance, electoral reforms, and economic rights."
    },
    {
      id: "AV-102",
      type: "Video",
      title: "Constituent Assembly Historic Proceedings & Handover of Constitution Draft (1949)",
      duration: "14:20",
      speaker: "Dr. B. R. Ambedkar & Dr. Rajendra Prasad",
      date: "November 25, 1949",
      source: "Films Division of India",
      image: "images/ambedkar-constitution-presentation.jpg",
      description: "Archival footage of the final session of the Constituent Assembly, Dr. Ambedkar's valedictory address, and formal acceptance of the Constitution."
    },
    {
      id: "AV-103",
      type: "Audio",
      title: "Speech on 'Why I Chose Buddha and His Dhamma' (1956)",
      duration: "11:15",
      speaker: "Dr. B. R. Ambedkar",
      date: "October 15, 1956",
      source: "Nagpur Deekshabhoomi Recording",
      image: "images/ambedkar-1950.jpg",
      description: "Address to the assembly at Deekshabhoomi detailing moral philosophy, rationality, and human dignity in Navayana Buddhism."
    }
  ],

  // Rare Manuscripts for OCR Scanner Demo
  rareManuscripts: [
    {
      id: "MAN-001",
      title: "Handwritten Notes on Draft Constitution Article 14",
      date: "October 1948",
      origin: "National Archives of India / DAIC Library",
      image: "images/ambedkar-signing-constitution.jpg",
      extractedText: "Equality before law and equal protection of the laws within the territory of India. No citizen shall be discriminated against on grounds only of religion, race, caste, sex or place of birth.",
      confidence: "98.4%",
      metadata: {
        archivalId: "DAIC-MAN-1948-089",
        preservationStatus: "Restored & Digitized (High Res 1200 DPI)",
        format: "Paper Manuscript, Black Ink",
        dublinCore: "DC.Title: Hand-edited Draft Article 14; DC.Creator: Dr. B. R. Ambedkar"
      }
    },
    {
      id: "MAN-002",
      title: "Original Letter to W. E. B. Du Bois on Civil Rights Movement",
      date: "July 31, 1946",
      origin: "W. E. B. Du Bois Papers / DAIC Archives",
      image: "images/ambedkar-reading-library.jpg",
      extractedText: "Dear Dr. Du Bois, There is so much in common between the position of the Untouchables in India and the position of the Negroes in America... I have been a student of your Negro problem and feel deep sympathy.",
      confidence: "96.8%",
      metadata: {
        archivalId: "DAIC-LETTER-1946-012",
        preservationStatus: "Digitized Preservation Copy",
        format: "Typed & Signed Correspondence",
        dublinCore: "DC.Title: Ambedkar to Du Bois Letter; DC.Subject: International Civil Rights Linkage"
      }
    }
  ],

  // AI Scholar Q&A Knowledge Base
  aiCorpus: [
    {
      query: "What were Dr. Ambedkar's views on federalism?",
      answer: "Dr. Ambedkar described the Indian Constitution as 'both unitary and federal according to the requirements of time and circumstances'. In normal times, it works as a federal system with divided powers, but during emergencies, it is designed to operate as a unitary state. He emphasized that Indian federalism is not a result of an agreement among states to secede, rendering the Union indestructible (Constituent Assembly Debates, Nov 4, 1948)."
    },
    {
      query: "Why did Dr. Ambedkar call Article 32 the heart and soul of the Constitution?",
      answer: "Dr. Ambedkar considered Article 32 paramount because without a constitutional remedy to enforce fundamental rights through judicial writs (Habeas Corpus, Mandamus, Certiorari, etc.), fundamental rights would remain mere paper declarations. He stated: 'If I was asked to name any particular article in this Constitution as the most important... I could not refer to any other article except this one' (CAD Vol VII)."
    },
    {
      query: "How did Dr. Ambedkar contribute to the establishment of the Reserve Bank of India?",
      answer: "Dr. Ambedkar's 1923 doctorate thesis 'The Problem of the Rupee: Its Origin and Its Solution' presented at the London School of Economics served as the primary academic foundation examined by the Royal Commission on Indian Currency and Finance (Hilton Young Commission) in 1926. The commission relied heavily on Ambedkar's monetary economic guidelines when drafting the RBI Act of 1934."
    },
    {
      query: "What is the significance of the Mahad Satyagraha of 1927?",
      answer: "The Mahad Satyagraha on March 20, 1927, led by Dr. Ambedkar at Chavdar Lake, Mahad, was India's first major civil rights struggle asserting the right of untouchables to draw water from public tanks. Dr. Ambedkar declared that the movement was not merely for drinking water, but for human dignity, equality, and fundamental human rights."
    }
  ]
};
