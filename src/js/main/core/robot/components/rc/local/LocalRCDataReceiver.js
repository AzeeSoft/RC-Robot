"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RCDataReceiver_1 = require("../RCDataReceiver");
const Logger_1 = require("../../../../../../shared/Logger");
const KeyboardEventController_1 = require("../../../../../tools/input/KeyboardEventController");
class LocalRCDataReceiver extends RCDataReceiver_1.RCDataReceiver {
    constructor() {
        super(false);
        this.keyboardEventCallback = (key, modifiers, event) => {
            // Logger.log("Keyboard Event: ");
            // Logger.log(event);
            // Logger.log("Key: " + key);
            // Logger.log("Modifiers: " + modifiers);
            this.processKeyEvent(key, modifiers, event);
        };
        this.enable((success) => {
        });
    }
    listenForLocalInput() {
        KeyboardEventController_1.KeyboardEventController.addKeyboardEventCallback(this.keyboardEventCallback);
        Logger_1.Logger.log("Listening for key events...");
    }
    stopListeningForLocalInput() {
        KeyboardEventController_1.KeyboardEventController.removeKeyboardEventCallback(this.keyboardEventCallback);
        Logger_1.Logger.log("Stopped Listening for key events...");
    }
    processKeyEvent(key, modifiers, event) {
        switch (key) {
            case 'up':
            case 'right':
            case 'down':
            case 'left':
                this.onRCDataReceived(this.getDrivingData());
                break;
        }
    }
    getDrivingData() {
        let drivingExtremeValue = 100;
        let h = 0;
        let v = 0;
        if (KeyboardEventController_1.KeyState.isKeyPressed('right')) {
            h++;
        }
        if (KeyboardEventController_1.KeyState.isKeyPressed('left')) {
            h--;
        }
        if (KeyboardEventController_1.KeyState.isKeyPressed('up')) {
            v++;
        }
        if (KeyboardEventController_1.KeyState.isKeyPressed('down')) {
            v--;
        }
        h = h * drivingExtremeValue;
        v = v * drivingExtremeValue;
        return {
            name: 'drive',
            value: {
                hor: h,
                ver: v,
            },
        };
    }
    onEnable(callback, ...args) {
        this.listenForLocalInput();
        callback(true);
    }
    onDisable(callback, ...args) {
        this.stopListeningForLocalInput();
        callback(true);
    }
}
exports.LocalRCDataReceiver = LocalRCDataReceiver;
