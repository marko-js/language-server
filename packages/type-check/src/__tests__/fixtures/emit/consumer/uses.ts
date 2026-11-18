import type { Input as SplitInput } from "./pkg/components/split-component-input.marko";
import type { Input as SplitLocalInput } from "./pkg/components/split-local-input.marko";
import GenericNamed, {
  type Input as NamedInput,
} from "./pkg/generic-named.marko";
import GenericReturn, { type Input } from "./pkg/generic-return.marko";
import Greet from "./pkg/greet.marko";
import type { Component as StaticComponent } from "./pkg/static.marko";

declare const node: Node;
type Same<A, B> = [A] extends [B] ? ([B] extends [A] ? true : false) : false;

// What tools read from a template (eg testing libraries): a generic one's
// input and return for its type parameters' constraints, and a template of
// any input.
export const read: [
  Same<Marko.Input<typeof GenericReturn>, Input<string | number>>,
  Same<Marko.Return<typeof GenericReturn>, { value: string | number }>,
] = [true, true];
export const templates: Marko.Template<any, any>[] = [GenericReturn, Greet];

// Its methods take its input for any type arguments: called directly, they
// check its input against its constraints, and give back the constraint.
export const mounted: Same<
  ReturnType<typeof GenericReturn.mount>["value"],
  string | number
> = true;
// @ts-expect-error Not within the constraint.
GenericReturn.mount({ value: true }, node);

// Asserted to be a template of one of its inputs, its methods are that
// input's, callbacks included.
const numbers = GenericReturn as Marko.Template<
  Input<number>,
  { value: number }
>;
numbers.mount({ value: 1 }, node).value.toFixed();
// @ts-expect-error Not the input it was asserted to be.
numbers.mount({ value: "a" }, node);
const named = GenericNamed as Marko.Template<NamedInput<number>>;
named.mount({ value: 1, valueChange: (value) => value.toFixed() }, node);
// @ts-expect-error Not one of its inputs.
export const booleans = GenericReturn as Marko.Template<{ other: boolean }>;

// A Class API template with no class of its own exports its component's
// type, Marko's.
export const staticComponent: Marko.Component = null! as StaticComponent;

// A template with a split component takes its component's input, whether its
// component file exports that or not.
export const splitInput: SplitInput = { label: "a" };
// @ts-expect-error A number is no label.
export const splitLocalInput: SplitLocalInput = { label: 1 };
