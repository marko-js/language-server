export interface Input<
  FirstName extends string,
  LastName extends string,
  Extra
> {
  firstName: FirstName;
  lastName: LastName;
  fullName: `${FirstName} ${LastName}`;
}
abstract class Component<
  FirstName extends string,
  LastName extends string,
  Extra
> extends Marko.Component<Input<FirstName, LastName, Extra>> {}
export { type Component };
function __marko_internal_template<
  FirstName extends string,
  LastName extends string,
  Extra
>(this: void) {
  const input = 1 as any as Input<FirstName, LastName, Extra>;
  const component = 1 as any as Component<FirstName, LastName, Extra>;
  const out = Marko._.out;
  const state = Marko._.state(component);
  Marko._.noop({ input, out, component, state });
  input.fullName;
  return;
}
export default new (class Template extends Marko._.Template<{
  render<FirstName extends string, LastName extends string, Extra>(
    input: Marko.TemplateInput<Input<FirstName, LastName, Extra>>,
    stream?: {
      write: (chunk: string) => void;
      end: (chunk?: string) => void;
    }
  ): Marko.Out<Component<FirstName, LastName, Extra>>;

  renderSync<FirstName extends string, LastName extends string, Extra>(
    input: Marko.TemplateInput<Input<FirstName, LastName, Extra>>
  ): Marko.RenderResult<Component<FirstName, LastName, Extra>>;

  renderToString<FirstName extends string, LastName extends string, Extra>(
    input: Marko.TemplateInput<Input<FirstName, LastName, Extra>>
  ): string;

  stream<FirstName extends string, LastName extends string, Extra>(
    input: Marko.TemplateInput<Input<FirstName, LastName, Extra>>
  ): ReadableStream<string> & NodeJS.ReadableStream;

  _<__marko_internal_apply>(): __marko_internal_apply extends 0
    ? <FirstName extends string, LastName extends string, Extra>() => <
        __marko_internal_input
      >(
        input: Marko._.Matches<
          Input<FirstName, LastName, Extra>,
          __marko_internal_input
        >
      ) => Marko._.ReturnWithScope<
        __marko_internal_input,
        ReturnType<typeof __marko_internal_template<FirstName, LastName, Extra>>
      >
    : () => <
        __marko_internal_input,
        FirstName extends string,
        LastName extends string,
        Extra
      >(
        input: Marko._.Matches<
          Input<FirstName, LastName, Extra>,
          __marko_internal_input
        >
      ) => Marko._.ReturnWithScope<
        __marko_internal_input,
        ReturnType<typeof __marko_internal_template<FirstName, LastName, Extra>>
      >;
}> {})();
