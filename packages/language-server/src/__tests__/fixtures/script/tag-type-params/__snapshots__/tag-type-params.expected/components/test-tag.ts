export interface Input<T, U> {
  data: T;
  content: Marko.Body<[T], U>;
}
function __marko_internal_template<T, U>(this: void) {
  const input = Marko._.any as Input<T, U>;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.getGlobal(
    // @ts-expect-error We expect the compiler to error because we are checking if the MarkoRun.Context is defined.
    (Marko._.error, Marko._.any as MarkoRun.Context),
  );
  var __marko_internal_return = {
    return: Marko._.returnTag({
      value: 1 as unknown as U,
    }),
  };
  Marko._.noop({ input, $global, $signal });
  return __marko_internal_return.return;
}
export default new (class Template extends Marko._.Template<{
  render<T, U>(
    input: Marko.TemplateInput<Input<T, U>>,
    stream?: {
      write: (chunk: string) => void;
      end: (chunk?: string) => void;
    },
  ): Marko.Out<never>;

  render<T, U>(
    input: Marko.TemplateInput<Input<T, U>>,
    cb?: (err: Error | null, result: Marko.RenderResult<never>) => void,
  ): Marko.Out<never>;

  renderSync<T, U>(
    input: Marko.TemplateInput<Input<T, U>>,
  ): Marko.RenderResult<never>;

  renderToString<T, U>(input: Marko.TemplateInput<Input<T, U>>): string;

  stream<T, U>(
    input: Marko.TemplateInput<Input<T, U>>,
  ): ReadableStream<string> & NodeJS.ReadableStream;

  mount<T, U>(
    input: Marko.TemplateInput<Input<T, U>>,
    reference: Node,
    position?: "afterbegin" | "afterend" | "beforebegin" | "beforeend",
  ): Marko.MountedTemplate<typeof input>;

  api: "tags";
  _<__marko_internal_apply = 1>(): __marko_internal_apply extends 0
    ? <T, U>() => <__marko_internal_input extends unknown>(
        input: Marko.Directives &
          Input<T, U> &
          Marko._.Relate<
            __marko_internal_input,
            Marko.Directives & Input<T, U>
          >,
      ) => Marko._.ReturnWithScope<
        __marko_internal_input,
        typeof __marko_internal_template<T, U> extends () => infer Return
          ? Return
          : never
      >
    : () => <__marko_internal_input extends unknown, T, U>(
        input: Marko.Directives &
          Input<T, U> &
          Marko._.Relate<
            __marko_internal_input,
            Marko.Directives & Input<T, U>
          >,
      ) => Marko._.ReturnWithScope<
        __marko_internal_input,
        typeof __marko_internal_template<T, U> extends () => infer Return
          ? Return
          : never
      >;
}> {})();
