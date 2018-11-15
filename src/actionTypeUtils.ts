const ROOT_ACTION_TYPE_PREFIX = "RD";

const ACTION_TYPE_PARTS_SEPARATOR = " : ";

export function composeActionType(type: string, prefix?: string): string {
    if (!type) {
        throw new Error("Action type is not defined.");
    }
    return `${prefix || ROOT_ACTION_TYPE_PREFIX}${ACTION_TYPE_PARTS_SEPARATOR}${type.toUpperCase()}`;
}

export function validateActionType(type: string): void {
    if (!type || !type.trim()) {
        throw new Error("Action type is empty.");
    }
    if (type.indexOf(ACTION_TYPE_PARTS_SEPARATOR) !== -1) {
        throw new Error(`Action type can't include ${ACTION_TYPE_PARTS_SEPARATOR} char`);
    }
}

export function isSubType(type: string, parentType: string): "subtype" | true | false {
    const index = parentType.indexOf(type);

    if (index === 0) {
        return parentType.length === type.length ? true : "subtype";
    } else {
        return false;
    }
}
