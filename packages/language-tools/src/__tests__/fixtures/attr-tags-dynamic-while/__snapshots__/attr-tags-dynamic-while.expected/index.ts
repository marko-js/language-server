export interface Input {}
abstract class Component extends Marko.Component<Input> {}
export { type Component }
function __marko_internal_template(this: void) {
  const input = 1 as any as Input;
  const component = 1 as any as Component;
  const out = Marko._.out;
  const state = Marko._.state(component);
  Marko._.noop({ input, out, component, state });
let i = 0;;
Marko._.renderDynamicTag(custom)({
/*custom*/
...Marko._..mergeAttrTags((
++i < 10
) ? [{
"a": {
/*@a*/
[/*@a*/
"renderBody"]: Marko._.inlineBody((() => {
(i);

})())
}
}] : [])

});
let done = false;;
i = 0;;
Marko._.renderDynamicTag(custom)({
/*custom*/
...Marko._..mergeAttrTags((
!done
) ? [{
"a": {
/*@a*/
[/*@a*/
"renderBody"]: Marko._.inlineBody((() => {
(done);
if (++i === 5) {
done = true;;

}

})())
}
}] : [])

});
Marko._.renderDynamicTag(custom)({
/*custom*/
...Marko._..mergeAttrTags((
undefined
) ? [{
"a": {
/*@a*/
[/*@a*/
"renderBody"]: Marko._.inlineBody((() => {

})())
}
}] : [])

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
