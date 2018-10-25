"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RobotComponent_1 = require("../RobotComponent");
const ArduinoController_1 = require("../../../../tools/arduino/ArduinoController");
class ArduinoComponent extends RobotComponent_1.RobotComponent {
    constructor(robot) {
        super("Arduino Component", robot, false);
        this.arduinoController = new ArduinoController_1.ArduinoController();
    }
    sendDataToArduino(data, onError) {
        if (this.isFunctional()) {
            this.arduinoController.sendData(data, onError);
        }
        else {
            onError('Arduino Component is not functional');
        }
    }
    onEnable(callback, portPath) {
        this.arduinoController.setPortPath(portPath);
        this.arduinoController.connect(() => {
            callback(true);
        }, (error) => {
            if (error) {
                callback(false, error.name + ': ' + error.message);
            }
        });
    }
    onDisable(callback, ...args) {
        this.arduinoController.close((success) => {
            callback(success);
        });
    }
}
exports.ArduinoComponent = ArduinoComponent;
