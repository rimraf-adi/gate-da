## 202423
- A heuristic is admissible if $0\le h(n)\le h^*(n)$ for every node. Both $h_1$ and $h_2$ satisfy this.
- **A.** $h_1+h_2$ can exceed $h^*$ (for example $h^*=10$ with $h_1=8,\ h_2=7$ gives 15). Not admissible.
- **B.** $h_1\times h_2$ can exceed $h^*$ when the values are large (for example $4\times4=16>h^*=10$). Not admissible.
- **C.** $h_1/h_2$ is unbounded when $h_2$ is small. Not admissible.
- **D.** $|h_1-h_2|\le\max(h_1,h_2)\le h^*$ because both are non-negative and at most $h^*$. Always admissible.
- Answer: **D**

## 202424
- Read the graph from the factors: $P(W\mid U,V)$ gives $U\to W\leftarrow V$; $P(X\mid W)$ gives $W\to X$; $P(Y\mid W)$ gives $W\to Y$.
- (A) $V\to W\to Y$ is a chain. Observing $W$ blocks it, so $Y\perp V\mid W$ is true.
- (B) $U\to W\to X$ is a chain, blocked by $W$: true.
- (D) $X\leftarrow W\to Y$ is a fork, blocked by $W$: true.
- (C) $U\to W\leftarrow V$ is a **collider**. Observing $W$ opens the path, so $U$ and $V$ become dependent (explaining away). The statement is false.
- Answer: **C**

## 202425
- $\alpha$ is the best (highest) value found so far for MAX along the path. It starts at $-\infty$ and only rises: $\alpha\leftarrow\max(\alpha,v)$.
- $\beta$ is the best (lowest) value found so far for MIN along the path. It starts at $+\infty$ and only falls: $\beta\leftarrow\min(\beta,v)$.
- So (m) is **highest** and (n) is **lowest**.
- Answer: **C**

## 202429
- A statement $(a)\Rightarrow(b)$ is a tautology if it is never true-then-false. Check each premise for when it is true.
- **A.** $\neg x\wedge y$ is true only for $x=F,\ y=T$. Then $y\Rightarrow x$ is $T\Rightarrow F$, which is false. So A is not a tautology.
- **B.** $x\wedge\neg y$ is true only for $x=T,\ y=F$. Then $\neg x\Rightarrow y$ is $F\Rightarrow F$, which is true. Tautology.
- **C.** $\neg x\wedge y$ is true only for $x=F,\ y=T$. Then $\neg x\Rightarrow y$ is $T\Rightarrow T$, true. Tautology.
- **D.** $x\wedge\neg y$ is true only for $x=T,\ y=F$. Then $y\Rightarrow x$ is $F\Rightarrow T$, true. Tautology.
- Answer: **B, C, D**

## 202444
- Start state 1; the successors of $n$ are $n+1$ and $n+2$; the unexpanded list is always expanded in ascending order; expanded states are not added again; the goal is 6.
- **BFS:** expand 1 (adds 2, 3), 2 (adds 4), 3 (adds 5), 4 (adds 6), 5. Then 6 is taken and the goal test succeeds. Expanded: 1, 2, 3, 4, 5.
- **DFS** under the same rule always takes the smallest unexpanded state, so it expands 1, then 2, 3, 4, 5 and then takes 6. Expanded: 1, 2, 3, 4, 5.
- Both expand the same 5 states.
- Answer: **C**

## 202451
- Edges: $P\to Q$, $R\to Q$, $Q\to S$, $Q\to V$, $S\to U$, $V\to T$. A valid topological order puts $P$ and $R$ before $Q$; $Q$ before $S$ and $V$; $S$ before $U$; $V$ before $T$.
- **A.** P Q R S T U V: $Q$ comes before $R$, but $R\to Q$. Invalid.
- **B.** P R Q V S U T: $P,R$ then $Q$, then $V,S$, then $U$ (after $S$) and $T$ (after $V$). Valid.
- **C.** P Q R S V U T: $Q$ before $R$. Invalid.
- **D.** P R Q S V T U: $P,R,Q$, then $S,V$, then $T$ (after $V$) and $U$ (after $S$). Valid.
- Answer: **B, D**

## 202454
- "All balls are round except balls used in rugby" says two things: a ball that is **not** used in rugby is round, and a ball used in rugby is **not** round.
- $s_1$: not rugby $\Rightarrow$ round. This is the first part.
- $s_3$: rugby $\Rightarrow$ not round. This is the second part.
- $s_2$ (not round $\Rightarrow$ rugby) is the contrapositive of $s_1$, so $s_2\equiv s_1$. $s_4$ (round $\Rightarrow$ not rugby) is the contrapositive of $s_3$, so $s_4\equiv s_3$.
- A correct representation needs one sentence from each pair: $s_1\wedge s_3$ and $s_2\wedge s_3$ work. $s_1\wedge s_2$ says only the first part, and $s_3\wedge s_4$ says only the second.
- Answer: **A, C**

## 202464
- The network is $U\to V$, $U\to W$, $V\to Z$, $W\to Z$, so $P(U,V,W,Z)=P(U)\,P(V\mid U)\,P(W\mid U)\,P(Z\mid V,W)$.
- Read the tables: $P(U{=}1)=0.5$; $P(V{=}1\mid U{=}1)=0.5$; $P(W{=}1\mid U{=}1)=1$; $P(Z{=}1\mid V{=}1,W{=}1)=0.5$.
- $P(U{=}1,V{=}1,W{=}1,Z{=}1)=0.5\times0.5\times1\times0.5=0.125$.
- Answer: **0.125**

