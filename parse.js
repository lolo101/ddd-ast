const {
    parse,
    BaseJavaCstVisitorWithDefaults
} = require("java-parser");

const javaText = `
public class HelloWorldExample{
  public static Integer main(String args[]){
    System.out.println("Hello World !");
  }
}
`;

const cst = parse(javaText);

// Use "BaseJavaCstVisitor" if you need to implement all the visitor methods yourself.
class LambdaArrowsPositionCollector extends BaseJavaCstVisitorWithDefaults {
    constructor() {
        super();
        this.customResult = [];
        this.validateVisitor();
    }

    typeIdentifier(ctx) {
        this.customResult.push(ctx.Identifier[0].image);
    }

    methodHeader(ctx) {
        const result = ctx.result[0].children;
        const methodIdentifier = ctx.methodDeclarator[0].children.Identifier[0].image;
        const formalParameters = ctx.methodDeclarator[0].children.formalParameterList[0].children.formalParameter;
        this.customResult.push(result, methodIdentifier, ...formalParameters);
    }
}

const lambdaArrowsCollector = new LambdaArrowsPositionCollector();
// The CST result from the previous code snippet
lambdaArrowsCollector.visit(cst);
lambdaArrowsCollector.customResult.forEach(arrowOffset => {
    console.log(arrowOffset);
});
