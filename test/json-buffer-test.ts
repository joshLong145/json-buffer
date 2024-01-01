
import * as _JSON from '../mod.ts';

import { assertEquals } from "https://deno.land/std@0.210.0/assert/mod.ts";

declare var Deno;

function clone (o) {
  return JSON.parse(JSON.stringify(o))
}

var examples = {
  simple: { foo: [], bar: {}, baz: new Deno.Buffer('some binary data') },
  just_buffer: new Deno.Buffer('JUST A BUFFER'),
  all_types: {
    string:'hello',
    number: 3145,
    null: null,
    object: {},
    array: [],
    boolean: true,
    boolean2: false
  },
  foo: new Deno.Buffer('foo'),
  foo2: new Deno.Buffer('foo2'),
  escape: {
    buffer: new Deno.Buffer('x'),
    string: _JSON.stringify(new Deno.Buffer('x'))
  },
  escape2: {
    buffer: new Deno.Buffer('x'),
    string: ':base64:'+ new Deno.Buffer('x').toString('base64')
  },
  undefined: {
    empty: undefined, test: true
  },
  undefined2: {
    first: 1, empty: undefined, test: true
  },
  undefinedArray: {
    array: [undefined, 1, 'two']
  },
  fn: {
    fn: function () {}    
  }
}

for(const k in examples)
(function (value, k) { 
Deno.test(k, function () {
    var s = _JSON.stringify(value)
    console.log('parse', s)
    if(JSON.stringify(value) !== undefined) {
      console.log(s)
      var _value = _JSON.parse(s)
      assertEquals(clone(_value), clone(value))
    }
    else
      assertEquals(s, undefined)
  })
})(examples[k], k)



