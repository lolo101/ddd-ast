#!/usr/bin/env node
import { JavaIdentifiersVisitor } from "./javaIdentifiersVisitor.js";

const skip = ['packageDeclaration', 'importDeclaration'];

process.stdin.on('data', javaText => {
    const visitor = new JavaIdentifiersVisitor(javaText.toString(), {skip});
        const identifiers = visitor.parse().join('\n');
        process.stdout.write(identifiers);
    }
);
