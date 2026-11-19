import Child from "./components/child.marko";
/** @typedef {Record<string, unknown>} Input */
/**
 * @extends {Marko.Component<Input>}
 */
export class Component extends Marko.Component {}
(
  /**
   * @this {void}
   */
  function () {
    const input = /** @type {Input} */ (Marko._.any);
    const component = /** @type {Component} */ (Marko._.any);
    const state = Marko._.state(component);
    const out = /** @type {Marko.Out} */ (Marko._.any);
    const $signal = /** @type {AbortSignal} */ (Marko._.any);
    const $global = /** @type {Marko.Global} */ (Marko._.any);
    Marko._.attrTagNames(__marko_internal_module_1, (input) => {
      input["@foo"];
      input["@foo"];
    });
    Marko._.renderTemplate(__marko_internal_module_1().default)(
      Marko._.withRestAttrTags,
    )()({
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
    Marko._.renderDynamicTag(__marko_internal_tag_1)(
      Marko._.withRestAttrTags,
    )()({
      foo: {
        bar: true,
        [Symbol.iterator]: Marko._.any,
      },
      [Marko._.restAttrTags]: [
        {
          foo: {
            [Marko._.contentFor(__marko_internal_tag_1)]: (data) => {
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
    Marko._.renderDynamicTag(__marko_internal_tag_2)(
      Marko._.withRestAttrTags,
    )()(
      // This errors for now, because `typeof (some + expression)` is not allowed
      {
        foo: {
          bar: true,
          [Symbol.iterator]: Marko._.any,
        },
        [Marko._.restAttrTags]: [
          {
            foo: {
              [Marko._.contentFor(__marko_internal_tag_2)]: (data) => {
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
    Marko._.renderTemplate(__marko_internal_module_1().default)(
      Marko._.withRestAttrTags,
    )()(
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
    return;
  }
)();
const __marko_internal_api = "class";
export { __marko_internal_api as "~api" };
/**
 * @extends { Marko._.Template<Input, void, "class">}
 */
class Template extends Marko._.Template {}
export default new Template();
function __marko_internal_module_1() {
  return /** @type {typeof import("./components/child.marko")} */ (Marko._.any);
}
