---
num: 81
title: Approximate Inference: Sampling Methods in Depth
tag: Artificial Intelligence
---
Exact inference is NP-hard in general networks, so large models are handled by **sampling**: draw random complete assignments from the network and estimate probabilities from the frequencies. By the law of large numbers the estimates converge to the true values as the number of samples $N\to\infty$.

## Prior (direct) sampling

1. Order the variables topologically (parents before children).
2. For each variable, look up the sampled values of its parents and sample its value from the corresponding CPT row.
3. Return the full assignment.

To estimate the probability of an event $S$, use $\hat P(S)=N(S)/N$. This is consistent and unbiased, but it ignores evidence, so it cannot answer a conditional query directly.

## Rejection sampling

Generate prior samples and **discard** any that disagree with the evidence $e$. Then
$$\hat P(X=x\mid e)=\frac{N(X=x,\,e)}{N(e)}$$
The fraction of samples kept equals the prior probability of the evidence, $P(e)$. When the evidence is rare (say $10^{-5}$) nearly every sample is wasted: about $10^7$ samples are needed to keep 100.

:::example Rejection sampling by counts
From 10,000 prior samples, 9,600 have Symptom = F, 320 have Symptom = T and Disease = T, and 80 have Symptom = T and Disease = F.
- Samples kept (matching the evidence): $320+80=400$, so the **acceptance rate** is $400/10{,}000=4\%$ (96% were discarded).
- $\hat P(\text{Disease}=T\mid\text{Symptom}=T)=\dfrac{320}{400}=0.80$.
:::

## Likelihood weighting

Likelihood weighting never rejects a sample. Process the variables in topological order with weight $w=1$:
- if the variable is **evidence**: set it to its observed value and multiply $w$ by $P(e_i\mid\text{Parents}(E_i))$;
- otherwise **sample** it from its CPT given its parents.

The estimate uses the weights: $\ \hat P(X=x\mid e)=\dfrac{\sum_{j:\,x_j=x}w_j}{\sum_{j}w_j}$.

**Why it works.** The non-evidence variables are sampled from $q(z)=\prod_{Z_i\notin E}P(z_i\mid\text{Parents}(Z_i))$, which is not the true distribution because the evidence was forced. The weight is $w(z)=\prod_{E_i\in E}P(e_i\mid\text{Parents}(E_i))$. Their product is
$$q(z)\,w(z)=\prod_{i}P(V_i\mid\text{Parents}(V_i))=P(z,e)$$
the true joint probability, so the weighted frequencies converge to the exact posterior. Likelihood weighting is a special case of **importance sampling**, in which samples from a proposal $q$ are reweighted by $p/q$ to estimate expectations under a target $p$.

Its weakness: when the evidence sits far down the network, the upstream variables are sampled without regard to it, and most weights become tiny.

:::example A weight calculation
Network Cloudy → Rain → WetGrass and Cloudy → Sprinkler → WetGrass. Evidence: Sprinkler = T, WetGrass = T. A run samples Cloudy = T and Rain = F. Given $P(\text{Sprinkler}{=}T\mid\text{Cloudy}{=}T)=0.10$ and $P(\text{WetGrass}{=}T\mid\text{Sprinkler}{=}T,\text{Rain}{=}F)=0.90$:

Start $w=1$. Cloudy and Rain are sampled, so $w$ does not change. For Sprinkler (evidence): $w=1\times0.10=0.10$. For WetGrass (evidence): $w=0.10\times0.90=0.09$. The sample's weight is **0.09**.
:::

## Gibbs sampling (MCMC)

Gibbs sampling is a Markov chain Monte Carlo method. It fixes the evidence and repeatedly **resamples one non-evidence variable at a time** from its distribution given its Markov blanket:
$$P(Z_i\mid\text{MB}(Z_i))=\alpha\,P(Z_i\mid\text{Parents}(Z_i))\prod_{Y_j\in\text{Children}(Z_i)}P(Y_j\mid\text{Parents}(Y_j))$$

1. Fix the evidence; start the other variables at arbitrary values.
2. Repeatedly pick a non-evidence variable (at random or round-robin) and resample it from the formula above.
3. Record the state, **discard an initial burn-in period**, and count frequencies of the query variable in the remaining states.

Two statistical points matter. **Burn-in:** the arbitrary starting state is not typical of the posterior, so the early states are thrown away until the chain reaches its stationary distribution. **Autocorrelation:** each step changes one variable, so successive states are strongly dependent (unlike prior and rejection samples, which are independent); **thinning** (keeping every $k$-th state) reduces the correlation.

:::example One Gibbs transition
Network $A\to B\to C$ with evidence $C=T$. Current state $(A{=}T,B{=}F,C{=}T)$; resample $B$. Its Markov blanket is $\{A,C\}$. With $P(B{=}T\mid A{=}T)=0.70$, $P(C{=}T\mid B{=}T)=0.80$ and $P(C{=}T\mid B{=}F)=0.20$:
- $P^*(B{=}T)=0.70\times0.80=0.56$
- $P^*(B{=}F)=0.30\times0.20=0.06$
- Normalise by $0.62$: $P(B{=}T\mid\text{MB})=\dfrac{0.56}{0.62}=\dfrac{28}{31}\approx0.9032$.

Draw $r\sim U(0,1)$: if $r<0.9032$, $B$ becomes T; otherwise it stays F.
:::

## Comparing the four methods

| | Prior | Rejection | Likelihood weighting | Gibbs (MCMC) |
|---|---|---|---|---|
| Handles evidence | no | yes | yes | yes |
| Wasted samples | none | many if $P(e)$ is small | none (samples are weighted) | none (burn-in only) |
| Samples independent | yes | yes | yes | **no** |
| Weak spot | no evidence | rare evidence | evidence deep in the network | burn-in, correlation |
| Local computation | forward CPTs | forward CPTs | forward CPTs | Markov blanket only |

**Which to choose.** No evidence: prior sampling. Likely evidence: rejection sampling. Unlikely evidence: likelihood weighting. Complex networks with evidence anywhere: Gibbs sampling.

## Practice

:::example Which statements are true? (practice question)
(A) In rejection sampling the expected fraction of accepted samples equals $P(E=e)$. (B) In likelihood weighting, evidence variables are never sampled; they are fixed. (C) In likelihood weighting the weight is the product of $P(e_i\mid\text{parents})$ over the evidence variables. (D) In Gibbs sampling, consecutive states are independent.

**A, B and C are true.** (D) is false: Gibbs states form a Markov chain, and each differs from the previous one in at most one variable, so they are correlated.
:::

## What the exam asks

- Compute a **weight** or an **acceptance rate** and a posterior estimate from sample counts.
- Compute a **Gibbs transition probability** from the Markov blanket.
- Choose the **right sampler** and say why rejection sampling fails on rare evidence.
- State which methods give **independent** samples, and what burn-in and thinning are for.
