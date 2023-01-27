import CustomTagA from "./components/TestTagA.marko";
import CustomTagB from "./components/TestTagB.marko";
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
      value: CustomTagA,
    })
  );
  const { value: TestTagA } = Marko.ட.rendered.returns[1];
  Marko.ட.render(
    // @ts-expect-error We expect the compiler to error because we are checking if the tag is defined.
    1 as unknown as MARKO_NOT_DECLARED extends any
      ? 0 extends 1 & typeof TestTagA
        ? typeof ˍ.tags["TestTagA"]
        : typeof TestTagA
      : never
  )({
    /*TestTagA*/
    a: "hello",
  });
  Marko.ட.render(
    // @ts-expect-error We expect the compiler to error because we are checking if the tag is defined.
    1 as unknown as MARKO_NOT_DECLARED extends any
      ? 0 extends 1 & typeof TestTagB
        ? typeof ˍ.tags["TestTagB"]
        : typeof TestTagB
      : never
  )({
    /*TestTagB*/
    b: "hello",
  });
  ˍ.tags["div"]({
    /*div*/
    /*div*/
    ["renderBody"]: Marko.ட.inlineBody(
      (() => {
        Marko.ட.assertRendered(
          Marko.ட.rendered,
          2,
          ˍ.tags["const"]({
            /*const*/
            value: CustomTagB,
          })
        );
        const { value: TestTagA } = Marko.ட.rendered.returns[2];
        Marko.ட.render(
          // @ts-expect-error We expect the compiler to error because we are checking if the tag is defined.
          1 as unknown as MARKO_NOT_DECLARED extends any
            ? 0 extends 1 & typeof TestTagA
              ? typeof ˍ.tags["TestTagA"]
              : typeof TestTagA
            : never
        )({
          /*TestTagA*/
          a: "hello",
        });
      })()
    ),
  });
  Marko.ட.render(
    // @ts-expect-error We expect the compiler to error because we are checking if the tag is defined.
    1 as unknown as MARKO_NOT_DECLARED extends any
      ? 0 extends 1 & typeof TestTagA
        ? typeof ˍ.tags["TestTagA"]
        : typeof TestTagA
      : never
  )({
    /*TestTagA*/
    a: "hello",
  });
  return;
}
class ட extends Marko.Component<Input> {}

declare namespace ˍ {
  const tags: {
    const: Marko.ட.CustomTagRenderer<
      typeof import("../../components/const/index.marko").default
    >;
    TestTagA: Marko.ட.CustomTagRenderer<
      typeof import("./components/TestTagA.marko").default
    >;
    TestTagB: Marko.ட.CustomTagRenderer<
      typeof import("./components/TestTagB.marko").default
    >;
    div: Marko.ட.NativeTagRenderer<"div">;
  };
}
export default 1 as unknown as Marko.Template<"@language-tools/src/__tests__/fixtures/prefer-local-identifier-tag-name/index.marko">;
declare global {
  namespace Marko {
    interface CustomTags {
      "@language-tools/src/__tests__/fixtures/prefer-local-identifier-tag-name/index.marko": CustomTag<
        Input,
        ReturnType<typeof ˍ>,
        ட
      >;
    }
  }
}
