export interface Input {
  size?: "large" | "small";
  renderBody: Marko.Body;
}

export default class extends Marko.Component<Input> {}
