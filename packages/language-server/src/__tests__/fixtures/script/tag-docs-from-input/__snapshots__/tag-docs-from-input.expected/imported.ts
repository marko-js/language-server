import FancyButton from "./components/fancy-button.marko";
import ShinyButton from "./components/ShinyButton.marko";
import type { Input as FancyInput } from "./components/fancy-button.marko";
// A wrapper extending a deprecated tag's input.
export interface Input extends FancyInput {}
const Input: Marko.Template<Input, void> = Marko._.template((input: Input) => {
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  const Button = Marko._.hoist(() => __marko_internal_hoist__Button);
  const buttonId = Marko._.hoist(() => __marko_internal_hoist__buttonId);
  const __marko_internal_tag_1 = FancyButton;
  Marko._.renderDynamicTag(__marko_internal_tag_1)(
    //                             ^?
    {
      label: "Go",
    },
  );
  const __marko_internal_tag_2 = FancyButton;
  Marko._.renderDynamicTag(__marko_internal_tag_2)(
    // ^?
    {
      label: "Go",
    },
  );
  {
    const Button = Marko._.returned(() => __marko_internal_rendered_3);
    const __marko_internal_rendered_3 = __marko_internal_module_1().default._(
      //  ^?
      {
        value: FancyButton,
      },
    );
    const __marko_internal_tag_4 = Button;
    Marko._.renderDynamicTag(__marko_internal_tag_4)({
      label: "Go",
    });
    const __marko_internal_tag_5 = Marko._.fallbackTemplate(
      // @ts-ignore
      ShinyButton,
      __marko_internal_module_2().default,
    );
    Marko._.renderDynamicTag(__marko_internal_tag_5)(
      // ^?
      {},
    );
    {
      const buttonId = Marko._.returned(() => __marko_internal_rendered_6);
      const __marko_internal_rendered_6 = __marko_internal_module_3().default._(
        // ^?
        // A core tag, documented by its types.
        {},
      );
      __marko_internal_module_4().default._({
        value: Promise.resolve(buttonId),
        //^?
        [Marko._.contentFor(__marko_internal_module_4)]: (n) => {
          [n];
          return Marko._.voidReturn;
        },
      });
      var __marko_internal_hoist__Button = Button;
      var __marko_internal_hoist__buttonId = buttonId;
    }
  }
  Marko._.noop({ Button, buttonId, input, $global, $signal });
});
export default Input;
declare function __marko_internal_module_1(): typeof import("@marko/runtime-tags/tags/const.d.marko");
declare function __marko_internal_module_2(): typeof import("./components/ShinyButton.marko");
declare function __marko_internal_module_3(): typeof import("@marko/runtime-tags/tags/id.d.marko");
declare function __marko_internal_module_4(): typeof import("marko/src/core-tags/core/await/index.d.marko");
//^?
