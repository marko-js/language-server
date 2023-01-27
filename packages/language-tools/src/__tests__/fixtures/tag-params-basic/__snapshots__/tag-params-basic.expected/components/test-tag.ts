export interface Input {
  renderBody: Marko.Body<["a", "b"]>;
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
  Marko.ட.render(input.renderBody)({
    /*input.renderBody*/
    value: ["a", "b"],
  });
  Marko.ட.render(input.renderBody)({
    /*input.renderBody*/
    value: ["a", "c"],
  });
  Marko.ட.render(input.renderBody)({
    /*input.renderBody*/
    value: ["a", "b", "c"],
  });
  return;
}
class ட extends Marko.Component<Input> {}

declare namespace ˍ {}
export default 1 as unknown as Marko.Template<"@language-tools/src/__tests__/fixtures/tag-params-basic/components/test-tag.marko">;
declare global {
  namespace Marko {
    interface CustomTags {
      "@language-tools/src/__tests__/fixtures/tag-params-basic/components/test-tag.marko": CustomTag<
        Input,
        ReturnType<typeof ˍ>,
        ட
      >;
    }
  }
}
