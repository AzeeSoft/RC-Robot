import { ArduinoController } from '../../../../tools/arduino/ArduinoController';

export class SimpleDrivingComponent {
    private arduinoController: ArduinoController = null;

    constructor(arduinoController: ArduinoController) {
        this.arduinoController = arduinoController;
    }

    public isFunctionable() {
        return (this.arduinoController && this.arduinoController.isConnected());
    }

    public move(hor: number, ver: number) {
        
    }
}