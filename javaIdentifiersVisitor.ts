import { CstNode, parse } from "java-parser";

export class JavaIdentifiersVisitor {
    constructor(private source: string) {
    }

    parse(): string[] {
        const cstNode = parse(this.source);
        return this.work(cstNode);
    }

    private work(root: CstNode): string[] {
        const inbox: CstNode[] = [root];
        const images: string[] = [];

        while (inbox.length > 0) {
            const node = inbox.shift()!;
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
