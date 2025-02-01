import FancyButton from "./components/fancy-button/index.marko";
import { get } from "@ebay/retriever";
/** Hi */ export interface Input {
  year: number;
  isSmartOnly: boolean;
  type: string;
  mobileList: Array<Mobile>;
  renderBody: Marko.Body;
}

function greet() {
  return "hello world";
}

var useA = true;
abstract class Component extends Marko.Component<Input> {}
export { type Component };
function __marko_internal_template(this: void) {
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
    import("../../../components/const/index.marko"),
  );
  Marko._.assertRendered(
    Marko._.rendered,
    1,
    Marko._.renderTemplate(__marko_internal_tag_1)()()({
      value: input,
    }),
  );
  const { year, isSmartOnly, type, mobileList, renderBody } =
    Marko._.rendered.returns[1].value;
  Marko._.renderNativeTag("div")()()({
    class: "mobiles__list",
    ["renderBody" /*div*/]: (() => {
      Marko._.renderNativeTag("p")()()({
        id: "p",
        ["renderBody" /*p*/]: (() => {
          year;
          return () => {
            return Marko._.voidReturn;
          };
        })(),
      });
      if (isSmartOnly) {
        Marko._.renderNativeTag("span")()()({
          class: "subnote",
          ["renderBody" /*span*/]: (() => {
            isSmartOnly;
            return () => {
              return Marko._.voidReturn;
            };
          })(),
        });
      }
      Marko._.renderNativeTag("span")()()({
        class: "subnote",
        ["renderBody" /*span*/]: (() => {
          type;
          return () => {
            return Marko._.voidReturn;
          };
        })(),
      });
      Marko._.forOfTag(
        {
          /*for*/ of: mobileList,
        },
        (mobile, i, all) => {
          Marko._.renderNativeTag("span")()()(
            //                          ^?
            {
              id: i,
              ["renderBody" /*span*/]: (() => {
                mobile;
                i;
                all.length;
                return () => {
                  return Marko._.voidReturn;
                };
              })(),
            },
          );
          return Marko._.voidReturn;
        },
      );
      Marko._.renderNativeTag("div")()()(
        //                 ^?        ^?
        {
          class: Marko._.interpolated`container`,
          ["renderBody" /*div*/]: (() => {
            const __marko_internal_tag_2 = renderBody;
            Marko._.renderDynamicTag(__marko_internal_tag_2)()()({
              /*renderBody*/
            });
            return () => {
              return Marko._.voidReturn;
            };
          })(),
        },
      );
      const __marko_internal_tag_3 = FancyButton;
      Marko._.renderDynamicTag(__marko_internal_tag_3)()()({
        something: true,
        ["renderBody" /*FancyButton*/]: (() => {
          type;
          return () => {
            return Marko._.voidReturn;
          };
        })(),
      });
      Marko._.renderNativeTag("div")()()({
        ["renderBody" /*div*/]: (() => {
          ("<b>World</b>");
          return () => {
            return Marko._.voidReturn;
          };
        })(),
      });
      Marko._.renderNativeTag("div")()()({
        ["renderBody" /*div*/]: (() => {
          Marko._.renderNativeTag("code")()()({
            ["renderBody" /*code*/]: (() => {
              return () => {
                return Marko._.voidReturn;
              };
            })(),
          });
          return () => {
            return Marko._.voidReturn;
          };
        })(),
      });
      return () => {
        return Marko._.voidReturn;
      };
    })(),
  });
  const __marko_internal_return = {
    return: Marko._.returnTag({
      value: 1,
    }),
  };
  return __marko_internal_return.return;
}
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
  ) => Marko._.ReturnWithScope<
    __marko_internal_input,
    typeof __marko_internal_template extends () => infer Return ? Return : never
  >;
}> {})();
