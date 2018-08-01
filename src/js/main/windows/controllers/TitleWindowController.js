"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WindowController_1 = require("../WindowController");
const InitializationPeriod = 3000;
class TitleWindowController extends WindowController_1.WindowController {
    constructor() {
        super({
            windowOptions: {
                width: 800,
                height: 600,
            },
            shouldWaitForLoad: true
        });
    }
    onWindowCreated() {
        // console.log(__dirname);
        this.window.setMenuBarVisibility(false);
        this.window.loadFile("src/html/windows/titleWindow.html");
        this.window.on('ready-to-show', () => {
            setTimeout(() => {
                this.window.close();
            }, InitializationPeriod);
        });
    }
    onWindowClosed() {
    }
}
exports.TitleWindowController = TitleWindowController;
