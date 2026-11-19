export interface Input {
    label: string;
}
export interface Component extends Marko.ComponentOf<typeof import("./split-own-input.component")> {
}
declare const Input: Marko.Template<Input, void> & {
    Component: typeof import("./split-own-input.component");
};
export default Input;
