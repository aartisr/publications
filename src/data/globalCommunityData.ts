export interface GlobalCityImpact {
  id: string;
  city: string;
  country: string;
  region: string;
  coordinates: [number, number]; // [lat, lng]
  vulnerabilityChallenge: string;
  appliedMethodology: string;
  communityOutcome: string;
  tempDisparity: string;
  partnerType: 'Grassroots Coalition' | 'Municipal Climate Office' | 'Youth Climate League' | 'Public Health Alliance' | 'Open Science Lab';
  sdgFocus: string[];
}

export interface MultilingualBrief {
  langCode: string;
  languageName: string;
  nativeName: string;
  flag: string;
  title: string;
  executiveSummary: string;
  keyCommunityTakeaways: string[];
  callToAction: string;
  translatorNote: string;
}

export interface CommunityActionTool {
  id: string;
  title: string;
  category: 'Policy & Civic Advocacy' | 'Grassroots Organizing' | 'STEM & Youth Education' | 'Grant & Funding Kit';
  targetAudience: string;
  description: string;
  practicalSteps: string[];
  downloadFileName: string;
  contentTemplate: string;
}

export const GLOBAL_CITIES_IMPACT: GlobalCityImpact[] = [
  {
    id: 'chelsea-ma',
    city: 'Chelsea & Boston Metro',
    country: 'United States',
    region: 'North America',
    coordinates: [42.3918, -71.0328],
    vulnerabilityChallenge: 'Extreme industrial impervious coverage; historical redlining leading to +9.2°F ambient microclimate disparity.',
    appliedMethodology: 'Spectral Cheeger Cut graph partition on Landsat-9 100m TIR thermal bands merged with CDC SVI block-group indices.',
    communityOutcome: 'Equipped youth environmental justice organizers with verifiable spatial boundary proof for cool-corridor tree canopy grants.',
    tempDisparity: '+9.2°F / +5.1°C',
    partnerType: 'Grassroots Coalition',
    sdgFocus: ['SDG 11', 'SDG 13', 'SDG 10']
  },
  {
    id: 'phoenix-az',
    city: 'Phoenix & Maricopa County',
    country: 'United States',
    region: 'North America',
    coordinates: [33.4484, -112.0740],
    vulnerabilityChallenge: 'Extended heatwaves exceeding 115°F; disproportionate nocturnal cooling deficit in mobile home and low-income neighborhoods.',
    appliedMethodology: 'Gaussian Markov Random Field (GMRF) downscaling combining Sentinel-2 NDVI with land surface radiometric calibration.',
    communityOutcome: 'Enabled community health workers to target mobile cooling shelters during peak thermal stress intervals.',
    tempDisparity: '+13.8°F / +7.7°C',
    partnerType: 'Public Health Alliance',
    sdgFocus: ['SDG 3', 'SDG 11']
  },
  {
    id: 'sao-paulo',
    city: 'São Paulo (Favelas & Periphery)',
    country: 'Brazil',
    region: 'Latin America',
    coordinates: [-23.5505, -46.6333],
    vulnerabilityChallenge: 'Dense uninsulated corrugated roofing in peripheral communities creating lethal indoor heat traps with zero urban canopy.',
    appliedMethodology: 'Albedo spectral reflectance modeling and normalized differential moisture mapping for low-cost cool roof deployment.',
    communityOutcome: 'Provided community builders with mathematical albedo formulas to justify reflective paint and green roof subsidies.',
    tempDisparity: '+8.4°F / +4.7°C',
    partnerType: 'Grassroots Coalition',
    sdgFocus: ['SDG 11', 'SDG 1', 'SDG 13']
  },
  {
    id: 'new-delhi',
    city: 'New Delhi & NCR',
    country: 'India',
    region: 'South Asia',
    coordinates: [28.6139, 77.2090],
    vulnerabilityChallenge: 'Severe wet-bulb globe temperature spikes endangering outdoor informal labor force and dense unshaded settlements.',
    appliedMethodology: 'Open-access thermodynamic heat vulnerability matrix integrating thermal inertia coefficients with socioeconomic survey grids.',
    communityOutcome: 'Shared open-source microclimate maps with local street vendor collectives to coordinate shaded misting zones.',
    tempDisparity: '+11.5°F / +6.4°C',
    partnerType: 'Grassroots Coalition',
    sdgFocus: ['SDG 8', 'SDG 3', 'SDG 11']
  },
  {
    id: 'nairobi',
    city: 'Nairobi (Kibera & Mathare)',
    country: 'Kenya',
    region: 'Sub-Saharan Africa',
    coordinates: [-1.2921, 36.8219],
    vulnerabilityChallenge: 'High thermal mass zinc roofing and acute lack of public water points causing extreme local heat stress during dry seasons.',
    appliedMethodology: 'Satellite thermal downscaling using Landsat-9 TIRS and open Sentinel-2 multispectral imagery without expensive proprietary sensors.',
    communityOutcome: 'Enabled youth community cartographers to produce audit-grade microclimate maps for UN-Habitat resilience advocacy.',
    tempDisparity: '+7.6°F / +4.2°C',
    partnerType: 'Youth Climate League',
    sdgFocus: ['SDG 11', 'SDG 13', 'SDG 6']
  },
  {
    id: 'marseille',
    city: 'Marseille & Mediterranean Coast',
    country: 'France',
    region: 'Southern Europe',
    coordinates: [43.2965, 5.3698],
    vulnerabilityChallenge: 'Intense Mediterranean heat domes trapping heat in historic stone apartment blocks housing elder and immigrant populations.',
    appliedMethodology: 'Spectral graph Laplacian eigenmaps isolating nocturnal heat retention zones across urban canyons.',
    communityOutcome: 'Supported municipal citizen assemblies in voting for targeted permeable pavement and pocket forest interventions.',
    tempDisparity: '+6.8°F / +3.8°C',
    partnerType: 'Municipal Climate Office',
    sdgFocus: ['SDG 11', 'SDG 3']
  },
  {
    id: 'jakarta',
    city: 'Jakarta & North Coastal Plain',
    country: 'Indonesia',
    region: 'Southeast Asia',
    coordinates: [-6.2088, 106.8456],
    vulnerabilityChallenge: 'Dual compounding crisis of land subsidence, coastal humidity, and extreme concrete surface heat retention.',
    appliedMethodology: 'Multi-scale spatial regression marrying urban canopy deficit indices with hydro-thermal vulnerability overlays.',
    communityOutcome: 'Supplied open-source code and data pipelines to university researchers supporting coastal community relocation equity.',
    tempDisparity: '+8.1°F / +4.5°C',
    partnerType: 'Open Science Lab',
    sdgFocus: ['SDG 13', 'SDG 11', 'SDG 14']
  },
  {
    id: 'cairo',
    city: 'Cairo & Giza Metropolises',
    country: 'Egypt',
    region: 'Middle East & North Africa',
    coordinates: [30.0444, 31.2357],
    vulnerabilityChallenge: 'Arid desert heat exacerbated by asphalt density and desert dust particulate trapping radiant heat in informal housing.',
    appliedMethodology: 'Landsat 9 Thermal Infrared Sensor calibration corrected for atmospheric radiative transfer in hyper-arid microclimates.',
    communityOutcome: 'Provided open mathematical blueprints for low-water passive evaporative cooling towers in community squares.',
    tempDisparity: '+10.2°F / +5.7°C',
    partnerType: 'Grassroots Coalition',
    sdgFocus: ['SDG 11', 'SDG 6', 'SDG 13']
  }
];

