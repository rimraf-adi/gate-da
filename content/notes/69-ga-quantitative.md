---
num: 69
title: Quantitative Aptitude
tag: General Aptitude
---
Quantitative aptitude is the arithmetic and elementary algebra a good problem solver does quickly and accurately. Each paper has about five questions of this kind. Most are solved by recognising the type and applying one formula.

## Number system and divisibility

**Divisibility rules**

| Divisor | Test |
|---|---|
| 2, 5, 10 | last digit even; 0 or 5; 0 |
| 3, 9 | sum of digits divisible by 3, 9 |
| 4, 8 | last two, three digits divisible by 4, 8 |
| 6 | divisible by both 2 and 3 |
| 11 | (sum of digits in odd places) minus (sum in even places) is 0 or a multiple of 11 |

**HCF and LCM.** For two numbers, $\text{HCF}\times\text{LCM}=a\times b$. If $n=p_1^{a_1}p_2^{a_2}\cdots$ then the number of divisors is $(a_1+1)(a_2+1)\cdots$.

:::example Divisors, unit digits and remainders
- $360=2^3\cdot3^2\cdot5$ has $(3+1)(2+1)(1+1)=24$ divisors.
- **Unit digit of $7^{123}$:** the unit digits of powers of 7 repeat with period 4 (7, 9, 3, 1). Since $123\bmod4=3$, the unit digit is **3**.
- **Remainder of $2^{10}$ divided by 7:** $2^3=8\equiv1\pmod7$, so $2^{10}=(2^3)^3\cdot2\equiv2$. The remainder is **2**.
:::

## Percentages, profit and loss, discount

- Percentage change $=\dfrac{\text{new}-\text{old}}{\text{old}}\times100$.
- Two successive changes of $a\%$ and $b\%$ give a net change of $a+b+\dfrac{ab}{100}$ percent.
- $\text{SP}=\text{CP}\left(1\pm\dfrac{p}{100}\right)$; profit% $=\dfrac{\text{SP}-\text{CP}}{\text{CP}}\times100$ (always on cost price).
- Discount is on the marked price: $\text{SP}=\text{MP}\left(1-\dfrac{d}{100}\right)$.

:::example Successive changes
A price rises 20% and then falls 20%. Net change $=20-20+\dfrac{(20)(-20)}{100}=-4\%$. It does **not** return to the original.

CP $=800$, SP $=920$: profit $=\dfrac{120}{800}\times100=15\%$.
:::

## Ratio, averages and mixtures

- If $a:b=c:d$ then $ad=bc$. Dividing a quantity $Q$ in ratio $m:n$ gives $\dfrac{m}{m+n}Q$ and $\dfrac{n}{m+n}Q$.
- Average $=\dfrac{\text{sum}}{\text{count}}$. For groups of sizes $n_1,n_2$ with averages $\bar x_1,\bar x_2$: combined average $=\dfrac{n_1\bar x_1+n_2\bar x_2}{n_1+n_2}$ (a **weighted** average, never the simple average of averages unless sizes are equal).
- **Alligation:** to mix two items of value $x_1<x_2$ into value $m$, the quantities are in ratio $(x_2-m):(m-x_1)$.

:::example Alligation
Mix 20% and 50% solutions to make a 30% solution. Ratio of 20% to 50% solution $=(50-30):(30-20)=20:10=2:1$.
:::

## Time, speed and distance; time and work

- $\text{speed}=\dfrac{\text{distance}}{\text{time}}$; convert km/h to m/s by multiplying by $\dfrac{5}{18}$.
- **Average speed** over equal distances at speeds $a$ and $b$ is $\dfrac{2ab}{a+b}$ (the harmonic mean), not $\dfrac{a+b}{2}$.
- **Relative speed:** subtract speeds when moving the same way, add when moving towards or away from each other.
- A train of length $L$ crosses a pole in $L/v$ and a platform of length $P$ in $(L+P)/v$.
- **Work:** if A finishes in $a$ days and B in $b$ days, together they take $\dfrac{ab}{a+b}$ days. Add rates, not times.

