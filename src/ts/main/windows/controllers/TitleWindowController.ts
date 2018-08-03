import { BrowserWindow, BrowserWindowConstructorOptions } from 'electron';
import { WindowController, WindowControllerOptions } from '../WindowController';
import { HomeWindowController } from './HomeWindowController';

const InitializationPeriod = 0;
// const InitializationPeriod = 3000;

export class TitleWindowController extends WindowController {

    constructor() {
        super({
            windowOptions: {
                width: 800,
                height: 600,
            },
            shouldWaitForLoad: true
        });

        this.window.setMenuBarVisibility(false);

        this.window.loadFile("src/html/windows/titleWindow.html");

        this.window.on('ready-to-show', () => {
            setTimeout(() => {
                this.createHomeWindow();
                this.window.close();
            }, InitializationPeriod);
        });
    }
    
    private createHomeWindow() {
        let homeWindowController = new HomeWindowController();
        homeWindowController.showWindow();
    }

    public onRendererDataReceived(channel: string, event: any, ...args: any[]) {
        
    }
}