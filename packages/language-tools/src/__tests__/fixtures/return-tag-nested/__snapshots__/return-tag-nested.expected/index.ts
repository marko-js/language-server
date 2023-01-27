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
    ["renderBody"]: Marko.ட.body(function* (a) {
      a;
      return;
    }),
  });
  ˍ.tags["test-tag"]({
    /*test-tag*/
    /*test-tag*/
    ["renderBody"]: Marko.ட.body(function* (a) {
      const ᜭ = {
        return: Marko.ட.returnTag({
          /*return*/
          value: a,
        }),
      };
      return ᜭ.return;
    }),
  });
  ˍ.tags["test-tag"]({
    /*test-tag*/
    /*test-tag*/
    ["renderBody"]: Marko.ட.inlineBody(
      (() => {
        const ᜭ = {
          return: Marko.ட.returnTag({
            /*return*/
            value: "b" as const,
          }),
        };
        return {
          return: ᜭ.return,
        };
      })()
    ),
  });
  ˍ.tags["test-tag"]({
    /*test-tag*/
    /*test-tag*/
    ["renderBody"]: Marko.ட.inlineBody(
      (() => {
        const ᜭ = {
          return: Marko.ட.returnTag({
            /*return*/
            value: "c" as const,
          }),
        };
        return {
          return: ᜭ.return,
        };
      })()
    ),
  });
  Marko.ட.assertRendered(
    Marko.ட.rendered,
    1,
    ˍ.tags["test-tag"]({
      /*test-tag*/
      /*test-tag*/
      ["renderBody"]: Marko.ட.inlineBody(
        (() => {
          Marko.ட.assertRendered(
            Marko.ட.rendered,
            2,
            ˍ.tags["let"]({
              /*let*/
              value: 1 as const,
            })
          );
          const { value: hoisted } = Marko.ட.rendered.returns[2];
          const ᜭ = {
            return: Marko.ட.returnTag({
              /*return*/
              value: "b" as const,
            }),
          };
          return {
            scope: { hoisted },
            return: ᜭ.return,
          };
        })()
      ),
    })
  );
  () => {
    hoisted;
  };
  const { hoisted } = Marko.ட.readScopes(Marko.ட.rendered);
  Marko.ட.noop({ hoisted });
  return;
}
class ட extends Marko.Component<Input> {}

declare namespace ˍ {
  const tags: {
    "test-tag": Marko.ட.CustomTagRenderer<
      typeof import("./components/test-tag.marko").default
    >;
    let: Marko.ட.CustomTagRenderer<
      typeof import("../../components/let/index.marko").default
    >;
  };
}
export default 1 as unknown as Marko.Template<"@language-tools/src/__tests__/fixtures/return-tag-nested/index.marko">;
declare global {
  namespace Marko {
    interface CustomTags {
      "@language-tools/src/__tests__/fixtures/return-tag-nested/index.marko": CustomTag<
        Input,
        ReturnType<typeof ˍ>,
        ட
      >;
    }
  }
}
