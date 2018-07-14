"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WindowController_1 = require("../WindowController");
class TitleWindowController extends WindowController_1.WindowController {
    constructor() {
        super({
            windowOptions: {
                width: 800,
                height: 600
            },
            shouldWaitForLoad: true
        });
    }
    onWindowCreated() {
        console.log(__dirname);
        this.window.loadFile("src/html/windows/titleWindow.html");
    }
    onWindowClosed() {
    }
}
exports.TitleWindowController = TitleWindowController;
