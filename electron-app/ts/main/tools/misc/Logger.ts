import { AppConfig, AppMode } from './AppConfig';

export class Logger {
    public static debug(message: any) {
        if (AppConfig.appMode == AppMode.DEBUG) {
            console.log(message);
        }
    }
}
