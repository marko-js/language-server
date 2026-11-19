export interface Input {}
export type Component = Marko.Component<Input>;
export default Marko._.template((input: Input) => {
  const component = Marko._.any as Component;
  const state = Marko._.state(component);
  const out = Marko._.any as Marko.Out;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  const flag = Math.random() > 0.5;
  Marko._.attrTagNames(__marko_internal_module_1, (input) => {
    input["@part"];
    input["@part"];
    input["@part"];
  });
  __marko_internal_renderer_1(__marko_internal_module_1().default)({
    part: {
      kind: "circle",
      radius: 1,
      [Symbol.iterator]: Marko._.any,
    },
    [Marko._.restAttrTags]: [
      {
        part: {
          kind: "square",
          side: 2,
          [Symbol.iterator]: Marko._.any,
        },
      },
      {
        part: {
          kind: "square",
          radius: 3,
          [Symbol.iterator]: Marko._.any,
        },
      },
    ],
  });
  Marko._.attrTagNames(__marko_internal_module_1, (input) => {
    input["@part"];
    input["@part"];
    input["@part"];
  });
  __marko_internal_renderer_1(__marko_internal_module_1().default)({
    [Marko._.restAttrTags]: [
      Marko._.forOfAttrTag(
        {
          of: [1, 2],
        },
        (i) =>
          Marko._.attrTags(__marko_internal_module_1)([
            {
              part: {
                kind: "circle",
                radius: i,
                [Symbol.iterator]: Marko._.any,
              },
            },
            {
              part: {
                kind: "square",
                side: i,
                [Symbol.iterator]: Marko._.any,
              },
            },
          ]),
      ),
      flag
        ? {
            part: {
              kind: "circle",
              side: 1,
              [Symbol.iterator]: Marko._.any,
            },
          }
        : Marko._.never,
    ],
    ...Marko._.givenAttrTags("part"),
  });
  Marko._.attrTagNames(__marko_internal_module_2, (input) => {
    input["@a"];
    input["@a"];
  });
  __marko_internal_renderer_2(__marko_internal_module_2().default)(
    // A union input whose members have no key in common: an <if> is accepted, and
    // a wrong value in a <for> is reported at it
    {
      a: {
        x: 1,
        [Symbol.iterator]: Marko._.any,
      },
      [Marko._.restAttrTags]: [
        flag
          ? {
              a: {
                x: 2,
                [Symbol.iterator]: Marko._.any,
              },
            }
          : Marko._.never,
      ],
    },
  );
  Marko._.attrTagNames(__marko_internal_module_2, (input) => {
    input["@a"];
  });
  __marko_internal_renderer_2(__marko_internal_module_2().default)({
    [Marko._.restAttrTags]: [
      Marko._.forOfAttrTag(
        {
          of: [1, 2],
        },
        (i) =>
          Marko._.attrTags(__marko_internal_module_2)([
            {
              a: {
                x: String(i),
                [Symbol.iterator]: Marko._.any,
              },
            },
          ]),
      ),
    ],
    ...Marko._.givenAttrTags("a"),
  });
  Marko._.noop({ component, state, out, input, $global, $signal });
}, Marko.Component);
declare function __marko_internal_module_1(): typeof import("./tags/shape/index.marko");
declare function __marko_internal_module_2(): typeof import("./tags/uni/index.marko");
function __marko_internal_renderer_1(
  template = __marko_internal_module_1().default,
) {
  return Marko._.restAttrTagsRenderer(template._, Marko._.actualInput);
}
function __marko_internal_renderer_2(
  template = __marko_internal_module_2().default,
) {
  return Marko._.restAttrTagsRenderer(template._, Marko._.actualInput);
}
