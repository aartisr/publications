import { BenchmarkComparison } from '../types';

export const TOP_10_BENCHMARKS: BenchmarkComparison[] = [
  {
    name: 'Nature',
    institutionOrPublisher: 'Springer Nature',
    url: 'https://www.nature.com',
    archetype: 'Preeminent General Science Journal',
    badge: 'Impact Factor: 64.8',
    keyDesignFeatures: [
      'Dual-column editorial balance with crisp hairline grid separators',
      'Instant article metrics sidebar displaying real-time Altmetric badges and cross-ref citations',
      'Structured "Key Points" and executive bulleted takeaways prior to the full text',
      'Embedded responsive interactive figures with expandable high-resolution zoom'
    ],
    typographicPhilosophy: 'Classically grounded serif display pairing (Harding Serif) with hyper-legible neutral sans body, maximizing continuous reading cadence.',
    dataVisualizationApproach: 'High-contrast publication-grade charts with rigorous error bars, accessible palettes (colorblind-safe viridis/cividis), and downloadable SVG/EPS data vectors.',
    readingExperience: 'Distraction-free continuous reading mode, anchored table of contents tracking scroll depth, and inline citation hover preview cards.',
    ourAdoptedMotivation: 'Adopted the clean editorial split layout, real-time Altmetric badge design, and floating progressive-reading TOC.'
  },
  {
    name: 'Science',
    institutionOrPublisher: 'American Association for the Advancement of Science (AAAS)',
    url: 'https://www.science.org',
    archetype: 'Global Flagship Multidisciplinary Journal',
    badge: 'Impact Factor: 56.9',
    keyDesignFeatures: [
      'Full-bleed visual lead imagery paired with authoritative ceremonial header styling',
      'Structured "Editor\'s Evaluation" & transparent peer review summary box',
      'Dedicated "Structured Abstract" with Background, Advances, and Outlook subsections',
      'Seamless supplementary material drawer with verified Zenodo and GitHub repository links'
    ],
    typographicPhilosophy: 'Authoritative bespoke serif headings conveying historical scientific gravity with generous optical line-height (1.65).',
    dataVisualizationApproach: 'Multi-panel graphical abstracts (Panels A-D) integrating spatial GIS layers and molecular diagrams.',
    readingExperience: 'Linear, narrative-driven scientific storytelling with expandable method callout boxes.',
    ourAdoptedMotivation: 'Adopted the high-impact visual abstract header, structured methodology breakdown, and transparent peer review indicators.'
  },
  {
    name: 'Distill.pub',
    institutionOrPublisher: 'Distill Working Group (Olah, Carter, et al.)',
    url: 'https://distill.pub',
    archetype: 'The Gold Standard for Interactive Scientific Publishing',
    badge: 'Interactive Pioneer',
    keyDesignFeatures: [
      'Interactive D3.js explorable explanations directly embedded within the scientific prose',
      'Dynamic equation scrubbing and parameter sliders that recalculate models in real time',
      'Margin notes (tufte-style) for contextual tangents without breaking reader focus',
      'Radical open-source submission workflow with complete browser reproducibility'
    ],
    typographicPhilosophy: 'Edward Tufte inspired typographic purity: generous margins, Newsreader/Charter serifs, and mathematical typography seamlessly harmonized.',
    dataVisualizationApproach: 'Visuals are not static diagrams; they are live computational artifacts executing in the browser.',
    readingExperience: 'Engaging, multimodal comprehension where reading and interactive experimentation coalesce into a single cognitive flow.',
    ourAdoptedMotivation: 'Direct inspiration for our embedded D3.js Urban Heat Island thermodynamic simulation and live parameter sliders.'
  },
  {
    name: 'Our World in Data',
    institutionOrPublisher: 'Global Change Data Lab & University of Oxford',
    url: 'https://ourworldindata.org',
    archetype: 'Public-Interest Empirical Data Publication',
    badge: 'Open Science Leader',
    keyDesignFeatures: [
      'Universal interactive chart engine allowing toggle between Map, Chart, Table, and Sources',
      'Time-series playback scrubber enabling multi-decade longitudinal analysis',
      'One-click download of clean CSV, GeoJSON, and SVG vector formats',
      'Clear, transparent documentation of empirical limitations and raw data provenance'
    ],
    typographicPhilosophy: 'Crisp, contemporary neo-grotesque sans typography optimized for rapid quantitative scannability across diverse device screens.',
    dataVisualizationApproach: 'Declarative interactive choropleths and scatter plots with persistent tooltips and country/city search filtering.',
    readingExperience: 'Data-first journalism where every factual claim links directly to its underlying database point and code definition.',
    ourAdoptedMotivation: 'Adopted the multi-city spatial heat intensity visualizer, transparent data export buttons, and explicit limitation disclosures.'
  },
  {
    name: 'arXiv.org',
    institutionOrPublisher: 'Cornell University & Simons Foundation',
    url: 'https://arxiv.org',
    archetype: 'Open Access Research Repository & Preprint Engine',
    badge: '2.4M+ Papers',
    keyDesignFeatures: [
      'Zero-bloat, extreme information density focused on abstract, metadata, and TeX source',
      'Persistent, tamper-proof version history (v1, v2, v3) showing chronological revisions',
      'Instant 1-click BibTeX copy, TeX download, and permanent canonical identifiers (arXiv:YYMM.NNNNN)',
      'Universal compatibility across mobile, low-bandwidth, and screen-reading environments'
    ],
    typographicPhilosophy: 'Utilitarian academic monospace and clean system serifs emphasizing functional speed over ornamental decoration.',
    dataVisualizationApproach: 'PDF-centric vector preservation with direct links to ancillary interactive notebooks (e.g. PapersWithCode).',
    readingExperience: 'Hyper-focused researcher workflow: arrive, evaluate abstract, copy citation, inspect code, download PDF.',
    ourAdoptedMotivation: 'Integrated instant BibTeX generator, permanent DOI/arXiv badge links, and version lineage metadata.'
  },
  {
    name: 'Cell',
    institutionOrPublisher: 'Cell Press (Elsevier)',
    url: 'https://www.cell.com',
    archetype: 'Biomedical & Life Sciences Powerhouse',
    badge: 'Impact Factor: 66.8',
    keyDesignFeatures: [
      'Prominent "Graphical Abstract" occupying the top visual tier of the digital manuscript',
      '"In Brief" 30-word synopsis paired with 3-4 high-impact highlight bullets',
      'STAR Methods (Structured, Transparent, Accessible, Reproducible) standardization table',
      'CRediT (Contributor Roles Taxonomy) author attribution matrix'
    ],
    typographicPhilosophy: 'Modern high-contrast editorial serif paired with vivid accent badges indicating open access, preprint, and peer-reviewed status.',
    dataVisualizationApproach: 'Multi-layer biological schematics and rigorous statistical data visualizations.',
    readingExperience: 'Modular reading flow allowing readers to digest "Highlights" in 10 seconds or dive into granular protocols.',
    ourAdoptedMotivation: 'Adopted the "In Brief" executive callouts, author CRediT contributions, and reproducible methods framework.'
  },
  {
    name: 'NobelPrize.org',
    institutionOrPublisher: 'Nobel Foundation & Royal Swedish Academy of Sciences',
    url: 'https://www.nobelprize.org',
    archetype: 'Archival Monument to Humanity\'s Greatest Discoveries',
    badge: 'Nobel Laureate Archive',
    keyDesignFeatures: [
      'Deep ceremonial dark navy and warm burnished gold aesthetic evoking timeless prestige',
      'Biographical laureate profile integrating original award speech, scientific backgrounder, and press release',
      'Archival facsimile reproduction alongside modern responsive transcripts and media',
      'Clear articulation of human societal impact and foundational paradigm shifts'
    ],
    typographicPhilosophy: 'Regal serif typography (Nobel Serif / Garamond) with generous letter spacing, classical optical proportions, and gold rule dividers.',
    dataVisualizationApproach: 'Conceptual breakthrough diagrams illustrating revolutionary mechanisms of discovery with immaculate clarity.',
    readingExperience: 'Reverent, inspirational, and deeply scholarly, framing rigorous research within the broader arc of human civilizational progress.',
    ourAdoptedMotivation: 'Guided the visual palette of our platform: deep academic navy (`#0A192F`), warm parchment canvas, burnished gold accents, and Nobel-cadre impact framing.'
  },
  {
    name: 'IEEE Xplore',
    institutionOrPublisher: 'Institute of Electrical and Electronics Engineers',
    url: 'https://ieeexplore.ieee.org',
    archetype: 'Engineering, Computing & Sensor Systems Repository',
    badge: '5M+ Documents',
    keyDesignFeatures: [
      'Deep IEEE taxonomy keyword indexing (IEEE terms, INSPEC, author keywords)',
      'Mandatory Grant Funding Agency & Grant ID disclosure panels',
      'Precise mathematical LaTeX equation rendering with individual equation bookmarking',
      'Citation map showing both backward references and forward patent/paper citations'
    ],
    typographicPhilosophy: 'Structured technical documentation typography with mono-spaced equation labels and dense tabular metadata grids.',
    dataVisualizationApproach: 'Engineering schematics, circuit diagrams, and empirical sensor calibration curves with tight numerical tolerances.',
    readingExperience: 'Rigorous engineering reference interface designed for precision retrieval of technical specifications.',
    ourAdoptedMotivation: 'Adopted explicit Grant Sponsor panels, mathematical equation cards with interactive symbol breakdowns, and sensor specifications.'
  },
  {
    name: 'PLOS ONE / PLOS Computational Biology',
    institutionOrPublisher: 'Public Library of Science',
    url: 'https://journals.plos.org',
    archetype: 'Pioneering Open Science & Reproducibility Repository',
    badge: '100% Open Access',
    keyDesignFeatures: [
      'Mandatory Open Data Availability Statement with direct DOI-linked repository tokens',
      'Full peer review history publishing (reviewer comments and author rebuttal letters)',
      'Dynamic figure browser allowing seamless stepping through multi-figure datasets',
      'Article-Level Metrics (ALMs) combining HTML page views, PDF downloads, and social bookmarks'
    ],
    typographicPhilosophy: 'Accessible, clean sans-serif editorial layout with generous line lengths (70ch) conforming to strict WCAG AAA guidelines.',
    dataVisualizationApproach: 'Transparent raw data point distributions with box plots and violin charts replacing opaque bar charts.',
    readingExperience: 'Democratized scientific reading emphasizing full disclosure of uncertainties, data limitations, and computational environments.',
    ourAdoptedMotivation: 'Adopted the "Open Science & Code Badges", transparent data availability statement, and direct dataset download links.'
  },
  {
    name: 'Semantic Scholar / Google Scholar',
    institutionOrPublisher: 'Allen Institute for AI (AI2) & Google',
    url: 'https://www.semanticscholar.org',
    archetype: 'Intelligent Academic Graph & Research Alert Network',
    badge: 'AI Research Graph',
    keyDesignFeatures: [
      '"Highly Influential Citations" algorithmic filter distinguishing passing mentions from foundational reuse',
      'Personalized "Research Feed" with customizable email alert cadence and RSS feeds',
      'Multi-faceted portfolio filtering by topic tags, publication venue, grant sponsor, and citation velocity',
      'Automated semantic TL;DR summaries synthesizing core paper contributions in one sentence'
    ],
    typographicPhilosophy: 'Modern, high-velocity search-optimized typography with distinct badge hierarchies for methodology, dataset, and background citations.',
    dataVisualizationApproach: 'Citation trajectory graphs illustrating academic impact acceleration over time.',
    readingExperience: 'Discovery-oriented interface accelerating literature synthesis and automated notification of new preprints.',
    ourAdoptedMotivation: 'Direct inspiration for our instant topic/methodology search bar, filterable portfolio facets, and subscriber research alert modal.'
  }
];
