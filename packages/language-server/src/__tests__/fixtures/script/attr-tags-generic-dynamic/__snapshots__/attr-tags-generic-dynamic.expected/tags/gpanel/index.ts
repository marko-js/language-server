export interface Input<T> {
  rows: T[];
  section?: Marko.AttrTag<{
    title?: string;
    row?: Marko.AttrTag<{ id?: number; content?: Marko.Body<[T]> }>;
  }>;
}
const Input = Marko._.templateOf(<T,>(input: Input<T>) => {
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  Marko._.renderNativeTag("div")({});
  Marko._.noop({ input, $global, $signal });
});
export default Input;
