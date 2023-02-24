export interface Input {}
abstract class Component extends Marko.Component<Input> {}
export { type Component };
(function (this: void) {
  const input = 1 as any as Input;
  const component = 1 as any as Component;
  const out = Marko._.out;
  const state = Marko._.state(component);
  Marko._.noop({ input, out, component, state });
  Marko._.assertRendered(
    Marko._.rendered,
    1,
    Marko._.renderTemplate(import("../../components/let/index.marko"))()()({
      value: 1,
    })
  );
  const x = Marko._.rendered.returns[1].value;
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
      ["x", "value", Marko._.rendered.returns[1]],
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
    }
  ): Marko.Out<Component>;

  renderSync(input: Marko.TemplateInput<Input>): Marko.RenderResult<Component>;

  renderToString(input: Marko.TemplateInput<Input>): string;

  stream(
    input: Marko.TemplateInput<Input>
  ): ReadableStream<string> & NodeJS.ReadableStream;

  _(): () => <__marko_internal_input extends unknown>(
    input: Input & Marko._.Relate<__marko_internal_input, Input>
  ) => Marko._.ReturnWithScope<__marko_internal_input, void>;
}> {})();
