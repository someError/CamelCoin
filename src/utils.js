const crypto = require('crypto')

/**
 * @param {number} nonce
 * @param {object} data
 * @param {string} prevHash
 * @returns {string} Calculated Hash
 */
function calculateHash (nonce, data, prevHash) {
  const hashBase = nonce + prevHash + JSON.stringify(data)

  return crypto.createHash('sha256').update(hashBase).digest('hex')
}

 /**
 * Returns a new function with error handling
 * @param {Function} fn
 * @returns {Function}
 */
function withErrorHandler (fn, errCb) {
  if (isAsyncFunction) {
    return async function () { 
      try {
        return await fn(arguments)
      } catch (err) {
        errorHandle()
      }
    }
  }

  return function () {
    try {
      return fn(arguments)
    } catch (err) {
      errorHandle()
    }
  }

  function errorHandle (err) {
    errCb && errCb()
    console.error(err)
  }
}

 /**
 * Сhecks if the function is asynchronous
 * @param {Function} fn
 * @returns {boolean}
 */
function isAsyncFunction(fn) {
  return fn && fn.constructor.name === 'AsyncFunction'
}

function clearTerminal () {
    process.stdout.write("\u001b[3J\u001b[2J\u001b[1J");
    console.clear();
}

module.exports = {
  calculateHash,
  withErrorHandler,
  isAsyncFunction,
  clearTerminal
}