"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RCDataReceiver_1 = require("../RCDataReceiver");
class LocalRCDataReceiver extends RCDataReceiver_1.RCDataReceiver {
    constructor() {
        super();
        this.listenForLocalInput();
    }
    listenForLocalInput() {
        /* keypress(process.stdin);
        
        process.stdin.setRawMode(true);
        process.stdin.on('keypress', (ch, key) => {
            Logger.log('Key Pressed: ' + key);
        });

        process.stdin.resume(); */
        // Logger.log("Listening for key press...");
    }
}
exports.LocalRCDataReceiver = LocalRCDataReceiver;
