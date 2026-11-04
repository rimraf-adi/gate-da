---
num: 79
title: Transactions, ACID and Serializability
tag: Database Management Systems
---
A database is shared by many users at once. A **transaction** groups a sequence of reads and writes into one logical unit of work, and the system must keep the data correct even when transactions interleave or crash.

## ACID properties

| Property | Meaning |
|---|---|
| **Atomicity** | all of the transaction's operations happen, or none do |
| **Consistency** | a transaction moves the database from one valid state to another |
| **Isolation** | concurrent transactions behave as if run one after another |
| **Durability** | once committed, changes survive failures |

A transaction passes through states: active, partially committed, committed; or active, failed, aborted (rolled back).

## Problems caused by interleaving

- **Lost update:** two transactions read the same value and both write, so one write is overwritten.
- **Dirty read:** a transaction reads a value written by another that later aborts.
- **Non-repeatable read:** the same read returns different values within one transaction.
- **Phantom read:** a repeated query returns extra rows inserted by another transaction.

## Schedules and conflict serializability

A **schedule** is an interleaving of the operations of several transactions that keeps each transaction's own order. A **serial** schedule runs transactions one at a time; $n$ transactions have $n!$ serial schedules. A schedule is **serializable** if it is equivalent to some serial schedule.

:::definition Conflicting operations
Two operations **conflict** if they belong to different transactions, access the same data item, and at least one is a write: read-write, write-read or write-write. Swapping two non-conflicting adjacent operations never changes the outcome.
:::

**Conflict serializability test (precedence graph).**
1. Make one node per transaction.
2. Add an edge $T_i\to T_j$ whenever an operation of $T_i$ conflicts with a **later** operation of $T_j$.
3. The schedule is conflict serializable **if and only if the graph has no cycle**. A topological order of the graph gives an equivalent serial schedule.

:::example Serializable
$S_1$: $R_1(A)\ W_1(A)\ R_2(A)\ W_2(A)\ R_1(B)\ W_1(B)\ R_2(B)\ W_2(B)$.
Every conflict goes from $T_1$ to $T_2$ (for both $A$ and $B$), so the graph has the single edge $T_1\to T_2$. It is conflict serializable, equivalent to running $T_1$ then $T_2$.
:::

:::example Not serializable
$S_2$: $R_1(A)\ \ W_2(A)\ \ W_1(A)$.
$R_1(A)$ comes before $W_2(A)$, giving $T_1\to T_2$; $W_2(A)$ comes before $W_1(A)$, giving $T_2\to T_1$. The graph has a **cycle**, so $S_2$ is not conflict serializable.
:::

## Recoverability

- **Recoverable:** if $T_j$ reads data written by $T_i$, then $T_i$ commits before $T_j$ commits.
- **Cascadeless (avoids cascading aborts):** a transaction reads only data written by **committed** transactions.
- **Strict:** no item is read or overwritten until the transaction that last wrote it has committed or aborted.

These nest: **strict $\subset$ cascadeless $\subset$ recoverable**. Serializability and recoverability are independent properties.

## Locking and two-phase locking

Transactions take a **shared (S)** lock to read and an **exclusive (X)** lock to write. Two locks on one item are compatible only if both are shared.

**Two-phase locking (2PL):** each transaction has a **growing phase** (acquire locks, release none) followed by a **shrinking phase** (release locks, acquire none). 2PL guarantees **conflict serializability**. **Strict 2PL** holds all exclusive locks until the transaction ends, which also makes schedules strict. 2PL can still **deadlock**; deadlocks show up as a cycle in the **wait-for graph**.

## What the exam asks

- State what **A, C, I, D** mean, and which problem each prevents.
- Draw the **precedence graph** of a schedule and say whether it is conflict serializable, and give an equivalent serial order.
- Classify a schedule as **recoverable, cascadeless or strict**.
- Explain what **two-phase locking** guarantees.
