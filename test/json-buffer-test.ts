import * as _JSON from "../mod.ts";

import { assertEquals } from "https://deno.land/std@0.210.0/assert/mod.ts";
import { Buffer } from "https://deno.land/std@0.177.0/node/buffer.ts";

function clone(o: object) {
  return JSON.parse(JSON.stringify(o));
}

const examples: any = {
  simple: { foo: [], bar: {}, baz: new Buffer("some binary data") },
  just_buffer: new Buffer("JUST A BUFFER"),
  all_types: {
    string: "hello",
    number: 3145,
    null: null,
    object: {},
    array: [],
    boolean: true,
    boolean2: false,
  },
  foo: new Buffer("foo"),
  foo2: new Buffer("foo2"),
  escape: {
    buffer: new Buffer("x"),
    string: _JSON.stringify(new Buffer("x")),
  },
  escape2: {
    buffer: new Buffer("x"),
    string: ":base64:" + new Buffer("x").toString("base64"),
  },
  undefined: {
    empty: undefined,
    test: true,
  },
  undefined2: {
    first: 1,
    empty: undefined,
    test: true,
  },
  undefinedArray: {
    array: [undefined, 1, "two"],
  },
  fn: {
    fn: function () {},
  },
};

for (const k in examples) {
  (function (value, k) {
    Deno.test(k, function () {
      const s = _JSON.stringify(value);
      console.log("parse", s);
      if (JSON.stringify(value) !== undefined) {
        console.log(s);
        const _value = _JSON.parse(s as string);
        assertEquals(clone(_value), clone(value));
      } else {
        assertEquals(s, undefined);
      }
    });
  })(examples[k], k);
}
