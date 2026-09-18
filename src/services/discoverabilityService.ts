import { Publication } from '../types';

export interface DiscoverabilityMetadata {
  title: string;
  description: string;
  canonicalUrl: string;
  ogType: string;
  ogImage: string;
  highwirePressTags: Record<string, string | string[]>;
  dublinCoreTags: Record<string, string>;
  jsonLdSchemas: object[];
}

/**
 * DiscoverabilityService
 * Complete, plug-and-play SEO, GEO (Generative Engine Optimization),
 * AIO (AI Optimization), AEI (Answer Engine Indexing), AXO (Agent Experience Optimization),
 * and Academic Citation Engine.
 */
class DiscoverabilityService {
  private readonly baseUrl = 'https://ai-aarti.com';
  private readonly defaultAuthor = 'Aarti Sri Ravikumar';
  private readonly defaultOrcid = 'https://orcid.org/0009-0004-8921-9302';
  private readonly defaultAffiliation = 'ai-aarti.com & PCSS-II';

  /**
   * Generate complete discovery metadata for either the global portfolio or an active publication
   */
  public getMetadata(currentPublication?: Publication | null): DiscoverabilityMetadata {
    if (currentPublication) {
      return this.getPublicationMetadata(currentPublication);
    }
    return this.getGlobalPortfolioMetadata();
  }