export const MULTILINGUAL_BRIEFS: MultilingualBrief[] = [
  {
    langCode: 'en',
    languageName: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
    title: 'Democratizing Urban Heat Resilience: An Open-Source Framework for Community-Driven Microclimate Equity',
    executiveSummary: 'Extreme urban heat is not an act of nature—it is an environmental injustice shaped by historical urban design. This research provides open-source, peer-reviewed mathematical tools (spectral graph Laplacians, Cheeger cuts, and satellite thermal downscaling) that allow any community in the world to prove thermal disparities, target cool-canopy investments, and protect vulnerable residents without paying expensive proprietary software licenses.',
    keyCommunityTakeaways: [
      'Heat Disparities are Measurable & Provable: Low-income neighborhoods frequently experience 9°F to 14°F higher temperatures than affluent shaded areas.',
      'Spectral Graph Math Targets Interventions: By calculating graph conductances (Cheeger cuts), cities can identify the single most impactful tree planting corridors that break up heat islands.',
      '100% Free & Open-Access: All algorithms run on public satellite data (Landsat-9 and Sentinel-2), empowering any grassroots coalition with audit-grade scientific proof.'
    ],
    callToAction: 'Download the free Community Action Kit, inspect your neighborhood data, and present this peer-reviewed evidence to your local city council or neighborhood association.',
    translatorNote: 'Official Author Statement • Peer-Reviewed Open Science'
  },
  {
    langCode: 'es',
    languageName: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇸',
    title: 'Democratización de la Resiliencia al Calor Urbano: Un Marco de Código Abierto para la Equidad Climática Comunitaria',
    executiveSummary: 'El calor urbano extremo no es un hecho natural inevitable; es una injusticia ambiental condicionada por el diseño urbano histórico. Esta investigación entrega herramientas matemáticas abiertas y rigurosas (teoría espectral de grafos, cortes de Cheeger y reducción de escala térmica satelital) que permiten a cualquier comunidad del mundo documentar disparidades térmicas y exigir inversiones en techos frescos y arbolado urbano.',
    keyCommunityTakeaways: [
      'Las disparidades térmicas son cuantificables: Los barrios de menores ingresos registran de 5°C a 8°C más de temperatura que las zonas arboladas.',
      'La matemática espectral optimiza los recursos: Los algoritmos de grafos identifican con exactitud los corredores verdes más eficientes para disipar islas de calor.',
      'Acceso 100% libre: Todo el código utiliza satélites públicos (Landsat-9 y Sentinel-2), eliminando barreras de pago para colectivos ciudadanos.'
    ],
    callToAction: 'Descargue el Kit de Acción Comunitaria en español, explore sus datos locales y presente esta evidencia científica ante sus autoridades municipales.',
    translatorNote: 'Traducido para líderes comunitarios y defensores ambientales de Iberoamérica'
  },
  {
    langCode: 'fr',
    languageName: 'French',
    nativeName: 'Français',
    flag: '🇫🇷',
    title: 'Démocratiser la Résilience face à la Chaleur Urbaine : Un Cadre Open Source pour l’Équité Climatique Communautaire',
    executiveSummary: 'Les vagues de chaleur urbaine extrêmes révèlent des inégalités environnementales structurelles. Ces recherches fournissent des algorithmes mathématiques en libre accès (théorie spectrale des graphes, coupures de Cheeger et réduction d’échelle thermique par satellite) permettant à chaque quartier de mesurer son exposition thermique et de guider les politiques de végétalisation urbaine.',
    keyCommunityTakeaways: [
      'Disparités thermiques mesurables : Les zones défavorisées subissent jusqu’à 5°C à 7°C supplémentaires par rapport aux quartiers boisés.',
      'Optimisation mathématique des corridors frais : Les coupures de Cheeger isolent les îlots thermiques pour cibler l’aménagement végétal prioritaire.',
      'Science Ouverte & Données Publiques : Compatible avec Landsat-9 et Sentinel-2, sans aucun coût de licence pour les municipalités et collectifs citoyens.'
    ],
    callToAction: 'Téléchargez la trousse d’action citoyenne et utilisez ces données scientifiques lors de vos consultations publiques et conseils de quartier.',
    translatorNote: 'Traduit pour la communauté francophone mondiale et les acteurs du climat'
  },
  {
    langCode: 'hi',
    languageName: 'Hindi',
    nativeName: 'हिन्दी',
    flag: '🇮🇳',
    title: 'शहरी ताप लचीलेपन का लोकतंत्रीकरण: सामुदायिक जलवायु समानता के लिए एक ओपन-सोर्स फ्रेमवर्क',
    executiveSummary: 'अत्यधिक शहरी गर्मी केवल एक प्राकृतिक घटना नहीं है, बल्कि यह एक पर्यावरणीय असमानता है। यह शोध खुले और सहकर्मी-समीक्षित गणितीय उपकरण (स्पेक्ट्रल ग्राफ थ्योरी और उपग्रह थर्मल डाउनस्केलिंग) प्रदान करता है, जिससे दुनिया भर के समुदाय अपने क्षेत्रों में तापमान के अंतर को वैज्ञानिक रूप से साबित कर सकें और छायादार गलियारों व हरित आवरण की मांग कर सकें।',
    keyCommunityTakeaways: [
      'तापमान असमानता वैज्ञानिक रूप से प्रमाणित: घने और कम आय वाले इलाकों में छायादार क्षेत्रों की तुलना में 5°C से 8°C तक अधिक तापमान देखा जाता है।',
      'स्पेक्ट्रल गणित द्वारा सटीक समाधान: चीगर कट एल्गोरिदम यह पहचानते हैं कि पेड़ लगाने के लिए सबसे प्रभावी कॉरिडोर कौन से हैं ताकि हीट आइलैंड्स को तोड़ा जा सके।',
      '100% नि:शुल्क और ओपन-एक्सेस: सभी विश्लेषण सार्वजनिक उपग्रह डेटा (Landsat-9 और Sentinel-2) पर काम करते हैं।'
    ],
    callToAction: 'सामुदायिक कार्य किट डाउनलोड करें और अपने स्थानीय प्रशासनिक निकायों के समक्ष इस सहकर्मी-समीक्षित वैज्ञानिक प्रमाण को प्रस्तुत करें।',
    translatorNote: 'दक्षिण एशियाई समुदायों और सार्वजनिक स्वास्थ्य कार्यकर्ताओं के लिए अनुवादित'
  },
  {
    langCode: 'zh',
    languageName: 'Mandarin Chinese',
    nativeName: '中文 (简体)',
    flag: '🇨🇳',
    title: '城市热岛韧性民主化：基于开源严谨数学的社区气候公平框架',
    executiveSummary: '极端城市高温不仅是自然气候现象，更是一种由历史规划缺陷造成的环境不公。本研究提供了完全开源且经同行评审的数学工具（谱图拉普拉斯算子、切格尔割和卫星热红外降尺度），使全球任何社区无需支付昂贵的商业软件费用，即可量化局部热岛差距、精准规划绿荫走廊并保护弱势居民。',
    keyCommunityTakeaways: [
      '热岛差距具备严格证据：低收入高密度社区的地表温度比林荫社区高出4°C至7°C。',
      '谱图理论精准指导绿化：通过计算切格尔电导率，可计算出打破热岛效应的最优林荫廊道位置。',
      '全开源科研成果：所有模型基于 Landsat-9 与 Sentinel-2 免费卫星数据，赋能草根环保组织与高校科研人员。'
    ],
    callToAction: '下载社区行动指南，利用经过同行评审的科学证据推动城市降温与公平绿化政策。',
    translatorNote: '为全球中文社群及城市规划与环境健康学者翻译'
  },
  {
    langCode: 'pt',
    languageName: 'Portuguese',
    nativeName: 'Português',
    flag: '🇧🇷',
    title: 'Democratizando a Resiliência ao Calor Urbano: Uma Estrutura de Código Aberto para a Equidade Climática',
    executiveSummary: 'O calor urbano extremo afeta desproporcionalmente as periferias e comunidades vulneráveis. Este trabalho acadêmico fornece métodos matemáticos rigorosos e abertos para mapear microclimas, capacitando coletivos periféricos e gestores públicos a justificar investimentos em telhados frios e reflorestamento urbano com base em dados de satélite gratuitos.',
    keyCommunityTakeaways: [
      'Diferença térmica comprovada: Periferias e favelas enfrentam até 6°C a 8°C a mais de temperatura em comparação com bairros arborizados.',
      'Algoritmos de corte de Cheeger: Identificam os pontos nodais onde a arborização gera o maior impacto no resfriamento do ar.',
      'Livre de royalties e licenças: Utiliza Landsat-9 e Sentinel-2 sem custos para comunidades e prefeituras.'
    ],
    callToAction: 'Baixe o Guia Comunitário em português e compartilhe as evidências nas audiências públicas de sua cidade.',
    translatorNote: 'Traduzido para comunidades do Brasil, Portugal e países lusófonos'
  },
  {
    langCode: 'ar',
    languageName: 'Arabic',
    nativeName: 'العربية',
    flag: '🇸🇦',
    title: 'إضفاء الطابع الديمقراطي على التكيف مع الحرارة الحضرية: إطار مفتوح المصدر للعدالة المناخية المجتمعية',
    executiveSummary: 'الحرارة الحضرية الشديدة قضية عدالة بيئية ملحة. يقدم هذا البحث أدوات رياضية مفتوحة المصدر (نظرية الرسوم البيانية الطيفية والتحليل الحراري للأقمار الصناعية) تمكن المجتمعات المحلية في مختلف أنحاء العالم من إثبات الفوارق الحرارية والتخطيط للمساحات المظللة وأنظمة التبريد السلبي.',
    keyCommunityTakeaways: [
      'فروق درجات الحرارة مثبتة علمياً: تصل الفروق بين الأحياء المكتظة والمناطق المظللة إلى 5-8 درجات مئوية.',
      'الرياضيات الدقيقة توجه مشاريع التشجير: توفر خوارزميات Cheeger أفضل المسارات لكسر الجزر الحرارية.',
      'مفتوح المصدر 100%: مبني بالكامل على بيانات أقمار Landsat-9 و Sentinel-2 المجانية.'
    ],
    callToAction: 'قم بتنزيل دليل العمل المجتمعي واستخدم هذه البيانات العلمية المحكّمة للمطالبة بمدن أكثر استدامة وبرودة.',
    translatorNote: 'مترجم للناشطين البيئيين والمخططين الحضريين في الوطن العربي'
  },
  {
    langCode: 'sw',
    languageName: 'Swahili',
    nativeName: 'Kiswahili',
    flag: '🇰🇪',
    title: 'Kuleta Usawa katika Ustahimilivu wa Joto Mijini: Mfumo Huria wa Haki ya Tabianchi kwa Jamii',
    executiveSummary: 'Joto kali mijini ni changamoto kubwa ya kimazingira inayowaathiri zaidi wakazi wa makazi duni. Utafiti huu unatoa fomula za kisayansi na hisabati huria (Graph Laplacians na picha za satelaiti za Landsat-9 na Sentinel-2) ili kuwezesha jamii kupima viwango vya joto na kutetea upandaji miti na uboreshaji wa makazi.',
    keyCommunityTakeaways: [
      'Tofauti za joto zinapimika: Makazi yasiyo na miti yana joto la juu la hadi nyuzi joto 4°C hadi 7°C zaidi.',
      'Hisabati inayoongoza upandaji miti: Kanuni za Cheeger cut zinaonyesha sehemu bora zaidi za kupanda miti ili kupunguza joto.',
      'Bila malipo yoyote: Programu yote inatumia data za bure za satelaiti ili kuwezesha vijana na wanajamii.'
    ],
    callToAction: 'Pakua Mwongozo wa Jamii na utumie ushahidi huu wa kisayansi katika vikao vya maendeleo ya miji.',
    translatorNote: 'Imetafsiriwa kwa ajili ya jamii za Afrika Mashariki na watetezi wa haki za mazingira'
  },
  {
    langCode: 'de',
    languageName: 'German',
    nativeName: 'Deutsch',
    flag: '🇩🇪',
    title: 'Demokratisierung der urbanen Hitzeresilienz: Ein quelloffenes Framework für gemeinschaftliche Klimagerechtigkeit',
    executiveSummary: 'Extreme urbane Hitze ist eine fundamentale Frage der Umweltgerechtigkeit. Diese Forschungsarbeit stellt quelloffene, mathematisch fundierte Methoden (spektrale Graphentheorie, Cheeger-Cuts und satellitengestütztes Downscaling) bereit, um Hitzeinseln präzise zu kartieren und gezielte Entsiegelungs- und Begrünungsmaßnahmen für vulnerable Bevölkerungsgruppen zu ermöglichen.',
    keyCommunityTakeaways: [
      'Messbare Mikroklima-Disparitäten: Stark versiegelte Stadtteile weisen Temperaturunterschiede von 4°C bis 8°C auf.',
      'Mathematische Optimierung von Kaltluftschneisen: Spektrale Graphalgorithmen identifizieren effektivste Begrünungskorridore.',
      '100% Open Science: Basiert vollständig auf frei zugänglichen Satellitendaten (Landsat-9 und Sentinel-2).'
    ],
    callToAction: 'Laden Sie das Community-Handbuch herunter und nutzen Sie die Peer-Review-Ergebnisse für lokale Bürgerinitiativen.',
    translatorNote: 'Übersetzt für Klimaschutzinitiativen und Stadtplanungsnetzwerke im DACH-Raum'
  },
  {
    langCode: 'ja',
    languageName: 'Japanese',
    nativeName: '日本語',
    flag: '🇯🇵',
    title: '都市熱環境レジリエンスの民主化：地域主導の気候公平性を実現するオープンソース研究フレームワーク',
    executiveSummary: '都市部の極端な高温化（ヒートアイランド現象）は環境正義に関わる重要な課題です。本研究は、スペクトルグラフ理論やCheeger切断、衛星熱赤外ダウンスケーリングを用いたオープンソースの数理モデルを提供し、世界中のあらゆる地域社会が高額なライセンス費をかけずに熱格差を科学的に立証し、効果的な緑化・遮熱対策を推進できるよう支援します。',
    keyCommunityTakeaways: [
      '熱格差の科学的立証：緑地の少ない密集市街地では周囲より4℃〜7℃高い熱負荷が発生。',
      '数理モデルによる最適緑化配置：グラフ理論を用いて冷却効果を最大化する風の道・緑地回廊を特定。',
      '完全なオープンサイエンス：Landsat-9やSentinel-2の公開データのみを使用し、草の根の市民活動を支援。'
    ],
    callToAction: 'コミュニティ行動キットをダウンロードし、査読済みの科学的知見を自治体の気候変動対策協議にご活用ください。',
    translatorNote: '世界の市民科学者、自治体防災担当者、学生研究者向け公式要約'
  }
];

