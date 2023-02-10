import "@marko/language-tools/script.internals";
import "../../lib-fixtures/marko.d.ts";
const x = 1;
const y = 2;
export interface Input {}
abstract class Component extends Marko.Component<Input> {}
export { type Component };
function __marko_internal_template(this: void) {
  const input = 1 as any as Input;
  const component = 1 as any as Component;
  const out = Marko._.out;
  const state = Marko._.state(component);
  Marko._.noop({ input, out, component, state });
  Marko._.renderDynamicTag(custom)({
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
  Marko._.renderDynamicTag(custom)({
    /*custom*/
    x: 1,
    ...(x ? {} : {}),
  });
  Marko._.renderDynamicTag(custom)({
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
  Marko._.renderDynamicTag(custom)({
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
  Marko._.renderDynamicTag(custom)({
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
  Marko._.renderDynamicTag(custom)({
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
  Marko._.renderDynamicTag(custom)({
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
  Marko._.renderDynamicTag(custom)({
    /*custom*/
    x: 1,
    ...Marko._.mergeAttrTags(
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
  Marko._.assertRendered(
    Marko._.rendered,
    1,
    Marko._.renderDynamicTag(custom)({
      /*custom*/
      x: 1,
      ...Marko._.mergeAttrTags(
        {
          // hi
          a: {
            /*@a*/
            b: 1,
            /*@a*/
            ["renderBody"]: Marko._.inlineBody(
              (() => {
                Marko._.assertRendered(
                  Marko._.rendered,
                  2,
                  Marko._.renderTemplate(
                    import("../../components/const/index.marko")
                  )({
                    /*const*/
                    value: 1 as const,
                  })
                );
                const { value: hoistedFromStaticMember } =
                  Marko._.rendered.returns[2];
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
                ["renderBody"]: Marko._.inlineBody(
                  (() => {
                    Marko._.assertRendered(
                      Marko._.rendered,
                      3,
                      Marko._.renderTemplate(
                        import("../../components/const/index.marko")
                      )({
                        /*const*/
                        value: 2 as const,
                      })
                    );
                    const { value: hoistedFromDynamicMember } =
                      Marko._.rendered.returns[3];
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
  Marko._.renderDynamicTag(effect)({
    /*effect*/
    value() {
      hoistedFromStaticMember;
      hoistedFromDynamicMember; // TODO: this should be better and include `undefined` as a possible value
    },
  });
  const { hoistedFromStaticMember, hoistedFromDynamicMember } =
    Marko._.readScopes(Marko._.rendered);
  Marko._.noop({ hoistedFromStaticMember, hoistedFromDynamicMember });
  return;
}
export default new (class Template extends Marko._.Template<{
  render(
    input: Marko.TemplateInput<Input>,
    stream?: {
      write: (chunk: string) => void;
      end: (chunk?: string) => void;
    }
  ): Marko.Out<Component>;

  renderSync(input: Marko.TemplateInput<Input>): Marko.RenderResult<Component>;

  renderToString(input: Marko.TemplateInput<Input>): string;

  stream(
    input: Marko.TemplateInput<Input>
  ): ReadableStream<string> & NodeJS.ReadableStream;

  _<__marko_internal_input = unknown>(
    input: Marko._.Relate<Input, __marko_internal_input>
  ): Marko._.ReturnWithScope<
    __marko_internal_input,
    ReturnType<typeof __marko_internal_template>
  >;
}> {})();
