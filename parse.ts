import { JavaIdentifiersVisitor } from "./javaIdentifiersVisitor";

const javaText = `
public class HelloWorldExample{
  public static Integer main(String args[]){
    System.out.println("Hello World !");
  }
}
`;

new JavaIdentifiersVisitor(javaText)
    .parse()
    .forEach(name => console.log(name));
