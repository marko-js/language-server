export interface Input<FirstName extends string, LastName extends string> {
  firstName: FirstName;
  lastName: LastName;
}
class Component<
  FirstName extends string,
  LastName extends string
> extends Marko.Component<Input<FirstName, LastName>> {
  declare state: {
    name: `${FirstName} ${LastName}`;
  };
  onCreate(input: Input<FirstName, LastName>) {
    this.state = { name: `${input.firstName} ${input.lastName}` };
  }
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
    public ᜭ<FirstName extends string, LastName extends string, ᜭ = unknown>(
      input: Marko.ᜭ.Relate<Input<FirstName, LastName>, ᜭ>
    ) {
      return Marko.ᜭ.returnWithScope(
        input as any as ᜭ,
        this.#ᜭ<FirstName, LastName>()
      );
    }
    #ᜭ<FirstName extends string, LastName extends string>() {
      const input = 1 as unknown as Input<FirstName, LastName>;
      const component = Marko.ᜭ.instance(Component<FirstName, LastName>);
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
