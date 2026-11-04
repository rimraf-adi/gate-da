---
num: 66
title: Reasoning under Uncertainty: Bayesian Networks and Inference
tag: Artificial Intelligence
---
Real agents never know the whole truth. **Probability** lets us reason with partial information. A full joint distribution over $n$ binary variables needs $2^n-1$ numbers, which quickly becomes unmanageable. **Bayesian networks** exploit conditional independence to represent the same distribution compactly.

## Independence and conditional independence

- $X$ and $Y$ are **independent** if $P(X,Y)=P(X)P(Y)$.
- $X$ and $Y$ are **conditionally independent given $Z$**, written $X\perp Y\mid Z$, if
$$P(X,Y\mid Z)=P(X\mid Z)\,P(Y\mid Z)$$
equivalently $P(X\mid Y,Z)=P(X\mid Z)$: once $Z$ is known, $Y$ tells us nothing more about $X$.

Neither implies the other: variables can be dependent marginally yet independent given $Z$, and the reverse.

## Bayesian networks

:::definition Bayesian network
A **Bayesian network** is a directed acyclic graph (DAG) with one node per random variable, and for each node $X_i$ a **conditional probability table** (CPT) $P(X_i\mid \text{Parents}(X_i))$. It represents the joint distribution
$$P(X_1,\dots,X_n)=\prod_{i=1}^{n}P\big(X_i\mid \text{Parents}(X_i)\big)$$
:::

The standard example: a burglar alarm that either a Burglary ($B$) or an Earthquake ($E$) can set off ($A$), and two neighbours, John ($J$) and Mary ($M$), who may call when it rings. Edges: $B\to A,\ E\to A,\ A\to J,\ A\to M$.

| CPT | Values |
|---|---|
| $P(B)$ | 0.001 |
| $P(E)$ | 0.002 |
| $P(A\mid B,E)$ | TT: 0.95, TF: 0.94, FT: 0.29, FF: 0.001 |
| $P(J\mid A)$ | A true: 0.90, A false: 0.05 |
| $P(M\mid A)$ | A true: 0.70, A false: 0.01 |

:::example A joint probability
The probability that the alarm sounds, both neighbours call, but there is neither burglary nor earthquake:
$$P(j,m,a,\neg b,\neg e)=P(j\mid a)\,P(m\mid a)\,P(a\mid\neg b,\neg e)\,P(\neg b)\,P(\neg e)$$
$$=0.90\times0.70\times0.001\times0.999\times0.998\approx0.000628$$
:::

**Counting parameters.** A binary node with $k$ binary parents needs $2^{k}$ numbers. For the network above: $1+1+4+2+2=10$, against $2^5-1=31$ for the full joint.

## Conditional independence in a network: d-separation

Every path between two variables is built from three kinds of triples. The rule for whether the path is **blocked** depends on the middle node $Z$:

| Structure | Path | Blocked when |
|---|---|---|
| Chain | $X\to Z\to Y$ | $Z$ is observed |
| Fork (common cause) | $X\leftarrow Z\to Y$ | $Z$ is observed |
| Collider (common effect) | $X\to Z\leftarrow Y$ | $Z$ and all its descendants are **unobserved** |

:::definition d-separation
$X$ and $Y$ are **d-separated** by an observed set $\mathbf{Z}$ if **every** path between them is blocked. Then $X\perp Y\mid\mathbf{Z}$ holds in every distribution the network represents.
:::

The collider rule is the surprising one: observing the common effect (or one of its descendants) makes the causes **dependent**, which is the "explaining away" effect.

:::example Reading the alarm network
- $B\perp E$ with nothing observed (the only path is a collider at $A$).
- $B$ and $E$ are **dependent given $A$**: if the alarm rang and there was an earthquake, a burglary becomes less likely.
- $J\perp M\mid A$ (fork at $A$ is blocked), but $J$ and $M$ are **not** independent marginally.
- $B\perp J\mid A$ (chain through $A$ is blocked).
:::

