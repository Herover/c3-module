import { c3_init } from "./init.js";
import { c3_api } from "./api.js";

export const load = async function(uri) {
  const data = await (await fetch(uri)).json();
  const c3 = c3_init(data);
  return c3_api(c3);
}

