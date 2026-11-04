---
num: 62
title: Search: Informed Strategies and A*
tag: Artificial Intelligence
---
Informed search uses problem-specific knowledge, a **heuristic** $h(n)$, which estimates the cost of the cheapest path from node $n$ to a goal. A good heuristic points the search toward the goal and cuts the number of nodes expanded.

## Heuristics and evaluation functions

:::definition Heuristic function
$h(n)$ is an estimate of the remaining cost from $n$ to the nearest goal, with $h(\text{goal})=0$. The true remaining cost is written $h^*(n)$.
:::

Informed strategies expand the frontier node with the smallest value of an **evaluation function** $f(n)$:

| Strategy | $f(n)$ | Uses |
|---|---|---|
| Uniform-cost | $g(n)$ | cost so far |
| Greedy best-first | $h(n)$ | estimated cost to go |
| A* | $g(n)+h(n)$ | estimated total cost through $n$ |

## Greedy best-first search

Greedy search expands the node that looks closest to the goal, ignoring the cost already paid. It is fast but neither optimal nor (in tree search) complete: it can follow a promising-looking path that turns out expensive or loops.

## A* search

A* expands the node with the smallest $f(n)=g(n)+h(n)$. Here $g(n)$ is the exact cost from the start to $n$ and $h(n)$ the estimate to the goal, so $f(n)$ estimates the cheapest solution that passes through $n$.

The frontier is a **priority queue ordered by $f$**. If a cheaper path to a node already in the frontier is found, its $g$ (and so $f$) is updated.

## Admissible and consistent heuristics

:::definition Admissible
$h$ is **admissible** if it never overestimates the true cost: $h(n)\le h^*(n)$ for every node $n$.
:::

:::definition Consistent (monotone)
$h$ is **consistent** if for every node $n$ and every successor $n'$ reached by action $a$:
$$h(n)\le c(n,a,n')+h(n')$$
This is a triangle inequality. It also requires $h(\text{goal})=0$.
:::

- **Every consistent heuristic is admissible.** The converse is false.
- With a consistent $h$, the value $f$ never decreases along any path, and the first time A* expands a node it has already found the cheapest path to it.

:::concept Optimality of A*
- **Tree search:** A* is optimal if $h$ is admissible.
- **Graph search:** A* is optimal if $h$ is consistent (admissibility alone can discard a better path to a repeated state).
- A* is **complete** on finite graphs with positive step costs.
- Space is the weak point: A* keeps all generated nodes, so memory grows exponentially.
:::

**Why admissibility gives optimality.** Suppose A* is about to return a suboptimal goal $G_2$ with cost $g(G_2)>C^*$. Some node $n$ on the optimal path is still in the frontier, with $f(n)=g(n)+h(n)\le g(n)+h^*(n)=C^*<g(G_2)=f(G_2)$. So $n$ would be expanded before $G_2$, a contradiction.

## Worked example

:::example A* trace
Edges (undirected costs): S-A 1, S-B 4, A-B 2, A-C 5, A-G 12, B-C 2, C-G 3.
Heuristic: $h(S)=7,\ h(A)=6,\ h(B)=4,\ h(C)=2,\ h(G)=0$.

Check consistency on a few edges: $h(S)=7\le 1+h(A)=7$ ✓, $h(A)=6\le 2+h(B)=6$ ✓, $h(B)=4\le 2+h(C)=4$ ✓, $h(C)=2\le 3+h(G)=3$ ✓. It is consistent.

| Step | Expand | Frontier after expansion (node: $g+h=f$) |
|---|---|---|
| 1 | S | A: 1+6=7, B: 4+4=8 |
| 2 | A (f=7) | B: 3+4=7 (improved from 8), C: 6+2=8, G: 13+0=13 |
| 3 | B (f=7) | C: 5+2=7 (improved from 8), G: 13 |
| 4 | C (f=7) | G: 8+0=8 (improved from 13) |
| 5 | G (f=8) | goal reached |

Order of expansion: **S, A, B, C, G**. Optimal path S, A, B, C, G with cost $1+2+2+3=8$.
:::

## Comparing heuristics

If $h_2(n)\ge h_1(n)$ for all $n$ and both are admissible, $h_2$ **dominates** $h_1$. A* with $h_2$ never expands more nodes than A* with $h_1$ (apart from ties). Larger admissible values are better, as long as they stay admissible.

- If $h_1,h_2$ are admissible, then $\max(h_1,h_2)$ is admissible and dominates both.
- $h=0$ is admissible and turns A* into uniform-cost search.
- $h=h^*$ would be perfect: A* expands only nodes on an optimal path.

