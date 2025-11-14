import type { Input } from "./index.marko";

export default class<T> extends Marko.Component<Input<T>> {
  handleClick() {}
  "strange-handler"() {}
}
