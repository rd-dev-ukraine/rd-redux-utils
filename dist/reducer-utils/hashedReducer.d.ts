import { Action, Reducer } from "redux";
export declare type HashElementKeyType = string;
export declare type HashSkipType = null | false | undefined;
export declare type HashApplyToAllElementsType = true;
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
export declare function hashedReducer<TState>(keySelector: (action: Action) => HashElementKeyType | HashSkipType | HashApplyToAllElementsType, elementReducer: (state: TState | undefined, action: Action, key?: HashElementKeyType) => TState): Reducer<StateHash<TState>>;
export interface StateHash<TState> {
    [key: string]: TState;
}
//# sourceMappingURL=hashedReducer.d.ts.map