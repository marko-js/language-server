export interface Input {}
class Component extends Marko.Component<Input> {}
export { type Component };
export default Marko.ᜭ.instance(
  class extends Marko.Template {
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
        let i = 0;
        Marko.ᜭ.render(custom)({
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
        Marko.ᜭ.render(custom)({
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
        Marko.ᜭ.render(custom)({
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
      })();
    }
  }
);
