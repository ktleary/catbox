const { equals, prop } = require("ramda");
const { deadOrAlive, deadOrAliveRound } = require("./util");
const { CAT2, MACHINE } = require("./constants");
const { freeze } = Object;

const matched = (stats) =>
  equals(deadOrAliveRound(prop(MACHINE, stats)), deadOrAlive(prop(CAT2, stats)))
    ? "correctly"
    : "incorrectly";

// createCatReport (String, String, String, Object) -> String
const createCatReport = ({ CAT1, CAT2, MACHINE, stats }) => {
  const title = "\n-- Cats Report -------------\n";
  const catStatus = (cat, stats) =>
    `- ${cat} is ${deadOrAlive(prop(cat, stats))}.`;
  const machineStatus = (machine, cat, stats) =>
    `- ${machine} ${matched(stats)} predicted ${cat} is ${deadOrAliveRound(
      prop(MACHINE, stats)
    )}, \n  picking alive ${(prop(machine, stats) * 100).toFixed(
      2
    )}% of over 500 times.`;
  const longLive = (cat) => ` Long live ${cat}.`;
  const footer = "\n------------- \n";

  return freeze({
    title,
    [CAT1]: catStatus(CAT1, stats),
    [MACHINE]: machineStatus(MACHINE, CAT2, stats),
    [CAT2]: catStatus(CAT2, stats).concat(longLive(CAT2)),
    footer,
  });
};
/* eslint-disable fp/no-mutation */
module.exports = createCatReport;
