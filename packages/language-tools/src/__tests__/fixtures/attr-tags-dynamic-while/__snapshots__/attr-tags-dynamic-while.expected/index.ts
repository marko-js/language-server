export type Input = Record<string, never>;
function ˍ(input: Input) {
  const out = 1 as unknown as Marko.Out;
  const component = 1 as unknown as ட;
  const state = 1 as unknown as typeof component extends {
    state: infer State extends object;
  }
    ? State
    : never;
  Marko.ட.noop({ input, out, component, state });
  let i = 0;
  Marko.ட.render(custom)({
    /*custom*/
    ...Marko.ட.mergeAttrTags(
      ++i < 10
        ? [
            {
              a: {
                /*@a*/
                /*@a*/
                ["renderBody"]: Marko.ட.inlineBody(
                  (() => {
                    i;
                  })()
                ),
              },
            },
          ]
        : []
    ),
  });
  let done = false;
  i = 0;
  Marko.ட.render(custom)({
    /*custom*/
    ...Marko.ட.mergeAttrTags(
      !done
        ? [
            {
              a: {
                /*@a*/
                /*@a*/
                ["renderBody"]: Marko.ட.inlineBody(
                  (() => {
                    done;
                    if (++i === 5) {
                      done = true;
                    }
                  })()
                ),
              },
            },
          ]
        : []
    ),
  });
  Marko.ட.render(custom)({
    /*custom*/
    ...Marko.ட.mergeAttrTags(
      undefined
        ? [
            {
              a: {
                /*@a*/
                /*@a*/
                ["renderBody"]: Marko.ட.inlineBody((() => {})()),
              },
            },
          ]
        : []
    ),
  });
  return;
}
class ட extends Marko.Component<Input> {}

declare namespace ˍ {}
export default 1 as unknown as Marko.Template<"@language-tools/src/__tests__/fixtures/attr-tags-dynamic-while/index.marko">;
declare global {
  namespace Marko {
    interface CustomTags {
      "@language-tools/src/__tests__/fixtures/attr-tags-dynamic-while/index.marko": CustomTag<
        Input,
        ReturnType<typeof ˍ>,
        ட
      >;
    }
  }
}
