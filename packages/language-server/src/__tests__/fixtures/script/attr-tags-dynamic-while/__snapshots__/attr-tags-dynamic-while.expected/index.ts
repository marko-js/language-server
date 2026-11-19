export interface Input {}
export type Component = Marko.Component<Input>;
export default Marko._.template((input: Input) => {
  const component = Marko._.any as Component;
  const state = Marko._.state(component);
  const out = Marko._.any as Marko.Out;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
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
      ++i < 10
        ? {
            //         ^?
            a: {
              [Marko._.contentFor(__marko_internal_tag_1, "a")]: (() => {
                [i];
                return Marko._.voidBody;
              })(),
              [Symbol.iterator]: Marko._.any,
            },
          }
        : Marko._.never,
    ],
    ...Marko._.givenAttrTags("a"),
  });
  let done = false;
  i = 0;
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
      !done
        ? {
            //        ^?
            a: {
              [Marko._.contentFor(__marko_internal_tag_2, "a")]: (() => {
                [done];
                //      ^?
                if (++i === 5) {
                  done = true;
                }
                return Marko._.voidBody;
              })(),
              [Symbol.iterator]: Marko._.any,
            },
          }
        : Marko._.never,
    ],
    ...Marko._.givenAttrTags("a"),
  });
  const __marko_internal_tag_3 = custom;
  Marko._.attrTagNames(__marko_internal_tag_3, (input) => {
    input["@a"];
  });
  Marko._.renderDynamicTagWithRestAttrTags(
    __marko_internal_tag_3,
    Marko._.signature(__marko_internal_tag_3),
    Marko._.actualInput,
  )({
    [Marko._.restAttrTags]: [
      undefined
        ? {
            a: {
              [Marko._.contentFor(__marko_internal_tag_3, "a")]:
                Marko._.voidBody,
              [Symbol.iterator]: Marko._.any,
            },
          }
        : Marko._.never,
    ],
    ...Marko._.givenAttrTags("a"),
  });
  Marko._.noop({ component, state, out, input, $global, $signal });
}, Marko.Component);
