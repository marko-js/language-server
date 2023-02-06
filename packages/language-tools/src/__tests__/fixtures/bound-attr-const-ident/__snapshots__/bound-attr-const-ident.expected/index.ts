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
            value: 1,
          })
        );
        const { value: a } = Marko.ᜭ.rendered.returns[1];
        Marko.ᜭ.assertRendered(
          Marko.ᜭ.rendered,
          2,
          (
            1 as any as Marko.ᜭ.CustomTagRenderer<
              typeof import("../../components/let/index.marko").default
            >
          )({
            /*let*/
            valueChange(_a) {
              ᜭ.mutate.a = a;
            },
            value: a,
          })
        );
        const { value: b } = Marko.ᜭ.rendered.returns[2];
        const ᜭ = {
          mutate: Marko.ᜭ.mutable([
            ["a", "value", Marko.ᜭ.rendered.returns[1]],
          ] as const),
        };
        Marko.ᜭ.noop({ a });
        return;
      })();
    }
  }
);
