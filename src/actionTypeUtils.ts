const ROOT_ACTION_TYPE_PREFIX = "RD";

const ACTION_TYPE_PARTS_SEPARATOR = " : ";

export function composeActionType(type: string, prefix?: string): string {
    if (!type) {
        throw new Error("Action type is not defined.");
    }
    return `${prefix || ROOT_ACTION_TYPE_PREFIX}${ACTION_TYPE_PARTS_SEPARATOR}${type.toUpperCase()}`;
}
