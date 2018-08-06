// A list of common tools used throughout the application

export type SuccessCallback = (success: boolean, msg?: string) => any;

export type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T[P] extends ReadonlyArray<infer U>
    ? ReadonlyArray<DeepPartial<U>>
    : DeepPartial<T[P]>
};

export class CommonTools {
    /**
     * Removes the item from the array if it exists
     * @param arr The array
     * @param val The item
     * 
     * @returns True if the item existed and was deleted. False if the item wasn't found. 
     */
    public static removeItemFromArray(arr: any[], val: any): boolean {
        let index = arr.indexOf(val);
        if (index > -1) {
            arr.splice(index, 1);
            return true;
        }

        return false;
    }
}