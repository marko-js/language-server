export interface Input<FirstName extends string, LastName extends string> {
  firstName: FirstName;
  lastName: LastName;
}
abstract class Component<
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
(function <FirstName extends string, LastName extends string>(this: void) {
  const input = 1 as any as Input<FirstName, LastName>;
  const component = 1 as any as Component<FirstName, LastName>;
  const out = Marko._.out;
  const state = Marko._.state(component);
  Marko._.noop({ input, out, component, state });
  state.name;
  return;
})();
export default new (class Template extends Marko._.Template<{
  render<FirstName extends string, LastName extends string>(
    input: Marko.TemplateInput<Input<FirstName, LastName>>,
    stream?: {
      write: (chunk: string) => void;
      end: (chunk?: string) => void;
    }
  ): Marko.Out<Component<FirstName, LastName>>;

  renderSync<FirstName extends string, LastName extends string>(
    input: Marko.TemplateInput<Input<FirstName, LastName>>
  ): Marko.RenderResult<Component<FirstName, LastName>>;

  renderToString<FirstName extends string, LastName extends string>(
    input: Marko.TemplateInput<Input<FirstName, LastName>>
  ): string;

  stream<FirstName extends string, LastName extends string>(
    input: Marko.TemplateInput<Input<FirstName, LastName>>
  ): ReadableStream<string> & NodeJS.ReadableStream;

  _<__marko_internal_apply = 1>(): __marko_internal_apply extends 0
    ? <FirstName extends string, LastName extends string>() => <
        __marko_internal_input extends unknown
      >(
        input: Input<FirstName, LastName> &
          Marko._.Relate<__marko_internal_input, Input<FirstName, LastName>>
      ) => Marko._.ReturnWithScope<__marko_internal_input, void>
    : () => <
        __marko_internal_input extends unknown,
        FirstName extends string,
        LastName extends string
      >(
        input: Input<FirstName, LastName> &
          Marko._.Relate<__marko_internal_input, Input<FirstName, LastName>>
      ) => Marko._.ReturnWithScope<__marko_internal_input, void>;
}> {})();
