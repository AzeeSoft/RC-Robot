"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Logger_1 = require("../../../../../shared/Logger");
const RobotComponent_1 = require("../RobotComponent");
class RCDataProcessor extends RobotComponent_1.RobotComponent {
    constructor(robot) {
        super(robot, true);
        this.robot = robot;
    }
    processRCData(data) {
        if (this.isFunctional()) {
            Logger_1.Logger.log("RC Data: ");
            Logger_1.Logger.log(data.value);
            switch (data.name) {
                case 'relay':
                    Logger_1.Logger.log("Relay Info: " + data.value);
                    this.relayData(data.value);
                    break;
                case 'drive':
                    this.driveData(data.value);
                    break;
            }
        }
        else {
            Logger_1.Logger.log('RC Data Processor is not functional');
        }
    }
    relayData(relayInfo) {
        switch (relayInfo.target) {
            case 'arduino':
                Logger_1.Logger.log("Sending data to Arduino: " + relayInfo.data);
                this.robot.arduinoComponent.sendDataToArduino(relayInfo.data, (error) => {
                    Logger_1.Logger.log("Error sending data to Arduino: " + error);
                });
                break;
        }
    }
    driveData(driveData) {
        this.robot.drivingComponent.drive(driveData.hor, driveData.ver);
    }
    onEnable(callback, ...args) {
        callback(true);
    }
    onDisable(callback, ...args) {
        callback(true);
    }
}
exports.RCDataProcessor = RCDataProcessor;
