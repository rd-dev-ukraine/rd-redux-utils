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

    result.TYPE = actionType;

    return result;
}

export interface ActionCreatorFn<TActionData> {
    /**
     * Creates instance of action with specified type and data.
     */
    (data: TActionData): Action & TActionData;

    /** Type guard which checks if action created with this action creator. */
    is(action?: Action): action is TActionData & Action;

    /** Returns type string for the action. */
    TYPE: string;

    /** An object which properties could be used in typeof expression. */
    readonly typeOf: {
        /** typeof returns a type of the action produced by the action creator. */
        readonly action: TActionData & Action;
    };
}
