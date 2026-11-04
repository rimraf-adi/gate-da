---
num: 76
title: Projection, Orthogonal and Special Matrices
tag: Matrices & Linear Algebra
---
Several matrix families appear again and again: projections, orthogonal matrices, Gram matrices, the centering matrix and stochastic matrices. Each has a short list of properties that settles most questions.

## Projection matrices

:::definition Projection matrices
- Onto the line spanned by $a$: $\ P=\dfrac{aa^T}{a^Ta}$.
- Onto the column space of $A$ (independent columns): $\ P=A(A^TA)^{-1}A^T$.
- If the columns of $Q$ are **orthonormal**: $\ P=QQ^T$.
:::

**Properties of an orthogonal projection $P$:**
- **Idempotent:** $P^2=P$ (projecting twice changes nothing) and **symmetric:** $P^T=P$.
- Eigenvalues are only **0 and 1**. Rank equals trace: $\operatorname{rank}P=\operatorname{tr}P$.
- $Px=x$ exactly when $x$ lies in the subspace; $I-P$ projects onto the **orthogonal complement**.
- The residual $b-Pb$ is orthogonal to the subspace. This is least squares: $\hat x$ solves $A^TA\hat x=A^Tb$ and $A\hat x=Pb$.

:::example Projecting onto a line
Project $b=(3,1)$ onto $a=(1,2)$: $\dfrac{a^Tb}{a^Ta}a=\dfrac55(1,2)=(1,2)$. The residual $(3,1)-(1,2)=(2,-1)$ is orthogonal to $a$, since $2\cdot1+(-1)\cdot2=0$.

With $Q=[e_1\ e_2]$ in $\mathbb R^3$, $QQ^T=\operatorname{diag}(1,1,0)$: the projection onto the $xy$-plane. Its trace is 2, equal to its rank.
:::

## Orthogonal matrices and isometries

:::definition Orthogonal matrix
$Q$ is orthogonal if $Q^TQ=I$, equivalently $Q^{-1}=Q^T$. Its columns (and rows) are orthonormal.
:::

- It **preserves lengths and angles**: $\|Qx\|=\|x\|$ and $(Qx)\cdot(Qy)=x\cdot y$. Such a map is an **isometry**.
- $\det Q=\pm1$: $+1$ for rotations, $-1$ for reflections.
- Every eigenvalue has $|\lambda|=1$. The product and inverse of orthogonal matrices are orthogonal.
- **2D rotation** by $\theta$: $R(\theta)=\begin{pmatrix}\cos\theta&-\sin\theta\\\sin\theta&\cos\theta\end{pmatrix}$, with $R(\theta)^n=R(n\theta)$ and eigenvalues $e^{\pm i\theta}$. For example $R(90^\circ)^4=I$ and $R(60^\circ)^6=I$.
- **3D rotation** about an axis by $\theta$: eigenvalues $1,\ e^{i\theta},\ e^{-i\theta}$, so the trace is $1+2\cos\theta$.

## Gram matrices

For any matrix $A$, the **Gram matrix** $G=A^TA$ is symmetric and positive semidefinite, because $x^TA^TAx=\|Ax\|^2\ge0$.

- $\operatorname{rank}(A^TA)=\operatorname{rank}(A)$ and $\operatorname{null}(A^TA)=\operatorname{null}(A)$.
- **$A^TA$ is invertible if and only if the columns of $A$ are linearly independent.** This is exactly the condition for the normal equations to have a unique solution.

## The centering matrix

$$H=I-\frac1n\mathbf 1\mathbf 1^T$$

- $Hx=x-\bar x\mathbf 1$: it subtracts the mean from every entry.
- It is **symmetric and idempotent**, so a projection, onto the space of vectors with zero sum. Eigenvalues: $1$ (multiplicity $n-1$) and $0$; rank $n-1$; $H\mathbf 1=0$.
- For a data matrix $X$ (rows are samples), the sample covariance is $S=\dfrac{1}{n-1}X^THX$. Centering is the first step of PCA.

:::example Centering
For $x=(1,2,6)$, $\bar x=3$ and $Hx=(-2,-1,3)$, which sums to 0.
:::

## Idempotent, symmetric and stochastic matrices

- **Idempotent:** $A^2=A$. Eigenvalues are 0 or 1, rank $=$ trace, and $I-A$ is also idempotent. (A projection is an idempotent that is also symmetric.)
- **Symmetric:** real eigenvalues, orthogonal eigenvectors, diagonalisable as $Q\Lambda Q^T$. **Skew-symmetric:** $A^T=-A$, zero diagonal, eigenvalues purely imaginary or zero.
- **Row-stochastic:** non-negative entries, each row sums to 1. Then $\mathbf 1$ is an eigenvector with eigenvalue **1**, and every eigenvalue has $|\lambda|\le1$. A stationary distribution $\pi$ satisfies $\pi P=\pi$.

:::example A stochastic matrix
$P=\begin{pmatrix}0.9&0.1\\0.5&0.5\end{pmatrix}$ has trace $1.4$ and eigenvalue $1$, so the other eigenvalue is $0.4$. For the stationary distribution, $0.1\pi_1=0.5\pi_2$ with $\pi_1+\pi_2=1$ gives $\pi=\left(\tfrac56,\tfrac16\right)$.
:::

## Partitioned (block) matrices

Matrices cut into blocks multiply like ordinary matrices, provided block sizes are compatible: $\begin{pmatrix}A&B\\C&D\end{pmatrix}\begin{pmatrix}E\\F\end{pmatrix}=\begin{pmatrix}AE+BF\\CE+DF\end{pmatrix}$.

- **Block triangular:** $\det\begin{pmatrix}A&B\\0&D\end{pmatrix}=\det A\cdot\det D$, and the eigenvalues are those of $A$ together with those of $D$.
- **Block diagonal:** $\begin{pmatrix}A&0\\0&D\end{pmatrix}^{-1}=\begin{pmatrix}A^{-1}&0\\0&D^{-1}\end{pmatrix}$, and the rank is $\operatorname{rank}A+\operatorname{rank}D$.

## What the exam asks

- Build a **projection matrix** or find the projection of a vector, and use trace, rank and eigenvalue facts.
- Decide which statements about **orthogonal or isometry** matrices hold (lengths, determinant, eigenvalues, powers of a rotation).
- Decide whether **$A^TA$ is invertible**, or find its rank.
- Properties of the **centering matrix** or a stochastic matrix.
- Compute with **block matrices**: determinant, inverse, eigenvalues.
