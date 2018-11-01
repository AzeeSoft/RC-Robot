import { Injectable } from '@angular/core';
import { ipcRenderer, ipcMain } from 'electron';
import { Logger } from 'src/tools/misc/Logger';
import { Observable, } from 'rxjs';
import { EventEmitter } from 'events';

@Injectable({
  providedIn: 'root',
})
export class CommandInterfaceService {
  public commandInterfaceList: CommandInterface[] = [];

  constructor() {
    this.listenForCommandClientData();
  }

  createNewCommandClient(): CommandInterface {
    const newCommandClientId: number = ipcRenderer.sendSync('newCommandClient');

    const commandInterface = new CommandInterface(newCommandClientId);

    this.commandInterfaceList[commandInterface.getClientId()] = commandInterface;

    return commandInterface;
  }

  listenForCommandClientData() {
    ipcRenderer.on('commandClientData', (event, ...args) => {
      const commandClientId: number = args[0];
      if (commandClientId in this.commandInterfaceList) {
        this.commandInterfaceList[commandClientId].onDataReceived(args[1]);
      }
    });
  }
}

export interface CommandClientData {
  message: string;
}

export class CommandInterface {
  public subCommandChainDescriptor = '';
  public screenMessages: string[] = [];

  private clientId: number;
  private dataStream: EventEmitter = new EventEmitter();

  constructor(clientId: number) {
    this.clientId = clientId;
    this.dataStream.on('commandClientData', (data: CommandClientData) => {
      this.screenMessages.push(data.message);
    });
  }

  public getClientId(): number {
    return this.clientId;
  }

  public onDataReceived(data: CommandClientData) {
    this.dataStream.emit('commandClientData', data);
  }

  private onCommandEntered(command: string) {
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
    this.dataStream.on('commandClientData', callback);
  }
}
