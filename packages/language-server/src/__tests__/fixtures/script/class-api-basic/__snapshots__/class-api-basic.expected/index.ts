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
  const out = Marko._.any as Marko.Out;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
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
    class: "mobiles__list",
    onClick: component.handleClick,
    [Marko._.content]: (() => {
      Marko._.renderNativeTag("p")({
        id: "p",
        [Marko._.content]: (() => {
          [year];
          return Marko._.voidBody;
        })(),
      });
      if (isSmartOnly) {
        Marko._.renderNativeTag("span")({
          class: "sub-note",
          [Marko._.content]: (() => {
            [isSmartOnly];
            return Marko._.voidBody;
          })(),
        });
      }
      Marko._.renderNativeTag("span")({
        class: "sub-note",
        [Marko._.content]: (() => {
          [type];
          return Marko._.voidBody;
        })(),
      });

      const mobiles: Array<Mobile> = component.input.mobileList;
      mobiles.forEach((mobile: Mobile) => {
        console.log(mobile.brandName);
      });
      Marko._.forOfTag(
        {
          of: mobiles,
        },
        (mobile, i, all) => {
          Marko._.renderNativeTag("span")({
            id: i,
            [Marko._.content]: (() => {
              [mobile];
              [i];
              [all.length];
              return Marko._.voidBody;
            })(),
          });
          return Marko._.voidReturn;
        },
      );
      Marko._.renderNativeTag("div")({
        class: Marko._.interpolated`container`,
        [Marko._.content]: (() => {
          const __marko_internal_tag_1 = input.renderBody;
          Marko._.renderDynamicTag(__marko_internal_tag_1)()()({});
          return Marko._.voidBody;
        })(),
      });
      const __marko_internal_tag_2 = FancyButton;
      Marko._.renderDynamicTag(__marko_internal_tag_2)()()({
        something: true,
        [Marko._.contentFor(__marko_internal_tag_2)]: (() => {
          [type];
          return Marko._.voidBody;
        })(),
      });
      Marko._.renderNativeTag("div")({
        [Marko._.content]: (() => {
          ["<b>World</b>"];
          return Marko._.voidBody;
        })(),
      });
      Marko._.renderNativeTag("div")({
        [Marko._.content]: (() => {
          Marko._.renderNativeTag("code")({
            [Marko._.content]: Marko._.voidBody,
          });
          return Marko._.voidBody;
        })(),
      });
      const __marko_internal_tag_3 = Missing;
      Marko._.renderDynamicTag(__marko_internal_tag_3)()()({});
      const __marko_internal_tag_4 = Marko._.interpolated`complex-missing`;
      Marko._.renderDynamicTag(__marko_internal_tag_4)()()({});
      return Marko._.voidBody;
    })(),
  });
  Marko._.noop({ component, state, out, input, $global, $signal });
  return;
})();
const __marko_internal_api = "class";
export { __marko_internal_api as "~api" };
class Template extends Marko._.Template<Input, void, "class"> {}
const Input = new Template();
export default Input;
