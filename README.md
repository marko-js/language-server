# Marko Language Support

Using the [Language Server Protocol](https://langserver.org/) to improve Marko's developer experience. 
Server implementation can be found [here](server).

## Supported clients
- [vscode](clients/vscode)

# Development

We include a `.vscode` directory that contains launch configurations for developers.
You can find three settings that will help you get started. The workflow will be
explained in the following items:

* Run `$ npm install` install dependencies for the extension and the server.
* Run `$ npm run watch` to compile and re-compile the client and server in the background on each change.
* Open this folder in VS Code. In the Debug viewlet, run the 'All' task, this will open a new vscode instance and attach debuggers for the client and server code.
* Open your Marko project (You can use https://github.com/marko-js-samples/ui-components-playground to experiment as well)
* Now you can add breakpoints to the client and the server. If you change any code, you might want to restart the debug session so that all your changes get loaded.

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
