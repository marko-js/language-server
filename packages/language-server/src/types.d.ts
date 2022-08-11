declare module "lasso-package-root" {
  const x: {
    getRootDir(dir: string): string | undefined;
  };
  export default x;
}

declare module "@marko/translator-default" {
  const x: any;
  export default x;
}
