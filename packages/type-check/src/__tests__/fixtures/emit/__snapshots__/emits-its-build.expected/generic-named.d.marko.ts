export interface Input<T> {
    value: T;
    valueChange?: (value: T) => void;
}
export type Component<T> = Marko.Component<Input<T>>;
declare const Input: Marko.TemplateOf<(<T>(input: Input<T>) => void)> & {
    Component: typeof Marko.Component;
};
export default Input;
