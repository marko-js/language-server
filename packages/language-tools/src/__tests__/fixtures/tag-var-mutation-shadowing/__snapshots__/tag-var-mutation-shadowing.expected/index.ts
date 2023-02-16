export interface Input {}
abstract class Component extends Marko.Component<Input> {}
export { type Component };
function __marko_internal_template(this: void) {
  const input = 1 as any as Input;
  const component = 1 as any as Component;
  const out = Marko._.out;
  const state = Marko._.state(component);
  Marko._.noop({ input, out, component, state });
  Marko._.assertRendered(
    Marko._.rendered,
    1,
    Marko._.renderTemplate(import("../../components/const/index.marko"))()()({
      /*const*/
      value: "",
    })
  );
  const x = Marko._.rendered.returns[1].value;
  Marko._.renderNativeTag("div")()()({
    /*div*/
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
      ["x", "value", Marko._.rendered.returns[1]],
    ] as const),
  };
  Marko._.noop({ x });
  return;
}
export default new (class Template extends Marko._.Template<{
  render(
    input: Marko.TemplateInput<Input>,
    stream?: {
      write: (chunk: string) => void;
      end: (chunk?: string) => void;
    }
  ): Marko.Out<Component>;

  renderSync(input: Marko.TemplateInput<Input>): Marko.RenderResult<Component>;

  renderToString(input: Marko.TemplateInput<Input>): string;

  stream(
    input: Marko.TemplateInput<Input>
  ): ReadableStream<string> & NodeJS.ReadableStream;

  _<__marko_internal_apply>(): __marko_internal_apply extends 0
    ? () => <__marko_internal_input>(
        input: Marko._.Matches<Input, __marko_internal_input>
      ) => Marko._.ReturnWithScope<
        __marko_internal_input,
        ReturnType<typeof __marko_internal_template>
      >
    : () => <__marko_internal_input>(
        input: Marko._.Matches<Input, __marko_internal_input>
      ) => Marko._.ReturnWithScope<
        __marko_internal_input,
        ReturnType<typeof __marko_internal_template>
      >;
}> {})();
