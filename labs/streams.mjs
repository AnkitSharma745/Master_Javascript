import { Readable, Transform, Writable } from "node:stream";
import { pipeline } from "node:stream/promises";

export async function uppercaseAscii(chunks, { fail = false } = {}) {
  let result = "";
  const transform = new Transform({
    transform(chunk, encoding, done) {
      if (fail) return done(new Error("Transform failed"));
      done(null, chunk.toString("ascii").toUpperCase());
    }
  });
  const destination = new Writable({
    write(chunk, encoding, done) { result += chunk.toString("ascii"); done(); }
  });
  await pipeline(Readable.from(chunks), transform, destination);
  return result; // Collecting the result is only for this small demonstration.
}
