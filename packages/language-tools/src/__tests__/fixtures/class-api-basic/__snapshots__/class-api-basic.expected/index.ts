import "@marko/language-tools/script.internals";
import "../../lib-fixtures/marko.d.ts";
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
  Marko._.renderNativeTag("div")({
    /*div*/
    class: "mobiles__list",
    onClick: Marko._.bind(component, "handleClick"),
    /*div*/
    ["renderBody"]: Marko._.inlineBody(
      (() => {
        Marko._.renderNativeTag("p")({
          /*p*/
          id: "p",
          /*p*/
          ["renderBody"]: Marko._.inlineBody(
            (() => {
              year;
            })()
          ),
        });
        if (isSmartOnly) {
          Marko._.renderNativeTag("span")({
            /*span*/
            class: "subnote",
            /*span*/
            ["renderBody"]: Marko._.inlineBody(
              (() => {
                isSmartOnly;
              })()
            ),
          });
        }
        Marko._.renderNativeTag("span")({
          /*span*/
          class: "subnote",
          /*span*/
          ["renderBody"]: Marko._.inlineBody(
            (() => {
              type;
            })()
          ),
        });

        const mobiles: Array<Mobile> = component.input.mobileList;
        mobiles.forEach((mobile: Mobile) => {
          console.log(mobile.brandName);
        });
        Marko._.forTag({
          of: mobiles,
          [/*for*/ "renderBody"]: Marko._.body(function* (mobile, i, all) {
            Marko._.renderNativeTag("span")({
              /*span*/
              id: i,
              /*span*/
              ["renderBody"]: Marko._.inlineBody(
                (() => {
                  mobile;
                  i;
                  all.length;
                })()
              ),
            });
          }),
        });
        Marko._.renderNativeTag("div")({
          /*div*/
          class: `container`,
          /*div*/
          ["renderBody"]: Marko._.inlineBody(
            (() => {
              Marko._.renderDynamicTag(input.renderBody)({
                /*input.renderBody*/
              });
            })()
          ),
        });
        Marko._.renderDynamicTag(fancyButton)({
          /*fancyButton*/
          something: true,
          /*fancyButton*/
          ["renderBody"]: Marko._.inlineBody(
            (() => {
              type;
            })()
          ),
        });
        Marko._.renderNativeTag("div")({
          /*div*/
          /*div*/
          ["renderBody"]: Marko._.inlineBody(
            (() => {
              ("<b>World</b>");
            })()
          ),
        });
        Marko._.renderNativeTag("div")({
          /*div*/
          /*div*/
          ["renderBody"]: Marko._.inlineBody(
            (() => {
              Marko._.renderNativeTag("code")({
                /*code*/
                /*code*/
                ["renderBody"]: Marko._.inlineBody((() => {})()),
              });
            })()
          ),
        });
        Marko._.renderDynamicTag(missing)({
          /*missing*/
        });
        Marko._.missingTag({
          /*complex-missing*/
        });
      })()
    ),
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

  _<__marko_internal_input = unknown>(
    input: Marko._.Relate<Input, __marko_internal_input>
  ): Marko._.ReturnWithScope<
    __marko_internal_input,
    ReturnType<typeof __marko_internal_template>
  >;
}> {})();
