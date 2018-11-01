import { CommandProcessor } from '../CommandProcessor';
import { MainCommandProcessor } from './MainCommandProcessor';
import { CommandClient, CommandClientData } from '../CommandClient';

export class PrimaryRobotComponentCommandProcessor extends CommandProcessor {
    constructor() {
        super('primaryRobotComponent');
        CommandProcessor.getCommandProcessor('main').addExternalCommand('component', this);
    }

    protected initInternalCommands(): void {
        this.addInternalCommand('show', this.show);
    }

    show(commandClient: CommandClient, ...args) {
        const data = new CommandClientData();
        data.message = `Available Robot Components:\n` + `============================\n`;

        this.getComponents().forEach(component => {
            data.message += ` - ${component}\n`;
        });

        commandClient.sendData(data);
    }

    private getComponents(): string[] {
        return ['Arduino', 'Driving', 'RCDataReceiver', 'RCDataProcessor'];
    }
}
