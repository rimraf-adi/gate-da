---
num: 86
title: Clustering Models and Choosing k
tag: Machine Learning: Unsupervised
---
Chapter 58 introduced unsupervised learning and k-means. This chapter covers the other clustering families and how to judge a clustering.

## Hierarchical clustering

**Agglomerative** clustering starts with $n$ singletons and repeatedly merges the closest pair of clusters; a **dendrogram** records the merge heights. The definition of "closest" is the linkage:

- **Single**: minimum pairwise distance between the clusters; can chain points into long clusters.
- **Complete**: maximum pairwise distance; favours compact clusters.
- **Average**: mean pairwise distance.

Cutting the dendrogram at a height gives a flat clustering. Naive agglomerative clustering takes $O(n^3)$ time and $O(n^2)$ memory for the distance matrix.

:::example Single linkage
Points on a line at 1, 2, 6, 7, 15. Distances: (1,2)=1 and (6,7)=1 merge first. The cluster {1,2} and {6,7} then merge at 6−2=4 (single linkage), and 15 joins last at 15−7=8.
:::

## DBSCAN

Density-based clustering with parameters $\varepsilon$ (radius) and MinPts.

- **Core point**: at least MinPts points (itself included) within $\varepsilon$.
- **Border point**: not core, but within $\varepsilon$ of a core point.
- **Noise**: neither.

Clusters are maximal sets of density-connected core points plus their border points. DBSCAN finds arbitrarily shaped clusters, labels outliers, and needs no $k$; it struggles when clusters have very different densities.

## Gaussian mixtures and EM

A mixture models $p(x)=\sum_k\pi_k\,\mathcal N(x\mid\mu_k,\Sigma_k)$. **EM** alternates:

- **E-step**: responsibilities $\gamma_{ik}=\dfrac{\pi_k\mathcal N(x_i\mid\mu_k,\Sigma_k)}{\sum_j\pi_j\mathcal N(x_i\mid\mu_j,\Sigma_j)}$.
- **M-step**: $\mu_k=\dfrac{\sum_i\gamma_{ik}x_i}{\sum_i\gamma_{ik}}$, $\pi_k=\dfrac1n\sum_i\gamma_{ik}$, and the matching weighted covariance.

The likelihood never decreases, but EM can stop at a local optimum. K-means is the hard-assignment limit with equal spherical covariances.

## Choosing and judging clusterings

- **Within-cluster sum of squares** (inertia) always falls as $k$ rises, so look for an **elbow**.
- **Silhouette** of a point: $s=\dfrac{b-a}{\max(a,b)}$, with $a$ the mean distance to its own cluster and $b$ the mean distance to the nearest other cluster. It lies in $[-1,1]$; near 1 is well clustered, near 0 on a boundary, negative suggests the wrong cluster.
- **Scale matters**: distance-based methods need standardised features.

:::fact K-means versus the rest
K-means assumes roughly spherical, similar-size clusters and is sensitive to initialisation and outliers; each iteration costs $O(nkd)$.
:::
