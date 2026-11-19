export interface Input {
  value: number | string;
  valueChange?(next: string): void;
}
const Input: Marko.Template<Input, void> = Marko._.template((input: Input) => {
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  Marko._.noop({ input, $global, $signal });
});
export default Input;
