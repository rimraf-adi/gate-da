import type { SheetSubject } from './types';

const r = String.raw;

export const machineLearning: SheetSubject = {
  id: 'machine-learning',
  name: 'Machine Learning',
  marks: '~14M',
  notes: 'Machine Learning: Supervised',
  points: [
    r`Underfit: high bias, low variance. Overfit: low bias, high variance. More data and regularisation reduce variance.`,
    r`Scale features for kNN, SVM, ridge and PCA; centre the data before PCA.`,
    r`LOOCV is $k$-fold with $k=n$: low bias, expensive, high variance.`,
    r`Accuracy misleads on imbalanced data; use precision, recall and F1.`,
    r`k-means converges to a local minimum, so initialisation matters.`,
  ],
  formulas: [
    {
      title: 'Regression',
      items: [
        { label: 'Normal equations', tex: r`$\hat\beta=(X^TX)^{-1}X^Ty$` },
        { label: 'Simple regression', tex: r`$\beta_1=\dfrac{\sum(x_i-\bar x)(y_i-\bar y)}{\sum(x_i-\bar x)^2},\ \beta_0=\bar y-\beta_1\bar x$` },
        { label: 'R-squared', tex: r`$R^2=1-\dfrac{SS_{res}}{SS_{tot}}$` },
        { label: 'Ridge', tex: r`$\hat\beta=(X^TX+\lambda I)^{-1}X^Ty$` },
        { label: 'Logistic regression', tex: r`$P(y=1\mid x)=\sigma(w^Tx+b)$, linear decision boundary` },
      ],
    },
    {
      title: 'Classification',
      items: [
        { label: 'Naive Bayes', tex: r`$P(y\mid x)\propto P(y)\prod_i P(x_i\mid y)$` },
        { label: 'Fisher / LDA direction', tex: r`$w\propto S_W^{-1}(m_1-m_2)$` },
        { label: 'Hard-margin SVM', tex: r`minimise $\tfrac12\|w\|^2$ s.t. $y_i(w^Tx_i+b)\ge1$; margin $=\dfrac{2}{\|w\|}$` },
        { label: 'Entropy and information gain', tex: r`$H=-\sum p_i\log_2p_i,\ IG=H(\text{parent})-\sum\tfrac{n_k}{n}H(k)$` },
        { label: 'Gini impurity', tex: r`$1-\sum p_i^2$` },
      ],
    },
    {
      title: 'Evaluation',
      items: [
        { label: 'Precision / recall', tex: r`$\dfrac{TP}{TP+FP},\quad\dfrac{TP}{TP+FN}$` },
        { label: 'F1', tex: r`$\dfrac{2PR}{P+R}$` },
        { label: 'Accuracy', tex: r`$\dfrac{TP+TN}{TP+TN+FP+FN}$` },
        { label: 'Bias-variance', tex: r`$E[(y-\hat f)^2]=\text{Bias}^2+\text{Variance}+\sigma^2$` },
      ],
    },
    {
      title: 'Neural networks',
      items: [
        { label: 'Parameters in a dense layer', tex: r`$(n_{in}+1)\,n_{out}$` },
        { label: 'ReLU', tex: r`$\max(0,x)$: continuous, not differentiable at $0$` },
        { label: 'Gradient step (SGD)', tex: r`$w\leftarrow w-\eta\,\nabla_wL$` },
        { label: 'Backprop', tex: r`chain rule: $\dfrac{\partial L}{\partial w}=\dfrac{\partial L}{\partial a}\dfrac{\partial a}{\partial z}\dfrac{\partial z}{\partial w}$` },
      ],
    },
    {
      title: 'Unsupervised learning',
      items: [
        { label: 'k-means objective', tex: r`$\min\sum_k\sum_{x\in C_k}\|x-\mu_k\|^2$` },
        { label: 'Linkage', tex: r`single: min distance; complete: max; average: mean` },
        { label: 'PCA', tex: r`eigenvectors of the covariance matrix; variance explained $=\lambda_i/\sum_j\lambda_j$` },
        { label: 'PCA via SVD', tex: r`$X_c=U\Sigma V^T$; components are the columns of $V$` },
      ],
    },
    {
      title: 'k-NN, perceptron, k-medoid and PCA',
      items: [
        { label: 'k-NN', tex: r`majority vote of the $k$ nearest points; scale features; use odd $k$; $k=1$ has zero training error` },
        { label: 'Minkowski distance', tex: r`$\left(\sum|x_i-y_i|^p\right)^{1/p}$: $p=1$ Manhattan, $p=2$ Euclidean` },
        { label: 'Perceptron update', tex: r`on a mistake: $w\leftarrow w+yx,\ b\leftarrow b+y$; score of $x$ rises by $\|x\|^2+1$ (for $y=1$)` },
        { label: 'Perceptron convergence', tex: r`finite mistakes if the data are linearly separable; never converges on XOR` },
        { label: 'k-medoid', tex: r`centres are actual data points, so it is more robust to outliers than k-means` },
        { label: 'PCA steps', tex: r`centre, covariance $S$, eigenvectors of $S$ (orthogonal), project $z=U_k^T(x-\mu)$` },
        { label: 'PCA variance', tex: r`variance along $u_i$ is $\lambda_i$; explained share $=\sum_{i\le k}\lambda_i/\sum\lambda_i$` },
        { label: 'PCA via SVD', tex: r`$X_c=U\Sigma V^T$; components are the columns of $V$; $\lambda_i=\sigma_i^2/(n-1)$` },
        { label: 'Reconstruction error', tex: r`$(n-1)\sum_{i>k}\lambda_i$ over the data` },
      ],
    },
  ],
  traps: [
    r`Single linkage can chain clusters together; complete linkage prefers compact ones.`,
    r`Naive Bayes assumes conditional independence given the class, not independence overall.`,
    r`Principal components are orthogonal; the first has the largest eigenvalue, not the largest feature.`,
    r`Regularisation strength $\lambda$ larger means simpler model, more bias.`,
  ],
};
