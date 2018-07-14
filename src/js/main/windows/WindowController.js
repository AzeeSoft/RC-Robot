"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
class WindowControllerOptions {
}
exports.WindowControllerOptions = WindowControllerOptions;
class WindowController {
    constructor(windowControllerOptions) {
        this.windowControllerOptions = { windowOptions: {}, shouldWaitForLoad: false };
        this.window = null;
        this.windowControllerOptions = Object.assign({}, this.windowControllerOptions, windowControllerOptions);
    }
    createWindow() {
        let windowOptions = this.windowControllerOptions.windowOptions;
        if (this.windowControllerOptions.shouldWaitForLoad) {
            windowOptions.show = false;
        }
        this.window = new electron_1.BrowserWindow(windowOptions);
        if (this.windowControllerOptions.shouldWaitForLoad) {
            this.window.on('ready-to-show', () => {
                this.window.show();
            });
        }
        this.window.on('closed', () => {
            this.onWindowClosed();
            this.window = null;
        });
        this.onWindowCreated();
    }
    getWindow() {
        return this.window;
    }
}
exports.WindowController = WindowController;
