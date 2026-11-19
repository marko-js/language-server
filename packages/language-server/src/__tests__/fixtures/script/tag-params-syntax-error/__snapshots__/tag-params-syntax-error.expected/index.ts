export interface Input {}
export type Component = Marko.Component<Input>;
export default Marko._.template((input: Input) => {
  const component = Marko._.any as Component;
  const state = Marko._.state(component);
  const out = Marko._.any as Marko.Out;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
const __marko_internal_tag_1 = (
custom
);
Marko._.renderDynamicTag(__marko_internal_tag_1)({
[Marko._.contentFor(__marko_internal_tag_1)]: ((
a, %b
) => {
return Marko._.voidReturn;
}),
});
Marko._.noop({ component, state, out, input, $global, $signal });
}, Marko.Component);
