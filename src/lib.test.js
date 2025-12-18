import { test } from 'node:test'
import { strictEqual, ok, equal } from 'node:assert'
import { extractTypesFromFile, extractTypesFromSource } from './lib.js'
import { fileURLToPath } from 'node:url'

test('extract-types-from-file', async () => {
    // node --test-name-pattern="^extract-types-from-file$" src/lib.test.js
    let types = extractTypesFromFile(fileURLToPath(new URL('./lib.js', import.meta.url)), false, {
        allowJs: true,
        declaration: true,
        emitDeclarationOnly: true,
    })
    console.log(types)
    ok(types.includes(`export function extractTypesFromFile(file: string, isJson: boolean, options: ts.CompilerOptions & {
    debug?: boolean;
}): string;`))
    ok(types.includes(`export function extractTypesFromSource(source: string, isJson: boolean, options: ts.CompilerOptions & {
    debug?: boolean;
}): string;`))
})

test('extract-types-from-file-json', async () => {
    // node --test-name-pattern="^extract-types-from-file-json$" src/lib.test.js
    let types = extractTypesFromFile(fileURLToPath(new URL('../package.json', import.meta.url)), true, {
        allowJs: true,
        declaration: true,
        emitDeclarationOnly: true,
    })
    console.log('types', types)
    ok(types.includes(`export function data():`))
    ok(types.includes(`keywords: string[];`))
})

test('extract-types-from-json', async () => {
    // node --test-name-pattern="^extract-types-from-json$" src/lib.test.js
    let types = extractTypesFromSource(`{a:'string',b:12345,c:[{a:1,b:2}]}`, true, {
        allowJs: true,
        declaration: true,
        emitDeclarationOnly: true,
    })
    console.log(types)
    equal(types.trim(), `
/** [data].d.ts */

export function data(): {
    a: string;
    b: number;
    c: {
        a: number;
        b: number;
    }[];
};`.trim())
})

test('extract-types-from-js', async () => {
    // node --test-name-pattern="^extract-types-from-js$" src/lib.test.js
    let types = extractTypesFromSource(`export const data = "12345`, false, {
        allowJs: true,
        declaration: true,
        emitDeclarationOnly: true,
    })
    console.log(types)
    equal(types.trim(), '/** [data].d.ts */\n\nexport const data: "12345";')
})