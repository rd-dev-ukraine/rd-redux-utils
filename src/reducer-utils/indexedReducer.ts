import { Action, Reducer } from "redux";

export type IndexElementKeyType = number;
export type IndexSkipType = null | false | undefined;
export type IndexApplyToAllElementsType = true;

/**
 * Creates reducer function which applies to an element of array with index based on action.
 *
 * @param indexSelector A function which selects an element index based on action.
 *     Function may return
 *     * a number - in this case element reducer will be applied to an element at this index;
 *     * undefined, false or null - then reducing will be skipped and current state will be returned
 *     * true - in this case element selector will be applied to all existing elements in state.
 * @param elementReducer A reducer function which applies action to an element state.
 * @returns Reducer function which applied to an hash of elements.
 */
export function indexedReducer<TState>(
    indexSelector: (action: Action) => IndexElementKeyType | IndexSkipType | IndexApplyToAllElementsType,
    elementReducer: (state: TState | undefined, action: Action, index?: IndexElementKeyType) => TState
): Reducer<TState[]> {
    if (!indexSelector) {
        throw new Error("Index selector function is not defined.");
    }
    if (!elementReducer) {
        throw new Error("Element reducer function is not defined.");
    }
    return (state: TState[] | undefined, action: Action): TState[] => {
        if (state === undefined) {
            throw new Error("Undefined state is passed to reducer, expected state to have some default value.");
        }

        const index = indexSelector(action);

        if (index === undefined || index === false || index === null) {
            return state;
        }

        if (index === true) {
            return state.reduce((result, element, index) => {
                const newState = elementReducer(element, action, index);

                if (element !== newState) {
                    const newArray = [...result];
                    newArray[index] = newState;
                    return newArray;
                }

                return result;
            }, state);
        }

        const newState = elementReducer(state[index], action, index);
        if (newState !== state[index]) {
            const newArray = [...state];
            newArray[index] = newState;
            return newArray;
        }

        return state;
    };
}
