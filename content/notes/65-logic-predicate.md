---
num: 65
title: Predicate (First-Order) Logic
tag: Artificial Intelligence
---
Propositional logic cannot say "every student passed" without listing each student. **First-order (predicate) logic** adds objects, relations and quantifiers, so one sentence can talk about many objects.

## Syntax

- **Constants** name objects: $Ram$, $Course101$.
- **Variables**: $x,y,z$.
- **Functions** map objects to objects: $FatherOf(x)$. A function applied to terms is again a term.
- **Predicates** are relations that are true or false of objects: $Student(x)$, $Likes(x,y)$.
- **Atomic sentence:** a predicate applied to terms, such as $Likes(Ram, Course101)$.
- **Connectives** $\neg,\land,\lor,\to,\leftrightarrow$ as in propositional logic.
- **Quantifiers:** $\forall x$ (for all) and $\exists x$ (there exists).

A variable is **bound** when it lies inside the scope of a quantifier for it; otherwise it is **free**. A sentence has no free variables.

## Semantics

An **interpretation** fixes a domain of objects and says which objects the constants name, what the functions do, and which tuples each predicate holds for.

- $\forall x\,P(x)$ is true iff $P(x)$ holds for **every** object in the domain. Over a finite domain it is the conjunction $P(a_1)\land P(a_2)\land\cdots$.
- $\exists x\,P(x)$ is true iff $P(x)$ holds for **at least one** object. Over a finite domain it is the disjunction $P(a_1)\lor P(a_2)\lor\cdots$.

## Quantifier rules

:::concept Negation and distribution
$$\neg\forall x\,P(x)\equiv\exists x\,\neg P(x)\qquad\neg\exists x\,P(x)\equiv\forall x\,\neg P(x)$$
$$\forall x\,(P\land Q)\equiv\forall x\,P\land\forall x\,Q\qquad\exists x\,(P\lor Q)\equiv\exists x\,P\lor\exists x\,Q$$
But $\forall x\,(P\lor Q)\not\equiv\forall x\,P\lor\forall x\,Q$ and $\exists x\,(P\land Q)\not\equiv\exists x\,P\land\exists x\,Q$.
:::

- Quantifiers of the **same kind commute**: $\forall x\forall y\equiv\forall y\forall x$ and $\exists x\exists y\equiv\exists y\exists x$.
- Quantifiers of **different kinds do not commute**. $\forall x\,\exists y\,P(x,y)$ ("everyone has someone") is weaker than $\exists y\,\forall x\,P(x,y)$ ("someone is related to everyone").
- The valid direction is $\exists y\,\forall x\,P(x,y)\ \Rightarrow\ \forall x\,\exists y\,P(x,y)$, never the reverse.

:::example Order of quantifiers
Take the integers with $P(x,y)$ meaning $x<y$.
- $\forall x\,\exists y\,(x<y)$ is **true**: for any $x$ take $y=x+1$.
- $\exists y\,\forall x\,(x<y)$ is **false**: no $y$ exceeds every integer $x$, including $y$ itself.

So the two orders differ, which is a counterexample to the reverse implication.
:::

## Translating English

Two patterns cover most sentences:

| Pattern | Form |
|---|---|
| All $A$ are $B$ | $\forall x\,(A(x)\to B(x))$ |
| Some $A$ is $B$ | $\exists x\,(A(x)\land B(x))$ |
| No $A$ is $B$ | $\forall x\,(A(x)\to\neg B(x))\equiv\neg\exists x\,(A(x)\land B(x))$ |
| Not all $A$ are $B$ | $\exists x\,(A(x)\land\neg B(x))$ |

:::concept The two classic mistakes
- Do **not** use $\land$ with $\forall$: $\forall x\,(Student(x)\land Likes(x))$ says *everything* is a student who likes. Use $\to$.
- Do **not** use $\to$ with $\exists$: $\exists x\,(Student(x)\to Likes(x))$ is true whenever anything is not a student. Use $\land$.
:::

:::example Translations
- "Every student likes some course": $\forall x\,\big(Student(x)\to\exists y\,(Course(y)\land Likes(x,y))\big)$.
- "No student likes every course": $\neg\exists x\,\big(Student(x)\land\forall y\,(Course(y)\to Likes(x,y))\big)$.
- "Some student likes no course": $\exists x\,\big(Student(x)\land\forall y\,(Course(y)\to\neg Likes(x,y))\big)$.
:::

## Inference in first-order logic

- **Universal instantiation:** from $\forall x\,P(x)$ infer $P(c)$ for any constant $c$.
- **Existential instantiation:** from $\exists x\,P(x)$ infer $P(k)$ for a **new** constant $k$ (a Skolem constant).
- **Skolemisation** removes $\exists$ from a sentence in prenex form. If $\exists$ lies inside a $\forall$, it becomes a function of the universal variables: $\forall x\,\exists y\,P(x,y)$ becomes $\forall x\,P(x,f(x))$.

