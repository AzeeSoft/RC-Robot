export type CommandClientData = {
    message: string;
};

export class CommandClientState {
    public subCommandChain: string[] = [];

    public addSubCommand(subCommand: string) {
        this.subCommandChain.push(subCommand);
    }

    public getSubCommandChainDescriptor() {
        return this.subCommandChain.join('>');
    }
}

export abstract class CommandClient {
    private static nextClientId: number = 0;
    private static commandClientList: CommandClient[] = [];

    public static getCommandClient(id: number): CommandClient {
        if (id in CommandClient.commandClientList) {
            return CommandClient.commandClientList[id];
        }

        return null;
    }

    private id: number;
    private state: CommandClientState = new CommandClientState();

    constructor() {
        // TODO: Reuse available client ids instead of always using nextClientId.
        this.id = CommandClient.nextClientId++;
        CommandClient.commandClientList[this.id] = this;
    }

    public getState(): CommandClientState {
        return this.state;
    }

    public getId(): number {
        return this.id;
    }

    public abstract sendData(data: CommandClientData);
    public abstract returnControl();
}
