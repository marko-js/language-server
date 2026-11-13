const x = 1;
const y = 2;
export interface Input {}
(function (this: void) {
  const input = Marko._.any as Input;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.getGlobal(
    // @ts-expect-error We expect the compiler to error because we are checking if the MarkoRun.Context is defined.
    (Marko._.error, Marko._.any as MarkoRun.Context),
  );
  const hoistedFromStaticMember = Marko._.hoist(
    () => __marko_internal_hoist__hoistedFromStaticMember,
  );
  const hoistedFromDynamicMember = Marko._.hoist(
    () => __marko_internal_hoist__hoistedFromDynamicMember,
  );
  const __marko_internal_tag_1 = custom;
  Marko._.attrTagNames(__marko_internal_tag_1, (input) => {
    input["@a"];
  });
  Marko._.renderDynamicTag(__marko_internal_tag_1)(Marko._.withRestAttrTags)()({
    x: 1,
    [Marko._.restAttrTags]: [
      x
        ? {
            a: {
              [Symbol.iterator]: Marko._.any,
            },
          }
        : Marko._.never,
    ],
    ...Marko._.givenAttrTags("a"),
  });
  const __marko_internal_tag_2 = custom;
  Marko._.attrTagNames(__marko_internal_tag_2, (input) => {
    input["@a"];
  });
  Marko._.renderDynamicTag(__marko_internal_tag_2)(Marko._.withRestAttrTags)()({
    x: 1,
    [Marko._.restAttrTags]: [
      x
        ? Marko._.never
        : {
            a: {
              [Symbol.iterator]: Marko._.any,
            },
          },
    ],
    ...Marko._.givenAttrTags("a"),
  });
  const __marko_internal_tag_3 = custom;
  Marko._.attrTagNames(__marko_internal_tag_3, (input) => {
    input["@a"];
    input["@b"];
  });
  Marko._.renderDynamicTag(__marko_internal_tag_3)(Marko._.withRestAttrTags)()({
    x: 1,
    [Marko._.restAttrTags]: [
      x
        ? {
            a: {
              [Symbol.iterator]: Marko._.any,
            },
          }
        : {
            b: {
              [Symbol.iterator]: Marko._.any,
            },
          },
    ],
    ...Marko._.givenAttrTags("a", "b"),
  });
  const __marko_internal_tag_4 = custom;
  Marko._.attrTagNames(__marko_internal_tag_4, (input) => {
    input["@a"];
    input["@b"];
    input["@c"];
    input["@d"];
  });
  Marko._.renderDynamicTag(__marko_internal_tag_4)(Marko._.withRestAttrTags)()({
    x: 1,
    [Marko._.restAttrTags]: [
      x
        ? {
            a: {
              [Symbol.iterator]: Marko._.any,
            },
          }
        : y
          ? {
              b: {
                [Symbol.iterator]: Marko._.any,
              },
            }
          : !y
            ? {
                c: {
                  [Symbol.iterator]: Marko._.any,
                },
              }
            : {
                d: {
                  [Symbol.iterator]: Marko._.any,
                },
              },
    ],
    ...Marko._.givenAttrTags("a", "b", "c", "d"),
  });
  const __marko_internal_tag_5 = custom;
  Marko._.attrTagNames(__marko_internal_tag_5, (input) => {
    input["@a"];
    input["@b"];
  });
  Marko._.renderDynamicTag(__marko_internal_tag_5)(Marko._.withRestAttrTags)()({
    x: 1,
    [Marko._.restAttrTags]: [
      x
        ? {
            a: {
              [Symbol.iterator]: Marko._.any,
            },
          }
        : undefined
          ? {
              b: {
                [Symbol.iterator]: Marko._.any,
              },
            }
          : Marko._.never,
    ],
    ...Marko._.givenAttrTags("a", "b"),
  });
  const __marko_internal_tag_6 = custom;
  Marko._.attrTagNames(__marko_internal_tag_6, (input) => {
    input["@a"];
  });
  Marko._.renderDynamicTag(__marko_internal_tag_6)(Marko._.withRestAttrTags)()({
    x: 1,
    [Marko._.restAttrTags]: [
      x
        ? {
            a: {
              [Symbol.iterator]: Marko._.any,
            },
          }
        : Marko._.never,
    ],
    ...Marko._.givenAttrTags("a"),
  });
  const __marko_internal_tag_7 = custom;
  Marko._.attrTagNames(__marko_internal_tag_7, (input) => {
    input["@a"];
  });
  Marko._.renderDynamicTag(__marko_internal_tag_7)(Marko._.withRestAttrTags)()({
    x: 1,
    [Marko._.restAttrTags]: [
      undefined
        ? {
            a: {
              [Symbol.iterator]: Marko._.any,
            },
          }
        : Marko._.never,
    ],
    ...Marko._.givenAttrTags("a"),
  });
  const __marko_internal_tag_8 = custom;
  Marko._.attrTagNames(__marko_internal_tag_8, (input) => {
    input["@a"];
    input["@b"];
  });
  Marko._.renderDynamicTag(__marko_internal_tag_8)(Marko._.withRestAttrTags)()({
    x: 1,
    [Marko._.restAttrTags]: [
      x
        ? {
            a: {
              [Symbol.iterator]: Marko._.any,
            },
          }
        : Marko._.never,
      y
        ? {
            b: {
              [Symbol.iterator]: Marko._.any,
            },
          }
        : Marko._.never,
    ],
    ...Marko._.givenAttrTags("a", "b"),
  });
  const __marko_internal_tag_9 = custom;
  Marko._.attrTagNames(__marko_internal_tag_9, (input) => {
    input["@a"];
    input["@a"];
    input["@b"];
    input["@b"];
  });
  const __marko_internal_rendered_9 = Marko._.renderDynamicTag(
    __marko_internal_tag_9,
  )(Marko._.withRestAttrTags)()({
    x: 1,
    // hi
    a: {
      b: 1,
      [Marko._.contentFor(__marko_internal_tag_9)]: (() => {
        const __marko_internal_tag_10 = Marko._.resolveTemplate(
          import("@marko/runtime-tags/tags/const.d.marko"),
        ).default;
        {
          const hoistedFromStaticMember = Marko._.returned(
            () => __marko_internal_rendered_10,
          );
          const __marko_internal_rendered_10 = Marko._.renderTemplate(
            __marko_internal_tag_10,
          )()()({
            value: () => 1 as const,
          });
          return () => {
            return new (class MarkoReturn<Return = void> {
              readonly [Marko._.scope] = { hoistedFromStaticMember };
              declare return: Return;
              constructor(_?: Return) {}
            })();
          };
        }
      })(),
      [Symbol.iterator]: Marko._.any,
    },
    b: {
      [Symbol.iterator]: Marko._.any,
    },
    [Marko._.restAttrTags]: [
      x
        ? {
            b: {
              [Marko._.contentFor(__marko_internal_tag_9)]: (() => {
                const __marko_internal_tag_11 = Marko._.resolveTemplate(
                  import("@marko/runtime-tags/tags/const.d.marko"),
                ).default;
                {
                  const hoistedFromDynamicMember = Marko._.returned(
                    () => __marko_internal_rendered_11,
                  );
                  const __marko_internal_rendered_11 = Marko._.renderTemplate(
                    __marko_internal_tag_11,
                  )()()({
                    value: () => 2 as const,
                  });
                  return () => {
                    return new (class MarkoReturn<Return = void> {
                      readonly [Marko._.scope] = { hoistedFromDynamicMember };
                      declare return: Return;
                      constructor(_?: Return) {}
                    })();
                  };
                }
              })(),
              [Symbol.iterator]: Marko._.any,
            },
          }
        : Marko._.never,
      y
        ? {
            a: {
              [Symbol.iterator]: Marko._.any,
            },
          }
        : Marko._.never,
    ],
  });
  const __marko_internal_tag_12 = Marko._.resolveTemplate(
    import("@marko/runtime-tags/tags/effect.d.marko"),
  ).default;
  Marko._.renderTemplate(__marko_internal_tag_12)()()({
    value() {
      hoistedFromStaticMember;
      //^?
      hoistedFromDynamicMember; // TODO: this should be better and include `undefined` as a possible value
      //^?
    },
  });
  var {
    hoistedFromStaticMember: __marko_internal_hoist__hoistedFromStaticMember,
    hoistedFromDynamicMember: __marko_internal_hoist__hoistedFromDynamicMember,
  } = Marko._.hoisted(Marko._.readScope(__marko_internal_rendered_9));
  Marko._.noop({
    hoistedFromStaticMember,
    hoistedFromDynamicMember,
    input,
    $global,
    $signal,
  });
  return;
})();
const __marko_internal_api = "tags";
export { __marko_internal_api as "~api" };
class Template extends Marko._.Template<Input> {}
export default new Template();
