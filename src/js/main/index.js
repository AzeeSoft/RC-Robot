"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const TitleWindowController_1 = require("./windows/controllers/TitleWindowController");
let titleWindowController = new TitleWindowController_1.TitleWindowController();
function createTitleWindow() {
    titleWindowController.createWindow();
}
electron_1.app.on('ready', createTitleWindow);
electron_1.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('activate', () => {
    if (titleWindowController.getWindow() === null) {
        createTitleWindow();
    }
});
