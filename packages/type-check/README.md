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
| --emit           | -e    | Emit .js, .d.ts, .marko (with types stripped), and .d.marko files      | false                              |
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

### Run type check and emit output files:

```
marko-type-check -e
```

## FAQ

### What files are emitted with the `--emit` option?

The `emit` option outputs files similar to the [`tsc` cli](https://www.typescriptlang.org/docs/handbook/compiler-options.html). Meaning `.js` and `.d.ts` files will be output. Beyond that `.marko` files _with their types stripped_ and an associated `.d.marko` file will be output that serve a similar purpose to the `.js` and `.d.ts` files.

### What is a `.d.marko` file?

A `.d.marko` files is similar to a `.d.ts` file. All script content in the file will be processed as if the Marko script-lang was typescript and the Marko-VSCode plugin and this CLI will both prefer loading a `.d.marko` over an adjacent `.marko` file. The `.d.marko` files output by this tool will strip out any runtime code such that only type information is in the `.d.marko` output.

### Does this replace `tsc`?

Yes this replaces `tsc` since in order to provide proper type checking for `.marko` files the `.ts` and `.js` files must be processed as well.

## Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) for more information on how to contribute.

## License

This project is licensed under the [MIT License](LICENSE).
