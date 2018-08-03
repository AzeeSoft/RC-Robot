import { app, ipcMain } from 'electron';
import { TitleWindowController } from "./windows/controllers/TitleWindowController";
import { WindowController } from './windows/WindowController';
import { Logger } from '../shared/Logger';
import { KeyboardEventController } from './tools/input/KeyboardEventController';

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
    // Logger.log(args);

    let windowControllerId = args[0];
    let channel = args[1];
    let data = args[2];
    WindowController.getWindowController(windowControllerId).onRendererDataReceived(channel, event, data);
});

ipcMain.on('keyboardEvent', (event, ...args: any[]) => {
    // Logger.log(event);
    // Logger.log(args);
    
    let data = args[0];
    KeyboardEventController.onKeyboardEventReceived(data.ch, data.modifiers, data.event);
});