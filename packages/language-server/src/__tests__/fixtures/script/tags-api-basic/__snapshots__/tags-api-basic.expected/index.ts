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
  const __marko_internal_tag_1 = Marko._.resolveTemplate(
    import("@marko/runtime-tags/tags/const.d.marko"),
  );
  const __marko_internal_rendered_1 = Marko._.renderTemplate(
    __marko_internal_tag_1,
  )()()({
    value: input,
  });
  const { year, isSmartOnly, type, mobileList, renderBody } =
    __marko_internal_rendered_1.return.value;
  Marko._.renderNativeTag("div")()()({
    class: "mobiles__list",
    [Marko._.content /*div*/]: (() => {
      Marko._.renderNativeTag("p")()()({
        id: "p",
        [Marko._.content /*p*/]: (() => {
          year;
          return () => {
            return Marko._.voidReturn;
          };
        })(),
      });
      if (isSmartOnly) {
        Marko._.renderNativeTag("span")()()({
          class: "subnote",
          [Marko._.content /*span*/]: (() => {
            isSmartOnly;
            return () => {
              return Marko._.voidReturn;
            };
          })(),
        });
      }
      Marko._.renderNativeTag("span")()()({
        class: "subnote",
        [Marko._.content /*span*/]: (() => {
          type;
          return () => {
            return Marko._.voidReturn;
          };
        })(),
      });
      Marko._.forOfTag(
        {
          /*for*/ of: mobileList,
        },
        (mobile, i, all) => {
          Marko._.renderNativeTag("span")()()(
            //                          ^?
            {
              id: i,
              [Marko._.content /*span*/]: (() => {
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
          [Marko._.content /*div*/]: (() => {
            const __marko_internal_tag_2 = renderBody;
            Marko._.renderDynamicTag(__marko_internal_tag_2)()()({
              /*renderBody*/
            });
            return () => {
              return Marko._.voidReturn;
            };
          })(),
        },
      );
      const __marko_internal_tag_3 = FancyButton;
      Marko._.renderDynamicTag(__marko_internal_tag_3)()()({
        something: true,
        [Marko._.contentFor(__marko_internal_tag_3) /*FancyButton*/]: (() => {
          type;
          return () => {
            return Marko._.voidReturn;
          };
        })(),
      });
      Marko._.renderNativeTag("div")()()({
        [Marko._.content /*div*/]: (() => {
          ("<b>World</b>");
          return () => {
            return Marko._.voidReturn;
          };
        })(),
      });
      Marko._.renderNativeTag("div")()()({
        [Marko._.content /*div*/]: (() => {
          Marko._.renderNativeTag("code")()()({
            [Marko._.content /*code*/]: (() => {
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
  const __marko_internal_return = {
    return: Marko._.returnTag({
      value: 1,
    }),
  };
  Marko._.noop({ input, $global, $signal });
  return __marko_internal_return.return;
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
