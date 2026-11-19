export interface Input {}
export type Component = Marko.Component<Input>;
export default Marko._.template((input: Input) => {
  const component = Marko._.any as Component;
  const state = Marko._.state(component);
  const out = Marko._.any as Marko.Out;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
Marko._.renderNativeTag("div")({
"data-x": #2
,
});
Marko._.renderNativeTag("div")({
"onClick"(a, %b){
  console.log(#hello!);
},
});
Marko._.noop({ component, state, out, input, $global, $signal });
}, Marko.Component);
