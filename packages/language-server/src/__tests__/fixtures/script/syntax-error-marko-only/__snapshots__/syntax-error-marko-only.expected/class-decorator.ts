function logged(_method: unknown, _context: ClassMethodDecoratorContext) {}
export interface Input {}
class Component extends Marko.Component<Input> {
  @logged
  handleClick() {}
}
export { type Component };
export default Marko._.template((input: Input) => {
  const component = Marko._.any as Component;
  const state = Marko._.state(component);
  const out = Marko._.any as Marko.Out;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  Marko._.renderNativeTag("button")({
    onClick: component.handleClick,
    [Marko._.content]: Marko._.voidBody,
  });
  Marko._.noop({ component, state, out, input, $global, $signal });
}, Component);
