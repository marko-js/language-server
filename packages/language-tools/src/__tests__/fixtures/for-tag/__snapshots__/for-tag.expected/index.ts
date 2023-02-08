import "@marko/language-tools/script.internals";
import "../../lib-fixtures/marko.d.ts";
export interface Input {}
abstract class Component extends Marko.Component<Input> {}
export { type Component };
export default Marko.ᜭ.instance(
  class extends Marko.ᜭ.Template<{
    /** Asynchronously render the template. */
    render(
      input: Marko.TemplateInput<Input>,
      stream?: {
        write: (chunk: string) => void;
        end: (chunk?: string) => void;
      }
    ): Marko.Out<Component>;

    /** Synchronously render the template. */
    renderSync(
      input: Marko.TemplateInput<Input>
    ): Marko.RenderResult<Component>;

    /** Synchronously render a template to a string. */
    renderToString(input: Marko.TemplateInput<Input>): string;

    /** Render a template and return a stream.Readable in nodejs or a ReadableStream in a web worker environment. */
    stream(
      input: Marko.TemplateInput<Input>
    ): ReadableStream<string> & NodeJS.ReadableStream;
  }>() {
    /**
     * @internal
     * Do not use or you will be fired.
     */
    public ᜭ<ᜭ = unknown>(input: Marko.ᜭ.Relate<Input, ᜭ>) {
      return Marko.ᜭ.returnWithScope(input as any as ᜭ, this.#ᜭ());
    }
    #ᜭ() {
      const input = 1 as unknown as Input;
      const component = Marko.ᜭ.instance(Component);
      const out = 1 as unknown as Marko.Out;
      const state = Marko.ᜭ.state(component);
      Marko.ᜭ.noop({ input, out, component, state });
      return (function (this: void) {
        Marko.ᜭ.assertRendered(
          Marko.ᜭ.rendered,
          1,
          Marko.ᜭ.renderTemplate(import("../../components/let/index.marko"))({
            /*let*/
            value: [
              {
                value: 1,
              },
              {
                value: 2,
              },
              {
                value: 3,
              },
            ] as const,
          })
        );
        const { value: list } = Marko.ᜭ.rendered.returns[1];
        Marko.ᜭ.forTag({
          of: list,
          [/*for*/ "renderBody"]: Marko.ᜭ.body(function* () {}),
        });
        Marko.ᜭ.forTag({
          of: list,
          [/*for*/ "renderBody"]: Marko.ᜭ.body(function* (item, index, all) {
            item;
            index;
            all;
          }),
        });
        Marko.ᜭ.assertRendered(
          Marko.ᜭ.rendered,
          2,
          Marko.ᜭ.forTag({
            of: list,
            [/*for*/ "renderBody"]: Marko.ᜭ.body(function* (item) {
              Marko.ᜭ.assertRendered(
                Marko.ᜭ.rendered,
                3,
                Marko.ᜭ.renderTemplate(
                  import("../../components/const/index.marko")
                )({
                  /*const*/
                  value: item,
                })
              );
              const {
                value: { value: hoistedFromForOf },
              } = Marko.ᜭ.rendered.returns[3];
              yield { hoistedFromForOf };
            }),
          })
        );
        Marko.ᜭ.forTag({
          of: list,
        });
        Marko.ᜭ.renderDynamicTag(effect)({
          /*effect*/
          value() {
            hoistedFromForOf;
          },
        });
        Marko.ᜭ.assertRendered(
          Marko.ᜭ.rendered,
          4,
          Marko.ᜭ.renderTemplate(import("../../components/let/index.marko"))({
            /*let*/
            value: { a: 1, b: 2 } as const,
          })
        );
        const { value: record } = Marko.ᜭ.rendered.returns[4];
        Marko.ᜭ.forTag({
          in: record,
          [/*for*/ "renderBody"]: Marko.ᜭ.body(function* (key, value) {
            key;
            value;
          }),
        });
        Marko.ᜭ.assertRendered(
          Marko.ᜭ.rendered,
          5,
          Marko.ᜭ.forTag({
            in: record,
            [/*for*/ "renderBody"]: Marko.ᜭ.body(function* (key) {
              Marko.ᜭ.assertRendered(
                Marko.ᜭ.rendered,
                6,
                Marko.ᜭ.renderTemplate(
                  import("../../components/const/index.marko")
                )({
                  /*const*/
                  value: key,
                })
              );
              const { value: hoistedFromForIn } = Marko.ᜭ.rendered.returns[6];
              yield { hoistedFromForIn };
            }),
          })
        );
        Marko.ᜭ.renderDynamicTag(effect)({
          /*effect*/
          value() {
            hoistedFromForIn;
          },
        });
        Marko.ᜭ.forTag({
          to: 10,
          [/*for*/ "renderBody"]: Marko.ᜭ.body(function* (index) {
            index;
          }),
        });
        Marko.ᜭ.forTag({
          from: 1,
          to: 10,
          [/*for*/ "renderBody"]: Marko.ᜭ.body(function* (index) {
            index;
          }),
        });
        Marko.ᜭ.forTag({
          to: 10,
          step: 2,
          [/*for*/ "renderBody"]: Marko.ᜭ.body(function* (index) {
            index;
          }),
        });
        Marko.ᜭ.assertRendered(
          Marko.ᜭ.rendered,
          7,
          Marko.ᜭ.forTag({
            to: 10,
            [/*for*/ "renderBody"]: Marko.ᜭ.body(function* (index) {
              Marko.ᜭ.assertRendered(
                Marko.ᜭ.rendered,
                8,
                Marko.ᜭ.renderTemplate(
                  import("../../components/const/index.marko")
                )({
                  /*const*/
                  value: index,
                })
              );
              const { value: hoistedFromForTo } = Marko.ᜭ.rendered.returns[8];
              yield { hoistedFromForTo };
            }),
          })
        );
        Marko.ᜭ.renderDynamicTag(effect)({
          /*effect*/
          value() {
            hoistedFromForTo;
          },
        });
        Marko.ᜭ.forTag({
          [/*for*/ "renderBody"]: Marko.ᜭ.body(function* (index) {}),
        });
        const { hoistedFromForOf, hoistedFromForIn, hoistedFromForTo } =
          Marko.ᜭ.readScopes(Marko.ᜭ.rendered);
        Marko.ᜭ.noop({ hoistedFromForOf, hoistedFromForIn, hoistedFromForTo });
        return;
      })();
    }
  }
);
