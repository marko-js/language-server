export interface Input {
  color?: string;
  destructive?: boolean;
  fanciness?: number;
}

export default class extends Marko.Component<Input> {}
