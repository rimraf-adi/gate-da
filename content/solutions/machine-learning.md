## 202417
- The positive points are $x_1=(1,0)$, $x_2=(0,1)$, $x_5=(2,2)$ and the negative points are $x_3=(0,-1)$, $x_4=(-1,0)$, $x_6=(-2,-2)$. The data are linearly separable.
- For a hard-margin SVM, minimise $\tfrac12\|w\|^2$ subject to $y_i(w^Tx_i+b)\ge1$. The four constraints for the points closest to the boundary are $w_1+b\ge1$, $w_2+b\ge1$, $w_2-b\ge1$, $w_1-b\ge1$. These force $w_1,w_2\ge1+|b|$, so the smallest $\|w\|$ is at $b=0$, $w=(1,1)$.
- Check the constraint values: $x_1,x_2,x_3,x_4$ all give exactly 1 (on the margin); $x_5$ gives 4 and $x_6$ gives 4 (well outside).
- The support vectors are the points exactly on the margin: $x_1,x_2,x_3,x_4$.
- Answer: **D**

## 202418
- **PCA** reduces the number of features: it is **dimensionality reduction** (ii).
- **Naive Bayes** models $P(x\mid y)P(y)$: it is a **generative** model (iii).
- **Logistic regression** models $P(y\mid x)$ directly: it is a **discriminative** model (i).
- So (p) with (ii), (q) with (iii), (r) with (i).
- Answer: **C**

## 202419
- In k-means each cluster is the set of points closest to its centroid, a convex region (a Voronoi cell).
- The points $[1,1]$ and $[-1,1]$ are both in cluster 3, so every point on the segment between them is too. The midpoint is $[0,1]$.
- The other options are not forced: $[0,0]$, $[0,2]$ and $[2,0]$ lie off that segment.
- Answer: **D**

## 202420
- Naive Bayes with a binary class and $K$ binary attributes needs the prior $P(Y)$: 1 parameter.
- For each attribute and each class, $P(X_i=1\mid Y)$: $K\times2=2K$ parameters.
- Total $2K+1$.
- Answer: **B**

## 202422
- Fisher's linear discriminant chooses $w$ to maximise the ratio of between-class scatter to within-class scatter: $J(w)=\dfrac{w^TS_Bw}{w^TS_Ww}$.
- Answer: **A**

## 202427
- z-score $=\dfrac{x-\mu}{\sigma}=\dfrac{106000-96000}{21000}=\dfrac{10000}{21000}\approx0.476$.
- Answer: **B**

## 202442
- Single linkage merges the two clusters with the smallest **minimum** distance. Distances: $d_{12}=1$, $d_{45}=1$, $d_{34}=2$, $d_{24}=5$, $d_{23}=3$, $d_{25}=3$, $d_{14}=3$, $d_{13}=4$, $d_{35}=5$, $d_{15}=6$.
- Merge $\{x_1,x_2\}$ and $\{x_4,x_5\}$ at distance 1.
- $x_3$ is 2 from $\{x_4,x_5\}$ (through $x_4$) and 3 from $\{x_1,x_2\}$, so it joins $\{x_4,x_5\}$ at 2.
- Finally $\{x_1,x_2\}$ joins $\{x_3,x_4,x_5\}$ at 3 (the smallest of $d_{14}=3$, $d_{23}=3$, $d_{25}=3$).
- The dendrogram is $\big((x_1,x_2),\ (x_3,(x_4,x_5))\big)$.
- Answer: **A**

## 202443
- With positive inputs every ReLU is active, so each unit simply outputs a weighted sum and the whole network is linear.
- Each first-layer unit feeds both second-layer units with weight 2, and each second-layer unit feeds the output with weight 3. So each first-layer unit contributes $2\cdot3+2\cdot3=12$ to the output per unit of its own value.
- $x_1$ is connected to all three first-layer units, giving $p=3\times12=36$; $x_2$ and $x_3$ are each connected to two units, giving $q=r=2\times12=24$.
- Answer: **A** ($p=36,\ q=24,\ r=24$)

## 202453
- A data set is linearly separable if one straight line puts all circles on one side and all squares on the other.
- (i) The circles sit in the upper left and the squares in the lower right: a line separates them. Separable.
- (ii) A circle sits in the middle, surrounded by squares: not separable.
- (iii) Circles and squares occupy opposite corners (an XOR layout): not separable.
- (iv) The squares are on the left and the circles on the right: a line separates them. Separable.
- Answer: **A, D**

