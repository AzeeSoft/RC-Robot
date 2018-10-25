import { Logger } from './Logger';
import { ipcRenderer, remote } from 'electron';

class WindowConnection {
  public sendDataToWindow(channel: string, data: any, sync: boolean = false) {
      Logger.debug(data);
      if (sync) {
          ipcRenderer.sendSync('windowData', remote.getCurrentWindow().id, channel, data);
      } else {
          ipcRenderer.send('windowData', remote.getCurrentWindow().id, channel, data);
      }
  }
}

const windowConnection: WindowConnection = new WindowConnection();

export { windowConnection };
