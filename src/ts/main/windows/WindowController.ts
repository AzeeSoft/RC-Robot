import { BrowserWindow, BrowserWindowConstructorOptions } from 'electron';
import { CommonTools } from '../../shared/CommonTools';

// A Global reference to a list of all controllers so that the windows don't get destroyed by GC. Also, it helps direct IPCMain events to the right window controller.
let windowControllerDict : WindowController[] = [];
let nextWindowControllerID: number = 0;
let reusableWindowControllerIDs: number[] = [];

export class WindowControllerOptions {
    windowOptions?: BrowserWindowConstructorOptions;
    shouldWaitForLoad?: boolean;
}

export abstract class WindowController {
    private windowControllerID: number;

    private windowControllerOptions: WindowControllerOptions = { windowOptions: {}, shouldWaitForLoad: false };
    protected window: BrowserWindow = null;

    private blockShow: boolean = false;
    private showRequestPending: boolean = false;

    public static getWindowController(windowControllerID: number) {
        return windowControllerDict[windowControllerID];
    }

    constructor(windowControllerOptions: WindowControllerOptions) {
        this.windowControllerOptions = { ...this.windowControllerOptions, ...windowControllerOptions };

        this.createWindow();
        
        if (reusableWindowControllerIDs.length > 0) {
            this.windowControllerID = reusableWindowControllerIDs.pop();
        } else {
            this.windowControllerID = nextWindowControllerID;
            nextWindowControllerID++;
        }

        windowControllerDict[this.windowControllerID] = (this);
    }

    private createWindow() {
        let windowOptions = this.windowControllerOptions.windowOptions;
        windowOptions.show = false;

        this.window = new BrowserWindow(windowOptions);

        if (this.windowControllerOptions.shouldWaitForLoad) {
            this.window.on('ready-to-show', () => {
                this.window.webContents.send('windowControllerID', this.windowControllerID);
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
            this.window = null;

            windowControllerDict[this.windowControllerID] = null;
            reusableWindowControllerIDs.push(this.windowControllerID);
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

    public abstract onRendererDataReceived(channel: string, event: any, ...args: any[]);
}