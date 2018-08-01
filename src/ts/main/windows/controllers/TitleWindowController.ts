import { BrowserWindow, BrowserWindowConstructorOptions } from 'electron';
import { WindowController, WindowControllerOptions } from '../WindowController';

const InitializationPeriod = 3000;

export class TitleWindowController extends WindowController {

    constructor() {
        super({
            windowOptions: {
                width: 800,
                height: 600,
            },
            shouldWaitForLoad: true
        });
    }

    onWindowCreated() {
        // console.log(__dirname);

        this.window.setMenuBarVisibility(false);

        this.window.loadFile("src/html/windows/titleWindow.html");

        this.window.on('ready-to-show', () => {
            setTimeout(() => {
                this.window.close();
            }, InitializationPeriod);
        });
    }

    onWindowClosed() { 
        
    }
}