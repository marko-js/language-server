export interface Input<FirstName extends string, LastName extends string> {
  firstName: FirstName;
  lastName: LastName;
}
abstract class Component<
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
(function <FirstName extends string, LastName extends string>(this: void) {
  const input = Marko._.any as Input<FirstName, LastName>;
  const component = Marko._.any as Component<FirstName, LastName>;
  const state = Marko._.state(component);
  const out = Marko._.out;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.getGlobal(
    // @ts-expect-error We expect the compiler to error because we are checking if the MarkoRun.Context is defined.
    (Marko._.error, Marko._.any as MarkoRun.Context),
  );
  state.name;
  Marko._.noop({ component, state, out, input, $global, $signal });
  return;
})();
export default new (class Template extends Marko._.Template<{
  render<FirstName extends string, LastName extends string>(
    input: Marko.TemplateInput<Input<FirstName, LastName>>,
    stream?: {
      write: (chunk: string) => void;
      end: (chunk?: string) => void;
    },
  ): Marko.Out<Component<FirstName, LastName>>;

  render<FirstName extends string, LastName extends string>(
    input: Marko.TemplateInput<Input<FirstName, LastName>>,
    cb?: (
      err: Error | null,
      result: Marko.RenderResult<Component<FirstName, LastName>>,
    ) => void,
  ): Marko.Out<Component<FirstName, LastName>>;

  renderSync<FirstName extends string, LastName extends string>(
    input: Marko.TemplateInput<Input<FirstName, LastName>>,
  ): Marko.RenderResult<Component<FirstName, LastName>>;

  renderToString<FirstName extends string, LastName extends string>(
    input: Marko.TemplateInput<Input<FirstName, LastName>>,
  ): string;

  stream<FirstName extends string, LastName extends string>(
    input: Marko.TemplateInput<Input<FirstName, LastName>>,
  ): ReadableStream<string> & NodeJS.ReadableStream;

  mount<FirstName extends string, LastName extends string>(
    input: Marko.TemplateInput<Input<FirstName, LastName>>,
    reference: Node,
    position?: "afterbegin" | "afterend" | "beforebegin" | "beforeend",
  ): Marko.MountedTemplate<typeof input>;

  api: "class";
  _<__marko_internal_apply = 1>(): __marko_internal_apply extends 0
    ? <FirstName extends string, LastName extends string>() => <
        __marko_internal_input extends unknown,
      >(
        input: Marko.Directives &
          Input<FirstName, LastName> &
          Marko._.Relate<
            __marko_internal_input,
            Marko.Directives & Input<FirstName, LastName>
          >,
      ) => Marko._.ReturnWithScope<__marko_internal_input, void>
    : () => <
        __marko_internal_input extends unknown,
        FirstName extends string,
        LastName extends string,
      >(
        input: Marko.Directives &
          Input<FirstName, LastName> &
          Marko._.Relate<
            __marko_internal_input,
            Marko.Directives & Input<FirstName, LastName>
          >,
      ) => Marko._.ReturnWithScope<__marko_internal_input, void>;
}> {})();
//         ^?
