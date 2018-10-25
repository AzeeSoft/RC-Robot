import { MainWindowController } from '../../windows/controllers/MainWindowController';
import { app, ipcMain } from 'electron';
import { WindowController } from '../../windows/WindowController';
import { KeyboardEventController } from '../../tools/input/KeyboardEventController';

import Serialport = require('serialport');

export class AppInstance {
    private static instance = null;

    public static getInstance(): AppInstance {
        if (AppInstance.instance === null) {
            AppInstance.instance = new AppInstance();
        }

        return AppInstance.instance;
    }

    private isRunning: boolean = false;

    public start(): boolean {
        if (this.isRunning) {
            return false;
        }

        this.init();
        return this.isRunning;
    }

    private init() {
        app.on('ready', this.createMainWindow);
        app.on('window-all-closed', () => {
            app.quit();
        });

        ipcMain.on('windowData', (event, ...args: any[]) => {
            // Logger.log(event);
            // Logger.log(args);

            let windowControllerId = args[0];
            let channel = args[1];
            let data = args[2];
            WindowController.getWindowController(windowControllerId).onRendererDataReceived(
                channel,
                event,
                data
            );
        });

        ipcMain.on('keyboardEvent', (event, ...args: any[]) => {
            // Logger.log(event);
            // Logger.log(args);

            let data = args[0];
            KeyboardEventController.onKeyboardEventReceived(data.ch, data.modifiers, data.event);
        });

        ipcMain.on('getSerialPortList', (event, ...args: any[]) => {
            Serialport.list().then(ports => {
                event.returnValue = ports;
                // event.sender.send('serialPortList', ports);
            });
        });

        this.isRunning = true;
    }

    private createMainWindow() {
        let mainWindowController = new MainWindowController();
        mainWindowController.showWindow();
    }
}
