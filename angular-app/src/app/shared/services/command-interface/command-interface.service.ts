import { Injectable } from '@angular/core';
import { ipcRenderer, ipcMain } from 'electron';
import { Logger } from 'src/tools/misc/Logger';

@Injectable({
  providedIn: 'root',
})
export class CommandInterfaceService {
  public commandInterfaceDataList: CommandInterfaceData[] = [];

  constructor() {
    ipcRenderer.on('commandClientData', (event, ...args) => {
      const commandClientId: number = args[0];
      if (commandClientId in this.commandInterfaceDataList) {
        this.commandInterfaceDataList[commandClientId].onDataReceived(args[1]);
      }
    });
  }

  createNewCommandClient(): number {
    const newCommandClientId: number = ipcRenderer.sendSync('newCommandClient');

    const commandInterfaceData = new CommandInterfaceData(newCommandClientId);

    this.commandInterfaceDataList[commandInterfaceData.getClientId()] = commandInterfaceData;

    return commandInterfaceData.getClientId();
  }

  sendCommand(commandClientId: number, command: string) {
    command = command.trim();
    if (command !== '') {
      const commandInterfaceData = this.commandInterfaceDataList[commandClientId];
      commandInterfaceData.onCommandEntered(command);
      commandInterfaceData.subCommandChainDescriptor = ipcRenderer.sendSync('command', commandClientId, command);
    }
  }
}

interface CommandClientData {
  message: string;
}

export class CommandInterfaceData {
  public subCommandChainDescriptor = '';
  public screenMessages: string[] = [];

  private clientId: number;

  constructor(clientId: number) {
    this.clientId = clientId;
  }

  public getClientId(): number {
    return this.clientId;
  }

  public onDataReceived(data: CommandClientData) {
    this.screenMessages.push(data.message);
  }

  public onCommandEntered(command: string) {
    this.screenMessages.push(this.subCommandChainDescriptor + '> ' + command);
  }
}
