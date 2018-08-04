"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RobotComponent_1 = require("../RobotComponent");
const ArduinoController_1 = require("../../../../tools/arduino/ArduinoController");
class ArduinoComponent extends RobotComponent_1.RobotComponent {
    constructor() {
        super(false);
        this.arduinoController = new ArduinoController_1.ArduinoController();
    }
    getArduinoController() {
        return this.arduinoController;
    }
    /* private connectToArduino(portPath: string, onSucess: () => void, onFailure: (error: Error) => void) {
        if (this.isEnabled()) {
            this.arduinoController.setPortPath(portPath);
            this.arduinoController.connect(onSucess, onFailure);
        } else {
            onFailure(new Error('Arduino Component is disabled'));
        }
    } */
    sendDataToArduino(data, onError) {
        if (this.isEnabled()) {
            this.arduinoController.sendData(data, onError);
        }
        else {
            onError('Arduino Component is disabled');
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
