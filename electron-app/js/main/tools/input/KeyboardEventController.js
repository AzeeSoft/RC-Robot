"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CommonTools_1 = require("../misc/CommonTools");
class KeyState {
    constructor(key) {
        this.isPressed = false;
        this.key = key;
    }
    static isKeyPressed(key) {
        return (keyStates[key] && keyStates[key].isPressed);
    }
}
exports.KeyState = KeyState;
let keyStates = [];
exports.keyStates = keyStates;
class KeyboardEventController {
    static onKeyboardEventReceived(key, modifiers, event) {
        if (!keyStates[key]) {
            keyStates[key] = new KeyState(key);
        }
        switch (event.type) {
            case 'keydown':
                keyStates[key].isPressed = true;
                break;
            case 'keyup':
                keyStates[key].isPressed = false;
                break;
        }
        this.keyboardEventCallbacks.forEach((callback) => {
            callback(key, modifiers, event);
        });
    }
    static addKeyboardEventCallback(callback) {
        KeyboardEventController.keyboardEventCallbacks.push(callback);
    }
    static removeKeyboardEventCallback(callback) {
        CommonTools_1.CommonTools.removeItemFromArray(KeyboardEventController.keyboardEventCallbacks, callback);
    }
}
KeyboardEventController.keyboardEventCallbacks = [];
exports.KeyboardEventController = KeyboardEventController;
