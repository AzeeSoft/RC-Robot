
import { RobotComponent, RobotComponentCommandProcessor } from '../RobotComponent';
import { SuccessCallback } from '../../../../tools/misc/CommonTools';
import { Logger } from '../../../../tools/misc/Logger';
import { ArduinoComponent } from '../arduino/ArduinoComponent';
import { Robot } from '../../Robot';

export class SimpleDrivingComponent extends RobotComponent {

    constructor(robot: Robot) {
        super("Driving Component", 'simpleDriving', robot, true);
    }

    public drive(hor: number, ver: number) {
        if (this.isFunctional()) {
            let arduinoDriveData = 'Drive:' + hor + ':' + ver + ':\n';
            this.robot.arduinoComponent.sendDataToArduino(arduinoDriveData, (error) => {
                Logger.debug('Cannot drive using Arduino: ' + error);
            });
        } else {
            Logger.debug('Driving Component is not functional');
        }
    }

    protected onEnable(callback: SuccessCallback, ...args) {
        callback(true);
    }

    protected onDisable(callback: SuccessCallback, ...args) {
        callback(true);
    }

    public initCommands(robotComponentCommandProcessor: RobotComponentCommandProcessor) {

    }
}