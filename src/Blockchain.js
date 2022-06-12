const chalk = require('chalk')
const { Level } = require('level')
const Block = require('./Block')
const { withErrorHandler } = require('./utils')
class BlockChain {
  constructor() {
    this._lastHash = null
    this._db = new Level('tmp', {
      valueEncoding: 'json'
    })

    this.initErrorHandle = withErrorHandler(this._initErrorHandle.bind(this))
    this.init = withErrorHandler(
      this._init.bind(this),
      this.initErrorHandle
    )
    this.addBlock = withErrorHandler(this._addBlock.bind(this))
    this.getLastBlock = withErrorHandler(this._getLastBlock.bind(this))
  }

  async _init () {
    this._lastHash = await this._db.get('lh')

    console.log(`${chalk.cyan('Blockchain detected, hash of last block is')} ${chalk.black.underline(this._lastHash)}`)

    return this
  }

  /**
    * Runs to initialize a new chain
  */
  async _initErrorHandle () {
    console.log(chalk.yellowBright('Blockchain not detected, initializing new chain...'))

    const genesisBlock = new Block({value: 'genesis'}, '0')
    genesisBlock.init()

    console.log(`${chalk.cyan('Genesis block has been proven! Genesis hash is')} ${chalk.black.underline(genesisBlock.hash)}`)

    await this._db.put('lh', genesisBlock.hash)
    await this._db.put(genesisBlock.hash, genesisBlock.serialize())
    
    this._lasthash = genesisBlock.hash

    console.log(chalk.greenBright('New chain is initialized!'))
  }

  async _addBlock (data, cb) {
    data = arguments[0][0]
    cb = arguments[0][1]

    const newBlock = new Block(data, this._lastHash)
    newBlock.init(cb)

    console.log(`${chalk.cyan('New block has been proven! Block hash is')} ${chalk.black.underline(newBlock.hash)}`)

    await this._db.put('lh', newBlock.hash)
    await this._db.put(newBlock.hash, newBlock.serialize())

    console.log(chalk.greenBright('New block added to the chain!'))

    this._lastHash = newBlock.hash

    return newBlock
  }

  async _getLastBlock() {
    const data = await this._db.get(this._lastHash)

    return Block.deserialize(data)
  }

  get db () {
    return this._db
  }

  async getChainData () {
    const res = []

    const values = await this._db.values().all()
    values.forEach(value => {
      try {
        res.push(Block.deserialize(value))
      } catch (err) {

      }
    })

    return res
  }
}

module.exports = BlockChain