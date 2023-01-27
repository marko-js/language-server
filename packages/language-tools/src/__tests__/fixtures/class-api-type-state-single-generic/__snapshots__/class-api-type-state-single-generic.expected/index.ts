export interface Input<T extends string> {
  name: T;
}
function ˍ<T extends string>(input: Input<T>) {
  const out = 1 as unknown as Marko.Out;
  const component = 1 as unknown as ட<T>;
  const state = 1 as unknown as typeof component extends {
    state: infer State extends object;
  }
    ? State
    : never;
  Marko.ட.noop({ input, out, component, state });
  state.name;
  return;
}
class ட<T extends string> extends Marko.Component<Input<T>> {
  declare state: {
    name: T;
  };
  onCreate(input: Input<T>) {
    this.state = { name: input.name };
  }
  onMount() {
    this.state.name;
  }
}

declare namespace ˍ {}
export default 1 as unknown as Marko.Template<"@language-tools/src/__tests__/fixtures/class-api-type-state-single-generic/index.marko">;
type ᜭ<T, ᜭ extends T extends string ? T : never> = any & ᜭ;
declare global {
  namespace Marko {
    interface CustomTags1<A> {
      "@language-tools/src/__tests__/fixtures/class-api-type-state-single-generic/index.marko": 1 extends ᜭ<
        A,
        infer A
      >
        ? CustomTag<Input<A>, ReturnType<typeof ˍ<A>>, ட<A>>
        : never;
    }
  }
}
