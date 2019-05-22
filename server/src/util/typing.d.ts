/*
Copyright 2018 eBay Inc.
Author/Developer: Diego Berrocal

Use of this source code is governed by an MIT-style
license that can be found in the LICENSE file or at
https://opensource.org/licenses/MIT.
*/

declare module "@marko/prettyprint";
declare module "marko/compiler";
declare module "marko/env";
declare module "htmljs-parser";

interface IMarkoErrorOutput {
    code: string;
    context: any;
    message: string;
    node: any;
    pos: IMarkoErrorPosInfo;
    endPos: IMarkoErrorPosInfo;
}

interface IMarkoErrorPosInfo {
    column: number;
    line: number;
    path: string;
}