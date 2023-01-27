import "./marko-internal";
import "./marko-core";

declare global {
  namespace Marko {
    /** A mutable global object for the current render. */
    export interface Global {
      [x: PropertyKey]: unknown;
    }

    export interface Out<C extends Component = Component<any>>
      extends PromiseLike<RenderResult<C>> {
      /** The underlying ReadableStream Marko is writing into. */
      stream: unknown;
      /** A mutable global object for the current render. */
      global: Global;
      /** Disable all async rendering. Will error if something beings async. */
      sync(): void;
      /** Returns true if async rendering is disabled. */
      isSync(): boolean;
      /** Write unescaped text at the current stream position. */
      write(val: string | void): this;
      /** Write javascript content to be merged with the scripts Marko sends out on the next flush. */
      script(val: string | void): this;
      /** Returns the currently rendered html content. */
      toString(): string;
      /** Starts a new async/forked stream. */
      beginAsync(options?: {
        name?: string;
        timeout?: number;
        last?: boolean;
      }): Out;
      /** Marks the current stream as complete (async streams may still be executing). */
      end(val?: string | void): this;
      emit(eventName: PropertyKey, ...args: any[]): boolean;
      on(eventName: PropertyKey, listener: (...args: any[]) => any): this;
      once(eventName: PropertyKey, listener: (...args: any[]) => any): this;
      prependListener(
        eventName: PropertyKey,
        listener: (...args: any[]) => any
      ): this;
      removeListener(
        eventName: PropertyKey,
        listener: (...args: any[]) => any
      ): this;
      /** Register a callback executed when the last async out has completed. */
      onLast(listener: (next: () => void) => unknown): this;
      /** Pipe Marko's stream to another stream. */
      pipe(stream: unknown): this;
      /** Emits an error on the stream. */
      error(e: Error): this;
      /** Schedules a Marko to flush buffered html to the underlying stream. */
      flush(): this;
      /** Creates a detached out stream (used for out of order flushing). */
      createOut(): Out;
      /** Write escaped text at the current stream position. */
      text(val: string | void): void;
    }

    /** Body content created from by a component, typically held in an object with a renderBody property. */
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    export interface Body<
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      in Params extends readonly any[] = [],
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      out Return = void
    > {}

    /** Valid data types which can be passed in as a <${dynamic}/> tag name. */
    export type DynamicTagName =
      | {
          renderBody?: Body<any, any> | Template<any> | string | void | false;
        }
      | Body<any, any>
      | Template
      | string
      | void
      | false;

    /** Extract the return tag type from a renderBody. */
    export type BodyReturnType<B> = B extends Body<any, infer Return, any>
      ? Return
      : never;

    /** Extract the tag parameter types received by a renderBody. */
    export type BodyParamaters<B> = B extends Body<infer Params, any, any>
      ? Params
      : never;

    export abstract class Component<Input = unknown> implements Emitter {
      /** A unique id for this instance. */
      public readonly id: string;
      /** The top level element rendered by this instance. */
      public readonly el: Element | void;
      /** The attributes passed to this instance. */
      public readonly input: Input;
      /** Mutable state that when changed causes a rerender. */
      public state: unknown;
      /** @deprecated */
      public readonly els: Element[];
      /**
       * Note: a Marko.Component class should never have a constructor and cannot be called with "new".
       * @deprecated
       * */
      constructor(_: never);

      /** Returns the amount of event handlers listening to a specific event. */
      listenerCount(eventName: PropertyKey): number;
      /**
       * Used to wrap an existing event emitted and ensure that all events are
       * cleaned up once this component is destroyed
       * */
      subscribeTo(
        emitter: unknown
      ): Omit<Emitter, "listenerCount" | "prependListener" | "emit">;
      /** Emits an event on the component instance. */
      emit(eventName: PropertyKey, ...args: any[]): boolean;
      /** Listen to an event on the component instance. */
      on(eventName: PropertyKey, listener: (...args: any[]) => any): this;
      /** Listen to an event on the component instance once. */
      once(eventName: PropertyKey, listener: (...args: any[]) => any): this;
      /** Listen to an event on the component instance before all other listeners. */
      prependListener(
        eventName: PropertyKey,
        listener: (...args: any[]) => any
      ): this;
      /** Remove a listener from the component instance. */
      removeListener(
        eventName: PropertyKey,
        listener: (...args: any[]) => any
      ): this;
      /** Remove all listeners from the component instance. */
      removeAllListeners(eventName?: PropertyKey): this;
      /** Removes the component instance from the DOM and cleans up all active event handlers including all children. */
      destroy(): void;
      /** Schedule an update (similar to if a state had been changed). */
      forceUpdate(): void;
      /** Generates a unique id derived from the current unique instance id (similar to :scoped in the template). */
      elId(key?: string, index?: number): string;
      /** @alias elId */
      getElId(key?: string, index?: number): string;
      /** Gets an element reference by its `key` attribute in the template. */
      getEl<T extends Element | void = Element | void>(
        key?: string,
        index?: number
      ): T;
      /** Gets all element references by their `key` attribute in the template. */
      getEls<T extends Element[] = Element[]>(key: string): T;
      /** Gets a component reference by its `key` attribute in the template. */
      getComponent<T extends Component | void = Component | void>(
        key: string,
        index?: number
      ): T;
      /** Gets all component references by their `key` attribute in the template. */
      getComponents<T extends Component[] = Component[]>(key: string): T;
      /** True if this instance has been removed from the dom. */
      /** True if this instance is scheduled to rerender. */
      isDestroyed(): boolean;
      /** Replace the entire state object with a new one, removing old properties. */
      replaceState(state: Record<string, any>): void;
      /**
       * Update a property on this.state (should prefer mutating this.state directly).
       * When passed an object as the first argument, it will be merged into the state.
       */
      setState(name: string, value: unknown): void;
      /** Schedules an update related to a specific state property and optionally updates the value. */
      setStateDirty(name: string, value?: unknown): void;
      /** Synchronously flush any scheduled updates. */
      update(): void;
      /** Appends the dom for the current instance to a parent DOM element. */
      appendTo(target: ParentNode): this;
      /** Inserts the dom for the current instance after a sibling DOM element. */
      insertAfter(target: ChildNode): this;
      /** Inserts the dom for the current instance before a sibling DOM element. */
      insertBefore(target: ChildNode): this;
      /** Prepends the dom for the current instance to a parent DOM element. */
      prependTo(target: ParentNode): this;
      /** Replaces an existing DOM element with the dom for the current instance. */
      replace(target: ChildNode): this;
      /** Replaces the children of an existing DOM element with the dom for the current instance. */
      replaceChildrenOf(target: ParentNode): this;
    }

    /** The top level api for a Marko Template. */
    export interface Template<Id extends keyof CustomTags2<any, any> = any> {
      /** Creates a Marko compatible output stream. */
      createOut(): Out;
      // /** Render a template in sync mode. */
      renderSync<A, B>(
        input: CustomTags2<A, B>[Id]["input"] & { $global?: Global }
      ): RenderResult<CustomTags2<A, B>[Id]["component"]>;
      /** Render a template in sync mode. */
      renderToString<A, B>(
        input: CustomTags2<A, B>[Id]["input"] & { $global?: Global }
      ): string;
      /** Render a template and return a Marko output stream */
      render<A, B>(
        input: CustomTags2<A, B>[Id]["input"] & { $global?: Global }
      ): Out<CustomTags2<A, B>[Id]["component"]>;
      /** Render a template and stream it into an existing streamable api */
      render<A, B>(
        input: CustomTags2<A, B>[Id]["input"] & { $global?: Global },
        stream: {
          write: (chunk: string) => void;
          end: (chunk?: string) => void;
        }
      ): Out<CustomTags2<A, B>[Id]["component"]>;
      /** Render a template and return a stream.Readable in nodejs or a ReadableStream in a web worker environment. */
      stream<A, B>(
        input: CustomTags2<A, B>[Id]["input"] & { $global?: Global }
      ): ReadableStream<string> & import("stream").Readable;
    }

    export interface RenderResult<
      out Component extends Marko.Component = Marko.Component<any>
    > {
      /** Returns the component created as a result of rendering the template. */
      getComponent(): Component;
      getComponents(selector?: any): any;
      /** Triggers the mount lifecycle of a component without necessarily attaching it to the DOM. */
      afterInsert(host?: any): this;
      /** Gets the DOM node rendered by a template. */
      getNode(host?: any): Node;
      /** Gets the HTML output of the rendered template. */
      toString(): string;
      /** Appends the dom of the rendered template to a parent DOM element. */
      appendTo(target: ParentNode): this;
      /** Inserts the dom of the rendered template after a sibling DOM element. */
      insertAfter(target: ChildNode): this;
      /** Inserts the dom of the rendered template before a sibling DOM element. */
      insertBefore(target: ChildNode): this;
      /** Prepends the dom of the rendered template to a parent DOM element. */
      prependTo(target: ParentNode): this;
      /** Replaces an existing DOM element with the dom of the rendered template. */
      replace(target: ChildNode): this;
      /** Replaces the children of an existing DOM element with the dom of the rendered template. */
      replaceChildrenOf(target: ParentNode): this;
      out: Out<Component>;
      /** @deprecated */
      document: any;
      /** @deprecated */
      getOutput(): string;
      /** @deprecated */
      html: string;
      /** @deprecated */
      context: Out<Component>;
    }

    export interface Emitter {
      listenerCount(eventName: PropertyKey): number;
      emit(eventName: PropertyKey, ...args: any[]): boolean;
      on(eventName: PropertyKey, listener: (...args: any[]) => any): this;
      once(eventName: PropertyKey, listener: (...args: any[]) => any): this;
      prependListener(
        eventName: PropertyKey,
        listener: (...args: any[]) => any
      ): this;
      removeListener(
        eventName: PropertyKey,
        listener: (...args: any[]) => any
      ): this;
      removeAllListeners(eventName?: PropertyKey): this;
    }

    export type Repeated<T> = [T, T, ...T[]];
    export type Repeatable<T> = T | Repeated<T>;
    export type MaybeRepeatable<T> = undefined | Repeatable<T>;

    interface NativeTag<
      Return extends Element = Element,
      Input = Record<string, unknown>
    > {
      input: Input;
      return: { value(): Return };
    }

    interface NativeTags {
      [x: PropertyKey]: NativeTag;
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-interface, @typescript-eslint/no-unused-vars
    interface NativeTags1<A> extends NativeTags {}
    // eslint-disable-next-line @typescript-eslint/no-empty-interface, @typescript-eslint/no-unused-vars
    interface NativeTags2<A, B> extends NativeTags1<A> {}

    interface CustomTag<
      Input = unknown,
      Return = unknown,
      Component = Marko.Component
    > {
      input: Input;
      return: Return;
      component: Component;
    }

    interface CustomTags {
      [x: PropertyKey]: CustomTag;
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-interface, @typescript-eslint/no-unused-vars
    interface CustomTags1<A> extends CustomTags {}
    // eslint-disable-next-line @typescript-eslint/no-empty-interface, @typescript-eslint/no-unused-vars
    interface CustomTags2<A, B> extends CustomTags1<A> {}
  }
}

export {};