The **Markov blanket** of a node (its parents, its children, and its children's other parents) makes the node independent of all other variables.

## Exact inference and variable elimination

To answer $P(Q\mid\mathbf{e})$ sum the joint over the hidden variables $H$, then normalise:
$$P(Q\mid\mathbf{e})=\alpha\sum_{h}P(Q,\mathbf{e},h)$$

**Enumeration** evaluates this directly, repeating many products. **Variable elimination** removes this repetition by working with **factors**:

1. Write each CPT as a factor and **restrict** factors to the observed evidence.
2. For each hidden variable in turn: **multiply** all factors that mention it, then **sum it out** to get a new factor.
3. Multiply the remaining factors and **normalise**.

The cost depends heavily on the elimination order. Networks that are trees (polytrees) allow linear-time inference; in general exact inference is NP-hard.

:::example Variable elimination on a chain
Network $A\to B\to C$, all binary. $P(A)=0.6$; $P(B\mid A)$: 0.7 if $A$ true, 0.2 if false; $P(C\mid B)$: 0.9 if $B$ true, 0.3 if false.

**Query $P(C=T)$.** Eliminate $A$ first: $P(B=T)=0.6(0.7)+0.4(0.2)=0.50$. Then $P(C=T)=0.5(0.9)+0.5(0.3)=0.60$.

**Query $P(A=T\mid C=T)$.** Eliminate $B$ to get the factor $f(A,C=T)=\sum_B P(B\mid A)P(C=T\mid B)$:
- $f(A{=}T)=0.7(0.9)+0.3(0.3)=0.72$
- $f(A{=}F)=0.2(0.9)+0.8(0.3)=0.42$

Multiply by $P(A)$: $0.6\times0.72=0.432$ and $0.4\times0.42=0.168$. Normalise by their sum $0.60$:
$$P(A=T\mid C=T)=\frac{0.432}{0.600}=0.72$$
:::

## Approximate inference by sampling

When exact inference is too costly, estimate probabilities from random samples drawn from the network. All methods below converge to the true answer as the number of samples grows.

| Method | How it works | Weakness |
|---|---|---|
| **Prior (forward) sampling** | Sample each variable in topological order from its CPT given the sampled parents. Estimate $P(x)$ by the fraction of samples with $x$. | Cannot use evidence directly. |
| **Rejection sampling** | Draw prior samples and **discard** those that disagree with the evidence; estimate from the rest. | Wasteful when the evidence is unlikely. |
| **Likelihood weighting** | Fix evidence variables, sample the others, and weight each sample by the product of $P(e_i\mid\text{parents})$ for the evidence. | Weights can be tiny when evidence is late in the order. |
| **Gibbs sampling (MCMC)** | Start from any state consistent with the evidence, repeatedly resample one non-evidence variable given its **Markov blanket**. | Successive samples are correlated. |

In the alarm network, with evidence $J=T,M=T$, a likelihood-weighted sample with $A=T$ gets weight $P(J{=}T\mid A{=}T)\,P(M{=}T\mid A{=}T)=0.9\times0.7=0.63$.

## Explaining away, and what independence does and does not imply

A collider $R\to W\leftarrow S$ (rain, sprinkler, wet lawn) is the key case. Rain and sprinkler are independent with no evidence. Seeing a wet lawn raises the probability of rain. Learning the sprinkler was on then **lowers** it again, because the sprinkler explains the lawn:
$$P(R\mid W)>P(R),\qquad P(R\mid W,S)<P(R\mid W)$$
So observing a collider makes its parents dependent.

- **Marginal independence does not imply conditional independence.** Two fair coin flips $X,Y$ are independent; let $Z$ say whether they matched. Given $Z$, knowing one flip tells you the other.
- **Conditional independence does not imply marginal independence.** Wet grass and a wet pavement are dependent overall, but independent once you know whether it rained.
- **The descendant trap.** A collider is also opened when any **descendant** of it is observed, not only the collider itself. If $Z\to A\to B$, observing $B$ connects the parents of $Z$.

## Independence equivalence and naive Bayes

Two DAGs are **I-equivalent** if they encode the same independence statements. By the Verma and Pearl theorem this holds exactly when they have the **same skeleton** and the **same v-structures** (colliders $X\to Z\leftarrow Y$ with no edge between $X$ and $Y$).

:::example Three structures on X, Y, Z
$G_1:X\to Y\to Z$, $G_2:X\leftarrow Y\to Z$, $G_3:X\to Y\leftarrow Z$. All share the skeleton $X-Y-Z$. $G_1$ and $G_2$ have no v-structure and both say $X\perp Z\mid Y$, so they are I-equivalent. $G_3$ has a collider at $Y$ (marginal independence of $X,Z$, but dependence given $Y$), so it is **not** equivalent to them.
:::

The **naive Bayes** classifier is a Bayesian network with a star shape: class $Y$ is the only parent of every feature $X_i$, so $P(X_1,\dots,X_n\mid Y)=\prod_iP(X_i\mid Y)$. With $n$ binary features and a binary class this needs only $1+2n$ parameters, against $2^{n+1}-1$ for the full joint.

## Worked problems

:::example Counting parameters
Five binary variables with edges $A\to C$, $B\to C$, $C\to D$, $C\to E$. Full joint: $2^5-1=31$. Network: $A$ needs 1, $B$ needs 1, $C$ (two parents) needs 4, $D$ needs 2, $E$ needs 2, total $1+1+4+2+2=10$.
:::

:::example d-separation on a collider with a child
Edges $A\to C$, $B\to C$, $C\to D$. The only path between $A$ and $B$ is $A\to C\leftarrow B$, a collider at $C$.
- Given nothing: blocked, so $A\perp B$ is **true**.
- Given $C$: opened, so $A\perp B\mid C$ is **false**.
- Given $D$ (a descendant of the collider): opened, so $A\perp B\mid D$ is **false**.
:::

:::example Question from GATE DA 2024: which independence is false?
$P(U,V,W,X,Y)=P(U)\,P(V)\,P(W\mid U,V)\,P(X\mid W)\,P(Y\mid W)$. Read the graph from the factors: $U\to W\leftarrow V$, $W\to X$, $W\to Y$. Which is false: (A) $Y\perp V\mid W$, (B) $X\perp U\mid W$, (C) $U\perp V\mid W$, (D) $Y\perp X\mid W$?

(A) and (B) are chains through $W$, blocked once $W$ is observed: true. (D) is a fork at $W$, blocked once $W$ is observed: true. (C) is a **collider** at $W$, and observing $W$ opens the path, so $U$ and $V$ become dependent: false. The answer is **(C)**.
:::

## What the exam asks

- Compute a **joint probability** from CPTs, or a simple marginal or conditional.
- **Count the parameters** of a network versus the full joint.
- Decide whether $X\perp Y\mid Z$ using **d-separation** (watch colliders).
- Carry out **variable elimination** for a small query and give the factors produced.
- Compare **sampling methods**: which discards samples (rejection), which weights them (likelihood weighting), which uses the Markov blanket (Gibbs), which is consistent.
