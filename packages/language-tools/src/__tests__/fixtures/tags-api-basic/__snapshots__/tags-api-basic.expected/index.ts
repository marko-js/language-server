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
class Component extends Marko.Component<Input> {}
export { type Component };
export default Marko.ᜭ.instance(
  class extends Marko.Template {
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
          (
            1 as any as Marko.ᜭ.CustomTagRenderer<
              typeof import("../../components/const/index.marko").default
            >
          )({
            /*const*/
            value: input,
          })
        );
        const {
          value: { year, isSmartOnly, type, mobileList, renderBody },
        } = Marko.ᜭ.rendered.returns[1];
        (1 as any as Marko.ᜭ.NativeTagRenderer<"div">)({
          /*div*/
          class: "mobiles__list",
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
              Marko.ᜭ.forTag({
                of: mobileList,
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
                    Marko.ᜭ.render(renderBody)({
                      /*renderBody*/
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
