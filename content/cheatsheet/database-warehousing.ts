import type { SheetSubject } from './types';

const r = String.raw;

export const databaseWarehousing: SheetSubject = {
  id: 'database-warehousing',
  name: 'Database Management & Warehousing',
  marks: '~11M',
  notes: 'Database Management Systems',
  points: [
    r`SQL evaluation order: FROM, WHERE, GROUP BY, HAVING, SELECT, ORDER BY.`,
    r`Aggregates ignore NULL, except <code>COUNT(*)</code>. Comparisons with NULL are unknown, not false.`,
    r`Compute attribute closures first: candidate keys and normal forms follow from them.`,
    r`BCNF $\Rightarrow$ 3NF $\Rightarrow$ 2NF $\Rightarrow$ 1NF.`,
    r`Star schema: one fact table with denormalised dimensions. Snowflake: normalised dimensions.`,
  ],
  formulas: [
    {
      title: 'Relational algebra',
      items: [
        { label: 'Select, project', tex: r`$\sigma_{cond}(R)$ keeps rows; $\pi_{A}(R)$ keeps columns and removes duplicates` },
        { label: 'Cross product size', tex: r`$|R\times S|=|R|\cdot|S|$` },
        { label: 'Natural join', tex: r`$R\bowtie S$: equal on common attributes, at most $|R||S|$ rows` },
        { label: 'Division', tex: r`$R\div S$: values of $R$ related to every tuple of $S$` },
        { label: 'Set operations', tex: r`$\cup,\ \cap,\ -$ need union-compatible relations` },
      ],
    },
    {
      title: 'Functional dependencies and normal forms',
      items: [
        { label: 'Armstrong axioms', tex: r`reflexivity, augmentation, transitivity` },
        { label: 'Attribute closure', tex: r`$X^+$: add $B$ whenever $Y\subseteq X^+$ and $Y\to B$` },
        { label: 'Candidate key', tex: r`minimal $X$ with $X^+=R$` },
        { label: '2NF', tex: r`no non-prime attribute depends on part of a candidate key` },
        { label: '3NF', tex: r`for $X\to A$: $X$ is a superkey or $A$ is prime` },
        { label: 'BCNF', tex: r`for every non-trivial $X\to A$: $X$ is a superkey` },
        { label: 'Lossless join', tex: r`$R_1\cap R_2\to R_1$ or $R_1\cap R_2\to R_2$` },
      ],
    },
    {
      title: 'Storage and indexing',
      items: [
        { label: 'Blocking factor', tex: r`$bf=\lfloor B/R\rfloor$; blocks $=\lceil N/bf\rceil$` },
        { label: 'B+ tree of order $p$ (internal)', tex: r`up to $p$ pointers and $p-1$ keys; fits when $pP+(p-1)K\le B$` },
        { label: 'B+ tree height', tex: r`$\approx\log_{p}N$; leaves linked for range scans` },
        { label: 'Hash index', tex: r`good for equality, useless for ranges` },
      ],
    },
    {
      title: 'Preprocessing and warehouse',
      items: [
        { label: 'Min-max scaling', tex: r`$x'=\dfrac{x-\min}{\max-\min}$` },
        { label: 'z-score', tex: r`$x'=\dfrac{x-\mu}{\sigma}$` },
        { label: 'Cuboids', tex: r`$n$ dimensions without hierarchies: $2^n$; with hierarchies: $\prod(L_i+1)$` },
        { label: 'OLAP operations', tex: r`roll-up, drill-down, slice (fix one dim), dice (fix several), pivot` },
        { label: 'Measures', tex: r`distributive: sum, count, min, max; algebraic: avg; holistic: median, mode` },
      ],
    },
    {
      title: 'ER to relational mapping and transactions',
      items: [
        { label: 'Strong entity', tex: r`one table; its key becomes the primary key` },
        { label: 'Multivalued attribute', tex: r`its own table: (entity key, value)` },
        { label: 'Many-to-many relationship', tex: r`its own table holding both keys (plus relationship attributes)` },
        { label: 'One-to-many', tex: r`foreign key on the "many" side, no new table needed` },
        { label: 'Weak entity', tex: r`table with the owner's key plus its partial key` },
        { label: 'ACID', tex: r`atomicity, consistency, isolation, durability` },
        { label: 'Conflict serializable', tex: r`iff the precedence graph is acyclic; serial order = topological order` },
        { label: 'Two-phase locking', tex: r`growing phase then shrinking phase; guarantees conflict serializability` },
        { label: 'Recoverability', tex: r`strict $\subset$ cascadeless $\subset$ recoverable` },
      ],
    },
  ],
  traps: [
    r`<code>GROUP BY</code> queries cannot select a non-grouped, non-aggregated column.`,
    r`<code>WHERE</code> filters rows before grouping; <code>HAVING</code> filters groups afterwards.`,
    r`A decomposition into BCNF may lose a dependency; into 3NF it never does.`,
    r`Transactions: conflict-serialisable iff the precedence graph is acyclic.`,
  ],
};
