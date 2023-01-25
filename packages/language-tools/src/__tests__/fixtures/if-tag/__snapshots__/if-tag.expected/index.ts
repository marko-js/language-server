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
    ˍ.tags["let"]({
      /*let*/
      value: true,
    })
  );
  const { value: show } = Marko.ட.rendered.returns[1];
  Marko.ட.assertRendered(
    Marko.ட.rendered,
    2,
    ˍ.tags["let"]({
      /*let*/
      value: false,
    })
  );
  const { value: showAlt } = Marko.ட.rendered.returns[2];
  if (undefined) {
  }
  if (show) {
  }
  if (show) {
  }
  ˍ.tags["div"]({
    /*div*/
    /*div*/
    ["renderBody"]: Marko.ட.inlineBody(
      (() => {
        if (undefined) {
        }
      })()
    ),
  });
  if (show) {
  } else {
  }
  Marko.ட.assertRendered(
    Marko.ட.rendered,
    3,
    (() => {
      if (show) {
        Marko.ட.assertRendered(
          Marko.ட.rendered,
          4,
          ˍ.tags["const"]({
            /*const*/
            value: 0 as const,
          })
        );
        const { value: a } = Marko.ட.rendered.returns[4];
        return {
          scope: { a },
        };
      } else {
        return undefined;
      }
    })()
  );
  Marko.ட.assertRendered(
    Marko.ட.rendered,
    5,
    (() => {
      if (show) {
        Marko.ட.assertRendered(
          Marko.ட.rendered,
          6,
          ˍ.tags["const"]({
            /*const*/
            value: 1 as const,
          })
        );
        const { value: b } = Marko.ட.rendered.returns[6];
        return {
          scope: { b },
        };
      } else if (showAlt) {
        Marko.ட.assertRendered(
          Marko.ட.rendered,
          7,
          ˍ.tags["const"]({
            /*const*/
            value: 2 as const,
          })
        );
        const { value: c } = Marko.ட.rendered.returns[7];
        return {
          scope: { c },
        };
      } else {
        Marko.ட.assertRendered(
          Marko.ட.rendered,
          8,
          ˍ.tags["const"]({
            /*const*/
            value: 3 as const,
          })
        );
        const { value: d } = Marko.ட.rendered.returns[8];
        return {
          scope: { d },
        };
      }
    })()
  );
  Marko.ட.assertRendered(
    Marko.ட.rendered,
    9,
    (() => {
      if (show) {
      } else {
        Marko.ட.assertRendered(
          Marko.ட.rendered,
          10,
          ˍ.tags["const"]({
            /*const*/
            value: 4 as const,
          })
        );
        const { value: e } = Marko.ட.rendered.returns[10];
        return {
          scope: { e },
        };
      }
    })()
  );
  Marko.ட.assertRendered(
    Marko.ட.rendered,
    11,
    (() => {
      if (show) {
      } else if (showAlt) {
      } else {
        Marko.ட.assertRendered(
          Marko.ட.rendered,
          12,
          ˍ.tags["const"]({
            /*const*/
            value: 4 as const,
          })
        );
        const { value: f } = Marko.ட.rendered.returns[12];
        return {
          scope: { f },
        };
      }
    })()
  );
  Marko.ட.assertRendered(
    Marko.ட.rendered,
    13,
    (() => {
      if (show) {
        Marko.ட.assertRendered(
          Marko.ட.rendered,
          14,
          ˍ.tags["const"]({
            /*const*/
            value: 5 as const,
          })
        );
        const { value: g } = Marko.ட.rendered.returns[14];
        return {
          scope: { g },
        };
      } else {
        Marko.ட.assertRendered(
          Marko.ட.rendered,
          15,
          ˍ.tags["const"]({
            /*const*/
            value: 6 as const,
          })
        );
        const { value: g } = Marko.ட.rendered.returns[15];
        return {
          scope: { g },
        };
      }
    })()
  );
  if (show) {
  } else if (undefined) {
  }
  Marko.ட.render(effect)({
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
  const { a, b, c, d, e, f, g } = Marko.ட.readScopes(Marko.ட.rendered);
  Marko.ட.noop({ a, b, c, d, e, f, g });
  return;
}
class ட extends Marko.Component<Input> {}
declare namespace ˍ {
  const id: unique symbol;
  const template: Marko.Template<typeof id>;
  const tags: {
    let: Marko.ட.CustomTagRenderer<
      typeof import("../../components/let/index.marko").default
    >;
    div: Marko.ட.NativeTagRenderer<"div">;
    const: Marko.ட.CustomTagRenderer<
      typeof import("../../components/const/index.marko").default
    >;
  };
}
export default 1 as unknown as typeof ˍ.template;
declare global {
  namespace Marko {
    interface CustomTags {
      [ˍ.id]: CustomTag<Input, ReturnType<typeof ˍ>, ட>;
    }
  }
}
