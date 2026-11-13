export interface Input {}
abstract class Component extends Marko.Component<Input> {}
export { type Component };
(function (this: void) {
  const input = Marko._.any as Input;
  const component = Marko._.any as Component;
  const state = Marko._.state(component);
  const out = Marko._.any as Marko.Out;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.getGlobal(
    // @ts-expect-error We expect the compiler to error because we are checking if the MarkoRun.Context is defined.
    (Marko._.error, Marko._.any as MarkoRun.Context),
  );
  Marko._.renderNativeTag("p")()()({
    id: "fail1",
    style: "line-height: 1.5 !important;",
    [Marko._.content]: (() => {
      return () => {
        return Marko._.voidReturn;
      };
    })(),
  });
  Marko._.renderNativeTag("p")()()({
    id: "fail2",
    style: "letter-spacing: 100em !important;",
    [Marko._.content]: (() => {
      return () => {
        return Marko._.voidReturn;
      };
    })(),
  });
  Marko._.renderNativeTag("p")()()({
    id: "fail3",
    style: "word-spacing: -.4ch !important;",
    [Marko._.content]: (() => {
      return () => {
        return Marko._.voidReturn;
      };
    })(),
  });
  Marko._.renderNativeTag("p")()()({
    id: "fail4",
    style:
      "word-spacing: 200%; letter-spacing: 50rem !important; line-height: 3;",
    [Marko._.content]: (() => {
      return () => {
        return Marko._.voidReturn;
      };
    })(),
  });
  Marko._.noop({ component, state, out, input, $global, $signal });
  return;
})();
const __marko_internal_api = "class";
export { __marko_internal_api as "~api" };
class Template extends Marko._.Template<Input, void, "class"> {}
export default new Template();
