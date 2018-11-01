import { MainWindowController } from '../../windows/controllers/MainWindowController';
import { app, ipcMain, ipcRenderer, remote, WebContents, Event } from 'electron';
import { WindowController } from '../../windows/WindowController';
import { KeyboardEventController } from '../../tools/input/KeyboardEventController';
import { appConfig, AppMode } from '../../tools/config/AppConfig';
import { MainCommandProcessor } from '../command/primaryCommandProcessors/MainCommandProcessor';
import { CommandClient, CommandClientData } from '../command/CommandClient';

import Serialport = require('serialport');
import { RendererCommandClient } from '../command/commandClients/RendererCommandClient';
import { RootDataInitializer } from './RootDataInitializer';
import { CommandProcessor } from '../command/CommandProcessor';

export class AppInstance {
    private static instance = null;

    public static getInstance(): AppInstance {
        if (AppInstance.instance === null) {
            AppInstance.instance = new AppInstance();
        }

        return AppInstance.instance;
    }

    private isRunning: boolean = false;
    private rendererCommandClient: RendererCommandClient = null;

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

        RootDataInitializer.getInstance().init();

        this.setupRenderer();

        this.isRunning = true;
    }

    private createMainWindow() {
        let mainWindowController = new MainWindowController();
        mainWindowController.showWindow();
    }

    private setupRenderer() {
        // Sync or Async
        ipcMain.on('windowData', (event, ...args: any[]) => {
            // Logger.log(event);
            // Logger.log(args);

            let windowControllerId = args[0];
            let channel = args[1];
            let data = args[2];

            let windowController: WindowController = WindowController.getWindowController(
                windowControllerId
            );

            switch (channel) {
                case 'reloadWindow':
                    if (appConfig.appMode == AppMode.DEBUG) {
                        windowController.reloadWindow();
                    }
                    break;
                default:
                    windowController.onRendererDataReceived(channel, event, data);
                    break;
            }
        });

        // Async
        ipcMain.on('keyboardEvent', (event, ...args: any[]) => {
            // Logger.log(event);
            // Logger.log(args);

            let data = args[0];
            KeyboardEventController.onKeyboardEventReceived(data.ch, data.modifiers, data.event);
        });

        // Sync
        ipcMain.on('getSerialPortList', (event, ...args: any[]) => {
            Serialport.list().then(ports => {
                event.returnValue = ports;
                // event.sender.send('serialPortList', ports);
            });
        });

        // Sync
        ipcMain.on('newCommandClient', (event, ...args: any[]) => {
            let commandClient: RendererCommandClient = new RendererCommandClient(event.sender);
            event.returnValue = commandClient.getId();
        });

        // Sync
        ipcMain.on('command', (event, ...args: any[]) => {
            let commandClientId: number = args[0];
            let rendererCommandClient: RendererCommandClient = CommandClient.getCommandClient(
                commandClientId
            ) as RendererCommandClient;

            if (rendererCommandClient !== null) {
                rendererCommandClient.setPendingRendererEvent(event);

                let command = args[1];
                CommandProcessor.getCommandProcessor('main').processCommand(rendererCommandClient, command);
            }
        });
    }
}
