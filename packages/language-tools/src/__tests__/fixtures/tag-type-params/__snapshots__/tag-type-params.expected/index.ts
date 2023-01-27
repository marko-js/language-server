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
  Marko.ட.assertRendered(
    Marko.ட.rendered,
    1,
    ˍ.tags["test-tag"]({
      /*test-tag*/
      data: 1 as const,
      /*test-tag*/
      ["renderBody"]: Marko.ட.body(function* <A>(data: A) {
        const ᜭ = {
          return: Marko.ட.returnTag({
            /*return*/
            value: { result: data },
          }),
        };
        return ᜭ.return;
      }),
    })
  );
  const { value: result } = Marko.ட.rendered.returns[1];
  result;
  return;
}
class ட extends Marko.Component<Input> {}

declare namespace ˍ {
  const tags: {
    "test-tag": Marko.ட.CustomTagRenderer<
      typeof import("./components/test-tag.marko").default
    >;
  };
}
export default 1 as unknown as Marko.Template<"@language-tools/src/__tests__/fixtures/tag-type-params/index.marko">;
declare global {
  namespace Marko {
    interface CustomTags {
      "@language-tools/src/__tests__/fixtures/tag-type-params/index.marko": CustomTag<
        Input,
        ReturnType<typeof ˍ>,
        ட
      >;
    }
  }
}
