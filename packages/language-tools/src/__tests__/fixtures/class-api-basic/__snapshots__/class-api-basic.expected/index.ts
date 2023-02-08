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
        (1 as any as Marko.ᜭ.NativeTagRenderer<"div">)({
          /*div*/
          class: "mobiles__list",
          onClick: Marko.ᜭ.bind(component, "handleClick"),
          /*div*/
          ["renderBody"]: Marko.ᜭ.inlineBody(
            (() => {
              (1 as any as Marko.ᜭ.NativeTagRenderer<"p">)({
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
                (1 as any as Marko.ᜭ.NativeTagRenderer<"span">)({
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
              (1 as any as Marko.ᜭ.NativeTagRenderer<"span">)({
                /*span*/
                class: "subnote",
                /*span*/
                ["renderBody"]: Marko.ᜭ.inlineBody(
                  (() => {
                    type;
                  })()
                ),
              });

              const mobiles: Array<Mobile> = component.input.mobileList;
              mobiles.forEach((mobile: Mobile) => {
                console.log(mobile.brandName);
              });
              Marko.ᜭ.forTag({
                of: mobiles,
                [/*for*/ "renderBody"]: Marko.ᜭ.body(function* (
                  mobile,
                  i,
                  all
                ) {
                  (1 as any as Marko.ᜭ.NativeTagRenderer<"span">)({
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
              (1 as any as Marko.ᜭ.NativeTagRenderer<"div">)({
                /*div*/
                class: `container`,
                /*div*/
                ["renderBody"]: Marko.ᜭ.inlineBody(
                  (() => {
                    Marko.ᜭ.render(input.renderBody)({
                      /*input.renderBody*/
                    });
                  })()
                ),
              });
              Marko.ᜭ.render(fancyButton)({
                /*fancyButton*/
                something: true,
                /*fancyButton*/
                ["renderBody"]: Marko.ᜭ.inlineBody(
                  (() => {
                    type;
                  })()
                ),
              });
              (1 as any as Marko.ᜭ.NativeTagRenderer<"div">)({
                /*div*/
                /*div*/
                ["renderBody"]: Marko.ᜭ.inlineBody(
                  (() => {
                    ("<b>World</b>");
                  })()
                ),
              });
              (1 as any as Marko.ᜭ.NativeTagRenderer<"div">)({
                /*div*/
                /*div*/
                ["renderBody"]: Marko.ᜭ.inlineBody(
                  (() => {
                    (1 as any as Marko.ᜭ.NativeTagRenderer<"code">)({
                      /*code*/
                      /*code*/
                      ["renderBody"]: Marko.ᜭ.inlineBody((() => {})()),
                    });
                  })()
                ),
              });
              Marko.ᜭ.render(missing)({
                /*missing*/
              });
              Marko.ᜭ.render(1 as unknown)({
                /*complex-missing*/
              });
            })()
          ),
        });
        return;
      })();
    }
  }
);
