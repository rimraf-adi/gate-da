---
num: 67
title: Hypothesis Testing: z-test, t-test and Chi-Squared Test
tag: Probability & Statistics
---
A **hypothesis test** uses sample data to decide between two competing claims about a population. It is the decision-making counterpart of the confidence interval.

## The framework

- **Null hypothesis $H_0$:** the default claim, always containing equality (for example $\mu=\mu_0$).
- **Alternative hypothesis $H_1$:** what we look for evidence of. It is **two-tailed** ($\mu\ne\mu_0$) or **one-tailed** ($\mu>\mu_0$ or $\mu<\mu_0$).
- **Test statistic:** a number computed from the sample whose distribution under $H_0$ is known.
- **Significance level $\alpha$:** the largest probability of a wrong rejection we accept, commonly $0.05$ or $0.01$.
- **Rejection (critical) region:** values of the statistic so extreme that we reject $H_0$.
- **p-value:** the probability, assuming $H_0$ is true, of a test statistic at least as extreme as the one observed. **Reject $H_0$ when $p\le\alpha$.**

:::definition Errors and power
| | $H_0$ true | $H_0$ false |
|---|---|---|
| Reject $H_0$ | **Type I error**, probability $\alpha$ | correct, probability $1-\beta$ (**power**) |
| Do not reject $H_0$ | correct | **Type II error**, probability $\beta$ |

Lowering $\alpha$ makes Type I errors rarer but increases $\beta$ for a fixed sample size. A larger sample reduces both.
:::

**Procedure.** State $H_0,H_1$; choose $\alpha$; compute the statistic; compare it with the critical value (or the p-value with $\alpha$); state the conclusion in words.

## z-test for a mean ($\sigma$ known)

For a sample of size $n$ from a normal population (or $n$ large) with known $\sigma$, test $H_0:\mu=\mu_0$ using
$$z=\frac{\bar x-\mu_0}{\sigma/\sqrt{n}}\ \sim N(0,1)\text{ under }H_0$$

Critical values of $z$:

| $\alpha$ | Two-tailed (reject if $|z|>$) | One-tailed (reject if $z>$ or $z<-$) |
|---|---|---|
| 0.10 | 1.645 | 1.282 |
| 0.05 | 1.960 | 1.645 |
| 0.01 | 2.576 | 2.326 |

:::example A z-test
A machine fills bags with mean $\mu_0=100$ g and known $\sigma=15$. A sample of $n=36$ has $\bar x=104$.
$$z=\frac{104-100}{15/\sqrt{36}}=\frac{4}{2.5}=1.6$$
For a two-tailed test at $\alpha=0.05$ the critical value is 1.96. Since $1.6<1.96$ (p-value $=2\,(1-\Phi(1.6))\approx0.11$), we **fail to reject $H_0$**: the data do not show the mean differs from 100.
:::

## t-test ($\sigma$ unknown)

When $\sigma$ is unknown, replace it by the sample standard deviation $s$. The statistic then follows a **t-distribution** with $n-1$ degrees of freedom, which has heavier tails than the normal and approaches it as $n$ grows.

**One-sample t-test**, $H_0:\mu=\mu_0$:
$$t=\frac{\bar x-\mu_0}{s/\sqrt{n}},\qquad \text{df}=n-1$$

**Two-sample t-test** (independent samples, equal variances assumed), $H_0:\mu_1=\mu_2$:
$$t=\frac{\bar x_1-\bar x_2}{s_p\sqrt{\frac1{n_1}+\frac1{n_2}}},\qquad s_p^2=\frac{(n_1-1)s_1^2+(n_2-1)s_2^2}{n_1+n_2-2},\qquad \text{df}=n_1+n_2-2$$

**Paired t-test:** for paired measurements, take the differences $d_i$ and run a one-sample t-test on them with $\mu_0=0$ and $\text{df}=n-1$.

Useful two-tailed 5% critical values $t_{0.025,\text{df}}$:

| df | 5 | 10 | 15 | 18 | 20 | 30 | $\infty$ |
|---|---|---|---|---|---|---|---|
| $t_{0.025}$ | 2.571 | 2.228 | 2.131 | 2.101 | 2.086 | 2.042 | 1.960 |

:::example One-sample t-test
$n=16$, $\bar x=52$, $s=6$, $\mu_0=50$.
$$t=\frac{52-50}{6/4}=1.333,\qquad \text{df}=15$$
The critical value is $t_{0.025,15}=2.131$, and $1.333<2.131$, so we **fail to reject $H_0$**.
:::

