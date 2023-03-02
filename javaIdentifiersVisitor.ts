import { JavaCstVisitorWithDefaults, MethodHeaderCtx, parse, TypeIdentifierCtx } from "java-parser";

export class JavaIdentifiersVisitor extends JavaCstVisitorWithDefaults<string[], string[]> {
    constructor(private source: string) {
        super();
    }

    parse() {
        this.validateVisitor();
        const cstNode = parse(this.source);
        return this.visit(cstNode, []);
    }

    typeIdentifier(ctx: TypeIdentifierCtx, param: string[]) {
        param.push(ctx.Identifier[0].image);
        return param;
    }

    methodHeader(ctx: MethodHeaderCtx, param: string[]) {
        const methodIdentifier = ctx.methodDeclarator[0].children.Identifier[0].image;
        param.push(methodIdentifier);
        return param;
    }
}