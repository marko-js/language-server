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
      value: { b: 1, bChange(value: number) {} },
    })
  );
  const { value: a } = Marko.ட.rendered.returns[1];
  Marko.ட.assertRendered(
    Marko.ட.rendered,
    2,
    ˍ.tags["let"]({
      /*let*/
      valueChange: a.bChange,
      value: a.b,
    })
  );
  const { value: b } = Marko.ட.rendered.returns[2];
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
export default 1 as unknown as Marko.Template<"@language-tools/src/__tests__/fixtures/bound-attr-mut-literal-member/index.marko">;
declare global {
  namespace Marko {
    interface CustomTags {
      "@language-tools/src/__tests__/fixtures/bound-attr-mut-literal-member/index.marko": CustomTag<
        Input,
        ReturnType<typeof ˍ>,
        ட
      >;
    }
  }
}
