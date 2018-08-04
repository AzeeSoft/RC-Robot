"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RobotComponent_1 = require("../RobotComponent");
const Logger_1 = require("../../../../../shared/Logger");
class SimpleDrivingComponent extends RobotComponent_1.RobotComponent {
    constructor(robot) {
        super(robot, true);
    }
    drive(hor, ver) {
        if (this.isFunctional()) {
            let arduinoDriveData = 'Drive:' + hor + ':' + ver + ':\n';
            this.robot.arduinoComponent.sendDataToArduino(arduinoDriveData, (error) => {
                Logger_1.Logger.log('Cannot drive using Arduino: ' + error);
            });
        }
        else {
            Logger_1.Logger.log('Driving Component is not functional');
        }
    }
    onEnable(callback, ...args) {
        callback(true);
    }
    onDisable(callback, ...args) {
        callback(true);
    }
}
exports.SimpleDrivingComponent = SimpleDrivingComponent;
