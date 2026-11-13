export interface Input {}
(function (this: void) {
  const input = Marko._.any as Input;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.getGlobal(
    // @ts-expect-error We expect the compiler to error because we are checking if the MarkoRun.Context is defined.
    (Marko._.error, Marko._.any as MarkoRun.Context),
  );
  const searchInput = Marko._.hoist(() => __marko_internal_hoist__searchInput);
  const __marko_internal_rendered_1 = Marko._.renderNativeTag("div")()()({
    [Marko._.content]: (() => {
      const __marko_internal_rendered_2 = Marko._.renderNativeTag("div")()()({
        onClick() {
          searchInput().focus();
          // ^?
        },
        [Marko._.content]: (() => {
          {
            const searchInput = Marko._.el("input");
            Marko._.renderNativeTag("input")()()({
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
  return;
})();
const __marko_internal_api = "tags";
export { __marko_internal_api as "~api" };
class Template extends Marko._.Template<Input> {}
export default new Template();
