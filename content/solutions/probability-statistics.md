## 202411
- A Poisson random variable has mean $=$ variance $=\lambda$, so (i) is true.
- A standard normal variable has mean 0 and variance 1 by definition, so (ii) is true.
- Answer: **A**

## 202412
- With three tosses, $T$ needs at least 2 heads and $S$ needs at least 2 tails. That would need at least 4 tosses, so $T\cap S$ is impossible.
- $P(T\cap S)=0$.
- Answer: **A**

## 202434
- The old sum is $50\times40=2000$. Adding 142 gives $2142$ over $51$ points.
- New average $=\dfrac{2142}{51}=42$.
- Answer: **42**

## 202436
- Let $E_0$ be the expected remaining throws with no even number just seen, and $E_1$ the expected remaining throws right after one even number. An even number has probability $\tfrac12$.
- $E_1=1+\tfrac12\cdot0+\tfrac12E_0$ (the next throw ends it, or we go back to the start).
- $E_0=1+\tfrac12E_1+\tfrac12E_0$.
- Substituting: $\tfrac12E_0=1+\tfrac12\left(1+\tfrac12E_0\right)$, so $\tfrac14E_0=\tfrac32$ and $E_0=6$. (In general the waiting time for two successes in a row is $\tfrac1p+\tfrac1{p^2}=2+4=6$.)
- Answer: **C**

## 202456
- $(X,Y)$ is uniform on the rectangle $[1,3]\times[2,4]$, which has area 4.
- $X\ge Y$ happens only for $x\in[2,3]$ and $2\le y\le x$. That region has area $\int_2^3(x-2)\,dx=\tfrac12$.
- $P(X\ge Y)=\dfrac{1/2}{4}=0.125$.
- Answer: **0.125**

## 202457
- For an exponential with rate $\lambda$: $E[X]=\tfrac1\lambda$ and $\operatorname{Var}(X)=\tfrac1{\lambda^2}$.
- $5E[X]=\operatorname{Var}(X)$ gives $\dfrac5\lambda=\dfrac1{\lambda^2}$, so $\lambda=\dfrac15=0.2$.
- Answer: **0.2**

## 202458
- $P(T)=0.4$, so $P(S)=P(S\mid T)P(T)+P(S\mid\bar T)P(\bar T)=0.3(0.4)+0.6(0.6)=0.12+0.36=0.48$.
- $P(T\mid S)=\dfrac{P(S\mid T)P(T)}{P(S)}=\dfrac{0.12}{0.48}=0.25$.
- Answer: **0.25**

## 202459
- This question was cancelled and the marks were given to every candidate (key "marks to all"): the stated density integrates to 4 over its region, not 1, so it is not a valid density.
- The conditional expectation does not depend on a constant factor, so you can still compute it: the marginal is $f_X(x)=\int_0^x2xy\,dy=x^3$, so $f(y\mid x)=\dfrac{2y}{x^2}$ for $0<y<x$.
- $E[Y\mid X=x]=\int_0^xy\cdot\dfrac{2y}{x^2}\,dy=\dfrac{2x}{3}$, which is $1$ at $x=1.5$.
- Answer: **marks to all**

## 202465
- $X=1$ only for HH, so $E[X]=\tfrac14$. $Y=1$ unless TT, so $E[Y]=\tfrac34$.
- HH implies at least one head, so $XY=X$ and $E[XY]=\tfrac14$.
- $\operatorname{Cov}(X,Y)=E[XY]-E[X]E[Y]=\tfrac14-\tfrac3{16}=\tfrac1{16}=0.0625$.
- Answer: **0.0625** (accepted range 0.062 to 0.063)

## 202511
- By the law of total expectation (tower property), $E\big[E[X\mid Y]\big]=E[X]$.
- Answer: **C**

## 202519
- On $[t,4]$ the CDF is linear, so $X$ is uniform on $[t,4]$ and its median is the midpoint $\dfrac{t+4}{2}$.
- Setting $\dfrac{t+4}{2}=3$ gives $t=2$. (Check: $F(3)=\dfrac{3-2}{4-2}=\tfrac12$.)
- Answer: **A**

## 202520
- $E[X]=a\,E[Z]+b=b$, so $b=1$.
- $\operatorname{Var}(X)=a^2\operatorname{Var}(Z)=a^2=4$, so $|a|=2$.
- $E[(X-E[X])Z]=E[aZ\cdot Z]=a\,E[Z^2]=a$, and this equals $-2$, so $a=-2$.
- Answer: **A** ($a=-2,\ b=1$)

## 202521
- For an exponential with rate $\lambda$, $P(X\ge2)=e^{-2\lambda}$.
- $e^{-2\lambda}=0.25$ gives $2\lambda=\ln4$, so $\lambda=\tfrac12\ln4=\ln2$.
- Answer: **A**

