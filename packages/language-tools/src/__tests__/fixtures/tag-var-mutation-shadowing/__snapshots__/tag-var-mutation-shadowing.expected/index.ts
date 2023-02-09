import "@marko/language-tools/script.internals";
import "../../lib-fixtures/marko.d.ts";
export interface Input {}
abstract class Component extends Marko.Component<Input> {}
export { type Component };
function ᜭ() {
  const input = 1 as any as Input;
  const component = 1 as any as Component;
  const out = Marko.ᜭ.out;
  const state = Marko.ᜭ.state(component);
  Marko.ᜭ.noop({ input, out, component, state });
  Marko.ᜭ.assertRendered(
    Marko.ᜭ.rendered,
    1,
    Marko.ᜭ.renderTemplate(import("../../components/const/index.marko"))({
      /*const*/
      value: "",
    })
  );
  const { value: x } = Marko.ᜭ.rendered.returns[1];
  Marko.ᜭ.renderNativeTag("div")({
    /*div*/
    onClick() {
      ᜭᜭ.mutate.x = "Hello!";

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
          ᜭᜭ.mutate.x = "Hello!";
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
        ᜭᜭ.mutate.x = "Hello!";
      } catch (x) {
        x = "Hello!";
        console.log(x);
      }

      try {
        ᜭᜭ.mutate.x = "Hello!";
      } catch {
        ᜭᜭ.mutate.x = "Hello!";
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
  const ᜭᜭ = {
    mutate: Marko.ᜭ.mutable([
      ["x", "value", Marko.ᜭ.rendered.returns[1]],
    ] as const),
  };
  Marko.ᜭ.noop({ x });
  return;
}
export default new (class Template extends Marko.ᜭ.Template<{
  /** Asynchronously render the template. */
  render(
    input: Marko.TemplateInput<Input>,
    stream?: {
      write: (chunk: string) => void;
      end: (chunk?: string) => void;
    }
  ): Marko.Out<Component>;

  /** Synchronously render the template. */
  renderSync(input: Marko.TemplateInput<Input>): Marko.RenderResult<Component>;

  /** Synchronously render a template to a string. */
  renderToString(input: Marko.TemplateInput<Input>): string;

  /** Render a template and return a stream.Readable in nodejs or a ReadableStream in a web worker environment. */
  stream(
    input: Marko.TemplateInput<Input>
  ): ReadableStream<string> & NodeJS.ReadableStream;

  /**
   * @internal
   * Do not use or you will be fired.
   */
  ᜭ<ᜭInput = unknown>(
    input: Marko.ᜭ.Relate<Input, ᜭInput>
  ): Marko.ᜭ.ReturnWithScope<ᜭInput, ReturnType<typeof ᜭ>>;
}> {})();
