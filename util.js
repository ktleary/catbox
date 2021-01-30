const { forEach, values } = require("ramda");
const { always, compose, equals, ifElse } = require("ramda");
const { round } = Math;

const deadOrAlive = ifElse(equals(true), always("alive"), always("dead"));
const deadOrAliveRound = compose(deadOrAlive, round);

const writeLn = (output) => console.log(output);
const writeEachValue = (hash) => forEach(writeLn, values(hash));
const resolve = (fn) => fn();

/* eslint-disable fp/no-mutation */
module.exports = {
  deadOrAlive,
  deadOrAliveRound,
  resolve,
  writeLn,
  writeEachValue,
};
