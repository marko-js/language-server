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
  const __marko_internal_tag_1 = Marko._.resolveTemplate(
    import("../../../components/let/index.marko"),
  );
  const __marko_internal_rendered_1 = Marko._.renderTemplate(
    __marko_internal_tag_1,
  )()()({
    value: true,
  });
  const show = __marko_internal_rendered_1.return.value;
  const __marko_internal_tag_2 = Marko._.resolveTemplate(
    import("../../../components/let/index.marko"),
  );
  const __marko_internal_rendered_2 = Marko._.renderTemplate(
    __marko_internal_tag_2,
  )()()({
    value: false,
  });
  const showAlt = __marko_internal_rendered_2.return.value;
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
  const __marko_internal_rendered_3 = (() => {
    if (show) {
      const __marko_internal_tag_3 = Marko._.resolveTemplate(
        import("../../../components/const/index.marko"),
      );
      const __marko_internal_rendered_4 = Marko._.renderTemplate(
        __marko_internal_tag_3,
      )()()({
        value: 0 as const,
      });
      const a = __marko_internal_rendered_4.return.value;
      return {
        scope: { a },
      };
    } else {
      return undefined;
    }
  })();
  const __marko_internal_rendered_5 = (() => {
    if (show) {
      const __marko_internal_tag_4 = Marko._.resolveTemplate(
        import("../../../components/const/index.marko"),
      );
      const __marko_internal_rendered_6 = Marko._.renderTemplate(
        __marko_internal_tag_4,
      )()()({
        value: 1 as const,
      });
      const b = __marko_internal_rendered_6.return.value;
      return {
        scope: { b },
      };
    } else if (showAlt) {
      const __marko_internal_tag_5 = Marko._.resolveTemplate(
        import("../../../components/const/index.marko"),
      );
      const __marko_internal_rendered_7 = Marko._.renderTemplate(
        __marko_internal_tag_5,
      )()()({
        value: 2 as const,
      });
      const c = __marko_internal_rendered_7.return.value;
      return {
        scope: { c },
      };
    } else {
      const __marko_internal_tag_6 = Marko._.resolveTemplate(
        import("../../../components/const/index.marko"),
      );
      const __marko_internal_rendered_8 = Marko._.renderTemplate(
        __marko_internal_tag_6,
      )()()({
        value: 3 as const,
      });
      const d = __marko_internal_rendered_8.return.value;
      return {
        scope: { d },
      };
    }
  })();
  const __marko_internal_rendered_9 = (() => {
    if (show) {
    } else {
      const __marko_internal_tag_7 = Marko._.resolveTemplate(
        import("../../../components/const/index.marko"),
      );
      const __marko_internal_rendered_10 = Marko._.renderTemplate(
        __marko_internal_tag_7,
      )()()({
        value: 4 as const,
      });
      const e = __marko_internal_rendered_10.return.value;
      return {
        scope: { e },
      };
    }
  })();
  const __marko_internal_rendered_11 = (() => {
    if (show) {
    } else if (showAlt) {
    } else {
      const __marko_internal_tag_8 = Marko._.resolveTemplate(
        import("../../../components/const/index.marko"),
      );
      const __marko_internal_rendered_12 = Marko._.renderTemplate(
        __marko_internal_tag_8,
      )()()({
        value: 4 as const,
      });
      const f = __marko_internal_rendered_12.return.value;
      return {
        scope: { f },
      };
    }
  })();
  const __marko_internal_rendered_13 = (() => {
    if (show) {
      const __marko_internal_tag_9 = Marko._.resolveTemplate(
        import("../../../components/const/index.marko"),
      );
      const __marko_internal_rendered_14 = Marko._.renderTemplate(
        __marko_internal_tag_9,
      )()()({
        value: 5 as const,
      });
      const g = __marko_internal_rendered_14.return.value;
      return {
        scope: { g },
      };
    } else {
      const __marko_internal_tag_10 = Marko._.resolveTemplate(
        import("../../../components/const/index.marko"),
      );
      const __marko_internal_rendered_15 = Marko._.renderTemplate(
        __marko_internal_tag_10,
      )()()({
        value: 6 as const,
      });
      const g = __marko_internal_rendered_15.return.value;
      return {
        scope: { g },
      };
    }
  })();
  const __marko_internal_rendered_16 = (() => {
    if (show) {
    } else if (showAlt) {
      if (show) {
      } else if (showAlt) {
        const __marko_internal_tag_11 = Marko._.resolveTemplate(
          import("../../../components/const/index.marko"),
        );
        const __marko_internal_rendered_17 = Marko._.renderTemplate(
          __marko_internal_tag_11,
        )()()({
          value: 7 as const,
        });
        const h = __marko_internal_rendered_17.return.value;
        return {
          scope: { h },
        };
      } else {
        const __marko_internal_tag_12 = Marko._.resolveTemplate(
          import("../../../components/const/index.marko"),
        );
        const __marko_internal_rendered_18 = Marko._.renderTemplate(
          __marko_internal_tag_12,
        )()()({
          value: 8 as const,
        });
        const i = __marko_internal_rendered_18.return.value;
        return {
          scope: { i },
        };
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
  const { a, b, c, d, e, f, g, h, i } = Marko._.readScopes({
    __marko_internal_rendered_3,
    __marko_internal_rendered_5,
    __marko_internal_rendered_9,
    __marko_internal_rendered_11,
    __marko_internal_rendered_13,
    __marko_internal_rendered_16,
  });
  Marko._.noop({
    a,
    b,
    c,
    d,
    e,
    f,
    g,
    h,
    i,
    component,
    state,
    out,
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

  mount(
    input: Marko.TemplateInput<Input>,
    reference: Node,
    position?: "afterbegin" | "afterend" | "beforebegin" | "beforeend",
  ): Marko.MountedTemplate<typeof input>;

  api: "class";
  _(): () => <__marko_internal_input extends unknown>(
    input: Marko.Directives &
      Input &
      Marko._.Relate<__marko_internal_input, Marko.Directives & Input>,
  ) => Marko._.ReturnWithScope<__marko_internal_input, void>;
}> {})();
