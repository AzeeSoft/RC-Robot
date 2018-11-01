import { Logger } from '../../tools/misc/Logger';
import { CommandClient, CommandClientData } from './CommandClient';
import { RobotComponentCommandProcessor } from './primaryCommandProcessors/RobotComponentCommandProcessor';
import { MainCommandProcessor } from './primaryCommandProcessors/MainCommandProcessor';

export type CommandFormat = {
    commandName: string;
    args: string[];
};

export type CommandCallback = (commandClient: CommandClient, ...args) => void;

export abstract class CommandProcessor {
    private reservedCommandProcessors: CommandCallback[] = [];

    private internalCommandProcessors: CommandCallback[] = [];
    private externalCommandProcessors: CommandProcessor[] = [];

    constructor() {
        this.initInternalCommands();

        this.addReservedCommand('?', this.showHelp);
        this.addReservedCommand('help', this.showHelp);
        this.addReservedCommand('exit', this.exitSubChain);
    }

    processCommand(commandClient: CommandClient, command: string): void {
        Logger.debug('Processing command: ' + command);

        let commandClientState = commandClient.getState();

        let selectedProcessor: CommandProcessor = this;
        if (commandClientState.subCommandChain.length > 0) {
            for (let i = 0; i < commandClientState.subCommandChain.length; i++) {
                let subCommand = commandClientState.subCommandChain[i];

                if (selectedProcessor.isExternalCommand(subCommand)) {
                    selectedProcessor = selectedProcessor.externalCommandProcessors[subCommand];
                } else {
                    selectedProcessor = this;
                    break;
                }
            }
        }

        let formattedCommand: CommandFormat = CommandProcessor.formatCommand(command);

        let isSearchingForCommand = true;
        let pendingSubCommands: string[] = [];
        while (isSearchingForCommand) {
            if (selectedProcessor.isReservedCommand(formattedCommand.commandName)) {
                selectedProcessor.reservedCommandProcessors[formattedCommand.commandName].call(
                    selectedProcessor,
                    commandClient,
                    formattedCommand.args
                );

                isSearchingForCommand = false;
            } else if (selectedProcessor.isInternalCommand(formattedCommand.commandName)) {
                selectedProcessor.internalCommandProcessors[formattedCommand.commandName].call(
                    selectedProcessor,
                    commandClient,
                    formattedCommand.args
                );

                isSearchingForCommand = false;
            } else if (selectedProcessor.isExternalCommand(formattedCommand.commandName)) {
                if (formattedCommand.args.length == 0) {
                    // TODO: Check if the next processor can be deletegated (maybe?)

                    pendingSubCommands.forEach(pendingSubCommand => {
                        commandClientState.addSubCommand(pendingSubCommand);
                    });
                    commandClientState.addSubCommand(formattedCommand.commandName);

                    isSearchingForCommand = false;
                } else {
                    selectedProcessor = this.externalCommandProcessors[
                        formattedCommand.commandName
                    ];

                    pendingSubCommands.push(formattedCommand.commandName);
                    formattedCommand.commandName = formattedCommand.args.shift();
                }
            } else {
                commandClient.sendData({
                    message: `Invalid command: ${command}`,
                });
                isSearchingForCommand = false;
            }
        }

        commandClient.returnControl();
    }

    isReservedCommand(commandName: string): boolean {
        return (
            commandName in this.reservedCommandProcessors &&
            this.reservedCommandProcessors[commandName] != null
        );
    }

    isInternalCommand(commandName: string): boolean {
        return (
            commandName in this.internalCommandProcessors &&
            this.internalCommandProcessors[commandName] != null
        );
    }

    isExternalCommand(commandName: string): boolean {
        return (
            commandName in this.externalCommandProcessors &&
            this.externalCommandProcessors[commandName] != null
        );
    }

    static formatCommand(command: string): CommandFormat {
        let formattedCommand: CommandFormat = {
            commandName: '',
            args: [],
        };

        let tokens: string[] = command.split(' ');
        tokens = tokens.map(token => {
            return token.trim();
        });

        formattedCommand.commandName = tokens.shift();
        formattedCommand.args = tokens;

        return formattedCommand;
    }

    private addReservedCommand(commandName: string, processorCallback: CommandCallback) {
        if (!this.isReservedCommand(commandName)) {
            this.reservedCommandProcessors[commandName] = processorCallback;
        } else {
            Logger.debug('Reserved Command exists: ' + commandName);
        }
    }

    protected addInternalCommand(commandName: string, processorCallback: CommandCallback) {
        if (!this.isInternalCommand(commandName)) {
            this.internalCommandProcessors[commandName] = processorCallback;
        } else {
            Logger.debug('Internal Command exists: ' + commandName);
        }
    }

    public addExternalCommand(commandName: string, commandProcessor: CommandProcessor) {
        if (!this.isExternalCommand(commandName)) {
            this.externalCommandProcessors[commandName] = commandProcessor;
        } else {
            Logger.debug('External Command exists: ' + commandName);
        }
    }

    public getInternalCommands(): string[] {
        let commands = [...Object.keys(this.internalCommandProcessors)];
        return commands;
    }

    public getExternalCommands(): string[] {
        return [...Object.keys(this.externalCommandProcessors)];
    }

    public getReservedCommands(): string[] {
        return [...Object.keys(this.reservedCommandProcessors)];
    }

    public getSupportedCommands(): string[] {
        return [
            ...this.getInternalCommands(),
            ...this.getExternalCommands(),
            ...this.getReservedCommands(),
        ];
    }

    protected showHelp(commandClient: CommandClient, ...args) {
        const data: CommandClientData = new CommandClientData();

        let commands = '';
        this.getSupportedCommands().forEach(command => {
            commands += `- ${command}\n`;
        });

        data.message =
            `Help\n` + `=====\n` + `You can use the following commands:\n` + `${commands}`;

        commandClient.sendData(data);
    }

    private exitSubChain(commandClient: CommandClient, ...args) {
        let commandClientState = commandClient.getState();
        if (commandClientState.subCommandChain.length > 0) {
            commandClientState.subCommandChain.pop();
        } else {
            commandClient.sendData({
                message: 'Cannot exit from root!',
            });
        }
    }

    protected abstract initInternalCommands(): void;
}
