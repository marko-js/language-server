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
  const { value: a } = Marko.ட.rendered.returns[1];
  Marko.ட.assertRendered(
    Marko.ட.rendered,
    2,
    ˍ.tags["let"]({
      /*let*/
      valueChange(ˍ) {
        ᜭ.mutate.a = ˍ;
      },
      value: a,
    })
  );
  const { value: b } = Marko.ட.rendered.returns[2];
  ˍ.tags["div"]({
    /*div*/
    onClick() {
      ᜭ.mutate.a++;
      ᜭ.mutate.b++;
    },
  });
  const ᜭ = {
    mutate: Marko.ட.mutable([
      ["a", "value", Marko.ட.rendered.returns[1]],
      ["b", "value", Marko.ட.rendered.returns[2]],
    ] as const),
  };
  Marko.ட.noop({ a, b });
  return;
}
class ட extends Marko.Component<Input> {}
declare namespace ˍ {
  const id: unique symbol;
  const template: Marko.Template<typeof id>;
  const tags: {
    let: Marko.ட.CustomTagRenderer<
      typeof import("/Users/dpiercey/dev/marko-js/language-server/packages/language-tools/src/__tests__/components/let/index.marko").default
    >;
    div: Marko.ட.NativeTagRenderer<"div">;
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
