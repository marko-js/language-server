import Greeting from "pkg/greeting.marko";
import Legacy from "pkg/legacy.marko";
import OwnTyped from "./components/own-typed.marko";
export interface Input {}
(function (this: void) {
  const input = Marko._.any as Input;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.getGlobal(
    // @ts-expect-error We expect the compiler to error because we are checking if the MarkoRun.Context is defined.
    (Marko._.error, Marko._.any as MarkoRun.Context),
  );
  const greeted = Marko._.hoist(() => __marko_internal_hoist__greeted);
  const __marko_internal_tag_1 = Greeting;
  {
    const greeted = Marko._.returned(() => __marko_internal_rendered_1);
    const __marko_internal_rendered_1 = Marko._.renderDynamicTag(
      __marko_internal_tag_1,
    )()()(
      // A template is typed by the declaration beside it: `x.d.marko.ts`, or a
      // legacy `x.d.marko`.
      {
        name: "Ann",
      },
    );
    const __marko_internal_tag_2 = Greeting;
    Marko._.renderDynamicTag(__marko_internal_tag_2)()()(
      //        ^?      ^?
      {
        name: 1,
      },
    );
    const __marko_internal_tag_3 = Legacy;
    Marko._.renderDynamicTag(__marko_internal_tag_3)()()({
      count: 1,
    });
    Marko._.renderNativeTag("div")(
      //      ^?
      {
        [Marko._.content]: (() => {
          [greeted.toUpperCase()];
          return Marko._.voidBody;
        })(),
      },
    );
    const __marko_internal_tag_4 = OwnTyped;
    Marko._.renderDynamicTag(__marko_internal_tag_4)()()(
      // A declaration beside a template stands in for it wherever it is, a
      // project's own too.
      {
        name: "Ann",
        title: "Hi",
      },
    );
    var __marko_internal_hoist__greeted = greeted;
  }
  Marko._.noop({ greeted, input, $global, $signal });
  return;
})();
const __marko_internal_api = "tags";
export { __marko_internal_api as "~api" };
class Template extends Marko._.Template<Input> {}
export default new Template();
//                   ^?
