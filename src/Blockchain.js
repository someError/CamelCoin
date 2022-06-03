const Block = require('./Block')

class BlockChain {
  constructor(genesisString = 'genesis') {
    this.blocks = [this._createGenesisBlock(genesisString)]
  }

  addBlock (data) {
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