"use strict";
// A list of common tools used throughout the application
Object.defineProperty(exports, "__esModule", { value: true });
class CommonTools {
    /**
     * Removes the item from the array if it exists
     * @param arr The array
     * @param val The item
     *
     * @returns True if the item existed and was deleted. False if the item wasn't found.
     */
    static removeItemFromArray(arr, val) {
        let index = arr.indexOf(val);
        if (index > -1) {
            arr.splice(index, 1);
            return true;
        }
        return false;
    }
}
exports.CommonTools = CommonTools;
