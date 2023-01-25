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
  const id: unique symbol;
  const template: Marko.Template<typeof id>;
  const tags: {
    "test-tag": Marko.ட.CustomTagRenderer<
      typeof import("/Users/dpiercey/dev/marko-js/language-server/packages/language-tools/src/__tests__/fixtures/attr-tag-target-property/components/test-tag/index.marko").default
    >;
  };
}
export default 1 as unknown as typeof ˍ.template;
declare global {
  namespace Marko {
    interface CustomTags {
      [ˍ.id]: CustomTag<Input, ReturnType<typeof ˍ>, ட>;
    }
  }
}
