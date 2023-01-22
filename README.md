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

A difference between this fork and the original c3 library is how you access 
data and functions. `c3.terms` and `c3.colors` are the same, but functions like
`c3.terms.relatedColors` are now `c3.termsRelatedColors` to avoid overloading
built in JavaScript.

Another difference is that instead of keeping track of colors using `d3-colors`,
this library use `chroma-js` which means you access color information as
described in [their documentation](https://gka.github.io/chroma.js/).

Finally, the full size of the compiled script is about 2 MB, primarely because
the data file is now embedded into the script. This is done to make it easier
to use the library without hosting the data, and avoids having to wait for the
data to load during runtime.

### Development Setup

The easiest way to work with the library is to have a local project that
includes this project as a local dependency, eg. by running
`npm i /path/to/c3-module` and then use it as in the example.

Compile using `npx tsup src/index.ts` or with type declarations
`npx tsup src/index.ts --dts`.

If the compiler complains about `Cannot find module ...`, try installing
typescript globally and link it.

```
npm i typescript -g
npm link typescript
```