### Unification

**Unification** finds a substitution $\theta$ that makes two atomic sentences identical.

:::example Unifying
- $Knows(John,x)$ and $Knows(John,Jane)$ unify with $\{x/Jane\}$.
- $Knows(John,x)$ and $Knows(y,Mother(y))$ unify with $\{y/John,\ x/Mother(John)\}$.
- $Knows(x,x)$ and $Knows(John,Jane)$ do **not** unify, since $x$ cannot be both.
- $x$ and $f(x)$ do not unify (the *occurs check*).
:::

**Resolution** extends to first-order logic: convert to clauses (eliminate $\to$, move $\neg$ inward, standardise variables, Skolemise, drop $\forall$), then resolve clauses whose literals unify.

## Quantifier traps, with counterexamples

- $\forall x\,(P\lor Q)\not\equiv\forall x\,P\lor\forall x\,Q$. Over the integers, $\text{Even}(x)\lor\text{Odd}(x)$ holds for every $x$, but it is false that all integers are even or that all integers are odd.
- $\exists x\,(P\land Q)\not\equiv\exists x\,P\land\exists x\,Q$: one object may be $P$ and a different one $Q$.
- $\exists y\,\forall x\,P(x,y)\Rightarrow\forall x\,\exists y\,P(x,y)$ is the only valid direction.

## Converting to clause form (Skolemisation)

To run resolution, convert each sentence step by step:

1. Eliminate $\to$ and $\leftrightarrow$.
2. Push negations inward until $\neg$ applies only to atoms.
3. **Standardise variables** so every quantifier binds a different name.
4. **Skolemise:** an $\exists$ outside every $\forall$ becomes a new **Skolem constant**; an $\exists$ inside $\forall x_1,\dots,\forall x_k$ becomes a **Skolem function** $F(x_1,\dots,x_k)$.
5. Drop the universal quantifiers (all remaining variables are universal).
6. Distribute $\lor$ over $\land$ to get clauses.

:::example Skolemisation
- $\forall x\,\exists y\,\text{Loves}(x,y)$ becomes $\text{Loves}(x,F(x))$: the loved person may depend on $x$.
- $\forall x\,\exists y\,\forall z\,\exists w\,\big(P(x,y)\land Q(z,w)\big)$. Here $y$ depends on $x$ only and $w$ depends on $x$ and $z$, so use two different functions: $P(x,f(x))\land Q(z,g(x,z))$.
:::

## Unification and resolution

A **unifier** of two literals is a substitution $\theta$ with $P\theta=Q\theta$. The **most general unifier** (MGU) makes the fewest bindings. To compute it, go argument by argument: bind a variable to a constant or term, apply the binding to everything, continue, and **fail the occurs check** if a variable would be bound to a term containing itself.

:::example Resolution refutation
Prove $\neg\text{Alive}(\text{Marcus})$ from: (1) $\neg\text{Man}(x)\lor\text{Mortal}(x)$, (2) $\text{Man}(\text{Marcus})$, (3) $\neg\text{Mortal}(y)\lor\text{Dead}(y)$, (4) $\neg\text{Dead}(z)\lor\neg\text{Alive}(z)$. Add the negated goal (5) $\text{Alive}(\text{Marcus})$.

- Resolve (1) and (2) with $\{x/\text{Marcus}\}$: $\text{Mortal}(\text{Marcus})$.
- Resolve that with (3), $\{y/\text{Marcus}\}$: $\text{Dead}(\text{Marcus})$.
- Resolve with (4), $\{z/\text{Marcus}\}$: $\neg\text{Alive}(\text{Marcus})$.
- Resolve with (5): the **empty clause**. The goal is proved.
:::

:::example Translate (practice question)
"Every student who takes Artificial Intelligence passes the examination." With $S$ = student, $T$ = takes AI, $P$ = passes:

(A) $\forall x\,\big((S(x)\land T(x))\to P(x)\big)$ is correct: the restriction goes in the premise of the conditional.
(B) says every student takes AI and passes; (C) only says some student passes; (D) makes anyone who is a student **or** takes AI pass. So **(A)**.
:::

## What the exam asks

- **Equivalent or not:** apply the negation rules and check which quantifier swaps are legal.
- **Translate** a statement, or choose the correct translation among options. Check the $\forall\,\to$ and $\exists\,\land$ patterns first.
- Pick which statement is **implied by** or **equivalent to** a given one, and the effect of swapping $\forall\exists$.
- Say whether two atoms **unify** and give the substitution.
- Evaluate a quantified sentence over a **small finite domain** by expanding it.
