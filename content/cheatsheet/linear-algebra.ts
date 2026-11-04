import type { SheetSubject } from './types';

const r = String.raw;

export const linearAlgebra: SheetSubject = {
  id: 'linear-algebra',
  name: 'Linear Algebra',
  marks: '~11M',
  notes: 'Matrices & Linear Algebra',
  points: [
    r`Eigenvalues carry most of the information: trace is the sum, determinant is the product.`,
    r`A square matrix is invertible iff $\det\ne0$ iff full rank iff no zero eigenvalue.`,
    r`Symmetric matrices have real eigenvalues and orthogonal eigenvectors.`,
    r`Projection (idempotent) matrices have eigenvalues only 0 and 1; rank equals trace.`,
    r`To test a subspace: contains $0$, closed under addition and scalar multiplication.`,
  ],
  formulas: [
    {
      title: 'Determinant and rank',
      items: [
        { label: 'Product rule', tex: r`$\det(AB)=\det A\,\det B$` },
        { label: 'Transpose and scalar', tex: r`$\det A^T=\det A,\quad \det(cA)=c^n\det A$` },
        { label: 'Triangular matrix', tex: r`$\det A=\prod a_{ii}$` },
        { label: 'Rank-nullity', tex: r`$\mathrm{rank}(A)+\mathrm{nullity}(A)=n$ (columns)` },
        { label: 'Rank facts', tex: r`$\mathrm{rank}(AB)\le\min(\mathrm{rank}A,\mathrm{rank}B),\ \ \mathrm{rank}(A^TA)=\mathrm{rank}(A)$` },
      ],
    },
    {
      title: 'Linear systems $Ax=b$',
      items: [
        { label: 'Consistent iff', tex: r`$\mathrm{rank}(A)=\mathrm{rank}([A\mid b])$` },
        { label: 'Unique solution iff', tex: r`rank $=n$ (number of unknowns)` },
        { label: 'Infinitely many iff', tex: r`consistent and rank $<n$` },
        { label: 'Homogeneous $Ax=0$', tex: r`non-trivial solution iff $\det A=0$ (square)` },
        { label: 'LU / Gaussian elimination', tex: r`$A=LU$, about $\tfrac{n^3}{3}$ multiplications` },
      ],
    },
    {
      title: 'Eigenvalues',
      items: [
        { label: 'Definition', tex: r`$Av=\lambda v,\ \det(A-\lambda I)=0$` },
        { label: 'Trace and determinant', tex: r`$\sum\lambda_i=\mathrm{tr}A,\quad \prod\lambda_i=\det A$` },
        { label: 'Powers and inverse', tex: r`$A^k\to\lambda^k,\quad A^{-1}\to 1/\lambda$` },
        { label: 'Special matrices', tex: r`orthogonal: $|\lambda|=1$; idempotent: $\lambda\in\{0,1\}$; stochastic: $\lambda=1$ exists` },
        { label: '2D rotation by $\theta$', tex: r`eigenvalues $e^{\pm i\theta}$; $R^n$ rotates by $n\theta$` },
        { label: 'Cayley–Hamilton', tex: r`$p(A)=0$ for characteristic polynomial $p$` },
      ],
    },
    {
      title: 'Orthogonality and projection',
      items: [
        { label: 'Orthogonal matrix', tex: r`$Q^TQ=I,\ \det Q=\pm1,\ \|Qx\|=\|x\|$` },
        { label: 'Projection onto vector $a$', tex: r`$P=\dfrac{aa^T}{a^Ta}$` },
        { label: 'Projection onto column space', tex: r`$P=A(A^TA)^{-1}A^T,\ P^2=P=P^T$` },
        { label: 'Centering matrix', tex: r`$H=I-\tfrac1n\mathbf{1}\mathbf{1}^T$: symmetric, idempotent, rank $n-1$` },
        { label: 'Gram matrix', tex: r`$A^TA$ is invertible iff columns of $A$ are independent` },
      ],
    },
    {
      title: 'Quadratic forms and SVD',
      items: [
        { label: 'Positive definite', tex: r`symmetric $A$ with $x^TAx>0$ iff all $\lambda_i>0$` },
        { label: 'Rayleigh quotient', tex: r`$\lambda_{\min}\le\dfrac{x^TAx}{x^Tx}\le\lambda_{\max}$` },
        { label: 'SVD', tex: r`$A=U\Sigma V^T,\ \sigma_i=\sqrt{\lambda_i(A^TA)}$` },
        { label: 'Rank and norm from SVD', tex: r`rank $=$ number of non-zero $\sigma_i$; $\|A\|_F^2=\sum\sigma_i^2$` },
      ],
    },
  ],
  traps: [
    r`The zero vector must lie in a subspace; a shifted line or plane is not one.`,
    r`$(A+B)^2\ne A^2+2AB+B^2$ unless $AB=BA$.`,
    r`$\det(A+B)\ne\det A+\det B$.`,
    r`Eigenvalues of $A+B$ are not the sums of eigenvalues in general.`,
  ],
};
