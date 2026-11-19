import Greeting from "pkg/greeting.marko";
import Legacy from "pkg/legacy.marko";
import OwnTyped from "./components/own-typed.marko";
import OwnEmitted from "./components/own-emitted.marko";
export interface Input {}
(function (this: void) {
  const input = Marko._.any as Input;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
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
      // A legacy `x.d.marko` stands in for a template wherever it is, a project's
      // own too.
      {
        name: "Ann",
        title: "Hi",
      },
    );
    const __marko_internal_tag_5 = OwnEmitted;
    Marko._.renderDynamicTag(__marko_internal_tag_5)()()(
      //                   ^?
      // A project's own template is read from its source, whatever `x.d.marko.ts`
      // was emitted beside it (here a stale one requiring `stale`).
      {
        name: "Ann",
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
