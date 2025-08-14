const fs = require('fs');
const path = require('path');
const glob = require('glob');
const esprima = require('esprima');
const doctrine = require('doctrine');

const MODE_REPORT = 'report';
const MODE_GENERATE = 'generate';

/**
 * @description TODO: Add description
 * @param {*} func TODO: Add description
 * @returns {*} TODO: Add description
 */
function getParams(func) {
        /**
         * @description TODO: Add description
         * @param {*} param TODO: Add description
         * @returns {*} TODO: Add description
         */
    const params = func.params.map(param => {
        if (param.type === 'Identifier') {
            return param.name;
        } else if (param.type === 'AssignmentPattern' && param.left.type === 'Identifier') {
            return param.left.name;
        }
        return '';
    }).filter(Boolean);
    return params;
}

/**
 * @description TODO: Add description
 * @param {*} params TODO: Add description
 * @returns {*} TODO: Add description
 */
function generateDocblock(params) {
    let docblock = '/**\n';
    docblock += ' * @description TODO: Add description\n';
    /**
     * @description TODO: Add description
     * @param {*} param TODO: Add description
     * @returns {*} TODO: Add description
     */
    params.forEach(param => {
        docblock += ` * @param {*} ${param} TODO: Add description\n`;
    });
    docblock += ' * @returns {*} TODO: Add description\n';
    docblock += ' */';
    return docblock;
}

                        /**
                         * @description TODO: Add description
                         * @param {*} filePath TODO: Add description
                         * @param {*} mode TODO: Add description
                         * @returns {*} TODO: Add description
                         */
function processFile(filePath, mode) {
    let content = fs.readFileSync(filePath, 'utf-8');
    if (content.startsWith('#!/usr/bin/env node')) {
        content = content.substring(content.indexOf('\n') + 1);
    }
    const lines = content.split('\n');

    try {
        const ast = esprima.parseScript(content, { loc: true, comment: true, tokens: true });

        const functions = [];

                /**
                 * @description TODO: Add description
                 * @param {*} node TODO: Add description
                 * @returns {*} TODO: Add description
                 */
        function traverse(node) {
            if (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression' || node.type === 'ArrowFunctionExpression') {
                functions.push(node);
            }
            for (const key in node) {
                if (node.hasOwnProperty(key)) {
                    const child = node[key];
                    if (typeof child === 'object' && child !== null) {
                        traverse(child);
                    }
                }
            }
        }

        traverse(ast);

        const functionsMissingDocblocks = [];

        for (const func of functions) {
            const functionLine = func.loc.start.line;
            const comments = ast.comments || [];
                /**
                 * @description TODO: Add description
                 * @param {*} comment TODO: Add description
                 * @returns {*} TODO: Add description
                 */
            const precedingComment = comments.find(comment => {
                return comment.loc.end.line === functionLine - 1 && comment.type === 'Block' && comment.value.startsWith('*');
            });

            if (!precedingComment) {
                functionsMissingDocblocks.push(func);
            }
        }

        if (functionsMissingDocblocks.length > 0) {
            if (mode === MODE_REPORT) {
                console.log(`File: ${filePath}`);
/**
 * @description TODO: Add description
 * @param {*} func TODO: Add description
 * @returns {*} TODO: Add description
 */
                functionsMissingDocblocks.forEach(func => {
                    const functionName = func.id ? func.id.name : '[anonymous]';
                    console.log(`  - Function '${functionName}' at line ${func.loc.start.line} is missing a docblock.`);
                });
            } else if (mode === MODE_GENERATE) {
                let newContent = [...lines];
                let offset = 0;

/**
 * @description TODO: Add description
 * @param {*} func TODO: Add description
 * @returns {*} TODO: Add description
 */
                functionsMissingDocblocks.forEach(func => {
                    const params = getParams(func);
                    const docblock = generateDocblock(params);
                    const functionLine = func.loc.start.line - 1 + offset;
                    const indentation = lines[functionLine] ? lines[functionLine].match(/^\s*/)[0] : '';
/**
 * @description TODO: Add description
 * @param {*} line TODO: Add description
 * @returns {*} TODO: Add description
 */
                    const docblockLines = docblock.split('\n').map(line => `${indentation}${line}`);
                    newContent.splice(functionLine, 0, ...docblockLines);
                    offset += docblockLines.length;
                });

                fs.writeFileSync(filePath, newContent.join('\n'), 'utf-8');
                console.log(`Generated docblocks for ${functionsMissingDocblocks.length} functions in ${filePath}`);
            }
        }
    } catch (error) {
        console.error(`Could not parse ${filePath}: ${error.message}`);
    }
}

/**
 * @description TODO: Add description
 * @returns {*} TODO: Add description
 */
function run() {
    const args = process.argv.slice(2);
/**
 * @description TODO: Add description
 * @param {*} arg TODO: Add description
 * @returns {*} TODO: Add description
 */
    const modeArg = args.find(arg => arg.startsWith('--mode='));
    const mode = modeArg ? modeArg.split('=')[1] : MODE_REPORT;

    if (mode !== MODE_REPORT && mode !== MODE_GENERATE) {
        console.error('Invalid mode. Use --mode=report or --mode=generate');
        process.exit(1);
    }

    const files = glob.sync('**/*.{js,ts}', { ignore: ['node_modules/**', 'tests/**'] });

/**
 * @description TODO: Add description
 * @param {*} file TODO: Add description
 * @returns {*} TODO: Add description
 */
    files.forEach(file => {
        const fullPath = path.resolve(file);
        processFile(fullPath, mode);
    });
}

run();