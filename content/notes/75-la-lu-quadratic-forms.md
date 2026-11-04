---
num: 75
title: Gaussian Elimination, LU Decomposition and Quadratic Forms
tag: Matrices & Linear Algebra
---
Gaussian elimination is the workhorse for solving $Ax=b$, LU decomposition is the same computation stored for reuse, and quadratic forms $x^TAx$ describe curvature, which links linear algebra to optimisation.

## Gaussian elimination and its cost

Gaussian elimination reduces $[A\mid b]$ to upper-triangular form using **row operations** (subtract a multiple of one row from another, swap rows), then solves by **back substitution**.

For an $n\times n$ system, the operation counts are:

| Phase | Multiplications and divisions |
|---|---|
| Forward elimination on $A$ | $\dfrac{n(n^2-1)}{3}$ |
| Forward elimination on $b$ | $\dfrac{n(n-1)}{2}$ |
| Back substitution | $\dfrac{n(n+1)}{2}$ |
| **Total** | $\dfrac{n^3}{3}+n^2-\dfrac n3$ |

The leading behaviour is $\dfrac{n^3}{3}$ multiplications (about $\dfrac{2n^3}{3}$ floating-point operations including additions), so the cost is $O(n^3)$, while back substitution alone is only $O(n^2)$.

:::example Counting for $n=3$
Elimination on $A$: $\dfrac{3\cdot8}{3}=8$; on $b$: $3$; back substitution: $6$. Total $17$ multiplications and divisions, matching $\dfrac{27}{3}+9-1=17$.
:::

**Pivoting.** A zero pivot forces a row swap; a tiny pivot causes round-off error, so in practice the largest available entry is chosen as the pivot (partial pivoting).

## LU decomposition

:::definition LU factorisation
$A=LU$ where $L$ is **unit lower triangular** (ones on the diagonal, the multipliers used in elimination below it) and $U$ is **upper triangular** (the result of elimination).
:::

- It exists without row swaps exactly when every leading principal minor of $A$ is non-zero, and then it is **unique** with unit-diagonal $L$.
- With row swaps: $PA=LU$ for a permutation matrix $P$.
- **Solve $Ax=b$ in two cheap steps:** forward substitution $Ly=b$, then back substitution $Ux=y$, each $O(n^2)$. Factor once and reuse for many right-hand sides.
- $\det A=\prod u_{ii}$ (and $\det A=(-1)^{s}\prod u_{ii}$ if $s$ swaps were used).

:::example A full LU example
$$A=\begin{pmatrix}2&1&1\\4&3&3\\8&7&9\end{pmatrix}$$
Eliminate column 1 with multipliers $l_{21}=2,\ l_{31}=4$: rows become $(0,1,1)$ and $(0,3,5)$. Eliminate column 2 with $l_{32}=3$: the last row becomes $(0,0,2)$.
$$L=\begin{pmatrix}1&0&0\\2&1&0\\4&3&1\end{pmatrix},\qquad U=\begin{pmatrix}2&1&1\\0&1&1\\0&0&2\end{pmatrix}$$
Check: $\det A=2\cdot1\cdot2=4$.

To solve $Ax=b$ with $b=(4,10,24)^T$: forward substitution gives $y=(4,\,10-2\cdot4,\,24-4\cdot4-3\cdot2)=(4,2,2)$; back substitution gives $x_3=1,\ x_2=2-1=1,\ x_1=\dfrac{4-1-1}{2}=1$. So $x=(1,1,1)^T$.
:::

## Quadratic forms

A **quadratic form** in $x\in\mathbb R^n$ is $Q(x)=x^TAx$ with $A$ **symmetric**. For two variables,
$$Q(x_1,x_2)=a_{11}x_1^2+2a_{12}x_1x_2+a_{22}x_2^2$$

| Type | Condition | Eigenvalues of $A$ |
|---|---|---|
| Positive definite | $Q(x)>0$ for all $x\ne0$ | all $>0$ |
| Positive semidefinite | $Q(x)\ge0$ | all $\ge0$ |
| Negative definite | $Q(x)<0$ for all $x\ne0$ | all $<0$ |
| Indefinite | takes both signs | mixed signs |

**Sylvester's criterion.** A symmetric $A$ is positive definite iff all its **leading principal minors** are positive. It is negative definite iff those minors alternate in sign starting with negative. (Semidefinite tests need all principal minors, not just leading ones.)

**Diagonalisation.** Writing $A=Q\Lambda Q^T$ and $y=Q^Tx$ gives $Q(x)=\sum_i\lambda_iy_i^2$, so the signs of the eigenvalues decide everything.

**Rayleigh quotient.** For $x\ne0$,
$$\lambda_{\min}\le\frac{x^TAx}{x^Tx}\le\lambda_{\max}$$
so over unit vectors the maximum of $x^TAx$ is $\lambda_{\max}$ and the minimum $\lambda_{\min}$.

**Link to optimisation.** A critical point is a local minimum when the Hessian is positive definite, and a saddle point when it is indefinite.

:::example Classifying forms
- $Q=2x^2+2xy+3y^2$: $A=\begin{pmatrix}2&1\\1&3\end{pmatrix}$. Leading minors $2>0$ and $\det A=5>0$, so it is **positive definite**. Eigenvalues $\dfrac{5\pm\sqrt5}{2}\approx3.62,\ 1.38$.
- $Q=x^2+4xy+y^2$: $A=\begin{pmatrix}1&2\\2&1\end{pmatrix}$ has eigenvalues $3$ and $-1$, so it is **indefinite**.
- The centering matrix $H=I-\tfrac1n\mathbf 1\mathbf 1^T$ gives $x^THx=\sum(x_i-\bar x)^2\ge0$: **positive semidefinite**, with eigenvalues $1$ (multiplicity $n-1$) and $0$. The maximum of $x^THx$ over unit vectors is $1$.
:::

## What the exam asks

- Count the **operations** in Gaussian elimination, or state its order $O(n^3)$.
- Compute an **LU factorisation**, the determinant from $U$, or solve using $Ly=b,\ Ux=y$.
- **Classify** a quadratic form (via eigenvalues or minors) and find its maximum or minimum on the unit sphere.
