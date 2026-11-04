---
num: 84
title: k-Nearest Neighbours and the Perceptron
tag: Machine Learning: Supervised
---
Two of the simplest classifiers show up often: k-nearest neighbours (no training at all) and the perceptron (the ancestor of neural networks).

## k-nearest neighbours (k-NN)

To classify a query point, find its $k$ closest training points and take a **majority vote** of their labels. For regression, average their values.

- **Distance:** Euclidean $\sqrt{\sum(x_i-y_i)^2}$, Manhattan $\sum|x_i-y_i|$, or Minkowski $\left(\sum|x_i-y_i|^p\right)^{1/p}$. The choice can change which points are nearest.
- **Scale the features** first: a feature with a large range dominates the distance.
- **Choosing $k$.** $k=1$ gives a very flexible boundary (low bias, high variance; training error is 0). A large $k$ smooths the boundary (higher bias, lower variance); $k=n$ always predicts the majority class. Use an **odd $k$** for two classes to avoid ties, and choose $k$ by cross-validation.
- The decision boundary is **piecewise linear** (it follows the Voronoi cells for $k=1$).
- There is **no training**. Each query costs $O(nd)$ distance computations, so prediction is slow on large data, and distances lose meaning in high dimensions (the **curse of dimensionality**).
- **Weighted k-NN** gives closer neighbours more say, for example weight $1/d$.

:::example A small k-NN problem
Training points: $A(0,0)$ and $B(1,0)$ are class $+$; $C(3,0)$ and $D(4,1)$ are class $-$. Classify the query $(2,0)$.

Distances: $B$: 1, $C$: 1, $A$: 2, $D$: $\sqrt5\approx2.24$.
- $k=1$: $B$ and $C$ tie at distance 1, so the vote is undecided.
- $k=3$: the nearest three are $B,C,A$, labelled $+,-,+$: **class $+$**.
- $k=4$: two of each class, a tie again, which is why an odd $k$ is used.
:::

## The perceptron

The perceptron is a linear classifier $\hat y=\operatorname{sign}(w^Tx+b)$ with labels $y\in\{+1,-1\}$ (and $\operatorname{sign}(0)$ counted as $-1$ in the usual exam convention).

**Learning rule.** For each training point, if it is **misclassified**, update
$$w\leftarrow w+y\,x,\qquad b\leftarrow b+y$$
and leave the weights unchanged when the point is correct. Repeat until no mistakes remain.

:::concept What one update does
For a misclassified $(x,y)$ the new score is
$$y\,f_{new}(x)=y\,f_{old}(x)+x^Tx+1$$
It increases by $\|x\|^2+1>0$, so each update moves the score of that point **towards the correct sign** (it may or may not fix it in one step). For $y=+1$ and an old score $f<0$, the new score is larger: $f_{new}>f_{old}$.
:::

- **Convergence theorem.** If the data are **linearly separable**, the perceptron makes a finite number of mistakes (at most $(R/\gamma)^2$, with $R$ the largest $\|x\|$ and $\gamma$ the margin) and then classifies everything correctly.
- If the data are **not** separable (for example XOR) it never stops updating.
- The final line depends on the **order** of the data and the starting weights, and it is not the maximum-margin line (that is the SVM).
- A multilayer perceptron stacks such units with non-linear activations, which removes the XOR limitation.

:::example Perceptron by hand
Start with $w=(0,0),\ b=0$. Data: $x_1=(1,1),\ y_1=+1$ and $x_2=(-1,0),\ y_2=-1$.

- $x_1$: $f=0$, predicted $-1$ (sign of 0), wrong. Update: $w=(1,1)$, $b=1$.
- $x_2$: $f=-1+1=0$, predicted $-1$, correct. No update.
- $x_1$ again: $f=2+1=3>0$, correct.

No more mistakes: $w=(1,1),\ b=1$.
:::

## What the exam asks

- **Classify** a query with k-NN for a given $k$ and metric, and the **smallest odd $k$** that gives a particular label.
- Effect of **$k$** and of **feature scaling** on bias, variance and the boundary.
- Carry out **perceptron updates** by hand, or say whether $f$ increases after an update.
- Say when the perceptron **converges**, and why XOR is not learnable by one unit.
