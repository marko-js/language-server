export interface Input {}
(function (this: void) {
  const input = Marko._.any as Input;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  const list = Marko._.hoist(() => __marko_internal_hoist__list);
  const record = Marko._.hoist(() => __marko_internal_hoist__record);
  const hoistedFromForOf = Marko._.hoist(
    () => __marko_internal_hoist__hoistedFromForOf,
  );
  const hoistedFromForIn = Marko._.hoist(
    () => __marko_internal_hoist__hoistedFromForIn,
  );
  const hoistedFromForTo = Marko._.hoist(
    () => __marko_internal_hoist__hoistedFromForTo,
  );
  const hoistedFromForUntil = Marko._.hoist(
    () => __marko_internal_hoist__hoistedFromForUntil,
  );
  {
    const list = Marko._.returned(() => __marko_internal_rendered_1);
    const __marko_internal_rendered_1 = Marko._.renderTemplate(
      __marko_internal_module_1().default,
    )()()({
      value: [
        {
          value: 1,
        },
        {
          value: 2,
        },
        {
          value: 3,
        },
      ] as const,
    });
    Marko._.forOfTag(
      {
        of: list,
      },
      () => {
        return Marko._.voidReturn;
      },
    );
    Marko._.forOfTag(
      {
        of: list,
      },
      (item, index, all) => {
        [item];
        [index];
        [all];
        return Marko._.voidReturn;
      },
    );
    Marko._.forOfTag(
      {
        of: list,
        by: (item, index) => `${item}-${index}`,
      },
      () => {
        return Marko._.voidReturn;
      },
    );
    Marko._.forOfTag(
      {
        of: list,
        by: (item) => item.value,
      },
      (item) => {
        [item.value];
        return Marko._.voidReturn;
      },
    );
    const __marko_internal_rendered_2 = Marko._.forOfTag(
      {
        of: list,
      },
      (item) => {
        {
          const hoistedFromForOf = Marko._.returned(
            () => __marko_internal_rendered_3,
          );
          const __marko_internal_rendered_3 = Marko._.renderTemplate(
            __marko_internal_module_2().default,
          )()()({
            value: () => item.value,
          });
          return new (class MarkoReturn<Return = void> {
            readonly [Marko._.scope] = { hoistedFromForOf };
            declare return: Return;
            constructor(_?: Return) {}
          })();
        }
      },
    );
    Marko._.forOfTag(
      {
        of: list,
      },
      (item) => {
        return Marko._.voidReturn;
      },
    );
    Marko._.renderTemplate(__marko_internal_module_3().default)()()({
      value() {
        hoistedFromForOf;
        //^?
      },
    });
    {
      const record = Marko._.returned(() => __marko_internal_rendered_4);
      const __marko_internal_rendered_4 = Marko._.renderTemplate(
        __marko_internal_module_1().default,
      )()()({
        value: { a: 1, b: 2 } as const,
      });
      Marko._.forInTag(
        {
          in: record,
        },
        (key, value) => {
          [key];
          [value];
          return Marko._.voidReturn;
        },
      );
      Marko._.forInTag(
        {
          in: record,
          by: (key, value) => `${key}-${value}`,
        },
        () => {
          return Marko._.voidReturn;
        },
      );
      const __marko_internal_rendered_5 = Marko._.forInTag(
        {
          in: record,
        },
        (key) => {
          {
            const hoistedFromForIn = Marko._.returned(
              () => __marko_internal_rendered_6,
            );
            const __marko_internal_rendered_6 = Marko._.renderTemplate(
              __marko_internal_module_2().default,
            )()()({
              value: () => key,
            });
            return new (class MarkoReturn<Return = void> {
              readonly [Marko._.scope] = { hoistedFromForIn };
              declare return: Return;
              constructor(_?: Return) {}
            })();
          }
        },
      );
      Marko._.renderTemplate(__marko_internal_module_3().default)()()({
        value() {
          hoistedFromForIn;
          //^?
        },
      });
      Marko._.forToTag(
        {
          to: 10,
        },
        (index) => {
          [index];
          return Marko._.voidReturn;
        },
      );
      Marko._.forToTag(
        {
          to: 10,
          by: (index) => `${index}`,
        },
        () => {
          return Marko._.voidReturn;
        },
      );
      Marko._.forToTag(
        {
          from: 1,
          to: 10,
        },
        (index) => {
          [index];
          return Marko._.voidReturn;
        },
      );
      Marko._.forToTag(
        {
          to: 10,
          step: 2,
        },
        (index) => {
          [index];
          return Marko._.voidReturn;
        },
      );
      const __marko_internal_rendered_7 = Marko._.forToTag(
        {
          to: 10,
        },
        (index) => {
          {
            const hoistedFromForTo = Marko._.returned(
              () => __marko_internal_rendered_8,
            );
            const __marko_internal_rendered_8 = Marko._.renderTemplate(
              __marko_internal_module_2().default,
            )()()({
              value: () => index,
            });
            return new (class MarkoReturn<Return = void> {
              readonly [Marko._.scope] = { hoistedFromForTo };
              declare return: Return;
              constructor(_?: Return) {}
            })();
          }
        },
      );
      Marko._.renderTemplate(__marko_internal_module_3().default)()()({
        value() {
          hoistedFromForUntil;
          //^?
        },
      });
      Marko._.forUntilTag(
        {
          until: 10,
        },
        (index) => {
          [index];
          return Marko._.voidReturn;
        },
      );
      Marko._.forUntilTag(
        {
          until: 10,
          by: (index) => `${index}`,
        },
        () => {
          return Marko._.voidReturn;
        },
      );
      Marko._.forUntilTag(
        {
          from: 1,
          until: 10,
        },
        (index) => {
          [index];
          return Marko._.voidReturn;
        },
      );
      Marko._.forUntilTag(
        {
          until: 10,
          step: 2,
        },
        (index) => {
          [index];
          return Marko._.voidReturn;
        },
      );
      const __marko_internal_rendered_9 = Marko._.forUntilTag(
        {
          until: 10,
        },
        (index) => {
          {
            const hoistedFromForUntil = Marko._.returned(
              () => __marko_internal_rendered_10,
            );
            const __marko_internal_rendered_10 = Marko._.renderTemplate(
              __marko_internal_module_2().default,
            )()()({
              value: () => index,
            });
            return new (class MarkoReturn<Return = void> {
              readonly [Marko._.scope] = { hoistedFromForUntil };
              declare return: Return;
              constructor(_?: Return) {}
            })();
          }
        },
      );
      Marko._.renderTemplate(__marko_internal_module_3().default)()()({
        value() {
          hoistedFromForUntil;
          //^?
        },
      });
      Marko._.forTag({}, (index) => {
        return Marko._.voidReturn;
      });
      var __marko_internal_hoist__list = list;
      var __marko_internal_hoist__record = record;
      var {
        hoistedFromForOf: __marko_internal_hoist__hoistedFromForOf,
        hoistedFromForIn: __marko_internal_hoist__hoistedFromForIn,
        hoistedFromForTo: __marko_internal_hoist__hoistedFromForTo,
        hoistedFromForUntil: __marko_internal_hoist__hoistedFromForUntil,
      } = Marko._.hoisted(
        Marko._.readScopes({
          __marko_internal_rendered_2,
          __marko_internal_rendered_5,
          __marko_internal_rendered_7,
          __marko_internal_rendered_9,
        }),
      );
    }
  }
  Marko._.noop({
    list,
    record,
    hoistedFromForOf,
    hoistedFromForIn,
    hoistedFromForTo,
    hoistedFromForUntil,
    input,
    $global,
    $signal,
  });
  return;
})();
const __marko_internal_api = "tags";
export { __marko_internal_api as "~api" };
class Template extends Marko._.Template<Input> {}
export default new Template();
declare function __marko_internal_module_1(): typeof import("@marko/runtime-tags/tags/let.d.marko");
declare function __marko_internal_module_2(): typeof import("@marko/runtime-tags/tags/const.d.marko");
declare function __marko_internal_module_3(): typeof import("@marko/runtime-tags/tags/effect.d.marko");
