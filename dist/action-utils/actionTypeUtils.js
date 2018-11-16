"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ROOT_ACTION_TYPE_PREFIX = "RD";
var ACTION_TYPE_PARTS_SEPARATOR = " : ";
function composeActionType(type, prefix) {
    validateActionType(type);
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
    if (!type) {
        throw new Error("Type is not defined");
    }
    if (!parentType) {
        throw new Error("Parent type is not defined.");
    }
    var index = parentType.indexOf(type);
    if (index === 0) {
        if (parentType.length === type.length) {
            return "match";
        }
        var rest = parentType.substring(type.length + ACTION_TYPE_PARTS_SEPARATOR.length + 1);
        return rest.indexOf(ACTION_TYPE_PARTS_SEPARATOR) === -1 ? "child" : "grandchild";
    }
    else {
        return false;
    }
}
exports.isSubType = isSubType;
//# sourceMappingURL=actionTypeUtils.js.map