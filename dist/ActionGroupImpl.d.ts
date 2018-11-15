import { ActionGroup } from "./ActionGroup";
import { Action } from "redux";
import { ActionCreatorFn } from "./defineAction";
export declare class ActionGroupImpl<TCommonProps, TExtraActions extends Action> implements ActionGroup<TCommonProps, TExtraActions> {
    readonly typePrefix: string;
    private includedActions;
    private childGroups;
    constructor(typePrefix: string, parent?: ActionGroup<any, any>);
    readonly TYPE_PREFIX: string;
    defineAction: <TProps>(type: string) => ActionCreatorFn<TCommonProps & TProps>;
    isGroupAction: (action?: Action<any> | undefined) => action is TExtraActions | (TCommonProps & Action<any>);
    isExactlyGroupAction: (action?: Action<any> | undefined) => action is TExtraActions | (TCommonProps & Action<any>);
    tryExtractData: (_action?: Action<any> | undefined) => TCommonProps;
    defineActionGroup: <TNestedProps>(typePrefix: string) => ActionGroup<TCommonProps & TNestedProps, TExtraActions>;
    includeAction: <TAction extends Action<any>>(test: (action: Action<any>) => action is TAction, extractProps: (action: TAction) => TCommonProps) => ActionGroup<TCommonProps, TExtraActions | TAction>;
}
//# sourceMappingURL=ActionGroupImpl.d.ts.map