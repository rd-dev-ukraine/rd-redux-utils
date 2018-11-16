import { Action, Reducer } from "redux";
export declare type IndexElementKeyType = number;
export declare type IndexSkipType = null | false | undefined;
export declare type IndexApplyToAllElementsType = true;
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
export declare function indexedReducer<TState>(indexSelector: (action: Action) => IndexElementKeyType | IndexSkipType | IndexApplyToAllElementsType, elementReducer: (state: TState | undefined, action: Action, index?: IndexElementKeyType) => TState): Reducer<TState[]>;
//# sourceMappingURL=indexedReducer.d.ts.map