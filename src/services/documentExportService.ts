import { Publication, ThermalDataPoint } from '../types';
import { METRO_HEAT_DATA } from '../data/urbanHeatData';

export interface CitationStyles {
  bibtex: string;
  apa: string;
  ieee: string;
  mla: string;
  chicago: string;
  ris: string;
}

export const documentExportService = {
  /**
   * Generates a fully formatted Scientific Markdown (.md) representation of the publication/monograph
   */
  generateMarkdown(publication: Publication): string {
    const authorsList = publication.authors
      .map((a) => `${a.name} (${a.affiliation}${a.orcid ? `, ORCID: ${a.orcid}` : ''})`)
      .join(', ');

    const frontmatter = `---
title: "${publication.title.replace(/"/g, '\\"')}"
subtitle: "${(publication.subtitle || '').replace(/"/g, '\\"')}"
authors:
${publication.authors.map((a) => `  - name: "${a.name}"\n    affiliation: "${a.affiliation}"\n    orcid: "${a.orcid || ''}"`).join('\n')}
venue: "${publication.journalOrVenue}"
type: "${publication.type}"
date: "${publication.date}"
year: ${publication.year}
doi: "${publication.doi}"
arxiv: "${publication.arxivId || ''}"
url: "${publication.openScience?.liveUrl || 'https://urban-heat.ai-aarti.com/'}"
github: "${publication.openScience?.githubUrl || 'https://github.com/aartisr/urban-heat-democratization'}"
topics: [${publication.topics.map((t) => `"${t}"`).join(', ')}]
keywords: [${publication.keywords.map((k) => `"${k}"`).join(', ')}]
metrics:
  citations: ${publication.metrics.citations}
  downloads: ${publication.metrics.downloads}
  altmetric: ${publication.metrics.altmetricScore}
---

# ${publication.title}

${publication.subtitle ? `> *${publication.subtitle}*\n\n` : ''}**Author(s):** ${authorsList}  
**Published in:** ${publication.journalOrVenue}  
**Date:** ${publication.date} | **DOI:** [${publication.doi}](https://doi.org/${publication.doi})  
**Permanent Live Repository:** [${publication.openScience?.liveUrl || 'https://urban-heat.ai-aarti.com/'}](${publication.openScience?.liveUrl || 'https://urban-heat.ai-aarti.com/'})  
**Open Source Code:** [${publication.openScience?.githubUrl || 'https://github.com/aartisr/urban-heat-democratization'}](${publication.openScience?.githubUrl || 'https://github.com/aartisr/urban-heat-democratization'})  

---

## Executive Abstract

${publication.abstract}

`;

    let sectionsContent = '';

    if (publication.fullContent?.sections) {
      sectionsContent = publication.fullContent.sections
        .map((sec) => {
          // Convert basic html tags to markdown
          let cleanContent = sec.contentHtml
            .replace(/<p class="[^"]*">/g, '\n\n')
            .replace(/<\/p>/g, '')
            .replace(/<strong>/g, '**')
            .replace(/<\/strong>/g, '**')
            .replace(/<em>/g, '*')
            .replace(/<\/em>/g, '*')
            .replace(/<ul class="[^"]*">/g, '\n')
            .replace(/<\/ul>/g, '\n')
            .replace(/<ol class="[^"]*">/g, '\n')
            .replace(/<\/ol>/g, '\n')
            .replace(/<li>/g, '- ')
            .replace(/<\/li>/g, '\n')
            .replace(/<a [^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/g, '[$2]($1)')
            .trim();

          let calloutBlock = '';
          if (sec.callout) {
            calloutBlock = `\n\n> **${sec.callout.title}** (${sec.callout.type.toUpperCase()})  \n> ${sec.callout.text}\n\n`;
          }

          let eqBlock = '';
          if (sec.equation) {
            eqBlock = `\n\n### Mathematical Formulation: ${sec.equation.label}\n\n$$\n${sec.equation.latex}\n$$\n\n*${sec.equation.explanation}*\n\n`;
          }

          let chartNote = '';
          if (sec.hasD3Chart === 'scatter') {
            chartNote = `\n\n> **[Figure 1: Empirical Thermal-Canopy Disparity Scatter Plot & Regression Line]**  \n> *Data source: Landsat 8/9 TIRS-2 Band 10 (30m LST) cross-referenced with Sentinel-2 MSI NDVI and CDC Social Vulnerability Index.*\n\n`;
          } else if (sec.hasD3Chart === 'heatmap') {
            chartNote = `\n\n> **[Figure 2: Metropolitan Microclimatic Spatial Grid & Thermal Anomaly Heatmap]**  \n> *Comparative evaluation across Boston, Phoenix, Atlanta, Chicago, Houston, and Los Angeles.*\n\n`;
          } else if (sec.hasD3Chart === 'simulator') {
            chartNote = `\n\n> **[Figure 3: Interactive Multi-Variable Thermodynamic Mitigation Simulator]**  \n> *Models sensible heat flux attenuation across canopy expansion (ΔC_veg), cool roof albedo retrofits (Δa_roof), and permeable pavement (ΔP_perm).*\n\n`;
          }

          return `## ${sec.title}\n\n${cleanContent}${eqBlock}${calloutBlock}${chartNote}`;
        })
        .join('\n\n---\n\n');
    }

    // Census Tract Empirical Data Table
    const dataTable = `
## Empirical Census Tract Data Matrix (Greater Boston & Benchmarks)

| Tract / Neighborhood | Metro Area | LST (°C) | LST (°F) | Canopy Cover (%) | NDVI | CDC SVI | Vulnerability |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: |
${METRO_HEAT_DATA.slice(0, 10)
  .map(
    (t: ThermalDataPoint) =>
      `| ${t.neighborhood} | ${t.metroArea} | ${t.lstCelsius.toFixed(1)}°C | ${t.lstFahrenheit.toFixed(1)}°F | ${t.canopyPercent.toFixed(1)}% | ${t.ndvi.toFixed(2)} | ${t.socialVulnerabilityIndex.toFixed(2)} | **${t.heatVulnerabilityRank}** |`
  )
  .join('\n')}

*(Complete dataset available at https://urban-heat.ai-aarti.com/data)*

---

## BibTeX Citation

\`\`\`bibtex
${publication.bibtex}
\`\`\`

---
*Generated by ai-aarti.com Research Publications Archive. Licensed under Creative Commons Attribution 4.0 International (CC-BY 4.0).*
`;

    return frontmatter + sectionsContent + '\n\n' + dataTable;
  },

  /**
   * Generates Multi-Style Academic Citations
   */
  generateCitations(publication: Publication): CitationStyles {
    const authorNames = publication.authors.map((a) => a.name);
    const primaryAuthor = authorNames[0] || 'Ravikumar, Aarti Sri';
    const year = publication.year;
    const title = publication.title;
    const venue = publication.journalOrVenue;
    const doi = publication.doi;
    const url = publication.openScience?.liveUrl || 'https://urban-heat.ai-aarti.com/';

    // APA 7th
    const apa = `${primaryAuthor}. (${year}). ${title}. ${venue}. https://doi.org/${doi}`;

    // IEEE
    const ieee = `A. S. Ravikumar, "${title}," in ${venue}, vol. 1, pp. 1-28, ${year}, doi: ${doi}.`;

    // MLA 9th
    const mla = `${primaryAuthor}. "${title}." ${venue}, ${year}, doi:${doi}. Accessed 18 Sep. 2026.`;

    // Chicago 17th
    const chicago = `${primaryAuthor}. "${title}." ${venue} (${year}). https://doi.org/${doi}.`;

    // RIS Format
    const ris = `TY  - JOUR
TI  - ${title}
T2  - ${venue}
AU  - ${primaryAuthor}
PY  - ${year}
DO  - ${doi}
UR  - ${url}
AB  - ${publication.abstract}
KW  - ${publication.keywords.join(', ')}
ER  - `;

    return {
      bibtex: publication.bibtex,
      apa,
      ieee,
      mla,
      chicago,
      ris
    };
  },

  /**
   * Triggers download of a text/blob file in browser
   */
  downloadFile(filename: string, content: string, mimeType: string) {
    const blob = new Blob([content], { type: `${mimeType};charset=utf-8` });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  },

  /**
   * Download Markdown (.md)
   */
  downloadMarkdown(publication: Publication) {
    const md = this.generateMarkdown(publication);
    const filename = `${publication.slug}-research-monograph.md`;
    this.downloadFile(filename, md, 'text/markdown');
  },

  /**
   * Download BibTeX (.bib)
   */
  downloadBibtex(publication: Publication) {
    const filename = `${publication.slug}-citation.bib`;
    this.downloadFile(filename, publication.bibtex, 'application/x-bibtex');
  },

  /**
   * Download JSON Data Bundle (.json)
   */
  downloadJson(publication: Publication) {
    const payload = {
      publication,
      tractLevelThermalData: METRO_HEAT_DATA,
      exportTimestamp: new Date().toISOString(),
      schemaVersion: '2.4.0',
      license: 'CC-BY-4.0',
      archiveUrl: 'https://publications.ai-aarti.com/',
      researchUrl: 'https://urban-heat.ai-aarti.com/'
    };
    const jsonStr = JSON.stringify(payload, null, 2);
    const filename = `${publication.slug}-data-bundle.json`;
    this.downloadFile(filename, jsonStr, 'application/json');
  },

  /**
   * Generate Printable Academic Document & Launch Print / Save as PDF Dialog
   */
  downloadPdfOrPrint(publication: Publication) {
    const markdown = this.generateMarkdown(publication);
    const citations = this.generateCitations(publication);

    // Build standalone, high-fidelity academic print HTML document
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      // Fallback: trigger standard browser print
      window.print();
      return;
    }

    const sectionsHtml = publication.fullContent?.sections
      ?.map(
        (sec, idx) => `
        <div class="section-block">
          <h2 class="section-title">${sec.title}</h2>
          <div class="section-text">${sec.contentHtml}</div>
          ${
            sec.equation
              ? `
            <div class="math-box">
              <div class="math-label">${sec.equation.label}</div>
              <div class="math-latex">$$\\mathbf{${sec.equation.latex}}$$</div>
              <div class="math-explanation">${sec.equation.explanation}</div>
            </div>
          `
              : ''
          }
          ${
            sec.callout
              ? `
            <div class="callout-box callout-${sec.callout.type}">
              <strong>${sec.callout.title}:</strong> ${sec.callout.text}
            </div>
          `
              : ''
          }
        </div>
      `
      )
      .join('') || `<p>${publication.abstract}</p>`;

    const tractRowsHtml = METRO_HEAT_DATA.slice(0, 8)
      .map(
        (t: ThermalDataPoint) => `
        <tr>
          <td>${t.neighborhood}</td>
          <td>${t.metroArea}</td>
          <td style="text-align:center;">${t.lstCelsius.toFixed(1)}°C</td>
          <td style="text-align:center;">${t.lstFahrenheit.toFixed(1)}°F</td>
          <td style="text-align:center;">${t.canopyPercent.toFixed(1)}%</td>
          <td style="text-align:center;">${t.socialVulnerabilityIndex.toFixed(2)}</td>
          <td style="text-align:center; font-weight:bold;">${t.heatVulnerabilityRank}</td>
        </tr>
      `
      )
      .join('');

    const htmlDoc = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8" />
        <title>${publication.title} - Academic Research Monograph Reprint</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css" />
        <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.js"></script>
        <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/contrib/auto-render.min.js"
          onload="renderMathInElement(document.body);"></script>
        <style>
          @page {
            size: letter;
            margin: 20mm 18mm 20mm 18mm;
            @top-right {
              content: "ai-aarti.com Publications Archive";
              font-family: serif;
              font-size: 8pt;
              color: #718096;
            }
            @bottom-center {
              content: counter(page);
              font-family: serif;
              font-size: 9pt;
            }
          }
          body {
            font-family: 'Times New Roman', Times, 'Georgia', serif;
            font-size: 10.5pt;
            line-height: 1.55;
            color: #1a202c;
            background: #fff;
            margin: 0;
            padding: 24px;
          }
          .header-banner {
            border-bottom: 2px solid #2d3748;
            padding-bottom: 12px;
            margin-bottom: 18px;
            display: flex;
            justify-content: space-between;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            font-size: 8.5pt;
            color: #4a5568;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          .title {
            font-size: 22pt;
            font-weight: 800;
            line-height: 1.2;
            color: #0f172a;
            margin-bottom: 8px;
          }
          .subtitle {
            font-size: 13pt;
            font-style: italic;
            color: #475569;
            margin-bottom: 14px;
            line-height: 1.35;
          }
          .authors {
            font-size: 11pt;
            font-weight: bold;
            color: #1e293b;
            margin-bottom: 4px;
          }
          .affiliations {
            font-size: 9pt;
            color: #64748b;
            font-style: italic;
            margin-bottom: 14px;
          }
          .meta-bar {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 6px;
            padding: 8px 12px;
            font-size: 8.5pt;
            font-family: monospace;
            margin-bottom: 20px;
            display: flex;
            justify-content: space-between;
          }
          .abstract-card {
            background: #fbfbfb;
            border-left: 3px solid #b45309;
            padding: 12px 16px;
            margin-bottom: 24px;
            font-size: 9.5pt;
          }
          .abstract-card strong {
            font-family: -apple-system, BlinkMacSystemFont, sans-serif;
            color: #92400e;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            font-size: 8.5pt;
            display: block;
            margin-bottom: 6px;
          }
          .section-block {
            margin-bottom: 22px;
            page-break-inside: avoid;
          }
          .section-title {
            font-size: 13pt;
            font-weight: 700;
            border-bottom: 1px solid #cbd5e1;
            padding-bottom: 4px;
            margin-top: 18px;
            margin-bottom: 10px;
            color: #0f172a;
          }
          .section-text {
            text-align: justify;
          }
          .math-box {
            background: #fafaf9;
            border: 1px solid #e7e5e4;
            border-radius: 6px;
            padding: 10px 14px;
            margin: 12px 0;
            text-align: center;
          }
          .math-label {
            font-family: -apple-system, sans-serif;
            font-size: 8pt;
            font-weight: bold;
            color: #78350f;
            text-transform: uppercase;
            margin-bottom: 4px;
          }
          .math-latex {
            font-size: 11pt;
            margin: 8px 0;
          }
          .math-explanation {
            font-size: 8.5pt;
            color: #57534e;
            font-style: italic;
            text-align: left;
          }
          .callout-box {
            border-radius: 6px;
            padding: 10px 12px;
            margin: 12px 0;
            font-size: 9pt;
            background: #f1f5f9;
            border-left: 4px solid #475569;
          }
          .callout-key_insight, .callout-nobel_insight {
            background: #fefce8;
            border-left-color: #ca8a04;
          }
          .callout-policy_impact {
            background: #faf5ff;
            border-left-color: #9333ea;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 8.5pt;
            margin: 16px 0;
            font-family: -apple-system, BlinkMacSystemFont, sans-serif;
          }
          th {
            background: #f1f5f9;
            border-top: 1px solid #94a3b8;
            border-bottom: 1px solid #94a3b8;
            padding: 6px 8px;
            text-align: left;
          }
          td {
            border-bottom: 1px solid #e2e8f0;
            padding: 5px 8px;
          }
          .bibtex-box {
            background: #0f172a;
            color: #fde68a;
            font-family: 'Courier New', Courier, monospace;
            font-size: 8pt;
            padding: 12px;
            border-radius: 6px;
            white-space: pre-wrap;
            margin-top: 20px;
          }
          .footer-note {
            margin-top: 30px;
            padding-top: 12px;
            border-top: 1px solid #cbd5e1;
            font-size: 8pt;
            color: #64748b;
            text-align: center;
            font-family: -apple-system, sans-serif;
          }
          .print-toolbar {
            position: fixed;
            top: 10px;
            right: 10px;
            background: #0f172a;
            color: white;
            padding: 8px 14px;
            border-radius: 8px;
            font-family: -apple-system, BlinkMacSystemFont, sans-serif;
            font-size: 12px;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(0,0,0,0.25);
            z-index: 9999;
          }
          @media print {
            .print-toolbar { display: none !important; }
            body { padding: 0; }
          }
        </style>
      </head>
      <body>
        <div class="print-toolbar" onclick="window.print()">
          🖨️ Save as PDF / Print Document
        </div>

        <div class="header-banner">
          <div>ai-aarti.com Research Publications Monograph Series</div>
          <div>DOI: ${publication.doi}</div>
        </div>

        <div class="title">${publication.title}</div>
        ${publication.subtitle ? `<div class="subtitle">${publication.subtitle}</div>` : ''}

        <div class="authors">
          ${publication.authors.map((a) => `${a.name}${a.orcid ? ` (ORCID: ${a.orcid})` : ''}`).join(', ')}
        </div>
        <div class="affiliations">
          ${publication.authors.map((a) => a.affiliation).join(' • ')} | Lead Systems Architect
        </div>

        <div class="meta-bar">
          <div><strong>Venue:</strong> ${publication.journalOrVenue}</div>
          <div><strong>Date:</strong> ${publication.date}</div>
          <div><strong>Status:</strong> ${publication.status} (Open Access CC-BY 4.0)</div>
        </div>

        <div class="abstract-card">
          <strong>Executive Synopsis & Research Abstract</strong>
          ${publication.abstract}
        </div>

        ${sectionsHtml}

        <div class="section-block">
          <h2 class="section-title">Empirical Multi-Tract Microclimatic Reference Matrix</h2>
          <table>
            <thead>
              <tr>
                <th>Neighborhood</th>
                <th>Metro Area</th>
                <th style="text-align:center;">LST (°C)</th>
                <th style="text-align:center;">LST (°F)</th>
                <th style="text-align:center;">Canopy (%)</th>
                <th style="text-align:center;">SVI</th>
                <th style="text-align:center;">Vulnerability</th>
              </tr>
            </thead>
            <tbody>
              ${tractRowsHtml}
            </tbody>
          </table>
          <p style="font-size:8pt; color:#64748b; margin-top:4px;">
            Full telemetry and sensor calibration data available at https://urban-heat.ai-aarti.com/
          </p>
        </div>

        <div class="section-block">
          <h2 class="section-title">Formal Archival Citation (BibTeX)</h2>
          <div class="bibtex-box">${publication.bibtex}</div>
        </div>

        <div class="footer-note">
          Published by Aarti Sri Ravikumar | ai-aarti.com Planetary Resilience Research Infrastructure •
          Open Source Repository: https://github.com/aartisr/urban-heat-democratization
        </div>

        <script>
          // Automatically prompt print dialog after formulas render
          window.addEventListener('load', () => {
            setTimeout(() => {
              // window.print();
            }, 800);
          });
        </script>
      </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(htmlDoc);
    printWindow.document.close();
  }
};
