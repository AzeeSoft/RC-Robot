"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Logger_1 = require("../../../tools/misc/Logger");
class RobotComponent {
    constructor(name, robot, autoEnable, callback = (success) => { }) {
        this.name = "Robot Component";
        this._isEnabled = false;
        this.isEnablePending = false;
        this.name = name;
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
            Logger_1.Logger.debug('Enable request is already pending on this component');
            callback(true, 'Enable request is already pending on this component');
            return;
        }
        if (this.isEnabled()) {
            Logger_1.Logger.debug('Component is already enabled');
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
            Logger_1.Logger.debug('Component is already disabled');
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
    isEnabled() {
        return this._isEnabled;
    }
    isFunctional() {
        return this.robot.isReady() && this.isEnabled();
    }
}
exports.RobotComponent = RobotComponent;
