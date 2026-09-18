export interface Publication {
  id: string;
  title: string;
  subtitle?: string;
  slug: string;
  authors: {
    name: string;
    isPrimary: boolean;
    affiliation: string;
    orcid?: string;
  }[];
  journalOrVenue: string;
  type: 'journal' | 'interactive_paper' | 'grant_proposal' | 'policy_brief' | 'conference' | 'monograph';
  status: 'Published' | 'Under Review' | 'Awarded & Active' | 'Open Preprint';
  date: string;
  year: number;
  doi: string;
  arxivId?: string;
  abstract: string;
  topics: string[];
  keywords: string[];
  metrics: {
    citations: number;
    downloads: number;
    altmetricScore: number;
    views: number;
  };
  openScience: {
    hasData: boolean;
    hasCode: boolean;
    hasInteractiveSim: boolean;
    peerReviewed: boolean;
    githubUrl?: string;
    liveUrl?: string;
    datasetUrl?: string;
  };
  grantFunding?: {
    funder: string;
    grantNumber: string;
    amount: string;
    status: string;
  };
  bibtex: string;
  fullContent?: {
    executiveSummary: string;
    sections: {
      id: string;
      title: string;
      contentHtml: string;
      hasD3Chart?: 'scatter' | 'heatmap' | 'simulator';
      callout?: {
        type: 'methodology' | 'key_insight' | 'nobel_insight' | 'policy_impact' | 'caution';
        title: string;
        text: string;
      };
      equation?: {
        label: string;
        latex: string;
        explanation: string;
      };
    }[];
  };
}

export interface BenchmarkComparison {
  name: string;
  institutionOrPublisher: string;
  url: string;
  archetype: string;
  keyDesignFeatures: string[];
  typographicPhilosophy: string;
  dataVisualizationApproach: string;
  readingExperience: string;
  ourAdoptedMotivation: string;
  badge: string;
}

export interface ThermalDataPoint {
  tractId: string;
  neighborhood: string;
  metroArea: string;
  lstCelsius: number;
  lstFahrenheit: number;
  ndvi: number; // 0 to 1
  canopyPercent: number; // 0 to 100
  albedo: number; // 0 to 1
  socialVulnerabilityIndex: number; // 0 to 1 (CDC SVI)
  heatVulnerabilityRank: 'Extreme' | 'High' | 'Moderate' | 'Low';
  population: number;
  imperviousSurfacePercent: number;
  coolingAccessIndex: number; // 0 to 100
  coordinates: [number, number];
}

export interface SubscriberPreferences {
  email: string;
  name: string;
  institution?: string;
  topics: string[];
  frequency: 'immediate' | 'monthly' | 'quarterly';
  format: 'summary' | 'full_reprints';
}
