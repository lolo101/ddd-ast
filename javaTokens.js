import {parse} from "java-parser";

/**
 * Visits Java source file and collect 'unannType' tokens.
 * The `parse` method returns an array with the images of collected tokens
 */
export class JavaTokens {
    constructor(source) {
        this.source = source;
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
                        if (element.name === 'unannType') {
                            images.push(...this.referenceTypes(element));
                        } else {
                            inbox.push(element);
                        }
                    })
            }
        }
        return images;
    }

    referenceTypes(element) {
        const inbox = [element];
        const images = [];
        for (let node; (node = inbox.shift());) {
            for (const identifier in node.children) {
                node.children[identifier]
                    .forEach(element => {
                        if (element.name === 'referenceType') {
                            images.push(...this.referenceTypes(element));
                        } else {
                            inbox.push(element);
                        }
                    })
            }
        }
        return images.length ? images : [this.image(element.location)];
    }

    image(location) {
        return this.source.substring(location.startOffset, location.endOffset + 1);
    }
}