**Designing heuristics by relaxation.** Take the exact cost of a *relaxed* (easier) version of the problem. For the 8-puzzle:
- **Misplaced tiles:** count of tiles not in their goal position (relaxation: a tile can jump anywhere).
- **Manhattan distance:** sum over tiles of horizontal plus vertical distance to the goal square (relaxation: a tile can move onto an occupied square). It dominates misplaced tiles.

## Summary

| | Greedy | A* | UCS |
|---|---|---|---|
| Evaluates | $h$ | $g+h$ | $g$ |
| Optimal | No | Yes (admissible for tree search, consistent for graph search) | Yes |
| Complete | No (tree search) | Yes (finite graph, positive costs) | Yes |

## Why consistency implies admissibility

Let $n=n_0,n_1,\dots,n_k=G$ be an optimal path from $n$ to a goal, so $h^*(n)=\sum_{i=0}^{k-1}c(n_i,n_{i+1})$. Consistency applied to every step gives
$$h(n_0)\le c(n_0,n_1)+h(n_1),\ \ h(n_1)\le c(n_1,n_2)+h(n_2),\ \ \dots,\ \ h(n_{k-1})\le c(n_{k-1},n_k)+h(n_k)$$
Add them up; the middle terms cancel (the sum **telescopes**), and $h(n_k)=h(G)=0$, so
$$h(n)\le\sum_{i=0}^{k-1}c(n_i,n_{i+1})=h^*(n)$$

## Why admissibility is not enough for graph search

If $h$ is admissible but not consistent, $f$ can **decrease** along a path. A* may then expand a node through an expensive path and put it in the closed list; when a cheaper path to it appears later, a closed list that blocks revisits keeps the worse cost and returns a non-optimal answer. To stay optimal you must **reopen** a closed node whenever you find a lower $g$, which loses the clean efficiency guarantees. With a consistent heuristic, $f$ never decreases, nodes are expanded with their optimal $g$, and nothing is reopened.

**Relaxed problems.** The exact cost of a relaxed problem is both admissible and consistent: every solution of the real problem is also a solution of the relaxed one, so the relaxed optimum is no larger, and it satisfies the triangle inequality in the relaxed graph.

## Pattern databases and IDA*

A **pattern database** stores the exact precomputed cost of solving a sub-problem (for example, bringing tiles 1 to 4 of the 15-puzzle home while ignoring the others). Adding the values of several databases is admissible **only if the subproblems are disjoint** and every move is counted in one partition only; otherwise shared moves are counted twice and the sum can overestimate.

**IDA\*** (iterative deepening A*) is depth-first search whose cut-off is the $f$-value, not the depth. Each round uses as the new cut-off the smallest $f$ that exceeded the previous one. It needs only $O(bd)$ memory and, with an admissible $h$, is complete and optimal, at the price of re-expanding nodes.

## Worked problems

:::example Admissible? Consistent?
Nodes S, A, G with $c(S,A)=3$, $c(A,G)=4$, $c(S,G)=8$, and $h(S)=6$, $h(A)=5$, $h(G)=0$.

True costs: $h^*(A)=4$; $h^*(S)=\min(8,\,3+4)=7$.
- **Admissible?** $h(S)=6\le7$ and $h(G)=0$ are fine, but $h(A)=5>h^*(A)=4$. **Not admissible.**
- **Consistent?** On edge A to G: $h(A)\le c(A,G)+h(G)$ means $5\le4$, which is false. Consistency implies admissibility, so this had to fail. **Not consistent.**
:::

:::example Combining admissible heuristics (practice question)
$h_1,h_2$ are admissible. Which are always admissible: (I) $\max(h_1,h_2)$, (II) $\min(h_1,h_2)$, (III) $w h_1+(1-w)h_2$ for $0\le w\le1$, (IV) $h_1+h_2$?

- (I) Both are at most $h^*$, so their maximum is too. It also dominates both, which makes it the best choice.
- (II) The minimum is at most the maximum, so it is admissible (but less informed).
- (III) A weighted average is at most $w h^*+(1-w)h^*=h^*$.
- (IV) False. If $h^*=10$, $h_1=8$ and $h_2=7$ are both admissible but their sum $15>10$.

So **I, II and III** only.
:::

## What the exam asks

- **Trace A*** and give the order of expansion or the final path.
- **Check admissibility or consistency** of a given $h$. For consistency check every edge; for admissibility compare with true remaining costs.
- Say which of two heuristics gives fewer expansions (the larger admissible one).
- Which statements are true: for example "a consistent heuristic is admissible" (true) and "an admissible heuristic is consistent" (false).