:::example Two-sample t-test
Two groups with $n_1=n_2=10$, means 24 and 20, variances $s_1^2=16$ and $s_2^2=9$.
$$s_p^2=\frac{9(16)+9(9)}{18}=12.5,\quad s_p=3.536,\quad \text{SE}=3.536\sqrt{\tfrac1{10}+\tfrac1{10}}=1.581$$
$$t=\frac{24-20}{1.581}=2.53,\qquad \text{df}=18$$
Since $2.53>t_{0.025,18}=2.101$, we **reject $H_0$** at the 5% level: the means differ.
:::

## Chi-squared tests

A statistic that sums squared standardised differences follows a **chi-squared distribution** $\chi^2_{k}$, which is right-skewed and non-negative, with mean $k$.

### Goodness of fit

Test whether observed category counts $O_i$ match the counts $E_i$ expected under a hypothesised distribution:
$$\chi^2=\sum_i\frac{(O_i-E_i)^2}{E_i},\qquad \text{df}=(\text{number of categories})-1-(\text{parameters estimated})$$
It is always a **right-tailed** test: reject for large $\chi^2$.

### Independence in a contingency table

For an $r\times c$ table of counts, test $H_0$: the two classifications are independent.
$$E_{ij}=\frac{(\text{row } i\text{ total})(\text{column } j\text{ total})}{N},\qquad \chi^2=\sum_{i,j}\frac{(O_{ij}-E_{ij})^2}{E_{ij}},\qquad \text{df}=(r-1)(c-1)$$

### Variance of one normal population

To test $H_0:\sigma^2=\sigma_0^2$:
$$\chi^2=\frac{(n-1)s^2}{\sigma_0^2},\qquad \text{df}=n-1$$

Upper 5% critical values $\chi^2_{0.05,\text{df}}$:

| df | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|
| $\chi^2_{0.05}$ | 3.841 | 5.991 | 7.815 | 9.488 | 11.070 | 12.592 |

:::example Is the die fair?
A die is rolled 60 times, giving counts 8, 9, 12, 11, 6, 14 for faces 1 to 6. If fair, $E_i=10$.
$$\chi^2=\frac{(-2)^2+(-1)^2+2^2+1^2+(-4)^2+4^2}{10}=\frac{42}{10}=4.2,\qquad \text{df}=5$$
Since $4.2<11.07$, we **fail to reject** fairness.
:::

:::example Test of independence
A $2\times2$ table has counts $\begin{pmatrix}20&30\\30&20\end{pmatrix}$. Each row and column total is 50 and $N=100$, so every $E_{ij}=25$.
$$\chi^2=4\cdot\frac{(5)^2}{25}=4,\qquad \text{df}=1$$
Since $4>3.841$, we **reject** independence at the 5% level.
:::

## Which test to use

| Situation | Test |
|---|---|
| Mean, $\sigma$ known (or very large $n$) | z-test |
| Mean, $\sigma$ unknown | t-test (one-sample, two-sample or paired) |
| Counts in categories against a model | chi-squared goodness of fit |
| Two categorical variables | chi-squared test of independence |
| Variance of a normal population | chi-squared with $\text{df}=n-1$ |

## Link to confidence intervals

A two-tailed test of $H_0:\mu=\mu_0$ at level $\alpha$ rejects exactly when $\mu_0$ lies **outside** the $(1-\alpha)$ confidence interval for $\mu$. For the z-test the interval is $\bar x\pm z_{\alpha/2}\,\sigma/\sqrt n$.

## Common mistakes

- Never say "accept $H_0$"; say **"fail to reject $H_0$"**. Not finding evidence is not proof.
- The p-value is **not** the probability that $H_0$ is true.
- Match the tail to $H_1$: for a one-tailed test use the one-tailed critical value.
- Use the right **degrees of freedom**: $n-1$, $n_1+n_2-2$, $k-1$, or $(r-1)(c-1)$.
- Chi-squared tests need the **expected** counts (not the observed) to be reasonably large, as a rule of thumb at least 5.

## What the exam asks

- Compute a **test statistic** from summary numbers and compare it with a given critical value.
- Say whether $H_0$ is rejected at the given $\alpha$, or which test applies.
- Find **degrees of freedom** or an **expected count** in a contingency table.
- Identify **Type I or Type II errors** and how they change with $\alpha$ and $n$.
