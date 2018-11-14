"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var actionTypeUtils_1 = require("./actionTypeUtils");
function defineAction(type) {
    if (!type) {
        throw new Error("Action type is not defined.");
    }
    var actionType = actionTypeUtils_1.composeActionType(type);
    var result = (function (data) { return (__assign({}, data, { type: actionType })); });
    result.is = function (action) {
        return !!action && action.type === actionType;
    };
    result.TYPE = actionType;
    return result;
}
exports.defineAction = defineAction;
//# sourceMappingURL=defineAction.js.map