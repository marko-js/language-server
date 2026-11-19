export interface Input {}
export default Marko._.template((input: Input) => {
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  const searchInput = Marko._.hoist(() => __marko_internal_hoist__searchInput);
  const __marko_internal_rendered_1 = Marko._.renderNativeTagWithScope("div")({
    [Marko._.content]: (() => {
      const __marko_internal_rendered_2 = Marko._.renderNativeTagWithScope(
        "div",
      )({
        onClick() {
          searchInput().focus();
          // ^?
        },
        [Marko._.content]: (() => {
          {
            const searchInput = Marko._.el("input");
            Marko._.renderNativeTag("input")({
              type: "search",
            });
            return () => {
              return new (class MarkoReturn<Return = void> {
                readonly [Marko._.scope] = { searchInput };
                declare return: Return;
                constructor(_?: Return) {}
              })();
            };
          }
        })(),
      });
      return () => {
        return new (class MarkoReturn<Return = void> {
          readonly [Marko._.scope] = Marko._.readScope(
            __marko_internal_rendered_2,
          );
          declare return: Return;
          constructor(_?: Return) {}
        })();
      };
    })(),
  });
  var { searchInput: __marko_internal_hoist__searchInput } = Marko._.hoisted(
    Marko._.readScope(__marko_internal_rendered_1),
  );
  Marko._.noop({ searchInput, input, $global, $signal });
});
