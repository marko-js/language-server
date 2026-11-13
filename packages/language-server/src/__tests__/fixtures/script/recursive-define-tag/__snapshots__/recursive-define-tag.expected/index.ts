export interface Help {
  children?: Help[];
}
export interface Input {
  value: Help[];
}
(function (this: void) {
  const input = Marko._.any as Input;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.getGlobal(
    // @ts-expect-error We expect the compiler to error because we are checking if the MarkoRun.Context is defined.
    (Marko._.error, Marko._.any as MarkoRun.Context),
  );
  const Section = Marko._.hoist(() => __marko_internal_hoist__Section);
  const __marko_internal_tag_1 = Marko._.resolveTemplate(
    import("@marko/runtime-tags/tags/define.d.marko"),
  ).default;
  {
    const Section = Marko._.returned(() => __marko_internal_rendered_1);
    const __marko_internal_rendered_1 = Marko._.renderTemplate(
      __marko_internal_tag_1,
    )()()({
      [Marko._.contentFor(__marko_internal_tag_1)]: ({
        children = [],
      }: Help) => {
        Marko._.forOfTag(
          {
            of: children,
          },
          (
            // ^?
            { children },
          ) => {
            const __marko_internal_tag_2 = Section;
            Marko._.renderDynamicTag(__marko_internal_tag_2)()()({
              children: children,
            });
            return Marko._.voidReturn;
          },
        );
        return Marko._.voidReturn;
      },
    });
    Marko._.forOfTag(
      {
        of: input.value,
      },
      (help) => {
        const __marko_internal_tag_3 = Section;
        Marko._.renderDynamicTag(__marko_internal_tag_3)()()({
          ...help,
        });
        return Marko._.voidReturn;
      },
    );
    var __marko_internal_hoist__Section = Section;
  }
  Marko._.noop({ Section, input, $global, $signal });
  return;
})();
const __marko_internal_api = "tags";
export { __marko_internal_api as "~api" };
class Template extends Marko._.Template<Input> {}
const Input = new Template();
export default Input;
