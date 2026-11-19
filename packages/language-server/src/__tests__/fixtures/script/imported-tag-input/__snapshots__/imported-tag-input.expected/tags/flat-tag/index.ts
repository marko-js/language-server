export interface Input {
  title: string;
  count?: number;
}
function __marko_internal_template(this: void) {
  const input = Marko._.any as Input;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  var __marko_internal_return = Marko._.returnTag({
    value: input.title,
  });
  Marko._.noop({ input, $global, $signal });
  return __marko_internal_return;
}
const __marko_internal_api = "tags";
export { __marko_internal_api as "~api" };
class Template extends Marko._.Template<
  Input,
  Marko._.ReturnOf<typeof __marko_internal_template>
> {}
const Input = new Template();
export default Input;
