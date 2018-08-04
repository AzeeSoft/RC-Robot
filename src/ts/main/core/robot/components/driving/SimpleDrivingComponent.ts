import { ArduinoController } from '../../../../tools/arduino/ArduinoController';
import { RobotComponent } from '../RobotComponent';
import { SuccessCallback } from '../../../../../shared/CommonTools';
import { Logger } from '../../../../../shared/Logger';
import { ArduinoComponent } from '../arduino/ArduinoComponent';
import { Robot } from '../../Robot';

export class SimpleDrivingComponent extends RobotComponent {

    constructor(robot: Robot) {
        super(robot, true);
    }

    public drive(hor: number, ver: number) {
        if (this.isFunctional()) {
            let arduinoDriveData = 'Drive:' + hor + ':' + ver + ':\n';
            this.robot.arduinoComponent.sendDataToArduino(arduinoDriveData, (error) => {
                Logger.log('Cannot drive using Arduino: ' + error);
            });
        } else {
            Logger.log('Driving Component is not functional');
        }
    }

    protected onEnable(callback: SuccessCallback, ...args) {
        callback(true);
    }

    protected onDisable(callback: SuccessCallback, ...args) {
        callback(true);
    }
}