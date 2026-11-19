export interface Input<FirstName extends string, LastName extends string> {
  firstName: FirstName;
  lastName: LastName;
}
class Component<
  FirstName extends string,
  LastName extends string,
> extends Marko.Component<Input<FirstName, LastName>> {
  declare state: {
    name: `${FirstName} ${LastName}`;
    //  ^?
  };
  onCreate(input: Input<FirstName, LastName>) {
    this.state = { name: `${input.firstName} ${input.lastName}` };
    //                                ^?                 ^?
  }
  onMount() {
    this.state.name;
    //             ^?
  }
}
export { type Component };
const Input = Marko._.templateOf(
  <FirstName extends string, LastName extends string>(
    input: Input<FirstName, LastName>,
  ) => {
    const component = Marko._.any as Component<FirstName, LastName>;
    const state = Marko._.state(component);
    const out = Marko._.any as Marko.Out;
    const $signal = Marko._.any as AbortSignal;
    const $global = Marko._.any as Marko.Global;
    [state.name];
    Marko._.noop({ component, state, out, input, $global, $signal });
  },
  Component,
);
export default Input;
//         ^?
