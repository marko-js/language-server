# Marko Type Check (@marko/type-check)

A CLI for running type checks on .marko, .ts, and .js files.

## Installation

```
npm install --save-dev @marko/type-check
```

## Usage

Use the `marko-type-check` or `mtc` command followed by options to run type checks on your project files:

```terminal
marko-type-check [options]

# or with the shorthand
mtc [options]
```

## Options

| Option           | Alias | Description                                                            | Default Value                      |
| ---------------- | ----- | ---------------------------------------------------------------------- | ---------------------------------- |
| --project <path> | -p    | Path to the tsconfig or jsconfig file                                  | ./tsconfig.json or ./jsconfig.json |
| --display <type> | -d    | Set the display type for error output. Choices: codeframe or condensed | codeframe                          |
| --help           | -h    | Display the help text                                                  |                                    |
| --version        | -v    | Display the CLI version, Marko version, and TypeScript version         |                                    |

## Examples

### Run type check with the default tsconfig.json file:

```
marko-type-check
```

### Run type check with a custom jsconfig.json file and condensed error output:

```
mtc -p ./jsconfig.json -d condensed
```

## FAQ

### What files are emitted?

Outputs files are similar to the [`tsc` cli in build mode](https://www.typescriptlang.org/docs/handbook/project-references.html). Meaning `.js` and `.d.ts` files will be output (depending on your project config). Beyond that `.marko` files _with their types stripped_ and an associated `.d.marko.ts` file will be output that serve the same purpose as the `.js` and `.d.ts` files.

### What is a `.d.marko.ts` file?

A template's declaration: the one TypeScript emits for the template's script, as it emits a `.d.ts` for a `.ts` file. It names only Marko's own types, as one written by hand would:

```ts
export interface Input<T> {
  items: T[];
}
declare const Input: Marko.TemplateOf<<T>(input: Input<T>) => void>;
export default Input;
```

A template is a `Marko.Template<Input, Return>`, and a generic one is `Marko.TemplateOf` its signature, from which a tag infers its type arguments (`Marko.TemplateOf` is declared by Marko's types as of `marko` 5.41 and 6.5). A Class API template's also has its `Component` (`Marko.Template<Input, void> & { Component: typeof Component }`), which tells it from one written in the Tags API. A split component's template takes its component's input, `Marko.ComponentInput<typeof import("./x.component")>`, and exports its `Component` as `Marko.ComponentOf<typeof import("./x.component")>` (as of `marko` 5.43). Its methods are those of the runtime that reads it; a generic template's take its input for its type parameters' constraints, so to call them with a given input, assert it as a template of that input: `const numbers = List as Marko.Template<Input<number>>;`.

A template of another project (eg a package's) with an `x.d.marko.ts` next to it is typed by the declaration, as a `.js` file is by its `.d.ts`. That is what TypeScript itself reads for an import of `x.marko`, with `allowArbitraryExtensions`. A project's own template is typed from its source, and its declaration is emitted from it, whatever `x.d.marko.ts` is beside it (eg the one a build without an `outDir` wrote).

### What is a `.d.marko` file?

A declaration written in Marko syntax, whose script is read as TypeScript, which this tool emitted before `.d.marko.ts`. One is still read next to a template that has no `.d.marko.ts`, or where a tag's `types` names it (as Marko's own core tags do), and one written by hand in a project ships as it is written.

### Does this replace `tsc`?

Yes this replaces `tsc` since in order to provide proper type checking for `.marko` files the `.ts` and `.js` files must be processed as well.

## Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) for more information on how to contribute.

## License

This project is licensed under the [MIT License](LICENSE).
