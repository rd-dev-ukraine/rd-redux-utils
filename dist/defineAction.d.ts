import { Action } from "redux";
export declare function defineAction<TActionData>(type: string): ActionCreatorFn<TActionData>;
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
//# sourceMappingURL=defineAction.d.ts.map