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
    /*test-tag*/
    ["renderBody"]: Marko.ட.body(function* (a, b) {
      a;
      b;
      return;
    }),
  });
  Marko.ட.assertRendered(
    Marko.ட.rendered,
    1,
    ˍ.tags["test-tag"]({
      /*test-tag*/
      /*test-tag*/
      ["renderBody"]: Marko.ட.body(function* (a) {
        Marko.ட.assertRendered(
          Marko.ட.rendered,
          2,
          ˍ.tags["const"]({
            /*const*/
            value: a,
          })
        );
        const { value: hoistedFromTestTag } = Marko.ட.rendered.returns[2];
        yield { hoistedFromTestTag };
        return;
      }),
    })
  );
  () => {
    hoistedFromTestTag;
  };
  const { hoistedFromTestTag } = Marko.ட.readScopes(Marko.ட.rendered);
  Marko.ட.noop({ hoistedFromTestTag });
  return;
}
class ட extends Marko.Component<Input> {}
declare namespace ˍ {
  const id: unique symbol;
  const template: Marko.Template<typeof id>;
  const tags: {
    "test-tag": Marko.ட.CustomTagRenderer<
      typeof import("/Users/dpiercey/dev/marko-js/language-server/packages/language-tools/src/__tests__/fixtures/tag-params-basic/components/test-tag.marko").default
    >;
    const: Marko.ட.CustomTagRenderer<
      typeof import("/Users/dpiercey/dev/marko-js/language-server/packages/language-tools/src/__tests__/components/const/index.marko").default
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
