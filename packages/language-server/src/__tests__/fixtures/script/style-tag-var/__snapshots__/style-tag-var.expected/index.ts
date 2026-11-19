export interface Input {}
export default Marko._.template((input: Input) => {
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  const styles = Marko._.hoist(() => __marko_internal_hoist__styles);
  {
    const styles = Marko._.any as { button: string; main: string };
    Marko._.renderNativeTag("style")({
      [Marko._.content]: Marko._.voidBody,
    });
    Marko._.renderNativeTag("main")({
      id: styles.main,
      class: styles.button,
    });
    Marko._.renderNativeTag("div")(
      //                                ^?
      {
        class: styles.missing,
      },
    );
    var __marko_internal_hoist__styles = styles;
  }
  Marko._.noop({ styles, input, $global, $signal });
});
