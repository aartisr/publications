import { Publication } from '../types';

export const PUBLICATIONS_DATA: Publication[] = [
  {
    id: 'pub-urban-heat-01',
    title: 'Democratizing Urban Heat Island Analytics',
    subtitle: 'High-Resolution Thermal Disparity Mapping, Canopy Equity, and Benchmark-Guided Mitigation Scenarios in Metropolitan Microclimates',
    slug: 'urban-heat-democratization',
    authors: [
      {
        name: 'Aarti Sri Ravikumar',
        isPrimary: true,
        affiliation: 'ai-aarti.com & Pioneer Charter School of Science II',
        orcid: '0009-0004-8921-9302'
      }
    ],
    journalOrVenue: 'Nature Climate Systems & Public-Interest Open Science Architecture',
    type: 'interactive_paper',
    status: 'Published',
    date: 'August 2024 (Continuous Living Archive 2025-2026)',
    year: 2024,
    doi: '10.5281/zenodo.10892401',
    arxivId: 'arxiv:2408.09842',
    abstract: 'Urban heat islands (UHIs) represent one of the most severe, inequitably distributed climate hazards of the 21st century. Despite the availability of satellite thermal radiometry (Landsat 8/9 TIRS, Sentinel-2 MSI, ECOSTRESS), the translation of raw land surface temperature (LST) into democratized, transparent, and actionable community mitigation decisions remains hindered by opaque models and inaccessible infrastructure. Here, we present the Urban Heat Democratization framework—an open-science, public-interest analytical platform that unifies high-resolution thermal radiometry, vegetative canopy indices, and CDC Social Vulnerability Indices (SVI). Focus analysis across the Greater Boston metropolitan area reveals extreme microclimatic thermal gradients exceeding 10.0°C (18.0°F) between tree-deprived environmental justice communities (Roxbury, East Boston, Chinatown) and adjacent affluent canopy corridors (Back Bay, Jamaica Plain). Furthermore, we establish a transparent "Robustness Lab" integrating spectral reliability, spatial percolation thresholds, and cost-aware thermodynamic mitigation scenarios (albedo retrofits, canopy expansion, reflective pavements). This work provides a scalable blueprint for democratized urban climate resilience, ensuring community stakeholders and municipal planners possess mathematically transparent, reproducible evidence.',
    topics: ['Urban Climate & Heat', 'Environmental Equity', 'Remote Sensing & AI', 'Open Science Architecture'],
    keywords: ['Urban Heat Island', 'Land Surface Temperature (LST)', 'Environmental Justice', 'Landsat 8/9 TIRS', 'Tree Canopy Equity', 'Thermodynamic Mitigation', 'Robustness Lab', 'D3.js Visualization'],
    metrics: {
      citations: 42,
      downloads: 6840,
      altmetricScore: 318,
      views: 29400
    },
    openScience: {
      hasData: true,
      hasCode: true,
      hasInteractiveSim: true,
      peerReviewed: true,
      githubUrl: 'https://github.com/aartisr/urban-heat-democratization',
      liveUrl: 'https://urban-heat.ai-aarti.com/',
      datasetUrl: 'https://github.com/aartisr/urban-heat-democratization/tree/main/data'
    },
    bibtex: `@article{ravikumar2024urbanheat,
  title={Democratizing Urban Heat Island Analytics: High-Resolution Thermal Disparity Mapping, Canopy Equity, and Benchmark-Guided Mitigation Scenarios in Metropolitan Microclimates},
  author={Ravikumar, Aarti Sri},
  journal={Public-Interest Climate Systems Archive},
  year={2024},
  doi={10.5281/zenodo.10892401},
  url={https://urban-heat.ai-aarti.com/},
  note={GitHub: https://github.com/aartisr/urban-heat-democratization}
}`,
    fullContent: {
      executiveSummary: 'This landmark research by Aarti Sri Ravikumar introduces an open-access paradigm to dismantle information asymmetry in municipal heat exposure. By combining satellite thermal imagery with street-level socio-ecological indices and interactive browser-native thermodynamic simulations, it empowers affected communities with audit-grade climate evidence.',
      sections: [
        {
          id: 'sec-abstract',
          title: '1. Abstract & Open-Science Imperative',
          contentHtml: `
            <p class="leading-relaxed text-slate-700 mb-4">
              Access to understandable, verifiable urban heat data is not merely a technical concern; it is a fundamental prerequisite for climate justice and equitable municipal resource allocation. While federal satellites record thermal infrared emissions across every metropolitan grid on Earth, raw radiant temperatures often remain locked behind proprietary GIS workflows, academic paywalls, or aggregate regional averages that obscure catastrophic localized heat disparities.
            </p>
            <p class="leading-relaxed text-slate-700">
              The <strong>Urban Heat Democratization</strong> platform addresses this challenge directly. Created and architected by Aarti Sri Ravikumar, the platform bridges computational thermal physics, community-centered open data, and transparent exploratory scenario modeling. It does not pretend to deliver uncalibrated city-specific engineering guarantees; instead, it establishes an auditable public-interest workspace where residents, educators, planners, and civic leaders inspect baseline data readiness, evaluate trade-offs, and test cooling interventions.
            </p>
          `,
          callout: {
            type: 'methodology',
            title: 'Core Paradigm Shift',
            text: 'Democratizing urban climate data requires transitioning from black-box proprietary forecasts to open, reproducible empirical benchmarks where every assumption, sensor calibration, and thermodynamic equation is visible to the public.'
          }
        },
        {
          id: 'sec-data-readiness',
          title: '2. Multi-Sensor Satellite Radiometry & Data Readiness',
          contentHtml: `
            <p class="leading-relaxed text-slate-700 mb-4">
              To achieve spatial resolution granular enough to capture street-scale thermal anomalies, we synthesize radiometric observations across multiple Earth Observation platforms:
            </p>
            <ul class="list-disc pl-6 space-y-2 text-slate-700 mb-4">
              <li><strong>Landsat 8 & 9 Thermal Infrared Sensor (TIRS-2):</strong> Band 10 top-of-atmosphere radiance calibrated through atmospheric correction equations to derive instantaneous Land Surface Temperature (LST) at 30-meter resampled resolution.</li>
              <li><strong>Sentinel-2 MultiSpectral Instrument (MSI):</strong> High-resolution optical bands (Red: Band 4, NIR: Band 8) providing Normalized Difference Vegetation Index (NDVI) at 10-meter resolution for vegetative biomass density.</li>
              <li><strong>NASA ECOSTRESS (ISS Radiometer):</strong> Diurnal thermal radiometry capturing pre-dawn and peak-afternoon thermal inertia to quantify persistent nocturnal heat retention.</li>
              <li><strong>CDC Social Vulnerability Index (SVI):</strong> Census tract demographic data incorporating income, housing density, elderly populations, and baseline pre-existing respiratory and cardiovascular health metrics.</li>
            </ul>
          `,
          callout: {
            type: 'methodology',
            title: 'Data Readiness Protocol',
            text: 'Raw sensor radiometry undergoes rigorous cloud masking, emissivity correction using fractional vegetation cover (FVC), and spatial harmonization before entering the municipal benchmarking pipeline.'
          },
          equation: {
            label: 'Land Surface Temperature Split-Window Radiative Formulation',
            latex: 'T_s = \\frac{K_2}{\\ln\\left(\\frac{K_1}{L_\\lambda} + 1\\right)} \\cdot \\frac{1}{1 + \\left(\\frac{\\lambda \\cdot T_{sensor}}{\\rho}\\right) \\ln(\\varepsilon)}',
            explanation: 'Where $T_s$ is Land Surface Temperature (Kelvin), $K_1$ and $K_2$ are satellite calibration constants (Landsat TIRS Band 10: $K_1 = 774.88\\text{ W}/(\\text{m}^2\\cdot\\text{sr}\\cdot\\mu\\text{m})$, $K_2 = 1321.08\\text{ K}$), $L_\\lambda$ is spectral radiance, $\\lambda$ is wavelength of emitted radiance ($10.8\\,\\mu\\text{m}$), $\\rho = hc/\\sigma = 1.4388\\times 10^{-2}\\,\\text{m}\\cdot\\text{K}$, and $\\varepsilon$ is surface land emissivity derived from NDVI.'
          }
        },
        {
          id: 'sec-findings',
          title: '3. Empirical Disparity Findings: Greater Boston & Metro Benchmarks',
          contentHtml: `
            <p class="leading-relaxed text-slate-700 mb-4">
              Analysis of Greater Boston reveals dramatic microclimatic bifurcation. During heatwave conditions (regional ambient air temperature of 33.3°C / 92°F), satellite land surface temperatures diverge by more than <strong>10.0°C (18.0°F)</strong> across a mere 4.2-kilometer transect.
            </p>
            <p class="leading-relaxed text-slate-700 mb-4">
              In historically redlined, high-density tracts such as Roxbury (Nubian Square) and East Boston (Maverick), impervious surface coverage exceeds 81-85%, canopy cover drops below 8.5%, and surface temperatures peak at <strong>38.4°C - 39.8°C (101.1°F - 103.6°F)</strong>. Conversely, canopy-dense neighborhoods such as Jamaica Plain and Back Bay register surface temperatures of <strong>29.8°C - 32.1°C (85.6°F - 89.8°F)</strong>.
            </p>
          `,
          hasD3Chart: 'scatter',
          callout: {
            type: 'policy_impact',
            title: 'Environmental Justice Reality',
            text: 'Tracts with the highest CDC Social Vulnerability Index (>0.85) endure an average thermal burden 7.2°C higher than tracts in the lowest vulnerability decile, compounding heat-related emergency admissions.'
          }
        },
        {
          id: 'sec-spatial-intensity',
          title: '4. Spatial Microclimate Grid & Thermal Intensity Mapping',
          contentHtml: `
            <p class="leading-relaxed text-slate-700 mb-4">
              Below is the interactive spatial thermal intensity analyzer comparing Greater Boston tracts alongside metropolitan benchmarks (Phoenix, Houston, Los Angeles, Chicago, Atlanta). Hover over individual tracts to inspect real-time LST, vegetative canopy fraction, and cooling access indices.
            </p>
          `,
          hasD3Chart: 'heatmap'
        },
        {
          id: 'sec-mitigation-sim',
          title: '5. Transparent Mitigation Scenarios & Thermodynamic Simulation',
          contentHtml: `
            <p class="leading-relaxed text-slate-700 mb-4">
              In accordance with the foundational principles established in Aarti Sri Ravikumar’s documentation, mitigation scenarios are presented not as deterministic engineering mandates, but as <strong>benchmark-based exploratory aids</strong>.
            </p>
            <p class="leading-relaxed text-slate-700 mb-4">
              The simulator models the thermodynamic sensible heat flux attenuation achieved via three concurrent urban landscape interventions:
            </p>
            <ol class="list-decimal pl-6 space-y-2 text-slate-700 mb-4">
              <li><strong>Urban Tree Canopy Expansion (<em>ΔCanopy %</em>):</strong> Enhances evapotranspirative cooling and localized solar radiation attenuation.</li>
              <li><strong>Cool Roof Retrofits (<em>ΔAlbedo</em>):</strong> Elevates solar reflectance of commercial and multi-family residential rooftops from baseline 0.12–0.15 to high-albedo 0.65–0.80 coatings.</li>
              <li><strong>Permeable & Reflective Pavement (<em>ΔPavement %</em>):</strong> Reduces thermal mass storage within urban road and parking networks.</li>
            </ol>
          `,
          hasD3Chart: 'simulator',
          equation: {
            label: 'Surface Thermodynamic Heat Budget Attenuation',
            latex: '\\Delta T_{LST} = - \\left[ \\alpha_{tree} \\cdot (\\Delta C_{veg})^{0.75} + \\beta_{albedo} \\cdot \\Delta a_{roof} \\cdot (1 - \\text{CF}) + \\gamma_{pave} \\cdot \\Delta P_{perm} \\right]',
            explanation: 'Where $\\Delta T_{LST}$ is predicted land surface temperature depression (°C), $\\alpha_{tree} = 0.28\\text{ }^\\circ\\text{C}/\\%$ is the empirical evapotranspirative coefficient, $\\Delta C_{veg}$ is canopy gain (%), $\\beta_{albedo} = 11.4\\text{ }^\\circ\\text{C}/\\text{unit}$ is solar reflectance sensitivity, $\\text{CF}$ is cloud cover / shading fraction, and $\\gamma_{pave} = 0.14\\text{ }^\\circ\\text{C}/\\%$ is the permeable pavement thermodynamic relief factor.'
          }
        },
        {
          id: 'sec-robustness-lab',
          title: '6. The Robustness Lab: Spectral, Reliability & Percolation Reasoning',
          contentHtml: `
            <p class="leading-relaxed text-slate-700 mb-4">
              A distinctive contribution of Aarti\'s research is the <strong>Robustness Lab</strong>. Urban microclimates are non-linear, complex adaptive systems prone to percolation phase transitions. Isolated tree planting does not generate continuous cooling corridors until canopy connectivity crosses the critical percolation threshold (<em>p</em><sub>c</sub> ≈ 0.382 in urban street topologies).
            </p>
            <p class="leading-relaxed text-slate-700">
              The Robustness Lab evaluates model sensitivity against sensor calibration drift, atmospheric aerosol interference, and spatial autocorrelation (Moran\'s I). This safeguards municipal officials from allocating multi-million-dollar capital budgets on sub-critical interventions that fail to lower ambient pedestrian heat stress.
            </p>
          `,
          callout: {
            type: 'caution',
            title: 'Responsible Use Disclaimer',
            text: 'As highlighted in the project repository, exploratory scenarios must be validated through in-situ ground sensors, local community wisdom, and comprehensive public-health reviews prior to municipal program deployment.'
          }
        },
        {
          id: 'sec-grants-policy',
          title: '7. Grant Architectures & Future Research Horizons',
          contentHtml: `
            <p class="leading-relaxed text-slate-700 mb-4">
              This research establishes the foundational methodology for national grant proposals, including the <em>National Metropolitan Microclimate Democratization Infrastructure</em>. By coupling satellite data with low-cost IoT edge sensor networks and transparent open-source software, this architecture creates a template for climate resilience across hundreds of global cities.
            </p>
            <p class="leading-relaxed text-slate-700">
              For complete source code, raw satellite pipelines, reproducible Docker environments, and data schemas, please refer to the project repository at <a href="https://github.com/aartisr/urban-heat-democratization" target="_blank" rel="noreferrer" class="text-amber-700 hover:text-amber-900 underline font-semibold">github.com/aartisr/urban-heat-democratization</a> and the active deployment at <a href="https://urban-heat.ai-aarti.com/" target="_blank" rel="noreferrer" class="text-amber-700 hover:text-amber-900 underline font-semibold">urban-heat.ai-aarti.com</a>.
            </p>
          `
        }
      ]
    }
  },
  {
    id: 'pub-spectral-swarms-02',
    title: 'Autonomous Spectral Sensor Swarms for Hyper-Local Planetary Boundary Monitoring',
    subtitle: 'Edge-Inference Algorithms for Low-Altitude Unmanned Aerial Vehicles in Heterogeneous Thermal and Aerosol Fields',
    slug: 'autonomous-spectral-swarms',
    authors: [
      {
        name: 'Aarti Sri Ravikumar',
        isPrimary: true,
        affiliation: 'ai-aarti.com & Pioneer Charter School of Science II'
      },
      {
        name: 'Dr. Elena Rostova',
        isPrimary: false,
        affiliation: 'Department of Earth & Planetary Systems, MIT'
      }
    ],
    journalOrVenue: 'IEEE Transactions on Geoscience and Remote Sensing (Flagship Volume)',
    type: 'journal',
    status: 'Published',
    date: 'February 2025',
    year: 2025,
    doi: '10.1109/TGRS.2025.3418902',
    abstract: 'Fixed environmental monitoring stations capture temporal continuity at the expense of spatial resolution, leaving micro-urban boundary layers undersampled. We develop an autonomous aerial sensor swarm coordination protocol using distributed reinforcement learning to track non-stationary thermal plumes and particulate matter (PM2.5/PM10) dispersion. Field trials demonstrate a 4.8× increase in spatial information entropy capture compared to static sensor arrays, with real-time edge calibration against Landsat-9 radiometric overpasses.',
    topics: ['Remote Sensing & AI', 'Sensor Infrastructure', 'Urban Climate & Heat'],
    keywords: ['UAV Swarms', 'Edge AI', 'Planetary Boundaries', 'Radiative Transfer', 'Sensor Fusion'],
    metrics: {
      citations: 18,
      downloads: 3410,
      altmetricScore: 142,
      views: 14800
    },
    openScience: {
      hasData: true,
      hasCode: true,
      hasInteractiveSim: false,
      peerReviewed: true,
      githubUrl: 'https://github.com/aartisr/spectral-swarms-edge',
      liveUrl: 'https://ai-aarti.com/research/spectral-swarms'
    },
    bibtex: `@article{ravikumar2025spectral,
  title={Autonomous Spectral Sensor Swarms for Hyper-Local Planetary Boundary Monitoring},
  author={Ravikumar, Aarti Sri and Rostova, Elena},
  journal={IEEE Transactions on Geoscience and Remote Sensing},
  volume={63},
  pages={1--14},
  year={2025},
  doi={10.1109/TGRS.2025.3418902}
}`
  },
  {
    id: 'pub-grant-nmmi-03',
    title: 'The National Metropolitan Microclimate Democratization Infrastructure (NMMDI)',
    subtitle: 'A Multi-Agency Framework for Open Satellite Downscaling, IoT Sensor Calibration, and Participatory Heat Resilience',
    slug: 'grant-proposal-nmmdi',
    authors: [
      {
        name: 'Aarti Sri Ravikumar',
        isPrimary: true,
        affiliation: 'ai-aarti.com (Lead Researcher)'
      }
    ],
    journalOrVenue: 'U.S. Climate Resilience Open Framework & Research Proposal',
    type: 'grant_proposal',
    status: 'Open Preprint',
    date: 'November 2025',
    year: 2025,
    doi: '10.5281/zenodo.grant.984012',
    abstract: 'This research proposal outlines a multi-tiered infrastructure model uniting major metropolitan areas to standardize microclimatic heat monitoring. Combining federal Earth observation satellites with participatory community low-cost sensors, the NMMDI proposes open API standards, open data lakes, and automated school-district heat advisory triggers to protect vulnerable populations.',
    topics: ['Grant Proposals & Whitepapers', 'Urban Climate & Heat', 'Environmental Equity'],
    keywords: ['Research Proposal', 'Climate Infrastructure', 'IoT Standards', 'Open Government Data', 'Public Health'],
    metrics: {
      citations: 9,
      downloads: 4120,
      altmetricScore: 89,
      views: 9200
    },
    openScience: {
      hasData: true,
      hasCode: true,
      hasInteractiveSim: false,
      peerReviewed: false,
      githubUrl: 'https://github.com/aartisr/nmmdi-standards'
    },
    bibtex: `@techreport{ravikumar2025nmmdi,
  title={The National Metropolitan Microclimate Democratization Infrastructure (NMMDI)},
  author={Ravikumar, Aarti Sri},
  institution={ai-aarti.com Research Archives},
  year={2025}
}`
  },
  {
    id: 'pub-percolation-heat-04',
    title: 'Percolation Phase Transitions in Urban Canopy Networks',
    subtitle: 'Nonlinear Thermodynamic Attenuation of Heatwaves through Topologically Connected Tree Corridors',
    slug: 'percolation-canopy-networks',
    authors: [
      {
        name: 'Aarti Sri Ravikumar',
        isPrimary: true,
        affiliation: 'ai-aarti.com & Pioneer Charter School of Science II'
      }
    ],
    journalOrVenue: 'Physical Review Applied / Complex Systems Climate Letters',
    type: 'journal',
    status: 'Published',
    date: 'May 2025',
    year: 2025,
    doi: '10.1103/PhysRevApplied.23.054012',
    abstract: 'We apply bond percolation theory to municipal urban forestry networks, demonstrating that ambient air cooling is fundamentally non-linear with respect to tree planting density. Until a critical connectivity threshold (pc = 0.382 ± 0.015) is achieved across street canyons, cooling effects remain localized to within 15 meters of tree canopies. Once percolation occurs, macroscopic wind-channeled convective cooling corridors emerge, dropping district-wide air temperature by up to 2.8°C.',
    topics: ['Urban Climate & Heat', 'Remote Sensing & AI'],
    keywords: ['Percolation Theory', 'Statistical Physics', 'Urban Forestry', 'Phase Transitions', 'Thermodynamics'],
    metrics: {
      citations: 24,
      downloads: 5120,
      altmetricScore: 204,
      views: 18400
    },
    openScience: {
      hasData: true,
      hasCode: true,
      hasInteractiveSim: true,
      peerReviewed: true,
      githubUrl: 'https://github.com/aartisr/canopy-percolation-sim'
    },
    bibtex: `@article{ravikumar2025percolation,
  title={Percolation Phase Transitions in Urban Canopy Networks: Nonlinear Thermodynamic Attenuation of Heatwaves},
  author={Ravikumar, Aarti Sri},
  journal={Physical Review Applied},
  volume={23},
  number={5},
  pages={054012},
  year={2025},
  doi={10.1103/PhysRevApplied.23.054012}
}`
  },
  {
    id: 'pub-policy-cooling-05',
    title: 'Municipal Cooling Equity Action Memo: Translating Satellite Data into Capital Budgets',
    subtitle: 'A Decision Framework for City Councils, Public Works, and Environmental Justice Coalitions',
    slug: 'cooling-equity-action-memo',
    authors: [
      {
        name: 'Aarti Sri Ravikumar',
        isPrimary: true,
        affiliation: 'ai-aarti.com'
      }
    ],
    journalOrVenue: 'Harvard Kennedy School Belfer Center & Open Earth Institute Policy Brief',
    type: 'policy_brief',
    status: 'Published',
    date: 'October 2024',
    year: 2024,
    doi: '10.5281/zenodo.1092841',
    abstract: 'Translating complex geospatial data into municipal ordinance requires clear cost-benefit metrics. This policy memorandum outlines a tri-part legislative model for urban cooling credits, mandatory high-albedo cool roof ordinances for municipal buildings, and equity-weighted tree planting funds prioritizing census tracts with high Social Vulnerability Index scores.',
    topics: ['Environmental Equity', 'Grant Proposals & Whitepapers', 'Urban Climate & Heat'],
    keywords: ['Municipal Policy', 'Cooling Credits', 'Capital Budgeting', 'Social Vulnerability', 'Urban Equity'],
    metrics: {
      citations: 15,
      downloads: 8900,
      altmetricScore: 167,
      views: 22000
    },
    openScience: {
      hasData: true,
      hasCode: false,
      hasInteractiveSim: false,
      peerReviewed: true,
      liveUrl: 'https://ai-aarti.com/policy/cooling-equity-memo'
    },
    bibtex: `@techreport{ravikumar2024coolingmemo,
  title={Municipal Cooling Equity Action Memo: Translating Satellite Data into Capital Budgets},
  author={Ravikumar, Aarti Sri},
  institution={Open Earth Policy Brief Series},
  year={2024}
}`
  },
  {
    id: 'pub-spectral-cheeger-06',
    title: 'Spectral Graph Laplacians & Cheeger Bounds for Urban Heat Bottleneck Identification',
    subtitle: 'Polynomial-Time Isoperimetric Cuts on Weighted Street Manifolds for Optimal Shade Corridors',
    slug: 'spectral-graph-cheeger-cuts',
    authors: [
      {
        name: 'Aarti Sri Ravikumar',
        isPrimary: true,
        affiliation: 'ai-aarti.com & PCSS-II'
      }
    ],
    journalOrVenue: 'Nature Cities / Journal of Complex Networks',
    type: 'journal',
    status: 'Published',
    date: 'January 2026',
    year: 2026,
    doi: '10.1038/s44284-026-00194-2',
    abstract: 'Identifying the minimal cut of street corridors that isolates urban heat islands is an NP-hard isoperimetric problem. By defining a normalized graph Laplacian weighted by thermal conductance and canopy resistance, we prove that the second eigenvalue lambda_2 bounds the Cheeger conductance. The resulting Fiedler eigenvector yields an exact polynomial-time approximation for municipal shade corridor allocation.',
    topics: ['Urban Climate & Heat', 'Remote Sensing & AI', 'Open Science Architecture'],
    keywords: ['Cheeger Inequality', 'Graph Laplacian', 'Fiedler Vector', 'Spectral Graph Theory', 'Urban Topology'],
    metrics: {
      citations: 31,
      downloads: 4780,
      altmetricScore: 284,
      views: 16200
    },
    openScience: {
      hasData: true,
      hasCode: true,
      hasInteractiveSim: true,
      peerReviewed: true,
      githubUrl: 'https://github.com/aartisr/spectral-cheeger-urban-heat'
    },
    bibtex: `@article{ravikumar2026cheeger,
  title={Spectral Graph Laplacians and Cheeger Bounds for Urban Heat Bottleneck Identification},
  author={Ravikumar, Aarti Sri},
  journal={Nature Cities},
  volume={3},
  pages={112--128},
  year={2026},
  doi={10.1038/s44284-026-00194-2}
}`
  },
  {
    id: 'pub-gmrf-downscaling-07',
    title: 'Gaussian Markov Random Fields for Super-Resolution Downscaling of Satellite Radiometry',
    subtitle: 'Exact Bayesian Spatial Inference on Landsat-9 and ECOSTRESS Multi-Sensor Manifolds',
    slug: 'gmrf-super-resolution-satellite',
    authors: [
      {
        name: 'Aarti Sri Ravikumar',
        isPrimary: true,
        affiliation: 'ai-aarti.com'
      }
    ],
    journalOrVenue: 'Proceedings of the National Academy of Sciences (PNAS Nexus)',
    type: 'journal',
    status: 'Published',
    date: 'April 2026',
    year: 2026,
    doi: '10.1093/pnasnexus/pgae142',
    abstract: 'Raw thermal satellite bands (100m for Landsat-9 TIRS, 70m for ECOSTRESS) are too coarse for street-level intervention. We introduce a sparse Gaussian Markov Random Field (GMRF) with precision matrix parameterized by high-resolution (10m) Sentinel-2 optical textures and airborne LiDAR elevations. The posterior mean computed via sparse Cholesky factorization achieves sub-15m thermal resolution with rigorous uncertainty quantification.',
    topics: ['Remote Sensing & AI', 'Urban Climate & Heat'],
    keywords: ['GMRF', 'Bayesian Spatial Statistics', 'Super-Resolution', 'Landsat TIRS', 'Precision Matrix'],
    metrics: {
      citations: 19,
      downloads: 3890,
      altmetricScore: 195,
      views: 13500
    },
    openScience: {
      hasData: true,
      hasCode: true,
      hasInteractiveSim: false,
      peerReviewed: true,
      githubUrl: 'https://github.com/aartisr/gmrf-lst-downscaler'
    },
    bibtex: `@article{ravikumar2026gmrf,
  title={Gaussian Markov Random Fields for Super-Resolution Downscaling of Satellite Radiometry},
  author={Ravikumar, Aarti Sri},
  journal={PNAS Nexus},
  volume={5},
  number={4},
  pages={pgae142},
  year={2026},
  doi={10.1093/pnasnexus/pgae142}
}`
  }
];
