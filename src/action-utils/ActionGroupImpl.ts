import { ActionGroup } from "./ActionGroup";
import { Action, Reducer } from "redux";

import { defineActionCore, ActionCreatorFn } from "./defineAction";
import { validateActionType, composeActionType, isSubType } from "./actionTypeUtils";
import { StateHash, hashedReducer, indexedReducer } from "../reducer-utils";

export class ActionGroupImpl<TCommonProps, TExtraActions extends Action>
    implements ActionGroup<TCommonProps, TExtraActions> {
    private includedActions: IncludedAction[] = [];
    private childGroups: ActionGroup<TCommonProps, any>[] = [];

    constructor(public readonly typePrefix: string, parent?: ActionGroup<any, any>) {
        validateActionType(typePrefix);
        this.TYPE_PREFIX = composeActionType(typePrefix, parent ? parent.TYPE_PREFIX : undefined);
    }

    public TYPE_PREFIX: string = "";

    defineAction = <TProps>(type: string): ActionCreatorFn<TCommonProps & TProps> => {
        validateActionType(type);
        return defineActionCore(type, this.TYPE_PREFIX);
    };

    isGroupAction = (action?: Action): action is TExtraActions | (TCommonProps & Action) => {
        return this.isExactlyGroupAction(action) || this.childGroups.some(g => g.isGroupAction(action));
    };

    isExactlyGroupAction = (action?: Action): action is TExtraActions | (TCommonProps & Action) => {
        if (!action || !action.type) {
            return false;
        }

        if (this.isOwnAction(action)) {
            return true;
        }

        return this.includedActions.some(ia => ia.test(action));
    };

    tryExtractData = (action?: Action): TCommonProps | undefined => {
        const result = this.extractDataCore(action);

        // Result is undefined if common data can't be extracted from the action
        // Result is true when action has no common data but should be processed by group reducers.
        if (result === undefined || result === true) {
            return undefined;
        }

        return result;
    };

    defineActionGroup = <TNestedProps>(typePrefix: string): ActionGroup<TCommonProps & TNestedProps, TExtraActions> => {
        validateActionType(typePrefix);
        const childGroup = new ActionGroupImpl<TCommonProps & TNestedProps, TExtraActions>(typePrefix, this);
        this.childGroups.push(childGroup as any);
        return childGroup;
    };

    includeAction = <TAction extends Action>(
        test: (action: Action) => action is TAction,
        extractProps: (action: TAction) => TCommonProps | true
    ): ActionGroup<TCommonProps, TExtraActions | TAction> => {
        if (!test) {
            throw new Error("Test method is not defined.");
        }
        if (!extractProps) {
            throw new Error("Extract props method is not defined");
        }

        this.includedActions.push({
            test,
            extractProps
        } as any);

        return this;
    };

    hashedReducer = <TState>(
        keySelector: (props: TCommonProps) => string,
        elementReducer: Reducer<TState>
    ): Reducer<StateHash<TState>> => {
        if (!keySelector) {
            throw new Error("Key selector function is not defined.");
        }
        if (!elementReducer) {
            throw new Error("Element reducer function is not defined.");
        }

        return hashedReducer(action => {
            const data = this.extractDataCore(action);
            if (data === undefined || data === true) {
                return data;
            }
            return keySelector(data);
        }, elementReducer);
    };

    indexedReducer = <TState>(
        indexSelector: (props: TCommonProps) => number,
        elementReducer: Reducer<TState>
    ): Reducer<TState[]> => {
        if (!indexSelector) {
            throw new Error("Index selector function is not defined.");
        }
        if (!elementReducer) {
            throw new Error("Element reducer function is not defined.");
        }

        return indexedReducer(action => {
            const data = this.extractDataCore(action);
            if (data === undefined || data === true) {
                return data;
            }
            return indexSelector(data);
        }, elementReducer);
    };

    private isOwnAction = (action?: Action): action is TCommonProps & Action => {
        if (!action || !action.type) {
            return false;
        }

        if (isSubType(this.TYPE_PREFIX, action.type) === "child") {
            return true;
        }

        return false;
    };

    private extractDataCore = (action?: Action): TCommonProps | undefined | true => {
        if (!action || !action.type) {
            return undefined;
        }

        if (this.isOwnAction(action)) {
            return action;
        }

        const extractor = this.includedActions.filter(a => a.test(action))[0];
        if (extractor) {
            return (extractor.extractProps(action) as any) as TCommonProps | true;
        }

        for (const child of this.childGroups) {
            const data = (child as ActionGroupImpl<any, any>).extractDataCore(action);
            if (data) {
                return data;
            }
        }

        return undefined;
    };
}

interface IncludedAction {
    test: (action: Action) => boolean;
    extractProps: (action: Action) => Action;
}
