import { lab } from "chroma-js";
import * as json from "../../data/xkcd/c3_data.json";

// parse colors
export const color: {l: number, a: number, b: number, opacity?: number}[] = [];
for (let i=0; i<json.color.length; i+=3) {
  color[i/3] = lab(json.color[i], json.color[i+1], json.color[i+2]);
}
const C = color.length;

// parse terms
export const terms: string[] = json.terms;
const W = terms.length;

// parse count table
export const T: number[] = [];
for (let i=0; i<json.T.length; i+=2) {
  T[json.T[i]] = json.T[i+1];
}

// construct counts
export const colorCount: number[] = []; for (let i=0; i<C; ++i) colorCount[i] = 0;
export const termsCount: number[] = []; for (let i=0; i<W; ++i) termsCount[i] = 0;
for (let idx = 0; idx < T.length; idx++) {
  let c = Math.floor(idx / W),
      w = Math.floor(idx % W),
      v = T[idx] || 0;
  colorCount[c] += v;
  termsCount[w] += v;
}

// parse word association matrix
export const A: number[] = json.A;