## 202531
- Probability of a white ball in each box: Box 1 $\tfrac13$, Box 2 $\tfrac23$, Box 3 $\tfrac36=\tfrac12$. Priors: $\tfrac12,\tfrac16,\tfrac13$.
- $P(W)=\tfrac12\cdot\tfrac13+\tfrac16\cdot\tfrac23+\tfrac13\cdot\tfrac12=\tfrac16+\tfrac19+\tfrac16=\tfrac49$.
- $P(\text{Box 2}\mid W)=\dfrac{\tfrac16\cdot\tfrac23}{4/9}=\dfrac{1/9}{4/9}=0.25$.
- Answer: **0.25**

## 202536
- $Z=\dfrac{X-\mu}{\sigma}$ is standard normal, so $Y=Z^2$ has a chi-square distribution with 1 degree of freedom.
- A chi-square with $k$ degrees of freedom has variance $2k$, so $\operatorname{Var}(Y)=2$.
- Answer: **B**

## 202539
- $P(X^2\le0.25)=P(-0.5\le X\le0.5)=F(0.5)-F(-0.5)$.
- $F(0.5)=\tfrac14(1.5)^2=0.5625$ and $F(-0.5)=\tfrac14(0.5)^2=0.0625$.
- The difference is $0.5$.
- Answer: **C**

## 202540
- $Y\sim\text{Binomial}(300,\,0.25)$ has mean $75$ and variance $300(0.25)(0.75)=56.25$, so the standard deviation is $7.5$.
- By the central limit theorem, $P(60\le Y\le90)\approx\Phi\!\left(\dfrac{90-75}{7.5}\right)-\Phi\!\left(\dfrac{60-75}{7.5}\right)=\Phi(2)-\Phi(-2)$.
- Answer: **A**

## 202541
- The mean is $\dfrac1{\ln10}$, so the rate is $\lambda=\ln10$.
- $P(Y=\ell)=P(\ell\le X<\ell+1)=e^{-\lambda\ell}\left(1-e^{-\lambda}\right)$, which is $q^{\ell}(1-q)$ with $q=e^{-\lambda}$.
- $q=e^{-\ln10}=0.1$.
- Answer: **A**

## 202545
- The complement of "at least one 1" is "no 1 on any die", which has probability $\left(\tfrac56\right)^{100}$.
- $P(A)=1-\left(\tfrac56\right)^{100}$.
- Answer: **C**

## 202554
- $\bar p=\tfrac1n\sum X_i$ with $E[X_i]=p$ and $\operatorname{Var}(X_i)=p(1-p)$.
- $E[\bar p]=p$, so (A) is true and (B) is true only if $p=\tfrac12$.
- $\operatorname{Var}(\bar p)=\dfrac{p(1-p)}{n}$ (independent tosses), so (C) is true; (D) holds only when $p=\tfrac12$.
- Answer: **A, C**

## 202561
- The probability of drawing a black ball is $\tfrac{10}{15}=\tfrac23$ on every draw (with replacement).
- $S_{100}$ is binomial, so $E[S_{100}]=100\times\tfrac23=66.67$, which rounds to $66.7$.
- Answer: **66.7**

## 202619
- $S$ has 2026 elements and $2^{2026}-1$ non-empty subsets. The product is odd only if every chosen element is odd. There are 1013 odd numbers, so $2^{1013}-1$ non-empty all-odd subsets.
- $P(\text{even})=1-\dfrac{2^{1013}-1}{2^{2026}-1}=\dfrac{2^{2026}-2^{1013}}{2^{2026}-1}=\dfrac{2^{1013}\left(2^{1013}-1\right)}{2^{2026}-1}$.
- Answer: **C**

## 202620
- Assume the solution is chosen uniformly from all non-negative integer solutions. The number of solutions of $n_1+\dots+n_4=20$ is $\binom{20+3}{3}=\binom{23}{3}$ (stars and bars).
- Positive solutions: set $m_i=n_i-1\ge0$, so $m_1+\dots+m_4=16$, which has $\binom{16+3}{3}=\binom{19}{3}$ solutions.
- Probability $=\dfrac{\binom{19}{3}}{\binom{23}{3}}$.
- Answer: **A**

## 202628
- $Y\sim t_1$ is the Cauchy distribution: symmetric like the normal but with much heavier tails.
- **A.** Both distributions are symmetric about 0, so $G(0)=H(0)=\tfrac12$. True.
- **D.** At 0, $g(0)=\dfrac1{\sqrt{2\pi}}\approx0.399$ and $h(0)=\dfrac1\pi\approx0.318$. They differ, so D is false.
- The curves cross at $\pm c$. Between $-c$ and $c$ the normal density is higher, so the normal has more mass in $(0,c)$ and $G(c)>H(c)$; B is false.
- By symmetry $G(-c)=1-G(c)<1-H(c)=H(-c)$. So C is true.
- Answer: **A, C**

