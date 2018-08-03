"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WindowController_1 = require("../WindowController");
const Robot_1 = require("../../core/robot/Robot");
const Logger_1 = require("../../../shared/Logger");
class HomeWindowController extends WindowController_1.WindowController {
    constructor() {
        super({
            windowOptions: {
                width: 800,
                height: 600,
            },
            shouldWaitForLoad: true
        });
        this.robot = new Robot_1.Robot();
        this.window.loadFile("src/html/windows/homeWindow.html");
        this.window.on('ready-to-show', () => {
        });
    }
    onKeyboardInputReceived(ch, modifier, e) {
        Logger_1.Logger.log("Keyboard Event: " + e);
        Logger_1.Logger.log("Character: " + ch);
        Logger_1.Logger.log("Modifier: " + modifier);
    }
    onRendererDataReceived(channel, event, data) {
        Logger_1.Logger.log("Channel: " + channel);
        Logger_1.Logger.log("Event: " + event);
        Logger_1.Logger.log("Data: ");
        Logger_1.Logger.log(data);
    }
}
exports.HomeWindowController = HomeWindowController;
