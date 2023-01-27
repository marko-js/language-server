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
    ˍ.tags["const"]({
      /*const*/
      value: "",
    })
  );
  const { value: x } = Marko.ட.rendered.returns[1];
  ˍ.tags["div"]({
    /*div*/
    onClick() {
      ᜭ.mutate.x = "Hello!";

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
          ᜭ.mutate.x = "Hello!";
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
        ᜭ.mutate.x = "Hello!";
      } catch (x) {
        x = "Hello!";
        console.log(x);
      }

      try {
        ᜭ.mutate.x = "Hello!";
      } catch {
        ᜭ.mutate.x = "Hello!";
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
  const tags: {
    const: Marko.ட.CustomTagRenderer<
      typeof import("../../components/const/index.marko").default
    >;
    div: Marko.ட.NativeTagRenderer<"div">;
  };
}
export default 1 as unknown as Marko.Template<"@language-tools/src/__tests__/fixtures/tag-var-mutation-shadowing/index.marko">;
declare global {
  namespace Marko {
    interface CustomTags {
      "@language-tools/src/__tests__/fixtures/tag-var-mutation-shadowing/index.marko": CustomTag<
        Input,
        ReturnType<typeof ˍ>,
        ட
      >;
    }
  }
}
