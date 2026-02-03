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
  const y = Marko._.hoist(() => __marko_internal_hoist__y);
  const promise = Marko._.hoist(() => __marko_internal_hoist__promise);
  const __marko_internal_rendered_1 = Marko._.renderNativeTag("div")()()({
    [Marko._.content /*div*/]: (() => {
      const __marko_internal_tag_2 = Marko._.resolveTemplate(
        import("@marko/runtime-tags/tags/let.d.marko"),
      );
      const __marko_internal_rendered_2 = Marko._.renderTemplate(
        __marko_internal_tag_2 /*let*/,
      )()()({
        value: 1,
      });
      {
        const x = __marko_internal_rendered_2.return.value;
        const __marko_internal_change__x = Marko._.change(
          "x",
          "value",
          __marko_internal_rendered_2.return,
        );
        const __marko_internal_tag_3 = Marko._.resolveTemplate(
          import("@marko/runtime-tags/tags/const.d.marko"),
        );
        const __marko_internal_rendered_3 = Marko._.renderTemplate(
          __marko_internal_tag_3 /*const*/,
        )()()({
          value: "hi",
        });
        {
          const y = __marko_internal_rendered_3.return.value;
          const __marko_internal_change__y = Marko._.change(
            "y",
            "value",
            __marko_internal_rendered_3.return,
          );
          const __marko_internal_tag_4 = Marko._.resolveTemplate(
            import("@marko/runtime-tags/tags/const.d.marko"),
          );
          const __marko_internal_rendered_4 = Marko._.renderTemplate(
            __marko_internal_tag_4 /*const*/,
          )()()({
            value: Promise.resolve("world"),
          });
          {
            const promise = __marko_internal_rendered_4.return.value;
            const __marko_internal_tag_5 = Marko._.resolveTemplate(
              import("marko/src/core-tags/core/script.d.marko"),
            );
            Marko._.renderTemplate(__marko_internal_tag_5 /*script*/)()()({
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
                __marko_internal_change__x.x = 2;
                __marko_internal_change__y.y = "bye";
              },
              /*script*/
            });
            return () => {
              return new (class MarkoReturn<Return = void> {
                [Marko._.scope] = { x, y, promise };
                declare return: Return;
                constructor(_?: Return) {}
              })();
            };
          }
        }
      }
    })(),
  });
  var {
    x: __marko_internal_hoist__x,
    y: __marko_internal_hoist__y,
    promise: __marko_internal_hoist__promise,
  } = Marko._.readScope(__marko_internal_rendered_1);
  Marko._.noop({ x, y, promise, input, $global, $signal });
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
