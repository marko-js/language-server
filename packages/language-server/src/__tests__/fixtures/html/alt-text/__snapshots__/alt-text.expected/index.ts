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
  Marko._.renderNativeTag("map")()()({
    name: "Map",
    [Marko._.content]: (() => {
      Marko._.renderNativeTag("area")()()({
        shape: "rect",
        href: "image-map",
      });
      return () => {
        return Marko._.voidReturn;
      };
    })(),
  });
  Marko._.renderNativeTag("img")()()({
    src: "source",
  });
  Marko._.renderNativeTag("a")()()({
    href: "ebay.com",
    [Marko._.content]: (() => {
      Marko._.renderNativeTag("img")()()({
        src: "ebay-logo.png",
        alt: "eBay",
      });
      return () => {
        return Marko._.voidReturn;
      };
    })(),
  });
  Marko._.renderNativeTag("input")()()({
    type: "image",
  });
  Marko._.renderNativeTag("object")()()({
    id: "object",
    [Marko._.content]: (() => {
      return () => {
        return Marko._.voidReturn;
      };
    })(),
  });
  Marko._.renderNativeTag("div")()()({
    role: "img",
    [Marko._.content]: (() => {
      return () => {
        return Marko._.voidReturn;
      };
    })(),
  });
  Marko._.renderNativeTag("svg")()()({
    role: "img",
    [Marko._.content]: (() => {
      return () => {
        return Marko._.voidReturn;
      };
    })(),
  });
  Marko._.renderNativeTag("img")()()({
    alt: "test",
  });
  Marko._.noop({ component, state, out, input, $global, $signal });
  return;
})();
const __marko_internal_api = "class";
export { __marko_internal_api as "~api" };
class Template extends Marko._.Template<Input, void, "class"> {}
export default new Template();
