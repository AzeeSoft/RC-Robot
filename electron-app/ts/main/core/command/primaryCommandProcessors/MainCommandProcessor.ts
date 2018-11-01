import { CommandProcessor, CommandCallback } from '../CommandProcessor';
import { Logger } from '../../../tools/misc/Logger';
import { CommandClient, CommandClientData } from '../CommandClient';
import { RobotComponentCommandProcessor } from './RobotComponentCommandProcessor';

export class MainCommandProcessor extends CommandProcessor {
    private static instance: MainCommandProcessor = null;

    public static getInstance(): MainCommandProcessor {
        if (MainCommandProcessor.instance == null) {
            MainCommandProcessor.instance = new MainCommandProcessor();
        }

        return MainCommandProcessor.instance;
    }

    private constructor() {
        super();
    }

    protected initInternalCommands(): void {
        this.addInternalCommand('test', this.test);
    }

    test(commandClient: CommandClient, ...args) {
        commandClient.sendData({
            message: 'Testing MainCommandProcessor',
        });

        Logger.debug('Testing MainCommandProcessor');
    }
}
