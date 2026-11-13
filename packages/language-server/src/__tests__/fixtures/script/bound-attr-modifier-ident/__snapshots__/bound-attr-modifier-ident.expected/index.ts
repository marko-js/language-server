export interface Input {}
(function (this: void) {
  const input = Marko._.any as Input;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.getGlobal(
    // @ts-expect-error We expect the compiler to error because we are checking if the MarkoRun.Context is defined.
    (Marko._.error, Marko._.any as MarkoRun.Context),
  );
  const b = Marko._.hoist(() => __marko_internal_hoist__b);
  const __marko_internal_tag_1 = Marko._.resolveTemplate(
    import("@marko/runtime-tags/tags/let.d.marko"),
  ).default;
  {
    const b = Marko._.returned(() => __marko_internal_rendered_1);
    const __marko_internal_rendered_1 = Marko._.renderTemplate(
      __marko_internal_tag_1,
    )()()({
      value: 1,
    });
    const __marko_internal_change__b = Marko._.change(
      "b",
      "value",
      __marko_internal_rendered_1.return,
    );
    const __marko_internal_tag_2 = Marko._.resolveTemplate(
      import("./tags/child.marko"),
    ).default;
    Marko._.renderTemplate(__marko_internal_tag_2)()()(
      //   ^?  ^?
      {
        value: b,
        valueChange(
          // @ts-ignore
          _b,
        ) {
          __marko_internal_change__b.b = parseInt(_b);
        },
      },
    );
    const __marko_internal_tag_3 = Marko._.resolveTemplate(
      import("./tags/child.marko"),
    ).default;
    Marko._.renderTemplate(__marko_internal_tag_3)()()(
      //      ^?    ^?       ^?
      {
        value: b,
        valueChange(
          // @ts-ignore
          _b,
        ) {
          __marko_internal_change__b.b = Boolean(_b);
        },
      },
    );
    var __marko_internal_hoist__b = b;
  }
  Marko._.noop({ b, input, $global, $signal });
  return;
})();
const __marko_internal_api = "tags";
export { __marko_internal_api as "~api" };
class Template extends Marko._.Template<Input> {}
export default new Template();
//      ^?    ^?      ^?