:::example Speed and work
- A 120 m train at 54 km/h passes a pole in $\dfrac{120}{54\times5/18}=\dfrac{120}{15}=8$ s.
- Up a hill at 40 km/h and back at 60 km/h: average speed $=\dfrac{2(40)(60)}{100}=48$ km/h.
- A takes 12 days and B takes 18 days: together $\dfrac{12\times18}{30}=7.2$ days.
:::

## Simple and compound interest

$$SI=\frac{PRT}{100}\qquad A=P\left(1+\frac{R}{100}\right)^{n}\qquad CI=A-P$$

For $n$ compounding periods per year use rate $R/n$ and $nT$ periods. The difference between CI and SI for two years is $P\left(\dfrac{R}{100}\right)^2$.

:::example Interest
On $10{,}000$ at 10% for 2 years: $A=10000(1.1)^2=12100$, so $CI=2100$, while $SI=2000$. Their difference is $100=10000\times(0.1)^2$.
:::

## Algebra, logarithms and series

- $a^2-b^2=(a-b)(a+b)$, $\ (a\pm b)^2=a^2\pm2ab+b^2$.
- For $ax^2+bx+c=0$: sum of roots $-\dfrac ba$, product $\dfrac ca$, discriminant $b^2-4ac$.
- $\log(xy)=\log x+\log y$, $\ \log\dfrac xy=\log x-\log y$, $\ \log x^k=k\log x$, $\ \log_ab=\dfrac{\log b}{\log a}$.
- Arithmetic progression: $a_n=a+(n-1)d$, $\ S_n=\dfrac n2\big(2a+(n-1)d\big)$.
- Geometric progression: $a_n=ar^{n-1}$, $\ S_n=a\dfrac{r^n-1}{r-1}$, and for $|r|<1$: $S_\infty=\dfrac a{1-r}$.

:::example Series
- AP with $a=3,\ d=2$: $S_{20}=\dfrac{20}{2}(6+38)=440$.
- $1+\tfrac12+\tfrac14+\cdots=\dfrac1{1-1/2}=2$.
:::

## Geometry and mensuration

| Figure | Area | Perimeter or surface/volume |
|---|---|---|
| Triangle | $\tfrac12bh$ | sum of sides; right triangle $a^2+b^2=c^2$ |
| Circle | $\pi r^2$ | $2\pi r$ |
| Sector (angle $\theta$) | $\dfrac{\theta}{360}\pi r^2$ | arc $\dfrac{\theta}{360}2\pi r$ |
| Cube (side $a$) | surface $6a^2$ | volume $a^3$, diagonal $a\sqrt3$ |
| Cylinder | curved $2\pi rh$ | volume $\pi r^2h$ |
| Sphere | surface $4\pi r^2$ | volume $\tfrac43\pi r^3$ |

Interior angle of a regular $n$-gon: $\dfrac{(n-2)180^\circ}{n}$. Common right triangles: (3,4,5), (5,12,13), (8,15,17).

## Data interpretation

Read bar charts, pie charts and tables carefully for units. Pie-chart angle $=\dfrac{\text{share}}{\text{total}}\times360^\circ$. For growth between years, use $\dfrac{\text{later}-\text{earlier}}{\text{earlier}}\times100$, and prefer ratios to absolute differences when sizes differ.

:::example Reading a chart
Sales (thousands): 2022: 40, 2023: 50, 2024: 45. Growth 2022 to 2023 is $\dfrac{10}{40}=25\%$; 2023 to 2024 is $\dfrac{-5}{50}=-10\%$. Average over the three years $=\dfrac{135}{3}=45$.
:::

## What the exam asks

- One-step formula problems: percentages, averages, ratio, speed, work, interest.
- Number properties: divisibility, remainders, last digits, counting divisors.
- Reading a chart or table and computing a growth, ratio or weighted average.
- Speed matters: set up the equation first, simplify numbers before multiplying, and check the units.
