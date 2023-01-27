export interface Input<FirstName extends string, LastName extends string> {
  firstName: FirstName;
  lastName: LastName;
}
function ˍ<FirstName extends string, LastName extends string>(
  input: Input<FirstName, LastName>
) {
  const out = 1 as unknown as Marko.Out;
  const component = 1 as unknown as ட<FirstName, LastName>;
  const state = 1 as unknown as typeof component extends {
    state: infer State extends object;
  }
    ? State
    : never;
  Marko.ட.noop({ input, out, component, state });
  state.name;
  return;
}
class ட<
  FirstName extends string,
  LastName extends string
> extends Marko.Component<Input<FirstName, LastName>> {
  declare state: {
    name: `${FirstName} ${LastName}`;
  };
  onCreate(input: Input<FirstName, LastName>) {
    this.state = { name: `${input.firstName} ${input.lastName}` };
  }
  onMount() {
    this.state.name;
  }
}
declare namespace ˍ {
  const id: "@language-tools/src/__tests__/fixtures/class-api-type-state-multiple-generics/index.marko";
  const template: Marko.Template<typeof id>;
}
export default 1 as unknown as typeof ˍ.template;
type ᜭ<
  FirstName,
  LastName,
  ᜭ extends FirstName extends string ? FirstName : never,
  ᜭᜭ extends LastName extends string ? LastName : never
> = any & ᜭ & ᜭᜭ;
declare global {
  namespace Marko {
    interface CustomTags2<A, B> {
      [ˍ.id]: 1 extends ᜭ<A, B, infer A, infer B>
        ? CustomTag<Input<A, B>, ReturnType<typeof ˍ<A, B>>, ட<A, B>>
        : never;
    }
  }
}
