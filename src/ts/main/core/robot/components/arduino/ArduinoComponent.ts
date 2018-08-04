import { RobotComponent } from "../RobotComponent";
import { ArduinoController } from "../../../../tools/arduino/ArduinoController";
import { Logger } from '../../../../../shared/Logger';
import { SuccessCallback } from '../../../../../shared/CommonTools';

export class ArduinoComponent extends RobotComponent {
    private arduinoController: ArduinoController;

    constructor() {
        super(false);
        this.arduinoController = new ArduinoController();
    }

    public getArduinoController(): ArduinoController {
        return this.arduinoController;
    }

    /* private connectToArduino(portPath: string, onSucess: () => void, onFailure: (error: Error) => void) {
        if (this.isEnabled()) {
            this.arduinoController.setPortPath(portPath);
            this.arduinoController.connect(onSucess, onFailure);
        } else {
            onFailure(new Error('Arduino Component is disabled'));
        }
    } */

    public sendDataToArduino(data: string, onError: (string) => void) {
        if (this.isEnabled()) {
            this.arduinoController.sendData(data, onError);
        } else {
            onError('Arduino Component is disabled');
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