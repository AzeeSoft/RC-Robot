import { SuccessCallback } from '../../../../shared/CommonTools';
import { Logger } from '../../../../shared/Logger';
export abstract class RobotComponent {
    private _isEnabled = false;

    constructor(autoEnable: boolean, callback: SuccessCallback = (success) => {}) {
        if (autoEnable) {
            this.enable(callback);
        }
    }

    public enable(callback: SuccessCallback, ...componentArgs) {
        if (this.isEnabled()) {
            Logger.log('Component is already enabled');
            callback(true, 'Component is already enabled');
            return;
        }

        this.onEnable((success, msg = '') => {
            if (success) {
                this._isEnabled = true;
            }

            callback(success, msg);
        }, ...componentArgs);
    }

    public disable(callback: SuccessCallback, ...componentArgs) {
        if (!this.isEnabled()) {
            Logger.log('Component is already disabled');
            callback(true, 'Component is already disabled');
            return;
        }

        this.onDisable((success, msg = '') => {
            if (success) {
                this._isEnabled = true;
            }

            callback(success, msg);
        }, ...componentArgs);
    }

    public isEnabled(): boolean {
        return this._isEnabled;
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