import { Logger } from '../../tools/misc/Logger';
import { CommandClient } from './CommandClient';

export type CommandFormat = {
    commandName: string;
    args: string[];
};

export type InternalCommandCallback = (commandClient: CommandClient, ...args) => void;

export abstract class CommandProcessor {
    private internalCommandProcessors: InternalCommandCallback[] = [];
    private externalCommandProcessors: CommandProcessor[] = [];

    constructor() {
        this.initInternalCommands();
    }

    processCommand(commandClient: CommandClient, command: string): void {
        Logger.debug('Processing command: ' + command);

        let commandClientState = commandClient.getState();

        let selectedProcessor: CommandProcessor = this;
        if (commandClientState.subCommandChain.length > 0) {
            for (let i = 0; i < commandClientState.subCommandChain.length; i++) {
                let subCommand = commandClientState.subCommandChain[i];

                if (selectedProcessor.isExternalCommand(subCommand)) {
                    selectedProcessor = selectedProcessor[command];
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
            if (selectedProcessor.isInternalCommand(formattedCommand.commandName)) {
                selectedProcessor.internalCommandProcessors[formattedCommand.commandName](commandClient, formattedCommand.args);

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
                // TODO: Send 'command not found' message.
                isSearchingForCommand = false;
            }
        }

        commandClient.returnControl();
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

    protected addInternalCommand(commandName: string, processorCallback: InternalCommandCallback) {
        if (!this.isInternalCommand(commandName)) {
            this.internalCommandProcessors[commandName] = processorCallback;
        } else {
            Logger.debug('Internal Command exists: ' + commandName);
        }
    }

    protected addExternalCommand(commandName: string, commandProcessor: CommandProcessor) {
        if (!this.isExternalCommand(commandName)) {
            this.externalCommandProcessors[commandName] = commandProcessor;
        } else {
            Logger.debug('External Command exists: ' + commandName);
        }
    }

    protected abstract initInternalCommands(): void;
}
