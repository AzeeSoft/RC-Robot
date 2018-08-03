"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SimpleDrivingComponent {
    constructor(arduinoController) {
        this.arduinoController = null;
        this.arduinoController = arduinoController;
    }
    isFunctionable() {
        return (this.arduinoController && this.arduinoController.isConnected());
    }
    move(hor, ver) {
    }
}
exports.SimpleDrivingComponent = SimpleDrivingComponent;
