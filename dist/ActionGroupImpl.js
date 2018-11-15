"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var defineAction_1 = require("./defineAction");
var actionTypeUtils_1 = require("./actionTypeUtils");
var ActionGroupImpl = /** @class */ (function () {
    function ActionGroupImpl(typePrefix, parent) {
        var _this = this;
        this.typePrefix = typePrefix;
        this.includedActions = [];
        this.childGroups = [];
        this.TYPE_PREFIX = "";
        this.defineAction = function (type) {
            actionTypeUtils_1.validateActionType(type);
            return defineAction_1.defineAction(actionTypeUtils_1.composeActionType(type, _this.TYPE_PREFIX));
        };
        this.isGroupAction = function (action) {
            return _this.isExactlyGroupAction(action) || _this.childGroups.some(function (g) { return g.isGroupAction(action); });
        };
        this.isExactlyGroupAction = function (action) {
            if (!action || !action.type) {
                return false;
            }
            if (actionTypeUtils_1.isSubType(_this.TYPE_PREFIX, action.type)) {
                return true;
            }
            return _this.includedActions.some(function (ia) { return ia.test(action); });
        };
        this.tryExtractData = function (_action) {
            throw new Error("Method not implemented.");
        };
        this.defineActionGroup = function (typePrefix) {
            actionTypeUtils_1.validateActionType(typePrefix);
            var childGroup = new ActionGroupImpl(typePrefix, _this);
            _this.childGroups.push(childGroup);
            return childGroup;
        };
        this.includeAction = function (test, extractProps) {
            if (!test) {
                throw new Error("Test method is not defined.");
            }
            if (!extractProps) {
                throw new Error("Extract props method is not defined");
            }
            _this.includedActions.push({
                test: test,
                extractProps: extractProps
            });
            return _this;
        };
        actionTypeUtils_1.validateActionType(typePrefix);
        this.TYPE_PREFIX = actionTypeUtils_1.composeActionType(typePrefix, parent ? parent.TYPE_PREFIX : undefined);
    }
    return ActionGroupImpl;
}());
exports.ActionGroupImpl = ActionGroupImpl;
//# sourceMappingURL=ActionGroupImpl.js.map