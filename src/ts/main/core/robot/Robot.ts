import { SimpleDrivingComponent } from './components/driving/SimpleDrivingComponent';
import { RCDataReceiver } from './components/rc/RCDataReceiver';
import { RCDataProcessor, RCData } from './components/rc/RCDataProcessor';
import { LocalRCDataReceiver } from './components/rc/local/LocalRCDataReceiver';
import { ArduinoComponent } from './components/arduino/ArduinoComponent';

export class Robot {
    public readonly rcDataReceiver: RCDataReceiver;
    public readonly rcDataProcessor: RCDataProcessor;

    public readonly arduinoComponent: ArduinoComponent;
    public readonly drivingComponent: SimpleDrivingComponent;

    constructor() {
        // Change this line to use the correct RC Data Receiver.
        this.rcDataReceiver = new LocalRCDataReceiver();
        this.rcDataProcessor = new RCDataProcessor(this);
        this.rcDataReceiver.setRCDataProcessor(this.rcDataProcessor);

        this.arduinoComponent = new ArduinoComponent();
        this.drivingComponent = new SimpleDrivingComponent(this.arduinoComponent);
    }

    public destroy() {
        this.drivingComponent.disable(success => { });
        this.arduinoComponent.disable(success => { });
        this.rcDataProcessor.disable(success => { });
        this.rcDataReceiver.disable(success => { });

    }
}