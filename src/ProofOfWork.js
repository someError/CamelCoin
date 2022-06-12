const { calculateHash } = require('./utils')

class ProofOfWork {
  constructor(blockData, blockPrevHash) {
    this.difficulty = 4 // TODO add increse algoritm
    this.blockData = blockData
    this.blockPrevHash = blockPrevHash
    this.nonce = 0
    this.hash = null
  }

  run (cb) {
    while (this._calculateHash().slice(0, this.difficulty) !== '0'.repeat(this.difficulty)) {
      cb && cb(this.hash)
      this.nonce++
    }

    cb && cb(this.hash)

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