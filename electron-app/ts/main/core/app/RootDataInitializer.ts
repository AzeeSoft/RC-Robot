import { CommandProcessor } from '../command/CommandProcessor';
import { MainCommandProcessor } from '../command/primaryCommandProcessors/MainCommandProcessor';
import { PrimaryRobotComponentCommandProcessor } from '../command/primaryCommandProcessors/PrimaryRobotComponentCommandProcessor';

export class RootDataInitializer {
    private static instance: RootDataInitializer = null;

    public static getInstance(): RootDataInitializer {
        if (RootDataInitializer.instance == null) {
            RootDataInitializer.instance = new RootDataInitializer();
        }

        return RootDataInitializer.instance;
    }

    public init() {
        this.initializePrimaryCommandProcessorList();
    }

    private initializePrimaryCommandProcessorList() {
        new MainCommandProcessor();
        new PrimaryRobotComponentCommandProcessor();
    }
}
