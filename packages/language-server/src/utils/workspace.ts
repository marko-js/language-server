import type { Connection } from "vscode-languageserver";

let connection!: Connection;
const configChangeHandlers: Set<ConfigChangeHandler> = new Set();
const settingsCache = new Map<string, any>();

export async function getConfig<T = any>(section: string): Promise<T> {
  let cached = settingsCache.get(section);
  if (!cached) {
    try {
      cached = (await connection.workspace.getConfiguration(section)) || {};
      settingsCache.set(section, cached);
    } catch {
      // ignore
    }
  }

  return cached;
}

export type ConfigChangeHandler = () => void;
export function onConfigChange(handler: ConfigChangeHandler) {
  configChangeHandlers.add(handler);
}

export function setup(_: Connection) {
  connection = _;
  connection.onDidChangeConfiguration(() => {
    settingsCache.clear();
    emitConfigChange();
  });
}

function emitConfigChange() {
  for (const handler of configChangeHandlers) {
    handler();
  }
}
