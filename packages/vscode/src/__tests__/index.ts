import { stream } from "fast-glob";
import Mocha from "mocha";
import { mochaHooks } from "mocha-snap";
import path from "path";

export async function run() {
  // enables typescript for imported files below.
  // prettier-ignore
  await import(("tsx"));

  const mocha = new Mocha({
    color: true,
    timeout: 20000,
    rootHooks: mochaHooks,
  });
  const files = stream(
    path.resolve(__dirname, "../../src/__tests__/**/*.test.ts"),
    {
      absolute: true,
    },
  ) as AsyncIterable<string>;

  for await (const file of files) {
    mocha.addFile(file);
  }

  await new Promise<void>((resolve, reject) =>
    mocha.run((failures) => (failures ? reject() : resolve())),
  );
}
