import {parse} from "java-parser";

/**
 * Visits Java source file and collect tokens.
 * The visitor must be configured with the names of tokens to collect:
 * ```
 * const config = {
 *     collect: ['unannType']
 * };
 * new JavaTokens(javaSource, config);
 * ```
 * The `parse` method returns an array with the images of collected tokens
 */
export class JavaTokens {
    constructor(source, config) {
        this.source = source;
        this.config = config
    }

    parse() {
        const cstNode = parse(this.source);
        return this.collect(cstNode);
    }

    collect(root) {
        const inbox = [root];
        const images = [];

        for (let node; (node = inbox.shift());) {
            for (const identifier in node.children) {
                node.children[identifier]
                    .forEach(element => {
                        if (this.config?.collect?.includes(element.name)) {
                            images.push(this.image(element.location));
                        } else {
                            inbox.push(element);
                        }
                    })
            }
        }
        return images;
    }

    image(location) {
        return this.source.substring(location.startOffset, location.endOffset + 1);
    }
}
