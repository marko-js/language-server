export type Input = Marko.ComponentInput<typeof import("./split-local-input.component")>;
export interface Component extends Marko.ComponentOf<typeof import("./split-local-input.component")> {
}
declare const SplitLocalInput: Marko.Template<Input, void> & {
    Component: typeof import("./split-local-input.component");
};
export default SplitLocalInput;
