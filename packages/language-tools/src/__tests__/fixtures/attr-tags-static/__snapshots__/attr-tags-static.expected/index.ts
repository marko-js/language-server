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
  Marko.ட.assertRendered(
    Marko.ட.rendered,
    1,
    Marko.ட.render(custom)({
      /*custom*/
      b: [
        {
          /*@b*/
        },
        {
          /*@b*/
          c: 2,
        },
      ],
      a: {
        /*@a*/
        b: 1,
        /*@a*/
        ["renderBody"]: Marko.ட.inlineBody(
          (() => {
            Marko.ட.assertRendered(
              Marko.ட.rendered,
              2,
              ˍ.tags["const"]({
                /*const*/
                value: 1 as const,
              })
            );
            const { value: hoistedFromStaticMember } =
              Marko.ட.rendered.returns[2];
            return {
              scope: { hoistedFromStaticMember },
            };
          })()
        ),
      },
    })
  );
  Marko.ட.render(effect)({
    /*effect*/
    value() {
      hoistedFromStaticMember;
    },
  });
  const { hoistedFromStaticMember } = Marko.ட.readScopes(Marko.ட.rendered);
  Marko.ட.noop({ hoistedFromStaticMember });
  return;
}
class ட extends Marko.Component<Input> {}

declare namespace ˍ {
  const tags: {
    const: Marko.ட.CustomTagRenderer<
      typeof import("../../components/const/index.marko").default
    >;
  };
}
export default 1 as unknown as Marko.Template<"@language-tools/src/__tests__/fixtures/attr-tags-static/index.marko">;
declare global {
  namespace Marko {
    interface CustomTags {
      "@language-tools/src/__tests__/fixtures/attr-tags-static/index.marko": CustomTag<
        Input,
        ReturnType<typeof ˍ>,
        ட
      >;
    }
  }
}
