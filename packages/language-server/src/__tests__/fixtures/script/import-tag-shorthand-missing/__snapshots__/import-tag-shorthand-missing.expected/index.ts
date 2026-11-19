import Template from "<missing-tag>";
export interface Input {}
export type Component = Marko.Component<Input>;
export default Marko._.template((input: Input) => {
  const component = Marko._.any as Component;
  const state = Marko._.state(component);
  const out = Marko._.any as Marko.Out;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  const __marko_internal_tag_1 = Template;
  Marko._.renderDynamicTag(__marko_internal_tag_1)({});
  Marko._.noop({ component, state, out, input, $global, $signal });
}, Marko.Component);
