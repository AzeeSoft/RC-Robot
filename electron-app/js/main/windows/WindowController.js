"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const Logger_1 = require("../tools/misc/Logger");
const AppConfig_1 = require("../tools/misc/AppConfig");
// A Global reference to a list of all controllers so that the windows don't get destroyed by GC. Also, it helps direct IPCMain events to the right window controller.
let windowControllerDict = [];
class WindowControllerOptions {
}
exports.WindowControllerOptions = WindowControllerOptions;
class WindowController {
    constructor(windowControllerOptions) {
        this.windowControllerOptions = {
            windowOptions: {},
            shouldWaitForLoad: false,
        };
        this.window = null;
        this.blockShow = false;
        this.showRequestPending = false;
        this.windowControllerOptions = Object.assign({}, this.windowControllerOptions, windowControllerOptions);
        this.createWindow();
        windowControllerDict[this.windowID] = this;
    }
    static getWindowController(windowControllerID) {
        return windowControllerDict[windowControllerID];
    }
    createWindow() {
        let windowOptions = this.windowControllerOptions.windowOptions;
        windowOptions.show = false;
        this.window = new electron_1.BrowserWindow(windowOptions);
        this.windowID = this.window.id;
        Logger_1.Logger.debug('Window created with ID: ' + this.windowID);
        if (this.windowControllerOptions.shouldWaitForLoad) {
            this.window.on('ready-to-show', () => {
                this.blockShow = false;
                if (this.showRequestPending) {
                    this.showWindow();
                }
            });
            this.blockShow = true;
        }
        else {
            this.blockShow = false;
        }
        this.window.on('closed', () => {
            windowControllerDict[this.windowID] = null;
            this.window = null;
        });
    }
    showWindow() {
        if (this.blockShow) {
            this.showRequestPending = true;
        }
        else {
            this.showRequestPending = false;
            this.window.show();
        }
    }
    getWindow() {
        return this.window;
    }
    LoadRendererPage(rendererPage) {
        switch (AppConfig_1.AppConfig.rendererMode) {
            case AppConfig_1.RendererMode.SERVER:
                this.window.loadURL('http://localhost:4200/' + rendererPage);
                break;
            case AppConfig_1.RendererMode.FILE:
                this.window.loadFile('angular-app/dist/angular-app/' + rendererPage);
                break;
        }
    }
}
exports.WindowController = WindowController;
