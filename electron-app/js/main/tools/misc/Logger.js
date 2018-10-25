"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AppConfig_1 = require("./AppConfig");
class Logger {
    static debug(message) {
        if (AppConfig_1.AppConfig.appMode == AppConfig_1.AppMode.DEBUG) {
            console.log(message);
        }
    }
}
exports.Logger = Logger;
