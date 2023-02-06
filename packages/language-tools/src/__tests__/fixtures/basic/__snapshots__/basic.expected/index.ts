export interface Input<T extends string> {
  name: T;
}
class Component<T extends string> extends Marko.Component<Input<T>> {}
export { type Component };
export default Marko.ᜭ.instance(
  class extends Marko.Template {
    /**
     * @internal
     * Do not use or you will be fired.
     */
    public ᜭ<T extends string, ᜭ = unknown>(
      input: Marko.ᜭ.Relate<Input<T>, ᜭ>
    ) {
      return Marko.ᜭ.returnWithScope(input as any as ᜭ, this.#ᜭ<T>());
    }
    #ᜭ<T extends string>() {
      const input = 1 as unknown as Input<T>;
      const component = Marko.ᜭ.instance(Component<T>);
      const out = 1 as unknown as Marko.Out;
      const state = Marko.ᜭ.state(component);
      Marko.ᜭ.noop({ input, out, component, state });
      return (function (this: void) {
        Marko.ᜭ.assertRendered(
          Marko.ᜭ.rendered,
          1,
          (1 as any as Marko.ᜭ.NativeTagRenderer<"div">)({
            /*div*/
            /*div*/
            ["renderBody"]: Marko.ᜭ.inlineBody(
              (() => {
                Marko.ᜭ.assertRendered(
                  Marko.ᜭ.rendered,
                  2,
                  (
                    1 as any as Marko.ᜭ.CustomTagRenderer<
                      typeof import("../../components/let/index.marko").default
                    >
                  )({
                    /*let*/
                    value: 1,
                  })
                );
                const { value: x } = Marko.ᜭ.rendered.returns[2];
                new Thing();
                x;
                input.name;
                return {
                  scope: { x },
                };
              })()
            ),
          })
        );
        x;
        const { x } = Marko.ᜭ.readScopes(Marko.ᜭ.rendered);
        Marko.ᜭ.noop({ x });
        return;
      })();
    }
  }
);
