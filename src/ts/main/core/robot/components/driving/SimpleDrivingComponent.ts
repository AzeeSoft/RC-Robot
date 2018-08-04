import { ArduinoController } from '../../../../tools/arduino/ArduinoController';
import { RobotComponent } from '../RobotComponent';
import { SuccessCallback } from '../../../../../shared/CommonTools';
import { Logger } from '../../../../../shared/Logger';
import { ArduinoComponent } from '../arduino/ArduinoComponent';

export class SimpleDrivingComponent extends RobotComponent {
    private arduinoComponent: ArduinoComponent = null;

    constructor(arduinoComponent: ArduinoComponent) {
        super(true);
        this.arduinoComponent = arduinoComponent;
    }

    public isFunctionable() {
        return (this.isEnabled() && this.arduinoComponent && this.arduinoComponent.isEnabled());
    }

    public drive(hor: number, ver: number) {
        if (this.isFunctionable()) {
            let arduinoDriveData = 'Drive:' + hor + ':' + ver + ':\n';
            this.arduinoComponent.sendDataToArduino(arduinoDriveData, (error) => {
                Logger.log('Cannot drive using Arduino: ' + error);
            });
        }
    }

    protected onEnable(callback: SuccessCallback, ...args) {
        callback(true);
    }

    protected onDisable(callback: SuccessCallback, ...args) {
        callback(true);
    }
}