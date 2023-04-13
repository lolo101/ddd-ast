import {parse} from "java-parser";

/**
 * Visits Java source file and collect Identifier tokens.
 * The visitor may be configured to skip nodes in the syntax tree with a `config` object:
 * ```
 * const config = {
 *     skip: ['packageDeclaration', 'importDeclaration']
 * }
 * new JavaIdentifiersVisitor(javaSource, config);
 * ```
 */
export class JavaIdentifiersVisitor {
    constructor(source, config) {
        this.source = source;
        this.config = config
    }

    parse() {
        const cstNode = parse(this.source);
        return this.work(cstNode);
    }

    work(root) {
        const inbox = [root];
        const images = [];

        for (let node; (node = inbox.shift());) {
            for (const identifier in node.children) {
                node.children[identifier]
                    .filter(element => !this.config?.skip?.includes(element.name))
                    .forEach(element => {
                        if ('image' in element) {
                            if (element.tokenType.name === 'Identifier') {
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
