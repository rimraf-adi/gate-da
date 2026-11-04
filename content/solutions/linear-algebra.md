## 202413
- $\operatorname{tr}M=3$ and $\det M=2\cdot1-(-1)(3)=5$, so the characteristic polynomial is $\lambda^2-3\lambda+5$.
- Its discriminant is $9-20=-11<0$, so the eigenvalues are a complex-conjugate pair, $\dfrac{3\pm i\sqrt{11}}{2}$.
- Answer: **B**

## 202435
- $M^2+12M=M(M+12I)$, so $\det(M^2+12M)=\det M\cdot\det(M+12I)$.
- $\det M=1(6-9)-2(18-12)+3(9-4)=-3-12+15=0$.
- Since $\det M=0$, the product is 0.
- Answer: **0**

## 202447
- **A.** All combinations $\alpha(1,1,0)+\beta(1,0,0)$: the span of two vectors, so it is a subspace.
- **B.** Here the coefficients are squares $\alpha^2,\beta^2\ge0$, so the set is not closed under multiplying by $-1$ (it is only a cone). Not a subspace.
- **C.** The solution set of two homogeneous linear equations is a subspace.
- **D.** $5x_1+2x_3+4=0$ is not satisfied by the zero vector. Not a subspace.
- Answer: **A, C**

## 202448
- **A.** For a $3\times3$ matrix, a unique solution of $Mx=p$ means $M$ is invertible, and then $Mx=q$ also has a unique solution, never infinitely many. False.
- **B.** Take a singular $M$ with $p$ outside its column space (no solution) and $q$ inside it (infinitely many solutions). True.
- **C.** A $2\times3$ system has more unknowns than equations, so a consistent system has free variables: never a unique solution. False.
- **D.** A $3\times2$ matrix with independent columns gives a unique solution when $p$ is in the column space and no solution when $q$ is not. True.
- Answer: **B, D**

## 202449
- An orthogonal projection matrix satisfies $M^2=M$, so $M^3=M^2M=M\cdot M=M$. C and D are true.
- The null space of $M$ is $U^\perp$, with dimension $3-\dim U$.
- If $\dim U=1$ the null space has dimension 2, so A is false. If $\dim U=2$ the null space has dimension 1, so B is true.
- Answer: **B, C, D**

## 202461
- $M=uu^T$ has rank 1, so it has one non-zero singular value, equal to $\|u\|^2=1+4+9+16+25=55$. The other four are 0.
- $\sum\sigma_i=55$.
- Answer: **55**

## 202512
- An upper triangular system needs no elimination. Only back substitution remains, which uses about $\dfrac{n(n+1)}{2}$ multiplications and a similar number of additions: $O(n^2)$.
- Answer: **B**

## 202513
- Every row of $A$ sums to 1, so $A\mathbf 1=\mathbf 1$: the vector $\mathbf1$ is an eigenvector with eigenvalue 1.
- $B=A^3-2A^2+A$ gives $B\mathbf1=(1-2+1)\mathbf1=0$. So $B$ has a non-zero null vector and is singular.
- $Bx=0$ then has infinitely many solutions (any multiple of a solution is a solution).
- Answer: **C**

## 202525
- (A) and (B): $\mathbb R^n$ has many orthonormal bases (rotate one to get another). So A is false and B is true.
- (C) Linearly independent vectors need not be orthonormal (for example $(1,0)$ and $(1,1)$). False.
- (D) Orthonormal vectors are linearly independent. True.
- Answer: **B, D**

## 202528
- $A=I+xx^T$ with $x^Tx=1$ has eigenvalue $1+x^Tx=2$ (eigenvector $x$) and eigenvalue 1 on the $(n-1)$-dimensional space orthogonal to $x$.
- All eigenvalues are positive, so $A$ has rank $n$ (A true) and is invertible (B true). It has no zero eigenvalue (C false).
- $A^{-1}$ has eigenvalues $\tfrac12$ and $1$, all positive, so D is false.
- Answer: **A, B**

