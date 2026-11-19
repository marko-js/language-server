export type Size = "sm" | "lg";
export interface Input {
    size?: Size;
}
export type Component = Marko.Component<Input>;
declare const Input: Marko.Template<Input, void> & {
    Component: typeof Marko.Component;
};
export default Input;
