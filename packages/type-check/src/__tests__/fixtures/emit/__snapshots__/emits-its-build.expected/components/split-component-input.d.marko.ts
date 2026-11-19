export type Input = Marko.ComponentInput<typeof import("./split-component-input.component")>;
export interface Component extends Marko.ComponentOf<typeof import("./split-component-input.component")> {
}
declare const SplitComponentInput: Marko.Template<Input, void> & {
    Component: typeof import("./split-component-input.component");
};
export default SplitComponentInput;
