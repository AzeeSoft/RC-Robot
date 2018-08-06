"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SimpleDrivingComponent_1 = require("./components/driving/SimpleDrivingComponent");
const RCDataProcessor_1 = require("./components/rc/RCDataProcessor");
const LocalRCDataReceiver_1 = require("./components/rc/local/LocalRCDataReceiver");
const ArduinoComponent_1 = require("./components/arduino/ArduinoComponent");
class Robot {
    constructor() {
        this._isReady = false;
        this.readyCallbacks = [];
        Robot.instance = this;
        // Change this line to use the correct RC Data Receiver.
        this.rcDataReceiver = new LocalRCDataReceiver_1.LocalRCDataReceiver(this);
        this.rcDataProcessor = new RCDataProcessor_1.RCDataProcessor(this);
        this.arduinoComponent = new ArduinoComponent_1.ArduinoComponent(this);
        this.drivingComponent = new SimpleDrivingComponent_1.SimpleDrivingComponent(this);
        this._onReady();
    }
    static getInstance() {
        if (Robot.instance === null) {
            Robot.instance = new Robot();
        }
        return Robot.instance;
    }
    _onReady() {
        this._isReady = true;
        this.readyCallbacks.forEach(readyCallback => {
            readyCallback();
        });
        this.readyCallbacks = [];
    }
    isReady() {
        return this._isReady;
    }
    addReadyCallback(callback) {
        this.readyCallbacks.push(callback);
    }
    destroy() {
        this.drivingComponent.disable(success => { });
        this.arduinoComponent.disable(success => { });
        this.rcDataProcessor.disable(success => { });
        this.rcDataReceiver.disable(success => { });
        Robot.instance = null;
    }
}
Robot.instance = null;
exports.Robot = Robot;
