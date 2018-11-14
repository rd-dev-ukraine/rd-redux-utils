import { Action } from "redux";
import { composeActionType } from "./actionTypeUtils";

export function defineAction<TActionData>(type: string): ActionCreatorFn<TActionData> {
    const actionType = composeActionType(type);
    const result: ActionCreatorFn<TActionData> = ((data: TActionData) => ({
        ...(data as any),
        type: actionType
    })) as any;

    result.is = function(action?: Action): action is TActionData & Action {
        return !!action && action.type === actionType;
    };

    return result;
}

export interface ActionCreatorFn<TActionData> {
    (data: TActionData): Action & TActionData;

    is(action?: Action): action is TActionData & Action;
}
