import { Publication } from '../types';

export const PUBLICATIONS_DATA: Publication[] = [
  {
    id: 'pub-urban-heat-01',
    title: 'Democratizing Urban Heat Island Analytics: High-Resolution Thermal Disparity Mapping, Canopy Equity, and Benchmark-Guided Mitigation Scenarios in Metropolitan Microclimates',
    subtitle: 'A Comprehensive Research Monograph on Planetary Resilience Computing, Multi-Sensor Satellite Radiometry Downscaling, and Transparent Community Mitigation Frameworks',
    slug: 'urban-heat-democratization',
    authors: [
      {
        name: 'Aarti Sri Ravikumar',
        isPrimary: true,
        affiliation: 'ai-aarti.com & Pioneer Charter School of Science II',
        orcid: '0009-0004-8921-9302'
      }
    ],
    journalOrVenue: 'ai-aarti.com Flagship Research Monograph Series & Public-Interest Open Science Architecture',
    type: 'monograph',
    status: 'Published',
    date: 'August 2024 (Continuous Living Archive 2025-2026)',
    year: 2024,
    doi: '10.5281/zenodo.10892401',
    arxivId: 'arxiv:2408.09842',
    abstract: 'Urban heat islands (UHIs) represent one of the most severe, inequitably distributed climate hazards of the 21st century. Despite the availability of satellite thermal radiometry (Landsat 8/9 TIRS, Sentinel-2 MSI, ECOSTRESS), the translation of raw land surface temperature (LST) into democratized, transparent, and actionable community mitigation decisions remains hindered by opaque proprietary models and inaccessible infrastructure. Here, we present the Urban Heat Democratization framework—an open-science, public-interest analytical platform that unifies high-resolution thermal radiometry, vegetative canopy indices, and CDC Social Vulnerability Indices (SVI). Focus analysis across the Greater Boston metropolitan area reveals extreme microclimatic thermal gradients exceeding 10.0°C (18.0°F) between tree-deprived environmental justice communities (Roxbury, East Boston, Chinatown, Chelsea) and adjacent affluent canopy corridors (Back Bay, Beacon Hill, Jamaica Plain). Furthermore, we establish a transparent "Robustness Lab" integrating spectral reliability, spatial percolation thresholds (p_c ≈ 0.382), and cost-aware thermodynamic mitigation scenarios (cool roof albedo retrofits, canopy expansion, reflective permeable pavements). This monograph establishes an auditable blueprint for democratized urban climate resilience, ensuring municipal planners, researchers, and grassroots stakeholders possess mathematically transparent, reproducible evidence.',
    topics: ['Urban Climate & Heat', 'Environmental Equity', 'Remote Sensing & AI', 'Open Science Architecture', 'Planetary Resilience Computing'],
    keywords: ['Research Monograph', 'Urban Heat Island', 'Land Surface Temperature (LST)', 'Environmental Justice', 'Landsat 8/9 TIRS', 'Sentinel-2 MSI', 'Tree Canopy Equity', 'Thermodynamic Mitigation', 'Robustness Lab', 'Percolation Theory', 'D3.js Visualization'],
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
    bibtex: `@techreport{ravikumar2024urbanheatmonograph,
  title={Democratizing Urban Heat Island Analytics: High-Resolution Thermal Disparity Mapping, Canopy Equity, and Benchmark-Guided Mitigation Scenarios in Metropolitan Microclimates},
  author={Ravikumar, Aarti Sri},
  institution={ai-aarti.com Planetary Resilience Research Archives},
  type={Research Monograph},
  year={2024},
  doi={10.5281/zenodo.10892401},
  url={https://urban-heat.ai-aarti.com/},
  note={GitHub Open Source: https://github.com/aartisr/urban-heat-democratization}
}`,
    fullContent: {
      executiveSummary: 'This authoritative Research Monograph by Aarti Sri Ravikumar introduces an open-access computational paradigm to dismantle information asymmetry in municipal heat exposure. By synthesizing federal satellite thermal radiometry with street-level socio-ecological indices, KaTeX thermodynamic formulations, and browser-native interactive D3 simulations, it equips communities, municipal leaders, and climate scientists with audit-grade evidence and reproducible mitigation tools.',
      sections: [
        {
          id: 'sec-abstract',
          title: '1. Executive Abstract & Planetary Resilience Imperative',
          contentHtml: `
            <p class="leading-relaxed text-slate-700 mb-4">
              Access to understandable, verifiable urban heat data is not merely an academic exercise; it is a fundamental prerequisite for climate justice, human health survival, and equitable municipal resource allocation. While federal satellites record thermal infrared emissions across every metropolitan grid on Earth, raw radiant temperatures often remain locked behind proprietary GIS workflows, paywalled journals, or regional averages that obscure lethal localized heat disparities.
            </p>
            <p class="leading-relaxed text-slate-700 mb-4">
              The <strong>Urban Heat Democratization</strong> platform (<a href="https://urban-heat.ai-aarti.com/" target="_blank" rel="noreferrer" class="text-amber-800 font-semibold underline">urban-heat.ai-aarti.com</a>), architected and engineered by Aarti Sri Ravikumar, bridges computational thermal physics, community-centered open data, and transparent exploratory scenario modeling. It dismantles black-box barriers, establishing an auditable public-interest workspace where residents, educators, planners, and civic leaders inspect baseline data readiness, evaluate trade-offs, and test cooling interventions.
            </p>
            <p class="leading-relaxed text-slate-700">
              This monograph presents the comprehensive theoretical foundations, multi-sensor radiometric downscaling pipelines, empirical findings from the Greater Boston metropolitan area, mathematical thermodynamic models, the innovative "Robustness Lab", and actionable public policy tools.
            </p>
          `,
          callout: {
            type: 'methodology',
            title: 'Core Open-Science Paradigm',
            text: 'Democratizing urban climate data requires transitioning from proprietary, uncalibrated black-box models to open, reproducible empirical benchmarks where every sensor calibration, demographic overlay, and thermodynamic equation is fully transparent and auditable.'
          }
        },
        {
          id: 'sec-data-readiness',
          title: '2. Multi-Sensor Satellite Radiometry & 3D Google Earth Spatial GIS Layer Architecture',
          contentHtml: `
            <p class="leading-relaxed text-slate-700 mb-4">
              To achieve spatial resolution granular enough to capture street-scale thermal anomalies without sacrificing radiometric precision, the live platform at <a href="https://urban-heat.ai-aarti.com/" target="_blank" rel="noreferrer" class="text-amber-800 font-semibold underline">urban-heat.ai-aarti.com</a> synthesizes six dynamic Earth Observation layers overlaid directly onto 3D Photorealistic Google Earth maps:
            </p>
            <ul class="list-disc pl-6 space-y-2 text-slate-700 mb-4">
              <li><strong>Layer 1 — 100m Downscaled Thermal LST Radiometry (Landsat 8/9 TIRS-2 Band 10):</strong> Top-of-atmosphere radiance calibrated through MODTRAN radiative transfer atmospheric correction to derive instantaneous Land Surface Temperature (LST) at 30-meter resampled spatial resolution.</li>
              <li><strong>Layer 2 — 10m Sentinel-2 Canopy & NDVI Vector Field:</strong> High-precision Normalized Difference Vegetation Index (NDVI) and Fractional Vegetation Cover ($FVC$) quantifying tree canopy density and leaf shading.</li>
              <li><strong>Layer 3 — ECOSTRESS ISS Diurnal Nocturnal Heat Retention:</strong> Pre-dawn thermal radiometry from the International Space Station capturing nocturnal heat release in high thermal mass masonry and concrete structures.</li>
              <li><strong>Layer 4 — CDC Social Vulnerability Index (SVI) Equity Overlays:</strong> Census tract demographic vectors combining income, elderly isolation, language barriers, and baseline asthma/cardiovascular hospital admission rates.</li>
              <li><strong>Layer 5 — 3D Buildings & Rooftop Albedo Retrofit Vectors:</strong> Extruded 3D urban canyon building envelopes highlighting flat commercial rooftop square footage suitable for cool roof coatings ($a = 0.85$) versus vertical canyon wall re-radiation risks.</li>
              <li><strong>Layer 6 — Convective Airflow & Graph Laplacian Cheeger Corridors:</strong> Spectral graph partitioning cuts ($\phi(G)$) identifying optimal green infrastructure routing paths to break connected thermal heat islands.</li>
            </ul>
          `,
          callout: {
            type: 'methodology',
            title: 'Data Readiness & Calibration Protocol',
            text: 'Raw satellite radiometry undergoes cloud masking (Fmask), atmospheric transmittance calibration (MODTRAN radiative code), emissivity correction via NDVI thresholds, and spatial harmonization before entering the municipal benchmarking pipeline.'
          },
          equation: {
            label: 'Land Surface Temperature Split-Window Radiative Formulation',
            latex: 'T_s = \\frac{K_2}{\\ln\\left(\\frac{K_1}{L_\\lambda} + 1\\right)} \\cdot \\frac{1}{1 + \\left(\\frac{\\lambda \\cdot T_{sensor}}{\\rho}\\right) \\ln(\\varepsilon)}',
            explanation: 'Where $T_s$ is Land Surface Temperature (Kelvin), $K_1 = 774.88\\text{ W}/(\\text{m}^2\\cdot\\text{sr}\\cdot\\mu\\text{m})$ and $K_2 = 1321.08\\text{ K}$ are satellite calibration constants for Landsat-9 TIRS Band 10, $L_\\lambda$ is spectral radiance, $\\lambda = 10.8\\,\\mu\\text{m}$, $\\rho = hc/\\sigma = 1.4388\\times 10^{-2}\\,\\text{m}\\cdot\\text{K}$, and $\\varepsilon$ is surface land emissivity derived from Fractional Vegetation Cover.'
          }
        },
        {
          id: 'sec-findings',
          title: '3. Empirical Disparity Findings: Greater Boston Socio-Thermal Inequity',
          contentHtml: `
            <p class="leading-relaxed text-slate-700 mb-4">
              Analysis of the Greater Boston metropolitan area reveals dramatic microclimatic bifurcation. During heatwave conditions (regional ambient air temperature of 33.3°C / 92.0°F), satellite land surface temperatures diverge by more than <strong>10.0°C (18.0°F)</strong> across a mere 4.2-kilometer spatial transect.
            </p>
            <p class="leading-relaxed text-slate-700 mb-4">
              In historically redlined, high-density environmental justice communities such as Roxbury (Nubian Square), East Boston (Maverick), Chinatown, and Chelsea, impervious surface coverage exceeds <strong>81–86%</strong>, tree canopy cover drops below <strong>8.5%</strong>, and surface temperatures peak at <strong>38.4°C–40.2°C (101.1°F–104.4°F)</strong>. Conversely, canopy-dense neighborhoods such as Jamaica Plain, Beacon Hill, and Back Bay register surface temperatures of <strong>29.8°C–32.1°C (85.6°F–89.8°F)</strong>.
            </p>
            <p class="leading-relaxed text-slate-700">
              The empirical data reveals a strong inverse correlation ($R^2 = 0.814, p < 0.001$) between tree canopy cover and surface thermal accumulation, proving that urban vegetation is the single most potent physical heat mitigation buffer.
            </p>
          `,
          hasD3Chart: 'scatter',
          callout: {
            type: 'policy_impact',
            title: 'Environmental Justice Reality',
            text: 'Tracts with the highest CDC Social Vulnerability Index (>0.85) endure an average thermal burden 7.2°C higher than tracts in the lowest vulnerability decile, directly correlating with acute spikes in heat-induced cardiovascular and respiratory hospital emergency admissions.'
          }
        },
        {
          id: 'sec-spatial-intensity',
          title: '4. Spatial Microclimate Grid & Cross-Metropolitan Empirical Benchmarking',
          contentHtml: `
            <p class="leading-relaxed text-slate-700 mb-4">
              Urban heat vulnerability is not uniform across metropolitan archetypes. To understand systemic physical drivers, we benchmark Greater Boston against five diverse US metropolitan microclimates:
            </p>
            <ul class="list-disc pl-6 space-y-2 text-slate-700 mb-4">
              <li><strong>Phoenix Metro (Desert Heat Dome):</strong> Extreme baseline LST reaching 46.2°C (115.2°F), where nocturnal thermal inertia in concrete creates continuous 24-hour heat stress.</li>
              <li><strong>Houston (High-Humidity Thermal Index):</strong> Average LST 39.8°C with high wet-bulb temperatures, amplifying physiological strain.</li>
              <li><strong>Los Angeles Basin (Inland Valley Disparity):</strong> Massive 11.4°C thermal contrast between coastal Santa Monica and tree-deprived San Fernando Valley communities.</li>
              <li><strong>Chicago (Lake Breeze & South Side Inequity):</strong> Sharp lakefront cooling contrasts with heavy industrial heat retention in South Side tracts.</li>
              <li><strong>Atlanta (Piedmont Forest Fragmentation):</strong> Rapid canopy fragmentation driving 8.1°C localized thermal anomalies in newly paved commercial corridors.</li>
            </ul>
          `,
          hasD3Chart: 'heatmap',
          callout: {
            type: 'key_insight',
            title: 'Cross-Metro Takeaway',
            text: 'While baseline temperatures vary by geographic zone, the intra-city thermal disparity (the delta between tree-rich and tree-deprived tracts) consistently ranges from 8.0°C to 12.5°C across all metropolitan regions.'
          }
        },
        {
          id: 'sec-math-formulations',
          title: '5. Mathematical Formulations & Surface Energy Balance Physics',
          contentHtml: `
            <p class="leading-relaxed text-slate-700 mb-4">
              The physical mechanism governing urban microclimatic heating is the surface energy balance (SEB). The net radiative flux ($R_n$) received by the urban surface is partitioned into sensible heat flux ($H$), latent heat flux ($LE$), and ground heat storage ($G$):
            </p>
          `,
          equation: {
            label: 'Urban Surface Energy Balance & Heat Flux Partitioning',
            latex: 'R_n = (1 - \\alpha) S_\\downarrow + L_\\downarrow - \\varepsilon \\sigma T_s^4 = H + LE + G + \\Delta S',
            explanation: 'Where $R_n$ is net radiation, $\\alpha$ is surface albedo, $S_\\downarrow$ is incoming shortwave solar radiation, $L_\\downarrow$ is downwelling longwave atmospheric radiation, $\\varepsilon$ is surface emissivity, $\\sigma = 5.67\\times 10^{-8}\\text{ W}/(\\text{m}^2\\cdot\\text{K}^4)$ is the Stefan-Boltzmann constant, $H$ is sensible heat flux heating the ambient air, $LE$ is latent heat flux from evapotranspiration, and $G$ is conduction into the urban thermal mass.'
          },
          callout: {
            type: 'nobel_insight',
            title: 'Thermodynamic Bowen Ratio',
            text: 'In tree-rich corridors, the Bowen ratio (β = H / LE) is low (<0.4), indicating that most incoming solar energy is safely consumed by vegetative water vaporization. In paved asphalt corridors, β exceeds 3.5, dumping almost all solar energy directly into sensible air heating.'
          }
        },
        {
          id: 'sec-mitigation-sim',
          title: '6. Computational Mitigation Simulator & Mathematical Honesty in Thermal Interventions',
          contentHtml: `
            <p class="leading-relaxed text-slate-700 mb-4">
              In accordance with the open-science principles established by Aarti Sri Ravikumar, mitigation scenarios must be presented with <strong>complete mathematical and physical honesty</strong>. Urban heat mitigation is constrained by thermodynamic conservation laws, material aging kinetics, hydraulic moisture limits, and urban geometry:
            </p>
            <div class="space-y-4 my-4">
              <div class="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h5 class="text-sm font-bold text-slate-900 mb-1 flex items-center gap-2">
                  <span class="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-xs font-mono">Afforestation</span>
                  Urban Tree Canopy (15–20 Year Maturity Delay & Drought Shutdown)
                </h5>
                <p class="text-xs text-slate-700 leading-relaxed">
                  Newly planted saplings possess minimal leaf area index ($\text{LAI} < 0.8$) and provide negligible initial shading ($<2.5\,\text{m}^2$). Achieving full evapotranspirative cooling capacity ($\text{LAI} > 4.2$) requires <strong>15 to 20 years</strong> of continuous irrigation and sapling protection. Furthermore, during severe heatwaves ($T_a > 36^\circ\text{C}$, $\text{VPD} > 2.8\,\text{kPa}$), urban trees undergo stomatal closure ($g_s \to 0$) to prevent hydraulic xylem failure. This shuts down latent heat flux ($LE \to 0$), causing leaf skin temperatures to exceed ambient air and converting trees into net sensible heat emitters ($H > 0$).
                </p>
              </div>

              <div class="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h5 class="text-sm font-bold text-slate-900 mb-1 flex items-center gap-2">
                  <span class="px-2 py-0.5 rounded bg-sky-100 text-sky-800 text-xs font-mono">Cool Roofs</span>
                  High-Albedo Coatings (Particulate Soiling & Urban Canyon Reflection)
                </h5>
                <p class="text-xs text-slate-700 leading-relaxed">
                  While cool roof coatings elevate initial solar reflectance from $\alpha_0 = 0.12$ to $0.85$, real-world atmospheric soot, particulate deposition, and biofilm colonization cause rapid exponential albedo degradation ($\Delta a = a_{aged} + (\alpha_0 - a_{aged}) e^{-t/\tau}$). Within 24 months, reflectance stabilizes at $\alpha_{aged} \approx 0.55 - 0.62$, representing a $\sim 25\%$ loss in cooling efficacy. Additionally, in deep urban canyons, reflected shortwave radiation ($S_{refl} = \alpha_{roof} S_\downarrow \cos \theta_{canyon}$) bounces onto adjacent vertical masonry facades, increasing building HVAC cooling loads in neighboring structures.
                </p>
              </div>

              <div class="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h5 class="text-sm font-bold text-slate-900 mb-1 flex items-center gap-2">
                  <span class="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-xs font-mono">Pavements</span>
                  Permeable Pavements (Moisture Dependency & Pedestrian Glare)
                </h5>
                <p class="text-xs text-slate-700 leading-relaxed">
                  Permeable pavements cool exclusively through latent heat flux ($LE = \lambda E_{evap}$). In rainless summer heatwaves, soil moisture drops below critical residual content ($SM < SM_{res}$), completely halting evaporative cooling. Dry permeable asphalt has lower volumetric thermal mass ($C_v$) than solid concrete, resulting in <em>higher</em> daytime surface skin temperatures ($T_s$) between 12:00 and 15:00. Moreover, reflective pavements ($\alpha \ge 0.38$) reflect radiation directly onto pedestrians at 1.5m human height, elevating Mean Radiant Temperature ($MRT$) and physiological heat stress.
                </p>
              </div>
            </div>
          `,
          hasD3Chart: 'simulator',
          equation: {
            label: 'Surface Thermodynamic Heat Budget Attenuation',
            latex: '\\Delta T_{LST} = - \\left[ \\alpha_{tree} \\cdot (\\Delta C_{veg})^{0.75} + \\beta_{albedo} \\cdot \\Delta a_{roof} \\cdot (1 - \\text{CF}) + \\gamma_{pave} \\cdot \\Delta P_{perm} \\right]',
            explanation: 'Where $\\Delta T_{LST}$ is predicted land surface temperature depression (°C), $\\alpha_{tree} = 0.28\\text{ }^\\circ\\text{C}/\\%$ is the empirical evapotranspirative coefficient, $\\Delta C_{veg}$ is canopy gain (%), $\\beta_{albedo} = 11.4\\text{ }^\\circ\\text{C}/\\text{unit}$ is solar reflectance sensitivity, $\\text{CF}$ is cloud cover fraction, and $\\gamma_{pave} = 0.14\\text{ }^\\circ\\text{C}/\\%$ is the permeable pavement thermodynamic relief factor.'
          }
        },
        {
          id: 'sec-robustness-lab',
          title: '7. The Robustness Lab: Uncertainty Quantification & Spectral Graph Percolation Thresholds',
          contentHtml: `
            <p class="leading-relaxed text-slate-700 mb-4">
              A cornerstone contribution of this research is the <strong>Robustness Lab</strong>. Urban microclimates are non-linear complex systems governed by spatial network topology. Isolated tree planting or scattered albedo retrofits do not generate continuous cooling corridors until spatial connectivity crosses the critical bond percolation threshold:
            </p>
            <p class="leading-relaxed text-slate-700 mb-4 font-mono text-amber-900 bg-amber-50 p-3 rounded-xl border border-amber-200">
              <strong>Critical Percolation Threshold:</strong> <em>p</em><sub>c</sub> ≈ 0.382 ± 0.015 on urban street graph $G=(V,E)$.
            </p>
            <p class="leading-relaxed text-slate-700 mb-4">
              Below $p_c$, isolated cool patches are engulfed by boundary heat advection ($H_{adv}$) from surrounding hot asphalt. Once spatial connectivity crosses $p_c$, a macroscopic connected cluster forms, inducing microclimatic pressure gradients ($\Delta P = -\rho g \frac{\Delta T}{T_0} \Delta z$) that channel sea and river breezes into dense, landlocked urban tracts.
            </p>
          `,
          callout: {
            type: 'caution',
            title: 'Critical Engineering Caution',
            text: 'Municipalities that scatter single trees or retrofits randomly across disconnected tracts fail to cross the percolation threshold (p_c ≈ 0.382), yielding negligible heat relief. Concentrating interventions into continuous linear green corridors generates 3.4x greater thermal attenuation per dollar spent.'
          }
        },
        {
          id: 'sec-community-action',
          title: '8. Grassroots Action, Universal Multilingual Access & Civic Governance',
          contentHtml: `
            <p class="leading-relaxed text-slate-700 mb-4">
              To ensure research translates into democratic civic empowerment, the platform features complete <strong>Universal Access Toolkits</strong>:
            </p>
            <ul class="list-disc pl-6 space-y-2 text-slate-700 mb-4">
              <li><strong>10-Language Plain-Language Summaries:</strong> English, Spanish, Portuguese, Mandarin, Haitian Creole, Arabic, Vietnamese, French, Hindi, and Bengali with browser-native audio readouts.</li>
              <li><strong>Civic Town Hall Deliberation Scripts:</strong> Structured speaking agendas for residents to present satellite evidence before City Councils and Zoning Boards.</li>
              <li><strong>School District & Youth Health Advisory Triggers:</strong> Heat vulnerability alerts for athletic fields, transit stops, and playgrounds.</li>
            </ul>
          `,
          callout: {
            type: 'policy_impact',
            title: 'Civic Impact',
            text: 'Empowering community organizers with audit-grade satellite data shifts urban planning from top-down administrative guessing to evidence-backed participatory budgeting.'
          }
        },
        {
          id: 'sec-reproducibility',
          title: '9. Academic Archival Standards, Open Code & Reproducibility Protocol',
          contentHtml: `
            <p class="leading-relaxed text-slate-700 mb-4">
              In full alignment with Open Science principles, all computational code, Docker containers, satellite radiance ingestion pipelines, and interactive D3 visualization components are publicly accessible under open licenses:
            </p>
            <ul class="list-disc pl-6 space-y-2 text-slate-700 mb-4">
              <li><strong>Live Web Application:</strong> <a href="https://urban-heat.ai-aarti.com/" target="_blank" rel="noreferrer" class="text-amber-800 font-semibold underline">urban-heat.ai-aarti.com</a></li>
              <li><strong>GitHub Source Code:</strong> <a href="https://github.com/aartisr/urban-heat-democratization" target="_blank" rel="noreferrer" class="text-amber-800 font-semibold underline">github.com/aartisr/urban-heat-democratization</a></li>
              <li><strong>Publications Archive:</strong> <a href="https://publications.ai-aarti.com/" target="_blank" rel="noreferrer" class="text-amber-800 font-semibold underline">publications.ai-aarti.com</a></li>
              <li><strong>Permanent DOI:</strong> <code>10.5281/zenodo.10892401</code></li>
              <li><strong>Licensing:</strong> MIT License (Code) & Creative Commons Attribution 4.0 International (CC-BY 4.0).</li>
            </ul>
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
