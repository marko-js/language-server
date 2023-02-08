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
export default Marko.ᜭ.instance(
  class extends Marko.ᜭ.Template<{
    /** Asynchronously render the template. */
    render(
      input: Marko.TemplateInput<Input>,
      stream?: {
        write: (chunk: string) => void;
        end: (chunk?: string) => void;
      }
    ): Marko.Out<Component>;

    /** Synchronously render the template. */
    renderSync(
      input: Marko.TemplateInput<Input>
    ): Marko.RenderResult<Component>;

    /** Synchronously render a template to a string. */
    renderToString(input: Marko.TemplateInput<Input>): string;

    /** Render a template and return a stream.Readable in nodejs or a ReadableStream in a web worker environment. */
    stream(
      input: Marko.TemplateInput<Input>
    ): ReadableStream<string> & NodeJS.ReadableStream;
  }>() {
    /**
     * @internal
     * Do not use or you will be fired.
     */
    public ᜭ<ᜭ = unknown>(input: Marko.ᜭ.Relate<Input, ᜭ>) {
      return Marko.ᜭ.returnWithScope(input as any as ᜭ, this.#ᜭ());
    }
    #ᜭ() {
      const input = 1 as unknown as Input;
      const component = Marko.ᜭ.instance(Component);
      const out = 1 as unknown as Marko.Out;
      const state = Marko.ᜭ.state(component);
      Marko.ᜭ.noop({ input, out, component, state });
      return (function (this: void) {
        Marko.ᜭ.assertRendered(
          Marko.ᜭ.rendered,
          1,
          Marko.ᜭ.renderTemplate(import("../../components/const/index.marko"))({
            /*const*/
            value: input,
          })
        );
        const {
          value: { year, isSmartOnly, type, mobileList, renderBody },
        } = Marko.ᜭ.rendered.returns[1];
        Marko.ᜭ.renderNativeTag("div")({
          /*div*/
          class: "mobiles__list",
          /*div*/
          ["renderBody"]: Marko.ᜭ.inlineBody(
            (() => {
              Marko.ᜭ.renderNativeTag("p")({
                /*p*/
                id: "p",
                /*p*/
                ["renderBody"]: Marko.ᜭ.inlineBody(
                  (() => {
                    year;
                  })()
                ),
              });
              if (isSmartOnly) {
                Marko.ᜭ.renderNativeTag("span")({
                  /*span*/
                  class: "subnote",
                  /*span*/
                  ["renderBody"]: Marko.ᜭ.inlineBody(
                    (() => {
                      isSmartOnly;
                    })()
                  ),
                });
              }
              Marko.ᜭ.renderNativeTag("span")({
                /*span*/
                class: "subnote",
                /*span*/
                ["renderBody"]: Marko.ᜭ.inlineBody(
                  (() => {
                    type;
                  })()
                ),
              });
              Marko.ᜭ.forTag({
                of: mobileList,
                [/*for*/ "renderBody"]: Marko.ᜭ.body(function* (
                  mobile,
                  i,
                  all
                ) {
                  Marko.ᜭ.renderNativeTag("span")({
                    /*span*/
                    id: i,
                    /*span*/
                    ["renderBody"]: Marko.ᜭ.inlineBody(
                      (() => {
                        mobile;
                        i;
                        all.length;
                      })()
                    ),
                  });
                }),
              });
              Marko.ᜭ.renderNativeTag("div")({
                /*div*/
                class: `container`,
                /*div*/
                ["renderBody"]: Marko.ᜭ.inlineBody(
                  (() => {
                    Marko.ᜭ.renderDynamicTag(renderBody)({
                      /*renderBody*/
                    });
                  })()
                ),
              });
              Marko.ᜭ.renderDynamicTag(fancyButton)({
                /*fancyButton*/
                something: true,
                /*fancyButton*/
                ["renderBody"]: Marko.ᜭ.inlineBody(
                  (() => {
                    type;
                  })()
                ),
              });
              Marko.ᜭ.renderNativeTag("div")({
                /*div*/
                /*div*/
                ["renderBody"]: Marko.ᜭ.inlineBody(
                  (() => {
                    ("<b>World</b>");
                  })()
                ),
              });
              Marko.ᜭ.renderNativeTag("div")({
                /*div*/
                /*div*/
                ["renderBody"]: Marko.ᜭ.inlineBody(
                  (() => {
                    Marko.ᜭ.renderNativeTag("code")({
                      /*code*/
                      /*code*/
                      ["renderBody"]: Marko.ᜭ.inlineBody((() => {})()),
                    });
                  })()
                ),
              });
            })()
          ),
        });
        const ᜭ = {
          return: Marko.ᜭ.returnTag({
            /*return*/
            value: 1,
          }),
        };
        return ᜭ.return;
      })();
    }
  }
);
