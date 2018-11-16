import { Action, Reducer } from "redux";

export type HashElementKeyType = string;
export type HashSkipType = null | false | undefined;
export type HashApplyToAllElementsType = true;

/**
 * Creates reducer function which applies to an element with key based on an action.
 *
 * @param keySelector A function which selects an element key based on action.
 *     Function may return
 *     * a string - in this case element reducer will be applied to an element with this key
 *     * undefined, false or null - then reducing will be skipped and current state will be returned
 *     * true - in this case element selector will be applied to all existing keys in state.
 * @param elementReducer A reducer function which applies action to an element state.
 * @returns Reducer function which applied to an hash of elements.
 */
export function hashedReducer<TState>(
    keySelector: (action: Action) => HashElementKeyType | HashSkipType | HashApplyToAllElementsType,
    elementReducer: (state: TState | undefined, action: Action, key?: HashElementKeyType) => TState
): Reducer<StateHash<TState>> {
    if (!keySelector) {
        throw new Error("Key selector function is not defined.");
    }
    if (!elementReducer) {
        throw new Error("Element reducer function is not defined.");
    }

    return (state: StateHash<TState> | undefined, action: Action): StateHash<TState> => {
        if (state === undefined) {
            throw new Error("Undefined state is passed to reducer, expected state to have some default value.");
        }

        const key = keySelector(action);

        if (key === undefined || key === false || key === null) {
            return state;
        }

        if (key === true) {
            return Object.keys(state).reduce((result, key) => {
                const oldState = result[key];
                const newState = elementReducer(oldState, action, key);

                if (oldState !== newState) {
                    return {
                        ...result,
                        [key]: newState
                    };
                } else {
                    return result;
                }
            }, state);
        }

        const newState = elementReducer(state[key], action, key);
        if (newState !== state[key]) {
            return {
                ...state,
                [key]: newState
            };
        }

        return state;
    };
}

export interface StateHash<TState> {
    [key: string]: TState;
}
