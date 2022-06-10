const { Level } = require('level')
const Block = require('./Block')
const { withErrorHandler } = require('./utils')

class BlockChain {
  constructor() {
    this._lasthash = null
    this._db = new Level('tmp', { valueEncoding: 'json' })
    this.init = withErrorHandler(this._init)
    this.addBlock = withErrorHandler(this._addBlock)
  }

  // async _init () {
  //   const lh = await this._db.get('lh')

  //   if (!lh) {
  //     try {

  //     } catch (err) {

  //     }
  //   } else {

  //   }
  // }

  _addBlock (data) {
    // throw new Error('wtf')

    try {
      const prevBlock = this.blocks[this.blocks.length - 1]
      const newBlock = new Block(data, prevBlock.hash)

      newBlock.init()
  
      this.blocks.push(newBlock)
    } catch (err) {
      console.error(err)
    }
  }

  _createGenesisBlock (genesisString) {
    const block = new Block(genesisString, '0')
    block.initGenesis()

    return block
  }
}

module.exports = BlockChain