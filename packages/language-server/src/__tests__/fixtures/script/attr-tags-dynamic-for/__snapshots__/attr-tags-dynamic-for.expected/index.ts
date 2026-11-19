export interface Input {}
(function (this: void) {
  const input = Marko._.any as Input;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  const list = Marko._.hoist(() => __marko_internal_hoist__list);
  const record = Marko._.hoist(() => __marko_internal_hoist__record);
  const hoistedFromForOf = Marko._.hoist(
    () => __marko_internal_hoist__hoistedFromForOf,
  );
  const hoistedFromForIn = Marko._.hoist(
    () => __marko_internal_hoist__hoistedFromForIn,
  );
  const hoistedFromForTo = Marko._.hoist(
    () => __marko_internal_hoist__hoistedFromForTo,
  );
  const __marko_internal_tag_1 = custom;
  Marko._.attrTagNames(__marko_internal_tag_1, (input) => {
    input["@a"];
  });
  Marko._.renderDynamicTag(__marko_internal_tag_1)(Marko._.withRestAttrTags)()({
    [Marko._.restAttrTags]: [
      Marko._.forAttrTag({}, () =>
        Marko._.attrTags(__marko_internal_tag_1)([
          {
            a: {
              [Symbol.iterator]: Marko._.any,
            },
          },
        ]),
      ),
    ],
    ...Marko._.givenAttrTags("a"),
  });
  {
    const list = Marko._.returned(() => __marko_internal_rendered_2);
    const __marko_internal_rendered_2 = Marko._.renderTemplate(
      __marko_internal_module_1().default,
    )()()({
      value: [
        {
          value: 1,
        },
        {
          value: 2,
        },
        {
          value: 3,
        },
      ] as const,
    });
    const __marko_internal_tag_3 = custom;
    Marko._.attrTagNames(__marko_internal_tag_3, (input) => {
      input["@a"];
    });
    Marko._.renderDynamicTag(__marko_internal_tag_3)(
      Marko._.withRestAttrTags,
    )()({
      [Marko._.restAttrTags]: [
        Marko._.forOfAttrTag(
          {
            of: list,
          },
          () =>
            Marko._.attrTags(__marko_internal_tag_3)([
              {
                a: {
                  [Symbol.iterator]: Marko._.any,
                },
              },
            ]),
        ),
      ],
      ...Marko._.givenAttrTags("a"),
    });
    const __marko_internal_tag_4 = custom;
    Marko._.attrTagNames(__marko_internal_tag_4, (input) => {
      input["@a"];
    });
    Marko._.renderDynamicTag(__marko_internal_tag_4)(
      Marko._.withRestAttrTags,
    )()({
      [Marko._.restAttrTags]: [
        Marko._.forOfAttrTag(
          {
            of: list,
          },
          (item, index, all) =>
            Marko._.attrTags(__marko_internal_tag_4)([
              {
                a: {
                  [Marko._.contentFor(__marko_internal_tag_4)]: (() => {
                    [item];
                    [index];
                    [all];
                    return Marko._.voidBody;
                  })(),
                  [Symbol.iterator]: Marko._.any,
                },
              },
            ]),
        ),
      ],
      ...Marko._.givenAttrTags("a"),
    });
    const __marko_internal_tag_5 = custom;
    Marko._.attrTagNames(__marko_internal_tag_5, (input) => {
      input["@a"];
      input["@b"];
    });
    Marko._.renderDynamicTag(__marko_internal_tag_5)(
      Marko._.withRestAttrTags,
    )()({
      [Marko._.restAttrTags]: [
        Marko._.forOfAttrTag(
          {
            of: list,
          },
          (item, index) =>
            Marko._.attrTags(__marko_internal_tag_5)([
              {
                a: {
                  [Marko._.contentFor(__marko_internal_tag_5)]: (() => {
                    [item];
                    return Marko._.voidBody;
                  })(),
                  [Symbol.iterator]: Marko._.any,
                },
                b: {
                  [Marko._.contentFor(__marko_internal_tag_5)]: (() => {
                    [index];
                    return Marko._.voidBody;
                  })(),
                  [Symbol.iterator]: Marko._.any,
                },
              },
            ]),
        ),
      ],
      ...Marko._.givenAttrTags("a", "b"),
    });
    const __marko_internal_tag_6 = custom;
    Marko._.attrTagNames(__marko_internal_tag_6, (input) => {
      input["@a"];
    });
    const __marko_internal_rendered_6 = Marko._.renderDynamicTag(
      __marko_internal_tag_6,
    )(Marko._.withRestAttrTags)()({
      [Marko._.restAttrTags]: [
        Marko._.forOfAttrTag(
          {
            of: list,
          },
          (item) =>
            Marko._.attrTags(__marko_internal_tag_6)([
              {
                a: {
                  [Marko._.contentFor(__marko_internal_tag_6)]: (() => {
                    {
                      const hoistedFromForOf = Marko._.returned(
                        () => __marko_internal_rendered_7,
                      );
                      const __marko_internal_rendered_7 =
                        Marko._.renderTemplate(
                          __marko_internal_module_2().default,
                        )()()({
                          value() {
                            return item.value;
                          },
                        });
                      return () => {
                        return new (class MarkoReturn<Return = void> {
                          readonly [Marko._.scope] = { hoistedFromForOf };
                          declare return: Return;
                          constructor(_?: Return) {}
                        })();
                      };
                    }
                  })(),
                  [Symbol.iterator]: Marko._.any,
                },
              },
            ]),
        ),
      ],
      ...Marko._.givenAttrTags("a"),
    });
    Marko._.renderTemplate(__marko_internal_module_3().default)()()({
      value() {
        hoistedFromForOf;
        //^?
      },
    });
    {
      const record = Marko._.returned(() => __marko_internal_rendered_8);
      const __marko_internal_rendered_8 = Marko._.renderTemplate(
        __marko_internal_module_1().default,
      )()()({
        value: { a: 1, b: 2 } as const,
      });
      const __marko_internal_tag_9 = custom;
      Marko._.attrTagNames(__marko_internal_tag_9, (input) => {
        input["@a"];
      });
      Marko._.renderDynamicTag(__marko_internal_tag_9)(
        Marko._.withRestAttrTags,
      )()({
        [Marko._.restAttrTags]: [
          Marko._.forInAttrTag(
            {
              in: record,
            },
            (key, value) =>
              Marko._.attrTags(__marko_internal_tag_9)([
                {
                  a: {
                    [Marko._.contentFor(__marko_internal_tag_9)]: (() => {
                      [key];
                      [value];
                      return Marko._.voidBody;
                    })(),
                    [Symbol.iterator]: Marko._.any,
                  },
                },
              ]),
          ),
        ],
        ...Marko._.givenAttrTags("a"),
      });
      const __marko_internal_tag_10 = custom;
      Marko._.attrTagNames(__marko_internal_tag_10, (input) => {
        input["@a"];
      });
      const __marko_internal_rendered_10 = Marko._.renderDynamicTag(
        __marko_internal_tag_10,
      )(Marko._.withRestAttrTags)()({
        [Marko._.restAttrTags]: [
          Marko._.forInAttrTag(
            {
              in: record,
            },
            (key) =>
              Marko._.attrTags(__marko_internal_tag_10)([
                {
                  a: {
                    [Marko._.contentFor(__marko_internal_tag_10)]: (() => {
                      {
                        const hoistedFromForIn = Marko._.returned(
                          () => __marko_internal_rendered_11,
                        );
                        const __marko_internal_rendered_11 =
                          Marko._.renderTemplate(
                            __marko_internal_module_2().default,
                          )()()({
                            value() {
                              return key;
                            },
                          });
                        return () => {
                          return new (class MarkoReturn<Return = void> {
                            readonly [Marko._.scope] = { hoistedFromForIn };
                            declare return: Return;
                            constructor(_?: Return) {}
                          })();
                        };
                      }
                    })(),
                    [Symbol.iterator]: Marko._.any,
                  },
                },
              ]),
          ),
        ],
        ...Marko._.givenAttrTags("a"),
      });
      Marko._.renderTemplate(__marko_internal_module_3().default)()()({
        value() {
          hoistedFromForIn;
          //^?
        },
      });
      const __marko_internal_tag_12 = custom;
      Marko._.attrTagNames(__marko_internal_tag_12, (input) => {
        input["@a"];
      });
      Marko._.renderDynamicTag(__marko_internal_tag_12)(
        Marko._.withRestAttrTags,
      )()({
        [Marko._.restAttrTags]: [
          Marko._.forToAttrTag(
            {
              to: 10,
            },
            (index) =>
              Marko._.attrTags(__marko_internal_tag_12)([
                {
                  a: {
                    [Marko._.contentFor(__marko_internal_tag_12)]: (() => {
                      [index];
                      return Marko._.voidBody;
                    })(),
                    [Symbol.iterator]: Marko._.any,
                  },
                },
              ]),
          ),
        ],
        ...Marko._.givenAttrTags("a"),
      });
      const __marko_internal_tag_13 = custom;
      Marko._.attrTagNames(__marko_internal_tag_13, (input) => {
        input["@a"];
      });
      Marko._.renderDynamicTag(__marko_internal_tag_13)(
        Marko._.withRestAttrTags,
      )()({
        [Marko._.restAttrTags]: [
          Marko._.forToAttrTag(
            {
              from: 1,
              to: 10,
            },
            (index) =>
              Marko._.attrTags(__marko_internal_tag_13)([
                {
                  a: {
                    [Marko._.contentFor(__marko_internal_tag_13)]: (() => {
                      [index];
                      return Marko._.voidBody;
                    })(),
                    [Symbol.iterator]: Marko._.any,
                  },
                },
              ]),
          ),
        ],
        ...Marko._.givenAttrTags("a"),
      });
      const __marko_internal_tag_14 = custom;
      Marko._.attrTagNames(__marko_internal_tag_14, (input) => {
        input["@a"];
      });
      Marko._.renderDynamicTag(__marko_internal_tag_14)(
        Marko._.withRestAttrTags,
      )()({
        [Marko._.restAttrTags]: [
          Marko._.forToAttrTag(
            {
              to: 10,
              step: 2,
            },
            (index) =>
              Marko._.attrTags(__marko_internal_tag_14)([
                {
                  a: {
                    [Marko._.contentFor(__marko_internal_tag_14)]: (() => {
                      [index];
                      return Marko._.voidBody;
                    })(),
                    [Symbol.iterator]: Marko._.any,
                  },
                },
              ]),
          ),
        ],
        ...Marko._.givenAttrTags("a"),
      });
      const __marko_internal_tag_15 = custom;
      Marko._.attrTagNames(__marko_internal_tag_15, (input) => {
        input["@a"];
      });
      const __marko_internal_rendered_15 = Marko._.renderDynamicTag(
        __marko_internal_tag_15,
      )(Marko._.withRestAttrTags)()({
        [Marko._.restAttrTags]: [
          Marko._.forToAttrTag(
            {
              to: 10,
            },
            (index) =>
              Marko._.attrTags(__marko_internal_tag_15)([
                {
                  a: {
                    [Marko._.contentFor(__marko_internal_tag_15)]: (() => {
                      {
                        const hoistedFromForTo = Marko._.returned(
                          () => __marko_internal_rendered_16,
                        );
                        const __marko_internal_rendered_16 =
                          Marko._.renderTemplate(
                            __marko_internal_module_2().default,
                          )()()({
                            value() {
                              return index;
                            },
                          });
                        return () => {
                          return new (class MarkoReturn<Return = void> {
                            readonly [Marko._.scope] = { hoistedFromForTo };
                            declare return: Return;
                            constructor(_?: Return) {}
                          })();
                        };
                      }
                    })(),
                    [Symbol.iterator]: Marko._.any,
                  },
                },
              ]),
          ),
        ],
        ...Marko._.givenAttrTags("a"),
      });
      Marko._.renderTemplate(__marko_internal_module_3().default)()()({
        value() {
          hoistedFromForTo;
          //^?
        },
      });
      var __marko_internal_hoist__list = list;
      var __marko_internal_hoist__record = record;
      var {
        hoistedFromForOf: __marko_internal_hoist__hoistedFromForOf,
        hoistedFromForIn: __marko_internal_hoist__hoistedFromForIn,
        hoistedFromForTo: __marko_internal_hoist__hoistedFromForTo,
      } = Marko._.hoisted(
        Marko._.readScopes({
          __marko_internal_rendered_6,
          __marko_internal_rendered_10,
          __marko_internal_rendered_15,
        }),
      );
    }
  }
  Marko._.noop({
    list,
    record,
    hoistedFromForOf,
    hoistedFromForIn,
    hoistedFromForTo,
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
declare function __marko_internal_module_1(): typeof import("@marko/runtime-tags/tags/let.d.marko");
declare function __marko_internal_module_2(): typeof import("@marko/runtime-tags/tags/const.d.marko");
declare function __marko_internal_module_3(): typeof import("@marko/runtime-tags/tags/effect.d.marko");
