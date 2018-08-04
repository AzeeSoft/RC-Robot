import { ArduinoController } from '../../tools/arduino/ArduinoController';
import { SimpleDrivingComponent } from './components/driving/SimpleDrivingComponent';
import { RCDataReceiver } from './components/rc/RCDataReceiver';
import { RCDataProcessor, RCData } from './components/rc/RCDataProcessor';
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

        this.rcDataReceiver.setDataReceivedCallback((data) => {
            this.rcDataProcessor.onRCDataReceived(data as RCData);
        });
    }

    public connectToArduino(portPath: string, onSucess: () => void, onFailure: (error: Error) => void) {
        this.arduinoController.setPortPath(portPath);
        this.arduinoController.connect(onSucess, onFailure);
    }

    public getArduinoController(): ArduinoController {
        return this.arduinoController;
    }

    public destroy() {
        this.arduinoController.close();
    }
}