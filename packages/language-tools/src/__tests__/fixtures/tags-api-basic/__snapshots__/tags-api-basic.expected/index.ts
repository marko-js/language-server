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
    Marko._.renderTemplate(import("../../components/const/index.marko"))({
      /*const*/
      value: input,
    })
  );
  const {
    value: { year, isSmartOnly, type, mobileList, renderBody },
  } = Marko._.rendered.returns[1];
  Marko._.renderNativeTag("div")({
    /*div*/
    class: "mobiles__list",
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
        Marko._.forTag({
          of: mobileList,
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
              Marko._.renderDynamicTag(renderBody)({
                /*renderBody*/
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
      })()
    ),
  });
  const __marko_internal_return = {
    return: Marko._.returnTag({
      /*return*/
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

  _<__marko_internal_input = unknown>(
    input: Marko._.Relate<Input, __marko_internal_input>
  ): Marko._.ReturnWithScope<
    __marko_internal_input,
    ReturnType<typeof __marko_internal_template>
  >;
}> {})();
