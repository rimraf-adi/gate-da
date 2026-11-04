---
num: 80
title: Exact Inference: Variable Elimination in Depth
tag: Artificial Intelligence
---
Chapter 66 introduced variable elimination on a small chain. This chapter gives the full algorithm, the algebra behind it, what it costs, and the mistakes that cost marks.

## The inference task

The variables of a Bayesian network split into three disjoint sets:
- **query variables** $X$, whose posterior we want,
- **evidence variables** $E$, observed to be $E=e$,
- **hidden variables** $Y$, everything else.

$$P(X\mid e)=\frac{P(X,e)}{P(e)}=\alpha\sum_{y}P(X,e,y),\qquad \alpha=\frac1{P(e)}=\frac{1}{\sum_xP(x,e)}$$

**Inference by enumeration** writes $P(X\mid e)=\alpha\sum_{y_1}\cdots\sum_{y_k}\prod_iP(V_i\mid\text{Parents}(V_i))$ and multiplies everything out for every combination of hidden values. It repeats the same sub-products over and over; for $n$ variables with $k$ hidden binary ones it performs about $O(n\,2^k)$ operations.

## The idea: push sums inward

Variable elimination is just the distributive law, $ab+ac=a(b+c)$: one addition and one multiplication instead of two multiplications and one addition.

For a chain $A\to B\to C$ with $d$ values per variable:
$$P(A)\sum_bP(b\mid A)\sum_cP(c\mid b)$$
Summing over $c$ first costs about $d$ additions for each $b$; the outer sum over $b$ is cheap. Enumeration over a chain of $n$ variables costs $O(d^n)$; variable elimination costs $O(n\,d^2)$.

## Factors and their two operations

A **factor** $f(V_1,\dots,V_k)$ is a table giving a number for each joint assignment of its variables. A conditional probability table $P(A\mid B)$ is the factor $f(A,B)$.

:::definition The two operations
- **Pointwise product.** For $f_1(X,Y)$ and $f_2(Y,Z)$: $\ f(x,y,z)=f_1(x,y)\cdot f_2(y,z)$. The result is over the **union** of the variables.
- **Summing out** $Y$ from $f(X,Y)$: $\ f'(x)=\sum_{y}f(x,y)$. The result loses the variable $Y$, so summing out **reduces** the number of dimensions by one.
:::

## The algorithm

Given the network, a query $X$, evidence $E=e$ and an elimination order $(Y_1,\dots,Y_k)$ of the hidden variables:

1. Turn every CPT into a factor.
2. **Set the evidence:** in every factor mentioning an evidence variable, fix it to its observed value and drop that dimension.
3. For each hidden variable $Y_j$ in order: collect **all** factors that mention $Y_j$; **multiply** them; **sum out** $Y_j$; replace those factors by the new one.
4. Multiply the remaining factors (now only over $X$).
5. **Normalise** so the entries sum to 1.

:::concept The partial-factor trap
Never sum a variable out of a single factor before multiplying in the other factors that mention it. If $f_1(A,B)=P(B\mid A)$ and $f_2(B,C)=P(C\mid B)$, then $\sum_bP(b\mid A)=1$ would erase all dependence. The correct step is $f_{new}(A,C)=\sum_bP(b\mid A)\,P(C\mid b)$: multiply first, then sum.
:::

## Cost: moral graphs, treewidth and ordering

- The **moral graph** of a DAG is the undirected graph obtained by joining every pair of parents of a common child ("marrying the parents") and dropping edge directions.
- Eliminating a variable connects all of its neighbours; the edges this adds are **fill-in**. The largest factor created has $w+1$ variables, where $w$ is the **induced width** of the order. The **treewidth** is the smallest induced width over all orders.
- **Time** $O(n\,d^{\,w+1})$ and **space** $O(d^{\,w})$, with $d$ the largest number of values of a variable.
- A good order keeps intermediate factors small. A poor one can build a factor over almost all variables, bringing back exponential cost. Finding the best order is **NP-hard**.
- For a tree or **polytree** the factor sizes stay bounded by the number of parents plus one, so inference takes time **linear** in the size of the network. For general (multiply connected) networks exact inference is **NP-hard**.

## Worked problem

:::example Chain A → B → C → D with evidence D = T
$P(A{=}T)=0.6$; $P(B{=}T\mid A{=}T)=0.8$, $P(B{=}T\mid A{=}F)=0.3$; $P(C{=}T\mid B{=}T)=0.7$, $P(C{=}T\mid B{=}F)=0.1$; $P(D{=}T\mid C{=}T)=0.9$, $P(D{=}T\mid C{=}F)=0.2$. Find $P(A{=}T\mid D{=}T)$ with elimination order $B$, then $C$.

1. **Factors:** $f_1(A)$, $f_2(A,B)$, $f_3(B,C)$, $f_4(C,D)$. Set $D=T$: $f_4(C)=0.9$ if $C=T$, else $0.2$.
2. **Eliminate $B$** (multiply $f_2,f_3$, sum over $B$) to get $f_6(A,C)=P(C\mid A)$:
   - $f_6(T,T)=0.8\cdot0.7+0.2\cdot0.1=0.58$
   - $f_6(T,F)=0.8\cdot0.3+0.2\cdot0.9=0.42$
   - $f_6(F,T)=0.3\cdot0.7+0.7\cdot0.1=0.28$
   - $f_6(F,F)=0.3\cdot0.3+0.7\cdot0.9=0.72$
3. **Eliminate $C$** (multiply $f_6$ by $f_4$, sum over $C$):
   - $f_7(T)=0.58(0.9)+0.42(0.2)=0.606$
   - $f_7(F)=0.28(0.9)+0.72(0.2)=0.396$
4. **Combine with $f_1$:** $0.6\times0.606=0.3636$ and $0.4\times0.396=0.1584$.
5. **Normalise:** the sum is $0.5220$, so $P(A{=}T\mid D{=}T)=\dfrac{0.3636}{0.5220}\approx0.6966$.
:::

## Practice

:::example Which statements are true? (practice question)
(A) Variable elimination is an exact algorithm that avoids redundant work by caching factors. (B) In a polytree, exact inference takes time linear in the network size. (C) In general multiply connected networks, exact inference is NP-hard. (D) Summing out a variable increases the number of dimensions of a factor.

**A, B and C are true.** (D) is false: summing out removes the variable, so the factor loses one dimension.
:::

## What the exam asks

- Run elimination for a small network with a stated order and give the intermediate factors and the final posterior.
- Say which operation reduces or enlarges a factor, and avoid the partial-factor mistake.
- Reason about the **cost** of an order, the effect of treewidth, and which networks allow linear-time inference.
