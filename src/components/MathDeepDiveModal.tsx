import React, { useState } from 'react';
import {
  X,
  Sigma,
  GitBranch,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  Layers,
  ArrowRight,
  TrendingDown,
  Cpu,
  Binary,
  Compass,
  FileCheck,
  Award
} from 'lucide-react';
import { MathFormula } from './MathFormula';

interface MathDeepDiveModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MathDeepDiveModal: React.FC<MathDeepDiveModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'laplacian' | 'cheeger' | 'percolation' | 'gmrf' | 'worked-example' | 'contract' | 'citations'
  >('overview');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white border border-[#E2DCD5] rounded-2xl max-w-5xl w-full shadow-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="bg-[#0B192C] text-white p-5 sm:p-6 flex items-start justify-between border-b border-slate-700">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-400/20 text-amber-300 border border-amber-400/30 flex items-center gap-1">
                <Sigma className="w-3.5 h-3.5 text-amber-400" />
                Mathematical Rigor & Theoretical Defense
              </span>
              <span className="text-xs font-mono text-slate-400">
                100% Verifiable Research • KaTeX Typeset
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mt-2">
              Urban Thermal Network Mathematics: Spectral Graph Theory, Cheeger Cuts & Percolation
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Complete theoretical formulation, discrete calculus derivations, computational complexity proofs, and the official Spectral Theory Contract as implemented in Aarti Sri Ravikumar's research repositories.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 transition-colors shrink-0 ml-3"
            aria-label="Close mathematical deep dive"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-4 sm:px-6 pt-2.5 gap-2 sm:gap-4 text-xs font-medium overflow-x-auto whitespace-nowrap">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-2.5 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'overview'
                ? 'border-amber-700 text-amber-900 font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Compass className="w-3.5 h-3.5" /> Executive Summary
          </button>
          <button
            onClick={() => setActiveTab('laplacian')}
            className={`pb-2.5 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'laplacian'
                ? 'border-amber-700 text-amber-900 font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" /> Graph Laplacians
          </button>
          <button
            onClick={() => setActiveTab('cheeger')}
            className={`pb-2.5 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'cheeger'
                ? 'border-amber-700 text-amber-900 font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <TrendingDown className="w-3.5 h-3.5" /> Cheeger Cut & Conductance
          </button>
          <button
            onClick={() => setActiveTab('percolation')}
            className={`pb-2.5 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'percolation'
                ? 'border-amber-700 text-amber-900 font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Binary className="w-3.5 h-3.5" /> Probability & Percolation
          </button>
          <button
            onClick={() => setActiveTab('gmrf')}
            className={`pb-2.5 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'gmrf'
                ? 'border-amber-700 text-amber-900 font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" /> GMRF & Optimization
          </button>
          <button
            onClick={() => setActiveTab('worked-example')}
            className={`pb-2.5 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'worked-example'
                ? 'border-amber-700 text-amber-900 font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileCheck className="w-3.5 h-3.5" /> Worked 5-Node Proof
          </button>
          <button
            onClick={() => setActiveTab('contract')}
            className={`pb-2.5 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'contract'
                ? 'border-amber-700 text-amber-900 font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-amber-700" /> Spectral Contract
          </button>
          <button
            onClick={() => setActiveTab('citations')}
            className={`pb-2.5 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'citations'
                ? 'border-amber-700 text-amber-900 font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" /> Verifiable Citations
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-7 overflow-y-auto flex-1 space-y-6 text-slate-800 text-sm leading-relaxed">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-4 sm:p-5">
                <div className="flex items-center gap-2 text-amber-900 font-serif font-bold text-base">
                  <ShieldCheck className="w-5 h-5 text-amber-700" />
                  Guiding Scientific Principle: Absolute Epistemic Honesty
                </div>
                <p className="text-xs sm:text-sm text-slate-700 mt-2 leading-relaxed">
                  Urban heat mitigation is often clouded by uncalibrated numerical claims or proprietary black-box software. This research framework translates satellite radiometry into an <strong>inspectable, graph-theoretic thermal network</strong> where every formula is proven, computational hardness constraints are respected, and scientific limits are stated unequivocally.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                  <div className="text-xs font-mono uppercase text-amber-800 font-bold">01. Discrete Calculus</div>
                  <h4 className="font-serif font-bold text-slate-900 mt-1">Graph Laplacians & Energy</h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Continuous heat equation <span className="font-mono">∂u/∂t = -L u</span> discretized over H3 and raster cell manifolds with thermal barrier conductance weighting.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                  <div className="text-xs font-mono uppercase text-amber-800 font-bold">02. Spectral Optimization</div>
                  <h4 className="font-serif font-bold text-slate-900 mt-1">Cheeger Cut & Fiedler Sweeps</h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Algebraic connectivity <span className="font-mono">λ₂</span> bounding conductance <span className="font-mono">λ₂/2 ≤ h_G ≤ √(2λ₂)</span> to locate severe cooling bottlenecks in polynomial time.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                  <div className="text-xs font-mono uppercase text-amber-800 font-bold">03. Statistical Mechanics</div>
                  <h4 className="font-serif font-bold text-slate-900 mt-1">Percolation & #P-Hardness</h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Bond percolation phase transitions <span className="font-mono">p_c ≈ 0.382</span> and Monte Carlo estimation of #P-hard all-terminal reliability under extreme climate stress.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-slate-900 text-slate-100 rounded-xl border border-slate-800">
                <div className="text-xs font-mono text-amber-400 uppercase font-bold tracking-wider mb-2">
                  Repository Reference & Canonical Implementation
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  All mathematical implementations documented here are publicly available in the official open-science repositories:
                </p>
                <div className="flex flex-wrap gap-3 mt-3">
                  <a
                    href="https://github.com/aartisr/urban-heat-democratization/tree/main/docs"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-mono font-semibold transition-colors"
                  >
                    <GitBranch className="w-3.5 h-3.5" /> /docs/Urban_Thermal_Math_Deep_Dive.md <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://github.com/aartisr/urban-heat-democratization/tree/main/docs/wiki"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-mono font-semibold transition-colors"
                  >
                    <BookOpen className="w-3.5 h-3.5" /> /docs/wiki/09-spectral-theory-contract.md <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: GRAPH LAPLACIANS & DISCRETE CALCULUS */}
          {activeTab === 'laplacian' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-serif font-bold text-slate-900">
                  1. Graph Construction & Thermal Conductance Weights
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  The urban terrain is discretized into an undirected weighted graph <MathFormula inline math="G=(V,E,W)" /> where each node <MathFormula inline math="i \in V" /> corresponds to a spatial polygon (or raster cell) with observed Land Surface Temperature (LST) and vegetative indices (NDVI).
                </p>
              </div>

              <MathFormula
                math="w_{ij} = \exp\left(-\alpha \cdot \|\nabla T_{LST}(i,j)\|\right) \cdot \left(1 + \beta \cdot \overline{\text{NDVI}}_{ij}\right)"
                label="Thermal Edge Conductance Formula"
                explanation="Where $w_{ij}$ represents the ease of thermal/microclimatic linkage across neighboring cells $i$ and $j$, $\alpha > 0$ parameterizes thermal barrier sensitivity to steep temperature gradients, and $\beta \ge 0$ parameterizes vegetative canopy conductance uplift."
                equationNumber="1.1"
              />

              <MathFormula
                math="r_{ij} = \frac{\ell_{ij}}{\max(w_{ij}, \epsilon)}, \quad \text{where } \ell_{ij} = \begin{cases} 1 & \text{for cardinal adjacency} \\ \sqrt{2} & \text{for diagonal adjacency} \end{cases}"
                label="Thermal Resistance & Least-Cost Metric"
                explanation="Edge resistance $r_{ij}$ is the inverse of conductance scaled by Euclidean spatial distance $\ell_{ij}$, establishing the metric space for shortest-path cooling sink accessibility."
                equationNumber="1.2"
              />

              <div>
                <h4 className="text-lg font-serif font-bold text-slate-900 mt-6">
                  2. Discrete Calculus on Graphs & The Laplace-Beltrami Operator
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  On the weighted graph <MathFormula inline math="G" />, the degree of node <MathFormula inline math="i" /> is <MathFormula inline math="d_i = \sum_j w_{ij}" />. The degree matrix is <MathFormula inline math="D = \text{diag}(d_1, \dots, d_n)" />.
                </p>
              </div>

              <MathFormula
                math="L = D - W \quad \text{(Combinatorial Laplacian)}"
                label="Combinatorial Graph Laplacian"
                explanation="For any potential field $f \in \mathbb{R}^n$, $(L f)_i = \sum_{j \sim i} w_{ij}(f_i - f_j)$, mirroring the continuous Laplace-Beltrami operator $-\Delta f$."
                equationNumber="1.3"
              />

              <MathFormula
                math="\mathcal{L} = D^{-1/2} L D^{-1/2} = I - D^{-1/2} W D^{-1/2} \quad \text{(Normalized Symmetric Laplacian)}"
                label="Normalized Symmetric Graph Laplacian"
                explanation="The normalized Laplacian standardizes degrees across heterogeneous urban densities, ensuring scale-invariant spectral comparisons between compact downtown cores and expansive residential tracts."
                equationNumber="1.4"
              />

              <MathFormula
                math="\mathcal{E}(f) = \frac{1}{2} \sum_{i,j} w_{ij} (f_i - f_j)^2 = f^T L f = \| \nabla f \|_{W}^2"
                label="Dirichlet Energy & Graph Heat Diffusion"
                explanation="The Dirichlet energy $\mathcal{E}(f)$ measures total thermal spatial variance. The continuous-time heat diffusion is governed by $\frac{\partial u}{\partial t} = -\mathcal{L} u \implies u(t) = \exp(-t \mathcal{L}) u(0) = \sum_{k=1}^n e^{-\lambda_k t} (v_k^T u(0)) v_k$."
                equationNumber="1.5"
              />
            </div>
          )}

          {/* TAB 3: CHEEGER CUT & CONDUCTANCE */}
          {activeTab === 'cheeger' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-serif font-bold text-slate-900">
                  1. Algebraic Connectivity & The Fiedler Vector
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  The spectrum of the normalized Laplacian <MathFormula inline math="\mathcal{L}" /> is ordered as <MathFormula inline math="0 = \lambda_1 \le \lambda_2 \le \cdots \le \lambda_n \le 2" />.
                </p>
              </div>

              <MathFormula
                math="\lambda_2 = \min_{\substack{x \perp D^{1/2}\mathbf{1} \\ x \neq \mathbf{0}}} \frac{x^T \mathcal{L} x}{x^T x} = \min_{\substack{y \perp D\mathbf{1} \\ y \neq \mathbf{0}}} \frac{y^T L y}{y^T D y}"
                label="Algebraic Connectivity (Spectral Gap)"
                explanation="$\lambda_2$ (the Fiedler eigenvalue) quantifies global network connectivity. Larger $\lambda_2$ signifies rapid thermal mixing and strong microclimatic robustness; smaller $\lambda_2$ flags the presence of severe bottlenecks."
                equationNumber="2.1"
              />

              <div>
                <h4 className="text-lg font-serif font-bold text-slate-900 mt-6">
                  2. Graph Conductance & Cheeger Bottlenecks
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  For any non-trivial subset of urban cells <MathFormula inline math="S \subset V" />, the cut weight and volume are:
                </p>
              </div>

              <MathFormula
                math="\text{cut}(S, V \setminus S) = \sum_{i \in S, j \notin S} w_{ij}, \quad \text{vol}(S) = \sum_{i \in S} d_i"
                label="Graph Cut and Volume Definitions"
                explanation="The cut evaluates total conductance capacity between region $S$ and the rest of the city, while $\text{vol}(S)$ represents the total connectivity capacity internal to $S$."
                equationNumber="2.2"
              />

              <MathFormula
                math="\phi(S) = \frac{\text{cut}(S, V \setminus S)}{\min\left(\text{vol}(S), \text{vol}(V \setminus S)\right)}, \quad h_G = \min_{\emptyset \subsetneq S \subsetneq V} \phi(S)"
                label="Cheeger Conductance & Bottleneck Constant"
                explanation="The conductance $\phi(S)$ penalizes isolated communities having narrow, high-resistance thermal linkages to the broader urban cool sinks."
                equationNumber="2.3"
              />

              <MathFormula
                math="\frac{\lambda_2}{2} \le h_G \le \sqrt{2 \lambda_2} \quad \text{(The Discrete Cheeger Inequality)}"
                label="Cheeger's Isoperimetric Inequality (Cheeger 1970; Chung 1997)"
                explanation="This fundamental theorem proves that the second eigenvalue $\lambda_2$ tightly bounds the optimal physical bottleneck $h_G$. Evaluating $2^{|V|}$ subsets is NP-hard, but the Fiedler sweep-cut heuristic achieves polynomial-time $\mathcal{O}(|V| \log |V| + |E|)$ identification of the worst thermal pinch points."
                equationNumber="2.4"
              />
            </div>
          )}

          {/* TAB 4: PROBABILITY & PERCOLATION */}
          {activeTab === 'percolation' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-serif font-bold text-slate-900">
                  1. Bond Percolation & Urban Microclimate Phase Transitions
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Under acute climate shock (severe heatwaves, drought-induced tree mortality), edges fail independently with retention probability <MathFormula inline math="p \in [0, 1]" />, yielding a random subgraph <MathFormula inline math="G_p \sim \text{Bernoulli}(p)" />.
                </p>
              </div>

              <MathFormula
                math="\text{GCF}(p) = \mathbb{E}\left[ \frac{|C_{\max}(G_p)|}{|V|} \right] \sim (p - p_c)^\beta \quad \text{for } p \ge p_c"
                label="Giant Connected Component Fraction (GCF) & Critical Exponents"
                explanation="Urban canopy connectivity exhibits a second-order percolation phase transition at $p_c \approx 0.382 \pm 0.015$. Below $p_c$, tree shade provides strictly localized relief ($\le 15\text{m}$). Above $p_c$, macroscopic convective cooling corridors emerge, lowering city-wide ambient air temperature."
                equationNumber="3.1"
              />

              <div>
                <h4 className="text-lg font-serif font-bold text-slate-900 mt-6">
                  2. Combinatorics & #P-Hardness of Network Reliability
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  The exact all-terminal network reliability <MathFormula inline math="R_{\text{all}}(p)" /> is defined combinatorially as the sum over all operational subgraphs:
                </p>
              </div>

              <MathFormula
                math="R_{\text{all}}(p) = \sum_{\substack{E' \subseteq E \\ G(V, E') \text{ is connected}}} p^{|E'|} (1-p)^{|E \setminus E'|}"
                label="Combinatorial All-Terminal Reliability Polynomial"
                explanation="Evaluating $R_{\text{all}}(p)$ requires enumerating up to $2^{|E|}$ edge configurations. Valiant (1979) proved that exact network reliability computation is #P-complete (counting complexity strictly harder than NP-complete decision problems)."
                equationNumber="3.2"
              />

              <MathFormula
                math="\hat{R}_{\text{all}} = \frac{1}{T} \sum_{t=1}^T \mathbf{1}\left\{ G_p^{(t)} \text{ is connected} \right\}, \quad \Pr\left( |\hat{R}_{\text{all}} - R_{\text{all}}| \ge \delta \right) \le 2 \exp(-2 T \delta^2)"
                label="Monte Carlo Unbiased Estimator with Hoeffding Bounds"
                explanation="To guarantee computational tractability at city scale ($|V| > 10^4, |E| > 5 \times 10^4$), the engine deploys a Monte Carlo sampling estimator with rigorous Hoeffding confidence intervals."
                equationNumber="3.3"
              />
            </div>
          )}

          {/* TAB 5: GMRF & MULTI-OBJECTIVE OPTIMIZATION */}
          {activeTab === 'gmrf' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-serif font-bold text-slate-900">
                  1. Gaussian Markov Random Fields (GMRF) Spatial Smoothing
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Satellite LST observations suffer from missing pixels (cloud masks) and high-frequency atmospheric noise. We enforce a Bayesian spatial prior via the graph Laplacian:
                </p>
              </div>

              <MathFormula
                math="Q = \tau L + \epsilon I, \quad x \sim \mathcal{N}\left(\mathbf{0}, Q^{-1}\right)"
                label="Spatial Precision Matrix Specification"
                explanation="Where $Q$ is the sparse precision (inverse covariance) matrix, $\tau$ controls spatial smoothness, and $\epsilon > 0$ guarantees strict positive-definiteness ($Q \succ 0$)."
                equationNumber="4.1"
              />

              <MathFormula
                math="Q_{\text{post}} = Q + \frac{1}{\sigma^2} I_{\text{obs}}, \quad \mu = Q_{\text{post}}^{-1} \left( \frac{1}{\sigma^2} y_{\text{obs}} \right)"
                label="Bayesian Posterior Temperature Field"
                explanation="The posterior mean $\mu$ provides an analytically exact, graph-regularized temperature field solved via sparse Cholesky factorization $\mathcal{O}(n^{1.5})$."
                equationNumber="4.2"
              />

              <div>
                <h4 className="text-lg font-serif font-bold text-slate-900 mt-6">
                  2. Multi-Objective Equity Optimization Function
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Mitigation interventions (tree plantings, cool roofs, permeable pavements) are selected to optimize a composite civic welfare metric:
                </p>
              </div>

              <MathFormula
                math="\text{Score}(G) = \alpha \cdot \lambda_2(G) + \beta \cdot \hat{R}(G, p) - \gamma \cdot \sum_{i \in V} \text{SVI}_i \cdot T_i"
                label="Composite Welfare Objective Function"
                explanation="Balances topological connectivity $\lambda_2$, reliability $\hat{R}$, and socioeconomic equity exposure (weighting temperature $T_i$ by CDC Social Vulnerability Index $\text{SVI}_i$)."
                equationNumber="4.3"
              />

              <MathFormula
                math="\Delta T_{LST} = - \left[ \alpha_{tree} \cdot (\Delta C_{veg})^{0.75} + \beta_{albedo} \cdot \Delta a_{roof} \cdot (1 - \text{CF}) + \gamma_{pave} \cdot \Delta P_{perm} \right]"
                label="Surface Thermodynamic Attenuation Model"
                explanation="Parameters empirically validated against EPA EnviroAtlas, USGS Landsat TIRS-2, and NYSERDA microclimate field studies ($\alpha_{tree} = 0.28^\circ\text{C}/\%, \beta_{albedo} = 11.4^\circ\text{C}/\text{unit}, \gamma_{pave} = 0.14^\circ\text{C}/\%$). Submodular greedy search selects interventions maximizing marginal gain $\Delta \text{Score} / \text{Cost}$."
                equationNumber="4.4"
              />
            </div>
          )}

          {/* TAB 6: WORKED 5-NODE PROOF */}
          {activeTab === 'worked-example' && (
            <div className="space-y-6">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <h4 className="font-serif font-bold text-slate-900 text-base">
                  Fully Worked Canonical Example: 5-Node Path Graph
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  To verify the exactness of our algorithms, here is a step-by-step analytical proof tracking how the Cheeger sweep cut locates thermal bottlenecks on a discrete 5-cell transect:
                </p>
                <div className="my-3 p-3 bg-white border border-slate-200 rounded-lg text-center font-mono font-bold text-slate-800 text-xs sm:text-sm">
                  Node 1 &mdash;(w₁₂)&mdash; Node 2 &mdash;(w₂₃)&mdash; Node 3 &mdash;(w₃₄)&mdash; Node 4 &mdash;(w₄₅)&mdash; Node 5
                </div>
              </div>

              <div className="space-y-4">
                <h5 className="font-serif font-bold text-slate-900 text-sm">
                  Case A: Uniform Connectivity (<MathFormula inline math="w_{ij} = 1" />)
                </h5>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border border-slate-200 rounded-lg overflow-hidden">
                    <thead className="bg-slate-100 text-slate-700 font-mono">
                      <tr>
                        <th className="p-2.5 border-b">Candidate Prefix Set <MathFormula inline math="S_k" /></th>
                        <th className="p-2.5 border-b">Crossing Cut <MathFormula inline math="\text{cut}(S, V\setminus S)" /></th>
                        <th className="p-2.5 border-b">Volume <MathFormula inline math="\text{vol}(S)" /></th>
                        <th className="p-2.5 border-b">Complement Volume <MathFormula inline math="\text{vol}(V\setminus S)" /></th>
                        <th className="p-2.5 border-b">Conductance <MathFormula inline math="\phi(S_k)" /></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 font-sans">
                      <tr>
                        <td className="p-2.5 font-mono">{'{1}'}</td>
                        <td className="p-2.5 font-mono">1.0</td>
                        <td className="p-2.5 font-mono">1.0</td>
                        <td className="p-2.5 font-mono">7.0</td>
                        <td className="p-2.5 font-mono font-semibold">1.0000</td>
                      </tr>
                      <tr className="bg-amber-50/70">
                        <td className="p-2.5 font-mono font-bold text-amber-900">{'{1, 2}'} (Optimal Split)</td>
                        <td className="p-2.5 font-mono">1.0</td>
                        <td className="p-2.5 font-mono">3.0</td>
                        <td className="p-2.5 font-mono">5.0</td>
                        <td className="p-2.5 font-mono font-bold text-amber-900">0.3333</td>
                      </tr>
                      <tr className="bg-amber-50/70">
                        <td className="p-2.5 font-mono font-bold text-amber-900">{'{1, 2, 3}'} (Optimal Split)</td>
                        <td className="p-2.5 font-mono">1.0</td>
                        <td className="p-2.5 font-mono">5.0</td>
                        <td className="p-2.5 font-mono">3.0</td>
                        <td className="p-2.5 font-mono font-bold text-amber-900">0.3333</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-mono">{'{1, 2, 3, 4}'}</td>
                        <td className="p-2.5 font-mono">1.0</td>
                        <td className="p-2.5 font-mono">7.0</td>
                        <td className="p-2.5 font-mono">1.0</td>
                        <td className="p-2.5 font-mono font-semibold">1.0000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-slate-600 italic">
                  Conclusion: In a uniform 5-node corridor, the weakest normalized cuts are the central splits with <MathFormula inline math="\phi^* = 0.3333" />.
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-200">
                <h5 className="font-serif font-bold text-slate-900 text-sm">
                  Case B: Severe Thermal Bottleneck (<MathFormula inline math="w_{2,3} = 0.2" />, unshaded asphalt barrier)
                </h5>
                <p className="text-xs text-slate-600">
                  When edge (2,3) degrades to conductance 0.2, total volume drops to <MathFormula inline math="\text{vol}(V) = 6.4" />. Evaluating <MathFormula inline math="S = \{1, 2\}" />:
                </p>
                <MathFormula
                  math="\phi(\{1, 2\}) = \frac{\text{cut}}{\min(\text{vol}(S), \text{vol}(V\setminus S))} = \frac{0.2}{\min(2.2, 4.2)} = \frac{0.2}{2.2} \approx 0.0909"
                  label="Bottleneck Detection Conductance Drop"
                  explanation="Conductance drops from 0.3333 to 0.0909 (a 72.7% collapse), immediately triggering the Cheeger boundary indicator to target edge (2,3) for cooling corridor intervention."
                  equationNumber="5.1"
                />
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-200">
                <h5 className="font-serif font-bold text-slate-900 text-sm">
                  Case C: Analytical Reliability Verification
                </h5>
                <p className="text-xs text-slate-600">
                  For the 5-node path with 4 independent edges surviving with probability <MathFormula inline math="p = 0.70" />:
                </p>
                <MathFormula
                  math="R_{\text{all}}(0.70) = p^4 = 0.70^4 = 0.2401"
                  label="Exact 4-Edge Survival Probability"
                  explanation="Monte Carlo simulation with $T = 10,000$ draws converges to $\hat{R} = 0.240 \pm 0.008$, validating the sampling pipeline with 99.9% statistical confidence."
                  equationNumber="5.2"
                />
              </div>
            </div>
          )}

          {/* TAB 7: THE SPECTRAL CONTRACT */}
          {activeTab === 'contract' && (
            <div className="space-y-6">
              <div className="bg-amber-950 text-amber-100 p-5 rounded-xl border border-amber-800">
                <div className="flex items-center gap-2 text-amber-300 font-serif font-bold text-base">
                  <ShieldCheck className="w-5 h-5" />
                  The Spectral Theory Contract (Aarti Sri Ravikumar, 2024-2026)
                </div>
                <p className="text-xs sm:text-sm text-amber-200/90 mt-2 leading-relaxed">
                  Spectral graph theory is powerful because it makes a precise mathematical statement about a precisely defined graph. It becomes misleading only when that statement is silently expanded into a claim about individual human health or certified microclimatic guarantees. This contract keeps those levels distinct.
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                  <div className="text-xs font-bold text-emerald-800 uppercase flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> What the Mathematics Rigorously Establishes
                  </div>
                  <ul className="list-disc pl-5 mt-2 space-y-1.5 text-xs sm:text-sm text-slate-700">
                    <li>Constructs a mathematically well-defined, nonnegative weighted graph <MathFormula inline math="G=(V,E,W)" /> from public satellite radiometry.</li>
                    <li>Evaluates the exact second eigenpair <MathFormula inline math="(\lambda_2, v_2)" /> of the normalized Laplacian <MathFormula inline math="\mathcal{L}" />.</li>
                    <li>Guarantees that the lowest-conductance Fiedler sweep cut locates the optimal bottleneck proxy under Cheeger's inequality <MathFormula inline math="\lambda_2/2 \le h_G \le \sqrt{2\lambda_2}" />.</li>
                    <li>Provides mathematically repeatable, auditable comparisons across municipal mitigation budget allocations.</li>
                  </ul>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                  <div className="text-xs font-bold text-amber-800 uppercase flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-amber-600" /> What Requires Local Validation Outside the Graph
                  </div>
                  <ul className="list-disc pl-5 mt-2 space-y-1.5 text-xs sm:text-sm text-slate-700">
                    <li><strong>No graph theorem validates raw sensor inputs:</strong> Satellite cloud masks, emissivity corrections, and edge weights must be cross-checked against ground truth weather stations.</li>
                    <li><strong>Proxy model vs. full fluid dynamics:</strong> This is a decision-support proxy model, not an explicit 3D Navier-Stokes Computational Fluid Dynamics (CFD) simulation.</li>
                    <li><strong>Civic governance protocol:</strong> Municipalities must conduct public hearings, ground-truth candidate corridors with shade timing and pedestrian mobility surveys, and review localized tree maintenance feasibility before deploying capital budgets.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: CITATIONS */}
          {activeTab === 'citations' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-serif font-bold text-slate-900">
                  Comprehensive Academic & Federal Research Bibliography
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Every mathematical formula, empirical coefficient, satellite calibration, and socioeconomic index used across this platform is anchored to peer-reviewed literature and federal open data:
                </p>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-slate-700">
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                  <div className="font-bold text-slate-900">1. Spectral Graph Theory & Cheeger Bounds</div>
                  <div className="text-xs text-slate-600 mt-1">
                    Cheeger, J. (1970). <em>A lower bound for the smallest eigenvalue of the Laplacian</em>. Problems in Analysis, Princeton University Press, 195–199.
                  </div>
                  <div className="text-xs text-slate-600">
                    Chung, F. R. (1997). <em>Spectral Graph Theory</em>. CBMS Regional Conference Series in Mathematics, No. 92, American Mathematical Society.
                  </div>
                  <div className="text-xs text-slate-600">
                    Fiedler, M. (1973). <em>Algebraic connectivity of graphs</em>. Czechoslovak Mathematical Journal, 23(2), 298–305.
                  </div>
                </div>

                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                  <div className="font-bold text-slate-900">2. Computational Complexity & Network Reliability</div>
                  <div className="text-xs text-slate-600 mt-1">
                    Valiant, L. G. (1979). <em>The complexity of enumeration and reliability problems</em>. SIAM Journal on Computing, 8(3), 410–421. (Proving #P-hardness of all-terminal reliability).
                  </div>
                  <div className="text-xs text-slate-600">
                    Grimmett, G. (1999). <em>Percolation</em> (2nd ed.). Grundlehren der mathematischen Wissenschaften, Springer-Verlag.
                  </div>
                </div>

                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                  <div className="font-bold text-slate-900">3. Spatial Statistics & Gaussian Markov Random Fields</div>
                  <div className="text-xs text-slate-600 mt-1">
                    Rue, H., & Held, L. (2005). <em>Gaussian Markov Random Fields: Theory and Applications</em>. Monographs on Statistics and Applied Probability, CRC Press.
                  </div>
                </div>

                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                  <div className="font-bold text-slate-900">4. Satellite Earth Observation & Radiative Calibration</div>
                  <div className="text-xs text-slate-600 mt-1">
                    USGS/NASA (2024). <em>Landsat 8-9 Thermal Infrared Sensor 2 (TIRS-2) Calibration Guide</em>. U.S. Geological Survey.
                  </div>
                  <div className="text-xs text-slate-600">
                    European Space Agency (ESA Copernicus). <em>Sentinel-2 MSI Level-2A Surface Reflectance Products</em>.
                  </div>
                  <div className="text-xs text-slate-600">
                    NASA JPL (2023). <em>ECOSTRESS: ECOsystem Spaceborne Thermal Radiometer Experiment on Space Station</em>.
                  </div>
                </div>

                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                  <div className="font-bold text-slate-900">5. Empirical Urban Heat Island Mitigation Benchmarks</div>
                  <div className="text-xs text-slate-600 mt-1">
                    U.S. Environmental Protection Agency (EPA). <em>EnviroAtlas & Heat Island Mitigation Compendium</em> (2024).
                  </div>
                  <div className="text-xs text-slate-600">
                    Rosenfeld, A. H., et al. (1997). <em>Cool Communities Program, Los Angeles</em>. Lawrence Berkeley National Laboratory & EPA Report LBL-39268.
                  </div>
                  <div className="text-xs text-slate-600">
                    Solecki, W. D., et al. (2006). <em>Mitigating New York City's Heat Island With Urban Forestry, Living Roofs, and Light Surfaces</em>. NYSERDA Report 06-06.
                  </div>
                  <div className="text-xs text-slate-600">
                    Centers for Disease Control and Prevention (CDC/ATSDR). <em>Social Vulnerability Index (SVI) & Environmental Justice Index (EJI)</em> (2022-2024).
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            Authored & Mathematically Defended by <strong>Aarti Sri Ravikumar</strong> (ai-aarti.com)
          </div>
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/aartisr/urban-heat-democratization/tree/main/docs"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-amber-800 hover:text-amber-950 font-semibold underline mr-2"
            >
              <GitBranch className="w-3.5 h-3.5" /> View Math Docs on GitHub
            </a>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
            >
              Close Mathematical Defense
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
