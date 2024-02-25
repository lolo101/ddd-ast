#!/usr/bin/env node
import { JavaTokens } from "./javaTokens.js";

const collect = ['unannType'];

let javaText = '';

process.stdin.on('data', javaChunk => javaText = javaText.concat(javaChunk.toString()));

process.stdin.on('end', () => {
    const visitor = new JavaTokens(javaText, {collect});
    const identifiers = visitor.parse().join('\n');
    process.stdout.write(identifiers);
});
