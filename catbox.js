class Catbox {
  constructor() {
    this.numbers = [-1, 1, -1, 1, -1, 1, -1, 1, -1, 1]
    this.randomFromRange = (min = 3, max = 100) => {
      const lmin = Math.ceil(min)
      const lmax = Math.floor(max)
      return Math.floor(Math.random() * (lmax - lmin + 1)) + lmin
    }

    this.randomFromArray = arr => arr[Math.floor(Math.random() * arr.length)]

    this.generatePairFx = () => {
      const rndm = this.randomFromRange()
      const coinflip = this.randomFromRange(0, 1)
      const dualcat = coinflip === 0 ? [rndm, rndm * -1] : [rndm * -1, rndm]

      return {
        outcome1: () => dualcat[0],
        outcome2: () => dualcat[1],
      }
    }
    this.dualcat = this.generatePairFx()

    this.cat1 = this.dualcat.outcome1()
    this.cat2 = undefined
    this.outcome2looks = 0
    this.outcome2dead = 0

    this.posNegUndef = (num, cat) => {
      if (num > 0) return { [cat]: 1 }
      if (num < 0) return { [cat]: -1 }
      if (!num) return { [cat]: this.randomFromArray(this.numbers) }
    }
    setTimeout(() => {
      this.cat2 = this.dualcat.outcome2()
      console.log('outcome2 observed')
      console.log(
        `cat2 was ${
          this.cat2 < 0 ? 'dead' : 'alive'
        } \nCatbox thought ${
          ((this.outcome2dead / this.outcome2looks) * 100).toFixed(2)
        }% chance it was dead`
      )
    }, 30000)
    this.streamNumbers = () => {
      setInterval(
        () => console.log(this.posNegUndef(this.cat1, 'cat1')),
        2400
      )
      setInterval(() => {
        const result = this.posNegUndef(this.cat2, 'cat2')
        console.log(result, '\n')
        this.outcome2looks++
        if (result['cat2'] === -1) this.outcome2dead++
      }, 2400)
    }
  }
}

module.exports = { Catbox }
