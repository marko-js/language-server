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
function ˍ(input: Input) {
  const out = 1 as unknown as Marko.Out;
  const component = 1 as unknown as ட;
  const state = 1 as unknown as typeof component extends {
    state: infer State extends object;
  }
    ? State
    : never;
  Marko.ட.noop({ input, out, component, state });
  Marko.ட.assertRendered(
    Marko.ட.rendered,
    1,
    ˍ.tags["const"]({
      /*const*/
      value: input,
    })
  );
  const {
    value: { year, isSmartOnly, type, mobileList, renderBody },
  } = Marko.ட.rendered.returns[1];
  ˍ.tags["div"]({
    /*div*/
    class: "mobiles__list",
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
        Marko.ட.forTag({
          of: mobileList,
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
              Marko.ட.render(renderBody)({
                /*renderBody*/
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
      })()
    ),
  });
  const ᜭ = {
    return: Marko.ட.returnTag({
      /*return*/
      value: 1,
    }),
  };
  return ᜭ.return;
}
class ட extends Marko.Component<Input> {}

declare namespace ˍ {
  const tags: {
    const: Marko.ட.CustomTagRenderer<
      typeof import("../../components/const/index.marko").default
    >;
    div: Marko.ட.NativeTagRenderer<"div">;
    p: Marko.ட.NativeTagRenderer<"p">;
    span: Marko.ட.NativeTagRenderer<"span">;
    code: Marko.ட.NativeTagRenderer<"code">;
  };
}
export default 1 as unknown as Marko.Template<"@language-tools/src/__tests__/fixtures/tags-api-basic/index.marko">;
declare global {
  namespace Marko {
    interface CustomTags {
      "@language-tools/src/__tests__/fixtures/tags-api-basic/index.marko": CustomTag<
        Input,
        ReturnType<typeof ˍ>,
        ட
      >;
    }
  }
}
