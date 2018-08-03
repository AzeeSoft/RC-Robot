import { RCDataReceiver } from '../RCDataReceiver';

import keypress = require('keypress');
import { Logger } from '../../../../../../shared/Logger';
import { globalShortcut } from 'electron';
import { KeyboardEventController, keyStates, KeyState } from '../../../../../tools/input/KeyboardEventController';

export class LocalRCDataReceiver extends RCDataReceiver {
    constructor() {
        super();
        this.listenForLocalInput();
    }

    private listenForLocalInput() {
        KeyboardEventController.addKeyboardEventCallback((key: string, modifiers: any[], event: any) => {
            // Logger.log("Keyboard Event: ");
            // Logger.log(event);
            // Logger.log("Key: " + key);
            // Logger.log("Modifiers: " + modifiers);

            this.processKeyEvent(key, modifiers, event);
        });

        Logger.log("Listening for key press...");
    }

    private processKeyEvent(key: string, modifiers: any[], event: any) {
        switch (key) {
            case 'up':
            case 'right':
            case 'down':
            case 'left':
                this.dataReceivedCallback(this.getDrivingData());
                break;
        }
    }

    private getDrivingData(): object {
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
            name: 'relay',
            value: {
                target: 'arduino',
                data: 'Drive:' + h + ':' + v + ':\n',
            },
        };
    }
}