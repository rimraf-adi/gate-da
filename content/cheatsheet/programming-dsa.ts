import type { SheetSubject } from './types';

const r = String.raw;

export const programmingDsa: SheetSubject = {
  id: 'programming-dsa',
  name: 'Programming, Data Structures & Algorithms',
  marks: '~15M',
  notes: 'Python Programming',
  points: [
    r`Python default arguments are evaluated once, so a mutable default is shared across calls.`,
    r`<code>append</code> adds one element; <code>extend</code> adds each element of an iterable.`,
    r`<code>list.reverse()</code> and <code>sort()</code> work in place and return <code>None</code>; <code>sorted()</code> returns a new list.`,
    r`Trace by hand: write the state after every loop iteration or recursive call.`,
    r`Insertion sort does exactly (number of inversions) swaps; bubble sort does too.`,
    r`A full binary tree with $i$ internal nodes has $i+1$ leaves and $2i+1$ nodes.`,
  ],
  formulas: [
    {
      title: 'Searching, sorting, recurrences',
      items: [
        { label: 'Binary search, worst case comparisons', tex: r`$\lfloor\log_2 n\rfloor+1$` },
        { label: 'Master theorem', tex: r`$T(n)=aT(n/b)+f(n)$: compare $f(n)$ with $n^{\log_b a}$` },
        { label: 'Halving', tex: r`$T(n)=T(n/2)+1\Rightarrow\Theta(\log n)$` },
        { label: 'Merge sort', tex: r`$T(n)=2T(n/2)+n\Rightarrow\Theta(n\log n)$` },
        { label: 'Linear shrink', tex: r`$T(n)=T(n-1)+n\Rightarrow\Theta(n^2)$` },
        { label: 'Quicksort', tex: r`average $O(n\log n)$, worst $O(n^2)$ (bad pivots)` },
      ],
    },
    {
      title: 'Trees and heaps',
      items: [
        { label: 'Complete tree height', tex: r`$\lfloor\log_2 n\rfloor$ for $n$ nodes` },
        { label: 'Reconstruction', tex: r`inorder plus (preorder or postorder) fixes the tree` },
        { label: 'Traversals', tex: r`pre: root-L-R; in: L-root-R; post: L-R-root; BST inorder is sorted` },
        { label: 'Array heap (1-based)', tex: r`children of $i$ are $2i,\,2i+1$; parent is $\lfloor i/2\rfloor$` },
        { label: 'Heap costs', tex: r`insert, delete-max $O(\log n)$; build-heap $O(n)$` },
      ],
    },
    {
      title: 'Hashing',
      items: [
        { label: 'Load factor', tex: r`$\alpha=n/m$` },
        { label: 'Chaining', tex: r`expected search $\approx 1+\alpha$` },
        { label: 'Linear probing', tex: r`$h(k,i)=(h(k)+i)\bmod m$; deletions need tombstones` },
      ],
    },
    {
      title: 'Graphs',
      items: [
        { label: 'Handshake', tex: r`$\sum\deg(v)=2|E|$` },
        { label: 'Tree', tex: r`connected and acyclic, $|E|=|V|-1$` },
        { label: 'BFS / DFS', tex: r`$O(V+E)$ with adjacency list; BFS queue, DFS stack` },
        { label: 'Shortest paths', tex: r`BFS (unweighted); Dijkstra (non-negative); Bellman–Ford $O(VE)$` },
      ],
    },
    {
      title: 'Python and graph facts',
      items: [
        { label: 'Mutable and immutable', tex: r`mutable: list, dict, set; immutable: int, str, tuple, frozenset` },
        { label: 'Copying', tex: r`<code>b = a</code> shares the object; <code>a[:]</code> and <code>a.copy()</code> copy one level; <code>copy.deepcopy</code> copies all levels` },
        { label: 'Comprehension', tex: r`<code>[f(x) for x in s if c(x)]</code>; a generator expression uses <code>(...)</code> and produces values lazily` },
        { label: 'Generator', tex: r`a function with <code>yield</code> returns an iterator; it resumes after each <code>yield</code>` },
        { label: 'Set operations', tex: r`<code>|</code> union, <code>&</code> intersection, <code>-</code> difference, <code>^</code> symmetric difference` },
        { label: 'Average costs', tex: r`list append $O(1)$, insert or <code>in</code> $O(n)$; dict and set lookup $O(1)$ average` },
        { label: 'Topological sort', tex: r`exists iff the directed graph is acyclic (a DAG); $O(V+E)$` },
        { label: 'DFS edge types (directed)', tex: r`tree, back (to an ancestor), forward, cross; a back edge means a cycle` },
        { label: 'Connected components', tex: r`one BFS or DFS per unvisited vertex: $O(V+E)$` },
      ],
    },
  ],
  tables: [
    {
      title: 'Complexity at a glance',
      head: ['Algorithm', 'Best', 'Average', 'Worst', 'Note'],
      rows: [
        ['Linear search', r`$O(1)$`, r`$O(n)$`, r`$O(n)$`, ''],
        ['Binary search', r`$O(1)$`, r`$O(\log n)$`, r`$O(\log n)$`, 'sorted input'],
        ['Selection sort', r`$O(n^2)$`, r`$O(n^2)$`, r`$O(n^2)$`, 'at most $n-1$ swaps'],
        ['Bubble sort', r`$O(n)$`, r`$O(n^2)$`, r`$O(n^2)$`, 'early exit version'],
        ['Insertion sort', r`$O(n)$`, r`$O(n^2)$`, r`$O(n^2)$`, 'good on nearly sorted'],
        ['Merge sort', r`$O(n\log n)$`, r`$O(n\log n)$`, r`$O(n\log n)$`, r`$O(n)$ extra space`],
        ['Quicksort', r`$O(n\log n)$`, r`$O(n\log n)$`, r`$O(n^2)$`, 'in place'],
      ],
    },
  ],
  traps: [
    r`Scope: a name assigned inside a function is local unless declared <code>global</code> or <code>nonlocal</code>; reading a global does not need a declaration.`,
    r`Closures capture variables, not values: a loop that builds lambdas often shares the last value.`,
    r`<code>is</code> compares identity, <code>==</code> compares value; <code>//</code> floors toward $-\infty$.`,
    r`Slicing <code>a[:]</code> copies one level only; nested lists still share inner objects.`,
    r`Dijkstra fails with negative edge weights.`,
  ],
};
