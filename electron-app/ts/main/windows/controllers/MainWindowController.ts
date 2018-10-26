import { WindowController } from "../WindowController";
import { Robot } from '../../core/robot/Robot';
import { Logger } from '../../tools/misc/Logger';

export class MainWindowController extends WindowController {
    private robot: Robot;

    constructor() {
        super({
            windowOptions: {
                width: 800,
                height: 600,
            },
            shouldWaitForLoad: true
        });

        this.robot = Robot.getInstance();

        this.loadMainPage();

        this.window.on('ready-to-show', () => {

        });

        this.window.on('close', () => {
            this.robot.destroy();
        });
    }

    private loadMainPage() {
        this.LoadRendererPage("index.html");
    }

    public reloadWindow() {
        this.loadMainPage();
    }

    public onRendererDataReceived(channel: string, event: any, data: any) {
        switch (channel) {
            case 'connectToArduino':
                this.robot.arduinoComponent.enable((success, errorMsg) => {

                }, data.portPath);
            break;
        }
    }
}