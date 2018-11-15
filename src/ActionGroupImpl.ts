import { ActionGroup } from "./ActionGroup";
import { Action } from "redux";

import { defineAction, ActionCreatorFn } from "./defineAction";
import { validateActionType, composeActionType, isSubType } from "./actionTypeUtils";

export class ActionGroupImpl<TCommonProps, TExtraActions extends Action>
    implements ActionGroup<TCommonProps, TExtraActions> {
    private includedActions: IncludedAction[] = [];
    private childGroups: ActionGroup<TCommonProps, any>[] = [];

    constructor(public readonly typePrefix: string, parent?: ActionGroup<any, any>) {
        validateActionType(typePrefix);
        this.TYPE_PREFIX = composeActionType(typePrefix, parent ? parent.TYPE_PREFIX : undefined);
    }

    public readonly TYPE_PREFIX: string = "";

    defineAction = <TProps>(type: string): ActionCreatorFn<TCommonProps & TProps> => {
        validateActionType(type);
        return defineAction(composeActionType(type, this.TYPE_PREFIX));
    };

    isGroupAction = (action?: Action): action is TExtraActions | (TCommonProps & Action) => {
        return this.isExactlyGroupAction(action) || this.childGroups.some(g => g.isGroupAction(action));
    };

    isExactlyGroupAction = (action?: Action): action is TExtraActions | (TCommonProps & Action) => {
        if (!action || !action.type) {
            return false;
        }

        if (isSubType(this.TYPE_PREFIX, action.type)) {
            return true;
        }

        return this.includedActions.some(ia => ia.test(action));
    };

    tryExtractData = (_action?: Action): TCommonProps => {
        throw new Error("Method not implemented.");
    };

    defineActionGroup = <TNestedProps>(typePrefix: string): ActionGroup<TCommonProps & TNestedProps, TExtraActions> => {
        validateActionType(typePrefix);
        const childGroup = new ActionGroupImpl<TCommonProps & TNestedProps, TExtraActions>(typePrefix, this);
        this.childGroups.push(childGroup as any);
        return childGroup;
    };

    includeAction = <TAction extends Action>(
        test: (action: Action) => action is TAction,
        extractProps: (action: TAction) => TCommonProps
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
}

interface IncludedAction {
    test: (action: Action) => boolean;
    extractProps: (action: Action) => Action;
}
