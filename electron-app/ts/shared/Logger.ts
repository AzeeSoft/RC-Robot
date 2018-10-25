import { AppConfig, AppMode } from '../main/tools/misc/AppConfig';

export class Logger {
    public static debug(message: any) {
        if (AppConfig.appMode == AppMode.DEBUG) {
            console.log(message);
        }
    }
}
