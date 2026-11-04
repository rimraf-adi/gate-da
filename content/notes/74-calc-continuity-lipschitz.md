---
num: 74
title: Continuity, Differentiability, Lipschitz and Hyperbolic Functions: Worked Problems
tag: Calculus & Optimization
---
This chapter collects the facts and the recurring problem types that surround continuity and differentiability, including Lipschitz continuity and hyperbolic functions, which machine learning uses constantly (activation functions, step-size analysis).

## Quick tests

:::definition Continuity and differentiability at a point
$f$ is **continuous** at $a$ if $\lim_{x\to a}f(x)=f(a)$: the limit exists and equals the value.
$f$ is **differentiable** at $a$ if the left and right derivatives exist and are equal:
$$f'_-(a)=\lim_{h\to0^-}\frac{f(a+h)-f(a)}{h}=f'_+(a)=\lim_{h\to0^+}\frac{f(a+h)-f(a)}{h}$$
:::

- **Differentiable $\Rightarrow$ continuous.** The converse is false: $|x|$ is continuous at 0 but has a corner there.
- Sums, products, quotients (with non-zero denominator) and compositions of differentiable functions are differentiable.
- Differentiability fails at a **corner** (like $|x|$ at 0), at a **jump** or other discontinuity, and where the tangent is **vertical** (like $\sqrt[3]{x}$ at 0).

## Piecewise functions with unknown constants

To make a function defined in pieces continuous or differentiable at the join, **match values first, then match derivatives**.

:::example Choosing constants
Let $f(x)=\begin{cases}ax+b,&x<1\\ x^2,&x\ge1\end{cases}$.
- **Continuity at 1:** $a+b=1^2=1$.
- **Differentiability at 1:** left derivative $a$, right derivative $2x\big|_{x=1}=2$, so $a=2$.

Then $b=1-a=-1$. With $a=2,\ b=-1$ the function is differentiable at 1.
:::

## Absolute value, ReLU and combinations

- $|x|$ and $\text{ReLU}(x)=\max(0,x)$ are continuous everywhere and not differentiable at $0$. For ReLU the left derivative is 0 and the right derivative is 1.
- **A sum of a differentiable and a non-differentiable function is non-differentiable** at the bad point. But a **product** can recover differentiability: $f(x)=x|x|$ equals $x^2$ for $x\ge0$ and $-x^2$ for $x<0$, and $f'(0)=0$, so $f$ is differentiable at 0.
- $|x|\cdot|x|=x^2$ is differentiable, while $|x|+x=2\max(0,x)$ is not (at 0).
- A network built only from ReLU units and linear maps is continuous and **piecewise linear**, differentiable except at the kinks.

## Lipschitz continuity

:::definition Lipschitz continuity
$f$ is **$L$-Lipschitz** on a set if
$$|f(x)-f(y)|\le L\,|x-y|\quad\text{for all }x,y$$
The smallest such $L$ is the **Lipschitz constant**. It bounds how fast $f$ can change.
:::

- If $f$ is differentiable and $|f'(x)|\le L$ everywhere, then $f$ is $L$-Lipschitz (mean value theorem). Conversely, an $L$-Lipschitz differentiable function has $|f'|\le L$.
- Lipschitz $\Rightarrow$ uniformly continuous $\Rightarrow$ continuous. Lipschitz does **not** require differentiability: $|x|$ is 1-Lipschitz.

| Function | Lipschitz constant |
|---|---|
| $\sin x,\ \cos x$ | 1 (since $|f'|\le1$) |
| $\lvert x\rvert,\ \text{ReLU}$ | 1 |
| sigmoid $\sigma(x)$ | $\tfrac14$ (since $\sigma'\le\tfrac14$) |
| $\tanh x$ | 1 |
| $x^2$ on $[0,1]$ | 2; but **not** Lipschitz on $\mathbb R$ |
| $\sqrt x$ on $[0,1]$ | **not** Lipschitz (derivative unbounded near 0) |

:::example A function that must be constant
Suppose $|f(x)-f(y)|\le(x-y)^2$ for all $x,y$. Then
$$|f'(x)|=\lim_{h\to0}\frac{|f(x+h)-f(x)|}{|h|}\le\lim_{h\to0}\frac{h^2}{|h|}=0$$
So $f'\equiv0$ and $f$ is **constant**. (If the exponent were 1 instead, only $L$-Lipschitz would follow.)
:::

In optimisation, if $\nabla f$ is $L$-Lipschitz, gradient descent with step size $\eta\le1/L$ is guaranteed to decrease $f$.

## Hyperbolic functions

$$\sinh x=\frac{e^x-e^{-x}}{2},\qquad\cosh x=\frac{e^x+e^{-x}}{2},\qquad\tanh x=\frac{\sinh x}{\cosh x}$$

- Identity: $\cosh^2x-\sinh^2x=1$.
- Derivatives: $(\sinh x)'=\cosh x$, $\ (\cosh x)'=\sinh x$, $\ (\tanh x)'=1-\tanh^2x=\text{sech}^2x$.
- $\sinh$ is odd, $\cosh$ is even with $\cosh x\ge1$, and $\tanh$ is odd with values in $(-1,1)$.
- Connection to the sigmoid: $\sigma(x)=\dfrac{1}{1+e^{-x}}=\dfrac{1+\tanh(x/2)}{2}$, with $\sigma'(x)=\sigma(x)\big(1-\sigma(x)\big)$.

## Limits: standard problem types

:::example Limits worked
- **At infinity, ratio of polynomials:** $\displaystyle\lim_{x\to\infty}\frac{3x^2+2x}{x^2+1}=3$ (compare leading terms).
- **Exponential beats polynomial:** $\displaystyle\lim_{x\to\infty}xe^{-x}=0$ and $\displaystyle\lim_{x\to\infty}\frac{\ln x}{x}=0$.
- **The number $e$:** $\displaystyle\lim_{x\to\infty}\left(1+\frac2x\right)^x=e^2$.
- **$\infty-\infty$:** $\displaystyle\lim_{x\to\infty}\left(\sqrt{x^2+x}-x\right)=\lim\frac{x}{\sqrt{x^2+x}+x}=\frac12$.
- **L'Hôpital** (for $\tfrac00$ or $\tfrac\infty\infty$): $\displaystyle\lim_{x\to0}\frac{\sin3x}{x}=\lim\frac{3\cos3x}{1}=3$.
:::

## What the exam asks

- Find constants that make a **piecewise function continuous or differentiable**.
- Decide whether a **combination** ($f+g$, $fg$, $f\circ g$, $|f|$) is differentiable.
- State whether a function is **Lipschitz** and find its constant, or deduce a function is constant.
- Differentiate **hyperbolic** expressions, or use $\sigma'=\sigma(1-\sigma)$.
- Evaluate **limits at infinity** and indeterminate forms.
