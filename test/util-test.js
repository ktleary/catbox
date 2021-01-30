/* eslint-disable */
const test = require("ava");
const {
  deadOrAlive,
  deadOrAliveRound,
  resolve,
  writeLn,
  writeEachValue,
} = require("../util");

// - deadOrAlive ------------
test("deadOrAlive returns dead", (t) => {
  t.true(deadOrAlive(false) === "dead");
});

// - deadOrAliveRound ------------
test("deadOrAliveRound it returns dead", (t) => {
  t.true(deadOrAliveRound(0.47) === "dead");
});

test("deadOrAliveRound it returns alive", (t) => {
  const result = deadOrAliveRound(1.1);
  t.true(deadOrAliveRound(100) === "alive");
});

test("deadOrAliveRound is optimistic", (t) => {
  const result = deadOrAliveRound(0.5);
  t.true(result === "alive");
});

test("deadOrAliveRound is realistic", (t) => {
  const result = deadOrAliveRound(0.499999);
  t.true(result === "dead");
});

// - resolve ------------

test("it resolves the function", (t) => {
  const fn = () => 1 + 1;
  t.true(2 === resolve(fn));
});

// - writeLn ------------

test("writeLn runs", (t) => {
  const text = "text";
  writeLn(text);
  t.true(text === text);
});

// - writeEachValue -------------

test("writeEachValue runs", (t) => {
  const values = ["one", 2, "three"];
  writeEachValue(values);
  t.true(values[1] === 2);
});
