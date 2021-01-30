const { forEach, values } = require("ramda");
const { compose } = require("ramda");
const { round } = Math;

// todo: remove flimsy coersive evaluation going against either 1 or true
const deadOrAlive = (value) => (value ? "alive" : "dead");
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