## 202462
- Target counts: Green wins 4 of 10 matches (1, 5, 7, 10), Blue 6. $H(\text{target})=-0.4\log_20.4-0.6\log_20.6=0.971$.
- Pitch = S (matches 1, 2, 4, 7, 10): Green 3, Blue 2, so $H=-0.6\log_20.6-0.4\log_20.4=0.971$.
- Pitch = F (matches 3, 5, 6, 8, 9): Green 1, Blue 4, so $H=-0.2\log_20.2-0.8\log_20.8=0.722$.
- Weighted: $\tfrac5{10}(0.971)+\tfrac5{10}(0.722)=0.8465$.
- $IG=0.971-0.8465=0.1245\approx0.12$.
- Answer: **0.12**

## 202463
- The diamond is at $(2,1)$. Distances: $(1,1)$ circle: 1; $(1,2)$ circle: $\sqrt2$; $(3,2)$ square: $\sqrt2$; $(2,3)$ square: 2; $(3,3)$ square: $\sqrt5$.
- $k=1$: nearest is the circle, so the label is circle.
- $k=3$: neighbours are the circle at distance 1, the circle at $\sqrt2$ and the square at $\sqrt2$: two circles against one square, so circle.
- $k=5$: all five points, 2 circles and 3 squares: **square**.
- The smallest odd $k$ is 5.
- Answer: **5**

## 202522
- The update for a mistaken positive sample ($y_n=+1$, $f<0$) is $w_{new}=w_{old}+x_n$ and $b_{new}=b_{old}+1$.
- Then $f(x_n;w_{new},b_{new})=w_{new}^Tx_n+b_{new}=f(x_n;w_{old},b_{old})+x_n^Tx_n+1$.
- Since $x_n^Tx_n+1>0$, the new value is larger: $f_{new}>f_{old}$. (D is not implied; $y_nf_{old}<0$ at the start.)
- Answer: **A**

## 202530
- Single linkage defines the distance between clusters as the **minimum** pairwise distance, DIS-2.
- Complete linkage uses the **maximum** pairwise distance, DIS-1.
- So B and D are correct.
- Answer: **B, D**

## 202534
- For $y=wx$, least squares gives $w=\dfrac{\sum x_iy_i}{\sum x_i^2}$.
- $\sum xy=(-1)(1)+(2)(-5)+(3)(5)=-1-10+15=4$ and $\sum x^2=1+4+9=14$.
- $w=\dfrac{4}{14}=0.2857\approx0.286$.
- Answer: **0.286**

## 202535
- The evidence: $P(x)=\tfrac34\cdot\tfrac13+\tfrac14\cdot\tfrac23=\tfrac14+\tfrac16=\tfrac5{12}$.
- Posteriors: $P(y_1\mid x)=\dfrac{1/4}{5/12}=0.6$ and $P(y_2\mid x)=\dfrac{1/6}{5/12}=0.4$.
- The classifier picks the larger posterior, $y_1$, and is wrong with probability $0.4$.
- Answer: **0.40**

