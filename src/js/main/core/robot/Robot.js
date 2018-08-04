"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ArduinoController_1 = require("../../tools/arduino/ArduinoController");
const SimpleDrivingComponent_1 = require("./components/driving/SimpleDrivingComponent");
const RCDataProcessor_1 = require("./components/rc/RCDataProcessor");
const LocalRCDataReceiver_1 = require("./components/rc/local/LocalRCDataReceiver");
class Robot {
    constructor() {
        // Change this line to use the correct RC Data Receiver.
        this.rcDataReceiver = new LocalRCDataReceiver_1.LocalRCDataReceiver();
        this.rcDataProcessor = new RCDataProcessor_1.RCDataProcessor(this);
        this.arduinoController = new ArduinoController_1.ArduinoController();
        this.simpleDrivingComponent = new SimpleDrivingComponent_1.SimpleDrivingComponent(this.arduinoController);
        this.rcDataReceiver.setDataReceivedCallback((data) => {
            this.rcDataProcessor.onRCDataReceived(data);
        });
    }
    connectToArduino(portPath, onSucess, onFailure) {
        this.arduinoController.setPortPath(portPath);
        this.arduinoController.connect(onSucess, onFailure);
    }
    getArduinoController() {
        return this.arduinoController;
    }
    destroy() {
        this.arduinoController.close();
    }
}
exports.Robot = Robot;
