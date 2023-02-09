import "@marko/language-tools/script.internals";
import "../../lib-fixtures/marko.d.ts";
export interface Input {}
abstract class Component extends Marko.Component<Input> {}
export { type Component };
function ᜭ() {
  const input = 1 as any as Input;
  const component = 1 as any as Component;
  const out = Marko.ᜭ.out;
  const state = Marko.ᜭ.state(component);
  Marko.ᜭ.noop({ input, out, component, state });
  let i = 0;
  Marko.ᜭ.renderDynamicTag(custom)({
    /*custom*/
    ...Marko.ᜭ.mergeAttrTags(
      ++i < 10
        ? [
            {
              a: {
                /*@a*/
                /*@a*/
                ["renderBody"]: Marko.ᜭ.inlineBody(
                  (() => {
                    i;
                  })()
                ),
              },
            },
          ]
        : []
    ),
  });
  let done = false;
  i = 0;
  Marko.ᜭ.renderDynamicTag(custom)({
    /*custom*/
    ...Marko.ᜭ.mergeAttrTags(
      !done
        ? [
            {
              a: {
                /*@a*/
                /*@a*/
                ["renderBody"]: Marko.ᜭ.inlineBody(
                  (() => {
                    done;
                    if (++i === 5) {
                      done = true;
                    }
                  })()
                ),
              },
            },
          ]
        : []
    ),
  });
  Marko.ᜭ.renderDynamicTag(custom)({
    /*custom*/
    ...Marko.ᜭ.mergeAttrTags(
      undefined
        ? [
            {
              a: {
                /*@a*/
                /*@a*/
                ["renderBody"]: Marko.ᜭ.inlineBody((() => {})()),
              },
            },
          ]
        : []
    ),
  });
  return;
}
export default new (class Template extends Marko.ᜭ.Template<{
  /** Asynchronously render the template. */
  render(
    input: Marko.TemplateInput<Input>,
    stream?: {
      write: (chunk: string) => void;
      end: (chunk?: string) => void;
    }
  ): Marko.Out<Component>;

  /** Synchronously render the template. */
  renderSync(input: Marko.TemplateInput<Input>): Marko.RenderResult<Component>;

  /** Synchronously render a template to a string. */
  renderToString(input: Marko.TemplateInput<Input>): string;

  /** Render a template and return a stream.Readable in nodejs or a ReadableStream in a web worker environment. */
  stream(
    input: Marko.TemplateInput<Input>
  ): ReadableStream<string> & NodeJS.ReadableStream;

  /**
   * @internal
   * Do not use or you will be fired.
   */
  ᜭ<ᜭInput = unknown>(
    input: Marko.ᜭ.Relate<Input, ᜭInput>
  ): Marko.ᜭ.ReturnWithScope<ᜭInput, ReturnType<typeof ᜭ>>;
}> {})();
