const crypto = require('crypto')

function calculateHash (nonce, data, prevHash) {
  const hashBase = nonce + prevHash + JSON.stringify(data)

  return crypto.createHash('sha256').update(hashBase).digest('hex')
}

function withErrorHandler (fn) {
  return () => {
    try {
      fn()
    } catch(err) {
      console.error(err)
    }
  }
}

module.exports = {
  calculateHash,
  withErrorHandler
}