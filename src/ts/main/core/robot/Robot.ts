import { ArduinoController } from '../../tools/arduino/ArduinoController';
import { SimpleDrivingComponent } from './components/driving/SimpleDrivingComponent';
import { RCDataReceiver } from './components/rc/RCDataReceiver';
import { RCDataProcessor } from './components/rc/RCDataProcessor';
import { LocalRCDataReceiver } from './components/rc/local/LocalRCDataReceiver';

export class Robot {
    private rcDataReceiver: RCDataReceiver;
    private rcDataProcessor: RCDataProcessor;

    private arduinoController: ArduinoController;

    private simpleDrivingComponent: SimpleDrivingComponent;

    constructor() {
        // Change this line to use the correct RC Data Receiver.
        this.rcDataReceiver = new LocalRCDataReceiver();

        this.rcDataProcessor = new RCDataProcessor(this);
        this.arduinoController = new ArduinoController();
        this.simpleDrivingComponent = new SimpleDrivingComponent(this.arduinoController);

        this.rcDataReceiver.setDataReceivedCallback(this.rcDataProcessor.onRCDataReceived);
    }

    public connectToArduino(portPath: string, onSucess: () => void, onFailure: (error: Error) => {}) {
        this.arduinoController.setPortPath(portPath);
        this.arduinoController.connect(onSucess, onFailure);
    }

    public getArduinoController(): ArduinoController {
        return this.arduinoController;
    }
}