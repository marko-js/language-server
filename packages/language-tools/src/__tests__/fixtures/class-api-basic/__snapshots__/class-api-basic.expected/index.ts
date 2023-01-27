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
function ˍ(input: Input) {
  const out = 1 as unknown as Marko.Out;
  const component = 1 as unknown as ட;
  const state = 1 as unknown as typeof component extends {
    state: infer State extends object;
  }
    ? State
    : never;
  Marko.ட.noop({ input, out, component, state });
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
  ˍ.tags["div"]({
    /*div*/
    class: "mobiles__list",
    onClick: Marko.ட.bind(component, "handleClick"),
    /*div*/
    ["renderBody"]: Marko.ட.inlineBody(
      (() => {
        ˍ.tags["p"]({
          /*p*/
          id: "p",
          /*p*/
          ["renderBody"]: Marko.ட.inlineBody(
            (() => {
              year;
            })()
          ),
        });
        if (isSmartOnly) {
          ˍ.tags["span"]({
            /*span*/
            class: "subnote",
            /*span*/
            ["renderBody"]: Marko.ட.inlineBody(
              (() => {
                isSmartOnly;
              })()
            ),
          });
        }
        ˍ.tags["span"]({
          /*span*/
          class: "subnote",
          /*span*/
          ["renderBody"]: Marko.ட.inlineBody(
            (() => {
              type;
            })()
          ),
        });

        const mobiles: Array<Mobile> = component.input.mobileList;
        mobiles.forEach((mobile: Mobile) => {
          console.log(mobile.brandName);
        });
        Marko.ட.forTag({
          of: mobiles,
          [/*for*/ "renderBody"]: Marko.ட.body(function* (mobile, i, all) {
            ˍ.tags["span"]({
              /*span*/
              id: i,
              /*span*/
              ["renderBody"]: Marko.ட.inlineBody(
                (() => {
                  mobile;
                  i;
                  all.length;
                })()
              ),
            });
          }),
        });
        ˍ.tags["div"]({
          /*div*/
          class: `container`,
          /*div*/
          ["renderBody"]: Marko.ட.inlineBody(
            (() => {
              Marko.ட.render(input.renderBody)({
                /*input.renderBody*/
              });
            })()
          ),
        });
        Marko.ட.render(fancyButton)({
          /*fancyButton*/
          something: true,
          /*fancyButton*/
          ["renderBody"]: Marko.ட.inlineBody(
            (() => {
              type;
            })()
          ),
        });
        ˍ.tags["div"]({
          /*div*/
          /*div*/
          ["renderBody"]: Marko.ட.inlineBody(
            (() => {
              ("<b>World</b>");
            })()
          ),
        });
        ˍ.tags["div"]({
          /*div*/
          /*div*/
          ["renderBody"]: Marko.ட.inlineBody(
            (() => {
              ˍ.tags["code"]({
                /*code*/
                /*code*/
                ["renderBody"]: Marko.ட.inlineBody((() => {})()),
              });
            })()
          ),
        });
        Marko.ட.render(missing)({
          /*missing*/
        });
        Marko.ட.render(1 as unknown)({
          /*complex-missing*/
        });
      })()
    ),
  });
  return;
}
class ட extends Marko.Component<Input> {
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
declare namespace ˍ {
  const id: "@language-tools/src/__tests__/fixtures/class-api-basic/index.marko";
  const template: Marko.Template<typeof id>;
  const tags: {
    div: Marko.ட.NativeTagRenderer<"div">;
    p: Marko.ட.NativeTagRenderer<"p">;
    span: Marko.ட.NativeTagRenderer<"span">;
    code: Marko.ட.NativeTagRenderer<"code">;
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
