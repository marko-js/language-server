import Child from "./components/child.marko";
/** @typedef {Record<string, unknown>} Input */
/**
 * @extends {Marko.Component<Input>}
 * @abstract
 */
export class Component extends Marko.Component {}
/**
 * @this {void}
 */
(function () {
  const input = /** @type {Input} */ (Marko._.any);
  const component = /** @type {Component} */ (Marko._.any);
  const state = Marko._.state(component);
  const out = /** @type {Marko.Out} */ (Marko._.any);
  const $signal = /** @type {AbortSignal} */ (Marko._.any);
  const $global = Marko._.getGlobal(
    // @ts-expect-error We expect the compiler to error because we are checking if the MarkoRun.Context is defined.
    (Marko._.error, /** @type {MarkoRun.Context} */ (Marko._.any)),
  );
  const __marko_internal_tag_1 = Marko._.resolveTemplate(
    import("./components/child.marko"),
  );
  Marko._.attrTagNames(__marko_internal_tag_1, (input) => {
    input["@foo"];
    input["@foo"];
  });
  Marko._.renderTemplate(__marko_internal_tag_1 /*child*/)()()({
    ["foo" /*@foo*/]: Marko._.attrTagFor(__marko_internal_tag_1, "foo")(
      "foo",
      {
        ["foo" /*@foo*/]: {
          bar: true,
          [/*@foo*/ Symbol.iterator]: Marko._.any,
        },
      },
      {
        ["foo" /*@foo*/]: {
          [Marko._.contentFor(__marko_internal_tag_1) /*@foo*/]: (data) => {
            data;
            return Marko._.voidReturn;
          },
          [/*@foo*/ Symbol.iterator]: Marko._.any,
        },
      },
    ),
  });
  const __marko_internal_tag_2 = Child;
  Marko._.attrTagNames(__marko_internal_tag_2, (input) => {
    input["@foo"];
    input["@foo"];
  });
  Marko._.renderDynamicTag(__marko_internal_tag_2 /*Child*/)()()(
    //^?
    {
      ["foo" /*@foo*/]: Marko._.attrTagFor(__marko_internal_tag_2, "foo")(
        "foo",
        {
          ["foo" /*@foo*/]: {
            bar: true,
            [/*@foo*/ Symbol.iterator]: Marko._.any,
          },
        },
        {
          ["foo" /*@foo*/]: {
            [Marko._.contentFor(__marko_internal_tag_2) /*@foo*/]: (data) => {
              data;
              return Marko._.voidReturn;
            },
            [/*@foo*/ Symbol.iterator]: Marko._.any,
          },
        },
      ),
    },
  );
  const __marko_internal_tag_3 = true && Child;
  Marko._.attrTagNames(__marko_internal_tag_3, (input) => {
    input["@foo"];
    input["@foo"];
  });
  Marko._.renderDynamicTag(__marko_internal_tag_3 /*true && Child*/)()()(
    //^?
    // This errors for now, because `typeof (some + expression)` is not allowed
    {
      ["foo" /*@foo*/]: Marko._.attrTagFor(__marko_internal_tag_3, "foo")(
        "foo",
        {
          ["foo" /*@foo*/]: {
            bar: true,
            [/*@foo*/ Symbol.iterator]: Marko._.any,
          },
        },
        {
          ["foo" /*@foo*/]: {
            [Marko._.contentFor(__marko_internal_tag_3) /*@foo*/]: (data) => {
              data;
              return Marko._.voidReturn;
            },
            [/*@foo*/ Symbol.iterator]: Marko._.any,
          },
        },
      ),
    },
  );
  Marko._.noop({ component, state, out, input, $global, $signal });
  return;
})();
export default new /**
 * @extends { Marko._.Template<{              render(         input: Marko.TemplateInput<Input>,         stream?: {           write: (chunk: string) => void;           end: (chunk?: string) => void;         },       ): Marko.Out<Component>;               render(         input: Marko.TemplateInput<Input>,         cb?: (           err: Error | null,           result: Marko.RenderResult<Component>,         ) => void,       ): Marko.Out<Component>;               renderSync(         input: Marko.TemplateInput<Input>,       ): Marko.RenderResult<Component>;               renderToString(input: Marko.TemplateInput<Input>): string;               stream(         input: Marko.TemplateInput<Input>,       ): ReadableStream<string> & NodeJS.ReadableStream;               mount(         input: Marko.TemplateInput<Input>,         reference: Node,         position?: "afterbegin" | "afterend" | "beforebegin" | "beforeend",       ): Marko.MountedTemplate<typeof input>;          api: "class",   _(): () => <__marko_internal_input extends unknown>(input: Marko.Directives & Input & Marko._.Relate<__marko_internal_input, Marko.Directives & Input>) => (Marko._.ReturnWithScope<__marko_internal_input, void>); }>}
 */
(class Template extends Marko._.Template {})();
//^?
