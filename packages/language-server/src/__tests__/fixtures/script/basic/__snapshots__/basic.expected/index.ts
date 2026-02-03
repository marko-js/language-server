export interface Input<T extends string> {
  name: T;
}
(function <T extends string>(this: void) {
  const input = Marko._.any as Input<T>;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.getGlobal(
    // @ts-expect-error We expect the compiler to error because we are checking if the MarkoRun.Context is defined.
    (Marko._.error, Marko._.any as MarkoRun.Context),
  );
  const x = Marko._.hoist(() => __marko_internal_hoist__x);
  const __marko_internal_rendered_1 = Marko._.renderNativeTag("div")()()({
    [Marko._.content /*div*/]: (() => {
      const __marko_internal_tag_2 = Marko._.resolveTemplate(
        import("@marko/runtime-tags/tags/let.d.marko"),
      );
      const __marko_internal_rendered_2 = Marko._.renderTemplate(
        __marko_internal_tag_2 /*let*/,
      )()()({
        value: () => 1,
      });
      {
        const x = __marko_internal_rendered_2.return.value;
        new Thing();
        //      ^?
        x;
        //  ^?
        input.name;
        return () => {
          return new (class MarkoReturn<Return = void> {
            [Marko._.scope] = { x };
            declare return: Return;
            constructor(_?: Return) {}
          })();
        };
      }
    })(),
  });
  //        ^?
  x;
  var { x: __marko_internal_hoist__x } = Marko._.readScope(
    __marko_internal_rendered_1,
  );
  Marko._.noop({ x, input, $global, $signal });
  return;
})();
export default new (class Template extends Marko._.Template<{
  render<T extends string>(
    input: Marko.TemplateInput<Input<T>>,
    stream?: {
      write: (chunk: string) => void;
      end: (chunk?: string) => void;
    },
  ): Marko.Out<never>;

  render<T extends string>(
    input: Marko.TemplateInput<Input<T>>,
    cb?: (err: Error | null, result: Marko.RenderResult<never>) => void,
  ): Marko.Out<never>;

  renderSync<T extends string>(
    input: Marko.TemplateInput<Input<T>>,
  ): Marko.RenderResult<never>;

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

  api: "tags";
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
//   ^?
