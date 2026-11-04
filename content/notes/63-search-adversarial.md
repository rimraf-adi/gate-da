---
num: 63
title: Adversarial Search: Minimax and Alpha-Beta
tag: Artificial Intelligence
---
In a two-player game, one player's gain is the other's loss. Adversarial search chooses a move assuming the opponent also plays as well as possible. We consider **deterministic, two-player, zero-sum games with perfect information** (tic-tac-toe, chess, Nim).

## Game trees

A game is defined by an initial state, the player to move, the legal moves, a transition model, a terminal test and a **utility** for terminal states.

- **MAX** moves to maximise the utility; **MIN** moves to minimise it.
- The **game tree** alternates levels of MAX and MIN nodes. A *ply* is one level (one player's move).
- Leaf values are the utility from MAX's point of view.

## Minimax

:::definition Minimax value
$$\text{MINIMAX}(s)=\begin{cases}\text{UTILITY}(s) & s \text{ terminal}\\ \max_{a}\text{MINIMAX}(\text{RESULT}(s,a)) & \text{MAX to move}\\ \min_{a}\text{MINIMAX}(\text{RESULT}(s,a)) & \text{MIN to move}\end{cases}$$
:::

The algorithm is a depth-first traversal that backs values up from the leaves: a MAX node takes the **largest** child value, a MIN node the **smallest**.

- Complete for finite trees; optimal against an optimal opponent.
- Time $O(b^{m})$, space $O(bm)$ (depth-first).

:::example Minimax by hand
The root is a MAX node with three MIN children B, C, D. Leaf values left to right:

| MIN node | Leaves | Value (minimum) |
|---|---|---|
| B | 3, 12, 8 | 3 |
| C | 2, 4, 6 | 2 |
| D | 14, 5, 2 | 2 |

The root takes the maximum of 3, 2, 2, so its value is **3**, reached by moving to B.
:::

## Alpha-beta pruning

Minimax examines every node, which is far too many for real games. Alpha-beta pruning returns **exactly the same value** while skipping branches that cannot affect the decision.

Two bounds are carried down the tree:
- $\alpha$: the best (highest) value MAX can already guarantee along the path to the root. Initially $-\infty$.
- $\beta$: the best (lowest) value MIN can already guarantee along the path. Initially $+\infty$.

:::concept Pruning rule
At any node, stop examining its remaining children as soon as $\alpha\ge\beta$.
- At a **MIN** node: once its value drops to $\le\alpha$, MAX already has a better option elsewhere, so the rest is irrelevant (an *alpha cut-off*).
- At a **MAX** node: once its value rises to $\ge\beta$, MIN will never allow this node to be reached (a *beta cut-off*).
:::

:::example Alpha-beta on the same tree
Visit B, C, D left to right, leaves left to right.

1. **B:** leaves 3, 12, 8. The MIN value is 3. At the root, $\alpha=3$.
2. **C:** first leaf is 2, so C's value is at most 2, and $2\le\alpha=3$. **Prune the remaining leaves 4 and 6.** C is reported as 2.
3. **D:** leaf 14 gives $\beta=14$, then 5 gives $\beta=5$, then 2 gives $\beta=2$. Now $2\le 3$ but no leaves remain. D is 2.
4. Root value: $\max(3,2,2)=3$.

**Leaves pruned: 2** (the values 4 and 6).
:::

**Move ordering matters.** Pruning depends on the order children are visited. If D's leaves are visited as 2, 5, 14 instead, then after the first leaf 2 we have $2\le\alpha=3$ and the leaves 5 and 14 are pruned too, for 4 pruned in total. The root value is still 3.

- Pruning never changes the root value, only the work done.
- With perfect ordering, alpha-beta examines $O(b^{m/2})$ nodes, so it can search about **twice as deep** in the same time. With random ordering it is about $O(b^{3m/4})$.
- With the worst ordering it prunes nothing and equals minimax.

## Practical points

- Real games are too deep to search to terminal states, so a **depth limit** with a heuristic **evaluation function** replaces terminal utilities.
- Games with chance (dice) need **expectiminimax**, which adds chance nodes that take the average. Alpha-beta applies only to the deterministic case here.

## The algorithm and how much it saves

:::concept Pseudocode
- `MaxValue(state, α, β)`: if terminal return its utility. Set $v=-\infty$. For each child: $v=\max(v,\text{MinValue}(\text{child},\alpha,\beta))$; **if $v\ge\beta$ return $v$** (beta cut-off); $\alpha=\max(\alpha,v)$. Return $v$.
- `MinValue(state, α, β)`: if terminal return its utility. Set $v=+\infty$. For each child: $v=\min(v,\text{MaxValue}(\text{child},\alpha,\beta))$; **if $v\le\alpha$ return $v$** (alpha cut-off); $\beta=\min(\beta,v)$. Return $v$.
:::

How many leaves are examined depends on move ordering. For branching factor $b$ and (even) depth $d$:

| Ordering | Leaves evaluated |
|---|---|
| Best (best moves first) | $2b^{d/2}-1$, so time $O(b^{d/2})$ |
| Random | about $b^{3d/4}$ |
| Worst (worst moves first) | $b^{d}$ (no pruning at all) |

:::example Best-case count
For $b=3$ and $d=4$: best case $2\cdot3^2-1=17$ leaves, worst case $3^4=81$.
:::

## Evaluation functions and the horizon effect

Real games are too deep to search to the end, so the tree is cut at depth $d$ and each position is scored by an **evaluation function**, typically a weighted sum of features: $\text{Eval}(s)=w_1f_1(s)+\dots+w_nf_n(s)$ (in chess: material, mobility, king safety).

The **horizon effect** appears when an unavoidable loss is pushed beyond the search depth by a series of delaying moves. The program sees the loss "disappear" and wrongly prefers the stalling line.

## Worked problem

:::example Tracing alpha-beta
Root A is MAX with MIN children B (leaves 4, 6, 2) and C (leaves 5, 1, 8), visited left to right.

1. Start with $\alpha=-\infty,\ \beta=+\infty$. At B: 4 gives $v=4$; 6 gives $v=4$; 2 gives $v=2$. B returns 2.
2. At the root $\alpha=\max(-\infty,2)=2$.
3. At C ($\alpha=2$): the leaf 5 gives $\beta=5$, and $2\ge5$ is false. The leaf 1 gives $v=1,\ \beta=1$, and now $\alpha\ge\beta$ ($2\ge1$): **alpha cut-off.**
4. The leaf **8 is pruned**. C returns 1; the root takes $\max(2,1)=2$.

Root value **2** (MAX moves to B); the pruned leaf is the one with value 8.
:::

:::example Question from GATE DA 2024: what are alpha and beta?
In $\alpha$-$\beta$ pruning, $\alpha$ is the (m) value choice found so far for MAX along the path and $\beta$ is the (n) value choice found so far for MIN. $\alpha$ tracks the best guaranteed score for MAX, so it is the **highest** value and only ever rises. $\beta$ tracks the best guaranteed score for MIN, so it is the **lowest** value and only ever falls. So (m) is highest and (n) is lowest: option **(C)**.
:::

## What the exam asks

- The **minimax value** of the root, and which move MAX should choose.
- **Which leaves or subtrees are pruned** by alpha-beta for a given tree and left-to-right order, and how many.
- The effect of **reordering children** on the amount of pruning (the root value does not change).
- True/false: alpha-beta gives the same answer as minimax (true); pruning depends on ordering (true).
- When you trace alpha-beta, write $(\alpha,\beta)$ next to every node as you go, and update on the way back up.
