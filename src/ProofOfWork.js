const { calculateHash } = require('./utils')

class ProofOfWork {
  constructor(blockData, blockPrevHash) {
    this.difficulty = 5 // TODO add increse algoritm
    this.blockData = blockData
    this.blockPrevHash = blockPrevHash
    this.nonce = 0
    this.hash = null
  }

  start () {
    while (this._calculateHash().slice(0, this.difficulty) !== '0'.repeat(this.difficulty)) {
      this.nonce++
    }

    return { hash: this.hash, nonce: this.nonce }
  }

  validate (nonce) {
    const hash = calculateHash(nonce, this.blockData, this.blockPrevHash)

    return hash.slice(0, this.difficulty) === '0'.repeat(this.difficulty)
  }

  _calculateHash () {
    this.hash = calculateHash(this.nonce, this.blockData, this.blockPrevHash)

    return this.hash
  }
}

module.exports = ProofOfWork