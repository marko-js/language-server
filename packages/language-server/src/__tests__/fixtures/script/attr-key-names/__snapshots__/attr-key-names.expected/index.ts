export interface Input {}
(function (this: void) {
  const input = Marko._.any as Input;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.getGlobal(
    // @ts-expect-error We expect the compiler to error because we are checking if the MarkoRun.Context is defined.
    (Marko._.error, Marko._.any as MarkoRun.Context),
  );
  const count = Marko._.hoist(() => __marko_internal_hoist__count);
  const __marko_internal_tag_1 = Marko._.resolveTemplate(
    import("@marko/runtime-tags/tags/let.d.marko"),
  ).default;
  {
    const count = Marko._.returned(() => __marko_internal_rendered_1);
    const __marko_internal_rendered_1 = Marko._.renderTemplate(
      __marko_internal_tag_1,
    )()()({
      value: 0,
    });
    const __marko_internal_change__count = Marko._.change(
      "count",
      "value",
      __marko_internal_rendered_1.return,
    );
    const __marko_internal_tag_2 = Marko._.resolveTemplate(
      import("./components/key-tag.marko"),
    ).default;
    Marko._.attrTagNames(__marko_internal_tag_2, (input) => {
      input["@my-item"];
      input["@item"];
    });
    Marko._.renderTemplate(__marko_internal_tag_2)()()({
      "aria-label": "Hi",
      class: "a",
      for: "b",
      default: 1,
      value: count,
      valueChange(
        // @ts-ignore
        _count,
      ) {
        __marko_internal_change__count.count = _count;
      },
      "data-count": 2,
      //       ^?              ^?        ^?      ^?        ^?           ^?
      "my-item": {
        label: "x",
        [Symbol.iterator]: Marko._.any,
      },
      //  ^?
      item: {
        label: "y",
        [Symbol.iterator]: Marko._.any,
      },
    });
    const __marko_internal_tag_3 = Marko._.resolveTemplate(
      import("./components/key-tag.marko"),
    ).default;
    Marko._.renderTemplate(__marko_internal_tag_3)()()({
      "bogus-key": 1,
    });
    const __marko_internal_tag_4 = Marko._.resolveTemplate(
      import("./components/key-tag.marko"),
    ).default;
    Marko._.renderTemplate(__marko_internal_tag_4)()()({
      bogus: 1,
    });
    const __marko_internal_tag_5 = Marko._.resolveTemplate(
      import("./components/key-tag.marko"),
    ).default;
    Marko._.renderTemplate(__marko_internal_tag_5)()()({
      default: "x",
    });
    const __marko_internal_tag_6 = Marko._.resolveTemplate(
      import("./components/key-tag.marko"),
    ).default;
    Marko._.attrTagNames(__marko_internal_tag_6, (input) => {
      input["@itme"];
    });
    Marko._.renderTemplate(__marko_internal_tag_6)()()({
      itme: {
        label: "z",
        [Symbol.iterator]: Marko._.any,
      },
    });
    const __marko_internal_tag_7 = Marko._.resolveTemplate(
      import("./components/key-tag.marko"),
    ).default;
    Marko._.attrTagNames(__marko_internal_tag_7, (input) => {
      input["@my-itme"];
    });
    Marko._.renderTemplate(__marko_internal_tag_7)()()({
      "my-itme": {
        label: "z",
        [Symbol.iterator]: Marko._.any,
      },
    });
    var __marko_internal_hoist__count = count;
  }
  Marko._.noop({ count, input, $global, $signal });
  return;
})();
const __marko_internal_api = "tags";
export { __marko_internal_api as "~api" };
class Template extends Marko._.Template<Input> {}
export default new Template();
