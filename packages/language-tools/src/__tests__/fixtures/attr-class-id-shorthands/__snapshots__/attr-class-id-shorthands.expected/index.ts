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
      value: "hi",
    })
  );
  const { value: value } = Marko.ட.rendered.returns[1];
  ˍ.tags["div"]({
    /*div*/
    id: `test`,
  });
  ˍ.tags["div"]({
    /*div*/
    id: `test-${value || ""}`,
  });
  ˍ.tags["div"]({
    /*div*/
    id: `${value || ""}-test`,
  });
  ˍ.tags["div"]({
    /*div*/
    id: `${value || ""}-test-${value || ""}`,
  });
  ˍ.tags["div"]({
    /*div*/
    class: `test`,
  });
  ˍ.tags["div"]({
    /*div*/
    class: `hello world`,
  });
  ˍ.tags["div"]({
    /*div*/
    class: `test-${value || ""}`,
  });
  ˍ.tags["div"]({
    /*div*/
    class: `${value || ""}-test`,
  });
  ˍ.tags["div"]({
    /*div*/
    class: `${value || ""}-test-${value || ""}`,
  });
  ˍ.tags["test-tag"]({
    /*test-tag*/
    id: `test`,
  });
  ˍ.tags["test-tag"]({
    /*test-tag*/
    id: `test-${value || ""}`,
  });
  ˍ.tags["test-tag"]({
    /*test-tag*/
    id: `${value || ""}-test`,
  });
  ˍ.tags["test-tag"]({
    /*test-tag*/
    id: `${value || ""}-test-${value || ""}`,
  });
  ˍ.tags["test-tag"]({
    /*test-tag*/
    class: `test`,
  });
  ˍ.tags["test-tag"]({
    /*test-tag*/
    class: `hello world`,
  });
  ˍ.tags["test-tag"]({
    /*test-tag*/
    class: `test-${value || ""}`,
  });
  ˍ.tags["test-tag"]({
    /*test-tag*/
    class: `${value || ""}-test`,
  });
  ˍ.tags["test-tag"]({
    /*test-tag*/
    class: `${value || ""}-test-${value || ""}`,
  });
  return;
}
class ட extends Marko.Component<Input> {}
declare namespace ˍ {
  const id: "@language-tools/src/__tests__/fixtures/attr-class-id-shorthands/index.marko";
  const template: Marko.Template<typeof id>;
  const tags: {
    const: Marko.ட.CustomTagRenderer<
      typeof import("../../components/const/index.marko").default
    >;
    div: Marko.ட.NativeTagRenderer<"div">;
    "test-tag": Marko.ட.CustomTagRenderer<
      typeof import("./components/test-tag.marko").default
    >;
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
