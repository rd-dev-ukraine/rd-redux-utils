import { ActionCreatorFn } from "./defineAction";

export function defineActionGroup<TCommonProps>(typePrefix: string): ActionGroup<TCommonProps> {
    throw new Error();
}

/**
 * Action group creates a factory which allows
 * to define action creators with common properties.
 */
export interface ActionGroup<TCommonProps> {
    defineAction<TProps>(type: string): ActionCreatorFn<TCommonProps & TProps>;
}
