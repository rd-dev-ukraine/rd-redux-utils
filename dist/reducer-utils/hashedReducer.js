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
/**
 * Creates reducer function which applies to an element with key based on an action.
 *
 * @param keySelector A function which selects an element key based on action.
 *     Function may return
 *     * a string - in this case element reducer will be applied to an element with this key
 *     * undefined, false or null - then reducing will be skipped and current state will be returned
 *     * true - in this case element selector will be applied to all existing keys in state.
 * @param elementReducer A reducer function which applies action to an element state.
 * @returns Reducer function which applied to an hash of elements.
 */
function hashedReducer(keySelector, elementReducer) {
    if (!keySelector) {
        throw new Error("Key selector function is not defined.");
    }
    if (!elementReducer) {
        throw new Error("Element reducer function is not defined.");
    }
    return function (state, action) {
        var _a;
        if (state === undefined) {
            throw new Error("Undefined state is passed to reducer, expected state to have some default value.");
        }
        var key = keySelector(action);
        if (key === undefined || key === false || key === null) {
            return state;
        }
        if (key === true) {
            return Object.keys(state).reduce(function (result, key) {
                var _a;
                var oldState = result[key];
                var newState = elementReducer(oldState, action, key);
                if (oldState !== newState) {
                    return __assign({}, result, (_a = {}, _a[key] = newState, _a));
                }
                else {
                    return result;
                }
            }, state);
        }
        var newState = elementReducer(state[key], action, key);
        if (newState !== state[key]) {
            return __assign({}, state, (_a = {}, _a[key] = newState, _a));
        }
        return state;
    };
}
exports.hashedReducer = hashedReducer;
//# sourceMappingURL=hashedReducer.js.map