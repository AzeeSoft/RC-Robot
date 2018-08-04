"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SimpleDrivingComponent_1 = require("./components/driving/SimpleDrivingComponent");
const RCDataProcessor_1 = require("./components/rc/RCDataProcessor");
const LocalRCDataReceiver_1 = require("./components/rc/local/LocalRCDataReceiver");
const ArduinoComponent_1 = require("./components/arduino/ArduinoComponent");
class Robot {
    constructor() {
        // Change this line to use the correct RC Data Receiver.
        this.rcDataReceiver = new LocalRCDataReceiver_1.LocalRCDataReceiver();
        this.rcDataProcessor = new RCDataProcessor_1.RCDataProcessor(this);
        this.rcDataReceiver.setRCDataProcessor(this.rcDataProcessor);
        this.arduinoComponent = new ArduinoComponent_1.ArduinoComponent();
        this.drivingComponent = new SimpleDrivingComponent_1.SimpleDrivingComponent(this.arduinoComponent);
    }
    destroy() {
        this.drivingComponent.disable(success => { });
        this.arduinoComponent.disable(success => { });
        this.rcDataProcessor.disable(success => { });
        this.rcDataReceiver.disable(success => { });
    }
}
exports.Robot = Robot;
