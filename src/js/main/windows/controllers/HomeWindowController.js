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
        this.robot.connectToArduino('COM5', () => {
        }, (err) => {
        });
        this.window.loadFile("src/html/windows/homeWindow.html");
        this.window.on('ready-to-show', () => {
        });
    }
    onRendererDataReceived(channel, event, data) {
        // Logger.log("Channel: " + channel);
        // Logger.log("Event: " + event);
        // Logger.log("Data: ");
        // Logger.log(data);
        switch (channel) {
        }
    }
}
exports.HomeWindowController = HomeWindowController;
