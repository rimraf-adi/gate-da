---
num: 77
title: Discrete Distributions: Geometric and Hypergeometric
tag: Probability & Statistics
---
Binomial and Poisson are not the only discrete distributions the exam uses. Two more come up regularly: the **geometric** distribution (waiting for the first success) and the **hypergeometric** distribution (sampling without replacement).

## Geometric distribution

Repeat independent trials, each succeeding with probability $p$. Let $X$ be the **trial number of the first success**.

:::definition Geometric$(p)$
$$P(X=k)=(1-p)^{k-1}p,\quad k=1,2,3,\dots$$
$$P(X>k)=(1-p)^k,\qquad E[X]=\frac1p,\qquad \operatorname{Var}(X)=\frac{1-p}{p^2}$$
:::

- It is the only discrete distribution with the **memoryless** property: $P(X>m+n\mid X>m)=P(X>n)$. Past failures do not change the future.
- Some books count the **failures** before the first success instead; then $P(Y=k)=(1-p)^kp$ for $k\ge0$ and $E[Y]=\dfrac{1-p}{p}$. Check which convention a question uses.

:::example Waiting for a six
A fair die is rolled until a six appears, so $p=\tfrac16$. The expected number of rolls is $\dfrac1p=6$, and $P(\text{more than 3 rolls})=\left(\tfrac56\right)^3\approx0.579$.

If $p=0.2$: $E[X]=5$ and $P(X>3)=0.8^3=0.512$.
:::

## Hypergeometric distribution

Draw $n$ items **without replacement** from a population of $N$ items, $K$ of which are "successes". Let $X$ be the number of successes in the sample.

:::definition Hypergeometric$(N,K,n)$
$$P(X=k)=\frac{\dbinom{K}{k}\dbinom{N-K}{n-k}}{\dbinom{N}{n}}$$
$$E[X]=n\frac KN,\qquad \operatorname{Var}(X)=n\frac KN\left(1-\frac KN\right)\frac{N-n}{N-1}$$
:::

- The factor $\dfrac{N-n}{N-1}$ is the **finite population correction**; it is less than 1, so sampling without replacement varies less than with replacement.
- When $N$ is much larger than $n$, the hypergeometric is close to Binomial$\left(n,\dfrac KN\right)$.

:::example Defective items
A box has 20 items, 6 of them defective. Four are drawn without replacement.
$$P(\text{exactly 1 defective})=\frac{\binom61\binom{14}3}{\binom{20}4}=\frac{6\times364}{4845}=\frac{2184}{4845}\approx0.451$$
The expected number of defectives is $4\cdot\dfrac{6}{20}=1.2$.
:::

## Counting probabilities with subsets

A classic pattern: "a non-empty subset is chosen uniformly at random; what is the probability that ...?" Count favourable subsets and divide by $2^n-1$.

:::example Even product
A non-empty subset of $\{1,2,\dots,2m\}$ is chosen at random. The product is **odd** only if every chosen element is odd. There are $m$ odd numbers, giving $2^m-1$ non-empty all-odd subsets, so
$$P(\text{product even})=1-\frac{2^m-1}{2^{2m}-1}$$
For $m=2$ ($\{1,2,3,4\}$): $1-\dfrac{3}{15}=0.8$, i.e. 12 of the 15 subsets.
:::

## Choosing the right distribution

| Situation | Distribution |
|---|---|
| Fixed number of independent trials, count successes | Binomial |
| Independent trials until the **first** success | Geometric |
| Draws **without replacement** from a finite population | Hypergeometric |
| Events in a fixed interval at constant rate | Poisson |
| Constant chance in an interval of values | Uniform |

## What the exam asks

- Probabilities and the **mean** for a waiting-time (geometric) problem, using memorylessness where helpful.
- A hypergeometric probability by counting, or its mean and variance.
- Decide **which distribution applies** from the wording (with or without replacement, fixed trials or until success).
- Counting-based probability over **subsets** or arrangements.
