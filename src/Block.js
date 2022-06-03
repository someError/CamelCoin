const { calculateHash } = require('./utils')
const ProofOfWork = require('./ProofOfWork')

class Block {
  constructor (data, prevHash) {
    this.hash = null
    this.data = data
    this.prevHash = prevHash
    this.nonce = 0
  }

  init () {
    const proof = new ProofOfWork(this.data, this.prevHash)

    const { nonce, hash } = proof.start()

    this.nonce = nonce
    this.hash = hash

    return this
  }

  initGenesis () {
    this.hash = calculateHash(this.nonce, this.data, this.prevHash)

    return this
  }
}

module.exports = Block