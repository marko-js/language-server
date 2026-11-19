export default Split;
export type Input = Record<string, unknown>;
export type Component = Marko.ComponentOf<typeof import("./split.component")>;
declare const Split: Marko.Template<Input, void> & {
    Component: typeof import("./split.component");
};
