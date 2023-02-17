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
    /*div*/
    class: "mobiles__list",
    onClick: component["handleClick"],
    /*div*/
    ["renderBody"]: (() => {
      Marko._.renderNativeTag("p")()()({
        /*p*/
        id: "p",
        /*p*/
        ["renderBody"]: (() => {
          year;
          return () => {
            return Marko._.voidReturn;
          };
        })(),
      });
      if (isSmartOnly) {
        Marko._.renderNativeTag("span")()()({
          /*span*/
          class: "subnote",
          /*span*/
          ["renderBody"]: (() => {
            isSmartOnly;
            return () => {
              return Marko._.voidReturn;
            };
          })(),
        });
      }
      Marko._.renderNativeTag("span")()()({
        /*span*/
        class: "subnote",
        /*span*/
        ["renderBody"]: (() => {
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
        [/*for*/ "renderBody"]: (mobile, i, all) => {
          Marko._.renderNativeTag("span")()()({
            /*span*/
            id: i,
            /*span*/
            ["renderBody"]: (() => {
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
        /*div*/
        class: `container`,
        /*div*/
        ["renderBody"]: (() => {
          Marko._.renderDynamicTag(input.renderBody)()()({
            /*input.renderBody*/
          });
          return () => {
            return Marko._.voidReturn;
          };
        })(),
      });
      Marko._.renderDynamicTag(fancyButton)()()({
        /*fancyButton*/
        something: true,
        /*fancyButton*/
        ["renderBody"]: (() => {
          type;
          return () => {
            return Marko._.voidReturn;
          };
        })(),
      });
      Marko._.renderNativeTag("div")()()({
        /*div*/
        /*div*/
        ["renderBody"]: (() => {
          ("<b>World</b>");
          return () => {
            return Marko._.voidReturn;
          };
        })(),
      });
      Marko._.renderNativeTag("div")()()({
        /*div*/
        /*div*/
        ["renderBody"]: (() => {
          Marko._.renderNativeTag("code")()()({
            /*code*/
            /*code*/
            ["renderBody"]: (() => {
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

  _(): () => <__marko_internal_input>(
    input: Input & Marko._.Relate<__marko_internal_input, Input>
  ) => Marko._.ReturnWithScope<
    __marko_internal_input,
    ReturnType<typeof __marko_internal_template>
  >;
}> {})();
