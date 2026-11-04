---
num: 73
title: Taylor and Maclaurin Series in Depth
tag: Calculus & Optimization
---
A smooth function looks like a polynomial when you zoom in. **Taylor series** make this precise, and they are the tool behind limit evaluation, error estimates, and the second-derivative test.

## From tangent lines to polynomials

Near a point $a$, the best straight-line approximation of $f$ is its tangent:
$$f(x)\approx f(a)+f'(a)(x-a)$$
Adding the curvature term gives the quadratic approximation:
$$f(x)\approx f(a)+f'(a)(x-a)+\frac{f''(a)}{2}(x-a)^2$$
Each extra term uses one more derivative and tracks $f$ more closely near $a$.

## Taylor and Maclaurin series

:::definition Taylor polynomial and series
The **Taylor polynomial of degree $n$** of $f$ about $a$ is
$$P_n(x)=\sum_{k=0}^{n}\frac{f^{(k)}(a)}{k!}(x-a)^k$$
The **Taylor series** is the limit as $n\to\infty$. When $a=0$ it is called the **Maclaurin series**.
:::

**Remainder (Lagrange form).** $f(x)=P_n(x)+R_n(x)$ with
$$R_n(x)=\frac{f^{(n+1)}(\xi)}{(n+1)!}(x-a)^{n+1}\quad\text{for some }\xi\text{ between }a\text{ and }x$$
So the error of a degree-$n$ approximation is bounded by the largest size of $f^{(n+1)}$ on the interval times $\dfrac{|x-a|^{n+1}}{(n+1)!}$.

## Standard Maclaurin series

| Function | Series | Valid for |
|---|---|---|
| $e^x$ | $1+x+\dfrac{x^2}{2!}+\dfrac{x^3}{3!}+\cdots$ | all $x$ |
| $\sin x$ | $x-\dfrac{x^3}{3!}+\dfrac{x^5}{5!}-\cdots$ | all $x$ |
| $\cos x$ | $1-\dfrac{x^2}{2!}+\dfrac{x^4}{4!}-\cdots$ | all $x$ |
| $\ln(1+x)$ | $x-\dfrac{x^2}{2}+\dfrac{x^3}{3}-\cdots$ | $-1<x\le1$ |
| $\dfrac{1}{1-x}$ | $1+x+x^2+x^3+\cdots$ | $|x|<1$ |
| $(1+x)^k$ | $1+kx+\dfrac{k(k-1)}{2!}x^2+\cdots$ | $|x|<1$ |
| $\arctan x$ | $x-\dfrac{x^3}{3}+\dfrac{x^5}{5}-\cdots$ | $|x|\le1$ |
| $\sinh x$, $\cosh x$ | $x+\dfrac{x^3}{3!}+\cdots$, $\ 1+\dfrac{x^2}{2!}+\cdots$ | all $x$ |

The **radius of convergence** is the $R$ such that the series converges for $|x-a|<R$. It is infinite for $e^x,\sin x,\cos x$ and equal to 1 for $\ln(1+x)$ and $1/(1-x)$.

## Building new series

You rarely need to differentiate from scratch. Use the standard series and:
- **Substitute:** $e^{-x^2}=1-x^2+\dfrac{x^4}{2!}-\cdots$ (replace $x$ by $-x^2$).
- **Multiply or divide** series term by term.
- **Differentiate or integrate** term by term inside the radius of convergence. For example, differentiating $\dfrac1{1-x}$ gives $\dfrac1{(1-x)^2}=1+2x+3x^2+\cdots$.

## Evaluating limits with series

Replace each function by enough terms to see which power of $x$ survives.

:::example Limits at 0
- $\displaystyle\lim_{x\to0}\frac{e^x-1-x}{x^2}$: the numerator is $\dfrac{x^2}{2}+\dfrac{x^3}{6}+\cdots$, so the limit is $\dfrac12$.
- $\displaystyle\lim_{x\to0}\frac{\sin x-x}{x^3}$: the numerator is $-\dfrac{x^3}{6}+\cdots$, so the limit is $-\dfrac16$.
- $\displaystyle\lim_{x\to0}\frac{1-\cos x}{x^2}=\frac12$.
- $\displaystyle\lim_{x\to0}\frac{\ln(1+x)-x}{x^2}=-\frac12$.
:::

## Approximation and error

:::example Numerical approximations
- $e^{0.1}\approx1+0.1+\dfrac{0.01}{2}+\dfrac{0.001}{6}=1.10517$ (true value $1.105171$).
- $\sqrt{1.1}=(1+0.1)^{1/2}\approx1+\dfrac{0.1}{2}-\dfrac{0.01}{8}=1.04875$ (true value $1.048809$).
- $\sin(0.5)\approx0.5-\dfrac{0.125}{6}=0.479167$. For this **alternating** series the error is smaller than the first omitted term $\dfrac{0.5^5}{120}\approx0.00026$.
:::

## Taylor series and optimisation

- The **second-derivative test** comes from the quadratic Taylor polynomial at a critical point: $f(x)\approx f(a)+\tfrac12f''(a)(x-a)^2$, so $f''(a)>0$ gives a minimum.
- **Gradient descent** uses the first-order approximation; **Newton's method** uses the second-order one and updates $x_{t+1}=x_t-\dfrac{f'(x_t)}{f''(x_t)}$.

## What the exam asks

- Write the first few terms of a series (often for $e^{g(x)}$ or $\sin g(x)$ by substitution).
- Evaluate a **limit at 0** by series instead of repeated L'Hôpital.
- Estimate a value and **bound the error**.
- Identify which function a given series represents, or its radius of convergence.
