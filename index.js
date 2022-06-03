const express = require('express')
const BlockChain = require('./src/Blockchain')
const readline = require('readline')
const fs = require('fs')

const app = new express()

app.listen(3000, () => {
  console.log('wtf')
  fs.writeFileSync(`${__dirname}/db.json`, '[]')
  // console.log('app listen on 3000')
  // const blockchain = new BlockChain()

  // blockchain.addBlock('hiwrf')
  // console.log(blockchain)
  // blockchain.addBlock('hi')
  // console.log(blockchain)
  // blockchain.addBlock('hi')
  
  // console.log(blockchain)
})