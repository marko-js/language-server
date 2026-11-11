export interface Input<
  T extends Marko.Template<
    {
      value: string;
      item?: Marko.AttrTag<{
        x: number;
        renderBody?: Marko.Body<[{ y: number }]>;
      }>;
    },
    void
  >,
> {
  tag: T;
}
// As a template of the constraint's type
declare const Tag: Marko.Template<
  {
    value: string;
    item?: Marko.AttrTag<{
      x: number;
      renderBody?: Marko.Body<[{ y: number }]>;
    }>;
  },
  void
>;
abstract class Component<
  T extends Marko.Template<
    {
      value: string;
      item?: Marko.AttrTag<{
        x: number;
        renderBody?: Marko.Body<[{ y: number }]>;
      }>;
    },
    void
  >,
> extends Marko.Component<Input<T>> {}
export { type Component };
(function <
  T extends Marko.Template<
    {
      value: string;
      item?: Marko.AttrTag<{
        x: number;
        renderBody?: Marko.Body<[{ y: number }]>;
      }>;
    },
    void
  >,
>(this: void) {
  const input = Marko._.any as Input<T>;
  const component = Marko._.any as Component<T>;
  const state = Marko._.state(component);
  const out = Marko._.any as Marko.Out;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.getGlobal(
    // @ts-expect-error We expect the compiler to error because we are checking if the MarkoRun.Context is defined.
    (Marko._.error, Marko._.any as MarkoRun.Context),
  );
  const __marko_internal_tag_1 = input.tag;
  Marko._.renderDynamicTag(__marko_internal_tag_1)()()({
    value: "x",
  });
  const __marko_internal_tag_2 = input.tag;
  Marko._.renderDynamicTag(__marko_internal_tag_2)()()({
    value: 1,
  });
  const __marko_internal_tag_3 = input.tag;
  Marko._.renderDynamicTag(__marko_internal_tag_3)()()({
    value: "x",
    bogus: 1,
  });
  const __marko_internal_tag_4 = input.tag;
  Marko._.attrTagNames(__marko_internal_tag_4, (input) => {
    input["@item"];
    input["@item"];
  });
  Marko._.renderDynamicTag(__marko_internal_tag_4)(Marko._.withRestAttrTags)()({
    value: "x",
    item: {
      x: 1,
      [Symbol.iterator]: Marko._.any,
    },
    [Marko._.restAttrTags]: [
      {
        item: {
          x: "2",
          [Symbol.iterator]: Marko._.any,
        },
      },
    ],
  });
  const __marko_internal_tag_5 = Tag;
  Marko._.renderDynamicTag(__marko_internal_tag_5)()()({
    value: "x",
    bogus: 1,
  });
  const __marko_internal_tag_6 = Tag;
  Marko._.attrTagNames(__marko_internal_tag_6, (input) => {
    input["@item"];
    input["@item"];
  });
  Marko._.renderDynamicTag(__marko_internal_tag_6)(Marko._.withRestAttrTags)()({
    value: "x",
    item: {
      x: 1,
      [Symbol.iterator]: Marko._.any,
    },
    [Marko._.restAttrTags]: [
      {
        item: {
          x: "2",
          [Symbol.iterator]: Marko._.any,
        },
      },
    ],
  });
  const __marko_internal_tag_7 = input.tag;
  Marko._.attrTagNames(__marko_internal_tag_7, (input) => {
    input["@item"];
  });
  Marko._.renderDynamicTag(__marko_internal_tag_7)()()(
    // Content params by the constraint
    {
      value: "x",
      item: {
        x: 1,
        [Marko._.contentFor(__marko_internal_tag_7)]: ({ y }) => {
          y.toFixed();
          return Marko._.voidReturn;
        },
        [Symbol.iterator]: Marko._.any,
      },
    },
  );
  const __marko_internal_tag_8 = Tag;
  Marko._.attrTagNames(__marko_internal_tag_8, (input) => {
    input["@item"];
  });
  Marko._.renderDynamicTag(__marko_internal_tag_8)()()({
    value: "x",
    item: {
      x: 1,
      [Marko._.contentFor(__marko_internal_tag_8)]: ({ y }) => {
        y.toFixed();
        return Marko._.voidReturn;
      },
      [Symbol.iterator]: Marko._.any,
    },
  });
  Marko._.noop({ component, state, out, input, $global, $signal });
  return;
})();
const __marko_internal_api = "class";
export { __marko_internal_api as "~api" };
const Input = new (class Template extends Marko._.Template<{
  render<
    T extends Marko.Template<
      {
        value: string;
        item?: Marko.AttrTag<{
          x: number;
          renderBody?: Marko.Body<[{ y: number }]>;
        }>;
      },
      void
    >,
  >(
    input: Marko.TemplateInput<Input<T>>,
    stream?: {
      write: (chunk: string) => void;
      end: (chunk?: string) => void;
    },
  ): Marko.Out<Component<T>>;

  render<
    T extends Marko.Template<
      {
        value: string;
        item?: Marko.AttrTag<{
          x: number;
          renderBody?: Marko.Body<[{ y: number }]>;
        }>;
      },
      void
    >,
  >(
    input: Marko.TemplateInput<Input<T>>,
    cb?: (err: Error | null, result: Marko.RenderResult<Component<T>>) => void,
  ): Marko.Out<Component<T>>;

  renderSync<
    T extends Marko.Template<
      {
        value: string;
        item?: Marko.AttrTag<{
          x: number;
          renderBody?: Marko.Body<[{ y: number }]>;
        }>;
      },
      void
    >,
  >(
    input: Marko.TemplateInput<Input<T>>,
  ): Marko.RenderResult<Component<T>>;

  renderToString<
    T extends Marko.Template<
      {
        value: string;
        item?: Marko.AttrTag<{
          x: number;
          renderBody?: Marko.Body<[{ y: number }]>;
        }>;
      },
      void
    >,
  >(
    input: Marko.TemplateInput<Input<T>>,
  ): string;

  stream<
    T extends Marko.Template<
      {
        value: string;
        item?: Marko.AttrTag<{
          x: number;
          renderBody?: Marko.Body<[{ y: number }]>;
        }>;
      },
      void
    >,
  >(
    input: Marko.TemplateInput<Input<T>>,
  ): ReadableStream<string> & NodeJS.ReadableStream;

  mount<
    T extends Marko.Template<
      {
        value: string;
        item?: Marko.AttrTag<{
          x: number;
          renderBody?: Marko.Body<[{ y: number }]>;
        }>;
      },
      void
    >,
  >(
    input: Marko.TemplateInput<Input<T>>,
    reference: Node,
    position?: "afterbegin" | "afterend" | "beforebegin" | "beforeend",
  ): Marko.MountedTemplate<typeof input, void>;

  api: typeof __marko_internal_api;
  _<__marko_internal_apply = 1>(
    m?: __marko_internal_apply,
  ): __marko_internal_apply extends 0 | 2
    ? <
        T extends Marko.Template<
          {
            value: string;
            item?: Marko.AttrTag<{
              x: number;
              renderBody?: Marko.Body<[{ y: number }]>;
            }>;
          },
          void
        >,
      >() => Marko._.Renderer<Input<T>, void, __marko_internal_apply>
    : __marko_internal_apply extends 1
      ? () => <
          __marko_internal_input,
          T extends Marko.Template<
            {
              value: string;
              item?: Marko.AttrTag<{
                x: number;
                renderBody?: Marko.Body<[{ y: number }]>;
              }>;
            },
            void
          >,
        >(
          input: Marko.Directives &
            Input<T> &
            Marko._.Relate<__marko_internal_input, Marko.Directives & Input<T>>,
        ) => Marko._.ReturnWithScope<__marko_internal_input, void>
      : () => <
          __marko_internal_input,
          T extends Marko.Template<
            {
              value: string;
              item?: Marko.AttrTag<{
                x: number;
                renderBody?: Marko.Body<[{ y: number }]>;
              }>;
            },
            void
          >,
        >(
          input: Marko._.TagInput<__marko_internal_input, Input<T>>,
        ) => Marko._.ReturnWithRestAttrTagsScope<__marko_internal_input, void>;
  [Marko._.anyInput]: Input<any>;
}> {})();
export default Input;
