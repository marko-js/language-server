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
  ˍ.tags["input"]({
    /*input*/
    type: "checkbox",
    disabled: true,
    checked: true,
  });
  return;
}
class ட extends Marko.Component<Input> {}

declare namespace ˍ {
  const tags: {
    input: Marko.ட.NativeTagRenderer<"input">;
  };
}
export default 1 as unknown as Marko.Template<"@language-tools/src/__tests__/fixtures/attr-boolean/index.marko">;
declare global {
  namespace Marko {
    interface CustomTags {
      "@language-tools/src/__tests__/fixtures/attr-boolean/index.marko": CustomTag<
        Input,
        ReturnType<typeof ˍ>,
        ட
      >;
    }
  }
}
