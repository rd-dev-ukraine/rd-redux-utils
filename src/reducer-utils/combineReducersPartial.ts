import { Reducer, Action } from "redux";

export function combineReducersPartial<TState>(
    reducerMap: { [P in keyof TState]?: Reducer<TState[P]> },
    defaultState?: TState
): Reducer<TState> {
    return (state: TState = defaultState!, action: Action): TState => {
        return Object.keys(reducerMap).reduce((result: TState, key) => {
            const reducer = reducerMap[key as keyof TState];

            if (reducer) {
                const reducedPropValue = reducer(result[key as keyof TState], action);
                if (reducedPropValue !== result[key as keyof TState]) {
                    return {
                        ...(result as any),
                        [key]: reducedPropValue
                    };
                }
            }

            return result;
        }, state);
    };
}
