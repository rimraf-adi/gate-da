## 202415
- $f'(x^*)=0$ and $f''(x^*)>0$ is the second-derivative test for a **local minimum**.
- It does not say the minimum is global (the function could be lower elsewhere).
- Answer: **A**

## 202433
- The function is the sigmoid $\sigma(x)=\dfrac1{1+e^{-x}}$, with derivative $\sigma'(x)=\sigma(x)\big(1-\sigma(x)\big)$.
- At the point where $\sigma=0.4$: $\sigma'=0.4\times0.6=0.24$.
- Answer: **0.24**

## 202437
- Continuity at $x=-2$: $f(-2)=2$, so $4a-2b+c=2$. At $x=2$: $4a+2b+c=2$.
- Differentiability: at $-2$ the left slope is $-1$ and the quadratic's slope is $2a(-2)+b=-4a+b$, so $-4a+b=-1$. At $2$ the right slope is $1$, so $4a+b=1$.
- Subtracting the two slope equations: $8a=2$, so $a=\tfrac14$. Then $b=1-4a=0$, and $4a+c=2$ gives $c=1$.
- Answer: **A** ($a=\tfrac14,\ b=0,\ c=1$)

## 202450
- $f'(x)=x^3-2x^2-3x=x(x-3)(x+1)$, so the critical points are $-1,\ 0,\ 3$.
- $f''(x)=3x^2-4x-3$. $f''(0)=-3<0$: local maximum at 0 (A true, D false).
- $f''(3)=27-12-3=12>0$: local minimum at 3 (B true).
- $f''(-1)=3+4-3=4>0$: local minimum at $-1$, not a maximum (C false).
- Answer: **A, B**

## 202460
- $\ln\big((x^2+1)\cos x\big)=\ln(1+x^2)+\ln\cos x$.
- Near 0: $\ln(1+x^2)\approx x^2$ and $\ln\cos x\approx-\tfrac{x^2}{2}$, so the numerator is about $\tfrac{x^2}{2}$.
- The limit is $\dfrac{x^2/2}{x^2}=0.5$.
- Answer: **0.5**

## 202514
- $f(x)=\sinh x$. Its derivatives alternate $\cosh x,\ \sinh x,\ \cosh x,\dots$, so even-order derivatives are $\sinh x$.
- $f^{(10)}(0)=\sinh0=0$.
- Answer: **A**

## 202524
- $g$ maps into $(1,\infty)$, so $g\ne0$ and $f/g$ is differentiable at $c$ (the quotient rule applies).
- $f\pm g$, $f\cdot g$ and $f/g$ are differentiable at $c$ whenever both $f$ and $g$ are.
- $f\circ g+g\circ f$ needs $f$ to be differentiable at the point $g(c)$ and $g$ at $f(c)$, but we only know differentiability at $c$. Not guaranteed.
- Answer: **A, B, C**

## 202532
- Multiply by the conjugate: $\sqrt{t^2+t}-t=\dfrac{t}{\sqrt{t^2+t}+t}=\dfrac{1}{\sqrt{1+1/t}+1}$.
- As $t\to\infty$ this tends to $\dfrac1{1+1}=\dfrac12$.
- Answer: **0.5**

## 202549
- $f'(x)=x^2+7x+10=(x+2)(x+5)$. So $x=-5$ is a local maximum and $x=-2$ a local minimum.
- On $[-8,0]$, compare the critical points and the endpoints of $f(x)=\tfrac{x^3}3+\tfrac72x^2+10x+\tfrac{133}2$: $f(-8)\approx39.8$, $f(-5)\approx62.3$, $f(-2)\approx57.8$, $f(0)=66.5$.
- So the maximum value is $66.5$, attained at $x=0$, and the minimum is about $39.8$, attained at $x=-8$. A and B describe only **local** extrema, and the stated values in C and D ($1$ and $-1$) do not occur.
- **Check this one against the official key.** The book's key says C and D, but for the function as printed the range of $f$ on $[-8,0]$ is about $26.7$, so no constant term could make the maximum $1$ and the minimum $-1$ at the same time.
- Answer: **C, D** (the book's key; see the note above)

## 202551
- $f''>0$ everywhere means $f$ is strictly convex, so $f'$ is strictly increasing.
- (A) A strictly convex function need not have a minimum (for example $e^x$). False.
- (B) $f'$ is strictly increasing, so it can be zero at only one point. True.
- (C) A strictly convex function has at most one global minimiser. True.
- (D) Every local minimum of a convex function is global, and it is unique. So at most one local minimum. True.
- Answer: **B, C, D**

## 202559
- $|f(x)-f(y)|\le(x-y)^2$ gives $\left|\dfrac{f(x+h)-f(x)}{h}\right|\le|h|\to0$, so $f'(x)=0$ for every $x$.
- Hence $f$ is constant and $f(1)-f(0)=0$.
- Answer: **0**

## 202627
- $f(x)=x^3-3x^2+2=(x-1)(x^2-2x-2)$, with roots $1,\ 1\pm\sqrt3$ (about $-0.73$, $1$, $2.73$).
- **A.** In $[-0.9,0]$ the only root is $-0.73$. Exactly one, so A is false.
- **B.** $f'(x)=3x(x-2)$: $f(2)=-2$ is the minimum value. The other place that value would be reached is $x=-1$, which is excluded from $(-1,3]$. So the minimum is attained at $2$ only. True.
- **C.** $f(0)=2$ and $f(3)=2$: the maximum is attained at both 0 and 3, not 0 only. False.
- **D.** $f(1)=1-3+2=0$. True.
- Answer: **B, D**

## 202635
- The double sum separates: $\sum_{i\ge0}2^{-i}\cdot\sum_{j\ge1}3^{-j}$.
- $\sum_{i\ge0}2^{-i}=\dfrac1{1-1/2}=2$ and $\sum_{j\ge1}3^{-j}=\dfrac{1/3}{1-1/3}=\dfrac12$.
- The product is $2\times\tfrac12=1$.
- Answer: **1**
