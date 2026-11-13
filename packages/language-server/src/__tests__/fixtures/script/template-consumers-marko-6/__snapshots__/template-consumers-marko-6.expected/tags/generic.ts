export interface Input<T> {
  value: T;
  label?: Parameters;
  content?: Marko.Body<[T]>;
}
// Names a template may declare, which its generated type must not read.
export interface Parameters {
  text: string;
}
export type ReturnType = never;
function __marko_internal_template<T>(this: void) {
  const input = Marko._.any as Input<T>;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.getGlobal(
    // @ts-expect-error We expect the compiler to error because we are checking if the MarkoRun.Context is defined.
    (Marko._.error, Marko._.any as MarkoRun.Context),
  );
  const current = Marko._.hoist(() => __marko_internal_hoist__current);
  const __marko_internal_tag_1 = Marko._.resolveTemplate(
    import("marko/tags/let.d.marko"),
  ).default;
  {
    const current = Marko._.returned(() => __marko_internal_rendered_1);
    const __marko_internal_rendered_1 = Marko._.renderTemplate(
      __marko_internal_tag_1,
    )()()({
      value: input.value,
    });
    const __marko_internal_change__current = Marko._.change(
      "current",
      "value",
      __marko_internal_rendered_1.return,
    );
    const __marko_internal_tag_2 = input.content;
    Marko._.renderDynamicTag(__marko_internal_tag_2)()()(current);
    var __marko_internal_return = Marko._.returnTag({
      value: current,
      valueChange(next: T) {
        __marko_internal_change__current.current = next;
      },
    });
    var __marko_internal_hoist__current = current;
  }
  Marko._.noop({ current, input, $global, $signal });
  return __marko_internal_return;
}
class Template extends Marko._.GenericTemplate<
  {
    [__marko_internal_key in keyof Marko._.TemplateMethods]: <T>(
      ...args: Marko._.MethodParams<
        Input<T>,
        Marko._.ReturnOf<typeof __marko_internal_template<T>>,
        __marko_internal_key
      >
    ) => Marko._.MethodReturn<
      Input<T>,
      Marko._.ReturnOf<typeof __marko_internal_template<T>>,
      __marko_internal_key
    >;
  } & { [Marko._.anyInput]: Input<any> },
  <__marko_internal_apply = 1>(
    m?: __marko_internal_apply,
  ) => __marko_internal_apply extends 0 | 2
    ? <T>() => Marko._.Renderer<
        Input<T>,
        Marko._.ReturnOf<typeof __marko_internal_template<T>>,
        __marko_internal_apply
      >
    : __marko_internal_apply extends 1
      ? () => <__marko_internal_input, T>(
          input: Marko.Directives &
            Input<T> &
            Marko._.Relate<__marko_internal_input, Marko.Directives & Input<T>>,
        ) => Marko._.ReturnWithScope<
          __marko_internal_input,
          Marko._.ReturnOf<typeof __marko_internal_template<T>>
        >
      : () => <__marko_internal_input, T>(
          input: Marko._.TagInput<__marko_internal_input, Input<T>>,
        ) => Marko._.ReturnWithRestAttrTagsScope<
          __marko_internal_input,
          Marko._.ReturnOf<typeof __marko_internal_template<T>>
        >
> {}
const Input = new Template();
export default Input;
