"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Logger_1 = require("../../../../shared/Logger");
class RobotComponent {
    constructor(autoEnable, callback = (success) => { }) {
        this._isEnabled = false;
        if (autoEnable) {
            this.enable(callback);
        }
    }
    enable(callback, ...componentArgs) {
        if (this.isEnabled()) {
            Logger_1.Logger.log('Component is already enabled');
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
    disable(callback, ...componentArgs) {
        if (!this.isEnabled()) {
            Logger_1.Logger.log('Component is already disabled');
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
    isEnabled() {
        return this._isEnabled;
    }
}
exports.RobotComponent = RobotComponent;
