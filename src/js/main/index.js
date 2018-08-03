"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const TitleWindowController_1 = require("./windows/controllers/TitleWindowController");
const WindowController_1 = require("./windows/WindowController");
const Logger_1 = require("../shared/Logger");
function createTitleWindow() {
    let titleWindowController = new TitleWindowController_1.TitleWindowController();
    titleWindowController.showWindow();
}
electron_1.app.on('ready', createTitleWindow);
electron_1.app.on('window-all-closed', () => {
    electron_1.app.quit();
});
electron_1.ipcMain.on('windowData', (event, ...args) => {
    // Logger.log(event);
    Logger_1.Logger.log(args);
    let windowControllerId = args[0];
    let channel = args[1];
    let subArgs = args.slice(2);
    WindowController_1.WindowController.getWindowController(windowControllerId).onRendererDataReceived(channel, event, subArgs);
});
