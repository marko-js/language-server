export interface Input {}
class Component extends Marko.Component<Input> {
  declare state: {
    name: string;
  };
  onMount() {
    this.state.name;
  }
}
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
        state.name;
        return;
      })();
    }
  }
);
