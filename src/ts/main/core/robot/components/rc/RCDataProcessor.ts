import { Robot } from "../../Robot";
import { Logger } from '../../../../../shared/Logger';

export type RCData = { name: string, value: any };

export class RCDataProcessor {
    private robot: Robot;

    constructor(robot: Robot) {
        this.robot = robot
    }

    public onRCDataReceived(data: RCData) {
        Logger.log("RC Data: " + data.value);

        switch (data.name) {
            case 'relay':
                Logger.log("Relay Info: " + data.value);
                this.relayData(data.value);
                break;
        }
    }

    private relayData(relayInfo: { target: string, data: any }) {
        switch (relayInfo.target) {
            case 'arduino':
                Logger.log("Sending data to Arduino: " + relayInfo.data);
                this.robot.getArduinoController().sendData(relayInfo.data, (error) => {
                    Logger.log("Error sending data to Arduino: " + error);
                });
                break;
        }
    }
}