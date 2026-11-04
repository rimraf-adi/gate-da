---
num: 68
title: Conditional Expectation and Variance
tag: Probability & Statistics
---
Knowing the value of one random variable changes our expectation of another. **Conditional expectation** captures this, and two identities, the law of total expectation and the law of total variance, turn hard problems into easy ones by conditioning on something convenient.

## Conditional expectation

:::definition Conditional expectation
For a discrete pair, and for a continuous pair with conditional density $f_{X\mid Y}(x\mid y)=\dfrac{f_{X,Y}(x,y)}{f_Y(y)}$:
$$E[X\mid Y=y]=\sum_x x\,P(X=x\mid Y=y)\qquad E[X\mid Y=y]=\int x\,f_{X\mid Y}(x\mid y)\,dx$$
:::

Two points to hold on to:
- $E[X\mid Y=y]$ is a **number** for each fixed $y$. As $y$ varies it defines a function $g(y)$, and $E[X\mid Y]=g(Y)$ is a **random variable**.
- If $X$ and $Y$ are **independent**, $E[X\mid Y]=E[X]$. If $X$ is a function of $Y$, then $E[X\mid Y]=X$.

Useful rules: $E[aX+b\mid Y]=aE[X\mid Y]+b$; $E[g(Y)X\mid Y]=g(Y)\,E[X\mid Y]$.

:::example A continuous case
Let $f(x,y)=6x$ on $0<x<y<1$. The marginal of $Y$ is $f_Y(y)=\int_0^y 6x\,dx=3y^2$, so
$$f_{X\mid Y}(x\mid y)=\frac{6x}{3y^2}=\frac{2x}{y^2},\quad 0<x<y$$
$$E[X\mid Y=y]=\int_0^y x\cdot\frac{2x}{y^2}\,dx=\frac{2y}{3}$$
So $E[X\mid Y]=\tfrac23Y$.
:::

## Law of total expectation (tower property)

:::concept Law of total expectation
$$E[X]=E\big[E[X\mid Y]\big]=\sum_y E[X\mid Y=y]\,P(Y=y)$$
Average the conditional averages, weighted by how likely each condition is.
:::

:::example Expected number of trials to the first success
Let $X$ be the number of trials until the first success, with success probability $p$. Condition on the first trial: with probability $p$ it succeeds and $X=1$; otherwise we have used one trial and start afresh.
$$E[X]=p\cdot1+(1-p)\big(1+E[X]\big)\ \Rightarrow\ pE[X]=1\ \Rightarrow\ E[X]=\frac1p$$
:::

## Random sums

If $S=X_1+\dots+X_N$ where the $X_i$ are identically distributed with mean $\mu$ and $N$ is a random count independent of them, then conditioning on $N$ gives
$$E[S]=E\big[E[S\mid N]\big]=E[N\mu]=E[N]\,\mu$$

:::example Rolling a die, then flipping coins
Roll a fair die to get $N$, then flip a fair coin $N$ times and let $H$ be the number of heads. Given $N$, $E[H\mid N]=N/2$, so
$$E[H]=\frac{E[N]}{2}=\frac{3.5}{2}=1.75$$
:::

## Conditional variance and the law of total variance

$$\operatorname{Var}(X\mid Y)=E\big[(X-E[X\mid Y])^2\mid Y\big]=E[X^2\mid Y]-\big(E[X\mid Y]\big)^2$$

:::concept Law of total variance
$$\operatorname{Var}(X)=E\big[\operatorname{Var}(X\mid Y)\big]+\operatorname{Var}\big(E[X\mid Y]\big)$$
Total variance is the **average within-group variance** plus the **variance between group means**.
:::

:::example Variance of the heads
Continuing the die and coins: given $N$, $H$ is binomial, so $\operatorname{Var}(H\mid N)=N/4$ and $E[H\mid N]=N/2$.
$$E[\operatorname{Var}(H\mid N)]=\frac{E[N]}{4}=0.875,\qquad \operatorname{Var}\!\big(E[H\mid N]\big)=\frac{\operatorname{Var}(N)}{4}=\frac{35/12}{4}\approx0.729$$
$$\operatorname{Var}(H)\approx0.875+0.729=1.604$$
:::

## Covariance and indicator variables

For events $A,B$ with indicators $I_A,I_B$, we have $E[I_A]=P(A)$ and $I_AI_B=I_{A\cap B}$, so
$$\operatorname{Cov}(I_A,I_B)=P(A\cap B)-P(A)P(B)$$
This is zero exactly when $A$ and $B$ are independent. More generally, the variance of a sum of indicators is
$$\operatorname{Var}\Big(\sum_i I_i\Big)=\sum_i\operatorname{Var}(I_i)+2\sum_{i<j}\operatorname{Cov}(I_i,I_j),\qquad \operatorname{Var}(I_i)=P(A_i)\big(1-P(A_i)\big)$$

Remember: **independent implies uncorrelated, but not the other way round.** For example, if $X$ is symmetric about 0 and $Y=X^2$, then $\operatorname{Cov}(X,Y)=E[X^3]-E[X]E[X^2]=0$ even though $Y$ is determined by $X$.

## What the exam asks

- Compute $E[X\mid Y=y]$ from a joint pmf or pdf, then use the tower property to get $E[X]$.
- Use **conditioning on the first step** (or on a count) to solve for an expectation.
- Apply the **law of total variance**, including random sums.
- Find a **covariance of indicator variables** or decide whether two variables are correlated.
- State whether a claim about **independence versus zero correlation** is true.
