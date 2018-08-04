import { Robot } from "../../Robot";
import { Logger } from '../../../../../shared/Logger';
import { RobotComponent } from "../RobotComponent";
import { SuccessCallback } from '../../../../../shared/CommonTools';

export type RCData = { name: string, value: any };

export class RCDataProcessor extends RobotComponent {
    private robot: Robot;

    constructor(robot: Robot) {
        super(true);
        this.robot = robot
    }

    public processRCData(data: RCData) {
        Logger.log("RC Data: ");
        Logger.log(data.value);

        switch (data.name) {
            case 'relay':
                Logger.log("Relay Info: " + data.value);
                this.relayData(data.value);
                break;
            case 'drive':
                this.driveData(data.value);
                break;
        }
    }

    private relayData(relayInfo: { target: string, data: any }) {
        switch (relayInfo.target) {
            case 'arduino':
                Logger.log("Sending data to Arduino: " + relayInfo.data);
                this.robot.arduinoComponent.sendDataToArduino(relayInfo.data, (error) => {
                    Logger.log("Error sending data to Arduino: " + error);
                });
                break;
        }
    }

    private driveData(driveData: any) {
        this.robot.drivingComponent.drive(driveData.hor, driveData.ver);
    }

    protected onEnable(callback: SuccessCallback, ...args) {
        callback(true);
    }

    protected onDisable(callback: SuccessCallback, ...args) {
        callback(true);
    }
}