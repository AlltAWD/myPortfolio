---
title: "Special Relativity Simulator"
description: "Interactive special relativity in the browser: Minkowski diagrams, frames and the light cone, on a unit-tested physics core. Being rebuilt in plain TypeScript."
githubUrl: "https://github.com/AlltAWD/special-relativity-sim"
demoUrl: "https://alltawd.github.io/special-relativity-sim/"
tags:
  - name: "Physics"
    color: "#f59e0b"
  - name: "TypeScript"
    color: "#3178c6"
  - name: "Simulation"
    color: "#0ea5e9"
featured: false
createdAt: 2026-02-13
---

# Special Relativity Simulator

Interactive simulations of special relativity, in natural units ($c = 1$). The
first version was a Next.js app; I'm rebuilding it as a small static site in
plain TypeScript, with the physics separated from the drawing so it can be
tested on its own.

## What's there now

- **Spacetime diagram.** A Minkowski diagram with the light cone and a second
  frame $S'$. Click to place events and read their coordinates in both frames.
  Events that are simultaneous in $S$ get different $t'$ in $S'$, which is the
  relativity of simultaneity in one table.
- **A tested physics core.** Lorentz factor, boosts, the invariant interval,
  velocity addition, Doppler factor and the twin paradox, with unit tests that
  check the physics rather than the code: a boost followed by its inverse is the
  identity, the interval is the same in every frame, and velocity addition never
  exceeds $c$.

## Bugs the tests caught in the first version

- The twin paradox split Earth time evenly between the two legs. That is only
  right when the outbound and return speeds are equal: 3 light-years out at
  $0.6c$ and back at $0.8c$ gives 6.25 years aboard, not 6.125.
- The light-cone lines were drawn to the corners of a non-square canvas, so light
  travelled at about 35.5° instead of 45°.

## Next

Porting the remaining simulations (time dilation, length contraction, velocity
addition, the Lorentz transform, the twin paradox, and a 3D highway view), then
frame switching in the highway view, so every clock and position can be seen
from any object's rest frame.
