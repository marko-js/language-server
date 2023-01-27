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
      value: 1,
    })
  );
  const { value: value } = Marko.ட.rendered.returns[1];
  ˍ.tags["button"]({
    /*button*/
    onClick() {
      ᜭ.mutate.value++;
    },
  });
  const ᜭ = {
    return: Marko.ட.returnTag({
      /*return*/
      value: value,
    }),
    mutate: Marko.ட.mutable([["value", Marko.ட.rendered.returns[1]]] as const),
  };
  Marko.ட.noop({ value });
  return ᜭ.return;
}
class ட extends Marko.Component<Input> {}

declare namespace ˍ {
  const tags: {
    let: Marko.ட.CustomTagRenderer<
      typeof import("../../components/let/index.marko").default
    >;
    button: Marko.ட.NativeTagRenderer<"button">;
  };
}
export default 1 as unknown as Marko.Template<"@language-tools/src/__tests__/fixtures/return-tag-basic/index.marko">;
declare global {
  namespace Marko {
    interface CustomTags {
      "@language-tools/src/__tests__/fixtures/return-tag-basic/index.marko": CustomTag<
        Input,
        ReturnType<typeof ˍ>,
        ட
      >;
    }
  }
}
