export interface Input {}
class Component extends Marko.Component<Input> {}
export { type Component };
export default Marko.ᜭ.instance(
  class extends Marko.Template {
    /**
     * @internal
     * Do not use or you will be fired.
     */
    public ᜭ<ᜭ = unknown>(input: Marko.ᜭ.Relate<Input, ᜭ>) {
      return Marko.ᜭ.returnWithScope(input as any as ᜭ, this.#ᜭ());
    }
    #ᜭ() {
      const input = 1 as unknown as Input;
      const component = Marko.ᜭ.instance(Component);
      const out = 1 as unknown as Marko.Out;
      const state = Marko.ᜭ.state(component);
      Marko.ᜭ.noop({ input, out, component, state });
      return (function (this: void) {
        Marko.ᜭ.assertRendered(
          Marko.ᜭ.rendered,
          1,
          (
            1 as any as Marko.ᜭ.CustomTagRenderer<
              typeof import("../../components/const/index.marko").default
            >
          )({
            /*const*/
            value: "hi",
          })
        );
        const { value: value } = Marko.ᜭ.rendered.returns[1];
        (1 as any as Marko.ᜭ.NativeTagRenderer<"div">)({
          /*div*/
          id: `test`,
        });
        (1 as any as Marko.ᜭ.NativeTagRenderer<"div">)({
          /*div*/
          id: `test-${value || ""}`,
        });
        (1 as any as Marko.ᜭ.NativeTagRenderer<"div">)({
          /*div*/
          id: `${value || ""}-test`,
        });
        (1 as any as Marko.ᜭ.NativeTagRenderer<"div">)({
          /*div*/
          id: `${value || ""}-test-${value || ""}`,
        });
        (1 as any as Marko.ᜭ.NativeTagRenderer<"div">)({
          /*div*/
          class: `test`,
        });
        (1 as any as Marko.ᜭ.NativeTagRenderer<"div">)({
          /*div*/
          class: `hello world`,
        });
        (1 as any as Marko.ᜭ.NativeTagRenderer<"div">)({
          /*div*/
          class: `test-${value || ""}`,
        });
        (1 as any as Marko.ᜭ.NativeTagRenderer<"div">)({
          /*div*/
          class: `${value || ""}-test`,
        });
        (1 as any as Marko.ᜭ.NativeTagRenderer<"div">)({
          /*div*/
          class: `${value || ""}-test-${value || ""}`,
        });
        (
          1 as any as Marko.ᜭ.CustomTagRenderer<
            typeof import("./components/test-tag.marko").default
          >
        )({
          /*test-tag*/
          id: `test`,
        });
        (
          1 as any as Marko.ᜭ.CustomTagRenderer<
            typeof import("./components/test-tag.marko").default
          >
        )({
          /*test-tag*/
          id: `test-${value || ""}`,
        });
        (
          1 as any as Marko.ᜭ.CustomTagRenderer<
            typeof import("./components/test-tag.marko").default
          >
        )({
          /*test-tag*/
          id: `${value || ""}-test`,
        });
        (
          1 as any as Marko.ᜭ.CustomTagRenderer<
            typeof import("./components/test-tag.marko").default
          >
        )({
          /*test-tag*/
          id: `${value || ""}-test-${value || ""}`,
        });
        (
          1 as any as Marko.ᜭ.CustomTagRenderer<
            typeof import("./components/test-tag.marko").default
          >
        )({
          /*test-tag*/
          class: `test`,
        });
        (
          1 as any as Marko.ᜭ.CustomTagRenderer<
            typeof import("./components/test-tag.marko").default
          >
        )({
          /*test-tag*/
          class: `hello world`,
        });
        (
          1 as any as Marko.ᜭ.CustomTagRenderer<
            typeof import("./components/test-tag.marko").default
          >
        )({
          /*test-tag*/
          class: `test-${value || ""}`,
        });
        (
          1 as any as Marko.ᜭ.CustomTagRenderer<
            typeof import("./components/test-tag.marko").default
          >
        )({
          /*test-tag*/
          class: `${value || ""}-test`,
        });
        (
          1 as any as Marko.ᜭ.CustomTagRenderer<
            typeof import("./components/test-tag.marko").default
          >
        )({
          /*test-tag*/
          class: `${value || ""}-test-${value || ""}`,
        });
        return;
      })();
    }
  }
);
