import { readFileSync } from "fs"
import ts from "typescript"

/**
 * @param {string} file
 * @param {boolean} isJson
 * @param {ts.CompilerOptions} options
 */
export function extractTypesFromFile(file, isJson = false, options) {
    let host = ts.createCompilerHost(options)

    let content = ''
    if (isJson) {
        content = readFileSync(file, 'utf-8')
        file = '[data].js'
    }

    let originReadFile = host.readFile
    host.readFile = (fileName) => {
        console.log('readFile', fileName)
        if (isJson && fileName == file) {
            return `export function data(){return ${content.trim()}}`
        }
        return originReadFile(fileName)
    }

    let results = []
    host.writeFile = (fileName, contents) => {
        console.log('genterate types for', fileName)
        results.push(`/** ${fileName} */`)
        results.push(contents)
    }
    let program = ts.createProgram([file], options, host)
    program.emit()

    return results.join('\n\n')
}

/**
 * @param {string} source
 * @param {boolean} isJson
 * @param {ts.CompilerOptions} options
 */
export function extractTypesFromSource(source, isJson = false, options) {
    let host = ts.createCompilerHost(options)

    let content = source
    let file = '[data].js'

    let originReadFile = host.readFile
    host.readFile = (fileName) => {
        console.log('readFile', fileName)
        if (fileName == file) {
            if (isJson) {
                return `export function data(){return ${content.trim()}}`
            } else {
                return content
            }
        }
        return originReadFile(fileName)
    }

    let results = []
    host.writeFile = (fileName, contents) => {
        console.log('genterate types for', fileName)
        results.push(`/** ${fileName} */`)
        results.push(contents)
    }
    let program = ts.createProgram([file], options, host)
    program.emit()

    return results.join('\n\n')
}