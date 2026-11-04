---
num: 87
title: Linear Systems: Decision Guide and Worked Cases
tag: Matrices & Linear Algebra
---
Chapter 15 lists the rules; this chapter shows how to apply them in the order an exam question needs.

## Decision procedure for $Ax=b$ with $A$ of size $m\times n$

1. Compute $r=\mathrm{rank}(A)$ and $r'=\mathrm{rank}([A\mid b])$.
2. If $r<r'$: **no solution**.
3. If $r=r'=n$: **unique solution**.
4. If $r=r'<n$: **infinitely many**, with $n-r$ free variables.

:::definition Homogeneous case
$Ax=0$ is always consistent. It has a non-trivial solution exactly when $r<n$, and the solution space has dimension $n-r$ (the nullity).
:::

## Square systems with a parameter

For square $A$, a unique solution exists iff $\det A\ne0$. Find the parameter values with $\det A=0$, then test each by comparing $r$ and $r'$.

:::example Parameter case
$x+y=2$, $x+ay=b$. $\det\begin{pmatrix}1&1\\1&a\end{pmatrix}=a-1$. For $a\ne1$ the solution is unique. For $a=1$ the rows agree on the left, so the system is consistent only if $b=2$ (infinitely many solutions); for $b\ne2$ there is none.
:::

## Shape shortcuts

- More unknowns than equations ($n>m$): never unique; it is either inconsistent or has infinitely many solutions. A homogeneous one always has a non-trivial solution.
- More equations than unknowns ($m>n$): generally inconsistent unless $b$ lies in the column space.
- $r\le\min(m,n)$ always, and $r+\text{nullity}=n$.

:::example Counting solutions
$A$ is $3\times5$ with rank 3. Then $Ax=b$ is consistent for every $b$ (rank 3 equals $m$) and the solution set has $5-3=2$ free variables.
:::

## Links to other facts

- $\det A=0$ iff $0$ is an eigenvalue iff the columns are dependent iff $\mathrm{rank}<n$.
- The number of independent solutions of $(A-\lambda I)x=0$ is the geometric multiplicity of $\lambda$.
- After LU factorisation, solving $Ax=b$ costs $O(n^2)$ per right-hand side (forward then back substitution); the factorisation itself costs $O(n^3)$.
