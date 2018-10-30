import { appConfig, AppMode } from '../config/AppConfig';

export class Logger {
    public static debug(message: any) {
        if (appConfig.appMode == AppMode.DEBUG) {
            console.log(message);
        }
    }
}
