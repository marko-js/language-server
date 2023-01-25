export interface Input<
  FirstName extends string,
  LastName extends string,
  Extra
> {
  firstName: FirstName;
  lastName: LastName;
  fullName: `${FirstName} ${LastName}`;
}
function ˍ<FirstName extends string, LastName extends string, Extra>(
  input: Input<FirstName, LastName, Extra>
) {
  const out = 1 as unknown as Marko.Out;
  const component = 1 as unknown as ட<FirstName, LastName, Extra>;
  const state = 1 as unknown as typeof component extends {
    state: infer State extends object;
  }
    ? State
    : never;
  Marko.ட.noop({ input, out, component, state });
  input.fullName;
  return;
}
class ட<
  FirstName extends string,
  LastName extends string,
  Extra
> extends Marko.Component<Input<FirstName, LastName, Extra>> {}
declare namespace ˍ {
  const id: unique symbol;
  const template: Marko.Template<typeof id>;
}
export default 1 as unknown as typeof ˍ.template;
type ᜭ<
  FirstName,
  LastName,
  Extra,
  ᜭ extends FirstName extends string ? FirstName : never,
  ᜭᜭ extends LastName extends string ? LastName : never,
  ᜭᜭᜭ extends Extra
> = any & ᜭ & ᜭᜭ & ᜭᜭᜭ;
declare global {
  namespace Marko {
    interface CustomTags3<A, B, C> {
      [ˍ.id]: 1 extends ᜭ<A, B, C, infer A, infer B, infer C>
        ? CustomTag<Input<A, B, C>, ReturnType<typeof ˍ<A, B, C>>, ட<A, B, C>>
        : never;
    }
  }
}
