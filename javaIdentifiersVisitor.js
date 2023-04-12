import { parse } from "java-parser";

export class JavaIdentifiersVisitor {
    constructor(source) {
        this.source = source;
    }

    parse() {
        const cstNode = parse(this.source);
        return this.work(cstNode);
    }

    work(root) {
        const inbox = [root];
        const images = [];

        while (inbox.length > 0) {
            const node = inbox.shift();
            for (const identifier in node.children) {
                const child = node.children[identifier];
                child.forEach(element => {
                    if ('image' in element) {
                        if(element.tokenType.name === 'Identifier') {
                            images.push(element.image);
                        }
                    } else {
                        inbox.push(element);
                    }
                })
            }
        }
        return images;
    }
}
