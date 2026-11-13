export interface Input {}
(function (this: void) {
  const input = Marko._.any as Input;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.getGlobal(
    // @ts-expect-error We expect the compiler to error because we are checking if the MarkoRun.Context is defined.
    (Marko._.error, Marko._.any as MarkoRun.Context),
  );
  const styles = Marko._.hoist(() => __marko_internal_hoist__styles);
  {
    const styles = Marko._.any as { button: string; main: string };
    Marko._.renderNativeTag("style")()()({
      [Marko._.content]: (() => {
        return () => {
          return Marko._.voidReturn;
        };
      })(),
    });
    Marko._.renderNativeTag("main")()()({
      id: styles.main,
      class: styles.button,
    });
    Marko._.renderNativeTag("div")()()(
      //                                ^?
      {
        class: styles.missing,
      },
    );
    var __marko_internal_hoist__styles = styles;
  }
  Marko._.noop({ styles, input, $global, $signal });
  return;
})();
const __marko_internal_api = "tags";
export { __marko_internal_api as "~api" };
class Template extends Marko._.Template<Input> {}
export default new Template();
