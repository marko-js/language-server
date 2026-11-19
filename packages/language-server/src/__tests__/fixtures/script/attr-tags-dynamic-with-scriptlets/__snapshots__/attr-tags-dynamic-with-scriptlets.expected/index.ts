export interface Input {}
export type Component = Marko.Component<Input>;
export default Marko._.template((input: Input) => {
  const component = Marko._.any as Component;
  const state = Marko._.state(component);
  const out = Marko._.any as Marko.Out;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  let done = false;
  let i = 0;
  const __marko_internal_tag_1 = custom;
  Marko._.attrTagNames(__marko_internal_tag_1, (input) => {
    input["@a"];
  });
  Marko._.renderDynamicTagWithRestAttrTags(
    __marko_internal_tag_1,
    Marko._.signature(__marko_internal_tag_1),
    Marko._.actualInput,
  )({
    [Marko._.restAttrTags]: [
      !done
        ? (() => {
            //        ^?
            i++;
            return Marko._.attrTags(__marko_internal_tag_1)([
              {
                //    ^?
                a: {
                  [Marko._.contentFor(__marko_internal_tag_1, "a")]: (() => {
                    [done];
                    //      ^?
                    if (i === 5) {
                      done = true;
                    }
                    return Marko._.voidBody;
                  })(),
                  [Symbol.iterator]: Marko._.any,
                },
              },
            ]);
          })()
        : Marko._.never,
    ],
    ...Marko._.givenAttrTags("a"),
  });
  const __marko_internal_tag_2 = custom;
  Marko._.attrTagNames(__marko_internal_tag_2, (input) => {
    input["@a"];
  });
  Marko._.renderDynamicTagWithRestAttrTags(
    __marko_internal_tag_2,
    Marko._.signature(__marko_internal_tag_2),
    Marko._.actualInput,
  )({
    [Marko._.restAttrTags]: [
      Marko._.forToAttrTag(
        {
          from: 1,
          to: 10,
        },
        (index) => {
          const doubleIndex = index * 2;
          return Marko._.attrTags(__marko_internal_tag_2)([
            {
              //          ^?
              a: {
                [Marko._.contentFor(__marko_internal_tag_2, "a")]: (() => {
                  [doubleIndex];
                  return Marko._.voidBody;
                })(),
                [Symbol.iterator]: Marko._.any,
              },
            },
          ]);
        },
      ),
    ],
    ...Marko._.givenAttrTags("a"),
  });
  const __marko_internal_tag_3 = custom;
  Marko._.attrTagNames(__marko_internal_tag_3, (input) => {
    input["@a"];
    input["@b"];
  });
  Marko._.renderDynamicTagWithRestAttrTags(
    __marko_internal_tag_3,
    Marko._.signature(__marko_internal_tag_3),
    Marko._.actualInput,
  )({
    x: 1,
    [Marko._.restAttrTags]: [
      x
        ? (() => {
            const a = 1 as const;
            return Marko._.attrTags(__marko_internal_tag_3)([
              {
                //          ^?
                a: {
                  a: a,
                  [Symbol.iterator]: Marko._.any,
                },
              },
            ]);
          })()
        : (() => {
            const b = 2 as const;
            return Marko._.attrTags(__marko_internal_tag_3)([
              {
                //          ^?
                b: {
                  b: b,
                  [Symbol.iterator]: Marko._.any,
                },
              },
            ]);
          })(),
    ],
    ...Marko._.givenAttrTags("a", "b"),
  });
  Marko._.noop({ component, state, out, input, $global, $signal });
}, Marko.Component);
