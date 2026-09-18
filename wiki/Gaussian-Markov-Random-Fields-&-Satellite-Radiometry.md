# Gaussian Markov Random Fields (GMRF) & Satellite Radiometry Downscaling

> **Author**: Aarti Sri Ravikumar  
> **Primary URL**: [https://publications.ai-aarti.com/urban-heat-democratization](https://publications.ai-aarti.com/urban-heat-democratization)  
> **Interactive GIS App**: [https://urban-heat.ai-aarti.com](https://urban-heat.ai-aarti.com)

---

## 🛰️ Spatial Bayesian Regularization & Precision Matrices

Coarse satellite thermal radiometry (Landsat-9 TIRS-2 at 100m resolution, NASA ECOSTRESS at 70m resolution) is downscaled to sub-15m street resolution using **Sparse Gaussian Markov Random Fields (GMRF)**.

The joint spatial posterior probability distribution over land surface temperature field $\mathbf{x} \in \mathbb{R}^N$ given observed thermal sensor readings $\mathbf{y} \in \mathbb{R}^M$ is expressed as:

$$p(\mathbf{x} \mid \mathbf{y}) \propto \exp\left( -\frac{1}{2} (\mathbf{x} - \boldsymbol{\mu})^T \mathbf{Q} (\mathbf{x} - \boldsymbol{\mu}) - \frac{1}{2\sigma_\varepsilon^2} \|\mathbf{H}\mathbf{x} - \mathbf{y}\|^2 \right)$$

Where:
* $\mathbf{Q}$ is the sparse spatial precision matrix (inverse covariance matrix $\boldsymbol{\Sigma}^{-1}$)
* $\mathbf{H}$ is the observation degradation matrix mapping 15m grids to 100m satellite pixels
* $\boldsymbol{\mu}$ is the prior mean temperature field derived from 10m Sentinel-2 optical texture and LiDAR canopy elevations

---

## ⚡ Sparse Cholesky Factorization & Computation

Because $\mathbf{Q}$ is sparse (nonzero elements correspond only to adjacent spatial neighbors), the MAP posterior estimate $\mathbf{x}^*$ is solved in near real-time via sparse Cholesky factorization:

$$\mathbf{Q}^* \mathbf{x}^* = \mathbf{b} \quad \implies \quad \mathbf{L} \mathbf{L}^T \mathbf{x}^* = \mathbf{b}$$

This downscales thermal imagery while preserving physical sharp edges at building shadow boundaries.

---

## 🔗 High-Authority Anchor Backlinks

* [Read Radiometry Monograph on Primary Archive](https://publications.ai-aarti.com/urban-heat-democratization#section-3)
* [Interactive 3D GIS Thermal Downscaling Explorer](https://urban-heat.ai-aarti.com)
* [Pareto Governance Engine Web App](https://governanceapp.ai-aarti.com)
* [Main Portfolio Portal](https://ai-aarti.com)
* [GitHub Repository Source Code](https://github.com/aartisr/publications)

---
*Open Access under CC-BY-4.0 License • Aarti Sri Ravikumar*