## 202634
- The exponential distribution is memoryless: $P(X>10\mid X>5)=P(X>5)$.
- This equals $0.35$.
- Answer: **0.35**

## 202644
- $X$ and $Y$ are independent and $E[Y]=0$, so $E[(2X-1)Y]=E[2X-1]\,E[Y]=0$.
- Therefore $\operatorname{Var}=E[(2X-1)^2Y^2]=E[(2X-1)^2]\,E[Y^2]$.
- $2X-1$ is $+1$ (when $X=1$) or $-1$ (when $X=0$), so $(2X-1)^2=1$ always. Then $\operatorname{Var}=1\times E[Y^2]=\operatorname{Var}(Y)=100$.
- Answer: **A**

## 202645
- $\sum_{k=0}^ne^{-n}\dfrac{n^k}{k!}=P(S_n\le n)$, where $S_n\sim\text{Poisson}(n)$ (mean $n$, variance $n$).
- By the central limit theorem, $S_n$ is approximately $N(n,n)$, so $P(S_n\le n)\to\Phi(0)=\tfrac12$.
- Answer: **A** (0.5)

## 202647
- Classes: 20 stories of X (14 correctly labelled X, 6 labelled Y) and 10 stories of Y (8 correctly labelled Y, 2 labelled X).
- **Accuracy** $=\dfrac{14+8}{30}=\dfrac{11}{15}$. So A is true and D is false.
- **Precision** of X $=\dfrac{14}{14+2}=0.875$; of Y $=\dfrac{8}{8+6}\approx0.571$. B is true.
- **Recall** of X $=\dfrac{14}{20}=0.70$; of Y $=\dfrac{8}{10}=0.80$. C is false.
- Answer: **A, B**

## 202653
- (A) $\sum X_i^2$ is a sum of $n$ squared standard normals, so it is $\chi^2_n$. True.
- (B) $\sqrt n\,\bar X\sim N(0,1)$, so its square is $\chi^2_1$. True.
- (C) For normal samples, the sample mean $\bar X$ and $\sum(X_i-\bar X)^2$ are independent. True.
- (D) $\sum(X_i-\bar X)^2\sim\chi^2_{n-1}$ (one degree of freedom is used by $\bar X$), not $n$. False.
- Answer: **A, B, C**

## 202654
- (A) $F(x)=0$ for small $x$, so it is non-negative, not always positive. False.
- (B) A CDF never decreases. True.
- (C) A discrete variable's CDF is a step function, with a jump at each value it takes. True.
- (D) A CDF is **right**-continuous, not left-continuous. False.
- Answer: **B, C**

## 202657
- By Bayes' theorem, $P(D\mid+)=\dfrac{0.8\times0.3}{0.8\times0.3+0.1\times0.7}=\dfrac{0.24}{0.31}\approx0.774$.
- Rounded to two places: $0.77$.
- Answer: **0.77**

## 202662
- The identity $\sum_i\sum_j(x_i-x_j)^2=2n\sum_i(x_i-\bar x)^2$ holds for any data set.
- With $n=100$: $\dfrac{1}{2000}\cdot200\sum(x_i-\bar x)^2=99$, so $\sum(x_i-\bar x)^2=990$.
- $\dfrac1{99}\sum(x_i-\bar x)^2=\dfrac{990}{99}=10$.
- Answer: **10**

## 202663
- $E[Y\mid X]=X^2$, so $E[XY]=E[X\cdot X^2]=E[X^3]=0$ (symmetric about 0) and $E[X]=0$.
- $\operatorname{Cov}(X,Y)=E[XY]-E[X]E[Y]=0$, so the correlation is 0. ($Y$ clearly depends on $X$; they are uncorrelated but not independent.)
- Answer: **0**

## 202664
- Let $c=A_{23}$, the cell shared by row 2 and column 3. The other 4 cells of the row sum to $R\sim\text{Bin}(4,\tfrac12)$ and the other 4 of the column to $C\sim\text{Bin}(4,\tfrac12)$, independent of each other.
- Row sum $=3$ and column sum $=3$ need $c+R=3$ and $c+C=3$.
- If $c=0$: $P(R=3)=\tfrac4{16}$, so the case has probability $\tfrac12\cdot\tfrac4{16}\cdot\tfrac4{16}=0.03125$.
- If $c=1$: $P(R=2)=\tfrac6{16}$, so the case has probability $\tfrac12\cdot\tfrac6{16}\cdot\tfrac6{16}=0.0703$.
- Total $\approx0.1016$, which rounds to $0.10$.
- Answer: **0.10**
