export interface Input {}
abstract class Component extends Marko.Component<Input> {}
export { type Component }
function __marko_internal_template(this: void) {
  const input = 1 as any as Input;
  const component = 1 as any as Component;
  const out = Marko._.out;
  const state = Marko._.state(component);
  Marko._.noop({ input, out, component, state });
Marko._.renderDynamicTag(custom)({
/*custom*/
[/*custom*/
"renderBody"]: Marko._.body(function *(
a, %b
) {
return;

})
});
return;

}
export default new (
  class Template extends Marko._.Template<{
    
    render(
      input: Marko.TemplateInput<Input>,
      stream?: {
        write: (chunk: string) => void;
        end: (chunk?: string) => void;
      }
    ): Marko.Out<Component>;

    
    renderSync(
      input: Marko.TemplateInput<Input>
    ): Marko.RenderResult<Component>;

    
    renderToString(input: Marko.TemplateInput<Input>): string;

    
    stream(
      input: Marko.TemplateInput<Input>
    ): ReadableStream<string> & NodeJS.ReadableStream;
    
  _<
    __marko_internal_input = unknown
  >(input: Marko._.Relate<Input, __marko_internal_input>): (
    Marko._.ReturnWithScope<__marko_internal_input, ReturnType<typeof __marko_internal_template>>
  );
}> {}
);