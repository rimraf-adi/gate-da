---
num: 78
title: Gradient Descent, SGD and Backpropagation
tag: Machine Learning: Supervised
---
Almost every model in this course is fitted by minimising a **loss** over its parameters. Gradient descent is the general method, stochastic gradient descent makes it practical for large data, and backpropagation computes the gradients for neural networks.

## Gradient descent

For a loss $L(w)$, repeatedly move against the gradient:
$$w\leftarrow w-\eta\,\nabla L(w)$$
where $\eta>0$ is the **learning rate** (step size). Too small a rate is slow; too large a rate overshoots and can diverge.

:::example Gradient descent on a parabola
Minimise $f(w)=(w-3)^2$, so $f'(w)=2(w-3)$, starting at $w_0=0$ with $\eta=0.1$.
- $w_1=0-0.1\cdot2(0-3)=0.6$
- $w_2=0.6-0.1\cdot2(0.6-3)=1.08$

Each step multiplies the distance to the minimum by $1-2\eta=0.8$ (3, 2.4, 1.92, ...). The iteration converges for $0<\eta<1$ (oscillating around the minimum when $\eta>0.5$) and diverges for $\eta>1$.
:::

For a convex function with an $L$-Lipschitz gradient, any step size $\eta\le1/L$ makes the loss decrease at every step. On a non-convex loss, gradient descent finds a local minimum (or a saddle point), not necessarily the global one.

## Batch, stochastic and mini-batch

For a loss that averages over $n$ examples, $L(w)=\dfrac1n\sum_iL_i(w)$:

| Variant | Gradient used per update | Cost per step | Behaviour |
|---|---|---|---|
| Batch | average over all $n$ examples | $O(n)$ | smooth, exact |
| Stochastic (SGD) | one random example $\nabla L_i(w)$ | $O(1)$ | noisy but unbiased |
| Mini-batch | average over $B$ examples | $O(B)$ | the usual compromise |

The SGD update is $w\leftarrow w-\eta\nabla L_i(w)$. Its gradient is an **unbiased estimate** of the full gradient, so on average it moves in the right direction, and the noise can even help escape shallow minima.

:::example An SGD step
Linear model $\hat y=wx$ with per-example loss $L_i=\tfrac12(wx-y)^2$, so $\nabla L_i=(wx-y)\,x$. With $w=1$, $x=2$, $y=5$, $\eta=0.1$: prediction $2$, error $-3$, gradient $(-3)(2)=-6$, so
$$w\leftarrow1-0.1(-6)=1.6$$
For logistic regression the per-example gradient is $\big(\sigma(w^Tx)-y\big)\,x$.
:::

## Multilayer perceptrons

A layer computes $z=Wa+b$ and then $a'=g(z)$, where $g$ is an **activation function**.

| Activation | $g(z)$ | $g'(z)$ |
|---|---|---|
| Sigmoid | $\dfrac{1}{1+e^{-z}}$ | $g(1-g)$, at most $\tfrac14$ |
| Tanh | $\tanh z$ | $1-g^2$ |
| ReLU | $\max(0,z)$ | $1$ if $z>0$, else $0$ |

- A **ReLU network is continuous and piecewise linear**; it is not differentiable where a unit's input is exactly 0 (in practice the derivative is set to 0 or 1 there).
- A layer with $n_{in}$ inputs and $n_{out}$ units has $(n_{in}+1)\,n_{out}$ parameters (weights plus biases). A 4-5-3 network has $(4+1)\cdot5+(5+1)\cdot3=25+18=43$.
- Without a non-linear activation, any stack of layers collapses to a single linear map.

## Backpropagation

Backpropagation computes $\nabla L$ for every weight with the **chain rule**, reusing intermediate results. A forward pass stores each activation; a backward pass starts at the loss and multiplies local derivatives layer by layer. Its cost is about that of one forward pass.

:::example Backpropagation by hand
A one-hidden-unit network: $z=w_1x$, $h=\text{ReLU}(z)$, $\hat y=w_2h$, loss $L=\tfrac12(\hat y-y)^2$. Take $x=1,\ y=4,\ w_1=2,\ w_2=3$.

**Forward:** $z=2$, $h=2$, $\hat y=6$, $L=\tfrac12(2)^2=2$.

**Backward** (chain rule):
- $\dfrac{\partial L}{\partial\hat y}=\hat y-y=2$
- $\dfrac{\partial L}{\partial w_2}=2\cdot h=4$
- $\dfrac{\partial L}{\partial h}=2\cdot w_2=6$, and $\dfrac{\partial h}{\partial z}=1$ (since $z>0$)
- $\dfrac{\partial L}{\partial w_1}=6\cdot1\cdot x=6$

**Update** with $\eta=0.1$: $w_1=2-0.6=1.4$, $w_2=3-0.4=2.6$. The new prediction is $2.6\times1.4=3.64$, closer to 4, and the loss falls from 2 to $\tfrac12(0.36)^2=0.065$.
:::

**Vanishing gradients.** With a sigmoid, each layer multiplies the gradient by at most $\tfrac14$, so deep networks learn slowly in early layers. ReLU avoids this for active units.

## Practical points

- **Learning rate:** the most important setting; too high diverges, too low is slow.
- **Weight decay** adds an $L_2$ penalty $\lambda\|w\|^2$ and shrinks weights, reducing variance.
- **Early stopping** halts training when validation loss starts rising.
- Scale the inputs, and use a random (not all-zero) initialisation so that units learn different features.

## What the exam asks

- Perform one or two **gradient descent or SGD updates** by hand.
- Carry out a small **forward and backward pass**, including a ReLU unit.
- **Count parameters** of a multilayer perceptron.
- State properties: SGD is unbiased and noisy, ReLU is piecewise linear, sigmoid gradients vanish.
