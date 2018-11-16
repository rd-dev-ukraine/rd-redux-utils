"use strict";
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var defineAction_1 = require("./defineAction");
var actionTypeUtils_1 = require("./actionTypeUtils");
var reducer_utils_1 = require("../reducer-utils");
var ActionGroupImpl = /** @class */ (function () {
    function ActionGroupImpl(typePrefix, parent) {
        var _this = this;
        this.typePrefix = typePrefix;
        this.includedActions = [];
        this.childGroups = [];
        this.TYPE_PREFIX = "";
        this.defineAction = function (type) {
            actionTypeUtils_1.validateActionType(type);
            return defineAction_1.defineActionCore(type, _this.TYPE_PREFIX);
        };
        this.isGroupAction = function (action) {
            return _this.isExactlyGroupAction(action) || _this.childGroups.some(function (g) { return g.isGroupAction(action); });
        };
        this.isExactlyGroupAction = function (action) {
            if (!action || !action.type) {
                return false;
            }
            if (_this.isOwnAction(action)) {
                return true;
            }
            return _this.includedActions.some(function (ia) { return ia.test(action); });
        };
        this.tryExtractData = function (action) {
            var result = _this.extractDataCore(action);
            // Result is undefined if common data can't be extracted from the action
            // Result is true when action has no common data but should be processed by group reducers.
            if (result === undefined || result === true) {
                return undefined;
            }
            return result;
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
        this.hashedReducer = function (keySelector, elementReducer) {
            if (!keySelector) {
                throw new Error("Key selector function is not defined.");
            }
            if (!elementReducer) {
                throw new Error("Element reducer function is not defined.");
            }
            return reducer_utils_1.hashedReducer(function (action) {
                var data = _this.extractDataCore(action);
                if (data === undefined || data === true) {
                    return data;
                }
                return keySelector(data);
            }, elementReducer);
        };
        this.indexedReducer = function (indexSelector, elementReducer) {
            if (!indexSelector) {
                throw new Error("Index selector function is not defined.");
            }
            if (!elementReducer) {
                throw new Error("Element reducer function is not defined.");
            }
            return reducer_utils_1.indexedReducer(function (action) {
                var data = _this.extractDataCore(action);
                if (data === undefined || data === true) {
                    return data;
                }
                return indexSelector(data);
            }, elementReducer);
        };
        this.isOwnAction = function (action) {
            if (!action || !action.type) {
                return false;
            }
            if (actionTypeUtils_1.isSubType(_this.TYPE_PREFIX, action.type) === "child") {
                return true;
            }
            return false;
        };
        this.extractDataCore = function (action) {
            var e_1, _a;
            if (!action || !action.type) {
                return undefined;
            }
            if (_this.isOwnAction(action)) {
                return action;
            }
            var extractor = _this.includedActions.filter(function (a) { return a.test(action); })[0];
            if (extractor) {
                return extractor.extractProps(action);
            }
            try {
                for (var _b = __values(_this.childGroups), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var child = _c.value;
                    var data = child.extractDataCore(action);
                    if (data) {
                        return data;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return undefined;
        };
        actionTypeUtils_1.validateActionType(typePrefix);
        this.TYPE_PREFIX = actionTypeUtils_1.composeActionType(typePrefix, parent ? parent.TYPE_PREFIX : undefined);
    }
    return ActionGroupImpl;
}());
exports.ActionGroupImpl = ActionGroupImpl;
//# sourceMappingURL=ActionGroupImpl.js.map