export interface Input {}
(function (this: void) {
  const input = Marko._.any as Input;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.getGlobal(
    // @ts-expect-error We expect the compiler to error because we are checking if the MarkoRun.Context is defined.
    (Marko._.error, Marko._.any as MarkoRun.Context),
  );
  const hoistedFromTestTag = Marko._.hoist(
    () => __marko_internal_hoist__hoistedFromTestTag,
  );
  const __marko_internal_tag_1 = Marko._.resolveTemplate(
    import("./components/test-tag.marko"),
  ).default;
  Marko._.renderTemplate(__marko_internal_tag_1)()()({
    [Marko._.contentFor(__marko_internal_tag_1)]: (a, b) => {
      //        ^? ^?
      [a];
      [b];
      return Marko._.voidReturn;
    },
  });
  const __marko_internal_tag_2 = Marko._.resolveTemplate(
    import("./components/test-tag.marko"),
  ).default;
  const __marko_internal_rendered_2 = Marko._.renderTemplate(
    __marko_internal_tag_2,
  )()()({
    [Marko._.contentFor(__marko_internal_tag_2)]: (a) => {
      const __marko_internal_tag_3 = Marko._.resolveTemplate(
        import("@marko/runtime-tags/tags/const.d.marko"),
      ).default;
      {
        const hoistedFromTestTag = Marko._.returned(
          () => __marko_internal_rendered_3,
        );
        const __marko_internal_rendered_3 = Marko._.renderTemplate(
          __marko_internal_tag_3,
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
    Marko._.hoisted(Marko._.readScope(__marko_internal_rendered_2));
  Marko._.noop({ hoistedFromTestTag, input, $global, $signal });
  return;
})();
const __marko_internal_api = "tags";
export { __marko_internal_api as "~api" };
class Template extends Marko._.Template<Input> {}
export default new Template();
