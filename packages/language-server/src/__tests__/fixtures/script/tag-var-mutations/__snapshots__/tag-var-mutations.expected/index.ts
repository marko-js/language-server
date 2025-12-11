export interface Input {}
(function (this: void) {
  const input = Marko._.any as Input;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.getGlobal(
    // @ts-expect-error We expect the compiler to error because we are checking if the MarkoRun.Context is defined.
    (Marko._.error, Marko._.any as MarkoRun.Context),
  );
  const __marko_internal_tag_1 = Marko._.resolveTemplate(
    import("@marko/runtime-tags/tags/let.d.marko"),
  );
  const __marko_internal_rendered_1 = Marko._.renderTemplate(
    __marko_internal_tag_1,
  )()()({
    value: 1,
  });
  const x = __marko_internal_rendered_1.return.value;
  Marko._.renderNativeTag("div")()()({
    "data-function"() {
      __marko_internal_return.mutate.x++;
    },
  });
  Marko._.renderNativeTag("div")()()({
    "data-function"(y = __marko_internal_return.mutate.x++) {
      y;
    },
  });
  Marko._.renderNativeTag("div")()()({
    "data-function": () => {
      __marko_internal_return.mutate.x++;
    },
  });
  Marko._.renderNativeTag("div")()()({
    "data-function": (y = __marko_internal_return.mutate.x++) => {
      y;
    },
  });
  Marko._.renderNativeTag("div")()()({
    "data-function": function () {
      __marko_internal_return.mutate.x++;
    },
  });
  Marko._.renderNativeTag("div")()()({
    "data-function": function (y = __marko_internal_return.mutate.x++) {
      y;
    },
  });
  Marko._.renderNativeTag("div")()()({
    "data-function"() {
      function testA() {
        __marko_internal_return.mutate.x++;
      }

      function testB(y = __marko_internal_return.mutate.x++) {
        y;
      }

      class TestC {
        constructor() {
          this.#privateMethodA;
          this.#privateMethodB;
        }
        methodA() {
          __marko_internal_return.mutate.x++;
        }
        methodB(y = __marko_internal_return.mutate.x++) {
          y;
        }
        #privateMethodA() {
          __marko_internal_return.mutate.x++;
        }
        #privateMethodB(y = __marko_internal_return.mutate.x++) {
          y;
        }
      }

      testA;
      testB;
      TestC;
    },
  });
  const __marko_internal_return = {
    mutate: Marko._.mutable([
      ["x", "value", __marko_internal_rendered_1.return],
    ] as const),
  };
  Marko._.noop({
    x,
  });
  Marko._.noop({ input, $global, $signal });
  return;
})();
export default new (class Template extends Marko._.Template<{
  render(
    input: Marko.TemplateInput<Input>,
    stream?: {
      write: (chunk: string) => void;
      end: (chunk?: string) => void;
    },
  ): Marko.Out<never>;

  render(
    input: Marko.TemplateInput<Input>,
    cb?: (err: Error | null, result: Marko.RenderResult<never>) => void,
  ): Marko.Out<never>;

  renderSync(input: Marko.TemplateInput<Input>): Marko.RenderResult<never>;

  renderToString(input: Marko.TemplateInput<Input>): string;

  stream(
    input: Marko.TemplateInput<Input>,
  ): ReadableStream<string> & NodeJS.ReadableStream;

  mount(
    input: Marko.TemplateInput<Input>,
    reference: Node,
    position?: "afterbegin" | "afterend" | "beforebegin" | "beforeend",
  ): Marko.MountedTemplate<typeof input>;

  api: "tags";
  _(): () => <__marko_internal_input extends unknown>(
    input: Marko.Directives &
      Input &
      Marko._.Relate<__marko_internal_input, Marko.Directives & Input>,
  ) => Marko._.ReturnWithScope<__marko_internal_input, void>;
}> {})();
