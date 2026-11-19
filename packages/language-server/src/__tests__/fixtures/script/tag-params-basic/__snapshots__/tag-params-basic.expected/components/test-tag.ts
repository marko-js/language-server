export interface Input {
  renderBody: Marko.Body<["a", "b"]>;
}
export type Component = Marko.Component<Input>;
(function (this: void) {
  const input = Marko._.any as Input;
  const component = Marko._.any as Component;
  const state = Marko._.state(component);
  const out = Marko._.any as Marko.Out;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  const __marko_internal_tag_1 = input.renderBody;
  Marko._.renderDynamicTag(__marko_internal_tag_1)()()("a", "b");
  const __marko_internal_tag_2 = input.renderBody;
  Marko._.renderDynamicTag(__marko_internal_tag_2)()()("a", "c");
  const __marko_internal_tag_3 = input.renderBody;
  Marko._.renderDynamicTag(__marko_internal_tag_3)()()("a", "b", "c");
  Marko._.noop({ component, state, out, input, $global, $signal });
  return;
})();
const __marko_internal_api = "class";
export { __marko_internal_api as "~api" };
class Template extends Marko._.Template<Input, void, "class"> {}
const Input = new Template();
export default Input;