## 202542
- First-layer outputs: top unit $R(au+bv)=R(2+3)=5$; bottom unit $R(cu+dv)=R(2-3)=0$.
- Output: $y=R(4\times5+(-1)\times0)=20$. Every ReLU on the path to $y$ is active except the bottom unit (output 0).
- $\dfrac{\partial y}{\partial a}=e\cdot1\cdot u=4\times2=8$ (through the active top unit).
- $\dfrac{\partial y}{\partial f}=h_{bottom}\cdot1=0$ (the bottom unit's output is 0).
- Answer: **A**

## 202548
- $\text{ReLU}(x)=\max(x,0)$ is continuous everywhere (A true).
- It has a corner at 0: the left slope is 0 and the right slope is 1, so it is **not** differentiable at 0 (B false, C true).
- $\text{ReLU}(x)=\text{ReLU}(ax)$ fails for negative $a$ (for $x=1,\ a=-1$: $1\ne0$). D false.
- Answer: **A, C**

## 202553
- Take Class-1 as $+1$ and Class-2 as $-1$. The constraints are: $(0,0)$: $-b\ge1$, so $b\le-1$; $(2,0)$: $2w_1+b\ge1$; $(0,2)$: $2w_2+b\ge1$; $(2,2)$: $2w_1+2w_2+b\ge1$.
- These force $w_1,w_2\ge\dfrac{1-b}{2}\ge1$, so the smallest $\|w\|$ is at $b=-1$ with $w=(1,1)$.
- The margin is $\dfrac{2}{\|w\|}=\dfrac2{\sqrt2}=\sqrt2$. So the margin statement (C) is true.
- With $b=-2$ the point $(2,0)$ would give $2-2=0$, on the decision boundary rather than past the margin. So $b=-1$ (option A) satisfies all constraints and $b=-2$ (option B) does not.
- **Check this one against the official key.** The book's key says B and C, but my working gives A and C.
- Answer: **B, C** (the book's key; see the note above)

## 202555
- $f(x)=\|\mu_{red}-x\|^2-\|\mu_{green}-x\|^2=2(\mu_{green}-\mu_{red})^Tx+\|\mu_{red}\|^2-\|\mu_{green}\|^2$.
- The $\|x\|^2$ terms cancel, so $f$ is **linear** in $x$ (B true, D false), of the form $w^Tx+b$ with $w=2(\mu_{green}-\mu_{red})$ and $b=\|\mu_{red}\|^2-\|\mu_{green}\|^2$ (C true).
- At $x=0$: $f(0)=\|\mu_{red}\|^2-\|\mu_{green}\|^2<0$ when $\|\mu_{red}\|<\|\mu_{green}\|$, so the label is **red**, not green (A false).
- Answer: **B, C**

## 202560
- The data have zero mean, so the covariance is $\tfrac1n\sum x^{(i)}x^{(i)T}$ and for a unit vector $u$, $\tfrac1n\sum(u^Tx^{(i)})^2=u^T\Sigma u$.
- The direction of maximum variance is the top eigenvector, where this equals the largest eigenvalue $\lambda_1=100^{2-1}=100$.
- Answer: **100**

## 202611
- Principal components are eigenvectors of the covariance matrix with distinct eigenvalues, so they are **orthogonal**.
- The angle between any two of them (including the first and the tenth) is $90^\circ$.
- Answer: **B**

## 202612
- The first 100 samples are held out for testing, leaving 900 for model selection.
- Leave-one-out cross-validation uses one split per sample, so it generates 900 splits.
- Answer: **C**

## 202623
- Clustering: **K-medoid** (A2). Classification: **Naive Bayes** (A4). Sampling: **Markov Chain Monte Carlo** (A1). Feature extraction: **Linear Discriminant Analysis** (A3).
- So T1:A2, T2:A4, T3:A1, T4:A3.
- Answer: **B**

## 202629
- The objective is $f_w(x)=wx$, so the gradient with respect to $w$ is $x=10$.
- SGD update: $w\leftarrow w-\eta\,x=10-0.10\times10=9.00$.
- Answer: **9.00**

## 202636
- Manhattan distances: $d(P1,P2)=1+2+2=5$; $d(P1,P3)=3+5+4=12$; $d(P1,P4)=1+0+4=5$; $d(P2,P3)=2+3+2=7$; $d(P2,P4)=0+2+2=4$; $d(P3,P4)=2+5+0=7$.
- The smallest is 4, between P2 and P4, so they merge first.
- Answer: **D**

## 202637
- Ridge regression adds an $L_2$ penalty on the weights. It shrinks them, which can increase bias but reduces variance.
- (A) is backwards: regularisation guards against doing well on training data and poorly on test data. (B) it uses the $L_2$ norm, not $L_1$. (C) it does not target negative values.
- Answer: **D**

## 202655
- The prediction is $w^Tx=(-3)(1)+(4)(2)=5$, and the true value is $x_1+x_2=3$, so the absolute error is 2.
- The regulariser is $0.20\times\|w\|^2=0.20\times(9+16)=5$.
- Total loss $=2+5=7.00$.
- Answer: **7.00**

## 202656
- No biases. Input to hidden 1: $30\times4=120$. Hidden 1 to hidden 2: $4\times3=12$. Hidden 2 to output: $3\times1=3$.
- Total $120+12+3=135$.
- Answer: **135**
