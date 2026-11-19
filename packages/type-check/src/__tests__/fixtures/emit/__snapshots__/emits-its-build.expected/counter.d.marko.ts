export interface Input {
    start: number;
}
declare class Component extends Marko.Component<Input> {
    count: number;
    onCreate(input: Input): void;
    increment(): void;
}
export { type Component };
declare const Input: Marko.Template<Input, void> & {
    Component: typeof Component;
};
export default Input;
