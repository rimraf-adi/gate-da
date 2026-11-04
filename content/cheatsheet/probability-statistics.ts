import type { SheetSubject } from './types';

const r = String.raw;

export const probabilityStatistics: SheetSubject = {
  id: 'probability-statistics',
  name: 'Probability & Statistics',
  marks: '~18M',
  notes: 'Probability & Statistics',
  points: [
    r`Always ask first: discrete or continuous, independent or not, with or without replacement.`,
    r`$P(A\mid B)$ restricts the sample space to $B$; Bayes just reverses the conditioning.`,
    r`For NAT questions, keep full precision until the last step and round once.`,
    r`Linearity of expectation needs no independence: $E[\sum X_i]=\sum E[X_i]$. Indicator variables make counting problems easy.`,
    r`Independent $\Rightarrow$ uncorrelated, but uncorrelated does not imply independent.`,
    r`CLT: for large $n$, $\bar X\approx N(\mu,\sigma^2/n)$ whatever the parent distribution.`,
  ],
  formulas: [
    {
      title: 'Counting',
      items: [
        { label: 'Permutations', tex: r`$P(n,r)=\dfrac{n!}{(n-r)!}$` },
        { label: 'Combinations', tex: r`$\binom{n}{r}=\dfrac{n!}{r!\,(n-r)!}$` },
        { label: 'Circular arrangements', tex: r`$(n-1)!$` },
        { label: 'Repeated objects', tex: r`$\dfrac{n!}{n_1!\,n_2!\cdots n_k!}$` },
        { label: 'Non-negative solutions of $x_1+\dots+x_k=n$', tex: r`$\binom{n+k-1}{k-1}$` },
        { label: 'Positive solutions of $x_1+\dots+x_k=n$', tex: r`$\binom{n-1}{k-1}$` },
      ],
    },
    {
      title: 'Probability rules',
      items: [
        { label: 'Union', tex: r`$P(A\cup B)=P(A)+P(B)-P(A\cap B)$` },
        { label: 'Conditional', tex: r`$P(A\mid B)=\dfrac{P(A\cap B)}{P(B)}$` },
        { label: 'Total probability', tex: r`$P(A)=\sum_i P(A\mid B_i)P(B_i)$` },
        { label: 'Bayes theorem', tex: r`$P(B_i\mid A)=\dfrac{P(A\mid B_i)P(B_i)}{\sum_j P(A\mid B_j)P(B_j)}$` },
        { label: 'Independence', tex: r`$P(A\cap B)=P(A)P(B)$` },
      ],
    },
    {
      title: 'Expectation, variance, covariance',
      items: [
        { label: 'Variance', tex: r`$\mathrm{Var}(X)=E[X^2]-(E[X])^2$` },
        { label: 'Scaling', tex: r`$\mathrm{Var}(aX+b)=a^2\,\mathrm{Var}(X)$` },
        { label: 'Tower law', tex: r`$E[X]=E\big[E[X\mid Y]\big]$` },
        { label: 'Total variance', tex: r`$\mathrm{Var}(X)=E[\mathrm{Var}(X\mid Y)]+\mathrm{Var}(E[X\mid Y])$` },
        { label: 'Covariance', tex: r`$\mathrm{Cov}(X,Y)=E[XY]-E[X]E[Y]$` },
        { label: 'Correlation', tex: r`$\rho=\dfrac{\mathrm{Cov}(X,Y)}{\sigma_X\sigma_Y}\in[-1,1]$` },
        { label: 'Sum of variables', tex: r`$\mathrm{Var}(X\pm Y)=\mathrm{Var}X+\mathrm{Var}Y\pm 2\,\mathrm{Cov}(X,Y)$` },
      ],
    },
    {
      title: 'Sampling and inference',
      items: [
        { label: 'Sample mean', tex: r`$\bar X\sim N(\mu,\sigma^2/n)$` },
        { label: 'Sample variance', tex: r`$S^2=\dfrac{1}{n-1}\sum (X_i-\bar X)^2$` },
        { label: 'Chi-square from normals', tex: r`$\sum_{i=1}^n Z_i^2\sim\chi^2_n,\quad \dfrac{(n-1)S^2}{\sigma^2}\sim\chi^2_{n-1}$` },
        { label: 't statistic', tex: r`$t=\dfrac{\bar X-\mu}{S/\sqrt n}\sim t_{n-1}$` },
        { label: 'z confidence interval', tex: r`$\bar X\pm z_{\alpha/2}\dfrac{\sigma}{\sqrt n}$` },
        { label: 'z-test statistic', tex: r`$z=\dfrac{\bar x-\mu_0}{\sigma/\sqrt n}$` },
        { label: 'Chi-squared test', tex: r`$\chi^2=\sum \dfrac{(O-E)^2}{E}$` },
        { label: 'Critical z values', tex: r`$90\%:1.645,\;95\%:1.96,\;99\%:2.576$` },
      ],
    },
  ],
  tables: [
    {
      title: 'Standard distributions',
      head: ['Distribution', 'Mean', 'Variance', 'Note'],
      rows: [
        [r`Bernoulli$(p)$`, r`$p$`, r`$p(1-p)$`, r`one trial`],
        [r`Binomial$(n,p)$`, r`$np$`, r`$np(1-p)$`, r`successes in $n$ trials`],
        [r`Geometric$(p)$`, r`$1/p$`, r`$(1-p)/p^2$`, r`trials to first success`],
        [r`Poisson$(\lambda)$`, r`$\lambda$`, r`$\lambda$`, r`mean equals variance`],
        [r`Uniform$(a,b)$`, r`$\frac{a+b}{2}$`, r`$\frac{(b-a)^2}{12}$`, r`continuous`],
        [r`Exponential(rate $\lambda$)`, r`$1/\lambda$`, r`$1/\lambda^2$`, r`$P(X>x)=e^{-\lambda x}$, memoryless`],
        [r`Normal$(\mu,\sigma^2)$`, r`$\mu$`, r`$\sigma^2$`, r`$Z=\frac{X-\mu}{\sigma}$`],
        [r`Discrete uniform on $1..n$`, r`$\frac{n+1}{2}$`, r`$\frac{n^2-1}{12}$`, r``],
      ],
    },
  ],
  traps: [
    r`Check how the exponential is parameterised: by rate $\lambda$ or by mean. A question may say "mean $\lambda$".`,
    r`Sampling without replacement is hypergeometric, not binomial.`,
    r`$\mathrm{Var}(X-Y)$ adds the variances for independent variables; it does not subtract.`,
    r`For a continuous variable $P(X=x)=0$, so $<$ and $\le$ give the same probability.`,
  ],
};
