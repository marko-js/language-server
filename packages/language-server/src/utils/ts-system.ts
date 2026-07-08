import ts from "typescript/lib/tsserverlibrary";

// The `ts.System` the language server reads outside the language-service host
// (config discovery, module resolution). Defaults to Node's `ts.sys`; the
// browser build swaps in a virtual-disk-backed system via `setSystem`.
//
// This indirection exists because the bundled `typescript` namespace exposes
// `ts.sys` as a non-configurable getter, so it cannot be replaced in place --
// but consumers can read this live binding instead.
export let system: ts.System = ts.sys;

export function setSystem(next: ts.System) {
  system = next;
}
