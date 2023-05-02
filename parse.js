#!/usr/bin/env node
import { JavaIdentifiersVisitor } from "./javaIdentifiersVisitor.js";

const skip = ['packageDeclaration', 'importDeclaration'];

let javaText = '';

process.stdin.on('data', javaChunk => javaText = javaText.concat(javaChunk.toString()));

process.stdin.on('end', () => {
    const visitor = new JavaIdentifiersVisitor(javaText, {skip});
    const identifiers = visitor.parse().join('\n');
    process.stdout.write(identifiers);
});
