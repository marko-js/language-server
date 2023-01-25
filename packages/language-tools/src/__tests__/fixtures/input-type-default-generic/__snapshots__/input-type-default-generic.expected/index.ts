export interface Input<T = string> {
  options: T[];
  onChange: (option: T) => unknown;
}
function ˍ<T = string>(input: Input<T>) {
  const out = 1 as unknown as Marko.Out;
  const component = 1 as unknown as ட<T>;
  const state = 1 as unknown as typeof component extends {
    state: infer State extends object;
  }
    ? State
    : never;
  Marko.ட.noop({ input, out, component, state });
  input.options;
  input.onChange;
  return;
}
class ட<T = string> extends Marko.Component<Input<T>> {}
declare namespace ˍ {
  const id: unique symbol;
  const template: Marko.Template<typeof id>;
}
export default 1 as unknown as typeof ˍ.template;
type ᜭ<T, ᜭ extends T extends unknown ? string : never> = any & ᜭ;
declare global {
  namespace Marko {
    interface CustomTags1<A> {
      [ˍ.id]: 1 extends ᜭ<A, infer A>
        ? CustomTag<Input<A>, ReturnType<typeof ˍ<A>>, ட<A>>
        : never;
    }
  }
}
