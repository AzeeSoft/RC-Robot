import { SuccessCallback } from '../../../tools/misc/CommonTools';
import { Logger } from '../../../tools/misc/Logger';
import { Robot } from '../Robot';
import { CommandProcessor } from '../../command/CommandProcessor';
import { CommandClient, CommandClientData } from '../../command/CommandClient';
import { MainCommandProcessor } from '../../command/primaryCommandProcessors/MainCommandProcessor';

export abstract class RobotComponent {
    public readonly name: string = 'Robot Component';

    private _isEnabled = false;
    private isEnablePending = false;

    protected robot: Robot;
    protected commandProcessor: RobotComponentCommandProcessor;

    constructor(
        name: string,
        commandName: string,
        robot: Robot,
        autoEnable: boolean,
        callback: SuccessCallback = success => {}
    ) {
        this.name = name;
        this.robot = robot;
        this.commandProcessor = new RobotComponentCommandProcessor(commandName, this);

        if (autoEnable) {
            this.enable(callback);
        }
    }

    private _enableImmediate(callback: SuccessCallback, ...componentArgs) {
        this.onEnable((success, msg = '') => {
            if (success) {
                this._isEnabled = true;
            }

            callback(success, msg);
        }, ...componentArgs);
    }

    public enable(callback: SuccessCallback, ...componentArgs) {
        if (this.isEnablePending) {
            Logger.debug('Enable request is already pending on this component');
            callback(true, 'Enable request is already pending on this component');
            return;
        }

        if (this.isEnabled()) {
            Logger.debug('Component is already enabled');
            callback(true, 'Component is already enabled');
            return;
        }

        if (this.robot.isReady()) {
            this._enableImmediate(callback, ...componentArgs);
        } else {
            this.isEnablePending = true;
            this.robot.addReadyCallback(() => {
                this.isEnablePending = false;
                this._enableImmediate(callback, ...componentArgs);
            });
        }
    }

    public disable(callback: SuccessCallback, ...componentArgs) {
        if (!this.isEnabled()) {
            Logger.debug('Component is already disabled');
            callback(true, 'Component is already disabled');
            return;
        }

        this.onDisable((success, msg = '') => {
            if (success) {
                this._isEnabled = false;
            }

            callback(success, msg);
        }, ...componentArgs);
    }

    private isEnabled(): boolean {
        return this._isEnabled;
    }

    public isFunctional(): boolean {
        return this.robot.isReady() && this.isEnabled();
    }

    /**
     * @returns true if the component was successfully enabled. false otherwise
     */
    protected abstract onEnable(callback: SuccessCallback, ...args);

    /**
     * @returns true if the component was successfully disabled. false otherwise
     */
    protected abstract onDisable(callback: SuccessCallback, ...args);

    public abstract initCommands(componentCommandProcessor: RobotComponentCommandProcessor);
}

export class RobotComponentCommandProcessor extends CommandProcessor {
    public readonly robotComponent: RobotComponent;

    constructor(name: string, robotComponent: RobotComponent) {
        super(name);
        this.robotComponent = robotComponent;
        this.robotComponent.initCommands(this);

        CommandProcessor.getCommandProcessor('primaryRobotComponent').addExternalCommand(
            this.name,
            this
        );
    }

    protected initInternalCommands(): void {
        this.addInternalCommand('enable', this.enableComponent);
        this.addInternalCommand('disable', this.disableComponent);
    }

    enableComponent(commandClient: CommandClient, ...args) {
        this.robotComponent.enable((success, msg) => {
            const data = new CommandClientData();
            if (success) {
                data.message = `${this.robotComponent.name} enabled: ${msg}`;
            } else {
                data.message = `Cannot enable ${this.robotComponent.name}: ${msg}`;
            }
            commandClient.sendData(data);
        }, ...args);
    }

    disableComponent(commandClient: CommandClient, ...args) {
        this.robotComponent.disable((success, msg) => {
            const data = new CommandClientData();
            if (success) {
                data.message = `${this.robotComponent.name} disabled: ${msg}`;
            } else {
                data.message = `Cannot disable ${this.robotComponent.name}: ${msg}`;
            }
            commandClient.sendData(data);
        }, ...args);
    }
}
