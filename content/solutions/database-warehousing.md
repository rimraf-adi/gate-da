## 202426
- "Every name in Team appears in Defender or Forward" means: the set of names in Team, minus the set of names in Defender or Forward, is empty.
- Names in Defender or Forward is the **union** $\Pi_{name}(Defender)\cup\Pi_{name}(Forward)$ (not the intersection). So the expression is $\Pi_{name}(Team)\setminus\big(\Pi_{name}(Defender)\cup\Pi_{name}(Forward)\big)=\emptyset$.
- Answer: **C**

## 202431
- Team rows in Jaipur have IDs 2, 1 and 6. Join each with Raider on ID: Raider 2 has 219 raid points, Raider 1 has 250, Raider 6 has 215.
- All three exceed 200, so all three rows qualify.
- Answer: **3**

## 202446
- Compute attribute closures. $V\to X$, $U\to V$, $U\to W$, $WX\to Y$, $WX\to Z$.
- **A.** $\{V,W\}^+$: $V\to X$ gives $X$; now $WX$ is present, so $Y$ and $Z$ follow. $VW\to YZ$ holds.
- **B.** $WX\to Y$ and $WX\to Z$ together give $WX\to YZ$ (union). Holds.
- **C.** $U$ appears on no right-hand side, so nothing determines it: $VW\to U$ does not hold.
- **D.** $VW\to X$, then $WX\to Y$, so $VW\to Y$ holds.
- Answer: **A, B, D**

## 202455
- The query has a **range** condition (`CustomerRating > 3.4`), an **equality** condition (`Genre.Name = "Comedy"`), and equality joins.
- A **B+ tree** supports both range and equality, so it can serve every attribute.
- A **hash index** supports only equality, so it cannot help the range condition on `CustomerRating`. That rules out C and D.
- A (B+ tree on everything) and B (hash for the equality on `Genre.Name`, B+ tree for the rest) both work.
- Answer: **A, B**

## 202516
- In a dependency-preserving decomposition, every functional dependency can be checked inside a single relation.
- If it is not preserved, some dependency spans several relations, so to check it you must first **join** those relations. The join is therefore executed more often.
- Answer: **C**

## 202517
- Work from the inside out: $\sigma_{maker=ABC}(Make)$ gives the models made by ABC.
- $Car\bowtie(\cdot)$ joins on `model`, giving cars of those models; $\sigma_{color=red}$ keeps the red ones. So this is the red cars made by ABC.
- $Own\bowtie(\cdot)$ joins on `serial`, giving who owns them, and $\pi_{owner}$ keeps the owner names.
- Answer: **C** (all owners of a red car made by ABC)

## 202533
- The inner query gives the maximum loan amount at SR Nagar: $\max(40000,25000,65000)=65000$.
- Loans with an amount greater than 65000 are L11 (90000), L23 (80000) and L25 (70000).
- Answer: **3**

## 202546
- `GROUP BY CUBE(D1, D2)` produces groups for every subset of the grouping columns.
- $(D1,D2)$: $3\times2=6$ groups. $(D1)$: 3. $(D2)$: 2. $()$: 1 (the grand total).
- Total $6+3+2+1=12$.
- Answer: **D**

## 202556
- **A.** `aadhaar` in Customer is a foreign key, and many customers could share one Aadhaar. It is not a candidate key. False.
- **B.** `phone` has no NOT NULL or key constraint, so it can be NULL. True.
- **C.** `aadhaar` is the primary key of Person, so it is a candidate key there. True.
- **D.** A primary key cannot be NULL. False.
- Answer: **B, C**

## 202557
- $A\to BCEF$, $E\to DG$, so $A^+=\{A,B,C,E,F,D,G\}$, all attributes: $A$ is a key. $BC\to A$, so $BC$ is also a key.
- $E^+=\{E,D,G\}$ is not all attributes, so $E$ is not a key. The candidate keys are $A$ and $BC$ (B true; A and C false).
- BCNF requires the left side of every non-trivial dependency to be a superkey. $E\to DG$ has left side $E$, which is not a superkey, so $R$ is **not in BCNF** (D true).
- Answer: **B, D**

## 202562
- $\pi_{branch,customer}(Loan\bowtie Borrower)$ gives the (branch, customer) pairs: Banjara Hills: Anand, Karteek; Kondapur: Karteek, Sunil; SR Nagar: Ankita, Gopal, Karteek; Balanagar: Karteek, Sunil.
- Division by $\pi_{branch}(Loan)$ keeps customers who are paired with **every** branch (all four).
- Karteek appears for all four. Sunil is missing SR Nagar and Banjara Hills; the others miss several.
- Answer: **1**

## 202614
- (A) Classmate is symmetric: true. (B) $\forall x\,P(x)\equiv\neg\exists x\,\neg P(x)$: true. (D) "All humans are mortal" is $\forall x\,(\text{IsHuman}(x)\Rightarrow\text{IsMortal}(x))$: true.
- (C) "Each king is a person" is $\forall x\,(\text{IsKing}(x)\Rightarrow\text{IsPerson}(x))$. Writing $\wedge$ instead says everything is a king and a person. So C is **not** true.
- Answer: **C**

