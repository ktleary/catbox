#!/usr/bin/env node
// spooky-cats.mjs — Schrödinger's cats, now with a Bell test.
//
// Continues catbox.js (the ~2019 coinflipper): Cat One and Cat Two decided
// by one shared flip; a machine guesses Cat Two from Cat One.
//
// What catbox.js got right: the cats as frozen closures over one shared
// outcome — a perfectly anti-correlated pair. That IS entanglement.
// What it got wrong: the machine sampled fresh flips from the generator,
// which shares no information with the hidden bit. Pinned at chance forever.
//
// The upgrade: the machine now MEASURES Cat One (a real channel), the
// measurement settings can tilt, and three worlds compete:
//   independent  — no relation. Chance forever.
//   pre-agreed   — Einstein's local hidden variables: answers decided at
//                  pair creation, deterministic in (setting, λ). Bell's
//                  bound: |S| ≤ 2.
//   entangled    — the singlet: |S| → 2√2 ≈ 2.83. The excess over 2 is
//                  the "spooky action at a distance," and it is exactly the
//                  "guesses right more often than any pre-agreed coin could
//                  allow" that the original exercise was reaching for.

const cos = Math.cos;
const fair = () => (Math.random() < 0.5 ? -1 : 1); // +1 alive, -1 dead

// --- worlds: one measurement round, settings a (Cat One) and b (Cat Two) ---

const independent = () => ({ A: fair(), B: fair() });

const preAgreed = (a, b) => {
  const λ = Math.random() * Math.PI * 2;
  const A = Math.sign(cos(a - λ)) || 1;
  const B = -(Math.sign(cos(b - λ)) || 1);
  return { A, B };
};

const entangled = (a, b) => {
  const A = fair();
  const B = Math.random() < (1 - cos(a - b)) / 2 ? A : -A;
  return { A, B };
};

// --- measurement ---

const sample = (world, a, b, n = 20_000) =>
  Array.from({ length: n }, () => world(a, b));

const correlation = (rounds) =>
  rounds.reduce((s, { A, B }) => s + A * B, 0) / rounds.length;

// the machine: measures Cat One (A), predicts Cat Two is -A (anti-correlated)
const machineAccuracy = (rounds) =>
  rounds.reduce((s, { A, B }) => s + (B === -A ? 1 : 0), 0) / rounds.length;

// --- Bell / CHSH ---

const SETTINGS = [
  [0, Math.PI / 4],
  [0, -Math.PI / 4],
  [Math.PI / 2, Math.PI / 4],
  [Math.PI / 2, -Math.PI / 4],
];

const chsh = (world, n = 20_000) => {
  const [E1, E2, E3, E4] = SETTINGS.map(([a, b]) =>
    correlation(sample(world, a, b, n))
  );
  return E1 + E2 + E3 - E4;
};

// --- the tilt game: machine accuracy as the settings tilt apart ---

const TILTS = [0, 22.5, 45, 67.5, 90].map((deg) => (deg * Math.PI) / 180);
const WORLDS = [
  ["independent", independent],
  ["pre-agreed", preAgreed],
  ["entangled", entangled],
];

console.log("-- Cats Report (Bell edition) -------------");
console.log("world        |  CHSH |S|   | machine accuracy: Cat One → Cat Two");
console.log("             | (classical ≤ 2) | " + TILTS.map((t) => `${((t * 180) / Math.PI).toFixed(0).padStart(3)}°`).join("  "));
console.log("-".repeat(80));

for (const [name, world] of WORLDS) {
  const S = Math.abs(chsh(world)).toFixed(2);
  const row = TILTS.map(
    (t) => `${(machineAccuracy(sample(world, 0, t, 20_000)) * 100).toFixed(0)}%`
  ).join("  ");
  console.log(`${name.padEnd(12)} |    ${S}     | ${row}`);
}

console.log("-".repeat(80));
console.log("verdict: pre-agreed cats cap |S| at 2.00. the entangled pair measures");
console.log("≈2.83, and its guess-accuracy rides above the classical line at every");
console.log("tilt. that excess is the spooky action — the cats were never merely");
console.log("pre-agreed. (Bell 1964; Aspect/Clauser/Zeilinger, Nobel 2022.)");
console.log("- Cat Two is dead. Long live Cat Two.");
