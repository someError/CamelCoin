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

    const { nonce, hash } = proof.run()

    this.nonce = nonce
    this.hash = hash

    return this
  }

  serialize() {
    return JSON.stringify(this)
  }

  static deserialize(value) {
    return JSON.parse(value)
  }
}

module.exports = Block