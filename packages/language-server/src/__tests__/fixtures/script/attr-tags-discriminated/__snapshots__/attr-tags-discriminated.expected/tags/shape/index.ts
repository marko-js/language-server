export interface Input {
  part?: Marko.AttrTag<
    { kind: "circle"; radius: number } | { kind: "square"; side: number }
  >;
}
const Input: Marko.Template<Input, void> = Marko._.template((input: Input) => {
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  Marko._.forOfTag(
    {
      of: input.part,
    },
    (part) => {
      [part.kind];
      return Marko._.voidReturn;
    },
  );
  Marko._.noop({ input, $global, $signal });
});
export default Input;
