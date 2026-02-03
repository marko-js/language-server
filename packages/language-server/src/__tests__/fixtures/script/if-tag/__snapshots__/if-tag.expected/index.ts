export interface Input {}
(function (this: void) {
  const input = Marko._.any as Input;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.getGlobal(
    // @ts-expect-error We expect the compiler to error because we are checking if the MarkoRun.Context is defined.
    (Marko._.error, Marko._.any as MarkoRun.Context),
  );
  const show = Marko._.hoist(() => __marko_internal_hoist__show);
  const showAlt = Marko._.hoist(() => __marko_internal_hoist__showAlt);
  const a = Marko._.hoist(() => __marko_internal_hoist__a);
  const b = Marko._.hoist(() => __marko_internal_hoist__b);
  const c = Marko._.hoist(() => __marko_internal_hoist__c);
  const d = Marko._.hoist(() => __marko_internal_hoist__d);
  const e = Marko._.hoist(() => __marko_internal_hoist__e);
  const f = Marko._.hoist(() => __marko_internal_hoist__f);
  const g = Marko._.hoist(() => __marko_internal_hoist__g);
  const h = Marko._.hoist(() => __marko_internal_hoist__h);
  const i = Marko._.hoist(() => __marko_internal_hoist__i);
  const __marko_internal_tag_1 = Marko._.resolveTemplate(
    import("@marko/runtime-tags/tags/let.d.marko"),
  );
  {
    const show = Marko._.returned(() => __marko_internal_rendered_1);
    const __marko_internal_rendered_1 = Marko._.renderTemplate(
      __marko_internal_tag_1 /*let*/,
    )()()({
      value: true,
    });
    const __marko_internal_tag_2 = Marko._.resolveTemplate(
      import("@marko/runtime-tags/tags/let.d.marko"),
    );
    {
      const showAlt = Marko._.returned(() => __marko_internal_rendered_2);
      const __marko_internal_rendered_2 = Marko._.renderTemplate(
        __marko_internal_tag_2 /*let*/,
      )()()({
        value: false,
      });
      if (undefined) {
      }
      if (show) {
      }
      if (show) {
      }
      Marko._.renderNativeTag("div")()()({
        [Marko._.content /*div*/]: (() => {
          if (undefined) {
          }
          return () => {
            return Marko._.voidReturn;
          };
        })(),
      });
      if (show) {
      } else {
      }
      const __marko_internal_rendered_3 = (() => {
        if (show) {
          const __marko_internal_tag_4 = Marko._.resolveTemplate(
            import("@marko/runtime-tags/tags/const.d.marko"),
          );
          {
            const a = Marko._.returned(() => __marko_internal_rendered_4);
            const __marko_internal_rendered_4 = Marko._.renderTemplate(
              __marko_internal_tag_4 /*const*/,
            )()()({
              value: () => 0 as const,
            });
            return {
              scope: { a },
            };
          }
        } else {
          return undefined;
        }
      })();
      const __marko_internal_rendered_5 = (() => {
        if (show) {
          const __marko_internal_tag_6 = Marko._.resolveTemplate(
            import("@marko/runtime-tags/tags/const.d.marko"),
          );
          {
            const b = Marko._.returned(() => __marko_internal_rendered_6);
            const __marko_internal_rendered_6 = Marko._.renderTemplate(
              __marko_internal_tag_6 /*const*/,
            )()()({
              value: () => 1 as const,
            });
            return {
              scope: { b },
            };
          }
        } else if (showAlt) {
          const __marko_internal_tag_7 = Marko._.resolveTemplate(
            import("@marko/runtime-tags/tags/const.d.marko"),
          );
          {
            const c = Marko._.returned(() => __marko_internal_rendered_7);
            const __marko_internal_rendered_7 = Marko._.renderTemplate(
              __marko_internal_tag_7 /*const*/,
            )()()({
              value: () => 2 as const,
            });
            return {
              scope: { c },
            };
          }
        } else {
          const __marko_internal_tag_8 = Marko._.resolveTemplate(
            import("@marko/runtime-tags/tags/const.d.marko"),
          );
          {
            const d = Marko._.returned(() => __marko_internal_rendered_8);
            const __marko_internal_rendered_8 = Marko._.renderTemplate(
              __marko_internal_tag_8 /*const*/,
            )()()({
              value: () => 3 as const,
            });
            return {
              scope: { d },
            };
          }
        }
      })();
      const __marko_internal_rendered_9 = (() => {
        if (show) {
        } else {
          const __marko_internal_tag_10 = Marko._.resolveTemplate(
            import("@marko/runtime-tags/tags/const.d.marko"),
          );
          {
            const e = Marko._.returned(() => __marko_internal_rendered_10);
            const __marko_internal_rendered_10 = Marko._.renderTemplate(
              __marko_internal_tag_10 /*const*/,
            )()()({
              value: () => 4 as const,
            });
            return {
              scope: { e },
            };
          }
        }
      })();
      const __marko_internal_rendered_11 = (() => {
        if (show) {
        } else if (showAlt) {
        } else {
          const __marko_internal_tag_12 = Marko._.resolveTemplate(
            import("@marko/runtime-tags/tags/const.d.marko"),
          );
          {
            const f = Marko._.returned(() => __marko_internal_rendered_12);
            const __marko_internal_rendered_12 = Marko._.renderTemplate(
              __marko_internal_tag_12 /*const*/,
            )()()({
              value: () => 4 as const,
            });
            return {
              scope: { f },
            };
          }
        }
      })();
      const __marko_internal_rendered_13 = (() => {
        if (show) {
          const __marko_internal_tag_14 = Marko._.resolveTemplate(
            import("@marko/runtime-tags/tags/const.d.marko"),
          );
          {
            const g = Marko._.returned(() => __marko_internal_rendered_14);
            const __marko_internal_rendered_14 = Marko._.renderTemplate(
              __marko_internal_tag_14 /*const*/,
            )()()({
              value: () => 5 as const,
            });
            return {
              scope: { g },
            };
          }
        } else {
          const __marko_internal_tag_15 = Marko._.resolveTemplate(
            import("@marko/runtime-tags/tags/const.d.marko"),
          );
          {
            const g = Marko._.returned(() => __marko_internal_rendered_15);
            const __marko_internal_rendered_15 = Marko._.renderTemplate(
              __marko_internal_tag_15 /*const*/,
            )()()({
              value: () => 6 as const,
            });
            return {
              scope: { g },
            };
          }
        }
      })();
      const __marko_internal_rendered_16 = (() => {
        if (show) {
        } else if (showAlt) {
          if (show) {
          } else if (showAlt) {
            const __marko_internal_tag_17 = Marko._.resolveTemplate(
              import("@marko/runtime-tags/tags/const.d.marko"),
            );
            {
              const h = Marko._.returned(() => __marko_internal_rendered_17);
              const __marko_internal_rendered_17 = Marko._.renderTemplate(
                __marko_internal_tag_17 /*const*/,
              )()()({
                value: () => 7 as const,
              });
              return {
                scope: { h },
              };
            }
          } else {
            const __marko_internal_tag_18 = Marko._.resolveTemplate(
              import("@marko/runtime-tags/tags/const.d.marko"),
            );
            {
              const i = Marko._.returned(() => __marko_internal_rendered_18);
              const __marko_internal_rendered_18 = Marko._.renderTemplate(
                __marko_internal_tag_18 /*const*/,
              )()()({
                value: () => 8 as const,
              });
              return {
                scope: { i },
              };
            }
          }
        } else {
          return undefined;
        }
      })();
      if (show) {
      } else if (undefined) {
      }
      if (show) {
      }
      if (show) {
      }
      if ((show, y)) {
      }
      if ((show, y)) {
      }
      const __marko_internal_tag_19 = Marko._.resolveTemplate(
        import("@marko/runtime-tags/tags/effect.d.marko"),
      );
      Marko._.renderTemplate(__marko_internal_tag_19 /*effect*/)()()({
        value() {
          a;
          //^?
          b;
          //^?
          c;
          //^?
          d;
          //^?
          e;
          //^?
          f;
          //^?
          g;
          //^?
          h;
          //^?
          i;
          //^?
        },
      });
      var __marko_internal_hoist__show = show;
      var __marko_internal_hoist__showAlt = showAlt;
      var {
        a: __marko_internal_hoist__a,
        b: __marko_internal_hoist__b,
        c: __marko_internal_hoist__c,
        d: __marko_internal_hoist__d,
        e: __marko_internal_hoist__e,
        f: __marko_internal_hoist__f,
        g: __marko_internal_hoist__g,
        h: __marko_internal_hoist__h,
        i: __marko_internal_hoist__i,
      } = Marko._.readScopes({
        __marko_internal_rendered_3,
        __marko_internal_rendered_5,
        __marko_internal_rendered_9,
        __marko_internal_rendered_11,
        __marko_internal_rendered_13,
        __marko_internal_rendered_16,
      });
    }
  }
  Marko._.noop({
    show,
    showAlt,
    a,
    b,
    c,
    d,
    e,
    f,
    g,
    h,
    i,
    input,
    $global,
    $signal,
  });
  return;
})();
export default new (class Template extends Marko._.Template<{
  render(
    input: Marko.TemplateInput<Input>,
    stream?: {
      write: (chunk: string) => void;
      end: (chunk?: string) => void;
    },
  ): Marko.Out<never>;

  render(
    input: Marko.TemplateInput<Input>,
    cb?: (err: Error | null, result: Marko.RenderResult<never>) => void,
  ): Marko.Out<never>;

  renderSync(input: Marko.TemplateInput<Input>): Marko.RenderResult<never>;

  renderToString(input: Marko.TemplateInput<Input>): string;

  stream(
    input: Marko.TemplateInput<Input>,
  ): ReadableStream<string> & NodeJS.ReadableStream;

  mount(
    input: Marko.TemplateInput<Input>,
    reference: Node,
    position?: "afterbegin" | "afterend" | "beforebegin" | "beforeend",
  ): Marko.MountedTemplate<typeof input>;

  api: "tags";
  _(): () => <__marko_internal_input extends unknown>(
    input: Marko.Directives &
      Input &
      Marko._.Relate<__marko_internal_input, Marko.Directives & Input>,
  ) => Marko._.ReturnWithScope<__marko_internal_input, void>;
}> {})();
