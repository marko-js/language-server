import Child from "./components/child.marko";
/** @typedef {Record<string, unknown>} Input */
/**
 * @extends {Marko.Component<Input>}
 */
export class Component extends Marko.Component {}
export default Marko._.template(
  /**
   * @param {Input} input
   */
  (input) => {
    const component = /** @type {Component} */ (Marko._.any);
    const state = Marko._.state(component);
    const out = /** @type {Marko.Out} */ (Marko._.any);
    const $signal = /** @type {AbortSignal} */ (Marko._.any);
    const $global = /** @type {Marko.Global} */ (Marko._.any);
    Marko._.attrTagNames(__marko_internal_module_1, (input) => {
      input["@foo"];
      input["@foo"];
    });
    __marko_internal_renderer_1(__marko_internal_module_1().default)({
      foo: {
        bar: true,
        [Symbol.iterator]: Marko._.any,
      },
      [Marko._.restAttrTags]: [
        {
          foo: {
            [Marko._.contentFor(__marko_internal_module_1)]: (data) => {
              [data];
              return Marko._.voidReturn;
            },
            [Symbol.iterator]: Marko._.any,
          },
        },
      ],
    });
    const __marko_internal_tag_1 = Child;
    Marko._.attrTagNames(__marko_internal_tag_1, (input) => {
      input["@foo"];
      input["@foo"];
    });
    Marko._.renderDynamicTagWithRestAttrTags(
      __marko_internal_tag_1,
      Marko._.signature(__marko_internal_tag_1),
      Marko._.actualInput,
    )({
      foo: {
        bar: true,
        [Symbol.iterator]: Marko._.any,
      },
      [Marko._.restAttrTags]: [
        {
          foo: {
            [Marko._.contentFor(__marko_internal_tag_1, "foo")]: (data) => {
              [data];
              return Marko._.voidReturn;
            },
            [Symbol.iterator]: Marko._.any,
          },
        },
      ],
    });
    const __marko_internal_tag_2 = true && Child;
    Marko._.attrTagNames(__marko_internal_tag_2, (input) => {
      input["@foo"];
      input["@foo"];
    });
    Marko._.renderDynamicTagWithRestAttrTags(
      __marko_internal_tag_2,
      Marko._.signature(__marko_internal_tag_2),
      Marko._.actualInput,
    )(
      // This errors for now, because `typeof (some + expression)` is not allowed
      {
        foo: {
          bar: true,
          [Symbol.iterator]: Marko._.any,
        },
        [Marko._.restAttrTags]: [
          {
            foo: {
              [Marko._.contentFor(__marko_internal_tag_2, "foo")]: (data) => {
                [data];
                return Marko._.voidReturn;
              },
              [Symbol.iterator]: Marko._.any,
            },
          },
        ],
      },
    );
    Marko._.attrTagNames(__marko_internal_module_1, (input) => {
      input["@foo"];
    });
    __marko_internal_renderer_1(__marko_internal_module_1().default)(
      // In a <for>: the body param typed (the wrong value is not reported, as nothing
      // is in a JavaScript template)
      {
        [Marko._.restAttrTags]: [
          Marko._.forOfAttrTag(
            {
              of: [1, 2],
            },
            (n) =>
              Marko._.attrTags(__marko_internal_module_1)([
                {
                  foo: {
                    bar: "no",
                    [Marko._.contentFor(__marko_internal_module_1)]: (data) => {
                      [data];
                      return Marko._.voidReturn;
                    },
                    [Symbol.iterator]: Marko._.any,
                  },
                },
              ]),
          ),
        ],
        ...Marko._.givenAttrTags("foo"),
      },
    );
    Marko._.noop({ component, state, out, input, $global, $signal });
  },
  Component,
);
function __marko_internal_module_1() {
  return /** @type {typeof import("./components/child.marko")} */ (Marko._.any);
}
function __marko_internal_renderer_1(
  template = __marko_internal_module_1().default,
) {
  return Marko._.restAttrTagsRenderer(template._, Marko._.actualInput);
}
