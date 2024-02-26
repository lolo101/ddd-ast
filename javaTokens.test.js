import {JavaTokens} from './javaTokens.js';

describe('javaTokens.js', () => {
    const config = {collect: ['unannType']};

    it('returns an empty array on empty input', () => {
        const visitor = new JavaTokens('', config);
        const identifiers = visitor.parse();
        expect(identifiers).toEqual([]);
    })

    it('returns method result type', () => {
        const source = `
public class HelloWorldExample {
    private ReturnType methodName() {
    }
}
        `
        const visitor = new JavaTokens(source, config);
        const identifiers = visitor.parse();
        expect(identifiers).toEqual([
            "ReturnType"
        ]);
    })

    it('returns method parameters type', () => {
        const source = `
public class HelloWorldExample {
    private void methodName(ParameterType parameter1, T parameter2) {
    }
}
        `
        const visitor = new JavaTokens(source, config);
        const identifiers = visitor.parse();
        expect(identifiers).toEqual([
            "ParameterType",
            "T"
        ]);
    })

    it('returns local variables type', () => {
        const source = `
public class HelloWorldExample {
    private void methodName() {
        VariableType variable = new VariableInstanceType(parameter1);
        List<TypeParameter> list = null;
        var variable = new String();
    }
}
        `
        const visitor = new JavaTokens(source, config);
        const identifiers = visitor.parse();
        expect(identifiers).toEqual([
            "VariableType",
            "TypeParameter",
            "var"
        ]);
    })

    it('returns lambda parameter type', () => {
        const source = `
public class HelloWorldExample {
    private void methodName() {
        var list = (Truc x) -> {return new Bidule(x.p());};
    }
}
        `
        const visitor = new JavaTokens(source, config);
        const identifiers = visitor.parse();
        expect(identifiers).toEqual([
            "var",
            "Truc"
        ]);
    })

    it('returns instance variables type', () => {
        const source = `
public class HelloWorldExample {
    private InstanceVariable toto = new InstanceTruc();
    private void methodName() {}
}
        `
        const visitor = new JavaTokens(source, config);
        const identifiers = visitor.parse();
        expect(identifiers).toEqual([
            "InstanceVariable"
        ]);
    })

    it('returns class variables type', () => {
        const source = `
public class HelloWorldExample {
    private static ClassVariable toto = new ClassTruc();
    private void methodName() {}
}
        `
        const visitor = new JavaTokens(source, config);
        const identifiers = visitor.parse();
        expect(identifiers).toEqual([
            "ClassVariable"
        ]);
    })

    it('returns innermost type parameters', () => {
        const source = `
public class HelloWorldExample {
    private static ParamType<Type1, ParamType<Type2>> toto = null;
}
        `
        const visitor = new JavaTokens(source, config);
        const identifiers = visitor.parse();
        expect(identifiers).toEqual([
            "Type1",
            "Type2"
        ]);
    })
})
