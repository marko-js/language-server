export interface Input {}
(function (this: void) {
  const input = Marko._.any as Input;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  const hoistedFromTestTag = Marko._.hoist(
    () => __marko_internal_hoist__hoistedFromTestTag,
  );
  Marko._.renderTemplate(__marko_internal_module_1().default)()()({
    [Marko._.contentFor(__marko_internal_module_1)]: (a, b) => {
      //        ^? ^?
      [a];
      [b];
      return Marko._.voidReturn;
    },
  });
  const __marko_internal_rendered_1 = Marko._.renderTemplate(
    __marko_internal_module_1().default,
  )()()({
    [Marko._.contentFor(__marko_internal_module_1)]: (a) => {
      {
        const hoistedFromTestTag = Marko._.returned(
          () => __marko_internal_rendered_2,
        );
        const __marko_internal_rendered_2 = Marko._.renderTemplate(
          __marko_internal_module_2().default,
        )()()(
          //        ^?
          {
            value: () => a,
          },
        );
        return new (class MarkoReturn<Return = void> {
          readonly [Marko._.scope] = { hoistedFromTestTag };
          declare return: Return;
          constructor(_?: Return) {}
        })();
      }
    },
  });
  [
    () => {
      hoistedFromTestTag;
      //^?
    },
  ];
  var { hoistedFromTestTag: __marko_internal_hoist__hoistedFromTestTag } =
    Marko._.hoisted(Marko._.readScope(__marko_internal_rendered_1));
  Marko._.noop({ hoistedFromTestTag, input, $global, $signal });
  return;
})();
const __marko_internal_api = "tags";
export { __marko_internal_api as "~api" };
class Template extends Marko._.Template<Input> {}
export default new Template();
declare function __marko_internal_module_1(): typeof import("./components/test-tag.marko");
declare function __marko_internal_module_2(): typeof import("@marko/runtime-tags/tags/const.d.marko");
