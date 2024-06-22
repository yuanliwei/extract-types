/** E:/repo/extract-types/src/lib.d.ts */

import ts from "typescript";

/**
 * @param {string} file
 * @param {boolean} isJson
 * @param {ts.CompilerOptions&{debug?:boolean}} options
 */
export function extractTypesFromFile(file: string, isJson: boolean, options: ts.CompilerOptions & {
    debug?: boolean;
}): string;
/**
 * @param {string} source
 * @param {boolean} isJson
 * @param {ts.CompilerOptions&{debug?:boolean}} options
 */
export function extractTypesFromSource(source: string, isJson: boolean, options: ts.CompilerOptions & {
    debug?: boolean;
}): string;
