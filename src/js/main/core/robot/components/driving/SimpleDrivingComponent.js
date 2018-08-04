"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RobotComponent_1 = require("../RobotComponent");
const Logger_1 = require("../../../../../shared/Logger");
class SimpleDrivingComponent extends RobotComponent_1.RobotComponent {
    constructor(arduinoComponent) {
        super(true);
        this.arduinoComponent = null;
        this.arduinoComponent = arduinoComponent;
    }
    isFunctionable() {
        return (this.isEnabled() && this.arduinoComponent && this.arduinoComponent.isEnabled());
    }
    drive(hor, ver) {
        if (this.isFunctionable()) {
            let arduinoDriveData = 'Drive:' + hor + ':' + ver + ':\n';
            this.arduinoComponent.sendDataToArduino(arduinoDriveData, (error) => {
                Logger_1.Logger.log('Cannot drive using Arduino: ' + error);
            });
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
