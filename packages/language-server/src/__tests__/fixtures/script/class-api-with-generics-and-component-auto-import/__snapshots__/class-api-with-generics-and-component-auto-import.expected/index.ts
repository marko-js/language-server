export interface Input<T> {
  value: T;
}
import type Component from "./component";
export type { Component };
(function <T>(this: void) {
  const input = Marko._.any as Input<T>;
  const component = Marko._.any as Component<T>;
  const state = Marko._.state(component);
  const out = Marko._.out;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.getGlobal(
    // @ts-expect-error We expect the compiler to error because we are checking if the MarkoRun.Context is defined.
    (Marko._.error, Marko._.any as MarkoRun.Context),
  );
  Marko._.renderNativeTag("div")()()({
    onClick: component.handleClickMissing,
  });
  Marko._.renderNativeTag("div")()()({
    onClick: component["strange-handler"],
  });
  console.log(component.input);
  Marko._.noop({ component, state, out, input, $global, $signal });
  return;
})();
export default new (class Template extends Marko._.Template<{
  render<T>(
    input: Marko.TemplateInput<Input<T>>,
    stream?: {
      write: (chunk: string) => void;
      end: (chunk?: string) => void;
    },
  ): Marko.Out<Component<T>>;

  render<T>(
    input: Marko.TemplateInput<Input<T>>,
    cb?: (err: Error | null, result: Marko.RenderResult<Component<T>>) => void,
  ): Marko.Out<Component<T>>;

  renderSync<T>(
    input: Marko.TemplateInput<Input<T>>,
  ): Marko.RenderResult<Component<T>>;

  renderToString<T>(input: Marko.TemplateInput<Input<T>>): string;

  stream<T>(
    input: Marko.TemplateInput<Input<T>>,
  ): ReadableStream<string> & NodeJS.ReadableStream;

  mount<T>(
    input: Marko.TemplateInput<Input<T>>,
    reference: Node,
    position?: "afterbegin" | "afterend" | "beforebegin" | "beforeend",
  ): Marko.MountedTemplate<typeof input>;

  api: "class";
  _<__marko_internal_apply = 1>(): __marko_internal_apply extends 0
    ? <T>() => <__marko_internal_input extends unknown>(
        input: Marko.Directives &
          Input<T> &
          Marko._.Relate<__marko_internal_input, Marko.Directives & Input<T>>,
      ) => Marko._.ReturnWithScope<__marko_internal_input, void>
    : () => <__marko_internal_input extends unknown, T>(
        input: Marko.Directives &
          Input<T> &
          Marko._.Relate<__marko_internal_input, Marko.Directives & Input<T>>,
      ) => Marko._.ReturnWithScope<__marko_internal_input, void>;
}> {})();
//                      ^?
