## 202414
- In DFS on an **undirected** graph every edge is either a tree edge or a back edge (there are no cross edges), and "gray" is a vertex colour, not an edge type.
- The edge $(u,v)$ has $d[u]<d[v]$, so $v$ is farther from $s$ than $u$. When DFS first explores the edge from $u$ to $v$, the vertex $v$ is still undiscovered, so the edge discovers it and becomes a **tree edge**.
- Strictly, the DFS tree depth of a vertex need not equal its shortest-path distance, so this relies on the usual textbook reading of the question. The official key is tree edge.
- Answer: **A**

## 202416
- First In First Out is a **queue**: (p) with (ii).
- A lookup operation is the characteristic operation of a **hash table**: (q) with (iii).
- Last In First Out is a **stack**: (r) with (i).
- Answer: **A**

## 202421
- With uniform hashing at load factor $\alpha<1$, an unsuccessful search needs at most $\dfrac1{1-\alpha}$ probes on average.
- Inserting a new element probes exactly like an unsuccessful search until it finds an empty slot, so it also needs at most $\dfrac1{1-\alpha}$ probes.
- Answer: **B**

## 202428
- In a **full** binary tree every node has 0 or 2 children. Preorder and inorder together determine any binary tree, and so do inorder and postorder.
- For a full binary tree, preorder and postorder together also determine the tree uniquely, because with exactly two children the split point between the left and right subtrees is fixed by the sizes.
- Inorder alone is not enough.
- Answer: **A, B, C**

## 202430
- The array 60, 70, 80, 90, 100 is already sorted, so no element ever needs to change place.
- Counting only real exchanges of two different out-of-order elements, Quicksort makes **0 swaps** (a partition scheme that swaps an element with itself does not move anything).
- Answer: **0**

## 202432
- insertFirst(10): [10]. insertLast(32): [10, 32].
- $a\leftarrow$ removeFirst(): $a=10$, deque [32].
- insertLast(28): [32, 28]. insertLast(17): [32, 28, 17].
- $a\leftarrow$ removeFirst(): $a=32$, deque [28, 17].
- $a\leftarrow$ removeLast(): $a=17$, deque [28].
- Answer: **17**

## 202438
- `count(0)` returns $1+\text{count}(1)+\text{count}(2)$.
- Keys 3, 4, 5, 6, 7, 8 are not in `child_dict`, so each returns 1. Then `count(1)`$=1+1+1+1=4$ and `count(2)`$=1+1+1+1=4$.
- `count(0)`$=1+4+4=9$. It counts every node of the tree.
- Answer: **D**

## 202439
- $X=[6,3,5,4,10]$ and $S[1]=1$.
- $i=2$: $X[1]=6\le X[2]=3$? No, so $S[2]=1$.
- $i=3$: $3\le5$? Yes, $S[3]=1+S[2]=2$.
- $i=4$: $5\le4$? No, $S[4]=1$.
- $i=5$: $4\le10$? Yes, $S[5]=1+S[4]=2$.
- Result $[1,1,2,1,2]$.
- Answer: **C**

## 202440
- Each step compares the key with the middle element and then continues in a half of size at most $\lfloor n/2\rfloor$.
- So the worst case satisfies $F(n)=F(\lfloor n/2\rfloor)+1$.
- Answer: **A**

## 202441
- The function swaps the elements at the two ends, then calls itself on the indices moved one step inward, until the indices cross.
- Repeatedly swapping the outermost remaining pair **reverses** the section of $D$ from $s_1$ to $s_2$.
- Answer: **C**

## 202445
- Array $[4,3,2,1,5]$.
- **Bubble sort**, pass 1: $[3,2,1,4,5]$; pass 2: $[2,1,3,4,5]$. Not sorted.
- **Insertion sort**, two passes (the first three elements inserted): $[2,3,4,1,5]$. Not sorted.
- **Selection sort**, pass 1 puts the minimum 1 first: $[1,3,2,4,5]$; pass 2 puts the next minimum 2 second: $[1,2,3,4,5]$. Sorted.
- Answer: **B** (selection sort only)

## 202452
- Height $H$ is counted in edges. Every node has at most two children.
- **A.** Leaves $L$ = (nodes with two children) $+1\le I+1$. True.
- **B.** The fewest nodes is a path, $H+1$; the most is a complete tree, $2^{H+1}-1$. True.
- **C.** A path of height $H$ has $H$ internal nodes (the minimum), and a complete tree has $2^H-1$ internal nodes (the maximum). True.
- **D.** A path has just 1 leaf, which can be less than $H$. False.
- Answer: **A, B, C**

