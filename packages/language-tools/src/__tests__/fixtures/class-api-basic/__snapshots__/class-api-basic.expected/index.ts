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
type Mobile = {
  brandName: string;
};
abstract class Component extends Marko.Component<Input> {
  declare state: {
    something: boolean;
  };
  onMount() {
    console.log("mounted");
  }
  handleClick(ev: MouseEvent) {
    console.log("clicked");
  }
}
export { type Component };
function __marko_internal_template(this: void) {
  const input = 1 as any as Input;
  const component = 1 as any as Component;
  const out = Marko._.out;
  const state = Marko._.state(component);
  Marko._.noop({ input, out, component, state });
  const person = {
    name: "Frank",
    age: 32,
  };

  const year: number = input.year;
  const isSmartOnly: boolean = input.isSmartOnly;
  const type: string = component.input.type;

  const mobiles: Array<Mobile> = component.input.mobileList;

  mobiles.forEach((mobile: Mobile) => {
    console.log(mobile.brandName);
  });
  Marko._.renderNativeTag("div")()()({
    class: "mobiles__list",
    onClick: component.handleClick,
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

      const mobiles: Array<Mobile> = component.input.mobileList;
      mobiles.forEach((mobile: Mobile) => {
        console.log(mobile.brandName);
      });
      Marko._.forTag({
        of: mobiles,
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
          Marko._.renderDynamicTag(input.renderBody)()()({
            /*{input.renderBody}*/
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
      Marko._.renderDynamicTag(missing)()()({
        /*missing*/
      });
      Marko._.missingTag()()({
        /*complex-missing*/
      });
      return () => {
        return Marko._.voidReturn;
      };
    })(),
  });
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

  _(): () => <__marko_internal_input extends unknown>(
    input: Input & Marko._.Relate<__marko_internal_input, Input>
  ) => Marko._.ReturnWithScope<
    __marko_internal_input,
    ReturnType<typeof __marko_internal_template>
  >;
}> {})();
