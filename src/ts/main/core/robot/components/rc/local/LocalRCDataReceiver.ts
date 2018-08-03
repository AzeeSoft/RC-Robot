import { RCDataReceiver } from '../RCDataReceiver';

import keypress = require('keypress');
import { Logger } from '../../../../../../shared/Logger';
import { globalShortcut } from 'electron';

export class LocalRCDataReceiver extends RCDataReceiver {
    constructor() {
        super();
        this.listenForLocalInput();
    }

    private listenForLocalInput() {
        /* keypress(process.stdin);
        
        process.stdin.setRawMode(true);
        process.stdin.on('keypress', (ch, key) => {
            Logger.log('Key Pressed: ' + key);
        });

        process.stdin.resume(); */
        

        // Logger.log("Listening for key press...");
    }
}