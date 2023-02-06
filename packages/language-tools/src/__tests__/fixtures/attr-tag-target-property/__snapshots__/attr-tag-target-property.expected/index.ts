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
        (
          1 as any as Marko.ᜭ.CustomTagRenderer<
            typeof import("./components/test-tag/index.marko").default
          >
        )({
          /*test-tag*/
          items: [
            {
              /*@item*/
              x: 1,
            },
          ],
        });
        (
          1 as any as Marko.ᜭ.CustomTagRenderer<
            typeof import("./components/test-tag/index.marko").default
          >
        )({
          /*test-tag*/
          items: [
            {
              /*@item*/
              x: 1,
              /*@item*/ ["renderBody"]: Marko.ᜭ.inlineBody((() => {})()),
            },
            {
              /*@item*/
              /*@item*/
              ["renderBody"]: Marko.ᜭ.inlineBody((() => {})()),
            },
          ],
        });
        return;
      })();
    }
  }
);