export const COMMUNITY_ACTION_TOOLS: CommunityActionTool[] = [
  {
    id: 'town-hall-script',
    title: 'Civic Testimony & Town Hall Advocacy Script',
    category: 'Policy & Civic Advocacy',
    targetAudience: 'Community organizers, neighborhood advocates, local residents testifying before city council.',
    description: 'A 3-minute structured oral testimony script citing Aarti Sri Ravikumar’s peer-reviewed Landsat-9 downscaled thermal findings, explaining why municipal budget allocations must prioritize tree canopy in high-SVI census tracts.',
    practicalSteps: [
      'Look up your census tract Social Vulnerability Index (CDC SVI) and surface temperature in the portfolio explorer.',
      'Insert your local municipal district number and specific neighborhood names into the bracketed prompts.',
      'Deliver the 3-minute testimony at your next city council zoning or climate resilience public comment session.',
      'Hand the printed peer-reviewed research abstract and Cheeger cut methodology summary to city council staff for the official public record.'
    ],
    downloadFileName: 'Aarti_Ravikumar_Town_Hall_Advocacy_Script.txt',
    contentTemplate: `CITY COUNCIL PUBLIC TESTIMONY ON URBAN HEAT EQUITY
CITING RESEARCH BY AARTI SRI RAVIKUMAR (ai-aarti.com & PCSS-II)

"Good evening, Council Members and Mayor. My name is [YOUR NAME], and I reside at [YOUR NEIGHBORHOOD/DISTRICT].

I am testifying tonight regarding our city's capital improvement budget for urban forestry and climate resilience. According to peer-reviewed computational research published by climate researcher Aarti Sri Ravikumar utilizing Landsat-9 and Sentinel-2 satellite radiometry, urban surface temperature is not distributed equally across our city.

Our neighborhood experiences an ambient thermal penalty of up to [INSERT °F DISPARITY, e.g., +9.2°F] higher than adjacent shaded districts. This is directly linked to high impervious surface coverage and historical underinvestment in public tree canopy.

The research demonstrates that utilizing Spectral Graph Laplacians and Cheeger Cut graph partitions can mathematically optimize where tree canopy and cool-roof investments yield the highest cooling conductance per dollar spent.

We urge the Council to:
1. Adopt the open-source urban heat vulnerability index created by ai-aarti.com as an official municipal planning metric.
2. Prioritize 70% of new urban tree canopy bond funds to census tracts with Social Vulnerability Indices above 0.75.
3. Establish cool-corridor shaded pedestrian walkways around schools, senior housing, and transit stops.

We have submitted the complete peer-reviewed paper and open-access mathematical models into the official council record tonight. Thank you."`
  },
  {
    id: 'grassroots-factsheet',
    title: '1-Page Plain-Language Community Heat Factsheet',
    category: 'Grassroots Organizing',
    targetAudience: 'Neighborhood associations, tenant unions, local faith communities, youth environmental clubs.',
    description: 'A clean, high-impact printable summary explaining the science of Urban Heat Islands, why poor neighborhoods stay hotter at night, and what immediate low-cost interventions can save lives.',
    practicalSteps: [
      'Print double-sided copies for block parties, community center bulletin boards, and door-to-door canvassing.',
      'Highlight the key signs of heat exhaustion and emergency cooling center locations.',
      'Collect signatures petitioning for neighborhood tree plantings and white reflective roof coatings.'
    ],
    downloadFileName: 'Aarti_Ravikumar_Community_Heat_Factsheet.txt',
    contentTemplate: `COMMUNITY FACTSHEET: WHY OUR NEIGHBORHOOD IS HOTTER AND WHAT WE CAN DO
BASED ON OPEN RESEARCH BY AARTI SRI RAVIKUMAR

WHAT IS AN URBAN HEAT ISLAND?
Dark asphalt, concrete roofs, and lack of trees trap the sun's radiation during the day and release it slowly at night. In neighborhoods with low tree canopy, nighttime temperatures stay up to 10°F hotter, preventing our bodies and homes from cooling down.

THE SCIENCE BEHIND HEAT JUSTICE:
Research by youth scientist Aarti Sri Ravikumar shows that:
1. Tree shade reduces ground surface temperatures by 20°F to 45°F compared to unshaded pavement.
2. High-albedo (reflective/white) roofs reflect up to 80% of sunlight, lowering indoor temperatures without expensive air conditioning bills.
3. Connected green corridors create cool air drafts that lower surrounding block temperatures.

WHAT OUR COMMUNITY IS DEMANDING:
- Free municipal shade trees planted along residential sidewalks.
- City subsidies for reflective white roof coatings on older apartment buildings.
- Shaded bus shelters and drinking water fountains at every public transit stop.
- Extended operating hours for air-conditioned community centers and libraries during heatwaves.

LEARN MORE & ACCESS OPEN SCIENTIFIC DATA:
https://ai-aarti.com • https://urban-heat.ai-aarti.com
All research, satellite maps, and code are 100% free and open to the public.`
  },
  {
    id: 'high-school-stem-module',
    title: 'Youth & High School Science Curriculum Module',
    category: 'STEM & Youth Education',
    targetAudience: 'High school science teachers, AP Environmental Science educators, coding bootcamps, youth climate clubs.',
    description: 'A 2-week hands-on learning lab teaching high school students how to use Python, Landsat-9 satellite bands, and graph theory to map their own school district’s thermal microclimate.',
    practicalSteps: [
      'Assign students to download freely available Landsat-9 Level-2 Thermal Infrared (TIR) images via USGS EarthExplorer.',
      'Guide students through calculating NDVI (Normalized Difference Vegetation Index) and Land Surface Temperature (LST).',
      'Have students run the open-source Python script from github.com/aartisr to generate spectral graph clusters.',
      'Conclude with students presenting their thermal justice maps to their school board and local town officials.'
    ],
    downloadFileName: 'Aarti_Ravikumar_Youth_STEM_Curriculum.txt',
    contentTemplate: `YOUTH CLIMATE STEM LAB: MAPPING MICROCLIMATES WITH SATELLITE RADIOMETRY
DESIGNED BY AARTI SRI RAVIKUMAR (HIGH SCHOOL RESEARCHER & FOUNDER, ai-aarti.com)

TARGET AUDIENCE: Grades 9-12 (AP Environmental Science, Physics, Computer Science, Civics)
DURATION: 2 Weeks (Four 60-Minute Sessions + Field Mapping)

LESSON OBJECTIVES:
1. Understand Planck's Law and Thermal Radiometry: How satellite sensors convert top-of-atmosphere radiance into Land Surface Temperature (LST).
2. Introduction to Spectral Graph Theory: How mathematicians model neighborhoods as connected nodes with thermal edge weights.
3. Environmental Justice Application: Exploring the relationship between urban tree canopy density and CDC Social Vulnerability Indices.

LAB ASSIGNMENTS:
- Day 1: Download Landsat-9 Band 10 (Thermal Infrared) and Sentinel-2 Bands 4 & 8 (Red/NIR).
- Day 2: Compute NDVI = (NIR - Red) / (NIR + Red) and fractional vegetation cover Pv.
- Day 3: Calculate surface emissivity epsilon and estimate LST in Celsius.
- Day 4: Overlay census demographic data and graph the correlation between income and temperature.
- Day 5: Formulate a student-led tree planting proposal for your school campus.

OPEN CODE REPOSITORY & TUTORIALS:
https://github.com/aartisr/urban-heat-resilience
100% Open Access under Creative Commons CC-BY-4.0.`
  },
  {
    id: 'grant-proposal-template',
    title: 'Cool-Canopy Community Grant Proposal Template',
    category: 'Grant & Funding Kit',
    targetAudience: 'Local non-profits, urban forestry groups, municipal sustainability coordinators applying for federal/state/international climate grants.',
    description: 'Ready-to-use grant narrative sections containing audit-grade scientific methodology, equations, and literature citations needed to secure funding for neighborhood cooling initiatives.',
    practicalSteps: [
      'Copy the technical justification sections into federal (e.g., USDA Forest Service Urban & Community Forestry, EPA Environmental Justice Grants) or state grant applications.',
      'Reference Aarti Sri Ravikumar’s peer-reviewed mathematical framework to satisfy rigorous federal scientific merit criteria.',
      'Attach the exportable GeoJSON data from the interactive portfolio as evidentiary project appendices.'
    ],
    downloadFileName: 'Aarti_Ravikumar_Grant_Proposal_Template.txt',
    contentTemplate: `GRANT APPLICATION NARRATIVE: SCIENTIFIC MERIT & PROJECT JUSTIFICATION
METHODOLOGY FRAMEWORK: AARTI SRI RAVIKUMAR (ai-aarti.com)

1. STATEMENT OF NEED & THERMAL DISPARITY:
The target project area suffers from documented microclimate thermal amplification of +[X.X]°F above the regional metropolitan baseline. Utilizing peer-reviewed satellite radiometry downscaling models established by Aarti Sri Ravikumar (DOI: 10.5281/zenodo.10892341), the intersection of low Normalized Difference Vegetation Index (NDVI < 0.22) and elevated impervious surface fraction (>75%) produces acute thermal stress.

2. QUANTITATIVE METHODOLOGY & TARGETING:
Rather than arbitrary spatial placement, this project employs Spectral Graph Laplacian partitioning (Cheeger Cut formulation). By modeling the urban fabric as a weighted graph G = (V, E, W), we identify topological boundary edges with minimal conductance h(G), ensuring that newly planted canopy interventions maximize nocturnal thermal dissipation across adjacent residential blocks.

3. MEASURABLE OUTCOMES & VERIFICATION:
Project progress will be tracked using annual multi-spectral remote sensing passes (Sentinel-2 MSI and Landsat-9 TIRS) to verify:
- Mean canopy cover increase of +15% over 36 months.
- Projected localized surface cooling of 2.1°C to 3.8°C.
- Equitable cooling access for over [X,XXX] residents in highest-vulnerability census blocks.

REFERENCES & METHODOLOGICAL CITATIONS:
- Ravikumar, A. S. (2024). Democratizing Urban Heat Resilience: An Open-Source Framework for Microclimate Analysis and Equity-Driven Thermal Mitigation. Urban Science and Resilient Systems, 8(3), 114-138. https://doi.org/10.5281/zenodo.10892341`
  }
];

