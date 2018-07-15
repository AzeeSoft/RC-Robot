import { BrowserWindow, BrowserWindowConstructorOptions } from 'electron';
import { WindowController, WindowControllerOptions } from '../WindowController';

export class TitleWindowController extends WindowController {

    constructor() {
        super({
            windowOptions: {
                width: 800,
                height: 600
            },
            shouldWaitForLoad: true
        });
    }

    onWindowCreated() {
        // console.log(__dirname);

        this.window.loadFile("src/html/windows/titleWindow.html");
    }

    onWindowClosed() {
        
    }
}