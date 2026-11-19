import FancyButton from "./components/fancy-button/index.marko";
import { get } from "@ebay/retriever";
/** Hi */ export interface Input {
  year: number;
  isSmartOnly: boolean;
  type: string;
  mobileList: Array<Mobile>;
  renderBody: Marko.Body;
}
//     ^?

function greet() {
  return "hello world";
}

var useA = true;
const Input = Marko._.template((input: Input) => {
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  const buttonTemplate = Marko._.hoist(
    () => __marko_internal_hoist__buttonTemplate,
  );
  const year = Marko._.hoist(() => __marko_internal_hoist__year);
  const isSmartOnly = Marko._.hoist(() => __marko_internal_hoist__isSmartOnly);
  const type = Marko._.hoist(() => __marko_internal_hoist__type);
  const mobileList = Marko._.hoist(() => __marko_internal_hoist__mobileList);
  const renderBody = Marko._.hoist(() => __marko_internal_hoist__renderBody);
  {
    const buttonTemplate: (typeof import("<fancy-button>"))["default"] =
      Marko._.returned(() => __marko_internal_rendered_1);
    const __marko_internal_rendered_1 = __marko_internal_module_1().default._({
      value: FancyButton,
    });
    {
      const { year, isSmartOnly, type, mobileList, renderBody } =
        Marko._.returned(() => __marko_internal_rendered_2);
      const __marko_internal_rendered_2 = __marko_internal_module_1().default._(
        {
          value: input,
        },
      );
      Marko._.renderNativeTag("div")({
        class: "mobiles__list",
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
          Marko._.forOfTag(
            {
              of: mobileList,
            },
            (mobile, i, all) => {
              Marko._.renderNativeTag("span")(
                //                          ^?
                {
                  id: i,
                  [Marko._.content]: (() => {
                    [mobile];
                    [i];
                    [all.length];
                    return Marko._.voidBody;
                  })(),
                },
              );
              return Marko._.voidReturn;
            },
          );
          Marko._.renderNativeTag("div")({
            class: Marko._.interpolated`container`,
            [Marko._.content]: (() => {
              const __marko_internal_tag_3 = renderBody;
              Marko._.renderDynamicTag(__marko_internal_tag_3)({});
              return Marko._.voidBody;
            })(),
          });
          const __marko_internal_tag_4 = FancyButton;
          Marko._.renderDynamicTag(__marko_internal_tag_4)({
            "no-update": true,
            something: true,
            [Marko._.contentFor(__marko_internal_tag_4)]: (() => {
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
          return Marko._.voidBody;
        })(),
      });
      var __marko_internal_return = Marko._.returnTag({
        value: 1,
      });
      var __marko_internal_hoist__buttonTemplate = buttonTemplate;
      var __marko_internal_hoist__year = year;
      var __marko_internal_hoist__isSmartOnly = isSmartOnly;
      var __marko_internal_hoist__type = type;
      var __marko_internal_hoist__mobileList = mobileList;
      var __marko_internal_hoist__renderBody = renderBody;
    }
  }
  Marko._.noop({
    buttonTemplate,
    year,
    isSmartOnly,
    type,
    mobileList,
    renderBody,
    input,
    $global,
    $signal,
  });
  return __marko_internal_return;
});
export default Input;
declare function __marko_internal_module_1(): typeof import("@marko/runtime-tags/tags/const.d.marko");
