export type Input = Record<string, never>;
function ˍ(input: Input) {
  const out = 1 as unknown as Marko.Out;
  const component = 1 as unknown as ட;
  const state = 1 as unknown as typeof component extends {
    state: infer State extends object;
  }
    ? State
    : never;
  Marko.ட.noop({ input, out, component, state });
  ˍ.tags["test-tag"]({
    /*test-tag*/
    items: [
      {
        /*@item*/
        x: 1,
      },
    ],
  });
  ˍ.tags["test-tag"]({
    /*test-tag*/
    items: [
      {
        /*@item*/
        x: 1,
        /*@item*/ ["renderBody"]: Marko.ட.inlineBody((() => {})()),
      },
      {
        /*@item*/
        /*@item*/
        ["renderBody"]: Marko.ட.inlineBody((() => {})()),
      },
    ],
  });
  return;
}
class ட extends Marko.Component<Input> {}

declare namespace ˍ {
  const tags: {
    "test-tag": Marko.ட.CustomTagRenderer<
      typeof import("./components/test-tag/index.marko").default
    >;
  };
}
export default 1 as unknown as Marko.Template<"@language-tools/src/__tests__/fixtures/attr-tag-target-property/index.marko">;
declare global {
  namespace Marko {
    interface CustomTags {
      "@language-tools/src/__tests__/fixtures/attr-tag-target-property/index.marko": CustomTag<
        Input,
        ReturnType<typeof ˍ>,
        ட
      >;
    }
  }
}
