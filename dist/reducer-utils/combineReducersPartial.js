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
function combineReducersPartial(reducerMap, defaultState) {
    return function (state, action) {
        if (state === void 0) { state = defaultState; }
        return Object.keys(reducerMap).reduce(function (result, key) {
            var _a;
            var reducer = reducerMap[key];
            if (reducer) {
                var reducedPropValue = reducer(result[key], action);
                if (reducedPropValue !== result[key]) {
                    return __assign({}, result, (_a = {}, _a[key] = reducedPropValue, _a));
                }
            }
            return result;
        }, state);
    };
}
exports.combineReducersPartial = combineReducersPartial;
//# sourceMappingURL=combineReducersPartial.js.map