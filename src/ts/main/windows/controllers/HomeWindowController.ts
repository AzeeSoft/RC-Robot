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

        this.window.on('close', () => {
            this.robot.destroy();
        });
    }

    public onRendererDataReceived(channel: string, event: any, data: any) {
        switch (channel) {
            case 'connectToArduino':
                this.robot.connectToArduino(data.portPath, () => {

                }, (err) => {
                    
                });
            break;
        }
    }
}