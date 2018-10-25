"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WindowController_1 = require("../WindowController");
const HomeWindowController_1 = require("./HomeWindowController");
const InitializationPeriod = 0;
// const InitializationPeriod = 3000;
class TitleWindowController extends WindowController_1.WindowController {
    constructor() {
        super({
            windowOptions: {
                width: 800,
                height: 600,
            },
            shouldWaitForLoad: true
        });
        this.window.setMenuBarVisibility(false);
        this.window.loadFile("electron-app/html/windows/titleWindow.html");
        this.window.on('ready-to-show', () => {
            setTimeout(() => {
                this.createHomeWindow();
                this.window.close();
            }, InitializationPeriod);
        });
    }
    createHomeWindow() {
        let homeWindowController = new HomeWindowController_1.HomeWindowController();
        homeWindowController.showWindow();
    }
    onRendererDataReceived(channel, event, data) {
    }
}
exports.TitleWindowController = TitleWindowController;
