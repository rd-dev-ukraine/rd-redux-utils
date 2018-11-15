const ROOT_ACTION_TYPE_PREFIX = "RD";

const ACTION_TYPE_PARTS_SEPARATOR = " : ";

export function composeActionType(type: string, prefix?: string): string {
    validateActionType(type);

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

export function isSubType(type: string, parentType: string): "match" | "child" | "grandchild" | false {
    if (!type) {
        throw new Error("Type is not defined");
    }
    if (!parentType) {
        throw new Error("Parent type is not defined.");
    }

    const index = parentType.indexOf(type);

    if (index === 0) {
        if (parentType.length === type.length) {
            return "match";
        }

        const rest = parentType.substring(type.length + ACTION_TYPE_PARTS_SEPARATOR.length + 1);

        return rest.indexOf(ACTION_TYPE_PARTS_SEPARATOR) === -1 ? "child" : "grandchild";
    } else {
        return false;
    }
}
