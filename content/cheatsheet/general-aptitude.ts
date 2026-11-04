import type { SheetSubject } from './types';

const r = String.raw;

export const generalAptitude: SheetSubject = {
  id: 'general-aptitude',
  name: 'General Aptitude',
  marks: '15M (fixed)',
  notes: 'General Aptitude',
  points: [
    r`Always 5 one-mark and 5 two-mark questions: verbal, quantitative, analytical and spatial.`,
    r`Read the question stem for what is asked (largest? not? except?) before computing.`,
    r`Spatial: dice, paper folding, nets; draw rather than imagine.`,
    r`Verbal: eliminate on grammar first (agreement, tense, preposition), then on meaning.`,
  ],
  formulas: [
    {
      title: 'Arithmetic',
      items: [
        { label: 'Percent change', tex: r`$\dfrac{\text{new}-\text{old}}{\text{old}}\times100$` },
        { label: 'Profit and loss', tex: r`$SP=CP\left(1\pm\tfrac{p}{100}\right)$` },
        { label: 'Simple interest', tex: r`$SI=\dfrac{PRT}{100}$` },
        { label: 'Compound interest', tex: r`$A=P\left(1+\tfrac{r}{100}\right)^n$` },
        { label: 'Average speed (equal distances)', tex: r`$\dfrac{2ab}{a+b}$` },
        { label: 'Work together', tex: r`$\dfrac1{t}=\dfrac1{t_1}+\dfrac1{t_2}$` },
        { label: 'LCM and HCF', tex: r`$\mathrm{LCM}\times\mathrm{HCF}=a\times b$ for exactly two numbers $a,b$` },
      ],
    },
    {
      title: 'Algebra and numbers',
      items: [
        { label: 'Logarithms', tex: r`$\log(xy)=\log x+\log y,\ \log x^k=k\log x$` },
        { label: 'Identities', tex: r`$a^2-b^2=(a-b)(a+b),\ (a+b)^2=a^2+2ab+b^2$` },
        { label: 'Divisibility', tex: r`by 3 or 9: digit sum; by 11: alternating digit sum` },
        { label: 'Number of divisors', tex: r`$n=\prod p_i^{a_i}\Rightarrow\prod(a_i+1)$` },
      ],
    },
    {
      title: 'Geometry and logic',
      items: [
        { label: 'Circle', tex: r`area $\pi r^2$, circumference $2\pi r$` },
        { label: 'Regular polygon interior angle', tex: r`$\dfrac{(n-2)\,180^\circ}{n}$` },
        { label: 'Pythagoras', tex: r`$a^2+b^2=c^2$` },
        { label: 'Planar graphs', tex: r`$V-E+F=2$ for a connected planar graph ($1+c$ with $c$ components); four colours always suffice` },
        { label: 'Dice', tex: r`opposite faces sum to 7 on a standard die` },
      ],
    },
  ],
  traps: [
    r`Percentage increase followed by the same decrease does not return to the start.`,
    r`Weighted averages need the weights, not just the group averages.`,
    r`Syllogisms: "some" statements never prove "all" conclusions.`,
  ],
};
