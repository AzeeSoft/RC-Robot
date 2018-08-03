"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
// A Global reference to a list of all controllers so that the windows don't get destroyed by GC. Also, it helps direct IPCMain events to the right window controller.
let windowControllerDict = [];
let nextWindowControllerID = 0;
let reusableWindowControllerIDs = [];
class WindowControllerOptions {
}
exports.WindowControllerOptions = WindowControllerOptions;
class WindowController {
    constructor(windowControllerOptions) {
        this.windowControllerOptions = { windowOptions: {}, shouldWaitForLoad: false };
        this.window = null;
        this.blockShow = false;
        this.showRequestPending = false;
        this.windowControllerOptions = Object.assign({}, this.windowControllerOptions, windowControllerOptions);
        this.createWindow();
        if (reusableWindowControllerIDs.length > 0) {
            this.windowControllerID = reusableWindowControllerIDs.pop();
        }
        else {
            this.windowControllerID = nextWindowControllerID;
            nextWindowControllerID++;
        }
        windowControllerDict[this.windowControllerID] = (this);
    }
    static getWindowController(windowControllerID) {
        return windowControllerDict[windowControllerID];
    }
    createWindow() {
        let windowOptions = this.windowControllerOptions.windowOptions;
        windowOptions.show = false;
        this.window = new electron_1.BrowserWindow(windowOptions);
        if (this.windowControllerOptions.shouldWaitForLoad) {
            this.window.on('ready-to-show', () => {
                this.window.webContents.send('windowControllerID', this.windowControllerID);
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
            this.window = null;
            windowControllerDict[this.windowControllerID] = null;
            reusableWindowControllerIDs.push(this.windowControllerID);
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
}
exports.WindowController = WindowController;
