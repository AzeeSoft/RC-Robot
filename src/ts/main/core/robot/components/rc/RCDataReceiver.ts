import { RobotComponent } from "../RobotComponent";
import { RCDataProcessor, RCData } from './RCDataProcessor';

type RCDataReceivedCallback = (data: object) => void;

export abstract class RCDataReceiver extends RobotComponent {
    private rcDataProcessor: RCDataProcessor;

    protected dataReceivedCallback: RCDataReceivedCallback = (data: RCData) => { };  // Assigning a default empty function, so that the callback can be called without null checks.

    public setDataReceivedCallback(dataReceivedCallback: RCDataReceivedCallback) {
        this.dataReceivedCallback = dataReceivedCallback;
    }

    public setRCDataProcessor(rcDataProcessor: RCDataProcessor) {
        this.rcDataProcessor = rcDataProcessor;
    }

    public onRCDataReceived(rcData: RCData) {
        if (this.rcDataProcessor) {
            this.rcDataProcessor.processRCData(rcData);
        }

        this.dataReceivedCallback(rcData);
    }
}