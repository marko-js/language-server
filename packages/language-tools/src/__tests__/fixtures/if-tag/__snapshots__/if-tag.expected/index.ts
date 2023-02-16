export interface Input {}
abstract class Component extends Marko.Component<Input> {}
export { type Component };
function __marko_internal_template(this: void) {
  const input = 1 as any as Input;
  const component = 1 as any as Component;
  const out = Marko._.out;
  const state = Marko._.state(component);
  Marko._.noop({ input, out, component, state });
  Marko._.assertRendered(
    Marko._.rendered,
    1,
    Marko._.renderTemplate(import("../../components/let/index.marko"))()()({
      /*let*/
      value: true,
    })
  );
  const show = Marko._.rendered.returns[1].value;
  Marko._.assertRendered(
    Marko._.rendered,
    2,
    Marko._.renderTemplate(import("../../components/let/index.marko"))()()({
      /*let*/
      value: false,
    })
  );
  const showAlt = Marko._.rendered.returns[2].value;
  if (undefined) {
  }
  if (show) {
  }
  if (show) {
  }
  Marko._.renderNativeTag("div")()()({
    /*div*/
    /*div*/
    ["renderBody"]: (() => {
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
        Marko._.assertRendered(
          Marko._.rendered,
          4,
          Marko._.renderTemplate(
            import("../../components/const/index.marko")
          )()()({
            /*const*/
            value: 0 as const,
          })
        );
        const a = Marko._.rendered.returns[4].value;
        return {
          scope: { a },
        };
      } else {
        return undefined;
      }
    })()
  );
  Marko._.assertRendered(
    Marko._.rendered,
    5,
    (() => {
      if (show) {
        Marko._.assertRendered(
          Marko._.rendered,
          6,
          Marko._.renderTemplate(
            import("../../components/const/index.marko")
          )()()({
            /*const*/
            value: 1 as const,
          })
        );
        const b = Marko._.rendered.returns[6].value;
        return {
          scope: { b },
        };
      } else if (showAlt) {
        Marko._.assertRendered(
          Marko._.rendered,
          7,
          Marko._.renderTemplate(
            import("../../components/const/index.marko")
          )()()({
            /*const*/
            value: 2 as const,
          })
        );
        const c = Marko._.rendered.returns[7].value;
        return {
          scope: { c },
        };
      } else {
        Marko._.assertRendered(
          Marko._.rendered,
          8,
          Marko._.renderTemplate(
            import("../../components/const/index.marko")
          )()()({
            /*const*/
            value: 3 as const,
          })
        );
        const d = Marko._.rendered.returns[8].value;
        return {
          scope: { d },
        };
      }
    })()
  );
  Marko._.assertRendered(
    Marko._.rendered,
    9,
    (() => {
      if (show) {
      } else {
        Marko._.assertRendered(
          Marko._.rendered,
          10,
          Marko._.renderTemplate(
            import("../../components/const/index.marko")
          )()()({
            /*const*/
            value: 4 as const,
          })
        );
        const e = Marko._.rendered.returns[10].value;
        return {
          scope: { e },
        };
      }
    })()
  );
  Marko._.assertRendered(
    Marko._.rendered,
    11,
    (() => {
      if (show) {
      } else if (showAlt) {
      } else {
        Marko._.assertRendered(
          Marko._.rendered,
          12,
          Marko._.renderTemplate(
            import("../../components/const/index.marko")
          )()()({
            /*const*/
            value: 4 as const,
          })
        );
        const f = Marko._.rendered.returns[12].value;
        return {
          scope: { f },
        };
      }
    })()
  );
  Marko._.assertRendered(
    Marko._.rendered,
    13,
    (() => {
      if (show) {
        Marko._.assertRendered(
          Marko._.rendered,
          14,
          Marko._.renderTemplate(
            import("../../components/const/index.marko")
          )()()({
            /*const*/
            value: 5 as const,
          })
        );
        const g = Marko._.rendered.returns[14].value;
        return {
          scope: { g },
        };
      } else {
        Marko._.assertRendered(
          Marko._.rendered,
          15,
          Marko._.renderTemplate(
            import("../../components/const/index.marko")
          )()()({
            /*const*/
            value: 6 as const,
          })
        );
        const g = Marko._.rendered.returns[15].value;
        return {
          scope: { g },
        };
      }
    })()
  );
  if (show) {
  } else if (undefined) {
  }
  Marko._.renderDynamicTag(effect)()()({
    /*effect*/
    value() {
      a;
      b;
      c;
      d;
      e;
      f;
      g;
    },
  });
  const { a, b, c, d, e, f, g } = Marko._.readScopes(Marko._.rendered);
  Marko._.noop({ a, b, c, d, e, f, g });
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

  _<__marko_internal_apply>(): __marko_internal_apply extends 0
    ? () => <__marko_internal_input>(
        input: Marko._.Matches<Input, __marko_internal_input>
      ) => Marko._.ReturnWithScope<
        __marko_internal_input,
        ReturnType<typeof __marko_internal_template>
      >
    : () => <__marko_internal_input>(
        input: Marko._.Matches<Input, __marko_internal_input>
      ) => Marko._.ReturnWithScope<
        __marko_internal_input,
        ReturnType<typeof __marko_internal_template>
      >;
}> {})();
