---
num: 64
title: Propositional Logic
tag: Artificial Intelligence
---
Logic gives an AI system a precise language for facts and a way to derive new facts from them. **Propositional logic** talks about statements that are simply true or false.

## Syntax

- An **atom** is a proposition symbol such as $P$, $Q$, $Rain$.
- If $\alpha,\beta$ are sentences, so are $\neg\alpha$ (not), $\alpha\land\beta$ (and), $\alpha\lor\beta$ (or), $\alpha\to\beta$ (implies) and $\alpha\leftrightarrow\beta$ (if and only if).
- Precedence from tightest to loosest: $\neg,\ \land,\ \lor,\ \to,\ \leftrightarrow$. Use brackets whenever in doubt.

## Semantics: truth tables

A **model** assigns true or false to every atom. A sentence's truth value in a model follows from these tables:

| $P$ | $Q$ | $\neg P$ | $P\land Q$ | $P\lor Q$ | $P\to Q$ | $P\leftrightarrow Q$ |
|---|---|---|---|---|---|---|
| T | T | F | T | T | T | T |
| T | F | F | F | T | F | F |
| F | T | T | F | T | T | F |
| F | F | T | F | F | T | T |

The implication $P\to Q$ is false in exactly one case: $P$ true and $Q$ false. When $P$ is false it is true regardless of $Q$.

:::definition Key semantic notions
- **Valid (tautology):** true in every model.
- **Satisfiable:** true in at least one model.
- **Unsatisfiable (contradiction):** true in no model.
- $\alpha\equiv\beta$ (**equivalent**): same truth value in every model.
- $KB\models\alpha$ (**entails**): $\alpha$ is true in every model where all sentences of $KB$ are true.
:::

Useful links: $\alpha$ is valid iff $\neg\alpha$ is unsatisfiable. And $KB\models\alpha$ iff $KB\land\neg\alpha$ is **unsatisfiable**. With $n$ atoms there are $2^n$ models, which is why truth tables are practical only for small $n$.

## Standard equivalences

| Law | Equivalence |
|---|---|
| Double negation | $\neg\neg\alpha\equiv\alpha$ |
| De Morgan | $\neg(\alpha\land\beta)\equiv\neg\alpha\lor\neg\beta$, $\ \neg(\alpha\lor\beta)\equiv\neg\alpha\land\neg\beta$ |
| Implication elimination | $\alpha\to\beta\equiv\neg\alpha\lor\beta$ |
| Contrapositive | $\alpha\to\beta\equiv\neg\beta\to\neg\alpha$ |
| Biconditional | $\alpha\leftrightarrow\beta\equiv(\alpha\to\beta)\land(\beta\to\alpha)$ |
| Distribution | $\alpha\land(\beta\lor\gamma)\equiv(\alpha\land\beta)\lor(\alpha\land\gamma)$ and the dual |
| Commutative, associative | for $\land$ and $\lor$ |
| Negated implication | $\neg(\alpha\to\beta)\equiv\alpha\land\neg\beta$ |

**Not equivalent:** $\alpha\to\beta$ and its **converse** $\beta\to\alpha$; and $\alpha\to\beta$ and its **inverse** $\neg\alpha\to\neg\beta$.

## Translating English

| English | Logic |
|---|---|
| $P$ if $Q$ | $Q\to P$ |
| $P$ only if $Q$ | $P\to Q$ |
| $P$ if and only if $Q$ | $P\leftrightarrow Q$ |
| $P$ unless $Q$ | $\neg Q\to P$ (equivalently $P\lor Q$) |
| $P$ is necessary for $Q$ | $Q\to P$ |
| $P$ is sufficient for $Q$ | $P\to Q$ |
| Neither $P$ nor $Q$ | $\neg P\land\neg Q$ |

## Inference rules

| Rule | Premises | Conclusion |
|---|---|---|
| Modus ponens | $\alpha,\ \alpha\to\beta$ | $\beta$ |
| Modus tollens | $\neg\beta,\ \alpha\to\beta$ | $\neg\alpha$ |
| Hypothetical syllogism | $\alpha\to\beta,\ \beta\to\gamma$ | $\alpha\to\gamma$ |
| Disjunctive syllogism | $\alpha\lor\beta,\ \neg\alpha$ | $\beta$ |
| And-elimination | $\alpha\land\beta$ | $\alpha$ |
| Resolution | $\alpha\lor\beta,\ \neg\beta\lor\gamma$ | $\alpha\lor\gamma$ |

A common fallacy is **affirming the consequent**: from $\alpha\to\beta$ and $\beta$, you may *not* conclude $\alpha$.

## Conjunctive normal form and resolution

A sentence is in **CNF** if it is a conjunction of clauses, each clause a disjunction of literals. Any sentence can be converted:

1. Eliminate $\leftrightarrow$ and $\to$.
2. Push $\neg$ inward with De Morgan and double negation.
3. Distribute $\lor$ over $\land$.

**Resolution refutation** proves $KB\models\alpha$ by adding $\neg\alpha$ to the clauses of $KB$ and repeatedly resolving pairs until the empty clause appears. The empty clause means a contradiction, so $KB\land\neg\alpha$ is unsatisfiable.

