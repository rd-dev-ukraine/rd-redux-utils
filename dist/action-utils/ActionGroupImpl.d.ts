import { ActionGroup } from "./ActionGroup";
import { Action, Reducer } from "redux";
import { ActionCreatorFn } from "./defineAction";
import { StateHash } from "../reducer-utils";
export declare class ActionGroupImpl<TCommonProps, TExtraActions extends Action> implements ActionGroup<TCommonProps, TExtraActions> {
    readonly typePrefix: string;
    private includedActions;
    private childGroups;
    constructor(typePrefix: string, parent?: ActionGroup<any, any>);
    TYPE_PREFIX: string;
    defineAction: <TProps>(type: string) => ActionCreatorFn<TCommonProps & TProps>;
    isGroupAction: (action?: Action<any> | undefined) => action is TExtraActions | (TCommonProps & Action<any>);
    isExactlyGroupAction: (action?: Action<any> | undefined) => action is TExtraActions | (TCommonProps & Action<any>);
    tryExtractData: (action?: Action<any> | undefined) => TCommonProps | undefined;
    defineActionGroup: <TNestedProps>(typePrefix: string) => ActionGroup<TCommonProps & TNestedProps, TExtraActions>;
    includeAction: <TAction extends Action<any>>(test: (action: Action<any>) => action is TAction, extractProps: (action: TAction) => true | TCommonProps) => ActionGroup<TCommonProps, TExtraActions | TAction>;
    hashedReducer: <TState>(keySelector: (props: TCommonProps) => string, elementReducer: Reducer<TState, import("redux").AnyAction>) => Reducer<StateHash<TState>, import("redux").AnyAction>;
    indexedReducer: <TState>(indexSelector: (props: TCommonProps) => number, elementReducer: Reducer<TState, import("redux").AnyAction>) => Reducer<TState[], import("redux").AnyAction>;
    private isOwnAction;
    private extractDataCore;
}
//# sourceMappingURL=ActionGroupImpl.d.ts.map