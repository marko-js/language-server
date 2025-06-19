import FancyButton from "./components/fancy-button/index.marko";
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
(function (this: void) {
  const input = Marko._.any as Input;
  const component = Marko._.any as Component;
  const state = Marko._.state(component);
  const out = Marko._.out;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.getGlobal(
    // @ts-expect-error We expect the compiler to error because we are checking if the MarkoRun.Context is defined.
    (Marko._.error, Marko._.any as MarkoRun.Context),
  );
  Marko._.noop({ component, state, out, input, $global, $signal });
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
      Marko._.forOfTag(
        {
          /*for*/ of: mobiles,
        },
        (mobile, i, all) => {
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
      );
      Marko._.renderNativeTag("div")()()({
        class: Marko._.interpolated`container`,
        ["renderBody" /*div*/]: (() => {
          const __marko_internal_tag_1 = input.renderBody;
          Marko._.renderDynamicTag(__marko_internal_tag_1)()()({
            /*input.renderBody*/
          });
          return () => {
            return Marko._.voidReturn;
          };
        })(),
      });
      const __marko_internal_tag_2 = FancyButton;
      Marko._.renderDynamicTag(__marko_internal_tag_2)()()({
        something: true,
        ["renderBody" /*FancyButton*/]: (() => {
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
      const __marko_internal_tag_3 = Missing;
      Marko._.renderDynamicTag(__marko_internal_tag_3)()()({
        /*Missing*/
      });
      const __marko_internal_tag_4 = Marko._.interpolated`complex-missing`;
      Marko._.renderDynamicTag(__marko_internal_tag_4)()()({
        /*complex-missing*/
      });
      return () => {
        return Marko._.voidReturn;
      };
    })(),
  });
  return;
})();
export default new (class Template extends Marko._.Template<{
  render(
    input: Marko.TemplateInput<Input>,
    stream?: {
      write: (chunk: string) => void;
      end: (chunk?: string) => void;
    },
  ): Marko.Out<Component>;

  render(
    input: Marko.TemplateInput<Input>,
    cb?: (err: Error | null, result: Marko.RenderResult<Component>) => void,
  ): Marko.Out<Component>;

  renderSync(input: Marko.TemplateInput<Input>): Marko.RenderResult<Component>;

  renderToString(input: Marko.TemplateInput<Input>): string;

  stream(
    input: Marko.TemplateInput<Input>,
  ): ReadableStream<string> & NodeJS.ReadableStream;

  mount(
    input: Marko.TemplateInput<Input>,
    reference: Node,
    position?: "afterbegin" | "afterend" | "beforebegin" | "beforeend",
  ): Marko.MountedTemplate<typeof input>;

  api: "class";
  _(): () => <__marko_internal_input extends unknown>(
    input: Marko.Directives &
      Input &
      Marko._.Relate<__marko_internal_input, Marko.Directives & Input>,
  ) => Marko._.ReturnWithScope<__marko_internal_input, void>;
}> {})();
