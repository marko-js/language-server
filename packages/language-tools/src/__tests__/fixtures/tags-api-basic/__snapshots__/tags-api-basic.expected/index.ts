import fancyButton from "./components/fancy-button/index.marko";
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
  const input = 1 as any as Input;
  const component = 1 as any as Component;
  const out = Marko._.out;
  const state = Marko._.state(component);
  Marko._.noop({ input, out, component, state });
  Marko._.assertRendered(
    Marko._.rendered,
    1,
    Marko._.renderTemplate(import("../../components/const/index.marko"))()()({
      value: input,
    })
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
      Marko._.forTag({
        of: mobileList,
        ["renderBody" /*for*/]: (mobile, i, all) => {
          Marko._.renderNativeTag("span")()()({
            id: i,
            ["renderBody" /*span*/]: (() => {
              mobile;
              i;
              all.length;
              return () => {
                return Marko._.voidReturn;
              };
            })(),
          });
          return Marko._.voidReturn;
        },
      });
      Marko._.renderNativeTag("div")()()({
        class: Marko._.interpolated`container`,
        ["renderBody" /*div*/]: (() => {
          Marko._.renderDynamicTag(renderBody)()()({
            /*renderBody*/
          });
          return () => {
            return Marko._.voidReturn;
          };
        })(),
      });
      Marko._.renderDynamicTag(fancyButton)()()({
        something: true,
        ["renderBody" /*fancyButton*/]: (() => {
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
    }
  ): Marko.Out<Component>;

  renderSync(input: Marko.TemplateInput<Input>): Marko.RenderResult<Component>;

  renderToString(input: Marko.TemplateInput<Input>): string;

  stream(
    input: Marko.TemplateInput<Input>
  ): ReadableStream<string> & NodeJS.ReadableStream;

  _(): () => <__marko_internal_input extends unknown>(
    input: Input & Marko._.Relate<__marko_internal_input, Input>
  ) => Marko._.ReturnWithScope<
    __marko_internal_input,
    ReturnType<typeof __marko_internal_template>
  >;
}> {})();
