import type { SheetSubject } from './types';

const r = String.raw;

export const calculusOptimization: SheetSubject = {
  id: 'calculus-optimization',
  name: 'Calculus & Optimization',
  marks: '~7M',
  notes: 'Calculus & Optimization',
  points: [
    r`Differentiable $\Rightarrow$ continuous; the converse fails ($|x|$ at $0$).`,
    r`For global extrema on $[a,b]$, compare the endpoints and every critical point.`,
    r`Second-derivative test is inconclusive when $f''=0$; check the sign change of $f'$.`,
    r`Convex: $f''\ge0$ everywhere; any local minimum of a convex function is global.`,
  ],
  formulas: [
    {
      title: 'Standard limits',
      items: [
        { label: 'Sine', tex: r`$\lim_{x\to0}\dfrac{\sin x}{x}=1$` },
        { label: 'Exponential and log', tex: r`$\lim_{x\to0}\dfrac{e^x-1}{x}=1,\quad \lim_{x\to0}\dfrac{\ln(1+x)}{x}=1$` },
        { label: 'Euler number', tex: r`$\lim_{n\to\infty}\big(1+\tfrac1n\big)^n=e$` },
        { label: 'Growth order', tex: r`$\ln x\ll x^a\ll e^x$ as $x\to\infty$ ($a>0$)` },
        { label: "L'Hôpital", tex: r`for $\tfrac00$ or $\tfrac\infty\infty$: $\lim\frac{f}{g}=\lim\frac{f'}{g'}$` },
      ],
    },
    {
      title: 'Derivatives',
      items: [
        { label: 'Power, exponential, log', tex: r`$(x^n)'=nx^{n-1},\ (e^x)'=e^x,\ (\ln x)'=\tfrac1x$` },
        { label: 'Trig', tex: r`$(\sin x)'=\cos x,\ (\cos x)'=-\sin x,\ (\tan x)'=\sec^2x$` },
        { label: 'Product and quotient', tex: r`$(uv)'=u'v+uv',\ \left(\tfrac uv\right)'=\dfrac{u'v-uv'}{v^2}$` },
        { label: 'Sigmoid', tex: r`$\sigma(x)=\dfrac{1}{1+e^{-x}},\ \sigma'=\sigma(1-\sigma)$` },
        { label: 'Hyperbolic', tex: r`$(\sinh x)'=\cosh x,\ (\cosh x)'=\sinh x,\ (\tanh x)'=1-\tanh^2x$` },
      ],
    },
    {
      title: 'Taylor series and sums',
      items: [
        { label: 'Taylor about $a$', tex: r`$f(x)=\sum_{n\ge0}\dfrac{f^{(n)}(a)}{n!}(x-a)^n$` },
        { label: 'Exponential', tex: r`$e^x=1+x+\tfrac{x^2}{2!}+\tfrac{x^3}{3!}+\cdots$` },
        { label: 'Sine and cosine', tex: r`$\sin x=x-\tfrac{x^3}{3!}+\cdots,\quad \cos x=1-\tfrac{x^2}{2!}+\cdots$` },
        { label: 'Geometric series', tex: r`$\sum_{n\ge0}ar^n=\dfrac{a}{1-r}$ for $|r|<1$` },
        { label: 'Natural-number sums', tex: r`$\sum n=\tfrac{n(n+1)}2,\ \ \sum n^2=\tfrac{n(n+1)(2n+1)}6$` },
      ],
    },
    {
      title: 'Optimisation (single variable)',
      items: [
        { label: 'Critical point', tex: r`$f'(x^*)=0$` },
        { label: 'Second-derivative test', tex: r`$f''>0$: minimum; $f''<0$: maximum` },
        { label: 'Quadratic $ax^2+bx+c$', tex: r`extremum at $x=-\dfrac{b}{2a}$` },
        { label: 'Gradient descent', tex: r`$x_{t+1}=x_t-\eta f'(x_t)$` },
        { label: 'Lipschitz', tex: r`$|f(x)-f(y)|\le L|x-y|$; bounded $|f'|\le L$ suffices` },
      ],
    },
  ],
  traps: [
    r`A cubic has at most two critical points and may have none; always check the interval.`,
    r`Strictly convex does not mean a minimum exists (for example $e^x$).`,
    r`Limits that give $\infty-\infty$ or $1^\infty$ need rewriting before L'Hôpital.`,
  ],
};
