import { lab } from "d3-color";
import { range } from "d3-array";
import { A,T,color,colorCount,terms,termsCount } from "./init";

const C = color.length,
  W = terms.length,
  ccount = colorCount,
  tcount = termsCount;

export const count = function(c, w) {
  return T[c*W+w] || 0;
}

export const termsProb = function(w, c) {
  return (T[c*W+w]||0) / tcount[w];
}

export const termsEntropy = function(w) {
  var H = 0, p;
  for (var c=0; c<C; ++c) {
    p = (T[c*W+w]||0) / tcount[w];
    if (p > 0) H += p * Math.log(p) / Math.LN2;
  }
  return H;
}

export const termsPerplexity = function(w) {
  var H = termsEntropy(w);
  return Math.pow(2, -H);
}

export const termsCosine = function(a, b) {
  var sa=0, sb=0, sc=0, ta, tb;
  for (var c=0; c<C; ++c) {
    ta = (T[c*W+a]||0);
    tb = (T[c*W+b]||0);
    sa += ta*ta;
    sb += tb*tb;
    sc += ta*tb;
  }
  return sc / (Math.sqrt(sa*sb));
}

export const colorProb = function(c, w) {
  return (T[c*W+w]||0) / ccount[c];
}

export const colorEntropy = function(c) {
  var H = 0, p;
  for (var w=0; w<W; ++w) {
    p = (T[c*W+w]||0) / ccount[c];
    if (p > 0) H += p * Math.log(p) / Math.LN2;
  }
  return H;
}

export const termsHellinger = function(a, b) {
  var bc=0, pa, pb, z = Math.sqrt(tcount[a]*tcount[b]);
  for (var c=0; c<C; ++c) {
    pa = (T[c*W+a]||0);
    pb = (T[c*W+b]||0);
    bc += Math.sqrt(pa*pb);
  }
  return Math.sqrt(1 - bc / z);
}

export const colorPerplexity = function(c) {
  var H = colorEntropy(c);
  return Math.pow(2, -H);
}

export const colorCosine = function(a, b) {
  var sa=0, sb=0, sc=0, ta, tb;
  for (var w=0; w<W; ++w) {
    ta = (T[a*W+w]||0);
    tb = (T[b*W+w]||0);
    sa += ta*ta;
    sb += tb*tb;
    sc += ta*tb;
  }
  return sc / (Math.sqrt(sa*sb));
}

export const colorHellinger = function(a, b) {
  var bc=0, pa, pb, z = Math.sqrt(ccount[a]*ccount[b]);
  for (var w=0; w<W; ++w) {
    pa = (T[a*W+w]||0);
    pb = (T[b*W+w]||0);
    bc += Math.sqrt(pa*pb);
  }
  return Math.sqrt(1 - bc / z);
}

export const termsRelatedTerms = function(w: number, limit: number) {
  let sum = 0,
    c = termsCenter[w],
    list: { index: number; score: any; }[] = [];
  for (let i=0; i<W; ++i) {
    if (i != w) list.push({index: i, score: A[i*W+w]});
  }
  list.sort(function(a, b) {
  let ca, cb, dL1, dL2, da1, da2, db1, db2,
        cmp = b.score - a.score;
    if (Math.abs(cmp) < 0.00005) {
      // break near ties by distance between centers
      ca = termsCenter[a.index];
      cb = termsCenter[b.index];
      // FIXME: no longer available in d3-color
      cmp = ca.de00(c) - cb.de00(c);
    }
    return cmp;
  });
  list.unshift({index: w, score: A[w*W+w]});
  return limit ? list.slice(0,limit) : list;
}

export const termsRelatedColors = function(w, limit) {
  var list: { index: number; score: number; }[] = [];
  for (var c=0; c<C; ++c) {
    var s = (T[c*W+w] || 0) / ccount[c];
    if (s > 0) list.push({index: c, score: s});
  }
  list.sort(function(a,b) { return b.score - a.score; });
  return limit ? list.slice(0,limit) : list;
}

export const colorRelatedTerms = function(c, limit, minCount) {
  let cc = c*W,
    list: { index: number; score: any; }[] = [],
    sum = 0,
    s,
    cnt = termsCount;
  for (var w=0; w<W; ++w) {
    if ((s = T[cc+w]) !== undefined) {
      list.push({index: w, score: s});
      sum += s;
    }
  }
  if (minCount) {
    list = list.filter(function(d) { return cnt[d.index] > minCount; });
  }
  list.sort(function(a,b) { return b.score - a.score; });
  list.forEach(function(d) { d.score /= sum; });
  return limit ? list.slice(0, limit) : list;
}

// compute representative colors
export const termsCenter = range(W).map(function(w) {
  var list = termsRelatedColors(w, 5)
                .map(function(d) { return color[d.index]; });
  var L = 0, a = 0, b = 0, N = list.length;
  list.forEach(function(c) { L += c.l; a += c.a; b += c.b; });
  return lab(Math.round(L/N), Math.round(a/N), Math.round(b/N));
});

export { A,T,color,colorCount,terms,termsCount } from "./init";

