---
num: 83
title: Joint, Marginal and Conditional Distributions
tag: Probability & Statistics
---
Most real problems involve several random variables at once. A **joint distribution** describes them together; marginal and conditional distributions describe one of them alone or given the other.

## Discrete case

For discrete $X,Y$ the **joint pmf** is $p(x,y)=P(X=x,Y=y)$, with $\sum_{x,y}p(x,y)=1$.
- **Marginals:** $p_X(x)=\sum_yp(x,y)$ and $p_Y(y)=\sum_xp(x,y)$ (row and column sums of the table).
- **Conditional:** $p(y\mid x)=\dfrac{p(x,y)}{p_X(x)}$.
- **Independent** iff $p(x,y)=p_X(x)\,p_Y(y)$ for **every** pair $(x,y)$. One failing cell is enough to show dependence.
- **Expectation:** $E[g(X,Y)]=\sum_{x,y}g(x,y)\,p(x,y)$.

:::example A joint table
| | $Y=0$ | $Y=1$ | $p_X$ |
|---|---|---|---|
| $X=0$ | 0.1 | 0.2 | 0.3 |
| $X=1$ | 0.3 | 0.4 | 0.7 |
| $p_Y$ | 0.4 | 0.6 | 1 |

$P(X{=}0,Y{=}0)=0.1\ne p_X(0)p_Y(0)=0.12$, so $X$ and $Y$ are **dependent**. $E[X]=0.7$, $E[Y]=0.6$, $E[XY]=P(X{=}1,Y{=}1)=0.4$, so $\operatorname{Cov}(X,Y)=0.4-0.42=-0.02$. Given $X=1$: $P(Y{=}1\mid X{=}1)=0.4/0.7\approx0.571$.
:::

## Continuous case

A **joint density** $f(x,y)\ge0$ satisfies $\iint f\,dx\,dy=1$, and probabilities are volumes: $P((X,Y)\in A)=\iint_Af$.
- **Marginals:** integrate the other variable out: $f_X(x)=\int f(x,y)\,dy$.
- **Conditional density:** $f(y\mid x)=\dfrac{f(x,y)}{f_X(x)}$, defined where $f_X(x)>0$.
- **Independent** iff $f(x,y)=f_X(x)f_Y(y)$. This needs the support to be a **rectangle** (a triangular or curved region means dependence).
- **CDF:** $F(x,y)=P(X\le x,Y\le y)$, with $f=\dfrac{\partial^2F}{\partial x\,\partial y}$.

:::example A density on the unit square
$f(x,y)=x+y$ on $[0,1]^2$.
- Marginal: $f_X(x)=\int_0^1(x+y)\,dy=x+\tfrac12$, and by symmetry $f_Y(y)=y+\tfrac12$.
- $E[X]=\int_0^1x\left(x+\tfrac12\right)dx=\tfrac13+\tfrac14=\tfrac7{12}$.
- $E[XY]=\int_0^1\int_0^1xy(x+y)\,dy\,dx=\tfrac16+\tfrac16=\tfrac13$, so $\operatorname{Cov}(X,Y)=\tfrac13-\left(\tfrac7{12}\right)^2=-\tfrac1{144}$. Not independent.
- $P(X+Y\le1)=\int_0^1\int_0^{1-x}(x+y)\,dy\,dx=\tfrac13$.
:::

## Covariance, correlation and sums

- $\operatorname{Cov}(X,Y)=E[XY]-E[X]E[Y]$ and $\rho=\dfrac{\operatorname{Cov}(X,Y)}{\sigma_X\sigma_Y}\in[-1,1]$; $|\rho|=1$ exactly when $Y$ is a linear function of $X$.
- $\operatorname{Var}(aX+bY)=a^2\operatorname{Var}X+b^2\operatorname{Var}Y+2ab\operatorname{Cov}(X,Y)$.
- **Independent $\Rightarrow$ uncorrelated**, but not the reverse (a quadratic dependence can have zero correlation).
- $E[X+Y]=E[X]+E[Y]$ always; $E[XY]=E[X]E[Y]$ only when $X,Y$ are uncorrelated (in particular, independent).

## Sums of independent variables

| Variables (independent) | Sum |
|---|---|
| $N(\mu_1,\sigma_1^2)$ and $N(\mu_2,\sigma_2^2)$ | $N(\mu_1+\mu_2,\ \sigma_1^2+\sigma_2^2)$ |
| Poisson$(\lambda_1)$ and Poisson$(\lambda_2)$ | Poisson$(\lambda_1+\lambda_2)$ |
| Binomial$(n,p)$ and Binomial$(m,p)$ | Binomial$(n+m,\,p)$ |
| $\chi^2_a$ and $\chi^2_b$ | $\chi^2_{a+b}$ |

The **minimum** of independent exponentials with rates $\lambda_1,\lambda_2$ is exponential with rate $\lambda_1+\lambda_2$.

## Functions of a random variable (CDF method)

To find the distribution of $Y=g(X)$, compute $F_Y(y)=P(g(X)\le y)$ in terms of $F_X$, then differentiate.

:::example Two transformations
- $X\sim U(0,1)$ and $Y=X^2$: $F_Y(y)=P(X\le\sqrt y)=\sqrt y$ on $[0,1]$, so $f_Y(y)=\dfrac{1}{2\sqrt y}$.
- $X\sim U(0,1)$ and $Y=-\dfrac{\ln X}{\lambda}$: $P(Y>y)=P(X<e^{-\lambda y})=e^{-\lambda y}$, so $Y$ is exponential with rate $\lambda$. (This is how exponential random numbers are generated.)
:::

For a monotone $g$ the density formula is $f_Y(y)=f_X\big(g^{-1}(y)\big)\left|\dfrac{d\,g^{-1}(y)}{dy}\right|$.

## What the exam asks

- Marginals and conditionals from a **table or a density**, and whether the variables are **independent**.
- $P(X+Y\le c)$ or $P(X>Y)$ for a joint density, by integrating over the right **region**.
- **Covariance and correlation**, and the variance of a **sum or difference**.
- The distribution of a **sum** or **function** of random variables.
