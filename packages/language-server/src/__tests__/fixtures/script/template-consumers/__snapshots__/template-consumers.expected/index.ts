import ClassCounter from "./components/class-counter.marko";
import ClassGeneric from "./components/class-generic.marko";
import TagsCounter from "./tags/tags-counter.marko";
import TagsGeneric from "./tags/tags-generic.marko";
import JsCounter from "./js/components/js-counter.marko";
export function consume(el: Element) {
  ClassCounter.render;
  //           ^?
  ClassCounter.renderSync;
  //           ^?
  ClassCounter.renderToString;
  //           ^?
  ClassCounter.stream;
  //           ^?
  ClassCounter.mount;
  //           ^?
  ClassCounter.createOut;
  //           ^?
  const component = ClassCounter.renderSync({ start: 1 }).getComponent();
  //    ^?
  TagsCounter.renderSync;
  //          ^?
  TagsCounter.mount;
  //          ^?
  ClassGeneric.render;
  //           ^?
  ClassGeneric.renderSync;
  //           ^?
  ClassGeneric.createOut;
  //           ^?
  TagsGeneric.mount;
  //          ^?
  JsCounter.renderSync;
  //        ^?
  ClassCounter.renderToString({ start: "bad" });
  ClassCounter.renderSync({});
  ClassGeneric.render({ value: 1 }, { write() {}, end() {} });
  ClassGeneric.render({ value: 1 }, (err, result) => result.getComponent());
  TagsCounter.mount({ start: "bad" }, el);
  JsCounter.renderToString({});
  return component;
}
export const classTemplate: Marko.Template = ClassCounter;
export const genericTemplate: Marko.Template<any, any> = ClassGeneric;
export declare const tagsReturn: Marko.Return<typeof TagsCounter>;
export interface Input {}
export type Component = Marko.Component<Input>;
export default Marko._.template((input: Input) => {
  const component = Marko._.any as Component;
  const state = Marko._.state(component);
  const out = Marko._.any as Marko.Out;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  Marko._.noop({ component, state, out, input, $global, $signal });
}, Marko.Component);
//                   ^?
