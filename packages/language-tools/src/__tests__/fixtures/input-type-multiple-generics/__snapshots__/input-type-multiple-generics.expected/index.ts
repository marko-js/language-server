export interface Input<
  FirstName extends string,
  LastName extends string,
  Extra
> {
  firstName: FirstName;
  lastName: LastName;
  fullName: `${FirstName} ${LastName}`;
}
class Component<
  FirstName extends string,
  LastName extends string,
  Extra
> extends Marko.Component<Input<FirstName, LastName, Extra>> {}
export { type Component };
export default Marko.ᜭ.instance(
  class extends Marko.Template {
    /**
     * @internal
     * Do not use or you will be fired.
     */
    public ᜭ<
      FirstName extends string,
      LastName extends string,
      Extra,
      ᜭ = unknown
    >(input: Marko.ᜭ.Relate<Input<FirstName, LastName, Extra>, ᜭ>) {
      return Marko.ᜭ.returnWithScope(
        input as any as ᜭ,
        this.#ᜭ<FirstName, LastName, Extra>()
      );
    }
    #ᜭ<FirstName extends string, LastName extends string, Extra>() {
      const input = 1 as unknown as Input<FirstName, LastName, Extra>;
      const component = Marko.ᜭ.instance(Component<FirstName, LastName, Extra>);
      const out = 1 as unknown as Marko.Out;
      const state = Marko.ᜭ.state(component);
      Marko.ᜭ.noop({ input, out, component, state });
      return (function (this: void) {
        input.fullName;
        return;
      })();
    }
  }
);
