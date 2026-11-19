import styles from "./styles.module.css";
export interface Input {}
export type Component = Marko.Component<Input>;
export default Marko._.template((input: Input) => {
  const component = Marko._.any as Component;
  const state = Marko._.state(component);
  const out = Marko._.any as Marko.Out;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  Marko._.renderNativeTag("main")({
    id: styles.main,
    class: styles.primaryButton,
    [Marko._.content]: (() => {
      Marko._.renderNativeTag("div")(
        //                                ^?
        {
          class: styles.button,
        },
      );
      Marko._.renderNativeTag("span")(
        //                  ^?
        {
          class: styles.label,
        },
      );
      Marko._.renderNativeTag("span")(
        //                   ^?
        {
          class: styles.notDefined,
        },
      );
      return Marko._.voidBody;
    })(),
  });
  Marko._.noop({ component, state, out, input, $global, $signal });
}, Marko.Component);
