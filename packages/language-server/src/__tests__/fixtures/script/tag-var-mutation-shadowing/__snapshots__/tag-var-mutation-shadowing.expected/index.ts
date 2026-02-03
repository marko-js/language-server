export interface Input {}
(function (this: void) {
  const input = Marko._.any as Input;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.getGlobal(
    // @ts-expect-error We expect the compiler to error because we are checking if the MarkoRun.Context is defined.
    (Marko._.error, Marko._.any as MarkoRun.Context),
  );
  const x = Marko._.hoist(() => __marko_internal_hoist__x);
  const __marko_internal_tag_1 = Marko._.resolveTemplate(
    import("@marko/runtime-tags/tags/const.d.marko"),
  );
  {
    const x = Marko._.returned(() => __marko_internal_rendered_1);
    const __marko_internal_rendered_1 = Marko._.renderTemplate(
      __marko_internal_tag_1 /*const*/,
    )()()({
      value: "",
    });
    const __marko_internal_change__x = Marko._.change(
      "x",
      "value",
      __marko_internal_rendered_1.return,
    );
    Marko._.renderNativeTag("div")()()({
      onClick() {
        __marko_internal_change__x.x = "Hello!";

        {
          let x = 1;
          x = "Hello!";
          console.log(x);
        }

        {
          let { x } = { x: 1 };
          x = "Hello!";
          console.log(x);
        }

        {
          let { y: x } = { y: 1 };
          x = "Hello!";
          console.log(x);
        }

        {
          let {
            y: {},
            ...x
          } = { y: 1, x: 2 };
          x = "Hello!";
          console.log(x);
        }

        {
          let [x] = [1];
          x = "Hello!";
          console.log(x);
        }

        {
          let [, ...x] = [1];
          x = "Hello!";
          console.log(x);
        }

        {
          for (let x = 0; x < 10; x++) {
            x = "Hello!";
            console.log(x);
          }
        }

        {
          for (let x of [1, 2, 3]) {
            x = "Hello!";
            console.log(x);
          }
        }

        {
          for (let x in { a: 1, b: 2, c: 3 }) {
            x = "Hello!";
            console.log(x);
          }
        }

        testA(1);
        function testA(x: number) {
          x = "Hello!";
          console.log(x);
        }

        (function testB(x: number) {
          x = "Hello!";
          console.log(x);
        })(1);

        ((x: number) => {
          x = "Hello!";
          console.log(x);
        })(1);

        ({
          testC(x: number) {
            x = "Hello!";
            console.log(x);
          },
        });

        class TestD {
          testD(x: number) {
            x = "Hello!";
            this.#testE(1);
            console.log(x);
          }
          #testE(x: number) {
            x = "Hello!";
            console.log(x);
          }
        }

        new TestD().testD(1);

        {
          class x {
            constructor() {
              x = "Hello!";
            }
          }
          new x();
          x = "Hello!";
        }

        (class x {
          constructor() {
            x = "Hello!";
          }
        });

        (class {
          constructor() {
            __marko_internal_change__x.x = "Hello!";
          }
        });

        (() => {
          function x() {
            x = "Hello!";
          }

          x = "Hello!";
          x();
        })();

        try {
          __marko_internal_change__x.x = "Hello!";
        } catch (x) {
          x = "Hello!";
          console.log(x);
        }

        try {
          __marko_internal_change__x.x = "Hello!";
        } catch {
          __marko_internal_change__x.x = "Hello!";
          console.log(x);
        }

        {
          let a: { x: number } | undefined = { x: 1 };

          a.x = 2;
          a.x++;
          console.log(a.x);

          a = undefined;
        }
      },
    });
    var __marko_internal_hoist__x = x;
  }
  Marko._.noop({ x, input, $global, $signal });
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
