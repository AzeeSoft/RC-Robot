import { WindowController } from "../WindowController";
import { Robot } from '../../core/robot/Robot';
import { Logger } from '../../../shared/Logger';

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

        this.LoadRendererPage("index.html");

        this.window.on('ready-to-show', () => {

        });

        this.window.on('close', () => {
            this.robot.destroy();
        });
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