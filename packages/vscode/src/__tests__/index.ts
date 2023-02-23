import Mocha from "mocha";
import { stream } from "fast-glob";
import { mochaHooks } from "mocha-snap";

export async function run() {
  // enables typescript for imported files below.
  // prettier-ignore
  await import(("tsx"));

  const mocha = new Mocha({
    color: true,
    timeout: 5000,
    rootHooks: mochaHooks,
  });
  const files = stream("**/*.test.ts", {
    absolute: true,
  }) as AsyncIterable<string>;

  for await (const file of files) {
    mocha.addFile(file);
  }

  await new Promise<void>((resolve, reject) =>
    mocha.run((failures) => (failures ? reject() : resolve()))
  );
}
