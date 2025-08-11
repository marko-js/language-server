export interface Input {}
abstract class Component extends Marko.Component<Input> {}
export { type Component };
(function (this: void) {
  const input = Marko._.any as Input;
  const component = Marko._.any as Component;
  const state = Marko._.state(component);
  const out = Marko._.out;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.getGlobal(
    // @ts-expect-error We expect the compiler to error because we are checking if the MarkoRun.Context is defined.
    (Marko._.error, Marko._.any as MarkoRun.Context),
  );
  const __marko_internal_tag_1 = Marko._.resolveTemplate(
    import("../../../components/let/index.marko"),
  );
  const __marko_internal_rendered_1 = Marko._.renderTemplate(
    __marko_internal_tag_1,
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
  const list = __marko_internal_rendered_1.return.value;
  Marko._.forOfTag(
    {
      /*for*/ of: list,
    },
    () => {
      return Marko._.voidReturn;
    },
  );
  Marko._.forOfTag(
    {
      /*for*/ of: list,
    },
    (item, index, all) => {
      item;
      index;
      all;
      return Marko._.voidReturn;
    },
  );
  Marko._.forOfTag(
    {
      /*for*/ of: list,
      by: (item, index) => `${item}-${index}`,
    },
    () =>
      //  ^?      ^?       ^?

      {
        return Marko._.voidReturn;
      },
  );
  const __marko_internal_rendered_2 = Marko._.forOfTag(
    {
      /*for*/ of: list,
    },
    (
      //               ^?    ^?
      item,
    ) => {
      const __marko_internal_tag_2 = Marko._.resolveTemplate(
        import("../../../components/const/index.marko"),
      );
      const __marko_internal_rendered_3 = Marko._.renderTemplate(
        __marko_internal_tag_2,
      )()()({
        value: item,
      });
      const { value: hoistedFromForOf } =
        __marko_internal_rendered_3.return.value;
      return new (class MarkoReturn<Return = void> {
        [Marko._.scope] = { hoistedFromForOf };
        declare return: Return;
        constructor(_?: Return) {}
      })();
    },
  );
  Marko._.forOfTag(
    {
      /*for*/ of: list,
    },
    (item) => {
      return Marko._.voidReturn;
    },
  );
  const __marko_internal_tag_3 = Marko._.interpolated`effect`;
  Marko._.renderDynamicTag(__marko_internal_tag_3)()()({
    value() {
      hoistedFromForOf;
      //^?
    },
  });
  const __marko_internal_tag_4 = Marko._.resolveTemplate(
    import("../../../components/let/index.marko"),
  );
  const __marko_internal_rendered_4 = Marko._.renderTemplate(
    __marko_internal_tag_4,
  )()()({
    value: { a: 1, b: 2 } as const,
  });
  const record = __marko_internal_rendered_4.return.value;
  Marko._.forInTag(
    {
      /*for*/ in: record,
    },
    (key, value) => {
      key;
      value;
      return Marko._.voidReturn;
    },
  );
  Marko._.forInTag(
    {
      /*for*/ in: record,
      by: (value, key) => `${value}-${key}`,
    },
    () =>
      //  ^?     ^?

      {
        return Marko._.voidReturn;
      },
  );
  const __marko_internal_rendered_5 = Marko._.forInTag(
    {
      /*for*/ in: record,
    },
    (
      //                 ^?     ^?
      key,
    ) => {
      const __marko_internal_tag_5 = Marko._.resolveTemplate(
        import("../../../components/const/index.marko"),
      );
      const __marko_internal_rendered_6 = Marko._.renderTemplate(
        __marko_internal_tag_5,
      )()()({
        value: key,
      });
      const hoistedFromForIn = __marko_internal_rendered_6.return.value;
      return new (class MarkoReturn<Return = void> {
        [Marko._.scope] = { hoistedFromForIn };
        declare return: Return;
        constructor(_?: Return) {}
      })();
    },
  );
  const __marko_internal_tag_6 = Marko._.interpolated`effect`;
  Marko._.renderDynamicTag(__marko_internal_tag_6)()()({
    value() {
      hoistedFromForIn;
      //^?
    },
  });
  Marko._.forToTag(
    {
      /*for*/ to: 10,
    },
    (index) => {
      index;
      return Marko._.voidReturn;
    },
  );
  Marko._.forToTag(
    {
      /*for*/ to: 10,
      by: (index) => `${index}`,
    },
    () =>
      //  ^?

      {
        return Marko._.voidReturn;
      },
  );
  Marko._.forToTag(
    {
      /*for*/ from: 1,
      to: 10,
    },
    (
      //             ^?
      index,
    ) => {
      index;
      return Marko._.voidReturn;
    },
  );
  Marko._.forToTag(
    {
      /*for*/ to: 10,
      step: 2,
    },
    (
      //  ^?
      index,
    ) => {
      index;
      return Marko._.voidReturn;
    },
  );
  const __marko_internal_rendered_7 = Marko._.forToTag(
    {
      /*for*/ to: 10,
    },
    (
      //  ^?
      index,
    ) => {
      const __marko_internal_tag_7 = Marko._.resolveTemplate(
        import("../../../components/const/index.marko"),
      );
      const __marko_internal_rendered_8 = Marko._.renderTemplate(
        __marko_internal_tag_7,
      )()()({
        value: index,
      });
      const hoistedFromForTo = __marko_internal_rendered_8.return.value;
      return new (class MarkoReturn<Return = void> {
        [Marko._.scope] = { hoistedFromForTo };
        declare return: Return;
        constructor(_?: Return) {}
      })();
    },
  );
  const __marko_internal_tag_8 = Marko._.interpolated`effect`;
  Marko._.renderDynamicTag(__marko_internal_tag_8)()()({
    value() {
      hoistedFromForTo;
      //^?
    },
  });
  Marko._.forTag(
    {
      /*for*/
    },
    (index) => {
      return Marko._.voidReturn;
    },
  );
  const { hoistedFromForOf, hoistedFromForIn, hoistedFromForTo } =
    Marko._.readScopes({
      __marko_internal_rendered_2,
      __marko_internal_rendered_5,
      __marko_internal_rendered_7,
    });
  Marko._.noop({
    hoistedFromForOf,
    hoistedFromForIn,
    hoistedFromForTo,
    component,
    state,
    out,
    input,
    $global,
    $signal,
  });
  return;
})();
export default new (class Template extends Marko._.Template<{
  render(
    input: Marko.TemplateInput<Input>,
    stream?: {
      write: (chunk: string) => void;
      end: (chunk?: string) => void;
    },
  ): Marko.Out<Component>;

  render(
    input: Marko.TemplateInput<Input>,
    cb?: (err: Error | null, result: Marko.RenderResult<Component>) => void,
  ): Marko.Out<Component>;

  renderSync(input: Marko.TemplateInput<Input>): Marko.RenderResult<Component>;

  renderToString(input: Marko.TemplateInput<Input>): string;

  stream(
    input: Marko.TemplateInput<Input>,
  ): ReadableStream<string> & NodeJS.ReadableStream;

  mount(
    input: Marko.TemplateInput<Input>,
    reference: Node,
    position?: "afterbegin" | "afterend" | "beforebegin" | "beforeend",
  ): Marko.MountedTemplate<typeof input>;

  api: "class";
  _(): () => <__marko_internal_input extends unknown>(
    input: Marko.Directives &
      Input &
      Marko._.Relate<__marko_internal_input, Marko.Directives & Input>,
  ) => Marko._.ReturnWithScope<__marko_internal_input, void>;
}> {})();
