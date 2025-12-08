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
  const __marko_internal_rendered_1 = Marko._.renderNativeTag("div")()()({
    ["renderBody" /*div*/]: (() => {
      const __marko_internal_tag_1 = Marko._.resolveTemplate(
        import("../../../components/let/index.marko"),
      );
      const __marko_internal_rendered_2 = Marko._.renderTemplate(
        __marko_internal_tag_1,
      )()()({
        value: 1,
      });
      const x = __marko_internal_rendered_2.return.value;
      const __marko_internal_tag_2 = Marko._.resolveTemplate(
        import("../../../components/const/index.marko"),
      );
      const __marko_internal_rendered_3 = Marko._.renderTemplate(
        __marko_internal_tag_2,
      )()()({
        value: "hi",
      });
      const y = __marko_internal_rendered_3.return.value;
      const __marko_internal_tag_3 = Marko._.resolveTemplate(
        import("../../../components/const/index.marko"),
      );
      const __marko_internal_rendered_4 = Marko._.renderTemplate(
        __marko_internal_tag_3,
      )()()({
        value: Promise.resolve("world"),
      });
      const promise = __marko_internal_rendered_4.return.value;
      Marko._.renderNativeTag("script")()()({
        async [Marko._.never]() {
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
          ["x", "value", __marko_internal_rendered_2.return],
          ["y", "value", __marko_internal_rendered_3.return],
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
  });
  const { x, y, promise } = Marko._.readScope(__marko_internal_rendered_1);
  Marko._.noop({
    x,
    y,
    promise,
    component,
    state,
    out,
    input,
    $global,
    $signal,
  });
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

  mount<T extends string>(
    input: Marko.TemplateInput<Input<T>>,
    reference: Node,
    position?: "afterbegin" | "afterend" | "beforebegin" | "beforeend",
  ): Marko.MountedTemplate<typeof input>;

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
