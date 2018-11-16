"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Creates reducer function which applies to an element of array with index based on action.
 *
 * @param indexSelector A function which selects an element index based on action.
 *     Function may return
 *     * a number - in this case element reducer will be applied to an element at this index;
 *     * undefined, false or null - then reducing will be skipped and current state will be returned
 *     * true - in this case element selector will be applied to all existing elements in state.
 * @param elementReducer A reducer function which applies action to an element state.
 * @returns Reducer function which applied to an hash of elements.
 */
function indexedReducer(indexSelector, elementReducer) {
    return function (state, action) {
        if (state === undefined) {
            throw new Error("Undefined state is passed to reducer, expected state to have some default value.");
        }
        var index = indexSelector(action);
        if (index === undefined || index === false || index === null) {
            return state;
        }
        if (index === true) {
            return state.reduce(function (result, element, index) {
                var newState = elementReducer(element, action, index);
                if (element !== newState) {
                    var newArray = __spread(result);
                    newArray[index] = newState;
                    return newArray;
                }
                return result;
            }, state);
        }
        var newState = elementReducer(state[index], action, index);
        if (newState !== state[index]) {
            var newArray = __spread(state);
            newArray[index] = newState;
            return newArray;
        }
        return state;
    };
}
exports.indexedReducer = indexedReducer;
//# sourceMappingURL=indexedReducer.js.map