export interface Input<T extends string> {
  name: T;
}
function ˍ<T extends string>(input: Input<T>) {
  const out = 1 as unknown as Marko.Out;
  const component = 1 as unknown as ட<T>;
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
          new Thing();
          x;
          input.name;
          return {
            scope: { x },
          };
        })()
      ),
    })
  );
  x;
  const { x } = Marko.ட.readScopes(Marko.ட.rendered);
  Marko.ட.noop({ x });
  return;
}
class ட<T extends string> extends Marko.Component<Input<T>> {}
declare namespace ˍ {
  const id: "@language-tools/src/__tests__/fixtures/basic/index.marko";
  const template: Marko.Template<typeof id>;
  const tags: {
    div: Marko.ட.NativeTagRenderer<"div">;
    let: Marko.ட.CustomTagRenderer<
      typeof import("../../components/let/index.marko").default
    >;
  };
}
export default 1 as unknown as typeof ˍ.template;
type ᜭ<T, ᜭ extends T extends string ? T : never> = any & ᜭ;
declare global {
  namespace Marko {
    interface CustomTags1<A> {
      [ˍ.id]: 1 extends ᜭ<A, infer A>
        ? CustomTag<Input<A>, ReturnType<typeof ˍ<A>>, ட<A>>
        : never;
    }
  }
}
