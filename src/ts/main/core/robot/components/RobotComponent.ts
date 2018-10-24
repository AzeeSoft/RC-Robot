import { SuccessCallback } from '../../../../shared/CommonTools';
import { Logger } from '../../../../shared/Logger';
import { Robot } from '../Robot';

export abstract class RobotComponent {

    public readonly name: string = "Robot Component";

    private _isEnabled = false;
    private isEnablePending = false;

    protected robot: Robot;

    constructor(name: string, robot: Robot, autoEnable: boolean, callback: SuccessCallback = (success) => {}) {
        this.name = name;
        this.robot = robot;

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
            Logger.log('Enable request is already pending on this component');
            callback(true, 'Enable request is already pending on this component');
            return;
        }

        if (this.isEnabled()) {
            Logger.log('Component is already enabled');
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
            Logger.log('Component is already disabled');
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
}