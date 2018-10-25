import { environment } from '../../environments/environment';

export class Logger {
    public static debug(message: any) {
        if (!environment.production) {
            console.log(message);
        }
    }
}
