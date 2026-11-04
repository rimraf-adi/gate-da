---
num: 61
title: Search: Uninformed Strategies
tag: Artificial Intelligence
---
Many AI problems (route finding, puzzles, planning) can be posed as **search**: start in an initial state and look for a sequence of actions that reaches a goal. *Uninformed* (blind) strategies use only the problem definition. They know nothing about how close a state is to the goal.

## Formulating a search problem

:::definition Search problem
A search problem is defined by five parts:
- an **initial state**,
- the **actions** available in each state,
- a **transition model** giving the state that results from an action,
- a **goal test**,
- a **path cost** function, usually a sum of non-negative step costs $c(s,a,s')$.

A **solution** is a path from the initial state to a goal state. An **optimal** solution has the lowest path cost.
:::

The search builds a **search tree**: the root is the initial state, and each node's children are the states reached by one action. Three numbers describe its size:
- $b$ is the **branching factor** (maximum children of a node),
- $d$ is the **depth of the shallowest goal**,
- $m$ is the **maximum depth** of the tree (possibly infinite).

The **frontier** (open list) holds generated nodes not yet expanded. A search strategy is just a rule for which frontier node to expand next.

:::concept Tree search versus graph search
Tree search may reach the same state by several paths and can loop forever on cyclic state spaces. Graph search keeps an **explored set** of expanded states and discards repeats. For exam problems, always state which one is being used, since the node order can differ.
:::

## How strategies are compared

- **Completeness:** is a solution found whenever one exists?
- **Optimality:** is the cheapest solution found first?
- **Time:** number of nodes generated.
- **Space:** maximum number of nodes held in memory.

## Breadth-first search (BFS)

BFS expands the shallowest unexpanded node. The frontier is a **FIFO queue**.

- Complete if $b$ is finite.
- Optimal when all step costs are equal.
- Time and space are both $O(b^{d})$ (strictly $O(b^{d+1})$ if the goal test is applied when a node is expanded rather than generated).

The memory requirement is the real problem: with $b=10$ and $d=10$ it needs on the order of $10^{10}$ nodes.

## Depth-first search (DFS)

DFS expands the deepest unexpanded node. The frontier is a **LIFO stack** (or recursion).

- Not complete in infinite or cyclic spaces (graph-search DFS with an explored set is complete on finite spaces).
- Not optimal: it may return a deep, expensive solution before a shallow one.
- Time $O(b^{m})$, but space only $O(bm)$, because it keeps one path and its siblings.

**Depth-limited search** runs DFS with a fixed depth cut-off $\ell$. It avoids infinite paths but is incomplete if $\ell<d$.

:::example Order of expansion
Consider this tree, with children visited left to right, and goal node $F$.

| Node | Children |
|---|---|
| S | A, B |
| A | C, D |
| B | E, F |

- **BFS** expands: S, A, B, C, D, E, F.
- **DFS** expands: S, A, C, D, B, E, F.

Both reach $F$, but BFS expands 7 nodes and DFS also 7 here; they differ in order, and on a deeper tree DFS can go far down the left branch before ever looking right.
:::

## Uniform-cost search (UCS)

UCS expands the node with the lowest **path cost** $g(n)$ so far. The frontier is a **priority queue** ordered by $g$. It is BFS generalised to unequal step costs.

- Complete and optimal provided every step cost is at least some $\epsilon>0$.
- Time and space $O\!\left(b^{1+\lfloor C^*/\epsilon\rfloor}\right)$, where $C^*$ is the optimal cost.
- The goal test must be applied on **expansion**, not on generation, otherwise a costlier path to the goal can be returned first.

:::example UCS on a weighted graph
Edges: S to A cost 1, S to B cost 5, A to G cost 10, B to G cost 3.

UCS order of expansion: S ($g=0$), A ($g=1$), B ($g=5$), G via B ($g=8$).
The path through A would cost $1+10=11$, so it loses. The returned solution is S, B, G with cost 8.
:::

## Iterative deepening search (IDS)

IDS runs depth-limited search with limits $0,1,2,\dots$ until a goal is found. It combines the small memory of DFS with the completeness and shallowest-goal behaviour of BFS.

- Complete, and optimal when step costs are equal.
- Time $O(b^{d})$, space $O(bd)$.
- It repeats work, but the repeated levels are the cheap ones. Nodes generated:

$$N_{IDS}=(d)\,b+(d-1)\,b^2+\dots+1\cdot b^{d}$$

For $b=10,\ d=5$: $N_{IDS}=50+400+3000+20000+100000=123{,}450$, against $111{,}110$ for BFS. The overhead is only about 11%.

## Comparison

| Strategy | Complete | Optimal | Time | Space |
|---|---|---|---|---|
| BFS | Yes | Yes (equal costs) | $O(b^d)$ | $O(b^d)$ |
| UCS | Yes ($\epsilon>0$) | Yes | $O(b^{1+\lfloor C^*/\epsilon\rfloor})$ | same |
| DFS | No | No | $O(b^m)$ | $O(bm)$ |
| Depth-limited | No ($\ell<d$) | No | $O(b^\ell)$ | $O(b\ell)$ |
| IDS | Yes | Yes (equal costs) | $O(b^d)$ | $O(bd)$ |

## Depth-limited and bidirectional search

**Depth-limited search (DLS)** is DFS with a cut-off $\ell$: nodes at depth $\ell$ are treated as having no successors. It avoids infinite paths, but if $\ell<d$ it misses the goal (incomplete), and if $\ell>d$ it does needless work. Time $O(b^{\ell})$, space $O(b\ell)$.

**Bidirectional search** runs one search forward from the start and one backward from the goal, and stops when the two frontiers meet. Each search only needs depth $d/2$, so time and space are $O(b^{d/2})$.

:::example How much does meeting in the middle save?
With $b=10$ and $d=6$, one-directional BFS generates about $10^6$ nodes, while two searches of depth 3 generate about $2\times10^3=2000$. The method needs reversible actions (or a way to list predecessors) and an explicit goal state. With breadth-first search in both directions and equal step costs it is complete and optimal.
:::

## Why iterative deepening is usually preferred

Most nodes of an exponential tree sit in the bottom level, so repeating the upper levels costs little. Counting nodes generated:
$$N_{BFS}\approx\frac{b^{d+1}-1}{b-1}\qquad N_{IDS}=(d+1)+d\,b+(d-1)\,b^2+\dots+b^d\approx\frac{b^{d+1}}{(b-1)^2}$$
$$\frac{N_{IDS}}{N_{BFS}}\approx\frac{b}{b-1}\ \ (\approx1.11\text{ for }b=10)$$
Iterative deepening does only about 11% more work than BFS, but it needs $O(bd)$ memory instead of $O(b^d)$: gigabytes become kilobytes.

## Two traps

- **When to test for the goal.** BFS may test a node when it is **generated**: the first generated goal is at the shallowest depth, and this saves generating the whole next level. UCS must test only when a node is **expanded** (popped), because a goal generated along an expensive path may later be reached more cheaply.
- **State versus node.** A *state* is a configuration of the world; a *node* is a data structure holding a state, a parent, the action, the path cost and the depth. Different nodes can hold the same state when several paths reach it.

## Worked problems

:::example UCS expansion order
Edges: S to A 2, S to B 5, A to C 4, A to B 2, B to G 3, C to G 1. Goal G.

1. Expand S ($g=0$): A has $g=2$, B has $g=5$.
2. Expand A ($g=2$): C has $g=6$; B via A has $g=4$, better than 5, so B is updated to 4.
3. Expand B ($g=4$): G has $g=7$. Frontier: C (6), G (7).
4. Expand C ($g=6$): G via C also costs 7. Frontier: G (7).
5. Expand G: goal.

Order of expansion: **S, A, B, C, G**. Optimal cost **7**, by S, A, B, G or by S, A, C, G.
:::

:::example Question from GATE DA 2024: BFS versus DFS
States are numbers, the start is 1, and the successors of $n$ are $n+1$ and $n+2$. The unexpanded list is always expanded in **ascending order**, and expanded states are never added again. The goal is 6. Which is true: BFS expands more, DFS expands more, or both expand the same number?

- **BFS:** expand 1 (adds 2, 3), 2 (adds 4), 3 (adds 5), 4 (adds 6), 5. Then 6 is taken and the goal test succeeds. States expanded: 1, 2, 3, 4, 5, which is **5**.
- **DFS** under the same rule (always take the smallest unexpanded state): the list is [2,3] after 1, then 2 is expanded giving [3,4], then 3 giving [4,5], then 4 giving [5,6], then 5 giving [6,7]; 6 is then taken. States expanded: 1, 2, 3, 4, 5, again **5**.

Both expand exactly the same states, so the answer is **(C)**. The ordering rule in the question is what makes DFS behave like BFS here.
:::

## What the exam asks

- The **order in which nodes are expanded** for BFS, DFS or UCS on a small graph. Use alphabetical order for ties unless told otherwise.
- Which strategy is **complete or optimal** under stated conditions, and which has the smallest space.
- The **number of nodes expanded or generated**, which depends on whether goal testing happens at generation or expansion.
- Tie-breaking and repeated-state handling change the answer, so read the question's convention first.
