import { app, ipcMain } from 'electron';
import { TitleWindowController } from "./windows/controllers/TitleWindowController";
import { WindowController } from './windows/WindowController';
import { Logger } from '../shared/Logger';

function createTitleWindow() {
    let titleWindowController = new TitleWindowController();
    titleWindowController.showWindow();
}

app.on('ready', createTitleWindow);
app.on('window-all-closed', () => {
    app.quit();
});

ipcMain.on('windowData', (event, ...args: any[]) => {
    // Logger.log(event);
    Logger.log(args);

    let windowControllerId = args[0];
    let channel = args[1];

    let subArgs = args.slice(2);
    WindowController.getWindowController(windowControllerId).onRendererDataReceived(channel, event, subArgs);
});