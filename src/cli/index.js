const inquirer = require('inquirer')
const chalk = require('chalk')

const { clearTerminal } = require('../utils')

class CliInterface {
  constructor(blockchain) {
    this._blockchain = blockchain
  }

  async render(command) {
    switch(command) {
      case 'EXIT':
        process.exit()
        break
      case 'PRINT_BLOCKCHAIN':
        clearTerminal()
        const chainData = await this._blockchain.getChainData()
        console.log(chainData)
        this.renderBacK()
        break
      case 'ADD_NEW_BLOCK':
        await this.renderBlock()
        break
      default:
        clearTerminal()
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
        choices: ['ADD_NEW_BLOCK', 'PRINT_BLOCKCHAIN', 'EXIT']
      },
    ])

    
    clearTerminal()

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

    clearTerminal()
      
    this.render()
  }

  async renderBlock () {
    const answers = await inquirer.prompt([
      {
        name: 'blockData',
        message: '⌨️ Write block data ⌨️ :'
      },
    ])

    const newBlock = await this._blockchain.addBlock({value: answers.blockData})
    console.log(newBlock)

    this.renderBacK()
  }
}

module.exports = CliInterface