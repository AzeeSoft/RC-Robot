"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Logger_1 = require("../../../../../shared/Logger");
class RCDataProcessor {
    constructor(robot) {
        this.robot = robot;
    }
    onRCDataReceived(data) {
        Logger_1.Logger.log("RC Data: " + data.value);
        switch (data.name) {
            case 'relay':
                Logger_1.Logger.log("Relay Info: " + data.value);
                this.relayData(data.value);
                break;
        }
    }
    relayData(relayInfo) {
        switch (relayInfo.target) {
            case 'arduino':
                Logger_1.Logger.log("Sending data to Arduino: " + relayInfo.data);
                this.robot.getArduinoController().sendData(relayInfo.data, (error) => {
                    Logger_1.Logger.log("Error sending data to Arduino: " + error);
                });
                break;
        }
    }
}
exports.RCDataProcessor = RCDataProcessor;
