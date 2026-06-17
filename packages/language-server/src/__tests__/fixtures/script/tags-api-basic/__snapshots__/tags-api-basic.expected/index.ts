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
function __marko_internal_template(this: void) {
  const input = Marko._.any as Input;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.getGlobal(
    // @ts-expect-error We expect the compiler to error because we are checking if the MarkoRun.Context is defined.
    (Marko._.error, Marko._.any as MarkoRun.Context),
  );
  const year = Marko._.hoist(() => __marko_internal_hoist__year);
  const isSmartOnly = Marko._.hoist(() => __marko_internal_hoist__isSmartOnly);
  const type = Marko._.hoist(() => __marko_internal_hoist__type);
  const mobileList = Marko._.hoist(() => __marko_internal_hoist__mobileList);
  const renderBody = Marko._.hoist(() => __marko_internal_hoist__renderBody);
  const __marko_internal_tag_1 = Marko._.resolveTemplate(
    import("@marko/runtime-tags/tags/const.d.marko"),
  );
  {
    const { year, isSmartOnly, type, mobileList, renderBody } =
      Marko._.returned(() => __marko_internal_rendered_1);
    const __marko_internal_rendered_1 = Marko._.renderTemplate(
      __marko_internal_tag_1,
    )()()({
      value: input,
    });
    Marko._.renderNativeTag("div")()()({
      class: "mobiles__list",
      [Marko._.content]: (() => {
        Marko._.renderNativeTag("p")()()({
          id: "p",
          [Marko._.content]: (() => {
            year;
            return () => {
              return Marko._.voidReturn;
            };
          })(),
        });
        if (isSmartOnly) {
          Marko._.renderNativeTag("span")()()({
            class: "sub-note",
            [Marko._.content]: (() => {
              isSmartOnly;
              return () => {
                return Marko._.voidReturn;
              };
            })(),
          });
        }
        Marko._.renderNativeTag("span")()()({
          class: "sub-note",
          [Marko._.content]: (() => {
            type;
            return () => {
              return Marko._.voidReturn;
            };
          })(),
        });
        Marko._.forOfTag(
          {
            of: mobileList,
          },
          (mobile, i, all) => {
            Marko._.renderNativeTag("span")()()(
              //                          ^?
              {
                id: i,
                [Marko._.content]: (() => {
                  mobile;
                  i;
                  all.length;
                  return () => {
                    return Marko._.voidReturn;
                  };
                })(),
              },
            );
            return Marko._.voidReturn;
          },
        );
        Marko._.renderNativeTag("div")()()(
          //                 ^?        ^?
          {
            class: Marko._.interpolated`container`,
            [Marko._.content]: (() => {
              const __marko_internal_tag_2 = renderBody;
              Marko._.renderDynamicTag(__marko_internal_tag_2)()()({});
              return () => {
                return Marko._.voidReturn;
              };
            })(),
          },
        );
        const __marko_internal_tag_3 = FancyButton;
        Marko._.renderDynamicTag(__marko_internal_tag_3)()()({
          "no-update": true,
          something: true,
          [Marko._.contentFor(__marko_internal_tag_3)]: (() => {
            type;
            return () => {
              return Marko._.voidReturn;
            };
          })(),
        });
        Marko._.renderNativeTag("div")()()({
          [Marko._.content]: (() => {
            ("<b>World</b>");
            return () => {
              return Marko._.voidReturn;
            };
          })(),
        });
        Marko._.renderNativeTag("div")()()({
          [Marko._.content]: (() => {
            Marko._.renderNativeTag("code")()()({
              [Marko._.content]: (() => {
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
        return () => {
          return Marko._.voidReturn;
        };
      })(),
    });
    var __marko_internal_return = Marko._.returnTag({
      value: 1,
    });
    var __marko_internal_hoist__year = year;
    var __marko_internal_hoist__isSmartOnly = isSmartOnly;
    var __marko_internal_hoist__type = type;
    var __marko_internal_hoist__mobileList = mobileList;
    var __marko_internal_hoist__renderBody = renderBody;
  }
  Marko._.noop({
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
}
export default new (class Template extends Marko._.Template<{
  render(
    input: Marko.TemplateInput<Input>,
    stream?: {
      write: (chunk: string) => void;
      end: (chunk?: string) => void;
    },
  ): Marko.Out<never>;

  render(
    input: Marko.TemplateInput<Input>,
    cb?: (err: Error | null, result: Marko.RenderResult<never>) => void,
  ): Marko.Out<never>;

  renderSync(input: Marko.TemplateInput<Input>): Marko.RenderResult<never>;

  renderToString(input: Marko.TemplateInput<Input>): string;

  stream(
    input: Marko.TemplateInput<Input>,
  ): ReadableStream<string> & NodeJS.ReadableStream;

  mount(
    input: Marko.TemplateInput<Input>,
    reference: Node,
    position?: "afterbegin" | "afterend" | "beforebegin" | "beforeend",
  ): Marko.MountedTemplate<typeof input>;

  api: "tags";
  _(): () => <__marko_internal_input extends unknown>(
    input: Marko.Directives &
      Input &
      Marko._.Relate<__marko_internal_input, Marko.Directives & Input>,
  ) => Marko._.ReturnWithScope<
    __marko_internal_input,
    typeof __marko_internal_template extends () => infer Return ? Return : never
  >;
}> {})();