## 202518
- $h(x)=3x\bmod10$. Keys: 1 goes to 3; 4 goes to 2; 5 goes to 5; 6 goes to 8.
- Key 14: $h=42\bmod10=2$, occupied (by 4). Probe 3: occupied (by 1). Probe 4: free. So 14 goes to **4**.
- Key 15: $h=45\bmod10=5$, occupied (by 5). Probe 6: free. So 15 goes to **6**.
- Answer: **D**

## 202523
- `A.extend(B)` appends every element of `B`, giving `[1, 2, 3, 4, 5, 6]`.
- `A.append(B)` would add `B` as one element; `update` is a set or dictionary method; `insert` needs an index.
- Answer: **A**

## 202527
- Binary search needs both a **sorted** sequence and **constant-time access** to the middle element.
- A sorted array gives both. A linked list takes $O(n)$ time to reach the middle, and an unsorted array cannot be searched this way.
- Answer: **C**

## 202529
- Insertion sort performs one swap for each inversion. The pair (15, 13) is already one inversion, so $x$ must add exactly one more.
- $x=10$: the earlier element 11 is greater, giving 1 more inversion; none with 15 or 13. Total 2. ✓
- $x=12$: no earlier element is greater, and 12 is smaller than both 15 and 13. Total 1. ✗
- $x=14$: 14 is greater than 13, giving 1 more; none earlier. Total 2. ✓
- $x=16$: 16 is greater than both 15 and 13, giving 2 more. Total 3. ✗
- Answer: **A, C**

## 202547
- Start: $A=\{\text{this, that}\}$, $B=\{\text{that, other}\}$, $C=\{\text{other, this}\}$. The right side of each assignment uses the old values.
- Iteration 1: "this" in $A$, so $A,B,C=A-B,\ B-C,\ C-A=\{\text{this}\},\{\text{that}\},\{\text{other}\}$. Then "that" in $B$, so $A,B,C=C|A,\ A|B,\ B|C=\{\text{other, this}\},\{\text{this, that}\},\{\text{that, other}\}$.
- "other" is in $C$, so iterate again: "this" in $A$, so $A,B,C=\{\text{other}\},\{\text{this}\},\{\text{that}\}$. "that" is not in $B$. Now "other" is not in $C$: stop.
- Final: $A=\{\text{other}\}$, $B=\{\text{this}\}$, $C=\{\text{that}\}$. Only $B$ contains "this".
- Answer: **B**

## 202558
- The edges we know exist: $a$-$b$, $b$-$c$, $c$-$d$, $a$-$f$, $f$-$c$, $c$-$h$, $e$-$f$, $f$-$g$, $g$-$h$. Given distances: $d(a,d)=3$, $d(a,h)=3$, $d(e,h)=3$.
- An edge that would create a shorter path contradicts these, so it is not in $G$.
- $(b,d)$ would give $a$-$b$-$d$ of length 2 $<3$: not an edge.
- $(b,h)$ would give $a$-$b$-$h$ of length 2 $<3$: not an edge.
- $(e,g)$ would give $e$-$g$-$h$ of length 2 $<3$: not an edge.
- $(b,g)$ creates no path shorter than a stated shortest path, so it is not ruled out.
- Answer: **A, C, D**

## 202563
- $f(a,b)$ doubles the result for odd $a$ and recurses on $(a-1)/2$, or adds $b$ for even $a$.
- $f(15,10)=2f(7,10)$; $f(7,10)=2f(3,10)$; $f(3,10)=2f(1,10)$; $f(1,10)=2f(0,10)=2\times10=20$.
- Back up: $f(3)=40$, $f(7)=80$, $f(15)=160$.
- Answer: **160**

## 202564
- Start with $S=[0]$, $x=0$, flag $=0$. Each loop pass with flag 0 pushes $x+1$, so the stack grows to $[0,1,\dots,8]$ and flag becomes 1 when $x=8$.
- With flag 1, each pass pops $x$; if $x$ is odd, it pops once more; then sum adds $x$.
- Pop 8 (even): sum $=8$, stack $[0..7]$. Pop 7 (odd), then pop 6: sum $=15$. Pop 5 (odd), then pop 4: sum $=20$. Pop 3 (odd), then pop 2: sum $=23$. Pop 1 (odd), then pop 0: sum $=24$. The stack is empty.
- Answer: **24**

## 202565
- The edges are $i\to i+1$ and $i\to i+2$, and the lists are in decreasing order, so DFS always tries $i+2$ before $i+1$.
- From 0 it goes 0, 2, 4, ..., 100 (all the even vertices). On the way back it discovers the odd vertices: 99 (from 98), then 97, 95, ..., 1.
- After vertex 50 is discovered, the later discoveries are the even vertices 52 to 100 (25 of them) and all 50 odd vertices.
- $25+50=75$.
- Answer: **75**

