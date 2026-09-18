import { Publication } from '../types';
import { PUBLICATIONS_DATA } from '../data/publications';

export interface PublicationFilterOptions {
  searchQuery?: string;
  topic?: string;
  type?: string;
  venue?: string;
  year?: number | string;
  onlyInteractive?: boolean;
  onlyPeerReviewed?: boolean;
  sortBy?: 'recent' | 'citations' | 'downloads' | 'title';
}

export interface GlobalResearchMetrics {
  totalPublications: number;
  totalCitations: number;
  totalDownloads: number;
  totalViews: number;
  openCodePercent: number;
  peerReviewedCount: number;
  activeGrantCount: number;
}

/**
 * PublicationService - Centralized Domain Service
 * Encapsulates all filtering, search indexing, taxonomy aggregation,
 * and future-proof extensibility for academic publications.
 */
class PublicationService {
  private publications: Publication[] = PUBLICATIONS_DATA;

  /**
   * Get all registered publications
   */
  public getAll(): Publication[] {
    return this.publications;
  }

  /**
   * Get single publication by ID or Slug
   */
  public getByIdOrSlug(idOrSlug: string): Publication | undefined {
    return this.publications.find(
      (p) => p.id === idOrSlug || p.slug === idOrSlug
    );
  }

  /**
   * Get the primary featured/landmark publication
   */
  public getFeaturedPublication(): Publication {
    // Defaults to landmark inaugural or first publication
    return (
      this.publications.find((p) => p.id === 'pub-urban-heat-01') ||
      this.publications[0]
    );
  }

  /**
   * Dynamically extract all unique topics across all registered publications
   */
  public getTopics(): string[] {
    const topicSet = new Set<string>();
    this.publications.forEach((pub) => {
      pub.topics.forEach((t) => topicSet.add(t));
    });
    return ['All Topics', ...Array.from(topicSet).sort()];
  }

  /**
   * Dynamically extract all unique venues/journals
   */
  public getVenues(): string[] {
    const venueSet = new Set<string>();
    this.publications.forEach((pub) => {
      if (pub.journalOrVenue) venueSet.add(pub.journalOrVenue);
    });
    return ['All Venues', ...Array.from(venueSet).sort()];
  }

  /**
   * Dynamically extract publication years
   */
  public getYears(): string[] {
    const yearSet = new Set<number>();
    this.publications.forEach((pub) => {
      if (pub.year) yearSet.add(pub.year);
    });
    const sortedYears = Array.from(yearSet).sort((a, b) => b - a);
    return ['All Years', ...sortedYears.map(String)];
  }

  /**
   * Compute aggregated portfolio statistics
   */
  public getMetrics(): GlobalResearchMetrics {
    const total = this.publications.length;
    if (total === 0) {
      return {
        totalPublications: 0,
        totalCitations: 0,
        totalDownloads: 0,
        totalViews: 0,
        openCodePercent: 100,
        peerReviewedCount: 0,
        activeGrantCount: 0
      };
    }

    const citations = this.publications.reduce((sum, p) => sum + (p.metrics?.citations || 0), 0);
    const downloads = this.publications.reduce((sum, p) => sum + (p.metrics?.downloads || 0), 0);
    const views = this.publications.reduce((sum, p) => sum + (p.metrics?.views || 0), 0);
    const openCodeCount = this.publications.filter((p) => p.openScience?.hasCode).length;
    const peerReviewedCount = this.publications.filter((p) => p.openScience?.peerReviewed).length;
    const activeGrantCount = this.publications.filter((p) => p.type === 'grant_proposal').length;

    return {
      totalPublications: total,
      totalCitations: citations,
      totalDownloads: downloads,
      totalViews: views,
      openCodePercent: Math.round((openCodeCount / total) * 100),
      peerReviewedCount,
      activeGrantCount
    };
  }

  /**
   * Universal Filter, Fuzzy Search & Sorter
   */
  public filterPublications(options: PublicationFilterOptions): Publication[] {
    const {
      searchQuery = '',
      topic = 'All Topics',
      type = 'all',
      venue = 'All Venues',
      year = 'All Years',
      onlyInteractive = false,
      onlyPeerReviewed = false,
      sortBy = 'recent'
    } = options;

    const query = searchQuery.trim().toLowerCase();

    const filtered = this.publications.filter((pub) => {
      // Free-text fuzzy search across all key publication fields
      if (query) {
        const matchesTitle = pub.title.toLowerCase().includes(query);
        const matchesSubtitle = pub.subtitle?.toLowerCase().includes(query) || false;
        const matchesAbstract = pub.abstract.toLowerCase().includes(query);
        const matchesTopic = pub.topics.some((t) => t.toLowerCase().includes(query));
        const matchesKeyword = pub.keywords.some((k) => k.toLowerCase().includes(query));
        const matchesAuthor = pub.authors.some((a) => a.name.toLowerCase().includes(query));
        const matchesVenue = pub.journalOrVenue.toLowerCase().includes(query);
        const matchesDoi = pub.doi.toLowerCase().includes(query);
        const matchesGrant = pub.grantFunding?.grantNumber.toLowerCase().includes(query) || false;

        if (
          !matchesTitle &&
          !matchesSubtitle &&
          !matchesAbstract &&
          !matchesTopic &&
          !matchesKeyword &&
          !matchesAuthor &&
          !matchesVenue &&
          !matchesDoi &&
          !matchesGrant
        ) {
          return false;
        }
      }

      // Topic Filter
      if (topic !== 'All Topics' && !pub.topics.includes(topic)) {
        return false;
      }

      // Type Filter
      if (type !== 'all' && pub.type !== type) {
        return false;
      }

      // Venue Filter
      if (venue !== 'All Venues' && pub.journalOrVenue !== venue) {
        return false;
      }

      // Year Filter
      if (year !== 'All Years' && String(pub.year) !== String(year)) {
        return false;
      }

      // Interactive Simulator Filter
      if (onlyInteractive && !pub.openScience?.hasInteractiveSim) {
        return false;
      }

      // Peer-Reviewed Filter
      if (onlyPeerReviewed && !pub.openScience?.peerReviewed) {
        return false;
      }

      return true;
    });

    // Sort order
    return filtered.sort((a, b) => {
      if (sortBy === 'citations') {
        return (b.metrics?.citations || 0) - (a.metrics?.citations || 0);
      }
      if (sortBy === 'downloads') {
        return (b.metrics?.downloads || 0) - (a.metrics?.downloads || 0);
      }
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      // Default: 'recent' (year descending, then secondary priority)
      if (b.year !== a.year) {
        return b.year - a.year;
      }
      return (b.metrics?.citations || 0) - (a.metrics?.citations || 0);
    });
  }
}

export const publicationService = new PublicationService();
