import { JavaIdentifiersVisitor } from "./javaIdentifiersVisitor";

process.stdin.on('data', javaText => {
        const visitor = new JavaIdentifiersVisitor(javaText.toString());
        const identifiers = visitor.parse().join('\n');
        process.stdout.write(identifiers);
    }
);
