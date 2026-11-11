export interface Input<
  FirstName extends string,
  LastName extends string,
  Extra,
> {
  firstName: FirstName;
  lastName: LastName;
  fullName: `${FirstName} ${LastName}`;
}
abstract class Component<
  FirstName extends string,
  LastName extends string,
  Extra,
> extends Marko.Component<Input<FirstName, LastName, Extra>> {}
export { type Component };
(function <FirstName extends string, LastName extends string, Extra>(
  this: void,
) {
  const input = Marko._.any as Input<FirstName, LastName, Extra>;
  const component = Marko._.any as Component<FirstName, LastName, Extra>;
  const state = Marko._.state(component);
  const out = Marko._.any as Marko.Out;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.getGlobal(
    // @ts-expect-error We expect the compiler to error because we are checking if the MarkoRun.Context is defined.
    (Marko._.error, Marko._.any as MarkoRun.Context),
  );
  input.fullName;
  Marko._.noop({ component, state, out, input, $global, $signal });
  return;
})();
const __marko_internal_api = "class";
export { __marko_internal_api as "~api" };
const Input = new (class Template extends Marko._.Template<{
  render<FirstName extends string, LastName extends string, Extra>(
    input: Marko.TemplateInput<Input<FirstName, LastName, Extra>>,
    stream?: {
      write: (chunk: string) => void;
      end: (chunk?: string) => void;
    },
  ): Marko.Out<Component<FirstName, LastName, Extra>>;

  render<FirstName extends string, LastName extends string, Extra>(
    input: Marko.TemplateInput<Input<FirstName, LastName, Extra>>,
    cb?: (
      err: Error | null,
      result: Marko.RenderResult<Component<FirstName, LastName, Extra>>,
    ) => void,
  ): Marko.Out<Component<FirstName, LastName, Extra>>;

  renderSync<FirstName extends string, LastName extends string, Extra>(
    input: Marko.TemplateInput<Input<FirstName, LastName, Extra>>,
  ): Marko.RenderResult<Component<FirstName, LastName, Extra>>;

  renderToString<FirstName extends string, LastName extends string, Extra>(
    input: Marko.TemplateInput<Input<FirstName, LastName, Extra>>,
  ): string;

  stream<FirstName extends string, LastName extends string, Extra>(
    input: Marko.TemplateInput<Input<FirstName, LastName, Extra>>,
  ): ReadableStream<string> & NodeJS.ReadableStream;

  mount<FirstName extends string, LastName extends string, Extra>(
    input: Marko.TemplateInput<Input<FirstName, LastName, Extra>>,
    reference: Node,
    position?: "afterbegin" | "afterend" | "beforebegin" | "beforeend",
  ): Marko.MountedTemplate<typeof input, void>;

  api: typeof __marko_internal_api;
  _<__marko_internal_apply = 1>(
    m?: __marko_internal_apply,
  ): __marko_internal_apply extends 0 | 2
    ? <
        FirstName extends string,
        LastName extends string,
        Extra,
      >() => Marko._.Renderer<
        Input<FirstName, LastName, Extra>,
        void,
        __marko_internal_apply
      >
    : __marko_internal_apply extends 1
      ? () => <
          __marko_internal_input,
          FirstName extends string,
          LastName extends string,
          Extra,
        >(
          input: Marko.Directives &
            Input<FirstName, LastName, Extra> &
            Marko._.Relate<
              __marko_internal_input,
              Marko.Directives & Input<FirstName, LastName, Extra>
            >,
        ) => Marko._.ReturnWithScope<__marko_internal_input, void>
      : () => <
          __marko_internal_input,
          FirstName extends string,
          LastName extends string,
          Extra,
        >(
          input: Marko._.TagInput<
            __marko_internal_input,
            Input<FirstName, LastName, Extra>
          >,
        ) => Marko._.ReturnWithRestAttrTagsScope<__marko_internal_input, void>;
  [Marko._.anyInput]: Input<any, any, any>;
}> {})();
export default Input;
//         ^?
