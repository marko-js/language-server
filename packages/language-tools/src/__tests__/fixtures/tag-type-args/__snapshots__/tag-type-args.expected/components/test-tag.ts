export interface Input<T> {
  a: T;
}
function ˍ<T>(input: Input<T>) {
  const out = 1 as unknown as Marko.Out;
  const component = 1 as unknown as ட<T>;
  const state = 1 as unknown as typeof component extends {
    state: infer State extends object;
  }
    ? State
    : never;
  Marko.ட.noop({ input, out, component, state });
  return;
}
class ட<T> extends Marko.Component<Input<T>> {}

declare namespace ˍ {}
export default 1 as unknown as Marko.Template<"@language-tools/src/__tests__/fixtures/tag-type-args/components/test-tag.marko">;
declare global {
  namespace Marko {
    interface CustomTags1<A> {
      "@language-tools/src/__tests__/fixtures/tag-type-args/components/test-tag.marko": CustomTag<
        Input<A>,
        ReturnType<typeof ˍ<A>>,
        ட<A>
      >;
    }
  }
}
