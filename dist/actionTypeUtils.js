"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ROOT_ACTION_TYPE_PREFIX = "RD";
var ACTION_TYPE_PARTS_SEPARATOR = " : ";
function composeActionType(type, prefix) {
    if (!type) {
        throw new Error("Action type is not defined.");
    }
    return "" + (prefix || ROOT_ACTION_TYPE_PREFIX) + ACTION_TYPE_PARTS_SEPARATOR + type.toUpperCase();
}
exports.composeActionType = composeActionType;
function validateActionType(type) {
    if (!type || !type.trim()) {
        throw new Error("Action type is empty.");
    }
    if (type.indexOf(ACTION_TYPE_PARTS_SEPARATOR) !== -1) {
        throw new Error("Action type can't include " + ACTION_TYPE_PARTS_SEPARATOR + " char");
    }
}
exports.validateActionType = validateActionType;
function isSubType(type, parentType) {
    var index = parentType.indexOf(type);
    if (index === 0) {
        return parentType.length === type.length ? true : "subtype";
    }
    else {
        return false;
    }
}
exports.isSubType = isSubType;
//# sourceMappingURL=actionTypeUtils.js.map