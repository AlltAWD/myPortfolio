---
title: "SO-101 Manipulator — Robotics from Servos Up"
description: "Building a full manipulation stack on a low-cost robot arm, from raw serial-bus servo commands to validated forward kinematics — everything written from scratch."
githubUrl: "https://github.com/AlltAWD/so-101-arm"
tags:
  - name: "Robotics"
    color: "#22c55e"
  - name: "Control Systems"
    color: "#8b5cf6"
  - name: "Python"
    color: "#3776ab"
  - name: "Kinematics"
    color: "#0ea5e9"
featured: true
createdAt: 2026-06-07
---

# SO-101 Manipulator

A self-directed project teaching myself robotics on a low-cost open-source arm
(SO-101 / HuggingFace LeRobot). The rule I set myself: **write every layer from
scratch** rather than driving the arm through a stock pipeline. The goal is to
understand how a manipulator actually works, not to run someone else's demo.

## What's built

**Servo tooling.** Bus scanning, ID reassignment, live joint readout. The first
real bug was a duplicate servo ID — two motors answering to the same address —
which is why the arm wouldn't calibrate at all.

**Teach-and-repeat.** Torque off, hand-move the arm, record all six joints at
50 Hz to JSON; torque on, replay at the recorded timing.

**An `Arm` class.** One reusable hardware interface — port lifecycle, torque,
read/write, tick↔radian conversion, and smooth interpolated motion. Every earlier
script had reimplemented this; now the endianness fix lives in exactly one place.

**Calibration.** Each joint's zero derived from its measured mechanical range,
cross-checked against the URDF's declared range so a bad capture is caught at the
arm instead of three steps later.

**Forward kinematics.** A chain of homogeneous transforms from joint angles to
end-effector pose, built on CAD-derived URDF parameters.

## Result: FK validated against measurement

Predicted position checked against ruler measurements at four poses spanning
14–40 cm of reach:

| | |
|---|---|
| Mean absolute error | 0.8 cm |
| Systematic bias | +0.27 cm in x, +0.66 cm in z |
| Residual scatter after removing bias | **0.37 cm (x), 0.44 cm (z)** RMS |
| Correlation of error with reach | **−0.94** |

The constant bias in z turned out to be a datum-placement error — the measurement
reference sat about 7 mm below the URDF's base plane — not a fault in the model.
The row that matters is the last one. A wrong joint zero is an *angular* error, so
it gets multiplied by the lever arm and grows as the arm extends. Here the error
*shrinks* with reach: the two most extended poses were the two most accurate. That
rules out joint-zero error as a contributor.

Residual scatter of ~0.4 cm is consistent with what hand measurement can resolve —
locating the wrist-roll axis by eye is itself worth ±0.3–0.5 cm.

## Things that cost real debugging time

- **The servos lie about byte order.** Raw 16-bit reads come back byte-swapped,
  and writes need the same correction. Straightforward once found; baffling until
  then.
- **`/dev/ttyACM*` numbering is not stable.** It reshuffles with USB enumeration
  order, so "the wrong arm is moving" is a real failure mode. Both arms are now
  pinned by USB-adapter serial.
- **Replay smoothness is about distance per hop, not hop count.** Interpolation
  steps that are too fine make the servo finish each hop instantly and then idle
  until the next command — which reads as jitter. Deriving the step count from
  travel distance makes small and large moves glide alike.
- **Calibration has to agree with the URDF's convention.** The URDF defines joint
  zero as the *middle* of each joint's range, not a straight pose. A hand-posed
  "straight home" reference was off by ~12° on two joints, and the kinematics were
  correct while disagreeing with reality the whole time.

## Next

Servo characterization (accuracy, latency, sag under load), a hand-written PID
joint controller, then a camera rig and a learned visuomotor policy trained on
teleoperated demonstrations.
