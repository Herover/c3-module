import { c3_init } from "./init.js";
import { c3_api } from "./api.js";
import * as c3data from "../../data/xkcd/c3_data.json";

export const load = function() {
  console.log(c3data)
  const data = c3data;
  const c3 = c3_init(data);
  return c3_api(c3);
}

