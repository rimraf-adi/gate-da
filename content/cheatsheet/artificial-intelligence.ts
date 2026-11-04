import type { SheetSubject } from './types';

const r = String.raw;

export const artificialIntelligence: SheetSubject = {
  id: 'artificial-intelligence',
  name: 'Artificial Intelligence',
  marks: '~10M',
  notes: 'Artificial Intelligence',
  points: [
    r`Iterative deepening generates only about $\frac{b}{b-1}\approx11\%$ more nodes than BFS (for $b=10$) but needs $O(bd)$ memory instead of $O(b^d)$.`,
    r`UCS applies the goal test when a node is **expanded**; BFS may test when it is **generated**.`,
    r`A* is optimal when $h$ is admissible (tree search) or consistent (graph search).`,
    r`Alpha-beta never changes the minimax value; it only skips branches.`,
    r`Entailment: $KB\models\alpha$ iff $KB\land\neg\alpha$ is unsatisfiable.`,
    r`Conditional independence is what makes Bayesian networks compact.`,
  ],
  formulas: [
    {
      title: 'Search',
      items: [
        { label: 'BFS / DFS time', tex: r`BFS $O(b^d)$ time and space; DFS $O(b^m)$ time, $O(bm)$ space` },
        { label: 'A*', tex: r`$f(n)=g(n)+h(n)$` },
        { label: 'Admissible', tex: r`$h(n)\le h^*(n)$ (never overestimates)` },
        { label: 'Consistent', tex: r`$h(n)\le c(n,n')+h(n')$; consistent $\Rightarrow$ admissible` },
        { label: 'Dominance', tex: r`$h_2\ge h_1$ both admissible: $h_2$ expands no more nodes` },
        { label: 'Greedy best-first', tex: r`$f(n)=h(n)$: fast, neither optimal nor complete` },
        { label: 'Bidirectional search', tex: r`time and space $O(b^{d/2})$` },
        { label: 'UCS cost', tex: r`$O\big(b^{1+\lfloor C^*/\epsilon\rfloor}\big)$, complete if every step cost $\ge\epsilon>0$` },
      ],
    },
    {
      title: 'Adversarial search',
      items: [
        { label: 'Minimax', tex: r`MAX takes the maximum child value, MIN the minimum` },
        { label: 'Alpha-beta', tex: r`$\alpha$: best for MAX so far, $\beta$: best for MIN; prune when $\alpha\ge\beta$` },
        { label: 'Best-case pruning', tex: r`$O(b^{m/2})$ with perfect move ordering` },
      ],
    },
    {
      title: 'Logic',
      items: [
        { label: 'Implication', tex: r`$p\to q\equiv\neg p\lor q\equiv\neg q\to\neg p$` },
        { label: 'De Morgan', tex: r`$\neg(p\land q)\equiv\neg p\lor\neg q,\ \ \neg(p\lor q)\equiv\neg p\land\neg q$` },
        { label: 'Biconditional', tex: r`$p\leftrightarrow q\equiv(p\to q)\land(q\to p)$` },
        { label: 'Quantifier negation', tex: r`$\neg\forall xP\equiv\exists x\neg P,\ \ \neg\exists xP\equiv\forall x\neg P$` },
        { label: 'Quantifier order', tex: r`$\forall x\,\exists y$ is not the same as $\exists y\,\forall x$` },
      ],
    },
    {
      title: 'Reasoning under uncertainty',
      items: [
        { label: 'Bayesian network joint', tex: r`$P(X_1,\dots,X_n)=\prod_i P(X_i\mid \mathrm{Parents}(X_i))$` },
        { label: 'Chain and fork', tex: r`blocked when the middle node is observed` },
        { label: 'Collider', tex: r`blocked unless the middle node or a descendant is observed` },
        { label: 'Variable elimination', tex: r`multiply factors containing a variable, then sum it out` },
        { label: 'Sampling methods', tex: r`prior, rejection, likelihood weighting, Gibbs` },
        { label: 'Free parameters', tex: r`full joint $2^n-1$; network $\sum_i 2^{|\mathrm{Parents}(X_i)|}$; naive Bayes $1+2n$` },
        { label: 'I-equivalence', tex: r`same skeleton and same v-structures (Verma and Pearl)` },
        { label: 'Markov blanket', tex: r`parents, children and co-parents of the children` },
        { label: 'Variable elimination cost', tex: r`time $O(n\,d^{w+1})$, space $O(d^w)$, $w$ the treewidth; the best order is NP-hard` },
        { label: 'Likelihood weight', tex: r`$w=\prod_{E_i\in E}P(e_i\mid\mathrm{Parents}(E_i))$` },
      ],
    },
  ],
  traps: [
    r`An admissible heuristic makes A* optimal for **tree** search; **graph** search also needs consistency (or reopening closed nodes).`,
    r`Alpha-beta: at a MIN node prune when $v\le\alpha$; at a MAX node prune when $v\ge\beta$.`,
    r`A collider opens when it **or any descendant** is observed.`,
    r`Rejection sampling keeps only a fraction $P(e)$ of the samples, so it fails when the evidence is rare. Gibbs samples are correlated, not independent.`,
    r`Variable elimination: multiply **all** factors that mention a variable before summing it out.`,
    r`With ∀, use implication ($\forall x\,(P\to Q)$); with ∃, use conjunction ($\exists x\,(P\land Q)$).`,
    r`Alpha-beta pruning bounds depend on node visiting order: process children left to right.`,
    r`In a collider, observing the middle node makes the parents dependent.`,
  ],
};
