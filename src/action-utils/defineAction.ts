import { Action } from "redux";
import { composeActionType, validateActionType } from "./actionTypeUtils";

export function defineAction<TActionData>(type: string): ActionCreatorFn<TActionData> {
    return defineActionCore(type);
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
        /** typeof returns a payload type for the action. */
        readonly payload: TActionData;
    };
}

export function defineActionCore<TActionData>(type: string, prefix?: string): ActionCreatorFn<TActionData> {
    validateActionType(type);

    const actionType = composeActionType(type, prefix);
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
