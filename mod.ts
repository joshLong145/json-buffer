//TODO: handle reviver/dehydrate function like normal
//and handle indentation, like normal.
//if anyone needs this... please send pull request.
import { Buffer } from "https://deno.land/std@0.177.0/node/buffer.ts";

export const stringify = function stringify(o: Buffer | any) {
  if ("undefined" == typeof o) return o;

  if (o && Buffer.isBuffer(o)) {
    return JSON.stringify(":base64:" + o.toString("base64"));
  }

  if (o && o.toJSON) {
    o = o.toJSON();
  }

  if (o && "object" === typeof o) {
    let s = "";
    const array = Array.isArray(o);
    s = array ? "[" : "{";
    let first = true;

    for (let k in o) {
      const ignore = "function" == typeof o[k] ||
        (!array && "undefined" === typeof o[k]);
      if (Object.hasOwnProperty.call(o, k) && !ignore) {
        if (!first) {
          s += ",";
        }
        first = false;
        if (array) {
          if (o[k] == undefined) {
            s += "null";
          } else {
            s += stringify(o[k]);
          }
        } else if (o[k] !== void (0)) {
          s += stringify(k) + ":" + stringify(o[k]);
        }
      }
    }

    s += array ? "]" : "}";

    return s;
  } else if ("string" === typeof o) {
    return JSON.stringify(/^:/.test(o) ? ":" + o : o);
  } else if ("undefined" === typeof o) {
    return "null";
  } else {
    return JSON.stringify(o);
  }
};

export const parse = function (s: string) {
  return JSON.parse(s, function (key, value) {
    if ("string" === typeof value) {
      if (/^:base64:/.test(value)) {
        return new Buffer(value.substring(8), "base64");
      } else {
        return /^:/.test(value) ? value.substring(1) : value;
      }
    }
    return value;
  });
};
