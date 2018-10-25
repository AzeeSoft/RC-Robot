import { RCDataReceiver } from '../RCDataReceiver';

import keypress = require('keypress');
import { Logger } from '../../../../../../shared/Logger';
import { globalShortcut } from 'electron';
import { KeyboardEventController, keyStates, KeyState } from '../../../../../tools/input/KeyboardEventController';
import { SuccessCallback } from '../../../../../../shared/CommonTools';
import { RCData } from '../RCDataProcessor';
import { Robot } from '../../../Robot';

export class LocalRCDataReceiver extends RCDataReceiver {

    private keyboardEventCallback;

    constructor(robot: Robot) {
        super("RC Data Receiver", robot, false);

        this.keyboardEventCallback = (key: string, modifiers: any[], event: any) => {
            // Logger.log("Keyboard Event: ");
            // Logger.log(event);
            // Logger.log("Key: " + key);
            // Logger.log("Modifiers: " + modifiers);

            this.processKeyEvent(key, modifiers, event);
        };

        this.enable((success) => {

        });
    }

    private listenForLocalInput() {
        KeyboardEventController.addKeyboardEventCallback(this.keyboardEventCallback);
        Logger.debug("Listening for key events...");
    }

    private stopListeningForLocalInput() {
        KeyboardEventController.removeKeyboardEventCallback(this.keyboardEventCallback);
        Logger.debug("Stopped Listening for key events...");
    }

    private processKeyEvent(key: string, modifiers: any[], event: any) {
        switch (key) {
            case 'up':
            case 'right':
            case 'down':
            case 'left':
                this.onRCDataReceived(this.getDrivingData());
                break;
        }
    }

    private getDrivingData(): RCData {
        let drivingExtremeValue = 100;

        let h = 0;
        let v = 0;

        if (KeyState.isKeyPressed('right')) {
            h++;
        }
        if (KeyState.isKeyPressed('left')) {
            h--;
        }
        if (KeyState.isKeyPressed('up')) {
            v++;
        }
        if (KeyState.isKeyPressed('down')) {
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

    protected onEnable(callback: SuccessCallback, ...args) {
        this.listenForLocalInput();
        callback(true);
    }

    protected onDisable(callback: SuccessCallback, ...args) {
        this.stopListeningForLocalInput();
        callback(true);
    }
}