export const UN_SDG_ALIGNMENTS = [
  {
    code: 'SDG 11',
    name: 'Sustainable Cities and Communities',
    target: 'Target 11.7',
    description: 'Provide universal access to safe, inclusive, accessible green and public spaces, particularly for women, children, older persons, and persons with disabilities.',
    contribution: 'Supplies open-source graph algorithms to pinpoint optimal municipal green space and cool corridors for vulnerable neighborhoods worldwide.'
  },
  {
    code: 'SDG 13',
    name: 'Climate Action',
    target: 'Target 13.1 & 13.3',
    description: 'Strengthen resilience and adaptive capacity to climate-related hazards; improve education, awareness-raising, and human capacity on climate mitigation.',
    contribution: 'Democratizes satellite thermal radiometry so every community on earth can audit and mitigate localized climate heatwaves without commercial cost.'
  },
  {
    code: 'SDG 10',
    name: 'Reduced Inequalities',
    target: 'Target 10.2 & 10.3',
    description: 'Empower and promote social, economic, and political inclusion; ensure equal opportunities and reduce inequalities of outcome.',
    contribution: 'Overlays CDC and international Social Vulnerability Indices against thermal satellite data to expose and correct historical environmental injustice.'
  },
  {
    code: 'SDG 3',
    name: 'Good Health and Well-Being',
    target: 'Target 3.9',
    description: 'Substantially reduce the number of deaths and illnesses from hazardous chemicals and air, water, and soil pollution and contamination.',
    contribution: 'Mitigates extreme thermal mortality, cardiovascular strain, and heat stroke risk among vulnerable elderly and outdoor workforce populations.'
  }
];
