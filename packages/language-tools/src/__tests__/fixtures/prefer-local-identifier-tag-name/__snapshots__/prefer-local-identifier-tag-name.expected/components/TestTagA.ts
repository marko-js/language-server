export interface Input {
  a: string;
}
function ˍ(input: Input) {
  const out = 1 as unknown as Marko.Out;
  const component = 1 as unknown as ட;
  const state = 1 as unknown as typeof component extends {
    state: infer State extends object;
  }
    ? State
    : never;
  Marko.ட.noop({ input, out, component, state });
  ˍ.tags["div"]({
    /*div*/
  });
  return;
}
class ட extends Marko.Component<Input> {}

declare namespace ˍ {
  const tags: {
    div: Marko.ட.NativeTagRenderer<"div">;
  };
}
export default 1 as unknown as Marko.Template<"@language-tools/src/__tests__/fixtures/prefer-local-identifier-tag-name/components/TestTagA.marko">;
declare global {
  namespace Marko {
    interface CustomTags {
      "@language-tools/src/__tests__/fixtures/prefer-local-identifier-tag-name/components/TestTagA.marko": CustomTag<
        Input,
        ReturnType<typeof ˍ>,
        ட
      >;
    }
  }
}
