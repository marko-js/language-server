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
    ˍ.tags["div"]({
      /*div*/
      /*div*/
      ["renderBody"]: Marko.ட.inlineBody(
        (() => {
          Marko.ட.assertRendered(
            Marko.ட.rendered,
            2,
            ˍ.tags["let"]({
              /*let*/
              value: 1,
            })
          );
          const { value: x } = Marko.ட.rendered.returns[2];
          x;
          Marko.ட.assertRendered(
            Marko.ட.rendered,
            3,
            ˍ.tags["button"]({
              /*button*/
              onClick() {
                ᜭ.mutate.x = 2;
                ᜭ.mutate.x++;
                ++ᜭ.mutate.x;
              },
            })
          );
          const { value: el } = Marko.ட.rendered.returns[3];
          const ᜭ = {
            mutate: Marko.ட.mutable([
              ["x", "value", Marko.ட.rendered.returns[2]],
            ] as const),
          };
          Marko.ட.noop({ x });
          return {
            scope: { x, el },
          };
        })()
      ),
    })
  );
  Marko.ட.render(effect)({
    /*effect*/
    value() {
      console.log(el());
    },
  });
  x;
  const { x, el } = Marko.ட.readScopes(Marko.ட.rendered);
  Marko.ட.noop({ x, el });
  return;
}
class ட extends Marko.Component<Input> {}
declare namespace ˍ {
  const id: unique symbol;
  const template: Marko.Template<typeof id>;
  const tags: {
    div: Marko.ட.NativeTagRenderer<"div">;
    let: Marko.ட.CustomTagRenderer<
      typeof import("../../components/let/index.marko").default
    >;
    button: Marko.ட.NativeTagRenderer<"button">;
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