:::example Proving R by resolution
KB: $P\to Q$, $\ Q\to R$, $\ P$. Query: $R$.

Clauses: $\neg P\lor Q$, $\ \neg Q\lor R$, $\ P$, and the negated query $\neg R$.

1. Resolve $\neg P\lor Q$ with $P$: gives $Q$.
2. Resolve $\neg Q\lor R$ with $Q$: gives $R$.
3. Resolve $R$ with $\neg R$: gives the **empty clause**.

So $KB\models R$.
:::

## Worked checks

:::example Is it a tautology?
$((p\to q)\land(q\to r))\to(p\to r)$. Suppose it is false. Then the premise is true and $p\to r$ is false, so $p=T,\ r=F$. From $p\to q$ true, $q=T$. Then $q\to r$ is $T\to F$, false. This contradicts the premise, so the sentence **cannot be false**: it is a tautology (hypothetical syllogism).
:::

:::example Counting models
How many assignments of $p,q,r$ satisfy $(p\lor q)\land(\neg p\lor r)$?
- $p=T$: the second clause forces $r=T$; $q$ is free. That gives 2 models.
- $p=F$: the first clause forces $q=T$; $r$ is free. That gives 2 models.

Total **4** models out of 8.
:::

## CNF and DNF

A **literal** is an atom or its negation. **CNF** is an AND of clauses (each clause an OR of literals); **DNF** is an OR of conjunctions of literals. Any sentence converts to CNF in four mechanical steps, in order:

1. Eliminate $\leftrightarrow$: $A\leftrightarrow B$ becomes $(A\to B)\land(B\to A)$.
2. Eliminate $\to$: $A\to B$ becomes $\neg A\lor B$.
3. Push $\neg$ inward with De Morgan and double negation.
4. Distribute $\lor$ over $\land$: $A\lor(B\land C)\equiv(A\lor B)\land(A\lor C)$.

:::example Convert $(P\to Q)\to R$ to CNF
$(P\to Q)\to R\ \equiv\ \neg(\neg P\lor Q)\lor R\ \equiv\ (P\land\neg Q)\lor R\ \equiv\ (P\lor R)\land(\neg Q\lor R)$.
The CNF has two clauses, $\{P,R\}$ and $\{\neg Q,R\}$. Its DNF form is $(P\land\neg Q)\lor R$ (the line before distributing).
:::

## Horn clauses and chaining

- A **definite clause** has exactly one positive literal: $(\neg P_1\lor\dots\lor\neg P_k\lor Q)\equiv(P_1\land\dots\land P_k)\to Q$.
- A **Horn clause** has at most one positive literal.

Inference for general clauses is NP-complete (it contains SAT), but for definite clauses it is solvable in **linear time**.

**Forward chaining** (data-driven): keep a count of unproved premises for each rule and an agenda of known facts. Pop a fact; for each rule where it is a premise, decrement the count; when a count reaches 0, add the rule's conclusion to the agenda. Stop when the query is derived or the agenda empties. It is sound and complete, and each premise is touched at most once, so it is $O(N)$. It may derive many facts irrelevant to the query.

**Backward chaining** (goal-driven): to prove $q$, find rules concluding $q$ and recursively prove their premises, with a check for loops. It only looks at rules relevant to the goal, so it is faster when there are many rules.

:::example Chaining on a small knowledge base
Facts: $A$, $B$. Rules: $A\land B\to C$, $C\to D$, $E\to F$. Query $D$.
- **Forward:** agenda $A,B$; the first rule's count falls to 0, giving $C$; then $D$ is derived. $F$ is never derived because $E$ is not known.
- **Backward:** $D$ needs $C$; $C$ needs $A$ and $B$, which are facts. Proved, without looking at $E\to F$.
:::

## Worked and practice problems

:::example Is the argument valid? (resolution)
Premises $P\to Q$ and $\neg Q$; conclusion $\neg P$. Clauses: $\{\neg P,Q\}$, $\{\neg Q\}$ and the negated conclusion $\{P\}$. Resolving the first two on $Q$ gives $\neg P$; resolving that with $P$ gives the empty clause. The argument is valid (modus tollens).
:::

:::example Which is a tautology? (practice question)
Options: (A) $(p\to q)\to(q\to p)$, (B) $(p\land\neg q)\lor(p\to q)$, (C) $((p\lor q)\to r)\to(p\to r)$, (D) $(p\leftrightarrow q)\land(p\land\neg q)$.

Use $p\to q\equiv\neg p\lor q$ and De Morgan: $p\land\neg q\equiv\neg(\neg p\lor q)$. With $A=\neg p\lor q$, option (B) is $\neg A\lor A$, which is always true. So **(B)** is a tautology. (A) fails at $p=F,q=T$ (the premise is true, the conclusion false). (D) is unsatisfiable: $p\leftrightarrow q$ needs $p,q$ equal, while $p\land\neg q$ needs them different.
:::

## What the exam asks

- Decide whether a sentence is a **tautology, satisfiable, or contradictory**, usually by truth table or by trying to make it false.
- Test whether two sentences are **equivalent**, or whether $KB\models\alpha$.
- **Translate** English into logic (watch "only if" and "unless").
- Apply De Morgan, contrapositive and implication elimination correctly.
- Count the **satisfying assignments** of a formula.
