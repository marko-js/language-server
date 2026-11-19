export interface Input<
  FirstName extends string,
  LastName extends string,
  Extra,
> {
  firstName: FirstName;
  lastName: LastName;
  fullName: `${FirstName} ${LastName}`;
}
export type Component<
  FirstName extends string,
  LastName extends string,
  Extra,
> = Marko.Component<Input<FirstName, LastName, Extra>>;
const Input = Marko._.templateOf(
  <FirstName extends string, LastName extends string, Extra>(
    input: Input<FirstName, LastName, Extra>,
  ) => {
    const component = Marko._.any as Component<FirstName, LastName, Extra>;
    const state = Marko._.state(component);
    const out = Marko._.any as Marko.Out;
    const $signal = Marko._.any as AbortSignal;
    const $global = Marko._.any as Marko.Global;
    [input.fullName];
    Marko._.noop({ component, state, out, input, $global, $signal });
  },
  Marko.Component,
);
export default Input;
//         ^?
