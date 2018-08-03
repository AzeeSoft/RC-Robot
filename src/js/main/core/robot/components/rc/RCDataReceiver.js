"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RCDataReceiver {
    constructor() {
        this.dataReceivedCallback = (data) => { }; // Assigning a default empty function, so that the callback can be called without null checks.
    }
    setDataReceivedCallback(dataReceivedCallback) {
        this.dataReceivedCallback = dataReceivedCallback;
    }
}
exports.RCDataReceiver = RCDataReceiver;
