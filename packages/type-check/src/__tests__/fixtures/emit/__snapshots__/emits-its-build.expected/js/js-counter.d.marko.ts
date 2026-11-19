/** @typedef {{ start: number }} Input */ /**
    * @extends {Marko.Component<Input>}
    */
export class Component extends Marko.Component<Input, any> {
    constructor();
    count: number;
    onCreate(input: Input): void;
    increment(): void;
}
export default Input;
export type Input = {
    start: number;
};
declare const Input: Marko.Template<Input, void> & {
    Component: typeof Component;
};
