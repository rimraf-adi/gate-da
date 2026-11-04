---
num: 72
title: Spatial Aptitude
tag: General Aptitude
---
Spatial aptitude is reasoning about shapes in two and three dimensions: folding, cutting, rotating, reflecting and counting. Each paper has about two questions of this kind. Sketching on rough paper is not optional; it is the method.

## Paper folding and cutting

When a folded sheet is cut or punched and then opened, the cut appears **mirrored across every fold line**.

1. Draw the final folded shape and mark the cut.
2. Unfold one fold at a time, reflecting the cut across that fold line.
3. Each fold **doubles** the number of cut copies (assuming the cut lies on every layer).

:::example Counting holes
A square paper is folded in half twice and a single hole is punched through all layers. Unfolded, it has $2\times2=4$ holes, one in each quarter, placed symmetrically.
:::

## Mirror and water images

- A **mirror image** reverses left and right (reflection in a vertical line).
- A **water image** reverses top and bottom (reflection in a horizontal line).
- For a clock seen in a mirror, the shown time is $11{:}60$ minus the actual time.

:::example Mirror clock
A clock shows 3:25. Its mirror image reads $11{:}60-3{:}25=8{:}35$.
:::

## Dice and cubes

- On a standard die, **opposite faces sum to 7**: 1 and 6, 2 and 5, 3 and 4.
- From two views of a die showing a common face, the remaining faces are fixed by the order they appear around that face. Use the opposite-faces fact to resolve what is hidden.
- A **net** is a flat pattern that folds into a cube. There are **11 distinct nets** of a cube. A valid net is six squares joined edge to edge. It is **invalid** if it contains a $2\times2$ block of squares, or a straight row of five or more squares (the ends would overlap when folded): in general, if two squares would land on the same face of the cube. A row of four is fine.

### Painted cube cut into unit cubes

A solid $n\times n\times n$ cube ($n\ge2$) painted on the outside is cut into $n^3$ unit cubes:

| Painted faces | Count |
|---|---|
| 3 faces | $8$ (the corners) |
| 2 faces | $12(n-2)$ (edges) |
| 1 face | $6(n-2)^2$ (face centres) |
| 0 faces | $(n-2)^3$ (hidden core) |

:::example A 4×4×4 cube
$n=4$: three painted faces 8; two faces $12\times2=24$; one face $6\times4=24$; none $2^3=8$. Total $8+24+24+8=64=4^3$.
:::

## Counting figures

Count systematically, by size, to avoid missing or repeating shapes.

- **Triangles:** if $k$ lines from the apex meet the base, they split it into $k+1$ parts and there are $\dfrac{(k+1)(k+2)}{2}$ triangles in all (every pair of base points gives one).
- **Squares in an $n\times n$ grid:** $\displaystyle\sum_{k=1}^{n}k^2=\dfrac{n(n+1)(2n+1)}{6}$.
- **Rectangles in an $n\times n$ grid** (squares included): $\binom{n+1}{2}^2$.

:::example Counting
- Three lines from the apex of a triangle to its base: $\dfrac{4\times5}{2}=10$ triangles.
- A $4\times4$ grid: squares $=1+4+9+16=30$; rectangles $=\binom52^2=100$.
:::

## 2D and 3D geometry

- **Regular polygons** tile the plane only when their interior angle divides $360^\circ$: equilateral triangles ($60^\circ$), squares ($90^\circ$) and regular hexagons ($120^\circ$).
- **Interior angle** of a regular $n$-gon is $\dfrac{(n-2)180^\circ}{n}$; the exterior angles always sum to $360^\circ$.
- A plane cutting a right circular **cone** gives a circle, ellipse, parabola or hyperbola depending on its tilt.
- Cube of side $a$: face diagonal $a\sqrt2$, space diagonal $a\sqrt3$.
- **Areas of regions inside circles:** subtract the areas you do not want (for example, a circle's area minus the inscribed square's area $2r^2$).
- **Graph colouring and planarity:** a **planar** graph can be drawn without crossing edges, and satisfies $V-E+F=2$; every planar graph is 4-colourable.

## Assembling and rotating shapes

- Rotate a shape by $90^\circ$ steps and check which features (notches, colours, corners) end up where.
- For puzzle pieces, match **edge lengths and angles** first, then tabs and notches.
- To find the odd shape out, list features (sides, symmetry, shading, orientation) and see which one differs.

## What the exam asks

- Predict the pattern of cuts or holes after unfolding a folded sheet.
- Find the opposite face of a die or which net folds into a cube.
- Count the unit cubes with a given number of painted faces, or count triangles, squares or rectangles in a figure.
- Mirror and water images, including clocks.
- Basic geometric reasoning: tilings, angles, areas of regions, planar-graph colouring.
