export interface Input {}
(function (this: void) {
  const input = Marko._.any as Input;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.getGlobal(
    // @ts-expect-error We expect the compiler to error because we are checking if the MarkoRun.Context is defined.
    (Marko._.error, Marko._.any as MarkoRun.Context),
  );
  const a = Marko._.hoist(() => __marko_internal_hoist__a);
  const __marko_internal_tag_1 = Marko._.resolveTemplate(
    import("@marko/runtime-tags/tags/let.d.marko"),
  ).default;
  {
    const a = Marko._.returned(() => __marko_internal_rendered_1);
    const __marko_internal_rendered_1 = Marko._.renderTemplate(
      __marko_internal_tag_1,
    )()()({
      value: { b: 1, bChange(_value: number) {} },
    });
    const __marko_internal_tag_2 = Marko._.resolveTemplate(
      import("./tags/child.marko"),
    ).default;
    Marko._.renderTemplate(__marko_internal_tag_2)()()({
      value: a["b"],
      valueChange:
        a[`${"b"}Change`] &&
        ((
          // @ts-ignore
          _,
        ) => {
          a[`${"b"}Change`](parseInt(_));
        }),
    });
    const __marko_internal_tag_3 = Marko._.resolveTemplate(
      import("./tags/child.marko"),
    ).default;
    Marko._.renderTemplate(__marko_internal_tag_3)()()(
      //      ^?    ^?
      {
        value: a["b"],
        valueChange:
          a[`${"b"}Change`] &&
          ((
            // @ts-ignore
            _,
          ) => {
            a[`${"b"}Change`](Boolean(_));
          }),
      },
    );
    var __marko_internal_hoist__a = a;
  }
  Marko._.noop({ a, input, $global, $signal });
  return;
})();
const __marko_internal_api = "tags";
export { __marko_internal_api as "~api" };
class Template extends Marko._.Template<Input> {}
export default new Template();
//      ^?    ^?
