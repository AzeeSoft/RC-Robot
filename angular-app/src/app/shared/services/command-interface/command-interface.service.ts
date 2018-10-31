import { Injectable } from '@angular/core';
import { ipcRenderer, ipcMain } from 'electron';
import { Logger } from 'src/tools/misc/Logger';

@Injectable({
  providedIn: 'root',
})
export class CommandInterfaceService {
  public commandInterfaceList: CommandInterface[] = [];

  constructor() {
    ipcRenderer.on('commandClientData', (event, ...args) => {
      const commandClientId: number = args[0];
      if (commandClientId in this.commandInterfaceList) {
        this.commandInterfaceList[commandClientId].onDataReceived(args[1]);
      }
    });
  }

  createNewCommandClient(): CommandInterface {
    const newCommandClientId: number = ipcRenderer.sendSync('newCommandClient');

    const commandInterface = new CommandInterface(newCommandClientId);

    this.commandInterfaceList[commandInterface.getClientId()] = commandInterface;

    return commandInterface;
  }
}

export interface CommandClientData {
  message: string;
}

export class CommandInterface {
  public subCommandChainDescriptor = '';
  public screenMessages: string[] = [];

  private clientId: number;
  private dataReceivedCallback: (data: CommandClientData) => void;

  constructor(clientId: number) {
    this.clientId = clientId;
  }

  public getClientId(): number {
    return this.clientId;
  }

  public onDataReceived(data: CommandClientData) {
    this.screenMessages.push(data.message);
    if (this.dataReceivedCallback) {
      this.dataReceivedCallback(data);
    }
  }

  public onCommandEntered(command: string) {
    const commandScreenMessage = this.subCommandChainDescriptor + '> ' + command;
    this.screenMessages.push(commandScreenMessage);
  }

  sendCommand(command: string) {
    command = command.trim();
    if (command !== '') {
      this.onCommandEntered(command);
      this.subCommandChainDescriptor = ipcRenderer.sendSync('command', this.clientId, command);
    }
  }

  public subscribe(callback: (data: CommandClientData) => void) {
    this.dataReceivedCallback = callback;
  }
}
