# DDD AST
Extract identifiers from Java sources

## Objective
Quickly establish a list of identifiers with their # of occurrences to match them with the ubiquitous language 
dictionary and calculate a "DDD score"

## Principle
Uses [java-parser](https://github.com/jhipster/prettier-java/tree/master/packages/java-parser) to build Concrete Syntax 
Tree from Java files and extract identifiers and then collecting them, counting and sorting by count

## How to use
In the project directory:

`npm install` to install required dependencies

`node parse.js` to execute the parser on the Java source hardcoded into parse.js