# Marko Language Support

Using the [Language Server Protocol](https://langserver.org/) to improve Marko's developer experience.
Server implementation can be found [here](server).

![image](https://user-images.githubusercontent.com/1958812/62816318-f30e9700-bad9-11e9-82ba-ff3b360eb1f7.png)

## How to use

### VS Code

- install [`Marko VSCode`](https://marketplace.visualstudio.com/items?itemName=Marko-JS.marko-vscode) from the marketplace ([plugin source](clients/vscode))

### Emacs

- install [`eglot`](https://github.com/joaotavora/eglot)
- [`npm i -g @marko/language-server`](https://www.npmjs.com/package/@marko/language-server)
- add the `marko-language-server` executable to `eglot-server-programs`

### Neovim

- install [coc.nvim](https://github.com/neoclide/coc.nvim)
- [`npm i -g @marko/language-server`](https://www.npmjs.com/package/@marko/language-server)
- follow the [instructions](https://github.com/neoclide/coc.nvim/wiki/Language-servers#register-custom-language-servers) using `marko-language-server` as the executable

### IntelliJ/Webstorm

- install [LSP Support](https://plugins.jetbrains.com/plugin/10209-lsp-support) from the marketplace
- [`npm i -g @marko/language-server`](https://www.npmjs.com/package/@marko/language-server)
- [update the server definitions](https://github.com/gtache/intellij-lsp#add-a-language-server) to include the `marko-language-server` executable for the `.marko` extension

### Sublime

- run `Package Control: Install Package` from the command palette, then select [LSP](https://github.com/tomv564/LSP)
- [`npm i -g @marko/language-server`](https://www.npmjs.com/package/@marko/language-server)
- run `LSP: Enable Language Server` from the command palette and register `marko-language-server`.

### Atom (coming soon)

- want to contribute? [atom-languageclient](https://github.com/atom/atom-languageclient)

### Brackets (coming soon)

- want to contribute? [creating an lsp extension](https://github.com/adobe/brackets/wiki/Language-Server-Protocol-Support-in-Brackets#creating-an-lsp-extension)

## Development

We include a `.vscode` directory that contains launch configurations for developers.
You can find three settings that will help you get started. The workflow will be
explained in the following items:

- Run `$ npm install` installs dependencies for the extension and the server.
- Run `$ npm run watch` to compile and re-compile the client and server in the background on each change.
- Open this folder in VS Code. In the Debug viewlet, run the 'All' task, this will open a new vscode instance and attach debuggers for the client and server code.
- Open your Marko project (You can use https://github.com/marko-js-samples/ui-components-playground to experiment as well)
- Now you can add breakpoints to the client and the server. If you change any code, you might want to restart the debug session so that all your changes get loaded.

## Contributing

Each project in this repository has different guidelines for contributing. Please check the CONTRIBUTING.md file in each project to learn more.

## Code of Conduct

This project adheres to the eBay Code of Conduct. By participating in this project you agree to abide by its terms.

## License

Use of this source code is governed by an MIT-style license that can be found in
the LICENSE file or at https://opensource.org/licenses/MIT.

## Contributors

- Diego Berrocal (@CestDiego)
- Manthan Doshi
