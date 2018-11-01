import { Robot } from "../../Robot";
import { Logger } from '../../../../tools/misc/Logger';
import { RobotComponent, RobotComponentCommandProcessor } from "../RobotComponent";
import { SuccessCallback } from '../../../../tools/misc/CommonTools';

export type RCData = { name: string, value: any };

export class RCDataProcessor extends RobotComponent {

    constructor(robot: Robot) {
        super("RC Data Processor", 'rcDataProcessor', robot, true);
        this.robot = robot
    }

    public processRCData(data: RCData) {
        if (this.isFunctional()) {
            Logger.debug("RC Data: ");
            Logger.debug(data.value);

            switch (data.name) {
                case 'relay':
                    Logger.debug("Relay Info: " + data.value);
                    this.relayData(data.value);
                    break;
                case 'drive':
                    this.driveData(data.value);
                    break;
            }
        } else {
            Logger.debug('RC Data Processor is not functional');
        }
    }

    private relayData(relayInfo: { target: string, data: any }) {
        switch (relayInfo.target) {
            case 'arduino':
                Logger.debug("Sending data to Arduino: " + relayInfo.data);
                this.robot.arduinoComponent.sendDataToArduino(relayInfo.data, (error) => {
                    Logger.debug("Error sending data to Arduino: " + error);
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

    public initCommands(robotComponentCommandProcessor: RobotComponentCommandProcessor) {

    }
}