  /**
   * Root Portfolio Metadata & Global Schemas
   */
  public getGlobalPortfolioMetadata(): DiscoverabilityMetadata {
    const title = 'Aarti Sri Ravikumar | Academic Publications & Research Archive';
    const description =
      'The official academic portfolio and computational research repository of Aarti Sri Ravikumar. Open-access planetary computing, spectral graph Laplacians, Cheeger cuts, GMRF satellite radiometry downscaling, and urban heat democratization.';
    const canonicalUrl = `${this.baseUrl}/publications`;
    const ogImage = `${this.baseUrl}/assets/og-preview.png`;

    const jsonLdSchemas = [
      // 1. WebSite Schema
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${this.baseUrl}/#website`,
        'name': 'Aarti Sri Ravikumar Academic Archive',
        'url': this.baseUrl,
        'description': description,
        'inLanguage': 'en-US',
        'publisher': {
          '@type': 'Person',
          'name': this.defaultAuthor,
          'url': this.baseUrl,
          'sameAs': [
            this.defaultOrcid,
            'https://github.com/aartisr',
            'https://scholar.google.com/citations?user=aartisr'
          ]
        },
        'potentialAction': {
          '@type': 'SearchAction',
          'target': `${this.baseUrl}/publications?q={search_term_string}`,
          'query-input': 'required name=search_term_string'
        }
      },

      // 2. Person & ProfilePage Schema (Author Authority)
      {
        '@context': 'https://schema.org',
        '@type': 'Person',
        '@id': `${this.baseUrl}/#author`,
        'name': this.defaultAuthor,
        'givenName': 'Aarti Sri',
        'familyName': 'Ravikumar',
        'url': this.baseUrl,
        'sameAs': [
          this.defaultOrcid,
          'https://github.com/aartisr',
          'https://ai-aarti.com'
        ],
        'jobTitle': 'Principal Investigator & Computational Climate Scientist',
        'worksFor': {
          '@type': 'Organization',
          'name': 'ai-aarti.com & PCSS-II',
          'url': this.baseUrl
        },
        'knowsAbout': [
          'Urban Heat Island Mitigation',
          'Spectral Graph Theory',
          'Cheeger Inequality & Graph Laplacians',
          'Satellite Radiometry Downscaling (Landsat, ECOSTRESS)',
          'Gaussian Markov Random Fields (GMRF)',
          '#P-Hard Percolation Theory',
          'Environmental Justice & CDC Social Vulnerability Index'
        ]
      },

      // 3. FAQPage Schema (for Google SGE, Perplexity, Gemini & ChatGPT Answer Extraction)
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': [
          {
            '@type': 'Question',
            'name': 'What is the Urban Heat Democratization framework by Aarti Sri Ravikumar?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'The Urban Heat Democratization framework is an open-source, reproducible computational paradigm that couples USGS Landsat-9/NASA ECOSTRESS thermal radiometry with the CDC Social Vulnerability Index (SVI). It translates microclimatic data into interactive, browser-native D3.js simulations for community organizers, municipal arborists, and civil engineers.'
            }
          },
          {
            '@type': 'Question',
            'name': 'How does spectral graph theory and the Cheeger inequality apply to urban cooling?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Aarti Sri Ravikumar models urban street networks as weighted graphs where edge weights represent thermal conductance and canopy permeability. The second eigenvalue of the normalized Laplacian (lambda_2) mathematically bounds the Cheeger conductance, enabling polynomial-time Fiedler vector sweeps to identify critical thermal bottlenecks and optimize shade corridors.'
            }
          },
          {
            '@type': 'Question',
            'name': 'How are satellite land surface temperatures downscaled using GMRF?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Using sparse Gaussian Markov Random Fields (GMRF), the precision matrix is parameterized by 10m Sentinel-2 optical textures and LiDAR elevations. Exact Bayesian posterior temperature fields are computed via sparse Cholesky factorization, downscaling coarse 70-100m satellite radiometry to sub-15m street resolution.'
            }
          },
          {
            '@type': 'Question',
            'name': 'Are the datasets and source code openly accessible?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Yes, all research, algorithms, interactive visualizations, and datasets authored by Aarti Sri Ravikumar are released under open-science licenses (MIT License and Creative Commons Attribution 4.0 International) via GitHub and Zenodo.'
            }
          }
        ]
      },

      // 4. BreadcrumbList Schema
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Academic Home',
            'item': this.baseUrl
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': 'Publications & Research Archive',
            'item': `${this.baseUrl}/publications`
          }
        ]
      }
    ];

    return {
      title,
      description,
      canonicalUrl,
      ogType: 'website',
      ogImage,
      highwirePressTags: {
        citation_author: this.defaultAuthor,
        citation_author_institution: this.defaultAffiliation,
        citation_author_orcid: this.defaultOrcid
      },
      dublinCoreTags: {
        'DC.title': title,
        'DC.creator': this.defaultAuthor,
        'DC.description': description,
        'DC.publisher': 'ai-aarti.com Academic Open Archive',
        'DC.language': 'en',
        'DC.rights': 'CC-BY-4.0'
      },
      jsonLdSchemas
    };
  }

  /**
   * Publication-Specific Metadata, Highwire Academic Tags & ScholarlyArticle Schema
   */
  public getPublicationMetadata(pub: Publication): DiscoverabilityMetadata {
    const title = `${pub.title} | Aarti Sri Ravikumar`;
    const description = pub.abstract.slice(0, 160) + '...';
    const canonicalUrl = `${this.baseUrl}/publications/${pub.slug}`;
    const ogImage = `${this.baseUrl}/assets/og-preview.png`;

    const highwirePressTags: Record<string, string | string[]> = {
      citation_title: pub.title,
      citation_author: pub.authors.map((a) => a.name),
      citation_author_institution: pub.authors.map((a) => a.affiliation || this.defaultAffiliation),
      citation_publication_date: `${pub.year}/01/01`,
      citation_journal_title: pub.journalOrVenue,
      citation_doi: pub.doi,
      citation_abstract_html_url: canonicalUrl,
      citation_keywords: pub.keywords.join('; ')
    };

    if (pub.openScience?.githubUrl) {
      highwirePressTags.citation_code_url = pub.openScience.githubUrl;
    }

    const dublinCoreTags: Record<string, string> = {
      'DC.title': pub.title,
      'DC.creator': pub.authors.map((a) => a.name).join(', '),
      'DC.description': pub.abstract,
      'DC.identifier': pub.doi,
      'DC.date': String(pub.year),
      'DC.publisher': pub.journalOrVenue,
      'DC.type': pub.type === 'journal' ? 'Text.Article' : 'Text.InteractiveResource',
      'DC.rights': 'CC-BY-4.0',
      'DC.language': 'en'
    };

    const jsonLdSchemas = [
      // 1. ScholarlyArticle Schema (Google Scholar, CrossRef, Semantic Scholar, OpenAI, Perplexity)
      {
        '@context': 'https://schema.org',
        '@type': 'ScholarlyArticle',
        '@id': `${canonicalUrl}#article`,
        'headline': pub.title,
        'alternativeHeadline': pub.subtitle,
        'name': pub.title,
        'description': pub.abstract,
        'author': pub.authors.map((a) => ({
          '@type': 'Person',
          'name': a.name,
          'affiliation': {
            '@type': 'Organization',
            'name': a.affiliation || this.defaultAffiliation
          },
          'sameAs': this.defaultOrcid
        })),
        'datePublished': `${pub.year}-01-01`,
        'inLanguage': 'en-US',
        'publisher': {
          '@type': 'Organization',
          'name': pub.journalOrVenue,
          'url': this.baseUrl
        },
        'isPartOf': {
          '@type': 'Periodical',
          'name': pub.journalOrVenue
        },
        'identifier': pub.doi,
        'url': canonicalUrl,
        'isAccessibleForFree': true,
        'license': 'https://creativecommons.org/licenses/by/4.0/',
        'keywords': pub.keywords.join(', '),
        'about': pub.topics.map((t) => ({
          '@type': 'Thing',
          'name': t
        }))
      },

      // 2. BreadcrumbList for Publication
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Academic Home',
            'item': this.baseUrl
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': 'Publications',
            'item': `${this.baseUrl}/publications`
          },
          {
            '@type': 'ListItem',
            'position': 3,
            'name': pub.title,
            'item': canonicalUrl
          }
        ]
      }
    ];

    return {
      title,
      description,
      canonicalUrl,
      ogType: 'article',
      ogImage,
      highwirePressTags,
      dublinCoreTags,
      jsonLdSchemas
    };
  }

  /**
   * Export standardized RIS citation format
   */
  public generateRisCitation(pub: Publication): string {
    return [
      'TY  - JOUR',
      `TI  - ${pub.title}`,
      pub.subtitle ? `T2  - ${pub.subtitle}` : '',
      `AU  - ${pub.authors.map((a) => a.name).join('\nAU  - ')}`,
      `JO  - ${pub.journalOrVenue}`,
      `PY  - ${pub.year}`,
      `DO  - ${pub.doi}`,
      `UR  - ${this.baseUrl}/publications/${pub.slug}`,
      `AB  - ${pub.abstract}`,
      `KW  - ${pub.keywords.join('\nKW  - ')}`,
      'ER  - '
    ]
      .filter(Boolean)
      .join('\n');
  }

  /**
   * Export complete Generative Engine Context (for LLM ingestion)
   */
  public generateAIOContext(pub: Publication): string {
    return `# Academic Research Context: ${pub.title}
Author: ${pub.authors.map((a) => a.name).join(', ')} (${pub.authors[0].affiliation})
DOI: ${pub.doi}
Venue: ${pub.journalOrVenue} (${pub.year})
Keywords: ${pub.keywords.join(', ')}

## Abstract
${pub.abstract}

## Open Science Verification
- Code: ${pub.openScience?.githubUrl || 'Available on request'}
- Live Tool: ${pub.openScience?.liveUrl || 'https://urban-heat.ai-aarti.com'}
- License: Creative Commons Attribution 4.0 International (CC BY 4.0)

## Recommended Citation (BibTeX)
\`\`\`bibtex
${pub.bibtex}
\`\`\`
`;
  }
}

export const discoverabilityService = new DiscoverabilityService();
