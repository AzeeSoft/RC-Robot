import { CommandProcessor } from '../command/CommandProcessor';
import { MainCommandProcessor } from '../command/primaryCommandProcessors/MainCommandProcessor';
import { RobotComponentCommandProcessor } from '../command/primaryCommandProcessors/RobotComponentCommandProcessor';

export class RootDataInitializer {
    private static instance: RootDataInitializer = null;

    public static getInstance(): RootDataInitializer {
        if (RootDataInitializer.instance == null) {
            RootDataInitializer.instance = new RootDataInitializer();
        }

        return RootDataInitializer.instance;
    }

    // Used to initialize and to keep a reference (to prevent garbage collection)
    private primaryCommandProcessorList: CommandProcessor[] = [];

    public init() {
        this.initializePrimaryCommandProcessorList();
    }

    private initializePrimaryCommandProcessorList() {
        this.primaryCommandProcessorList = [
            MainCommandProcessor.getInstance(),
            new RobotComponentCommandProcessor(),
        ];
    }
}
