const express = require('express')
const BlockChain = require('./src/Blockchain')
const CliInterface = require('./src/cli')

const app = new express()

app.listen(3000, async () => {
  console.log('app listen on 3000')
  const blockchain = new BlockChain()
  await blockchain.init()

  const cli = new CliInterface(blockchain)

  cli.render()
})