import { WindowController } from "../WindowController";
import { Robot } from '../../core/robot/Robot';
import { Logger } from '../../../shared/Logger';

export class HomeWindowController extends WindowController {

    private robot: Robot;

    constructor() {
        super({
            windowOptions: {
                width: 800,
                height: 600,
            },
            shouldWaitForLoad: true
        });

        this.robot = new Robot();

        this.window.loadFile("src/html/windows/homeWindow.html");

        this.window.on('ready-to-show', () => {

        });
    }

    public onKeyboardInputReceived(ch, modifier, e) {
        Logger.log("Keyboard Event: " + e);
        Logger.log("Character: " + ch);
        Logger.log("Modifier: " + modifier);
    }
    
    public onRendererDataReceived(channel: string, event: any, ...args: any[]) {
        Logger.log("Channel: " + channel);
        Logger.log("Event: " + event);
        Logger.log("Data: " + args);
    }
}