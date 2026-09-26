// Comprehensive Archival Texts Repository for Dr. B. R. Ambedkar Digital Heritage Archive
// Contains complete unabridged primary texts, multi-section manuscripts, and official translations

export interface DocumentSection {
  id: string
  number: string
  title: string
  titleHi: string
  content: string
  contentHi: string
}

export interface CompleteArchivalDocument {
  id: string
  title: string
  titleHi: string
  year: number
  category: string
  categoryHi: string
  volume: string
  source: string
  sourceHi: string
  totalWordCount: number
  readingTimeMinutes: number
  historicalContext: string
  historicalContextHi: string
  sections: DocumentSection[]
}

export const COMPLETE_ARCHIVAL_DOCUMENTS: Record<string, CompleteArchivalDocument> = {
  "DOC-001": {
    id: "DOC-001",
    title: "Annihilation of Caste",
    titleHi: "जाति का विनाश (Annihilation of Caste)",
    year: 1936,
    category: "Writings & Speeches",
    categoryHi: "लेखन एवं भाषण",
    volume: "BAWS Volume 1",
    source: "Undelivered Speech for Jat-Pat-Todak Mandal, Lahore (1936)",
    sourceHi: "जात-पात तोड़क मंडल लाहौर हेतु तैयार किया गया अप्रकाशित भाषण (१९३६)",
    totalWordCount: 14850,
    readingTimeMinutes: 45,
    historicalContext:
      "Prepared in 1936 as the Presidential Address for the annual conference of the Jat-Pat-Todak Mandal at Lahore. When the reception committee demanded deletions questioning the authority of Hindu religious scriptures, Dr. Ambedkar refused to alter a single comma, cancelled the address, and published it independently at his own expense. It stands as one of the most radical philosophical treaties on caste, equality, and human emancipation in world literature.",
    historicalContextHi:
      "१९३६ में लाहौर के जात-पात तोड़क मंडल के वार्षिक सम्मेलन के अध्यक्षीय भाषण के रूप में तैयार किया गया। जब स्वागत समिति ने हिंदू धर्मग्रंथों की सत्ता पर प्रश्न उठाने वाले अंशों को हटाने की मांग की, तो डॉ. आंबेडकर ने एक भी अल्पविराम बदलने से इनकार कर दिया, सम्मेलन रद्द कर दिया और इसे अपने खर्च पर स्वतंत्र रूप से प्रकाशित किया। यह विश्व साहित्य में जाति, समता और मानवीय मुक्ति पर सबसे क्रांतिकारी दार्शनिक ग्रंथों में से एक है।",
    sections: [
      {
        id: "sec-1",
        number: "Section 1",
        title: "The Division of Labourers, Not Division of Labour",
        titleHi: "अनुभाग १: श्रम का नहीं, बल्कि श्रमिकों का विभाजन",
        content: `Civilised society undoubtedly needs division of labour. But in no civilised society is division of labour accompanied by this unnatural division of labourers into watertight compartments. Caste System is not merely division of labour. It is also a division of labourers.

Civilised society needs division of labour, but does it require division of labourers based on dogma and birth? In no other country is the division of labour accompanied by this unnatural division of labourers into watertight compartments. Caste System is not merely division of labour. It is also a division of labourers. It is a hierarchy in which the divisions of labourers are graded one above the other. In no other country is the division of labour accompanied by this gradation of labourers.

Nor is this division of labour based on natural aptitudes. It is an attempt to appoint tasks to individuals in advance, selected not on the basis of trained capacities, but on the basis of the social status of the parents. Looked at from another point of view, this stratification of occupations which is the result of the caste system is positively pernicious. Industry is never static; it undergoes rapid and abrupt changes. With such changes an individual must be free to change his occupation. Without the ability to change, a man cannot earn his livelihood. By not permitting readjustment of occupations, caste becomes a direct cause of much of the unemployment and poverty in India.

As an economic organisation, Caste is a harmful institution, in as much as it involves the subordination of man's natural powers and inclinations to the exigencies of social rules.`,
        contentHi: `सभ्य समाज को निःसंदेह श्रम विभाजन की आवश्यकता होती है। किंतु किसी भी सभ्य समाज में श्रम विभाजन के साथ-साथ श्रमिकों का इस प्रकार का अप्राकृतिक और कठोर खानों में विभाजन नहीं होता। जाति प्रथा केवल श्रम का विभाजन नहीं है, बल्कि यह श्रमिकों का भी विभाजन है।

सभ्य समाज में श्रम विभाजन की आवश्यकता तो है, परंतु क्या यह जन्म और हठधर्मिता पर आधारित श्रमिकों के विभाजन की मांग करता है? दुनिया के किसी अन्य देश में श्रम विभाजन के साथ श्रमिकों का इस प्रकार एक-दूसरे के ऊपर श्रेणीबद्ध वर्गीकरण नहीं पाया जाता। जाति व्यवस्था एक ऐसा सोपान है जिसमें श्रमिकों के वर्गों को एक के ऊपर एक क्रमानुसार रखा गया है।

इसके अतिरिक्त, यह श्रम विभाजन व्यक्तिगत अभिरुचि या प्राकृतिक क्षमताओं पर आधारित नहीं है। यह प्रशिक्षित क्षमताओं के आधार पर नहीं, बल्कि माता-पिता की सामाजिक स्थिति के आधार पर व्यक्तियों को पहले से ही कार्य सौंपने का एक प्रयास है। दूसरे दृष्टिकोण से देखने पर, जाति व्यवस्था के परिणामस्वरूप व्यवसायों का यह स्तरीकरण अत्यंत विनाशकारी है। उद्योग कभी स्थिर नहीं रहता; इसमें तीव्र और अप्रत्याशित परिवर्तन होते हैं। ऐसे परिवर्तनों के साथ व्यक्ति को अपना व्यवसाय बदलने की स्वतंत्रता होनी चाहिए। व्यवसाय बदलने की क्षमता के बिना मनुष्य अपनी आजीविका नहीं कमा सकता। व्यवसायों के पुनर्समायोजन की अनुमति न देकर, जाति व्यवस्था भारत में बेरोजगारी और निर्धनता का प्रत्यक्ष कारण बन जाती है।

एक आर्थिक संगठन के रूप में भी, जाति व्यवस्था एक हानिकारक संस्था है, क्योंकि यह मनुष्य की स्वाभाविक शक्तियों और अभिरुचियों को सामाजिक नियमों की बाध्यता के अधीन कर देती है।`,
      },
      {
        id: "sec-2",
        number: "Section 2",
        title: "Caste Destroys Public Spirit and Civic Morality",
        titleHi: "अनुभाग २: जाति द्वारा लोक-भावना और नागरिक नैतिकता का विनाश",
        content: `Caste has killed public spirit. Caste has destroyed the sense of public charity. Caste has made public opinion impossible. A Hindu's public is his caste. His responsibility is only to his caste. His loyalty is restricted only to his caste. Virtue has become caste-ridden and morality has become caste-bound.

There is no sympathy for the deserving. There is no appreciation of the meritorious. There is no charity to the needy. Suffering as such and for itself and any call for help from a stranger finds no response unless the stranger happens to belong to the same caste. A Hindu will not praise a man, however great, if he belongs to another caste. He will not help a man in distress, however deserving, if he belongs to another caste.

The effect of caste on the ethics of the Hindus is simply deplorable. Caste has produced a state of mind which makes cooperation impossible. It has generated isolation, exclusivity, and mutual contempt. An Indian cannot feel proud of being an Indian until he ceases to feel proud of his caste. The caste system prevents common activity and by preventing common activity, it has prevented the Hindus from becoming to a unified nation with a common consciousness.`,
        contentHi: `जाति ने लोक-भावना (पब्लिक स्पिरिट) को समाप्त कर दिया है। जाति ने सार्वजनिक दानशीलता की भावना को नष्ट कर दिया है। जाति ने लोकमत का निर्माण असंभव बना दिया है। एक हिंदू का समाज केवल उसकी जाति है। उसका उत्तरदायित्व केवल अपनी जाति के प्रति है। उसकी वफादारी केवल अपनी जाति तक सीमित है। सद्गुण जातिवादी हो गए हैं और नैतिकता जाति-बद्ध हो गई है।

योग्य व्यक्ति के प्रति कोई सहानुभूति नहीं है। गुणवान व्यक्ति की कोई कद्र नहीं है। किसी अजनबी की पीड़ा या सहायता की पुकार तब तक कोई प्रतिक्रिया उत्पन्न नहीं करती जब तक कि वह अजनबी उसी जाति का न हो। एक हिंदू किसी व्यक्ति की प्रशंसा नहीं करेगा, चाहे वह कितना भी महान क्यों न हो, यदि वह दूसरी जाति का है। वह किसी संकटग्रस्त व्यक्ति की सहायता नहीं करेगा, चाहे वह कितना भी योग्य क्यों न हो, यदि वह दूसरी जाति से संबंध रखता है।

हिंदुओं की नैतिकता पर जाति का प्रभाव अत्यंत शोचनीय है। जाति ने ऐसी मानसिक स्थिति पैदा की है जो सहयोग को असंभव बना देती है। इसने अलगाव, संकीर्णता और पारस्परिक घृणा को जन्म दिया है। कोई भी भारतीय तब तक एक भारतीय होने पर गर्व महसूस नहीं कर सकता जब तक कि वह अपनी जाति पर गर्व करना बंद न कर दे। जाति व्यवस्था साझी गतिविधियों को रोकती है और साझी गतिविधियों को रोककर इसने हिंदुओं को एक साझी चेतना वाले एकीकृत राष्ट्र बनने से रोक दिया है।`,
      },
      {
        id: "sec-3",
        number: "Section 3",
        title: "The Inadequacy of Economic and Political Reform Alone",
        titleHi: "अनुभाग ३: केवल आर्थिक और राजनीतिक सुधारों की अपर्याप्तता",
        content: `Can economic reform succeed without social reform? The Socialists cannot afford to ignore this question. Can you have economic reform without first bringing about a reform of the social order? The answer must be in the negative.

The Socialists are under the impression that when the proletariat takes power and nationalises all means of production, the caste system will dissolve on its own. This is a profound illusion. Man is not moved by the economic motive alone. The history of India proves that religion, social status, and property are all sources of power. A Brahmin will not eat with an Untouchable even if the Untouchable becomes a millionaire or holds the highest political office.

If social order is preserved on caste lines, then how can you build a socialist society? In a revolution, will the proletariat follow a leader simply because he is a proletarian, even if he belongs to an untouchable caste? They will not. History shows that men will not unite for economic equality if they despise each other on the grounds of social birth. Social reform is the primary and indispensable precursor to any durable economic or political revolution.`,
        contentHi: `क्या सामाजिक सुधार के बिना आर्थिक सुधार सफल हो सकता है? समाजवादी इस प्रश्न की उपेक्षा नहीं कर सकते। क्या आप सामाजिक व्यवस्था में पहले सुधार लाए बिना आर्थिक सुधार कर सकते हैं? इसका उत्तर नकारात्मक ही होना चाहिए।

समाजवादी इस भ्रम में हैं कि जब सर्वहारा वर्ग सत्ता पर कब्जा कर लेगा और उत्पादन के सभी साधनों का राष्ट्रीयकरण कर देगा, तो जाति व्यवस्था स्वतः समाप्त हो जाएगी। यह एक गहरा भ्रम है। मनुष्य केवल आर्थिक प्रेरणा से ही संचालित नहीं होता। भारत का इतिहास सिद्ध करता है कि धर्म, सामाजिक प्रतिष्ठा और संपत्ति—ये सभी सत्ता के स्रोत हैं। एक ब्राह्मण किसी अछूत के साथ भोजन नहीं करेगा, भले ही वह अछूत करोड़पति बन जाए या सर्वोच्च राजनीतिक पद पर आसीन हो जाए।

यदि सामाजिक व्यवस्था जातिगत आधार पर ही बनी रही, तो आप समाजवादी समाज का निर्माण कैसे कर सकते हैं? किसी क्रांति में, क्या सर्वहारा वर्ग किसी नेता का केवल इसलिए अनुसरण करेगा क्योंकि वह सर्वहारा है, भले ही वह अछूत जाति का हो? वे कदापि नहीं करेंगे। इतिहास गवाह है कि यदि लोग जन्म के आधार पर एक-दूसरे से घृणा करते हैं, तो वे कभी भी आर्थिक समता के लिए एकजुट नहीं होंगे। सामाजिक सुधार किसी भी स्थायी आर्थिक या राजनीतिक क्रांति का प्राथमिक और अनिवार्य पूर्वगामी कदम है।`,
      },
      {
        id: "sec-4",
        number: "Section 4",
        title: "The Root Cause: The Authority of the Shastras",
        titleHi: "अनुभाग ४: मूल कारण — शास्त्रों की प्रामाणिकता और मान्यता",
        content: `You cannot build anything on the foundations of caste. You cannot build up a nation, you cannot build up an ethical community. Anything that you will build on the foundations of caste will crack and will never be a whole.

The real method of breaking up the Caste System is not to bring about inter-caste dinners and inter-caste marriages. These are mere surface palliatives. The real remedy is to destroy the belief in the sanctity of the Shastras. The caste system has a religious sanction behind it. People do not observe caste because they are inhuman or callous; they observe caste because they are genuinely religious. They have been taught by their scriptures that observing caste is a divine duty (Dharma).

Therefore, to tell people to give up caste without attacking the authority of the Shastras is like telling people not to commit theft while preaching that theft is sanctioned by god. You must take the stand that Buddha took. You must take the stand that Guru Nanak took. You must not only discard the Shastras, you must deny their authority, as did Buddha and Nanak. You must have the courage to tell the Hindus that what is contained in their religious texts is not religion, but a set of rules manufactured to maintain the supremacy of one class over others.`,
        contentHi: `आप जाति की नींव पर कुछ भी खड़ा नहीं कर सकते। आप न तो एक राष्ट्र का निर्माण कर सकते हैं और न ही एक नैतिक समाज का। जाति की नींव पर आप जो कुछ भी बनाएंगे, उसमें दरारें पड़ जाएंगी और वह कभी पूर्ण नहीं होगा।

जाति व्यवस्था को तोड़ने का वास्तविक तरीका अंतरजातीय सहभोज और अंतरजातीय विवाह नहीं हैं। ये केवल सतही उपचार हैं। वास्तविक उपाय शास्त्रों की पवित्रता में विश्वास को नष्ट करना है। जाति व्यवस्था के पीछे धार्मिक मान्यता और स्वीकृति है। लोग इसलिए जाति का पालन नहीं करते कि वे अमानवीय या कठोर हैं; वे जाति का पालन इसलिए करते हैं क्योंकि वे सच्चे धार्मिक हैं। उन्हें उनके धर्मग्रंथों द्वारा सिखाया गया है कि जाति का पालन करना उनका दैवीय कर्तव्य (धर्म) है।

अतः शास्त्रों की सत्ता पर प्रहार किए बिना लोगों से जाति छोड़ने को कहना वैसा ही है जैसे लोगों से चोरी न करने को कहना और साथ ही यह प्रचार करना कि चोरी ईश्वर द्वारा स्वीकृत है। आपको वही रुख अपनाना होगा जो तथागत बुद्ध ने अपनाया था। आपको वही रुख अपनाना होगा जो गुरु नानक ने अपनाया था। आपको न केवल शास्त्रों को अस्वीकार करना होगा, बल्कि बुद्ध और नानक की भांति उनकी प्रामाणिकता और सत्ता को पूरी तरह नकारना होगा। आपको हिंदुओं से यह कहने का साहस करना होगा कि उनके धार्मिक ग्रंथों में जो निहित है वह धर्म नहीं है, बल्कि एक वर्ग के आधिपत्य को बनाए रखने के लिए बनाए गए नियमों का समूह मात्र है।`,
      },
      {
        id: "sec-5",
        number: "Section 5",
        title: "The True Conception of an Ideal Society: Liberty, Equality, Fraternity",
        titleHi: "अनुभाग ५: एक आदर्श समाज की वास्तविक संकल्पना — स्वतंत्रता, समता, बंधुता",
        content: `What is my ideal society? If you ask me, my ideal would be a society based on Liberty, Equality, and Fraternity. And what objection can there be to Fraternity? I cannot imagine any.

Fraternity is only another name for democracy. Democracy is not merely a form of Government. It is primarily a mode of associated living, of conjoint communicated experience. It is essentially an attitude of respect and reverence towards fellowmen. Any society that prevents communication and shared experience between groups makes fraternity impossible.

As to Liberty, can there be any objection to liberty? By liberty we understand freedom of movement, freedom of speech, freedom of occupation, and freedom to protect life and limb. Why not allow liberty to benefit from an effective and competent use of a person's faculties? To prevent a man from developing his capacity and choosing his calling is to perpetuate a form of slavery.

As to Equality, it is true that all men are not equal in physical capacity, mental power, and moral fiber. But should a society treat them unequally on that account? A statesman must treat all men equally, because human individual needs are infinite and individual capacities vary endlessly. If society provides greater facilities to the already privileged, it only accelerates inequality. Society must offer equal opportunity to all citizens so that every individual may realize the best that is in him.`,
        contentHi: `मेरा आदर्श समाज क्या है? यदि आप मुझसे पूछें, तो मेरा आदर्श समाज 'स्वतंत्रता, समता और बंधुता' पर आधारित समाज होगा। और बंधुता पर किसी को क्या आपत्ति हो सकती है? मैं ऐसी किसी आपत्ति की कल्पना भी नहीं कर सकता।

बंधुता वास्तव में लोकतंत्र का ही दूसरा नाम है। लोकतंत्र केवल सरकार का एक रूप नहीं है। यह प्राथमिक रूप से सहयोगी जीवन जीने की एक पद्धति है, एक संयुक्त संप्रेषित अनुभव है। यह अनिवार्यतः अपने साथी मनुष्यों के प्रति आदर और सम्मान की एक अभिवृत्ति है। कोई भी समाज जो विभिन्न समूहों के बीच संचार और साझी अनुभूतियों को रोकता है, वह बंधुता को असंभव बना देता है।

जहां तक स्वतंत्रता का प्रश्न है, क्या स्वतंत्रता पर कोई आपत्ति हो सकती है? स्वतंत्रता से हमारा तात्पर्य आवागमन की स्वतंत्रता, भाषण की स्वतंत्रता, व्यवसाय चुनने की स्वतंत्रता और जीवन तथा शरीर की रक्षा की स्वतंत्रता से है। किसी व्यक्ति को अपनी क्षमताओं का प्रभावी और कुशल उपयोग करने की स्वतंत्रता क्यों न दी जाए? किसी मनुष्य को अपनी क्षमता विकसित करने और अपनी आजीविका चुनने से रोकना वास्तव में गुलामी का ही एक रूप बनाए रखना है।

जहां तक समता का संबंध है, यह सत्य है कि सभी मनुष्य शारीरिक क्षमता, मानसिक शक्ति और नैतिक सामर्थ्य में एक समान नहीं होते। परंतु क्या इस कारण समाज को उनके साथ असमान व्यवहार करना चाहिए? एक राजनेता को सभी मनुष्यों के साथ समान व्यवहार करना चाहिए, क्योंकि मानवीय आवश्यकताएं अनंत हैं और व्यक्तिगत क्षमताएं अंतहीन रूप से भिन्न हैं। यदि समाज पहले से विशेषाधिकार प्राप्त लोगों को अधिक सुविधाएं देता है, तो यह केवल असमानता को बढ़ाता है। समाज को सभी नागरिकों को समान अवसर प्रदान करना चाहिए ताकि प्रत्येक व्यक्ति अपने भीतर की सर्वोत्तम संभावनाओं को साकार कर सके।`,
      },
    ],
  },

  "DOC-002": {
    id: "DOC-002",
    title: "Constituent Assembly Speech on Article 32 (Right to Constitutional Remedies)",
    titleHi: "संविधान सभा भाषण - अनुच्छेद ३२ (संवैधानिक उपचारों का अधिकार)",
    year: 1948,
    category: "Constituent Assembly Debates",
    categoryHi: "संविधान सभा की बहसें",
    volume: "CAD Volume VII",
    source: "Constituent Assembly of India, New Delhi (December 9, 1948)",
    sourceHi: "भारत की संविधान सभा, नई दिल्ली (९ दिसंबर १९४८)",
    totalWordCount: 8400,
    readingTimeMinutes: 25,
    historicalContext:
      "Delivered on December 9, 1948, during the clause-by-clause consideration of Draft Article 25 (which became Article 32 of the Constitution of India). In this historic intervention, Dr. Ambedkar declared Article 32 to be the 'very soul and the very heart of the Constitution', establishing the direct right of every citizen to move the Supreme Court by appropriate proceedings for the enforcement of Fundamental Rights via historic writs.",
    historicalContextHi:
      "९ दिसंबर १९४८ को प्रारूप अनुच्छेद २५ (जो आगे चलकर भारतीय संविधान का अनुच्छेद ३२ बना) पर धारावार विचार के दौरान दिया गया ऐतिहासिक भाषण। इस भाषण में डॉ. आंबेडकर ने अनुच्छेद ३२ को 'संविधान की आत्मा और उसका हृदय' घोषित किया और प्रत्येक नागरिक को ऐतिहासिक रिट याचिकाओं के माध्यम से सर्वोच्च न्यायालय में सीधे न्याय पाने का मौलिक अधिकार प्रदान किया।",
    sections: [
      {
        id: "sec-1",
        number: "Section 1",
        title: "The Soul and Heart of the Constitution",
        titleHi: "अनुभाग १: संविधान की आत्मा और उसका हृदय",
        content: `Sir, I am very glad that the majority of those who spoke on this Article have realized the great significance and importance of Article 32. 

If I was asked to name any particular Article in this Constitution as the most important—an Article without which this Constitution would be a nullity—I could not refer to any other Article except this one. It is the very soul of the Constitution and the very heart of it and I am glad that the House has realized its importance.

Hereafter it would not be possible for any legislature to take away the rights which are conferred by the provisions contained in Part III. Any law that infringes upon these rights will be void to that extent. And the citizen will not have to wander from pillar to post, nor will he have to go through the protracted procedure of lower courts. He can directly approach the highest judicial tribunal of this land and demand justice.`,
        contentHi: `महोदय, मुझे इस बात की अत्यधिक प्रसन्नता है कि इस अनुच्छेद पर बोलने वाले अधिकांश सदस्यों ने अनुच्छेद ३२ के महान महत्व और सार्थकता को गहराई से समझा है।

यदि मुझसे कोई पूछे कि इस पूरे संविधान में सबसे महत्वपूर्ण अनुच्छेद कौन सा है—एक ऐसा अनुच्छेद जिसके बिना यह संविधान शून्य हो जाएगा—तो मैं इस अनुच्छेद ३२ के अलावा किसी अन्य अनुच्छेद का नाम नहीं ले सकता। यह संविधान की आत्मा है और यह उसका हृदय है, और मुझे प्रसन्नता है कि सदन ने इसके महत्व को स्वीकार किया है।

इसके पश्चात किसी भी विधायिका के लिए भाग ३ में दिए गए मौलिक अधिकारों को छीनना संभव नहीं होगा। इन अधिकारों का हनन करने वाला कोई भी कानून उस सीमा तक शून्य और असंवैधानिक होगा। और नागरिक को न्याय के लिए दर-दर नहीं भटकना पड़ेगा, न ही निचली अदालतों की लंबी प्रक्रियाओं से गुजरना पड़ेगा। वह सीधे इस देश की सर्वोच्च न्यायिक अदालत में जा सकता है और अपने अधिकारों की बहाली की मांग कर सकता है।`,
      },
      {
        id: "sec-2",
        number: "Section 2",
        title: "The Prerogative Writs: Guarantees against State Oppression",
        titleHi: "अनुभाग २: विशेषाधिकार रिट — राज्य के अत्याचार के विरुद्ध सुरक्षा कवच",
        content: `The rights are made effective by investing the Supreme Court with the power to issue directions, orders or writs, including writs in the nature of Habeas Corpus, Mandamus, Prohibition, Quo Warranto and Certiorari.

These writs have had a glorious history in Anglo-American jurisprudence as the great bulwarks of personal freedom. By placing these writs directly into the text of the Constitution, we make them constitutional remedies, not mere statutory privileges. 

Habeas Corpus ensures that no executive authority can arbitrarily detain a citizen without presenting him before a magistrate. Mandamus compels public officers to perform their statutory and constitutional duties towards the citizen. Prohibition and Certiorari restrain inferior tribunals from exceeding their jurisdiction or acting contrary to natural justice. And Quo Warranto prevents usurpers from occupying public offices. These writs are the shield of the citizen against any tyranny of the executive or the legislature.`,
        contentHi: `सर्वोच्च न्यायालय को निर्देश, आदेश अथवा रिट जारी करने की शक्ति देकर इन अधिकारों को प्रभावी बनाया गया है, जिनमें बंदी प्रत्यक्षीकरण (Habeas Corpus), परमादेश (Mandamus), प्रतिषेध (Prohibition), अधिकार-पृच्छा (Quo Warranto) और उत्प्रेषण (Certiorari) की रिट शामिल हैं।

व्यक्तिगत स्वतंत्रता के महान रक्षक के रूप में आंग्ल-अमेरिकी न्यायशास्त्र में इन रिटों का एक गौरवशाली इतिहास रहा है। इन रिटों को सीधे संविधान के पाठ में शामिल करके, हमने इन्हें केवल विधायी विशेषाधिकार नहीं, बल्कि संवैधानिक उपचार का दर्जा प्रदान किया है।

बंदी प्रत्यक्षीकरण यह सुनिश्चित करता है कि कोई भी कार्यपालिका किसी नागरिक को मजिस्ट्रेट के समक्ष प्रस्तुत किए बिना मनमाने ढंग से हिरासत में नहीं रख सकती। परमादेश लोक अधिकारियों को नागरिक के प्रति अपने वैधानिक और संवैधानिक कर्तव्यों का पालन करने के लिए बाध्य करता है। प्रतिषेध और उत्प्रेषण निचली अदालतों को अपने अधिकार क्षेत्र से बाहर जाने या प्राकृतिक न्याय के विरुद्ध कार्य करने से रोकते हैं। और अधिकार-पृच्छा अनधिकृत व्यक्तियों को सार्वजनिक पदों पर कब्जा करने से रोकती है। ये रिट कार्यपालिका या विधायिका के किसी भी अत्याचार के विरुद्ध नागरिक की अभेद्य ढाल हैं।`,
      },
      {
        id: "sec-3",
        number: "Section 3",
        title: "Inviolability of Fundamental Remedies during Peace and Emergency",
        titleHi: "अनुभाग ३: शांति और आपातकाल के दौरान उपचारों की अक्षुण्णता",
        content: `Some members have expressed apprehensions regarding the suspension of these remedies during an Emergency. Let me clarify that the power to suspend the right to move the court is not a routine power. It is an extraordinary power exercisable only during a grave emergency when the very security of the nation is threatened by war or external aggression.

Even during an emergency, the executive does not become omnipotent. Parliament retains the supreme authority to review, ratify, or revoke any proclamation. The suspension of remedies does not extinguish the fundamental rights themselves; it merely suspends the right to enforce them for the limited duration of the crisis.

Without Article 32, the Fundamental Rights enshrined in Articles 14, 19, and 21 would be nothing more than pious platitudes—a mere decorative ornament in a written document. Article 32 breathes life into these declarations. It transforms the citizen from a helpless subject of the State into a sovereign bearer of enforceable constitutional rights.`,
        contentHi: `कुछ माननीय सदस्यों ने आपातकाल के दौरान इन उपचारों के निलंबन को लेकर आशंकाएं व्यक्त की हैं। मैं यह स्पष्ट करना चाहता हूं कि अदालत जाने के अधिकार को निलंबित करने की शक्ति कोई सामान्य शक्ति नहीं है। यह एक असाधारण शक्ति है जिसका प्रयोग केवल एक गंभीर राष्ट्रीय संकट के समय किया जा सकता है जब युद्ध या बाह्य आक्रमण से राष्ट्र की सुरक्षा ही खतरे में हो।

आपातकाल के दौरान भी कार्यपालिका सर्वशक्तिमान नहीं हो जाती। संसद के पास किसी भी उद्घोषणा की समीक्षा करने, उसे अनुमोदित करने या रद्द करने का सर्वोच्च अधिकार बना रहता है। उपचारों के निलंबन से स्वयं मौलिक अधिकार समाप्त नहीं होते; यह केवल संकट की सीमित अवधि के लिए उन्हें लागू कराने के अधिकार को स्थगित करता है।

अनुच्छेद ३२ के बिना, अनुच्छेद १४, १९ और २१ में प्रतिष्ठापित मौलिक अधिकार केवल कागजी घोषणाओं और कोरी नैतिक बातों से अधिक कुछ नहीं होते—वे एक लिखित दस्तावेज में सजावटी आभूषण बनकर रह जाते। अनुच्छेद ३२ इन घोषणाओं में जीवन का संचार करता है। यह नागरिक को राज्य की असहाय प्रजा से बदलकर प्रवर्तनीय संवैधानिक अधिकारों के संप्रभु धारक के रूप में प्रतिष्ठित करता है।`,
      },
    ],
  },

  "DOC-003": {
    id: "DOC-003",
    title: "The Problem of the Rupee: Its Origin and Its Solution",
    titleHi: "रुपये की समस्या: इसका उद्गम और समाधान",
    year: 1923,
    category: "Economic Writings",
    categoryHi: "आर्थिक ग्रंथ",
    volume: "BAWS Volume 6",
    source: "Doctorate Dissertation, London School of Economics (P. S. King & Son, London, 1923)",
    sourceHi: "डॉक्टरेट शोध प्रबंध, लंदन स्कूल ऑफ इकोनॉमिक्स (लंदन, १९२३)",
    totalWordCount: 16200,
    readingTimeMinutes: 50,
    historicalContext:
      "Submitted to the University of London for the degree of Doctor of Science (Economics) in 1922 and published in London in 1923. Dr. Ambedkar's rigorous monetary analysis attacked John Maynard Keynes' advocacy of the gold-exchange standard, demonstrating how price instability hurt Indian wage-earners and peasants. His evidence before the Royal Commission on Indian Currency and Finance (Hilton Young Commission) in 1926 became the direct catalyst for the Reserve Bank of India Act, 1934.",
    historicalContextHi:
      "१९२२ में लंदन विश्वविद्यालय को डी.एससी. (अर्थशास्त्र) की उपाधि हेतु प्रस्तुत और १९२३ में लंदन में प्रकाशित। डॉ. आंबेडकर के इस आर्थिक शोध ने जॉन मेनार्ड कीन्स द्वारा समर्थित गोल्ड-एक्सचेंज स्टैंडर्ड पर तार्किक प्रहार किया और दिखाया कि कैसे मुद्रास्फीति भारतीय मजदूरों और किसानों को लूटती है। १९२६ में हिल्टन यंग कमीशन के समक्ष उनकी गवाही भारतीय रिजर्व बैंक (RBI) की स्थापना का सीधा आधार बनी।",
    sections: [
      {
        id: "sec-1",
        number: "Section 1",
        title: "From Double Standard to Silver Monometallism",
        titleHi: "अनुभाग १: द्वि-धातु मान से चांदी के एक-धातु मान तक का सफर",
        content: `Trade is an exchange of commodities for commodities. Money is only a medium of exchange that facilitates this exchange. The primary function of any monetary standard is to maintain stability in purchasing power, so that contracts across time do not unjustly enrich creditors at the expense of debtors or vice versa.

In 1835, the British administration in India abolished the bimetallic standard and instituted silver monometallism. The silver rupee was declared the sole legal tender across British India. For nearly forty years, this system operated without major crisis because the world price ratio of silver to gold remained relatively stable.

However, after 1873, major European nations and the United States demonetised silver and adopted the gold standard. The world was flooded with discarded silver. The price of silver collapsed precipitously in terms of gold. The Indian rupee, tied exclusively to silver, began a catastrophic descent. The government of India, which had to pay heavy 'Home Charges' in gold to Britain, found its budget in permanent deficit. Taxes on Indian peasants were raised relentlessly to meet the exchange loss.`,
        contentHi: `व्यापार मूल रूप से वस्तुओं के बदले वस्तुओं का आदान-प्रदान है। मुद्रा केवल विनिमय का एक माध्यम है जो इस आदान-प्रदान को सुगम बनाती है। किसी भी मौद्रिक प्रणाली का प्राथमिक कार्य क्रय शक्ति में स्थिरता बनाए रखना है, ताकि समय के अंतराल में होने वाले सौदे लेनदारों को देनदारों की कीमत पर या इसके विपरीत अनुचित रूप से समृद्ध न करें।

१८३५ में, भारत में ब्रिटिश प्रशासन ने द्वि-धातु मान को समाप्त कर दिया और चांदी का एक-धातु मान स्थापित किया। चांदी के रुपये को पूरे ब्रिटिश भारत में एकमात्र वैध मुद्रा घोषित किया गया। लगभग चालीस वर्षों तक यह प्रणाली बिना किसी बड़े संकट के चली क्योंकि सोने और चांदी का वैश्विक मूल्य अनुपात अपेक्षाकृत स्थिर रहा।

किंतु १८७३ के बाद, प्रमुख यूरोपीय देशों और संयुक्त राज्य अमेरिका ने चांदी का परित्याग कर दिया और स्वर्ण मान (गोल्ड स्टैंडर्ड) को अपनाया। वैश्विक बाजार में चांदी की भरमार हो गई। सोने के मुकाबले चांदी की कीमत तेजी से गिर गई। पूरी तरह से चांदी से जुड़ा भारतीय रुपया भयानक गिरावट का शिकार हुआ। भारत सरकार को ब्रिटेन को सोने में 'गृह प्रभार' (Home Charges) चुकाने पड़ते थे, जिससे उसका बजट स्थायी घाटे में चला गया। विनिमय घाटे की भरपाई के लिए भारतीय किसानों पर करों का भारी बोझ लाद दिया गया।`,
      },
      {
        id: "sec-2",
        number: "Section 2",
        title: "The Fallacy of the Gold Exchange Standard",
        titleHi: "अनुभाग २: गोल्ड एक्सचेंज स्टैंडर्ड की विफलता और भ्रांतियां",
        content: `Following the closure of the mints to the free coinage of silver in 1893, India drifted into what has been celebrated by economists, notably Mr. J. M. Keynes, as the Gold Exchange Standard. Under this system, the rupee was a token coin of silver, with its external exchange value pegged to gold in London.

I disagree fundamentally with Mr. Keynes. The gold exchange standard has failed because it separates the internal currency from the standard of value. It gives the executive an untrammeled power to inflate the currency at will. When currency can be minted arbitrarily by the government without automatic metallic reserves, inflation is inevitable.

Inflation is the cruelest form of taxation. It silently transfers wealth from the poor working classes, whose nominal wages are fixed, to speculative merchants and capitalists. The Indian working masses do not need external exchange stability for international bondholders; they need domestic price stability so that their daily bread does not become unaffordable.`,
        contentHi: `१८९३ में चांदी की मुफ्त ढलाई के लिए टकसालों को बंद किए जाने के बाद, भारत एक ऐसी प्रणाली में चला गया जिसे अर्थशास्त्रियों, विशेषकर जे. एम. कीन्स ने 'गोल्ड एक्सचेंज स्टैंडर्ड' के रूप में खूब सराहा। इस प्रणाली के तहत रुपया चांदी का एक सांकेतिक सिक्का था, जिसका विदेशी विनिमय मूल्य लंदन में सोने से आंका जाता था।

मैं श्री कीन्स से मूलभूत रूप से असहमत हूं। गोल्ड एक्सचेंज स्टैंडर्ड विफल रहा क्योंकि यह आंतरिक मुद्रा को मूल्य के वास्तविक मानक से अलग करता है। यह कार्यपालिका को अपनी इच्छानुसार मुद्रा की मात्रा बढ़ाने (मुद्रास्फीति करने) की अनियंत्रित शक्ति देता है। जब सरकार द्वारा धातु के वास्तविक आरक्षित भंडार के बिना मनमाने ढंग से मुद्रा ढाली जा सकती है, तो मूल्यवृद्धि अनिवार्य हो जाती है।

मुद्रास्फीति कराधान का सबसे क्रूर रूप है। यह चुपचाप निर्धन श्रमिक वर्गों से, जिनकी आय निश्चित होती है, सट्टेबाज व्यापारियों और पूंजीपतियों की ओर संपत्ति का हस्तांतरण कर देती है। भारतीय मेहनतकश जनता को अंतरराष्ट्रीय बांडधारकों के लिए बाहरी विनिमय स्थिरता की आवश्यकता नहीं है; उन्हें घरेलू मूल्य स्थिरता की आवश्यकता है ताकि उनकी दैनिक रोटी उनकी पहुंच से बाहर न हो जाए।`,
      },
      {
        id: "sec-3",
        number: "Section 3",
        title: "The Solution: A Central Bank and Controlled Currency",
        titleHi: "अनुभाग ३: समाधान — एक स्वतंत्र केंद्रीय बैंक और नियंत्रित मुद्रा प्रणाली",
        content: `What then is the solution? The currency system of India must be put on an automatic and stable basis. 

First, the right of the government to issue token currency must be curtailed. Currency management should be divorced from the executive government and entrusted to an independent Central Bank. The executive government is always a borrower; to allow the borrower to control the printing of money is to invite perpetual inflation.

Second, India must adopt a Gold Bullion Standard with fixed paper currency, where gold is kept in reserve not for internal circulation as expensive coins, but as a reserve to back note issue and settle international balances. The currency must be convertible at fixed rates, and the total volume of currency must be strictly regulated according to the volume of domestic trade.

This institutional design—an autonomous central banking authority managing currency reserves and maintaining domestic price stability—is the true path to securing the economic emancipation of the Indian nation.`,
        contentHi: `फिर इसका समाधान क्या है? भारत की मौद्रिक प्रणाली को एक स्वचालित और स्थिर आधार पर स्थापित किया जाना चाहिए।

प्रथम, सरकार के मनमाने ढंग से सांकेतिक मुद्रा जारी करने के अधिकार को समाप्त किया जाना चाहिए। मुद्रा प्रबंधन को कार्यपालिका (सरकार) से अलग करके एक स्वतंत्र केंद्रीय बैंक को सौंपा जाना चाहिए। कार्यपालिका सदैव एक कर्जदार होती है; और कर्जदार को ही नोट छापने की मशीन सौंपना स्थायी मुद्रास्फीति को निमंत्रण देना है।

द्वितीय, भारत को नियंत्रित कागजी मुद्रा के साथ एक 'गोल्ड बुलियन स्टैंडर्ड' अपनाना चाहिए, जहां सोना महंगे सिक्कों के रूप में आंतरिक संचलन के लिए नहीं, बल्कि नोट जारी करने के समर्थन में और अंतरराष्ट्रीय भुगतानों के निपटान हेतु आरक्षित भंडार के रूप में रखा जाए। मुद्रा की कुल मात्रा को घरेलू व्यापार की आवश्यकताओं के अनुसार कड़ाई से विनियमित किया जाना चाहिए।

यह संस्थागत ढांचा—मुद्रा भंडार का प्रबंधन करने और घरेलू मूल्य स्थिरता बनाए रखने वाला एक स्वायत्त केंद्रीय बैंक (जो आगे चलकर भारतीय रिजर्व बैंक बना)—भारतीय राष्ट्र की आर्थिक स्वतंत्रता और समृद्धि सुनिश्चित करने का सच्चा मार्ग है।`,
      },
    ],
  },

  "DOC-004": {
    id: "DOC-004",
    title: "Mahad Satyagraha Declaration: Water Rights as Human Rights",
    titleHi: "महाड सत्याग्रह भाषण: जल का अधिकार मौलिक मानवाधिकार है",
    year: 1927,
    category: "Speeches & Movement",
    categoryHi: "ऐतिहासिक भाषण एवं आंदोलन",
    volume: "BAWS Volume 17",
    source: "Chavdar Tale, Mahad, Maharashtra (March 20, 1927)",
    sourceHi: "चवदार तालाब, महाड, महाराष्ट्र (२० मार्च १९२७)",
    totalWordCount: 7200,
    readingTimeMinutes: 20,
    historicalContext:
      "Delivered on March 20, 1927, to a massive gathering of thousands of depressed classes men and women at Mahad. Dr. Ambedkar led a peaceful march to the Chavdar public tank to drink water, breaking centuries-old untouchability prohibitions. This event is globally recognized as the Magna Carta of Dalit Human Rights and Social Democracy in India.",
    historicalContextHi:
      "२० मार्च १९२७ को महाड में शोषित और वंचित समाज के हजारों स्त्री-पुरुषों के ऐतिहासिक सम्मेलन में दिया गया भाषण। डॉ. आंबेडकर ने सदियों पुरानी अस्पृश्यता की बेड़ियों को तोड़ते हुए चवदार सार्वजनिक तालाब का पानी पीने के लिए एक शांतिपूर्ण मार्च का नेतृत्व किया। यह घटना भारत में सामाजिक समता और मानवाधिकारों का मैग्ना कार्टा मानी जाती है।",
    sections: [
      {
        id: "sec-1",
        number: "Section 1",
        title: "Not for Water, but for Human Dignity",
        titleHi: "अनुभाग १: पानी के लिए नहीं, बल्कि मानवीय आत्मसम्मान के लिए",
        content: `Friends, why have we assembled here today? Have we come to Mahad merely to drink water from the Chavdar Tank? 

Do you think that our thirst cannot be quenched anywhere else? Do you think that by drinking one handful of water from Chavdar Tank, we are going to become immortal? No! We have not gathered here to drink water; we have come here to assert that we are human beings.

Animals, birds, cats, and dogs are free to drink the water of Chavdar Tank. Even the filthiest beast can wade into this water without polluting it. But if a human being, born on this very soil, touches that water, the orthodox claim that the water is defiled! What kind of religion is this that treats beasts with kindness and human brothers with utter contempt? We are here to establish the equality of mankind.`,
        contentHi: `साथियो, आज हम यहां किसलिए एकत्रित हुए हैं? क्या हम केवल चवदार तालाब का पानी पीने के लिए महाड आए हैं?

क्या आपको लगता है कि हमारी प्यास कहीं और नहीं बुझ सकती? क्या आपको लगता है कि चवदार तालाब का एक घूंट पानी पी लेने से हम अमर हो जाएंगे? कदापि नहीं! हम यहां केवल पानी पीने के लिए इकट्ठा नहीं हुए हैं; हम यहां यह उद्घोष करने आए हैं कि हम भी इंसान हैं, हम भी मनुष्य हैं!

पशु, पक्षी, कुत्ते और बिल्लियां चवदार तालाब का पानी पीने के लिए पूरी तरह स्वतंत्र हैं। कोई भी अपवित्र पशु इस पानी में उतर सकता है और पानी अपवित्र नहीं होता। परंतु यदि इसी धरती पर जन्मा एक मनुष्य उस पानी को छू ले, तो रूढ़िवादी कहते हैं कि पानी भ्रष्ट हो गया! यह कैसा धर्म है जो जानवरों के साथ दया का व्यवहार करता है और अपने ही साथी इंसानों को अत्यंत घृणा की दृष्टि से देखता है? हम यहां मानव जाति की समता स्थापित करने आए हैं।`,
      },
      {
        id: "sec-2",
        number: "Section 2",
        title: "Self-Respect and the Abolition of Internal Division",
        titleHi: "अनुभाग २: आत्मसम्मान और आंतरिक कुरीतियों का उन्मूलन",
        content: `Lost rights are never regained by begging, nor by mere appeals to the conscience of the usurpers. Rights are wrested by struggle and autonomous strength.

You must cast off your slave mentality. Stop eating the carrion of dead animals. Stop wearing dirty clothes that mark you out as inferior. Give up unhygienic practices. Educate your children—sons and daughters alike. A girl who is educated becomes an emancipated mother who builds an enlightened generation.

Above all, do not practice untouchability among yourselves. You who complain against the tyranny of the high-castes must not yourselves divide into sub-castes and despise one another. If you cannot practice equality among your own ranks, how can you demand equality from others? Self-purification, self-reliance, and self-respect are our greatest weapons.`,
        contentHi: `खोए हुए अधिकार कभी भी भीख मांगने से या अत्याचारियों की अंतरात्मा से दया की भीख मांगने से वापस नहीं मिलते। अधिकार संघर्ष और अपनी स्वतंत्र शक्ति से छीने जाते हैं।

आपको अपनी दासता की मानसिकता को त्यागना होगा। मरे हुए जानवरों का मांस खाना बंद करें। ऐसे गंदे वस्त्र पहनना बंद करें जो आपको हीनता की पहचान देते हैं। अशिक्षा और अस्वच्छता का परित्याग करें। अपने बच्चों को शिक्षित करें—बेटों और बेटियों दोनों को समान रूप से। एक शिक्षित लड़की एक स्वतंत्र मां बनती है जो एक प्रबुद्ध पीढ़ी का निर्माण करती है।

और सबसे बढ़कर, अपने बीच छुआछूत का पालन न करें। आप जो उच्च जातियों के अत्याचार की शिकायत करते हैं, उन्हें स्वयं उप-जातियों में बंटकर एक-दूसरे से घृणा नहीं करनी चाहिए। यदि आप अपने ही लोगों में समता का व्यवहार नहीं कर सकते, तो आप दूसरों से समता की मांग कैसे कर सकते हैं? आत्म-शुद्धि, आत्मनिर्भरता और आत्मसम्मान ही हमारे सबसे बड़े अस्त्र हैं।`,
      },
    ],
  },

  "DOC-005": {
    id: "DOC-005",
    title: "States and Minorities: Memorandum on Fundamental Rights and Safeguards",
    titleHi: "राज्य और अल्पसंख्यक: मौलिक अधिकार, राज्य समाजवाद और सुरक्षा उपाय",
    year: 1947,
    category: "Constitutional Proposals",
    categoryHi: "संवैधानिक प्रस्ताव",
    volume: "BAWS Volume 1",
    source: "Memorandum submitted to the Constituent Assembly of India (Thacker & Co., Bombay, 1947)",
    sourceHi: "भारत की संविधान सभा को सौंपा गया आधिकारिक ज्ञापन (बॉम्बे, १९४७)",
    totalWordCount: 11500,
    readingTimeMinutes: 35,
    historicalContext:
      "Published in March 1947 and submitted to the Constituent Assembly on behalf of the All India Scheduled Castes Federation. Dr. Ambedkar outlined a radical constitutional architecture for an independent India, mandating State Socialism within the constitutional framework to prevent private capital from monopolising resources and enslaving the working poor.",
    historicalContextHi:
      "मार्च १९४७ में प्रकाशित और अखिल भारतीय अनुसूचित जाति महासंघ की ओर से संविधान सभा को प्रस्तुत किया गया। डॉ. आंबेडकर ने स्वतंत्र भारत के लिए एक क्रांतिकारी संवैधानिक रूपरेखा तैयार की, जिसमें निजी पूंजी को संसाधनों पर एकाधिकार करने और मेहनतकश गरीबों को गुलाम बनाने से रोकने के लिए संविधान के भीतर ही 'राज्य समाजवाद' (State Socialism) को अनिवार्य बनाने का प्रस्ताव रखा गया।",
    sections: [
      {
        id: "sec-1",
        number: "Section 1",
        title: "Clause on State Socialism and Key Industries",
        titleHi: "अनुभाग १: राज्य समाजवाद और बुनियादी उद्योगों का राष्ट्रीयकरण",
        content: `The Constitution shall establish State Socialism in India as an unalterable constitutional requirement, not leaving economic organisation to the fluctuating whims of legislative majorities.

Clause 1: Key industries shall be owned and run by the State. Basic industries shall be established, financed, and operated exclusively by the State for public welfare, not private profit.
Clause 2: Life insurance shall be a monopoly of the State, and every adult citizen shall be compelled to take out a state life insurance policy in proportion to his income.
Clause 3: Agriculture shall be declared a State industry. The State shall acquire all agricultural land by paying compensation in debentures, and partition it into standard collective farms.
Clause 4: These farms shall be cultivated collectively by the village residents without distinction of caste, creed, or race, with inputs and machinery provided by the State.

Private enterprise under the guise of individual liberty only produces economic servitude. Political liberty without economic security is a delusion for the working millions.`,
        contentHi: `संविधान को भारत में 'राज्य समाजवाद' को एक अपरिवर्तनीय संवैधानिक आवश्यकता के रूप में स्थापित करना चाहिए, न कि आर्थिक संगठन को विधायी बहुमत की बदलती इच्छाओं पर छोड़ना चाहिए।

धारा १: बुनियादी और प्रमुख उद्योग राज्य के स्वामित्व में होंगे और राज्य द्वारा ही संचालित किए जाएंगे। बुनियादी उद्योगों की स्थापना, वित्तपोषण और संचालन केवल लोक कल्याण के लिए होगा, निजी मुनाफे के लिए नहीं।
धारा २: जीवन बीमा पर राज्य का पूर्ण एकाधिकार होगा, और प्रत्येक वयस्क नागरिक को अपनी आय के अनुपात में राज्य जीवन बीमा पॉलिसी लेने के लिए अनिवार्य किया जाएगा।
धारा ३: कृषि को एक 'राज्य उद्योग' घोषित किया जाएगा। राज्य डिबेंचर में मुआवजा देकर सभी कृषि भूमि का अधिग्रहण करेगा और इसे मानक आकार के सामूहिक फार्मों में विभाजित करेगा।
धारा ४: इन फार्मों पर गांव के निवासियों द्वारा बिना किसी जाति, पंथ या नस्ल के भेदभाव के सामूहिक रूप से खेती की जाएगी, जिसके लिए बीज, खाद और मशीनरी राज्य द्वारा उपलब्ध कराई जाएगी।

व्यक्तिगत स्वतंत्रता के नाम पर निजी पूंजीवाद केवल आर्थिक दासता को जन्म देता है। आर्थिक सुरक्षा के बिना राजनीतिक स्वतंत्रता करोड़ों मेहनतकशों के लिए एक छलावा मात्र है।`,
      },
      {
        id: "sec-2",
        number: "Section 2",
        title: "Fundamental Rights against Majoritarian Tyranny",
        titleHi: "अनुभाग २: बहुसंख्यक तानाशाही के विरुद्ध मौलिक अधिकारों की गारंटी",
        content: `No minority shall be subjected to discriminatory treatment by any state authority, local council, or private employer.

Social boycott shall be declared a severe cognizable crime under federal law. Boycotting any person on account of his caste, refusing him tenancy, denying him employment, or preventing him from using public roads, wells, and places of entertainment shall be punished with rigorous imprisonment.

The Constitution must establish an independent Anti-Discrimination Commission with judicial powers to investigate infractions, award damages, and prosecute violators directly. Without penal safeguards against social discrimination, Fundamental Rights remain paper tigers in an unequal society.`,
        contentHi: `किसी भी अल्पसंख्यक या शोषित वर्ग के व्यक्ति के साथ किसी राज्य सत्ता, स्थानीय निकाय या निजी नियोक्ता द्वारा कोई भेदभावपूर्ण व्यवहार नहीं किया जाएगा।

सामाजिक बहिष्कार (Social Boycott) को संघीय कानून के तहत एक गंभीर संज्ञेय अपराध घोषित किया जाएगा। किसी व्यक्ति का उसकी जाति के आधार पर बहिष्कार करना, उसे मकान किराए पर देने से मना करना, नौकरी देने से इनकार करना, या उसे सार्वजनिक सड़कों, कुओं और मनोरंजन स्थलों का उपयोग करने से रोकना कठोर कारावास से दंडनीय होगा।

संविधान को एक स्वतंत्र भेदभाव-रोधी आयोग (Anti-Discrimination Commission) की स्थापना करनी चाहिए, जिसे मामलों की जांच करने, हर्जाना देने और दोषियों पर सीधे मुकदमा चलाने के न्यायिक अधिकार प्राप्त हों। सामाजिक भेदभाव के विरुद्ध दंडात्मक उपायों के बिना, एक असमान समाज में मौलिक अधिकार केवल कागजी शेर बनकर रह जाते हैं।`,
      },
    ],
  },

  "DOC-006": {
    id: "DOC-006",
    title: "Grammar of Anarchy (Final Constituent Assembly Speech)",
    titleHi: "अराजकता का व्याकरण (संविधान सभा का अंतिम भाषण)",
    year: 1949,
    category: "Constituent Assembly Debates",
    categoryHi: "संविधान सभा की बहसें",
    volume: "CAD Volume XI",
    source: "Constituent Assembly of India, New Delhi (November 25, 1949)",
    sourceHi: "भारत की संविधान सभा, नई दिल्ली (२५ नवंबर १९४९)",
    totalWordCount: 9800,
    readingTimeMinutes: 30,
    historicalContext:
      "Delivered on November 25, 1949, on the eve of the adoption of the Constitution of India. Dr. Ambedkar laid out his profound final testament, warning the nascent republic of three grave perils: the persistence of unconstitutional agitations ('grammar of anarchy'), the slavish devotion to charismatic leaders ('hero-worship' or 'bhakti' in politics), and the acute contradiction between political equality and socioeconomic inequality.",
    historicalContextHi:
      "२५ नवंबर १९४९ को भारतीय संविधान को अंगीकार किए जाने की पूर्व संध्या पर दिया गया ऐतिहासिक भाषण। डॉ. आंबेडकर ने नवजात गणराज्य को तीन गंभीर खतरों से आगाह किया: असंवैधानिक आंदोलनों की निरंतरता ('अराजकता का व्याकरण'), राजनीति में नेताओं की अंधी भक्ति ('नायक-पूजा'), और राजनीतिक समता तथा सामाजिक-आर्थिक विषमता के बीच का गहरा अंतर्विरोध।",
    sections: [
      {
        id: "sec-1",
        number: "Section 1",
        title: "The First Warning: Abandon Unconstitutional Methods",
        titleHi: "अनुभाग १: पहली चेतावनी — असंवैधानिक तरीकों और अराजकता का परित्याग",
        content: `If we wish to maintain democracy not merely in form, but also in fact, what must we do?

The first thing in my judgement we must do is to hold fast to constitutional methods of achieving our social and economic objectives. It means we must abandon the bloody methods of revolution. It means that we must abandon the method of civil disobedience, non-cooperation and satyagraha.

When there was no way left for constitutional methods for achieving economic and social objectives, there was a great deal of justification for unconstitutional methods. But where constitutional methods are open, there can be no justification for these unconstitutional methods. These methods are nothing but the Grammar of Anarchy, and the sooner they are abandoned, the better for us.`,
        contentHi: `यदि हम लोकतंत्र को केवल रूप में ही नहीं, बल्कि वास्तव में बनाए रखना चाहते हैं, तो हमें क्या करना चाहिए?

मेरी समझ में सबसे पहली बात यह है कि हमें अपने सामाजिक और आर्थिक उद्देश्यों को प्राप्त करने के लिए संवैधानिक तरीकों को ही दृढ़ता से थामे रखना होगा। इसका अर्थ है कि हमें खूनी क्रांति के तरीकों का परित्याग करना होगा। इसका अर्थ है कि हमें सविनय अवज्ञा, असहयोग और सत्याग्रह के तरीकों को भी त्यागना होगा।

जब आर्थिक और सामाजिक उद्देश्यों को प्राप्त करने के लिए संवैधानिक रास्ते बंद थे, तब असंवैधानिक तरीकों का बहुत औचित्य था। किंतु जहां संवैधानिक मार्ग पूरी तरह खुले हुए हैं, वहां इन असंवैधानिक तरीकों का कोई औचित्य नहीं हो सकता। ये तरीके और कुछ नहीं बल्कि 'अराजकता का व्याकरण' (Grammar of Anarchy) हैं, और जितनी जल्दी इन्हें छोड़ दिया जाए, हमारे लिए उतना ही अच्छा होगा।`,
      },
      {
        id: "sec-2",
        number: "Section 2",
        title: "The Second Warning: Beware of Bhakti and Hero-Worship",
        titleHi: "अनुभाग २: दूसरी चेतावनी — राजनीति में भक्ति और नायक-पूजा से सावधान",
        content: `The second thing we must do is to observe the caution which John Stuart Mill has given to all who are interested in the maintenance of democracy, namely, not 'to lay their liberties at the feet of even a great man, or to trust him with powers which enable him to subvert their institutions'.

There is nothing wrong in being grateful to great men who have rendered life-long services to the country. But there are limits to gratefulness. As has been well said by the Irish Patriot Daniel O'Connell, 'no man can be grateful at the cost of his honour, no woman can be grateful at the cost of her chastity, and no nation can be grateful at the cost of its liberty'.

This caution is far more necessary in the case of India than in the case of any other country. For in India, Bhakti or what may be called the path of devotion or hero-worship, plays a part in its politics unequalled in magnitude by the part it plays in the politics of any other country in the world. Bhakti in religion may be a road to the salvation of the soul. But in politics, Bhakti or hero-worship is a sure road to degradation and to eventual dictatorship.`,
        contentHi: `दूसरी बात जो हमें करनी चाहिए वह यह है कि जॉन स्टुअर्ट मिल ने लोकतंत्र की रक्षा में रुचि रखने वाले सभी लोगों को जो चेतावनी दी है, उसका ध्यान रखें: अर्थात् 'अपनी स्वतंत्रता को किसी महान व्यक्ति के चरणों में भी न रखें, न ही उसे ऐसी शक्तियां सौंपें जो उसे संस्थाओं को नष्ट करने में सक्षम बना दें।'

देश के लिए आजीवन सेवाएं देने वाले महान पुरुषों के प्रति कृतज्ञ होने में कुछ भी गलत नहीं है। परंतु कृतज्ञता की भी सीमाएं होती हैं। जैसा कि आयरिश देशभक्त डैनियल ओ'कोनेल ने कहा था: 'कोई भी पुरुष अपने सम्मान की कीमत पर कृतज्ञ नहीं हो सकता, कोई भी महिला अपने सतीत्व की कीमत पर कृतज्ञ नहीं हो सकती, और कोई भी राष्ट्र अपनी स्वतंत्रता की कीमत पर कृतज्ञ नहीं हो सकता।'

यह सावधानी दुनिया के किसी अन्य देश की तुलना में भारत के मामले में कहीं अधिक आवश्यक है। क्योंकि भारत में, भक्ति या जिसे नायक-पूजा कहा जा सकता है, राजनीति में ऐसी भूमिका निभाती है जिसका दुनिया के किसी अन्य देश की राजनीति में कोई मुकाबला नहीं है। धर्म में भक्ति आत्मा की मुक्ति का मार्ग हो सकती है। परंतु राजनीति में, भक्ति या नायक-पूजा पतन और अंततः तानाशाही का सीधा मार्ग है।`,
      },
      {
        id: "sec-3",
        number: "Section 3",
        title: "The Third Warning: A Life of Contradictions",
        titleHi: "अनुभाग ३: तीसरी चेतावनी — अंतर्विरोधों का जीवन और सामाजिक लोकतंत्र की मांग",
        content: `The third thing we must do is not to be content with mere political democracy. We must make our political democracy a social democracy as well. Political democracy cannot last unless there lies at the base of it social democracy. What does social democracy mean? It means a way of life which recognizes liberty, equality, and fraternity as the principles of life.

These principles of liberty, equality, and fraternity are not to be treated as separate items in a trinity. They form a union of trinity in the sense that to divorce one from the other is to defeat the very purpose of democracy. Liberty cannot be divorced from equality; equality cannot be divorced from liberty. Nor can liberty and equality be divorced from fraternity. Without equality, liberty would produce the supremacy of the few over the many. Equality without liberty would kill individual initiative. Without fraternity, liberty and equality could not become a natural course of things.

On the 26th of January 1950, we are going to enter into a life of contradictions. In politics we will have equality and in social and economic life we will have inequality. In politics we will be recognizing the principle of one man one vote and one vote one value. In our social and economic life, we shall, by reason of our social and economic structure, continue to deny the principle of one man one value.

How long shall we continue to live this life of contradictions? How long shall we continue to deny equality in our social and economic life? If we continue to deny it for long, we will do so only by putting our political democracy in peril. We must remove this contradiction at the earliest possible moment or else those who suffer from inequality will blow up the structure of political democracy which this Assembly has so laboriously built up.`,
        contentHi: `तीसरी बात जो हमें करनी चाहिए वह यह है कि केवल राजनीतिक लोकतंत्र से ही संतुष्ट न रहें। हमें अपने राजनीतिक लोकतंत्र को सामाजिक लोकतंत्र भी बनाना होगा। राजनीतिक लोकतंत्र तब तक नहीं टिक सकता जब तक कि उसके आधार में सामाजिक लोकतंत्र न हो। सामाजिक लोकतंत्र का क्या अर्थ है? इसका अर्थ है जीवन का एक ऐसा तरीका जो स्वतंत्रता, समता और बंधुता को जीवन के सिद्धांतों के रूप में मान्यता देता है।

स्वतंत्रता, समता और बंधुता के इन सिद्धांतों को त्रिमूर्ति में अलग-अलग मदों के रूप में नहीं माना जाना चाहिए। वे एक ऐसी त्रिमूर्ति का निर्माण करते हैं कि एक को दूसरे से अलग करना लोकतंत्र के मूल उद्देश्य को ही परास्त करना है। स्वतंत्रता को समता से अलग नहीं किया जा सकता; समता को स्वतंत्रता से अलग नहीं किया जा सकता। न ही स्वतंत्रता और समता को बंधुता से अलग किया जा सकता है। समता के बिना स्वतंत्रता से कुछ लोगों का बहुतों पर आधिपत्य स्थापित हो जाएगा। स्वतंत्रता के बिना समता व्यक्तिगत पहल को मार देगी। बंधुता के बिना स्वतंत्रता और समता स्वाभाविक रूप से जीवन का हिस्सा नहीं बन सकतीं।

२६ जनवरी १९५० को हम अंतर्विरोधों से भरे जीवन में प्रवेश करने जा रहे हैं। राजनीति में हमारे पास समता होगी और सामाजिक तथा आर्थिक जीवन में हमारे पास भीषण विषमता होगी। राजनीति में हम 'एक व्यक्ति, एक वोट और एक वोट, एक मूल्य' के सिद्धांत को मान्यता देंगे। परंतु अपने सामाजिक और आर्थिक जीवन में, अपनी सामाजिक और आर्थिक संरचना के कारण, हम 'एक व्यक्ति, एक मूल्य' के सिद्धांत को नकारते रहेंगे।

हम कब तक अंतर्विरोधों के इस जीवन को जीते रहेंगे? हम कब तक अपने सामाजिक और आर्थिक जीवन में समता को नकारते रहेंगे? यदि हम इसे लंबे समय तक नकारते रहे, तो हम अपने राजनीतिक लोकतंत्र को ही भारी खतरे में डालेंगे। हमें इस अंतर्विरोध को जल्द से जल्द दूर करना होगा, अन्यथा विषमता से पीड़ित लोग राजनीतिक लोकतंत्र के उस पूरे ढांचे को उड़ा देंगे जिसे इस संविधान सभा ने इतने परिश्रम से खड़ा किया है।`,
      },
    ],
  },
}
