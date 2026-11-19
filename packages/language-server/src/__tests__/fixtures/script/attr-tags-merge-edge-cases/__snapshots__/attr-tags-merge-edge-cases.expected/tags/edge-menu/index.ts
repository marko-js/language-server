export interface Input {
  a?: Marko.AttrTag<{ v?: number; content?: Marko.Body<[{ n: number }]> }>;
  b?: Marko.AttrTag<{ w?: string }>;
  "my-item"?: Marko.AttrTag<{ x?: number }>;
  item?: Marko.AttrTag<{
    row?: Marko.AttrTag<{ label: string }>;
    content?: Marko.Body;
  }>;
}
const Input: Marko.Template<Input, void> = Marko._.template((input: Input) => {
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  Marko._.forOfTag(
    {
      of: input.a,
    },
    (a) => {
      [a.v];
      return Marko._.voidReturn;
    },
  );
  Marko._.noop({ input, $global, $signal });
});
export default Input;
