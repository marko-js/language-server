export interface Input {
    name: string;
}
export type Component = Marko.Component<Input>;
declare const Input: Marko.Template<Input, void> & {
    Component: typeof Marko.Component;
};
export default Input;