## 202537
- $\operatorname{rank}(A)=\operatorname{rank}(A^3)\le\operatorname{rank}(A^2)\le\operatorname{rank}(A)$, so $A$ and $A^2$ have the same rank.
- The others can fail: $A=0$ satisfies $A^3=A$ but is not invertible and has trace 0; $A=I$ has determinant 1 and trace $n$.
- Answer: **D**

## 202538
- Put the vectors in a matrix $X=[x_1\ \cdots\ x_n]$. Then $A=X^TX$ is the Gram matrix.
- The columns are independent, so $X$ is invertible, and so is $X^TX$. A is true.
- Its singular values are positive (B false), its determinant is non-zero (C false), and $z^TAz=\|Xz\|^2>0$ for $z\ne0$ (D false).
- Answer: **A**

## 202550
- $A=\sum_{i=1}^5x_ix_i^T$ is the orthogonal projection onto the 5-dimensional span of the $x_i$, so it is symmetric with eigenvalues 1 (five times) and 0 (five times).
- For a symmetric positive semidefinite matrix, singular values equal eigenvalues, so A is true, and they are 0 or 1, so B is true.
- The rank is 5 in $\mathbb R^{10}$, so $\det A=0$ and $A$ is not invertible. C and D are false.
- Answer: **A, B**

## 202552
- $\|Ax\|=\|x\|$ for all $x$ means $x^TA^TAx=x^Tx$ for all $x$, so $A^TA=I$: $A$ is orthogonal (A true).
- Reflections and rotations are orthogonal but are not $I$ or $-I$, so B and C are false.
- Orthogonal matrices have $\det A=\pm1$ (D true).
- Answer: **A, D**

## 202621
- $M=\begin{pmatrix}\cos\theta&\sin\theta\\-\sin\theta&\cos\theta\end{pmatrix}$ is a rotation by $-\theta$, so $M^k$ rotates by $-k\theta$.
- With $\theta=\tfrac{2\pi}{5}$, $M^5$ is a rotation by $-2\pi$, which is $I$.
- $2026=5\times405+1$, so $M^{2026}=M^1=M$.
- Answer: **B**

## 202622
- $S_1$ is a solid ball of radius 4 (convex) and $S_2$ is a plane through the origin (a subspace, hence convex).
- **A.** An intersection of convex sets is convex. True.
- **B.** $S_1\cap S_2$ is a disc. It contains 0 but is not closed under scalar multiplication (scaling a point of norm 3 by 2 leaves the ball). Not a subspace.
- **C.** A union of a ball and a plane is not closed under addition. Not a subspace.
- **D.** Removing the plane splits the ball into two halves. A segment joining points on opposite sides crosses the plane, so it is not convex.
- Answer: **A**

## 202646
- The matrix is block diagonal: the entry 1, and the rotation block with eigenvalues $\cos t\pm i\sin t$.
- The sum of the eigenvalues is the trace: $1+2\cos t=1+\sqrt2$, so $\cos t=\tfrac{\sqrt2}{2}$.
- In $[-\pi,\pi]$ this gives $t=\pm\tfrac\pi4$.
- Answer: **C**

## 202652
- $M=I-\tfrac1n\mathbf1\mathbf1^T$ is the centering matrix. It is symmetric (A true) and idempotent: $M^2=M$ (so B, $M^2=I$, is false).
- $\operatorname{tr}M=n-1$ (eigenvalue 1 repeated $n-1$ times, and 0 once), so C is false.
- A symmetric idempotent matrix is a projection matrix (D true).
- Answer: **A, D**

## 202665
- $A=I-\tfrac1n\mathbf1\mathbf1^T$ is symmetric with eigenvalues 1 (multiplicity $n-1$) and 0.
- The maximum of $x^TAx$ over unit vectors is the largest eigenvalue, which is 1.
- Answer: **1**
