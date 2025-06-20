export interface Input {}
abstract class Component extends Marko.Component<Input> {}
export { type Component };
(function (this: void) {
  const input = Marko._.any as Input;
  const component = Marko._.any as Component;
  const state = Marko._.state(component);
  const out = Marko._.out;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.getGlobal(
    // @ts-expect-error We expect the compiler to error because we are checking if the MarkoRun.Context is defined.
    (Marko._.error, Marko._.any as MarkoRun.Context),
  );
  Marko._.noop({ component, state, out, input, $global, $signal });
  const __marko_internal_tag_1 = Marko._.resolveTemplate(
    import("../../../components/const/index.marko"),
  );
  const __marko_internal_rendered_1 = Marko._.renderTemplate(
    __marko_internal_tag_1,
  )()()({
    value: "",
  });
  const x = __marko_internal_rendered_1.return.value;
  Marko._.renderNativeTag("div")()()({
    onClick() {
      __marko_internal_return.mutate.x = "Hello!";

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
          __marko_internal_return.mutate.x = "Hello!";
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
        __marko_internal_return.mutate.x = "Hello!";
      } catch (x) {
        x = "Hello!";
        console.log(x);
      }

      try {
        __marko_internal_return.mutate.x = "Hello!";
      } catch {
        __marko_internal_return.mutate.x = "Hello!";
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
  const __marko_internal_return = {
    mutate: Marko._.mutable([
      ["x", "value", __marko_internal_rendered_1.return],
    ] as const),
  };
  Marko._.noop({
    x,
  });
  return;
})();
export default new (class Template extends Marko._.Template<{
  render(
    input: Marko.TemplateInput<Input>,
    stream?: {
      write: (chunk: string) => void;
      end: (chunk?: string) => void;
    },
  ): Marko.Out<Component>;

  render(
    input: Marko.TemplateInput<Input>,
    cb?: (err: Error | null, result: Marko.RenderResult<Component>) => void,
  ): Marko.Out<Component>;

  renderSync(input: Marko.TemplateInput<Input>): Marko.RenderResult<Component>;

  renderToString(input: Marko.TemplateInput<Input>): string;

  stream(
    input: Marko.TemplateInput<Input>,
  ): ReadableStream<string> & NodeJS.ReadableStream;

  mount(
    input: Marko.TemplateInput<Input>,
    reference: Node,
    position?: "afterbegin" | "afterend" | "beforebegin" | "beforeend",
  ): Marko.MountedTemplate<typeof input>;

  api: "class";
  _(): () => <__marko_internal_input extends unknown>(
    input: Marko.Directives &
      Input &
      Marko._.Relate<__marko_internal_input, Marko.Directives & Input>,
  ) => Marko._.ReturnWithScope<__marko_internal_input, void>;
}> {})();
