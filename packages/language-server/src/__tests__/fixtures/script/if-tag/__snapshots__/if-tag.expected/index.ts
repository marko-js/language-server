export interface Input {}
abstract class Component extends Marko.Component<Input> {}
export { type Component };
(function (this: void) {
  const input = Marko._.any as Input;
  const component = Marko._.any as Component;
  const state = Marko._.state(component);
  const out = Marko._.out;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.getGlobal(
    // @ts-expect-error We expect the compiler to error because we are checking if the MarkoRun.Context is defined.
    (Marko._.error, Marko._.any as MarkoRun.Context),
  );
  Marko._.noop({ component, state, out, input, $global, $signal });
  const __marko_internal_tag_1 = Marko._.resolveTemplate(
    import("../../../components/let/index.marko"),
  );
  Marko._.assertRendered(
    Marko._.rendered,
    1,
    Marko._.renderTemplate(__marko_internal_tag_1)()()({
      value: true,
    }),
  );
  const show = Marko._.rendered.returns[1].value;
  const __marko_internal_tag_2 = Marko._.resolveTemplate(
    import("../../../components/let/index.marko"),
  );
  Marko._.assertRendered(
    Marko._.rendered,
    2,
    Marko._.renderTemplate(__marko_internal_tag_2)()()({
      value: false,
    }),
  );
  const showAlt = Marko._.rendered.returns[2].value;
  if (undefined) {
  }
  if (show) {
  }
  if (show) {
  }
  Marko._.renderNativeTag("div")()()({
    ["renderBody" /*div*/]: (() => {
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
  Marko._.assertRendered(
    Marko._.rendered,
    3,
    (() => {
      if (show) {
        const __marko_internal_tag_3 = Marko._.resolveTemplate(
          import("../../../components/const/index.marko"),
        );
        Marko._.assertRendered(
          Marko._.rendered,
          4,
          Marko._.renderTemplate(__marko_internal_tag_3)()()({
            value: 0 as const,
          }),
        );
        const a = Marko._.rendered.returns[4].value;
        return {
          scope: { a },
        };
      } else {
        return undefined;
      }
    })(),
  );
  Marko._.assertRendered(
    Marko._.rendered,
    5,
    (() => {
      if (show) {
        const __marko_internal_tag_4 = Marko._.resolveTemplate(
          import("../../../components/const/index.marko"),
        );
        Marko._.assertRendered(
          Marko._.rendered,
          6,
          Marko._.renderTemplate(__marko_internal_tag_4)()()({
            value: 1 as const,
          }),
        );
        const b = Marko._.rendered.returns[6].value;
        return {
          scope: { b },
        };
      } else if (showAlt) {
        const __marko_internal_tag_5 = Marko._.resolveTemplate(
          import("../../../components/const/index.marko"),
        );
        Marko._.assertRendered(
          Marko._.rendered,
          7,
          Marko._.renderTemplate(__marko_internal_tag_5)()()({
            value: 2 as const,
          }),
        );
        const c = Marko._.rendered.returns[7].value;
        return {
          scope: { c },
        };
      } else {
        const __marko_internal_tag_6 = Marko._.resolveTemplate(
          import("../../../components/const/index.marko"),
        );
        Marko._.assertRendered(
          Marko._.rendered,
          8,
          Marko._.renderTemplate(__marko_internal_tag_6)()()({
            value: 3 as const,
          }),
        );
        const d = Marko._.rendered.returns[8].value;
        return {
          scope: { d },
        };
      }
    })(),
  );
  Marko._.assertRendered(
    Marko._.rendered,
    9,
    (() => {
      if (show) {
      } else {
        const __marko_internal_tag_7 = Marko._.resolveTemplate(
          import("../../../components/const/index.marko"),
        );
        Marko._.assertRendered(
          Marko._.rendered,
          10,
          Marko._.renderTemplate(__marko_internal_tag_7)()()({
            value: 4 as const,
          }),
        );
        const e = Marko._.rendered.returns[10].value;
        return {
          scope: { e },
        };
      }
    })(),
  );
  Marko._.assertRendered(
    Marko._.rendered,
    11,
    (() => {
      if (show) {
      } else if (showAlt) {
      } else {
        const __marko_internal_tag_8 = Marko._.resolveTemplate(
          import("../../../components/const/index.marko"),
        );
        Marko._.assertRendered(
          Marko._.rendered,
          12,
          Marko._.renderTemplate(__marko_internal_tag_8)()()({
            value: 4 as const,
          }),
        );
        const f = Marko._.rendered.returns[12].value;
        return {
          scope: { f },
        };
      }
    })(),
  );
  Marko._.assertRendered(
    Marko._.rendered,
    13,
    (() => {
      if (show) {
        const __marko_internal_tag_9 = Marko._.resolveTemplate(
          import("../../../components/const/index.marko"),
        );
        Marko._.assertRendered(
          Marko._.rendered,
          14,
          Marko._.renderTemplate(__marko_internal_tag_9)()()({
            value: 5 as const,
          }),
        );
        const g = Marko._.rendered.returns[14].value;
        return {
          scope: { g },
        };
      } else {
        const __marko_internal_tag_10 = Marko._.resolveTemplate(
          import("../../../components/const/index.marko"),
        );
        Marko._.assertRendered(
          Marko._.rendered,
          15,
          Marko._.renderTemplate(__marko_internal_tag_10)()()({
            value: 6 as const,
          }),
        );
        const g = Marko._.rendered.returns[15].value;
        return {
          scope: { g },
        };
      }
    })(),
  );
  Marko._.assertRendered(
    Marko._.rendered,
    16,
    (() => {
      if (show) {
      } else if (showAlt) {
        if (show) {
        } else if (showAlt) {
          const __marko_internal_tag_11 = Marko._.resolveTemplate(
            import("../../../components/const/index.marko"),
          );
          Marko._.assertRendered(
            Marko._.rendered,
            17,
            Marko._.renderTemplate(__marko_internal_tag_11)()()({
              value: 7 as const,
            }),
          );
          const h = Marko._.rendered.returns[17].value;
          return {
            scope: { h },
          };
        } else {
          const __marko_internal_tag_12 = Marko._.resolveTemplate(
            import("../../../components/const/index.marko"),
          );
          Marko._.assertRendered(
            Marko._.rendered,
            18,
            Marko._.renderTemplate(__marko_internal_tag_12)()()({
              value: 8 as const,
            }),
          );
          const i = Marko._.rendered.returns[18].value;
          return {
            scope: { i },
          };
        }
      } else {
        return undefined;
      }
    })(),
  );
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
  const __marko_internal_tag_13 = Marko._.interpolated`effect`;
  Marko._.renderDynamicTag(__marko_internal_tag_13)()()({
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
  const { a, b, c, d, e, f, g, h, i } = Marko._.readScopes(Marko._.rendered);
  Marko._.noop({ a, b, c, d, e, f, g, h, i });
  return;
})();
export default new (class Template extends Marko._.Template<{
  render(
    input: Marko.TemplateInput<Input>,
    stream?: {
      write: (chunk: string) => void;
      end: (chunk?: string) => void;
    },
  ): Marko.Out<Component>;

  render(
    input: Marko.TemplateInput<Input>,
    cb?: (err: Error | null, result: Marko.RenderResult<Component>) => void,
  ): Marko.Out<Component>;

  renderSync(input: Marko.TemplateInput<Input>): Marko.RenderResult<Component>;

  renderToString(input: Marko.TemplateInput<Input>): string;

  stream(
    input: Marko.TemplateInput<Input>,
  ): ReadableStream<string> & NodeJS.ReadableStream;

  api: "class";
  _(): () => <__marko_internal_input extends unknown>(
    input: Marko.Directives &
      Input &
      Marko._.Relate<__marko_internal_input, Marko.Directives & Input>,
  ) => Marko._.ReturnWithScope<__marko_internal_input, void>;
}> {})();
