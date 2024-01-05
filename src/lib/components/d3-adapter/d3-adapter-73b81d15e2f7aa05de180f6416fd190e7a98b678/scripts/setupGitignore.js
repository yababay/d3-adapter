const fs = require('fs')
const lineByLine = require('n-readlines')

const fileName = './.gitignore'
const liner = new lineByLine(fileName)
const pattern = '# Static factory' 
const lines = []

let line

while (line = liner.next()) {
    line = line.toString()
    if(line.includes(pattern)) break
    lines.push(line);
}

fs.writeFileSync('./.gitignore', lines.join('\n'))
