# json-buffer

JSON functions that can convert buffers!

JSON mangles buffers by converting to an array... which isn't helpful.
json-buffers converts to base64 instead, and deconverts base64 to a buffer.

```js
import * as JSONB  from './mod.ts';
import { Buffer } from "https://deno.land/std@0.177.0/node/buffer.ts";


var str = JSONB.stringify(Buffer.from("hello there!"));

console.log(JSONB.parse(str)); //GET a BUFFER back
```

## License

MIT
