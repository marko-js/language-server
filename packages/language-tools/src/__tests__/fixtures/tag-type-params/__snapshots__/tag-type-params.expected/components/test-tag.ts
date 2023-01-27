export interface Input<T, U> {
  data: T;
  renderBody: Marko.Body<[T], U>;
}
function ˍ<T, U>(input: Input<T, U>) {
  const out = 1 as unknown as Marko.Out;
  const component = 1 as unknown as ட<T, U>;
  const state = 1 as unknown as typeof component extends {
    state: infer State extends object;
  }
    ? State
    : never;
  Marko.ட.noop({ input, out, component, state });
  const ᜭ = {
    return: Marko.ட.returnTag({
      /*return*/
      value: 1 as unknown as U,
    }),
  };
  return ᜭ.return;
}
class ட<T, U> extends Marko.Component<Input<T, U>> {}
declare namespace ˍ {
  const id: "@language-tools/src/__tests__/fixtures/tag-type-params/components/test-tag.marko";
  const template: Marko.Template<typeof id>;
}
export default 1 as unknown as typeof ˍ.template;
declare global {
  namespace Marko {
    interface CustomTags2<A, B> {
      [ˍ.id]: CustomTag<Input<A, B>, ReturnType<typeof ˍ<A, B>>, ட<A, B>>;
    }
  }
}
