const { divide, length, map, prop, sum } = require("ramda");
const { CAT1, CAT2, MACHINE } = require("./constants");
const { resolve, writeEachValue } = require("./util");
const createCatReport = require("./report");
const { Random } = require("random-js");
const { freeze } = Object;

function guessCat2Status(coinflip) {
  const guesses = map(
    resolve,
    Array(501).fill(() => coinflip())
  );

  return divide(sum(guesses), length(guesses));
}

function createCats(CAT1, CAT2) {
  const random = new Random();
  const coinflipper = () => random.integer(0, 1);
  const outcome = coinflipper();
  return freeze({
    [CAT1]: () => !!outcome,
    [CAT2]: () => !outcome,
    coinflipper,
  });
}

const createStats = (catPackage, machineGuess) => ({
  [CAT1]: catPackage[CAT1](),
  [MACHINE]: machineGuess,
  [CAT2]: catPackage[CAT2](),
});

function main() {
  const catPackage = createCats(CAT1, CAT2);
  const machineGuess = guessCat2Status(prop("coinflipper", catPackage));
  const stats = createStats(catPackage, machineGuess);
  const catReport = createCatReport({
    CAT1,
    CAT2,
    MACHINE,
    stats,
  });
  return writeEachValue(catReport);
}

/* eslint-disable fp/no-unused-expression */
main();
