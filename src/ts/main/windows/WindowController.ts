import { BrowserWindow, BrowserWindowConstructorOptions } from 'electron';

export class WindowControllerOptions {
    windowOptions?: BrowserWindowConstructorOptions;
    shouldWaitForLoad?: boolean;
}

export abstract class WindowController {
    private windowControllerOptions: WindowControllerOptions = { windowOptions: {}, shouldWaitForLoad: false };
    protected window: BrowserWindow = null;

    constructor(windowControllerOptions: WindowControllerOptions) {
        this.windowControllerOptions = { ...this.windowControllerOptions, ...windowControllerOptions };
    }

    createWindow() {
        let windowOptions = this.windowControllerOptions.windowOptions;
        if (this.windowControllerOptions.shouldWaitForLoad) {
            windowOptions.show = false;
        }

        this.window = new BrowserWindow(windowOptions);

        if (this.windowControllerOptions.shouldWaitForLoad) {
            this.window.on('ready-to-show', () => {
                this.window.show();
            });
        }

        this.window.on('closed', () => {
            this.onWindowClosed();
            this.window = null;
        });

        this.onWindowCreated();
    }

    getWindow() {
        return this.window;
    }

    protected abstract onWindowCreated();
    protected abstract onWindowClosed();
}