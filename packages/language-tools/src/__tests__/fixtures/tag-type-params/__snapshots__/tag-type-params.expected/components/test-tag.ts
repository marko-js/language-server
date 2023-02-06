export interface Input<T, U> {
  data: T;
  renderBody: Marko.Body<[T], U>;
}
class Component<T, U> extends Marko.Component<Input<T, U>> {}
export { type Component };
export default Marko.ᜭ.instance(
  class extends Marko.Template {
    /**
     * @internal
     * Do not use or you will be fired.
     */
    public ᜭ<T, U, ᜭ = unknown>(input: Marko.ᜭ.Relate<Input<T, U>, ᜭ>) {
      return Marko.ᜭ.returnWithScope(input as any as ᜭ, this.#ᜭ<T, U>());
    }
    #ᜭ<T, U>() {
      const input = 1 as unknown as Input<T, U>;
      const component = Marko.ᜭ.instance(Component<T, U>);
      const out = 1 as unknown as Marko.Out;
      const state = Marko.ᜭ.state(component);
      Marko.ᜭ.noop({ input, out, component, state });
      return (function (this: void) {
        const ᜭ = {
          return: Marko.ᜭ.returnTag({
            /*return*/
            value: 1 as unknown as U,
          }),
        };
        return ᜭ.return;
      })();
    }
  }
);
