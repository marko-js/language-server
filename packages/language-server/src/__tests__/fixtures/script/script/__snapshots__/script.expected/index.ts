export interface Input<T extends string> {
  name: T;
}
abstract class Component<T extends string> extends Marko.Component<Input<T>> {}
export { type Component };
(function <T extends string>(this: void) {
  const input = Marko._.any as Input<T>;
  const component = Marko._.any as Component<T>;
  const state = Marko._.state(component);
  const out = Marko._.out;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.getGlobal(
    // @ts-expect-error We expect the compiler to error because we are checking if the MarkoRun.Context is defined.
    (Marko._.error, Marko._.any as MarkoRun.Context),
  );
  Marko._.noop({ component, state, out, input, $global, $signal });
  Marko._.assertRendered(
    Marko._.rendered,
    1,
    Marko._.renderNativeTag("div")()()({
      ["renderBody" /*div*/]: (() => {
        const __marko_internal_tag_1 = Marko._.resolveTemplate(
          import("../../../components/let/index.marko"),
        );
        Marko._.assertRendered(
          Marko._.rendered,
          2,
          Marko._.renderTemplate(__marko_internal_tag_1)()()({
            value: 1,
          }),
        );
        const x = Marko._.rendered.returns[2].value;
        const __marko_internal_tag_2 = Marko._.resolveTemplate(
          import("../../../components/const/index.marko"),
        );
        Marko._.assertRendered(
          Marko._.rendered,
          3,
          Marko._.renderTemplate(__marko_internal_tag_2)()()({
            value: "hi",
          }),
        );
        const y = Marko._.rendered.returns[3].value;
        const __marko_internal_tag_3 = Marko._.resolveTemplate(
          import("../../../components/const/index.marko"),
        );
        Marko._.assertRendered(
          Marko._.rendered,
          4,
          Marko._.renderTemplate(__marko_internal_tag_3)()()({
            value: Promise.resolve("world"),
          }),
        );
        const promise = Marko._.rendered.returns[4].value;
        Marko._.renderNativeTag("script")()()({
          async value() {
            console.log(x);
            //              ^?
            console.log(y);
            //              ^?
            console.log(input.name);
            //                    ^?

            const resolved = await promise;
            console.log(resolved);
            //          ^?
            __marko_internal_return.mutate.x = 2;
            __marko_internal_return.mutate.y = "bye";
          },
          /*script*/
        });
        const __marko_internal_return = {
          mutate: Marko._.mutable([
            ["x", "value", Marko._.rendered.returns[2]],
            ["y", "value", Marko._.rendered.returns[3]],
          ] as const),
        };
        Marko._.noop({
          x,
          y,
        });
        return () => {
          return new (class MarkoReturn<Return = void> {
            [Marko._.scope] = { x, y, promise };
            declare return: Return;
            constructor(_?: Return) {}
          })();
        };
      })(),
    }),
  );
  const { x, y, promise } = Marko._.readScopes(Marko._.rendered);
  Marko._.noop({ x, y, promise });
  return;
})();
export default new (class Template extends Marko._.Template<{
  render<T extends string>(
    input: Marko.TemplateInput<Input<T>>,
    stream?: {
      write: (chunk: string) => void;
      end: (chunk?: string) => void;
    },
  ): Marko.Out<Component<T>>;

  render<T extends string>(
    input: Marko.TemplateInput<Input<T>>,
    cb?: (err: Error | null, result: Marko.RenderResult<Component<T>>) => void,
  ): Marko.Out<Component<T>>;

  renderSync<T extends string>(
    input: Marko.TemplateInput<Input<T>>,
  ): Marko.RenderResult<Component<T>>;

  renderToString<T extends string>(
    input: Marko.TemplateInput<Input<T>>,
  ): string;

  stream<T extends string>(
    input: Marko.TemplateInput<Input<T>>,
  ): ReadableStream<string> & NodeJS.ReadableStream;

  api: "class";
  _<__marko_internal_apply = 1>(): __marko_internal_apply extends 0
    ? <T extends string>() => <__marko_internal_input extends unknown>(
        input: Marko.Directives &
          Input<T> &
          Marko._.Relate<__marko_internal_input, Marko.Directives & Input<T>>,
      ) => Marko._.ReturnWithScope<__marko_internal_input, void>
    : () => <__marko_internal_input extends unknown, T extends string>(
        input: Marko.Directives &
          Input<T> &
          Marko._.Relate<__marko_internal_input, Marko.Directives & Input<T>>,
      ) => Marko._.ReturnWithScope<__marko_internal_input, void>;
}> {})();
