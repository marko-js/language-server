const x = 1;
const y = 2;
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
  Marko.ட.render(custom)({
    /*custom*/
    x: 1,
    ...(x
      ? {
          a: {
            /*@a*/
          },
        }
      : {}),
  });
  Marko.ட.render(custom)({
    /*custom*/
    x: 1,
    ...(x ? {} : {}),
  });
  Marko.ட.render(custom)({
    /*custom*/
    x: 1,
    ...(x
      ? {
          a: {
            /*@a*/
          },
        }
      : {
          a: {
            /*@a*/
          },
        }),
  });
  Marko.ட.render(custom)({
    /*custom*/
    x: 1,
    ...(x
      ? {
          a: {
            /*@a*/
          },
        }
      : y
      ? {
          a: {
            /*@a*/
          },
        }
      : !y
      ? {
          a: {
            /*@a*/
          },
        }
      : {
          a: {
            /*@a*/
          },
        }),
  });
  Marko.ட.render(custom)({
    /*custom*/
    x: 1,
    ...(x
      ? {
          a: {
            /*@a*/
          },
        }
      : undefined
      ? {
          a: {
            /*@a*/
          },
        }
      : {}),
  });
  Marko.ட.render(custom)({
    /*custom*/
    x: 1,
    ...(x
      ? {
          a: {
            /*@a*/
          },
        }
      : {}),
  });
  Marko.ட.render(custom)({
    /*custom*/
    x: 1,
    ...(undefined
      ? {
          a: {
            /*@a*/
          },
        }
      : {}),
  });
  Marko.ட.render(custom)({
    /*custom*/
    x: 1,
    ...Marko.ட.mergeAttrTags(
      x
        ? {
            a: {
              /*@a*/
            },
          }
        : {},
      y
        ? {
            b: {
              /*@b*/
            },
          }
        : {}
    ),
  });
  Marko.ட.assertRendered(
    Marko.ட.rendered,
    1,
    Marko.ட.render(custom)({
      /*custom*/
      x: 1,
      ...Marko.ட.mergeAttrTags(
        {
          a: /* hi*/ {
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
          b: {
            /*@b*/
          },
        },
        x
          ? {
              b: {
                /*@b*/
                /*@b*/
                ["renderBody"]: Marko.ட.inlineBody(
                  (() => {
                    Marko.ட.assertRendered(
                      Marko.ட.rendered,
                      3,
                      ˍ.tags["const"]({
                        /*const*/
                        value: 2 as const,
                      })
                    );
                    const { value: hoistedFromDynamicMember } =
                      Marko.ட.rendered.returns[3];
                    return {
                      scope: { hoistedFromDynamicMember },
                    };
                  })()
                ),
              },
            }
          : {},
        y
          ? {
              a: {
                /*@a*/
              },
            }
          : {}
      ),
    })
  );
  Marko.ட.render(effect)({
    /*effect*/
    value() {
      hoistedFromStaticMember;
      hoistedFromDynamicMember; // TODO: this should be better and include `undefined` as a possible value
    },
  });
  const { hoistedFromStaticMember, hoistedFromDynamicMember } =
    Marko.ட.readScopes(Marko.ட.rendered);
  Marko.ட.noop({ hoistedFromStaticMember, hoistedFromDynamicMember });
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
export default 1 as unknown as Marko.Template<"@language-tools/src/__tests__/fixtures/attr-tags-dynamic-if/index.marko">;
declare global {
  namespace Marko {
    interface CustomTags {
      "@language-tools/src/__tests__/fixtures/attr-tags-dynamic-if/index.marko": CustomTag<
        Input,
        ReturnType<typeof ˍ>,
        ட
      >;
    }
  }
}
