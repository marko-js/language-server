// A split component whose class declares its input.
export interface Input {
  label: string;
}

export default class extends Marko.Component<Input> {
  handleClick() {}
}
