// A split component whose class declares its input without exporting it.
interface Input {
  label: string;
}

export default class extends Marko.Component<Input> {
  handleClick() {}
}
