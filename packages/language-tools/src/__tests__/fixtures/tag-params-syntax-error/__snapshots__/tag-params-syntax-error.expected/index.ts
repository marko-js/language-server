export type Input = Record<string, never>;
function ˍ(input: Input) {
const out = 1 as unknown as Marko.Out;
const component = 1 as unknown as ட;
const state = 1 as unknown as typeof component extends { state: infer State extends object } ? State : never;
Marko.ட.noop({ input, out, component, state });
Marko.ட.render(custom)({
/*custom*/
[/*custom*/
"renderBody"]: Marko.ட.body(function *(
a, %b
) {
return;

})
});
return;

}
class ட extends Marko.Component<Input>{};
declare namespace ˍ {
const id: unique symbol;
const template: Marko.Template<typeof id>;
}
export default 1 as unknown as typeof ˍ.template;
declare global {
namespace Marko {
interface CustomTags {
[ˍ.id]:CustomTag<Input, ReturnType<typeof ˍ>, ட>
}
}
}
