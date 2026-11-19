export default Input;
export type Input<T> = {
    value: T;
};
declare const Input: Marko.TemplateOf<(<T>(input: Input<T>) => {
    value: T;
})>;
