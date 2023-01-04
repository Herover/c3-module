import { lab } from "d3-color";

export function c3_init(json) {
  const data = {};
  var i, C, W, T, A, ccount, tcount;

  // parse colors
  data.color = [];
  for (i=0; i<json.color.length; i+=3) {
    data.color[i/3] = lab(json.color[i], json.color[i+1], json.color[i+2]);
  }
  C = data.color.length;

  // parse terms
  data.terms = json.terms;
  W = data.terms.length;

  // parse count table
  data.T = T = [];
  for (var i=0; i<json.T.length; i+=2) {
    T[json.T[i]] = json.T[i+1];
  }

  // construct counts
  data.color.count = ccount = []; for (i=0; i<C; ++i) ccount[i] = 0;
  data.terms.count = tcount = []; for (i=0; i<W; ++i) tcount[i] = 0;
  Object.keys(T).forEach(function(idx) {
    var c = Math.floor(idx / W),
        w = Math.floor(idx % W),
        v = T[idx] || 0;
    ccount[c] += v;
    tcount[w] += v;
  });

  // parse word association matrix
  data.A = A = json.A;

  return data;
}

