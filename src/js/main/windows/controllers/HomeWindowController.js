"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WindowController_1 = require("../WindowController");
const Robot_1 = require("../../core/robot/Robot");
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
        this.window.on('close', () => {
            this.robot.destroy();
        });
    }
    onRendererDataReceived(channel, event, data) {
        switch (channel) {
            case 'connectToArduino':
                this.robot.arduinoComponent.enable((success, errorMsg) => {
                }, data.portPath);
                break;
        }
    }
}
exports.HomeWindowController = HomeWindowController;
