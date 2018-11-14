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
//# sourceMappingURL=actionTypeUtils.js.map