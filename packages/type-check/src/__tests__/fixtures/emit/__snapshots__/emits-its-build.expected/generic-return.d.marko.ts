export interface Input<T extends string | number> {
    value: T;
}
declare const Input: Marko.TemplateOf<(<T extends string | number>(input: Input<T>) => {
    value: T;
})>;
export default Input;
