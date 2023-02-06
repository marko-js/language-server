export interface Input<T extends { name: string }> {
  options: T[];
  onChange: (option: T) => unknown;
}
class Component<T extends { name: string }> extends Marko.Component<Input<T>> {}
export { type Component };
export default Marko.ᜭ.instance(
  class extends Marko.Template {
    /**
     * @internal
     * Do not use or you will be fired.
     */
    public ᜭ<T extends { name: string }, ᜭ = unknown>(
      input: Marko.ᜭ.Relate<Input<T>, ᜭ>
    ) {
      return Marko.ᜭ.returnWithScope(input as any as ᜭ, this.#ᜭ<T>());
    }
    #ᜭ<T extends { name: string }>() {
      const input = 1 as unknown as Input<T>;
      const component = Marko.ᜭ.instance(Component<T>);
      const out = 1 as unknown as Marko.Out;
      const state = Marko.ᜭ.state(component);
      Marko.ᜭ.noop({ input, out, component, state });
      return (function (this: void) {
        input.options;
        input.onChange;
        return;
      })();
    }
  }
);
