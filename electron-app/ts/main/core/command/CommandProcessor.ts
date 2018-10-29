export type CommandFormat = {
    commandName: string;
    args: string[];
};

export abstract class CommandProcessor {
    protected internalCommandProcessors: ((...args) => void)[] = [];
    protected externalCommandProcessors: CommandProcessor[] = [];

    delegatedProcessor: CommandProcessor = null;

    processCommand(command: string): void {
        if (this.delegatedProcessor != null) {
            this.delegatedProcessor.processCommand(command);
        } else {
            let formattedCommand: CommandFormat = this.formatCommand(command);

            if (this.isInternalCommand(formattedCommand.commandName)) {
                this.internalCommandProcessors[formattedCommand.commandName]();
            } else if (this.isExternalCommand(formattedCommand.commandName)) {
                this.externalCommandProcessors[formattedCommand.commandName].processCommand();
                if (formattedCommand.args.length == 0) {
                  // TODO: Check if the processor can be deletegated (maybe?)
                  this.delegatedProcessor = this.externalCommandProcessors[formattedCommand.commandName];
                }
            }
        }

        this.returnControl();
    }

    isInternalCommand(commandName: string): boolean {
        return commandName in this.internalCommandProcessors;
    }

    isExternalCommand(commandName: string): boolean {
        return commandName in this.externalCommandProcessors;
    }

    formatCommand(command: string): CommandFormat {
        let formattedCommand: CommandFormat;

        // TODO: Split the words and initialize formattedCommand

        return formattedCommand;
    }

    private returnControl(): void {}
}
