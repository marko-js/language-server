export type Input = Record<string, never>;
function ˍ(input: Input) {
  const out = 1 as unknown as Marko.Out;
  const component = 1 as unknown as ட;
  const state = 1 as unknown as typeof component extends {
    state: infer State extends object;
  }
    ? State
    : never;
  Marko.ட.noop({ input, out, component, state });
  Marko.ட.assertRendered(
    Marko.ட.rendered,
    1,
    ˍ.tags["let"]({
      /*let*/
      value: 1,
    })
  );
  const { value: x } = Marko.ட.rendered.returns[1];
  ˍ.tags["div"]({
    /*div*/
    "data-function"() {
      ᜭ.mutate.x++;
    },
  });
  ˍ.tags["div"]({
    /*div*/
    "data-function"(y = ᜭ.mutate.x++) {
      y;
    },
  });
  ˍ.tags["div"]({
    /*div*/
    "data-function": () => {
      ᜭ.mutate.x++;
    },
  });
  ˍ.tags["div"]({
    /*div*/
    "data-function": (y = ᜭ.mutate.x++) => {
      y;
    },
  });
  ˍ.tags["div"]({
    /*div*/
    "data-function": function () {
      ᜭ.mutate.x++;
    },
  });
  ˍ.tags["div"]({
    /*div*/
    "data-function": function (y = ᜭ.mutate.x++) {
      y;
    },
  });
  ˍ.tags["div"]({
    /*div*/
    "data-function"() {
      function testA() {
        ᜭ.mutate.x++;
      }

      function testB(y = ᜭ.mutate.x++) {
        y;
      }

      class TestC {
        constructor() {
          this.#privateMethodA;
          this.#privateMethodB;
        }
        methodA() {
          ᜭ.mutate.x++;
        }
        methodB(y = ᜭ.mutate.x++) {
          y;
        }
        #privateMethodA() {
          ᜭ.mutate.x++;
        }
        #privateMethodB(y = ᜭ.mutate.x++) {
          y;
        }
      }

      testA;
      testB;
      TestC;
    },
  });
  const ᜭ = {
    mutate: Marko.ட.mutable([
      ["x", "value", Marko.ட.rendered.returns[1]],
    ] as const),
  };
  Marko.ட.noop({ x });
  return;
}
class ட extends Marko.Component<Input> {}
declare namespace ˍ {
  const id: unique symbol;
  const template: Marko.Template<typeof id>;
  const tags: {
    let: Marko.ட.CustomTagRenderer<
      typeof import("../../components/let/index.marko").default
    >;
    div: Marko.ட.NativeTagRenderer<"div">;
  };
}
export default 1 as unknown as typeof ˍ.template;
declare global {
  namespace Marko {
    interface CustomTags {
      [ˍ.id]: CustomTag<Input, ReturnType<typeof ˍ>, ட>;
    }
  }
}
