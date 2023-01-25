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
              value: {
                a: 1,
                b: "hello!",
                c: undefined,
                nested: {
                  d: 2,
                  dChange(v: number) {},
                },
                "some-alias": 3,
                computed: 4,
                other: true,
              } as const,
            })
          );
          const {
            value: {
              a,
              b,
              c = "default" as const,
              nested: { d },
              "some-alias": e,
              ["computed"]: f,
              ...g
            },
          } = Marko.ட.rendered.returns[2];
          Marko.ட.assertRendered(
            Marko.ட.rendered,
            3,
            ˍ.tags["let"]({
              /*let*/
              value: [1, 2, 3, 4, 5] as const,
            })
          );
          const {
            value: [h, i, , ...j],
          } = Marko.ட.rendered.returns[3];
          return {
            scope: { a, b, c, d, e, f, g, h, i, j },
          };
        })()
      ),
    })
  );
  () => {
    a;
    b;
    c;
    d;
    e;
    f;
    g;
    h;
    i;
    j;
  };
  const { a, b, c, d, e, f, g, h, i, j } = Marko.ட.readScopes(Marko.ட.rendered);
  Marko.ட.noop({ a, b, c, d, e, f, g, h, i, j });
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
