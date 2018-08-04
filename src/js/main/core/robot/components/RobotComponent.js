"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Logger_1 = require("../../../../shared/Logger");
class RobotComponent {
    constructor(robot, autoEnable, callback = (success) => { }) {
        this._isEnabled = false;
        this.isEnablePending = false;
        this.robot = robot;
        if (autoEnable) {
            this.enable(callback);
        }
    }
    _enableImmediate(callback, ...componentArgs) {
        this.onEnable((success, msg = '') => {
            if (success) {
                this._isEnabled = true;
            }
            callback(success, msg);
        }, ...componentArgs);
    }
    enable(callback, ...componentArgs) {
        if (this.isEnablePending) {
            Logger_1.Logger.log('Enable request is already pending on this component');
            callback(true, 'Enable request is already pending on this component');
            return;
        }
        if (this.isEnabled()) {
            Logger_1.Logger.log('Component is already enabled');
            callback(true, 'Component is already enabled');
            return;
        }
        if (this.robot.isReady()) {
            this._enableImmediate(callback, ...componentArgs);
        }
        else {
            this.isEnablePending = true;
            this.robot.addReadyCallback(() => {
                this.isEnablePending = false;
                this._enableImmediate(callback, ...componentArgs);
            });
        }
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
    isFunctional() {
        return this.robot.isReady() && this.isEnabled();
    }
}
exports.RobotComponent = RobotComponent;
