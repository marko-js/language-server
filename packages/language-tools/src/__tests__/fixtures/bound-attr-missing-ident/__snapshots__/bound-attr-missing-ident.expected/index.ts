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
    ˍ.tags["let"]({
      /*let*/
      valueChange(ˍ) {
        a = ˍ;
      },
      value: a,
    })
  );
  const { value: b } = Marko.ட.rendered.returns[1];
  return;
}
class ட extends Marko.Component<Input> {}

declare namespace ˍ {
  const tags: {
    let: Marko.ட.CustomTagRenderer<
      typeof import("../../components/let/index.marko").default
    >;
  };
}
export default 1 as unknown as Marko.Template<"@language-tools/src/__tests__/fixtures/bound-attr-missing-ident/index.marko">;
declare global {
  namespace Marko {
    interface CustomTags {
      "@language-tools/src/__tests__/fixtures/bound-attr-missing-ident/index.marko": CustomTag<
        Input,
        ReturnType<typeof ˍ>,
        ட
      >;
    }
  }
}
