let label: string | undefined = "a";
const fixedLabel: string | undefined = "a";
export function clearLabel() {
  label = undefined;
}
export interface Input {}
export default Marko._.template((input: Input) => {
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
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
  {
    const show = Marko._.returned(() => __marko_internal_rendered_1);
    const __marko_internal_rendered_1 = __marko_internal_module_1().default._({
      value: true,
    });
    {
      const showAlt = Marko._.returned(() => __marko_internal_rendered_2);
      const __marko_internal_rendered_2 = __marko_internal_module_1().default._(
        {
          value: false,
        },
      );
      if (undefined) {
      }
      if (show) {
      }
      if (show) {
      }
      Marko._.renderNativeTag("div")({
        [Marko._.content]: (() => {
          if (undefined) {
          }
          return Marko._.voidBody;
        })(),
      });
      if (show) {
      } else {
      }
      const __marko_internal_rendered_3 = (() => {
        if (show) {
          {
            const a = Marko._.returned(() => __marko_internal_rendered_4);
            const __marko_internal_rendered_4 =
              __marko_internal_module_2().default._({
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
          {
            const b = Marko._.returned(() => __marko_internal_rendered_6);
            const __marko_internal_rendered_6 =
              __marko_internal_module_2().default._({
                value: () => 1 as const,
              });
            return {
              scope: { b },
            };
          }
        } else if (showAlt) {
          {
            const c = Marko._.returned(() => __marko_internal_rendered_7);
            const __marko_internal_rendered_7 =
              __marko_internal_module_2().default._({
                value: () => 2 as const,
              });
            return {
              scope: { c },
            };
          }
        } else {
          {
            const d = Marko._.returned(() => __marko_internal_rendered_8);
            const __marko_internal_rendered_8 =
              __marko_internal_module_2().default._({
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
          {
            const e = Marko._.returned(() => __marko_internal_rendered_10);
            const __marko_internal_rendered_10 =
              __marko_internal_module_2().default._({
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
          {
            const f = Marko._.returned(() => __marko_internal_rendered_12);
            const __marko_internal_rendered_12 =
              __marko_internal_module_2().default._({
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
          {
            const g = Marko._.returned(() => __marko_internal_rendered_14);
            const __marko_internal_rendered_14 =
              __marko_internal_module_2().default._({
                value: () => 5 as const,
              });
            return {
              scope: { g },
            };
          }
        } else {
          {
            const g = Marko._.returned(() => __marko_internal_rendered_15);
            const __marko_internal_rendered_15 =
              __marko_internal_module_2().default._({
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
            {
              const h = Marko._.returned(() => __marko_internal_rendered_17);
              const __marko_internal_rendered_17 =
                __marko_internal_module_2().default._({
                  value: () => 7 as const,
                });
              return {
                scope: { h },
              };
            }
          } else {
            {
              const i = Marko._.returned(() => __marko_internal_rendered_18);
              const __marko_internal_rendered_18 =
                __marko_internal_module_2().default._({
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
      __marko_internal_module_3().default._({
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
      // Static code runs once, before the template's code (which runs at each
      // render, after `clearLabel` may have): `label` is not narrowed there, a
      // `const` is.
      if (true) {
        [label.length];
        [fixedLabel.length];
      }
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
      } = Marko._.hoisted(
        Marko._.readScopes({
          __marko_internal_rendered_3,
          __marko_internal_rendered_5,
          __marko_internal_rendered_9,
          __marko_internal_rendered_11,
          __marko_internal_rendered_13,
          __marko_internal_rendered_16,
        }),
      );
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
});
declare function __marko_internal_module_1(): typeof import("@marko/runtime-tags/tags/let.d.marko");
declare function __marko_internal_module_2(): typeof import("@marko/runtime-tags/tags/const.d.marko");
declare function __marko_internal_module_3(): typeof import("@marko/runtime-tags/tags/effect.d.marko");
