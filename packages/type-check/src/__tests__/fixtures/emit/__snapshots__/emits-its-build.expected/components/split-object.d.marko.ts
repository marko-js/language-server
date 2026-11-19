export type Input = Marko.ComponentInput<typeof import("./split-object.component")>;
export interface Component extends Marko.ComponentOf<typeof import("./split-object.component")> {
}
declare const SplitObject: Marko.Template<Input, void> & {
    Component: typeof import("./split-object.component");
};
export default SplitObject;
