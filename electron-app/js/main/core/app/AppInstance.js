"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MainWindowController_1 = require("../../windows/controllers/MainWindowController");
const electron_1 = require("electron");
const WindowController_1 = require("../../windows/WindowController");
const KeyboardEventController_1 = require("../../tools/input/KeyboardEventController");
const Serialport = require("serialport");
class AppInstance {
    constructor() {
        this.isRunning = false;
    }
    static getInstance() {
        if (AppInstance.instance === null) {
            AppInstance.instance = new AppInstance();
        }
        return AppInstance.instance;
    }
    start() {
        if (this.isRunning) {
            return false;
        }
        this.init();
        return this.isRunning;
    }
    init() {
        electron_1.app.on('ready', this.createMainWindow);
        electron_1.app.on('window-all-closed', () => {
            electron_1.app.quit();
        });
        electron_1.ipcMain.on('windowData', (event, ...args) => {
            // Logger.log(event);
            // Logger.log(args);
            let windowControllerId = args[0];
            let channel = args[1];
            let data = args[2];
            WindowController_1.WindowController.getWindowController(windowControllerId).onRendererDataReceived(channel, event, data);
        });
        electron_1.ipcMain.on('keyboardEvent', (event, ...args) => {
            // Logger.log(event);
            // Logger.log(args);
            let data = args[0];
            KeyboardEventController_1.KeyboardEventController.onKeyboardEventReceived(data.ch, data.modifiers, data.event);
        });
        electron_1.ipcMain.on('getSerialPortList', (event, ...args) => {
            Serialport.list().then(ports => {
                event.returnValue = ports;
                // event.sender.send('serialPortList', ports);
            });
        });
        this.isRunning = true;
    }
    createMainWindow() {
        let mainWindowController = new MainWindowController_1.MainWindowController();
        mainWindowController.showWindow();
    }
}
AppInstance.instance = null;
exports.AppInstance = AppInstance;
