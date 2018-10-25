import { RobotComponent } from "../RobotComponent";
import { RCDataProcessor, RCData } from './RCDataProcessor';

type RCDataReceivedCallback = (data: object) => void;

export abstract class RCDataReceiver extends RobotComponent {

    protected dataReceivedCallback: RCDataReceivedCallback = (data: RCData) => { };  // Assigning a default empty function, so that the callback can be called without null checks.

    public setDataReceivedCallback(dataReceivedCallback: RCDataReceivedCallback) {
        this.dataReceivedCallback = dataReceivedCallback;
    }

    public onRCDataReceived(rcData: RCData) {
        this.robot.rcDataProcessor.processRCData(rcData);
        this.dataReceivedCallback(rcData);
    }
}