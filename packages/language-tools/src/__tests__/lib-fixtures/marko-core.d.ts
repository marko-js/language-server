declare global {
  namespace Marko {
    interface NativeTags {
      div: NativeTag<
        HTMLDivElement,
        {
          [x: string]: unknown;
          onClick?(
            event: GlobalEventHandlersEventMap["click"],
            element: HTMLDivElement
          ): void;
        }
      >;
      span: NativeTag<HTMLSpanElement, Record<string, any>>;
    }
  }
}

export {};
