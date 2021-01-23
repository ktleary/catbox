const print = console.log

// getRandomBinary ::
const getRandomBinary = () => {
  function randomBinary() {
    return Math.round(Math.random())
  }
  return randomBinary
}

const catStatus = () => {
  const coinflip = () => Math.round(Math.random())
  const outcome = coinflip()
  return {
    cat1Status: () => !!outcome,
    cat2Status: () => !outcome,
    coinflip,
  }
}

const catVerdict = (cat, status) =>
  `${cat} was observed to be ${status < 0 ? 'dead' : 'alive'}`

const guessWork = (looks) =>
  `After ${looks} guesses,\nCatbox thought: ${(
    (outcome2dead / outcome2looks) *
    100
  ).toFixed(2)}% chance it was dead\n`

const Effects = {
  logCatStatus: (cat, status, who) =>
    console.log(`${who || ''}${cat} is ${status() < 1 ? 'dead' : 'alive'}`),
}

// checking to see if entangled generated numbers influence random number generation over a given number of guesses

const messages = Object.freeze({
  cat1Status: 'Cat one is ',
})

function guessCat2Status(coinflip) {
  const guesses = Array(201).fill(() => coinflip())
  const averageReducer = (agg, item, i, { length }) =>
    i + 1 === length ? (agg + item) / length : agg + item
  const guessAverage = guesses.map((guess) => guess()).reduce(averageReducer, 0)
  return guessAverage.toFixed(3)
}

const agents = Object.freeze({
  cat1: 'Cat One',
  cat2: 'Cat Two',
  compiler: 'The Compiler',
})

function createCatReport({ agents, cat1Status, cat2Status, compilerGuess }) {
  const output = (console, str) => console.info(str)
  const deadOrAlive = (score) => (score ? 'alive' : 'dead')

  const report = Object.freeze({
    cat1Status: `\n${agents.cat1} is ${deadOrAlive(cat1Status())}`,
    compilerThought: `\n${agents.compiler} thought ${
      agents.cat2
    } is ${deadOrAlive(Math.round(compilerGuess))}`,
    compilerAverageGuess: `${agents.compiler} on average guessed: ${compilerGuess}`,
    cat2Status: `\n${agents.cat2} is ${deadOrAlive(cat2Status())}. Long live ${
      agents.cat2
    }.\n`,
  })

  function write() {
    return Object.values(report).forEach((status) => output(console, status))
  }
  return write
}

const { cat1Status, cat2Status, coinflip } = catStatus()
const compilerGuess = guessCat2Status(coinflip)

const catReport = createCatReport({
  agents,
  cat1Status,
  cat2Status,
  compilerGuess,
})
catReport()

// Effects.logCatStatus(
//   cats.cat2,
//   () => Math.round(compilerGuess),
//   'The Compiler guessed: '
// )
// console.log(`Average compiler guess: ${compilerGuess}`)
// Effects.logCatStatus(agents.cat2, cat2Status)
