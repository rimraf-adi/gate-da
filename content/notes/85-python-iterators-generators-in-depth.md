---
num: 85
title: Iterators and Generators in Depth
tag: Python Programming
---
Comprehensions build whole collections; generators produce values one at a time. This chapter explains the protocol behind both so that output-prediction questions become mechanical.

## Iterables and iterators

An **iterable** has `__iter__` and returns an iterator. An **iterator** has `__next__`, returns the next value, and raises `StopIteration` when finished. A `for` loop calls `iter()` once, then `next()` repeatedly.

:::definition Iterator is single-pass
A list is an iterable, not an iterator: each `for` over it starts afresh. An iterator (including every generator) is **exhausted** after one pass; a second loop over it yields nothing.
:::

:::example Exhaustion
`g = (x*x for x in range(3))`; `list(g)` gives `[0, 1, 4]`; a second `list(g)` gives `[]`.
:::

## Generator functions

A function containing `yield` returns a generator object without running its body. Each `next()` resumes where it paused, with local variables preserved, until the next `yield`.

:::example Order of execution
`def f(): print("a"); yield 1; print("b"); yield 2`. Calling `f()` prints nothing. The first `next` prints `a` and returns 1; the second prints `b` and returns 2; the third raises `StopIteration`.
:::

- `return` inside a generator ends it (the value rides on `StopIteration`).
- `yield from it` delegates to another iterable, yielding each of its values.
- `sum`, `max`, `list`, `sorted` accept generators and consume them completely.

## Laziness and memory

A list comprehension of $n$ items costs $O(n)$ memory; the equivalent generator expression costs $O(1)$. Time to produce all values is the same. Short-circuiting functions (`any`, `all`, `next`) stop early and leave the rest unevaluated.

:::fact Late binding
In `gens = [(x for _ in range(2)) for x in range(3)]` and in lambdas built in a loop, a closure sees the **final** value of the loop variable when it is finally evaluated. A generator expression evaluates only its outermost iterable immediately; everything else is delayed.
:::

## Useful tools

- `enumerate(it)` gives `(index, value)`; `zip(a, b)` stops at the shorter input.
- `map(f, it)` and `filter(p, it)` are lazy in Python 3.
- `itertools.count`, `cycle`, `islice(it, k)`, `chain`, `combinations(it, r)` and `permutations(it, r)` are lazy; the last two produce $\binom{n}{r}$ and $n!/(n-r)!$ tuples respectively.
- `next(it, default)` returns `default` instead of raising at the end.

:::example Counting
`len(list(itertools.combinations(range(5), 2)))` is $\binom52=10$; `len(list(itertools.permutations(range(4), 2)))` is $4\cdot3=12$.
:::
