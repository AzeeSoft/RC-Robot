import { CommandProcessor, CommandCallback } from '../CommandProcessor';
import { Logger } from '../../../tools/misc/Logger';
import { CommandClient, CommandClientData } from '../CommandClient';

export class MainCommandProcessor extends CommandProcessor {
    public constructor() {
        super('main');
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
