---
num: 71
title: Analytical Aptitude and Logical Reasoning
tag: General Aptitude
---
Analytical aptitude tests clear, step-by-step reasoning. Problems are usually puzzles, ordering and arrangement, series, or logical deductions from a few statements. The method is always the same: represent the information, then eliminate.

## Statements and syllogisms

Draw a **Venn diagram** for each statement and test the conclusion against the **most flexible** diagram.

| Statement | Meaning |
|---|---|
| All $A$ are $B$ | $A$ lies inside $B$ |
| Some $A$ are $B$ | circles overlap |
| No $A$ is $B$ | circles are separate |
| Some $A$ are not $B$ | part of $A$ lies outside $B$ |

A conclusion follows only if it is true in **every** possible diagram.

:::example Does the conclusion follow?
*All $A$ are $B$. Some $B$ are $C$.* Conclusion: some $A$ are $C$. Draw $A$ inside $B$ and $C$ overlapping the part of $B$ outside $A$; then no $A$ is $C$. So the conclusion does **not** definitely follow.
:::

Conditional statements: *If $p$ then $q$* is equivalent to its **contrapositive** (*if not $q$ then not $p$*), but **not** to its converse (*if $q$ then $p$*).

## Arrangements and orderings

- Arrange $n$ distinct people in a **line**: $n!$ ways. In a **circle** (rotations equal): $(n-1)!$.
- To keep two particular people together, treat them as one unit and multiply by the 2 internal orders.
- For ranking or comparison puzzles, write the relations as a chain ($A>B>C$) and place each new fact into it.
- For seating, draw positions and fix one person first to break symmetry.

:::example Circular seating
Five people sit around a table: $(5-1)!=24$ arrangements. With two particular people adjacent: treat them as one, giving $(4-1)!\times2=12$ arrangements.
:::

## Series and patterns

- **Number series:** look at differences, second differences, ratios, squares, cubes, alternating patterns, and primes.
- **Letter series:** convert to positions ($A=1,\dots,Z=26$) and treat as numbers.

:::example Finding the rule
2, 6, 12, 20, 30, ?  Differences are 4, 6, 8, 10, so the next difference is 12 and the next term is $30+12=42$. (The terms are $n(n+1)$.)
:::

## Sets and Venn problems

For two sets, $|A\cup B|=|A|+|B|-|A\cap B|$. For three sets add the triple intersection:
$$|A\cup B\cup C|=|A|+|B|+|C|-|A\cap B|-|B\cap C|-|A\cap C|+|A\cap B\cap C|$$

:::example Neither group
Of 60 students, 35 play cricket, 25 play football and 10 play both. Playing at least one: $35+25-10=50$. So $60-50=10$ play neither.
:::

## Truth-tellers and liars

Assume a person is truthful or lying, follow the consequences, and discard the case that gives a contradiction.

:::example A knights-and-knaves puzzle
Each person is either a truth-teller or a liar. A says *"We are both liars."* If A were truthful, the statement would be true, making A a liar, a contradiction. So A is a liar and the statement is false, meaning **at least one is a truth-teller**. A is a liar, so **B is a truth-teller**.
:::

## Relations, directions, codes

- **Blood relations:** draw a family tree with generations as rows; mark gender when given.
- **Directions:** draw a quick sketch. Net displacement uses Pythagoras for perpendicular legs; a turn to the right from North faces East.
- **Coding-decoding:** find whether letters shift by a fixed amount, are reversed or are swapped in pairs, and test the rule on every given pair.

## Clocks and calendars

- The minute hand moves $6^\circ$ per minute and the hour hand $0.5^\circ$ per minute, so at $H$ hours $M$ minutes the angle between them is $\left|30H-5.5M\right|$ (take $360^\circ-$ that if it exceeds $180^\circ$).
- The hands coincide 11 times in 12 hours.
- **Odd days:** an ordinary year has 1 odd day, a leap year 2. 100 years have 5 odd days and 400 years have 0. Add odd days and take the remainder modulo 7 to find the weekday.

:::example Angle between the hands
At 3:20, $|30(3)-5.5(20)|=|90-110|=20^\circ$.
:::

## What the exam asks

- Decide which **conclusion follows** from given statements, or what must be true.
- **Order or arrange** people or items from clues, and count arrangements.
- Find the **next term** of a number or letter series.
- Use set counts (Venn) to find a missing group.
- Solve a short puzzle by **elimination**: set up a grid and strike out impossible cases.
