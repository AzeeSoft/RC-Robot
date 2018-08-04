"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RobotComponent_1 = require("../RobotComponent");
class RCDataReceiver extends RobotComponent_1.RobotComponent {
    constructor() {
        super(...arguments);
        this.dataReceivedCallback = (data) => { }; // Assigning a default empty function, so that the callback can be called without null checks.
    }
    setDataReceivedCallback(dataReceivedCallback) {
        this.dataReceivedCallback = dataReceivedCallback;
    }
    onRCDataReceived(rcData) {
        this.robot.rcDataProcessor.processRCData(rcData);
        this.dataReceivedCallback(rcData);
    }
}
exports.RCDataReceiver = RCDataReceiver;
