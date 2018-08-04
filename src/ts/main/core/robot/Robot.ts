import { SimpleDrivingComponent } from './components/driving/SimpleDrivingComponent';
import { RCDataReceiver } from './components/rc/RCDataReceiver';
import { RCDataProcessor, RCData } from './components/rc/RCDataProcessor';
import { LocalRCDataReceiver } from './components/rc/local/LocalRCDataReceiver';
import { ArduinoComponent } from './components/arduino/ArduinoComponent';

export class Robot {
    private static instance = null;

    public static getInstance(): Robot {
        if (Robot.instance === null) {
            Robot.instance = new Robot();
        }

        return Robot.instance;
    }

    private _isReady: boolean = false;
    private readyCallbacks: (() => void)[] = [];

    public readonly rcDataReceiver: RCDataReceiver;
    public readonly rcDataProcessor: RCDataProcessor;
    public readonly arduinoComponent: ArduinoComponent;
    public readonly drivingComponent: SimpleDrivingComponent;

    private constructor() {
        Robot.instance = this;

        // Change this line to use the correct RC Data Receiver.
        this.rcDataReceiver = new LocalRCDataReceiver(this);
        this.rcDataProcessor = new RCDataProcessor(this);
        this.arduinoComponent = new ArduinoComponent(this);
        this.drivingComponent = new SimpleDrivingComponent(this);

        this._onReady();
    }

    private _onReady() {
        this._isReady = true;
        this.readyCallbacks.forEach(readyCallback => {
            readyCallback();
        });

        this.readyCallbacks = [];
    }

    public isReady() {
        return this._isReady;
    }

    public addReadyCallback(callback: () => void) {
        this.readyCallbacks.push(callback);
    }

    public destroy() {
        this.drivingComponent.disable(success => { });
        this.arduinoComponent.disable(success => { });
        this.rcDataProcessor.disable(success => { });
        this.rcDataReceiver.disable(success => { });

        this._isReady = false;

        Robot.instance = null;
    }
}