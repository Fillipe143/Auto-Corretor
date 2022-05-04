const { search, organizeDictionary } = require('./utils')

const pt_Br = require('./langs/pt-BR.json')
const dictionary = organizeDictionary(pt_Br)

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

execute()

function execute() {
    readline.question('-> ', word => {
        const words = JSON.stringify(search(word, dictionary))
        console.log('Result: ' + words)

        execute()
    })
}