## 202617
- $D$ appears on no right-hand side, so every key contains $D$.
- $AD$: $A\to BC$, so $ABCD$; $CD\to E$ gives $E$. All attributes. Key.
- $ED$: $E\to A$, then $A\to BC$. All attributes. Key.
- $CD$: $CD\to E$, then $E\to A$, then $A\to BC$. All attributes. Key.
- None of these can be shrunk (for example $D^+=\{D\}$, $A^+=\{A,B,C\}$). So the candidate keys are exactly $AD$, $ED$ and $CD$.
- Answer: **A**

## 202618
- Going from Country to State moves to a **finer** level of the location hierarchy: the same measure shown in more detail. That is **drill-down**. (Roll-up would go to a coarser level; slicing and dicing select parts of the cube without changing the level.)
- Answer: **D**

## 202626
- $E$ in $S$ is a foreign key referencing $A$ in $R$. $R$ is the referenced (parent) table and $S$ the referencing (child) table.
- Inserting into $r$ can never create a dangling reference. True.
- Deleting from $s$ removes a referencing row, so it is always safe. True.
- Deleting from $r$ can remove a row that $s$ still points to, and inserting into $s$ can add a value with no match in $r$. Both can violate the constraint.
- Answer: **A, B**

## 202632
- A non-leaf node with $n$ node pointers has $n-1$ search keys (data record pointers appear only in leaves).
- $10n+11(n-1)\le4096$, so $21n\le4107$ and $n\le195.57$.
- The maximum is 195.
- Answer: **195**

## 202641
- Keys in each leaf are at most 2 and a non-leaf node holds at most 3 pointers (2 keys). Current leaves: $[1,5]$, $[7,8]$, $[9,12]$, with root keys 5 and 8.
- Inserting 3 goes into leaf $[1,5]$, giving $[1,3,5]$: too many keys. Split into $[1,3]$ and $[5]$, and push the separator 3 up.
- The root would now hold keys 3, 5, 8, which means 4 pointers: too many, so the root splits as well. The middle key **5** moves up into a new root, with children $[3]$ and $[8]$.
- The root contains only 5.
- Answer: **A**

## 202642
- $X\bowtie Y$ (on $P,Q$) gives $(P1,Q1,R1,2)$ and $(P3,Q3,R2,1)$.
- Selecting $Q=Q3\vee R=R2$ keeps only $(P3,Q3,R2,1)$.
- $Y\bowtie Z$ (on $P$) gives $(P1,Q1,2,T1)$, $(P1,Q2,5,T1)$ and $(P3,Q3,1,T2)$. Selecting $S>1$ keeps the first two.
- Joining the two results needs equal $P$, $Q$ and $S$. The first result has $P3$ only and the second has $P1$ only, so the join is **empty**: 0 tuples.
- **Check this one against the official key.** The book's key says D (3), but working the expression as printed gives 0 (option A).
- Answer: **D** (the book's key; see the note above)

## 202643
- Each dimension has a hierarchy of 3 levels (Year, Month, Day; Country, State, City; Item Category, Item Type, Item), and each also has the "all" level. So each dimension offers $3+1=4$ choices.
- The number of cuboids is the product $4\times4\times4=4^3$.
- Answer: **A**

## 202651
- The goal is the size of each employee's team next to their EmpID.
- **A.** The sub-query computes the size of every team (`GROUP BY TeamID`), and joining it back on `TeamID` gives each employee their team's size. Correct.
- **B.** Joining the table with itself on both `TeamID` and `EmpID` matches each employee with only themselves, so the count is always 1. Wrong.
- **C.** Grouping by `EmpID` makes every group of size 1. Wrong.
- **D.** The sub-query does not select `TeamID`, so `B.TeamID` does not exist. Invalid SQL.
- Answer: **A**

## 202659
- The condition needs, for each tuple $t$ in $X$, a matching $z$ in $X$ (the tuple itself qualifies) and a tuple $m$ in $Y$ with the same $P$ and $S>1$.
- P1: $Y$ has $S=10$ and 15. Yes. P2: $S=20$. Yes. P3: $S=1$, which is not greater than 1. No.
- Two tuples are returned.
- Answer: **2**

## 202660
- For each row $A$, the first sub-query counts rows with a **larger** balance and the second counts rows with a **smaller** balance. The row qualifies when larger $\ge$ smaller.
- A1 and A2 (5000): larger 3, smaller 0. Qualify.
- A3 (10000): larger 2 (15000, 18000), smaller 2 (5000, 5000). $2\ge2$, qualifies.
- A4 (15000): larger 1, smaller 3. No. A5 (18000): larger 0, smaller 4. No.
- Three rows.
- Answer: **3**

## 202661
- Convert to relations:
- one relation for E1 with attributes A11, A12, A13;
- one for E2 with A21 and A23 (the multi-valued attribute A22 is removed from it);
- one for the multi-valued attribute A22: (A21, A22);
- one for the many-to-many relationship R12: (A11, A21).
- Each is in 3NF. Total **4** relations.
- Answer: **4**
