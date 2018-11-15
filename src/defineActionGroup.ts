import { ActionGroup } from "./ActionGroup";

import { ActionGroupImpl } from "./ActionGroupImpl";

export function defineActionGroup<TCommonProps>(typePrefix: string): ActionGroup<TCommonProps> {
    return new ActionGroupImpl<TCommonProps, never>(typePrefix);
}
