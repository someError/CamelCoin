const inquirer = require('inquirer')
const chalk = require('chalk')

const { clearTerminal } = require('../utils')

class CliInterface {
  constructor(blockchain) {
    this._blockchain = blockchain
  }

  async render(command) {
    switch(command) {
      case 'PRINT_BLOCKCHAIN': {
        clearTerminal()
        const chainData = await this._blockchain.getChainData()
        console.log(chainData)
        this.renderBacK()
        break
      }
      case 'ADD_NEW_BLOCK': {
        await this.renderBlock()
        break
      }
      case 'ADD_NEW_BLOCK_WITH_HASH_LOGS': {
        await this.renderBlock(true)
        break
      }
      case 'EXIT': {
        this._blockchain.db.close()
        clearTerminal()
        process.exit()
      }
      default:
        this.renderMainMenu()
    }
  }

  async renderMainMenu() {
    clearTerminal()
    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'command',
        message: chalk.yellow.bold('🐪  CAMEL CLI \n'),
        choices: ['ADD_NEW_BLOCK', 'ADD_NEW_BLOCK_WITH_HASH_LOGS', 'PRINT_BLOCKCHAIN', 'EXIT']
      },
    ])

    this.render(answers.command)
  }

  async renderBacK () {
    await inquirer.prompt([
      {
        type: 'list',
        name: 'command',
        message: chalk.yellow.bold('🔙 Back to main menu❓ \n'),
        choices: ['BACK']
      }
    ])
      
    this.render()
  }

  async renderBlock (withLog) {
    const answers = await inquirer.prompt([
      {
        name: 'blockData',
        message: '⌨️ Write block data ⌨️ :'
      },
    ])

    const newBlock = await this._blockchain.addBlock({value: answers.blockData}, (hash) => {
      withLog && console.log(hash)
    })

    console.log(newBlock)

    this.renderBacK()
  }
}

module.exports = CliInterface