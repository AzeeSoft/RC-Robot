import { Robot } from "../../Robot";

export class RCDataProcessor {
    private robot: Robot;

    constructor(robot: Robot) {
        this.robot = robot
    }

    public onRCDataReceived(data: object) {

    }
}