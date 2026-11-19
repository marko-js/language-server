import Greeting from "pkg/greeting.marko";
import Legacy from "pkg/legacy.marko";
import List from "pkg/list.marko";
import Panel from "pkg/panel.marko";
import OwnTyped from "./components/own-typed.marko";
import OwnEmitted from "./components/own-emitted.marko";
export interface Input {}
export default Marko._.template((input: Input) => {
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  const greeted = Marko._.hoist(() => __marko_internal_hoist__greeted);
  const first = Marko._.hoist(() => __marko_internal_hoist__first);
  const __marko_internal_tag_1 = Greeting;
  {
    const greeted = Marko._.returned(() => __marko_internal_rendered_1);
    const __marko_internal_rendered_1 = Marko._.renderDynamicTag(
      __marko_internal_tag_1,
    )(
      // A template is typed by the declaration beside it: `x.d.marko.ts`, or a
      // legacy `x.d.marko`.
      {
        name: "Ann",
      },
    );
    const __marko_internal_tag_2 = Greeting;
    Marko._.renderDynamicTag(__marko_internal_tag_2)(
      //        ^?      ^?
      {
        name: 1,
      },
    );
    const __marko_internal_tag_3 = List;
    {
      const first = Marko._.returned(() => __marko_internal_rendered_3);
      const __marko_internal_rendered_3 = Marko._.renderDynamicTag(
        __marko_internal_tag_3,
      )({
        items: [1, 2],
      });
      const __marko_internal_tag_4 = Legacy;
      Marko._.renderDynamicTag(__marko_internal_tag_4)(
        //    ^?
        {
          count: 1,
        },
      );
      Marko._.renderNativeTag("div")(
        //      ^?
        {
          [Marko._.content]: (() => {
            [greeted.toUpperCase()];
            [first.toFixed()];
            return Marko._.voidBody;
          })(),
        },
      );
      const __marko_internal_tag_5 = Panel;
      Marko._.renderDynamicTag(__marko_internal_tag_5)(
        // A declaration of a Class API template has its `Component`, as `mtc` writes
        // it: its body is its `renderBody`.
        {
          [Marko._.contentFor(__marko_internal_tag_5)]: Marko._.voidBody,
        },
      );
      const __marko_internal_tag_6 = OwnTyped;
      Marko._.renderDynamicTag(__marko_internal_tag_6)(
        // A legacy `x.d.marko` stands in for a template wherever it is, a project's
        // own too.
        {
          name: "Ann",
          title: "Hi",
        },
      );
      const __marko_internal_tag_7 = OwnEmitted;
      Marko._.renderDynamicTag(__marko_internal_tag_7)(
        //                   ^?
        // A project's own template is read from its source, whatever `x.d.marko.ts`
        // was emitted beside it (here a stale one requiring `stale`).
        {
          name: "Ann",
        },
      );
      var __marko_internal_hoist__greeted = greeted;
      var __marko_internal_hoist__first = first;
    }
  }
  Marko._.noop({ greeted, first, input, $global, $signal });
});
