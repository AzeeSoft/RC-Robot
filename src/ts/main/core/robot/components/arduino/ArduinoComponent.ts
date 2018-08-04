import { RobotComponent } from "../RobotComponent";
import { ArduinoController } from "../../../../tools/arduino/ArduinoController";
import { Logger } from '../../../../../shared/Logger';
import { SuccessCallback } from '../../../../../shared/CommonTools';
import { Robot } from '../../Robot';

export class ArduinoComponent extends RobotComponent {
    private arduinoController: ArduinoController;

    constructor(robot: Robot) {
        super(robot, false);
        this.arduinoController = new ArduinoController();
    }

    public sendDataToArduino(data: string, onError: (string) => void) {
        if (this.isFunctional()) {
            this.arduinoController.sendData(data, onError);
        } else {
            onError('Arduino Component is not functional');
        }
    }

    protected onEnable(callback: SuccessCallback, portPath: string) {
        this.arduinoController.setPortPath(portPath);
        this.arduinoController.connect(() => {
            callback(true);
        }, (error) => {
            if (error) {
                callback(false, error.name + ': ' + error.message);
            }
        });
    }

    protected onDisable(callback: SuccessCallback, ...args) {
        this.arduinoController.close((success) => {
            callback(success);
        });
    }
}