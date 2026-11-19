// Stands for the file `@marko/run` generates: a route's own context.
declare module "../+page.marko" {
  namespace Run {
    type Context = { url: URL; params: { id: string } } & Marko.Global;
  }
}
export {};
