# catbox

spooky coin flips

## The original experiment (catbox.js)

Two entangled cats — "Cat One" and "Cat Two" — decided by one shared coin
flip: one is alive, the other deceased. Cat One's outcome is revealed, then
the machine guesses Cat Two's status until a period of time has elapsed.

The test: will quantum entanglement influence the machine's random generation
function to guess in favor of the actual outcome?

Verdict from the original run: no — the machine sampled fresh flips from the
generator, and fresh flips share no information with the hidden bit. Chance
forever.

## The Bell upgrade (spooky-cats.mjs)

The upgrade gives the machine what it was missing: a *measurement* of Cat One
(a real channel to the pair), and lets the measurement settings tilt. Then
three worlds compete:

| world | what it is | CHSH \|S\| |
|---|---|---|
| `independent` | no relation between the cats | ≈ 0 |
| `pre-agreed` | Einstein's local hidden variables — answers decided at pair creation, deterministic in (setting, λ) | ≤ 2.00 |
| `entangled` | the quantum singlet | ≈ 2.83 |

The entangled pair's guess-accuracy rides **above the classical line at every
tilt** — that excess is the spooky action at a distance (Bell 1964;
Aspect/Clauser/Zeilinger, Nobel 2022).

Run:

```bash
node spooky-cats.mjs
```

## Installation

- git clone
- npm install (for the original catbox.js; spooky-cats.mjs is dependency-free)

## Usage

- node catbox.js (the original experiment)
- node spooky-cats.mjs (the Bell upgrade)

## Contributing

- Please feel free to submit a PR
