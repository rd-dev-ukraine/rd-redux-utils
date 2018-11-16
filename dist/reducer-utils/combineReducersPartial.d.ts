import { Reducer } from "redux";
export declare function combineReducersPartial<TState>(reducerMap: {
    [P in keyof TState]?: Reducer<TState[P]>;
}, defaultState?: TState): Reducer<TState>;
//# sourceMappingURL=combineReducersPartial.d.ts.map