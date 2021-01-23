const agents = Object.freeze({
  cat1: 'Cat One',
  cat2: 'Cat Two',
  machine: 'The Machine',
})

// coinflip is the random generator produced during cat creation
// () -> Number
function guessCat2Status(coinflip) {
  const guesses = Array(1001).fill(() => coinflip())
  const averageReducer = (agg, item, i, { length }) =>
    i + 1 === length ? (agg + item) / length : agg + item
  const guessAverage = guesses.map((guess) => guess()).reduce(averageReducer, 0)
  return guessAverage.toFixed(3)
}

function createCatReport({ agents, stats }) {
  const deadOrAlive = (score) => (score ? 'alive' : 'dead')
  const matched =
    deadOrAlive(Math.round(stats[agents.machine])) ===
    deadOrAlive(stats[agents.cat2])
      ? 'correctly'
      : 'incorrectly'
  const report = {
    title: '\n-- Cats Report -------------\n',
    [agents.cat1]: `- ${agents.cat1} is ${deadOrAlive(stats[agents.cat1])}`,
    [agents.machine]: `- ${agents.machine} ${matched} predicted ${
      agents.cat2
    } is ${deadOrAlive(
      Math.round(stats[agents.machine])
    )}, \n  picking alive ${(stats[agents.machine] * 100).toFixed(
      2
    )}% of over a thousand times.`,
    [agents.cat2]: `- ${agents.cat2} is ${deadOrAlive(
      stats[agents.cat2]
    )}. Long live ${agents.cat2}.`,
    footer: '\n------------- \n',
  }
  return report
}

function createCats(agents) {
  const coinflipper = () => Math.round(Math.random())
  const outcome = coinflipper()
  const catPackage = Object.freeze({
    [agents.cat1]: () => !!outcome,
    [agents.cat2]: () => !outcome,
    coinflipper,
  })
  return catPackage
}

const catPackage = createCats(agents)
const machineGuess = guessCat2Status(catPackage.coinflipper)

const stats = {
  [agents.cat1]: catPackage[agents.cat1](),
  [agents.machine]: machineGuess,
  [agents.cat2]: catPackage[agents.cat2](),
}

const catReport = createCatReport({
  agents,
  stats,
})

const writeCatReport = (report) =>
  Object.values(report).forEach((line) => console.log(line))

// eslint-disable-next-line
writeCatReport(catReport)
