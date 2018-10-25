import { BrowserWindow, BrowserWindowConstructorOptions } from 'electron';
import { CommonTools } from '../../shared/CommonTools';
import { Logger } from '../../shared/Logger';
import { AppInstance } from '../core/app/AppInstance';
import { AppConfig, RendererMode } from '../tools/misc/AppConfig';

// A Global reference to a list of all controllers so that the windows don't get destroyed by GC. Also, it helps direct IPCMain events to the right window controller.
let windowControllerDict: WindowController[] = [];

export class WindowControllerOptions {
    windowOptions?: BrowserWindowConstructorOptions;
    shouldWaitForLoad?: boolean;
}

export abstract class WindowController {
    private windowID: number; // Same as the window's ID. Declrared again so that it can be referenced after the window is closed (useful to remove the controller from dictionary).

    private windowControllerOptions: WindowControllerOptions = {
        windowOptions: {},
        shouldWaitForLoad: false,
    };
    protected window: BrowserWindow = null;

    private blockShow: boolean = false;
    private showRequestPending: boolean = false;

    public static getWindowController(windowControllerID: number) {
        return windowControllerDict[windowControllerID];
    }

    constructor(windowControllerOptions: WindowControllerOptions) {
        this.windowControllerOptions = {
            ...this.windowControllerOptions,
            ...windowControllerOptions,
        };

        this.createWindow();
        windowControllerDict[this.windowID] = this;
    }

    private createWindow() {
        let windowOptions = this.windowControllerOptions.windowOptions;
        windowOptions.show = false;

        this.window = new BrowserWindow(windowOptions);
        this.windowID = this.window.id;

        Logger.debug('Window created with ID: ' + this.windowID);

        if (this.windowControllerOptions.shouldWaitForLoad) {
            this.window.on('ready-to-show', () => {
                this.blockShow = false;

                if (this.showRequestPending) {
                    this.showWindow();
                }
            });
            this.blockShow = true;
        } else {
            this.blockShow = false;
        }

        this.window.on('closed', () => {
            windowControllerDict[this.windowID] = null;
            this.window = null;
        });
    }

    public showWindow() {
        if (this.blockShow) {
            this.showRequestPending = true;
        } else {
            this.showRequestPending = false;
            this.window.show();
        }
    }

    public getWindow() {
        return this.window;
    }

    public LoadRendererPage(rendererPage: string) {
        switch (AppConfig.rendererMode) {
            case RendererMode.DEV_SERVER:
                this.window.loadURL('http://localhost:4200/' + rendererPage);
                break;
            case RendererMode.FILE:
                this.window.loadFile('angular-app/dist/angular-app/' + rendererPage);
                break;
        }
    }

    public abstract onRendererDataReceived(channel: string, event: any, data: any);
}
