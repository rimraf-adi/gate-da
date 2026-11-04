---
num: 82
title: Principal Component Analysis in Depth
tag: Machine Learning: Unsupervised
---
Principal component analysis (PCA) finds the directions along which data vary the most and uses them as a smaller set of coordinates. It ties together three ideas from earlier chapters: the covariance matrix, eigenvectors of symmetric matrices, and the SVD.

## The idea

Given $n$ points in $\mathbb R^d$, we want a unit vector $u$ such that the projections $u^Tx$ have the **largest variance**. Then we repeat in the space orthogonal to the first choice, and so on.

## Algorithm

1. **Centre** the data: subtract the mean $\mu$, so the columns of the centred data matrix $X_c$ have mean 0. (If the features have very different units, also divide by the standard deviation; this is PCA on the correlation matrix.)
2. Form the **covariance matrix** $S=\dfrac{1}{n-1}X_c^TX_c$ (some texts divide by $n$).
3. Find the **eigenvalues** $\lambda_1\ge\lambda_2\ge\dots\ge\lambda_d\ge0$ and orthonormal **eigenvectors** $u_1,\dots,u_d$ of $S$.
4. The $i$-th **principal component** is $u_i$. Keep the first $k$.
5. The **scores** (new coordinates) of a point are $z=U_k^T(x-\mu)$, where $U_k=[u_1\ \cdots\ u_k]$.

## Why the eigenvectors

The variance of the data along a unit vector $u$ is $u^TSu$. Maximising $u^TSu$ subject to $u^Tu=1$ with a Lagrange multiplier gives $Su=\lambda u$, and the variance then equals $u^TSu=\lambda$. So:

:::concept Key facts
- The variance along principal component $u_i$ is exactly $\lambda_i$. The first component carries the largest variance, $\lambda_1$.
- **Total variance** $=\operatorname{tr}(S)=\sum_i\lambda_i$, so the fraction of variance explained by the first $k$ components is $\dfrac{\sum_{i\le k}\lambda_i}{\sum_i\lambda_i}$.
- $S$ is symmetric, so its eigenvectors are **orthogonal**: the angle between any two principal components is $90^\circ$.
- The components are **uncorrelated**: the covariance matrix of the scores is diagonal, $\operatorname{diag}(\lambda_1,\dots,\lambda_k)$.
- If the data are centred, $\dfrac1n\sum_i(u^Tx^{(i)})^2=u^T\Sigma u$, which for $u=u_1$ equals $\lambda_1$.
:::

## Reconstruction and error

Projecting onto the first $k$ components and mapping back gives the approximation
$$\hat x=\mu+U_kU_k^T(x-\mu)$$
The squared error summed over the data equals $(n-1)\sum_{i>k}\lambda_i$, the variance in the discarded directions. Keeping all $d$ components gives zero error. The reduction in dimension from $d$ to $k$ is worth it when the discarded eigenvalues are small.

**Choosing $k$.** Keep enough components to reach a target share of the variance (for example 95%), or look for the "elbow" in the plot of the eigenvalues against their index (a scree plot).

## PCA through the SVD

Write the centred data matrix as $X_c=U\Sigma V^T$. Then
$$S=\frac1{n-1}X_c^TX_c=V\,\frac{\Sigma^2}{n-1}\,V^T$$
so the **columns of $V$ are the principal components** and $\lambda_i=\dfrac{\sigma_i^2}{n-1}$. The SVD is the numerically preferred way to compute PCA, and it never needs the covariance matrix explicitly. At most $\min(n-1,d)$ eigenvalues are non-zero for centred data.

## Worked examples

:::example A $2\times2$ covariance matrix
$S=\begin{pmatrix}5&2\\2&2\end{pmatrix}$. The trace is 7 and the determinant is $10-4=6$, so $\lambda^2-7\lambda+6=0$ and $\lambda_1=6,\ \lambda_2=1$.

For $\lambda_1=6$: $(S-6I)u=0$ gives $-u_1+2u_2=0$, so $u_1\propto(2,1)/\sqrt5$. For $\lambda_2=1$: $u_2\propto(1,-2)/\sqrt5$, orthogonal to the first.

The first component explains $\dfrac67\approx85.7\%$ of the variance. The point $x=(2,1)$ (already centred) has score $u_1^Tx=\dfrac{2\cdot2+1\cdot1}{\sqrt5}=\sqrt5\approx2.236$.
:::

:::example From data to components
Five centred points $(-2,-1),(-1,-1),(0,0),(1,1),(2,1)$. The sums are $\sum x^2=10$, $\sum y^2=4$, $\sum xy=6$, so with $n-1=4$:
$$S=\begin{pmatrix}2.5&1.5\\1.5&1\end{pmatrix},\qquad\lambda_1\approx3.427,\ \ \lambda_2\approx0.073$$
The first component is $u_1\approx(0.851,\,0.526)$ and explains $\dfrac{3.427}{3.5}\approx97.9\%$ of the variance. Using only this component, the scores are $-2.23,-1.38,0,1.38,2.23$, and the total squared reconstruction error is $(n-1)\lambda_2=4\times0.073\approx0.29$.
:::

## Limits

PCA is **linear** (it cannot unfold curved structure), sensitive to **scale** and to **outliers**, and **unsupervised**: the directions of large variance need not be the ones that separate classes (that is what Fisher's discriminant is for). The signs of principal components are arbitrary.

## What the exam asks

- Compute the **eigenvalues** of a small covariance matrix and the **share of variance** explained.
- Say that principal components are **orthogonal** and uncorrelated, or compute the **variance along the first component** from the eigenvalues.
- Give the **projected coordinate** or reconstruction error for a point.
- State what you must do **before** PCA (centre, and scale if units differ) and the link to the **SVD**.