## 202615
- With a random array and the first element as pivot, the pivot's final position $k$ is equally likely to be any of $0,\dots,n-1$.
- So $T(n)=\dfrac1n\sum_{k=0}^{n-1}\big[T(k)+T(n-k-1)\big]+O(n)$.
- Answer: **D**

## 202616
- The default list `lst=[]` is created once, when the function is defined, and is shared by calls that do not pass `lst`.
- `append_to_lst(1)` prints `[1]`. `append_to_lst(2)` uses the same list and prints `[1, 2]`. `append_to_lst(3, [])` uses a new list and prints `[3]`.
- Answer: **B**

## 202625
- The first preorder element is the root: $P$. In the inorder sequence the left subtree is S Q E and the right subtree is F R G.
- Left subtree: preorder Q S E gives root $Q$ with left child $S$ and right child $E$. Right subtree: preorder R F G gives root $R$ with left child $F$ and right child $G$.
- Postorder: S E Q (left), F G R (right), then P: **S E Q F G R P**.
- A is true and B is true. $Q$ has two children, so C is false. The left child of $R$ is $F$ and $G$ is its right child, so D is false.
- Answer: **A, B**

## 202631
- A failed search must go all the way to an empty range. With a three-way comparison at each step, the worst case is $\lfloor\log_2n\rfloor+1$ comparisons.
- $\lfloor\log_21000\rfloor+1=9+1=10$ (since $2^9=512\le1000<1024=2^{10}$).
- Answer: **10**

## 202633
- A bijection with $f(f(n))=n$ is an involution: it consists of fixed points and swapped pairs.
- Identity: 1. One swapped pair and two fixed points: $\binom42=6$. Two swapped pairs: 3.
- Total $1+6+3=10$.
- Answer: **10**

## 202639
- Let $C(n)$ be the number of calls. $C(n)=1$ for $n\le0$, and $C(n)=1+C(n-1)+C(n-2)$ otherwise.
- $C(1)=1+1+1=3$; $C(2)=1+3+1=5$; $C(3)=1+5+3=9$; $C(4)=1+9+5=15$.
- Answer: **C**

## 202640
- If DFS of $G$ from $v$ reaches $u$, there is a path $v\to u$ in $G$. Reversing every edge gives a path $u\to v$ in $G^R$, so BFS of $G^R$ from $u$ reaches $v$. D is true.
- A compares different sets: vertices reachable from $v$ in $G^R$ are those that can reach $v$ in $G$, not those reachable from $v$. Not guaranteed.
- B and C are false in general: the reachable sets differ and BFS order is not the reverse of DFS order.
- Answer: **D**

## 202649
- $P=[1,2,3,5,4]$.
- **Bubble sort** (four passes) makes $4+3+2+1=10$ comparisons, so $N_1=10$.
- **Insertion sort**: inserting 2, 3 and 5 takes one comparison each; inserting 4 compares with 5 (swap) and with 3 (stop): 2. So $N_2=1+1+1+2=5$.
- (A) says $N_2=4$: false. (B) $N_1>N_2$: true. (C) Insertion sort swaps only 4 and 5: one swap, true.
- (D) Both algorithms make comparisons between elements already in order (bubble compares sorted pairs; insertion compares 4 with 3). True.
- Answer: **B, C, D**

## 202650
- Each call to `outer()` creates its own list `x` and its own closure, so `f1` and `f2` do not share a list. A is false.
- `f1(10)` gives `[10]`; `f1(20)` gives `[10, 20]` (Line Q), so B is true.
- `f2(30)` uses `f2`'s own list, giving `[30]`, not `[10, 20, 30]`. C is false.
- `f1(40)` gives `[10, 20, 40]` (Line S). D is true.
- Answer: **B, D**

## 202658
- One call of `fun` does one bubble pass and returns the number of swaps it made. The loop calls it 5 times on the same list.
- Pass 1 on $[5,3,4,1,2]$: swaps 5 with 3, 4, 1, 2: 4 swaps, giving $[3,4,1,2,5]$.
- Pass 2: swaps 4 with 1 and 4 with 2: 2 swaps, giving $[3,1,2,4,5]$.
- Pass 3: swaps 3 with 1 and 3 with 2: 2 swaps, giving $[1,2,3,4,5]$. Passes 4 and 5: 0 swaps.
- Total $4+2+2=8$, which equals the number of inversions of the original array.
- Answer: **8**
