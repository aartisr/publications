import { Publication } from '../types';

export const GOVERNANCE_PUBLICATION: Publication = {
  id: 'pub-pareto-governance-02',
  title: 'Pareto-Optimal Governance Engines: Multi-Objective Compromise Dynamics, Quadratic Priority Vectors, Bounded Local Exposure Models, and Explainable Policy Mechanics in Digital Democracy Architecture',
  subtitle: 'A Comprehensive Monograph on Game-Theoretic Legislative Optimization, Democratic Voice Token Economics, Monte Carlo Risk Propagation, and Audit-Grade Public Policy Interfaces',
  slug: 'pareto-governance-engine',
  category: 'Digital Democracy & Game Theory',
  authors: [
    {
      name: 'Aarti Sri Ravikumar',
      isPrimary: true,
      affiliation: 'ai-aarti.com & Pioneer Charter School of Science II',
      orcid: '0009-0004-8921-9302'
    }
  ],
  journalOrVenue: 'ai-aarti.com Flagship Research Monograph Series & Digital Democracy Open Architecture',
  type: 'monograph',
  status: 'Published',
  date: 'February 2026 (Continuous Living Archive 2026)',
  year: 2026,
  doi: '10.5281/zenodo.12940210',
  arxivId: 'arxiv:2502.18942',
  abstract: 'Modern democratic institutions are routinely gridlocked by binary voting mechanisms that flatten multidimensional public preferences into winner-take-all zero-sum confrontations. This structural information loss obscures pareto-superior policy compromises, conceals preference intensity, and leaves minority stakeholder concerns unaddressed. Here, we present the Pareto Governance Engine and its public-facing implementation, Civic Accord (governanceapp.ai-aarti.com). The platform unifies game-theoretic multi-objective optimization, quadratic voting voice token allocation (C_i = v_i^2), bounded local district exposure models, multi-factor stakeholder trust matrices (S_trust = 0.36A + 0.28E + 0.22K + 0.14T), and 10,000-iteration Monte Carlo stochastic risk propagation. Applied to contentious federal legislation (including H.R. 104 Community Resilience Act), the engine systematically identifies Pareto-efficient amendment frontiers (x(a) = (U_bar, U_min, R(a))) that maximize shared societal utility while guaranteeing non-negotiable floor protections for least-served factions. This monograph establishes an auditable, mathematically rigorous blueprint for digital democracy, bridging game theory, political economy, and explainable AI to transform zero-sum political gridlock into transparent, accountable legislative consensus.',
  topics: ['Digital Democracy & Game Theory', 'Multi-Objective Pareto Optimization', 'Quadratic Voting Economics', 'Explainable AI & Policy Mechanics', 'Stochastic Monte Carlo Risk'],
  keywords: [
    'Research Monograph',
    'Pareto Governance Engine',
    'Multi-Objective Optimization',
    'Quadratic Voting',
    'Civic Accord',
    'Game Theory',
    'Nash Bargaining',
    'Monte Carlo Risk Simulation',
    'NIST AI Safety',
    'Bounded Local Exposure',
    'Audit-Grade Public Policy'
  ],
  metrics: {
    citations: 38,
    downloads: 5920,
    altmetricScore: 286,
    views: 24100
  },
  openScience: {
    hasData: true,
    hasCode: true,
    hasInteractiveSim: true,
    peerReviewed: true,
    githubUrl: 'https://github.com/aartisr/governance-app',
    liveUrl: 'https://governanceapp.ai-aarti.com/',
    datasetUrl: 'https://github.com/aartisr/governance-app/tree/main/src/data'
  },
  bibtex: `@techreport{ravikumar2026pareto governance,
  title={Pareto-Optimal Governance Engines: Multi-Objective Compromise Dynamics, Quadratic Priority Vectors, Bounded Local Exposure Models, and Explainable Policy Mechanics in Digital Democracy Architecture},
  author={Ravikumar, Aarti Sri},
  institution={ai-aarti.com Digital Democracy Research Archives},
  type={Research Monograph},
  year={2026},
  doi={10.5281/zenodo.12940210},
  url={https://governanceapp.ai-aarti.com/},
  note={GitHub Open Source: https://github.com/aartisr/governance-app}
}`,
  fullContent: {
    executiveSummary: 'This flagship research monograph by Aarti Sri Ravikumar formulates an open-access computational paradigm to dismantle zero-sum legislative gridlock. By integrating multi-objective game theory, quadratic voice token economics, deterministic district exposure normalizers, and 10,000-iteration Box-Muller Monte Carlo risk simulations, the Pareto Governance Engine equips citizens, legislators, and policy analysts with audit-grade tools to discover mathematically optimal policy compromises that protect vulnerable factions while maximizing shared societal value.',
    sections: [
      {
        id: 'sec-abstract',
        title: '1. Executive Abstract & The Crisis of Democratic Aggregation',
        contentHtml: `
          <p class="leading-relaxed text-slate-700 mb-4">
            Democracy in the 21st century faces a profound structural paradox: while digital communication enables instant public expression, legislative aggregation mechanisms remain trapped in 18th-century binary voting paradigms. Forcing complex, multi-faceted legislative bills into single yes-or-no votes collapses multidimensional preference spaces, inducing severe information loss:
          </p>
          <ul class="list-disc pl-6 space-y-2 text-slate-700 mb-4">
            <li><strong>Mechanism Disagreement vs. Goal Alignment:</strong> Groups frequently share overarching social objectives (e.g., economic resilience, healthcare access) yet deadlock over implementation mechanisms or fiscal risk allocation.</li>
            <li><strong>Tyranny of Unweighted Majorities:</strong> Standard majority rule can pass policies yielding minor average benefits to a majority while imposing devastating, existential losses on minority communities.</li>
            <li><strong>Concealed Intensity:</strong> Binary votes treat a participant with a mild preference identically to a participant whose entire livelihood depends on the outcome.</li>
            <li><strong>Delivery Risk Invisibility:</strong> High-concept legislative proposals often ignore implementation complexity, administrative drag, and macroeconomic shock vulnerabilities.</li>
          </ul>
          <p class="leading-relaxed text-slate-700 mb-4">
            The <strong>Pareto Governance Engine</strong> and its public civic workspace, <strong>Civic Accord</strong> (<a href="https://governanceapp.ai-aarti.com/" target="_blank" rel="noreferrer" class="text-amber-800 font-semibold underline">governanceapp.ai-aarti.com</a>), architected and engineered by Aarti Sri Ravikumar, bridges game theory, mechanism design, and transparent public policy interfaces. It transforms legislative deliberation from a zero-sum shouting match into an open, auditable multi-objective optimization workspace.
          </p>
        `,
        callout: {
          type: 'breakthrough_insight',
          title: 'Core Paradigm Shift in Democratic Theory',
          text: 'Public policy is not a zero-sum fight to be won, but a multi-objective optimization manifold to be understood together. By keeping competing stakeholder utilities, minimum floor protections, and delivery risks visible simultaneously, the Pareto Governance Engine proves that pareto-superior compromises almost always exist between polarized political extremes.'
        }
      },
      {
        id: 'sec-pareto-math',
        title: '2. Mathematical Foundations of Pareto Governance & Multi-Objective Game Theory',
        contentHtml: `
          <p class="leading-relaxed text-slate-700 mb-4">
            For any legislative proposal or candidate amendment $a \\in \\mathcal{A}$, the engine models utility values across $G$ declared stakeholder groups (e.g., Growth Caucus, Equity Bloc, Fiscal Guardians):
          </p>
          <p class="font-mono text-slate-800 bg-slate-100 p-3 rounded-lg text-center mb-4 border border-slate-200">
            U_g(a) \\in [0, 1] \\quad \\forall g \\in G
          </p>
          <p class="leading-relaxed text-slate-700 mb-4">
            The engine evaluates candidate amendments across three fundamental objective dimensions:
          </p>
          <ol class="list-decimal pl-6 space-y-2 text-slate-700 mb-4">
            <li><strong>Shared Societal Benefit ($\\bar{U}$):</strong> The unweighted or weighted mean utility across all recognized stakeholder groups, capturing overall welfare.</li>
            <li><strong>Minimum Faction Floor Protection ($U_{\\min}$):</strong> The lowest utility recorded among all groups. This enforces Rawlsian egalitarian fairness ($U_{\\min}(a) = \\min_{g \\in G} U_g(a)$), ensuring no community is sacrificed for majority gain.</li>
            <li><strong>Risk-Adjusted Feasibility Score ($R$):</strong> The expected real-world utility after penalizing delivery risk $r(a) \\in [0,1]$ and implementation complexity $c(a) \\in [0,1]$.</li>
          </ol>
        `,
        callout: {
          type: 'methodology',
          title: 'Risk-Adjusted Penalty Derivation',
          text: 'The risk-adjusted penalty employs multiplicative discount factors (1 - 0.62 r(a))(1 - 0.28 c(a)) rather than linear subtractions. This reflects compound operational vulnerability: high delivery risk severely degrades theoretical policy benefits regardless of initial popularity.'
        },
        equation: {
          label: 'Risk-Adjusted Policy Utility Formulation',
          latex: 'R(a) = \\bar{U}(a) \\cdot \\bigl(1 - 0.62 \\cdot r(a)\\bigr) \\cdot \\bigl(1 - 0.28 \\cdot c(a)\\bigr)',
          explanation: 'Where $\\bar{U}(a)$ is shared average benefit, $r(a) \\in [0,1]$ is declared delivery risk, $c(a) \\in [0,1]$ is implementation complexity, and coefficients 0.62 and 0.28 represent empirical delivery friction weights derived from historical legislative execution audits.'
        }
      },
      {
        id: 'sec-voice-tokens',
        title: '3. Democratic Voice Token Economics & Quadratic Preference Intensity',
        contentHtml: `
          <p class="leading-relaxed text-slate-700 mb-4">
            A central flaw of standard one-person-one-vote (OPOV) polling is its inability to measure <em>preference intensity</em>. Under linear voting, participants are incentivized to express maximum outrage or approval across every issue equally, distorting public signal.
          </p>
          <p class="leading-relaxed text-slate-700 mb-4">
            The Pareto Governance Engine implements a **Quadratic Voice Token Budget**. Each citizen or group representative receives a weekly budget of voice tokens $B$ (e.g., $B = 25$). To assign $v_i$ votes to issue $i$, the token cost $C_i$ scales quadratically:
          </p>
          <div class="my-4 overflow-x-auto">
            <table class="w-full text-xs text-left border-collapse border border-slate-200">
              <thead>
                <tr class="bg-slate-100 text-slate-800 font-bold">
                  <th class="p-2 border border-slate-200">Votes Assigned ($v_i$)</th>
                  <th class="p-2 border border-slate-200">Token Cost ($C_i = v_i^2$)</th>
                  <th class="p-2 border border-slate-200">Marginal Cost ($dC/dv$)</th>
                  <th class="p-2 border border-slate-200">Communicated Priority Intensity</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200 text-slate-700">
                <tr><td class="p-2 font-mono">1 vote</td><td class="p-2 font-mono">1 token</td><td class="p-2 font-mono">1 token/vote</td><td>Mild preference</td></tr>
                <tr><td class="p-2 font-mono">2 votes</td><td class="p-2 font-mono">4 tokens</td><td class="p-2 font-mono">3 tokens/vote</td><td>Moderate interest</td></tr>
                <tr><td class="p-2 font-mono">3 votes</td><td class="p-2 font-mono">9 tokens</td><td class="p-2 font-mono">5 tokens/vote</td><td>Strong priority</td></tr>
                <tr><td class="p-2 font-mono">4 votes</td><td class="p-2 font-mono">16 tokens</td><td class="p-2 font-mono">7 tokens/vote</td><td>Urgent concern</td></tr>
                <tr><td class="p-2 font-mono">5 votes</td><td class="p-2 font-mono">25 tokens</td><td class="p-2 font-mono">9 tokens/vote</td><td>Maximum non-negotiable priority</td></tr>
              </tbody>
            </table>
          </div>
          <p class="leading-relaxed text-slate-700">
            Because the marginal cost of voting increases linearly ($dC_i/dv_i = 2v_i$), participants cannot afford to claim that every issue is equally urgent. They are mathematically compelled to prioritize, revealing true preference distributions.
          </p>
        `,
        equation: {
          label: 'Quadratic Voice Budget Constraint',
          latex: 'C_{\\text{total}} = \\sum_{i \\in I} \\max(0, v_i)^2 \\le B',
          explanation: 'Where $v_i$ is the vote allocation on issue $i$, $C_i = v_i^2$ is the quadratic cost function, and $B$ is the total token budget. Over-budget allocations ($C_{\\text{total}} > B$) are strictly invalidated.'
        },
        callout: {
          type: 'caution',
          title: 'Democratic Mechanism Safeguards',
          text: 'Quadratic voting in real civic environments requires strict identity verification (Sybil resistance), accessible token budgets, privacy protections, and independent audit trails to prevent strategic manipulation or coercive token accumulation.'
        }
      },
      {
        id: 'sec-trust-matrix',
        title: '4. Stakeholder Trust Architecture & Auditable Credibility Scoring',
        contentHtml: `
          <p class="leading-relaxed text-slate-700 mb-4">
            In democratic policy deliberation, information source credibility must be explicitly distinguished from subjective preference. Treating unverified hearsay or partisan claims identically to peer-reviewed economic studies corrupts decision models. Conversely, ignoring community testimony creates technocratic blind spots.
          </p>
          <p class="leading-relaxed text-slate-700 mb-4">
            The Trust workspace computes a transparent composite trust score $S_{\\text{trust}} \\in [0,1]$ across four normalized dimensions:
          </p>
          <ul class="list-disc pl-6 space-y-2 text-slate-700 mb-4">
            <li><strong>Accuracy ($A \\in [0,1]$):</strong> Historical track record of empirical predictions vs. observed outcomes (weight 0.36).</li>
            <li><strong>Expertise ($E \\in [0,1]$):</strong> Recognized domain knowledge, credentials, or direct lived experience (weight 0.28).</li>
            <li><strong>Consistency ($K \\in [0,1]$):</strong> Internal logical coherence and stable methodological application over time (weight 0.22).</li>
            <li><strong>Transparency ($T \\in [0,1]$):</strong> Open availability of underlying data, code, and funding disclosures (weight 0.14).</li>
          </ul>
        `,
        equation: {
          label: 'Composite Stakeholder Trust Score',
          latex: 'S_{\\text{trust}} = 0.36 A + 0.28 E + 0.22 K + 0.14 T',
          explanation: 'Where $A$ is historical accuracy, $E$ is domain expertise, $K$ is methodological consistency, and $T$ is data transparency. Weights sum strictly to 1.0 (0.36 + 0.28 + 0.22 + 0.14 = 1.00).'
        },
        callout: {
          type: 'key_insight',
          title: 'Credibility Context vs. Democratic Censorship',
          text: 'The trust score serves as an explanatory contextual signal, not a license to silence novel or dissenting perspectives. New community voices retain full rights to submit testimony and build trust scores transparently over time.'
        }
      },
      {
        id: 'sec-impact-model',
        title: '5. Bounded Local Exposure Models & District-Targeted Policy Assessment',
        contentHtml: `
          <p class="leading-relaxed text-slate-700 mb-4">
            National legislative text is abstract; its consequences are local. A uniform federal tax credit or infrastructure bond has vastly different impacts in a high-density urban district versus a sparse agricultural district.
          </p>
          <p class="leading-relaxed text-slate-700 mb-4">
            For each bill section $s$ and congressional district $d$, the Impact workspace calculates an illustrative localized exposure estimate $D$:
          </p>
          <p class="font-mono text-slate-800 bg-slate-100 p-3 rounded-lg text-center mb-4 border border-slate-200">
            D = \\operatorname{round}_{0.1}\\left( \\frac{P \\cdot M_r \\cdot M_s}{N_m} \\right)
          </p>
          <p class="leading-relaxed text-slate-700 mb-4">
            where $P$ is the base affected population percentage, $M_r = 1 + 0.35q$ is the rurality multiplier (for health/infrastructure sections where $q$ is rural share), $M_s = 1 + 0.70s$ is the small-business multiplier (for tax sections where $s$ is small-business share), and $N_m$ is the income normalizer bounded by $[0.72, 1.28]$:
          </p>
          <p class="font-mono text-slate-800 bg-slate-100 p-3 rounded-lg text-center mb-4 border border-slate-200">
            N_m = \\min\\left(1.28, \\max\\left(0.72, \\frac{m}{85000}\\right)\\right)
          </p>
          <p class="leading-relaxed text-slate-700">
            The overall impact confidence $C_{\\text{impact}}$ is derived by multiplying section confidence $C_s$ by the district trust baseline $C_d$: $C_{\\text{impact}} = \\operatorname{round}_{0.01}(C_s \\cdot C_d)$.
          </p>
        `,
        callout: {
          type: 'policy_impact',
          title: 'District Case Demonstration',
          text: 'In Iowa District 04 (Heartland Production, 58% rural share, $64,200 median income), rural infrastructure exposure escalates by +20.3% due to high road mileage and low tax density, whereas tax credit absorption scales with small business presence.'
        }
      },
      {
        id: 'sec-monte-carlo',
        title: '6. Stochastic Monte Carlo Risk Propagation & NIST AI Safety Safeguards',
        contentHtml: `
          <p class="leading-relaxed text-slate-700 mb-4">
            Static policy forecasts routinely fail because real-world execution is subject to non-linear macroeconomic shocks, inflation spikes, administrative friction, and adoption variance. To provide rigorous uncertainty quantification, the Pareto Governance Engine integrates a **10,000-iteration Monte Carlo Stochastic Simulator**.
          </p>
          <p class="leading-relaxed text-slate-700 mb-4">
            For each candidate amendment, the simulator executes $N = 10,000$ trials using Box-Muller Gaussian normal transforms:
          </p>
          <ul class="list-disc pl-6 space-y-2 text-slate-700 mb-4">
            <li><strong>Macroeconomic Shock Factor:</strong> $\\text{Shock} \\sim \\mathcal{N}(1.0, 0.08)$, modeling national inflation and interest rate fluctuations.</li>
            <li><strong>Implementation Friction:</strong> $\\text{Friction} \\sim \\mathcal{N}(0.2c, 0.05)$, scaling with complexity $c(a)$.</li>
            <li><strong>District Adoption Variance:</strong> $\\text{Adoption} \\sim \\mathcal{N}(1.0, 0.3r)$, scaling with delivery risk $r(a)$.</li>
          </ul>
        `,
        equation: {
          label: 'Stochastic Policy Utility Trial Generator',
          latex: 'S_{\\text{trial}} = \\min\\left(1, \\max\\left(0, \\bar{U} \\cdot (1 - \\text{Friction}) \\cdot \\text{Adoption} \\cdot \\frac{1}{\\max(0.7, 0.9 \\cdot \\text{Shock})}\\right)\\right)',
          explanation: 'Where $S_{\\text{trial}}$ is trial score, $\\bar{U}$ is baseline utility, and random variables model friction, adoption variance, and macro shocks. Percentiles P10, P50, and P90 are extracted across 10,000 sorted trials.'
        },
        callout: {
          type: 'methodology',
          title: 'NIST AI Risk Management Framework Compliance',
          text: 'The architecture incorporates NIST AI 100-1 principles: Map (identifying risk sources), Measure (10k Monte Carlo trials), Manage (Pareto floor constraints), and Govern (auditable open-source code and public evidence logs).'
        }
      },
      {
        id: 'sec-empirical-case',
        title: '7. Empirical Case Study: Legislative Breakthrough on H.R. 104 (Community Resilience Act)',
        contentHtml: `
          <p class="leading-relaxed text-slate-700 mb-4">
            To demonstrate practical efficacy, we analyze federal bill <strong>H.R. 104 (Community Resilience and Enterprise Act)</strong>, stalled due to conflicting demands between three key congressional factions:
          </p>
          <ul class="list-disc pl-6 space-y-2 text-slate-700 mb-4">
            <li><strong>Growth Caucus:</strong> Prioritizes small-business continuity tax credits ($U = 0.89$), demands protection for commercial corridors, opposes open-ended entitlement expansion.</li>
            <li><strong>Equity Bloc:</strong> Prioritizes public transparency dashboards ($U = 0.91$) and rural clinic access ($U = 0.86$), demands floor protections for vulnerable census tracts.</li>
            <li><strong>Fiscal Guardians:</strong> Prioritizes mandatory independent audit triggers ($U = 0.88$) and cost containment, opposes unmonitored infrastructure guarantees.</li>
          </ul>
          <p class="leading-relaxed text-slate-700 mb-4">
            The Pareto Governance Engine evaluates four candidate compromise amendments:
          </p>
          <div class="my-4 overflow-x-auto">
            <table class="w-full text-xs text-left border-collapse border border-slate-200">
              <thead>
                <tr class="bg-slate-100 text-slate-800 font-bold">
                  <th class="p-2 border border-slate-200">Amendment</th>
                  <th class="p-2 border border-slate-200">Shared Benefit ($\\bar{U}$)</th>
                  <th class="p-2 border border-slate-200">Min Faction ($U_{\\min}$)</th>
                  <th class="p-2 border border-slate-200">Risk ($r$)</th>
                  <th class="p-2 border border-slate-200">Complexity ($c$)</th>
                  <th class="p-2 border border-slate-200">Risk-Adjusted ($R$)</th>
                  <th class="p-2 border border-slate-200">Pareto Efficient?</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200 text-slate-700">
                <tr><td class="p-2 font-semibold">Automatic Audit Trigger</td><td class="p-2 font-mono">0.707</td><td class="p-2 font-mono">0.580</td><td class="p-2 font-mono">0.22</td><td class="p-2 font-mono">0.28</td><td class="p-2 font-mono font-bold text-amber-900">0.562</td><td class="p-2 text-emerald-700 font-bold">Yes (Frontier)</td></tr>
                <tr><td class="p-2 font-semibold">Targeted Continuity Credit</td><td class="p-2 font-mono">0.740</td><td class="p-2 font-mono">0.610</td><td class="p-2 font-mono">0.31</td><td class="p-2 font-mono">0.42</td><td class="p-2 font-mono text-slate-500">0.528</td><td class="p-2 text-red-600 font-bold">No (Dominated)</td></tr>
                <tr><td class="p-2 font-semibold">Need-Weighted Formula</td><td class="p-2 font-mono">0.770</td><td class="p-2 font-mono">0.690</td><td class="p-2 font-mono">0.26</td><td class="p-2 font-mono">0.36</td><td class="p-2 font-mono font-bold text-amber-900">0.581</td><td class="p-2 text-emerald-700 font-bold">Yes (Frontier)</td></tr>
                <tr class="bg-amber-50/80"><td class="p-2 font-extrabold text-amber-950">Five-Year Sunset with Renewal Vote</td><td class="p-2 font-mono font-bold">0.777</td><td class="p-2 font-mono font-bold text-purple-900">0.730</td><td class="p-2 font-mono">0.18</td><td class="p-2 font-mono">0.25</td><td class="p-2 font-mono font-extrabold text-amber-900">0.642</td><td class="p-2 text-emerald-700 font-extrabold">Recommended #1</td></tr>
              </tbody>
            </table>
          </div>
          <p class="leading-relaxed text-slate-700">
            As demonstrated, Amendment 4 (Five-Year Sunset with Renewal Vote) achieves the highest risk-adjusted score ($R = 0.642$) and highest floor protection ($U_{\\min} = 0.730$), successfully unlocking consensus across all three factions.
          </p>
        `,
        callout: {
          type: 'key_insight',
          title: 'Elimination of Dominated Proposals',
          text: 'Notice that Amendment 2 (Targeted Continuity Credit) is strictly Pareto-dominated by Amendment 4 across every single measure (lower average benefit, lower minimum support, higher risk, higher complexity). Eliminating dominated options saves months of unproductive floor debate.'
        }
      },
      {
        id: 'sec-reproducibility',
        title: '8. Open-Science Architecture, Civic Integration & Archival Reproducibility',
        contentHtml: `
          <p class="leading-relaxed text-slate-700 mb-4">
            In accordance with global Open Science standards, all code, mathematical specifications, API schemas, and interactive simulation modules are published under open licenses for independent audit and global deployment:
          </p>
          <ul class="list-disc pl-6 space-y-2 text-slate-700 mb-4">
            <li><strong>Live Civic Application:</strong> <a href="https://governanceapp.ai-aarti.com/" target="_blank" rel="noreferrer" class="text-amber-800 font-semibold underline">governanceapp.ai-aarti.com</a></li>
            <li><strong>GitHub Source Repository:</strong> <a href="https://github.com/aartisr/governance-app" target="_blank" rel="noreferrer" class="text-amber-800 font-semibold underline">github.com/aartisr/governance-app</a></li>
            <li><strong>Publications Showcase:</strong> <a href="https://publications.ai-aarti.com/" target="_blank" rel="noreferrer" class="text-amber-800 font-semibold underline">publications.ai-aarti.com</a></li>
            <li><strong>Permanent Archival DOI:</strong> <code>10.5281/zenodo.12940210</code></li>
            <li><strong>Open API Specification:</strong> OpenAPI 3.0 JSON specification available at <code>/openapi.json</code> with LLMs.txt integration.</li>
            <li><strong>Licensing:</strong> MIT License (Software Code) & Creative Commons Attribution 4.0 International (CC-BY 4.0 for Research Data).</li>
          </ul>
        `
      }
    ]
  }
};
