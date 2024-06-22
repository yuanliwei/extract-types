#!/usr/bin/env node

import { Command } from 'commander'
import { writeFileSync } from 'fs'
import { resolve } from 'path'
import { extractTypesFromFile } from '../src/lib.js'
const program = new Command()

program
    .name('extract-types')
    .description('extract types from json js jsdoc ts to .d.ts')
    .version('0.0.1')
    .addHelpText('after', `\nexample:\n\textract-types lib.js -o types.d.ts\n\textract-types data.json -o types.d.ts`)
    .showHelpAfterError(true)

program.argument('<filepath>', 'input file path')
program.option('-o, --output <filepath>', 'output file path')
program.option('-t, --type <js|ts|json>', 'input file type')

let command = program.parse()

let input = command.args.at(0)

let output = command.opts().output
let type = command.opts().type

if (input.endsWith('.json')) {
    type = type || 'json'
}

let inputFile = resolve(input)

console.log(type, output)

let types = extractTypesFromFile(inputFile, type == 'json', {
    allowJs: true,
    declaration: true,
    emitDeclarationOnly: true,
})

if (!output) {
    console.log(types)
} else {
    let outputFile = resolve(output)
    writeFileSync(outputFile, types)
    console.log('write output to', outputFile)
}