## 202515
- $S_1=p\to q\equiv\neg p\vee q$, which is exactly $S_3$.
- $S_2=\neg p\wedge q$ and $S_4=\neg p\vee\neg q$ are different: at $p=F,\ q=T$, $S_2$ is true and $S_4$ is true, but at $p=F,\ q=F$, $S_2$ is false and $S_4$ is true. So $S_2\not\equiv S_4$, and $S_2\not\equiv S_3$ (at $p=F,\ q=F$, $S_3$ is true and $S_2$ is false). $S_1\not\equiv S_4$ (at $p=T,\ q=T$, $S_1$ is true and $S_4$ is false).
- Answer: **A**

## 202526
- (A) Variable elimination is an **exact** inference algorithm, so this is false.
- (B) Gibbs sampling is an **approximate** (MCMC) method, so this is false.
- (C) Variable elimination computes conditional probabilities exactly, by summing out hidden variables and normalising. True.
- (D) Rejection sampling is an approximate method based on random samples. True.
- Answer: **C, D**

## 202543
- **Tree 1.** MAX root A has a leaf 2 and a MIN child B. After the first leaf, $\alpha=2$. At B the first child $x$ gives $\beta=x$. The right child of B is pruned when $\beta\le\alpha$, that is when $x\le2$, so $x\in(-\infty,2]$.
- **Tree 2.** MAX root C has MIN children D (leaves 5, $y$) and E (leaves 2, then a pruned subtree). D evaluates to $\min(5,y)$, so at the root $\alpha=\min(5,y)$. At E the first leaf 2 gives $\beta=2$. The right child of E is pruned when $2\le\alpha=\min(5,y)$, which needs $y\ge2$, so $y\in[2,\infty)$.
- Answer: **C**

## 202544
- Edge costs: S to A 4, S to E 1, A to B 2, B to C 2, E to C 2, C to D 3, D to G 3. Heuristics: $h(A)=2$, $h(B)=2$, $h(C)=6$, $h(D)=2$, $h(E)=6$, $h(G)=0$. Expand the lowest $f=g+h$.
- Expand S: A has $g=4,\ f=6$; E has $g=1,\ f=7$. Pop A (6).
- Expand A: B has $g=6,\ f=8$. Frontier: E (7), B (8). Pop E (7).
- Expand E: C has $g=3,\ f=9$. Frontier: B (8), C (9). Pop B (8).
- Expand B: C via B has $g=8,\ f=14$, which is worse than 9, so it is ignored. Pop C (9).
- Expand C: D has $g=6,\ f=8$. Pop D. Expand D: G has $g=9,\ f=9$. Pop G.
- Order: S, A, E, B, C, D, G.
- Answer: **C**

## 202613
- Breadth-first, depth-first and depth-limited search use only the problem definition, so they are uninformed.
- A* uses a heuristic $h(n)$ to guide the search, so it is **informed**.
- Answer: **C**

## 202624
- $X$ entails $Y$ means that in every model where $X$ is true, $Y$ is true. That is the same as saying $X\Rightarrow Y$ is valid, and the same as "$X\wedge\neg Y$ is never true" (always false).
- (A) $X\Rightarrow Y$: correct. (B) $X\wedge\neg Y$ is false: correct. (C) "if $X$ then $Y$": correct.
- (D) "if $Y$ then $X$" is the converse. It does not follow.
- Answer: **A, B, C**

## 202630
- Each MIN node takes the **smallest** of its three leaves: strategy 1 leads to $\min(8,6,-1)=-1$; strategy 2 to $\min(1,5,7)=1$; strategy 3 to $\min(-4,-3,-12)=-12$.
- MAX takes the largest of these values, $\max(-1,1,-12)=1$, which comes from **strategy 2**.
- Answer: **2**

## 202638
- Assumption: a creative person succeeds exactly when disciplined, which is $C\Rightarrow(S\Leftrightarrow D)$.
- (ii) $C\Rightarrow(S\Leftrightarrow D)$ is exactly this assumption. True.
- (i) $(C\wedge S)\Leftrightarrow D$: take $C=F$ (not creative), $D=T$. The assumption says nothing about non-creative people, and then $C\wedge S$ is false while $D$ is true, so (i) fails. Not necessarily true.
- (iii) $(D\Rightarrow S)\vee\neg S\equiv\neg D\vee S\vee\neg S\equiv$ True, so (iii) reads $C\Leftrightarrow$ True, which would force $C$ to be always true. Not necessarily true.
- Only (ii) is true.
- Answer: **B**

## 202648
- Assume a non-empty domain, as first-order logic does.
- **A.** $\forall x\,P(x)\Rightarrow\exists x\,P(x)$: if every object satisfies $P$, some object does. Valid.
- **B.** $\exists x\,P(x)\Rightarrow\forall x\,P(x)$: one object satisfying $P$ does not force all to. Not valid.
- **C.** $\exists x\,P(x)\Leftrightarrow\forall x\,P(x)$: this needs B in one direction. Not valid.
- **D.** $\forall x\,P(x)\Rightarrow\exists x\,\neg P(x)$: if all satisfy $P$, none satisfies $\neg P$, so the conclusion is false while the premise is true. Not valid.
- Not valid: B, C, D.
- Answer: **B, C, D**
