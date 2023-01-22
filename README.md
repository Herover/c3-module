# C3

**C3** (Categorical Color Components) is a JavaScript library for
modeling color naming data. It can be used to create a variety of
applications, including improved color selection, image editing,
or palette analysis tools.

C3 also includes backend components (written in Java) for processing
raw color naming data and producing a compact model of color naming.
The resulting JSON model file is loaded by the client C3 library.

This is a fork of [C3](https://github.com/StanfordHCI/c3) that makes it possible to use the library as a ES6 module (eg. so you can use `import { load } from "c3-module"`).

It can be installed by running `npm i c3-module`.

Example usage:

```javascript
import * as c3 from 'c3-module';

// You can use the c3 object as shown in the examples now.
// Example: find and print 3 red colors
const redIndex = c3.terms.findIndex(e => e == "red");
const colorIndexes = c3.termsRelatedColors(redIndex, 3);
colorIndexes.forEach(ci => console.log(c3.color[ci.index].css("rgb"))); 
// rgb(220, 0, 15)
// rgb(198, 0, 0)
// rgb(198, 0, 14)

// Example: find and print 3 terms related to "red"
const termIndexes = c3.termsRelatedTerms(redIndex, 3);
termIndexes.forEach(ti => console.log(c3.terms[ti.index])) 
// red
// brightred
// bloodred
```

### Development Setup

The easiest way to work with the library is to have a local project that
includes this project as a local dependency, eg. by running
`npm i /path/to/c3-module` and then use it as in the example.
