import { Component, OnInit, Input } from '@angular/core';
import { Logger } from 'src/tools/misc/Logger';
import { ipcRenderer } from 'electron';
import { CommandInterfaceService } from '../../services/command-interface/command-interface.service';

@Component({
  selector: 'app-command-interface',
  templateUrl: './command-interface.component.html',
  styleUrls: ['./command-interface.component.scss'],
})
export class CommandInterfaceComponent implements OnInit {
  @Input()
  public command: string;

  public commandClientId: number;

  constructor(public commandInterfaceService: CommandInterfaceService) {}

  ngOnInit() {
    this.commandClientId = this.commandInterfaceService.createNewCommandClient();
  }

  // TODO: Send a on destroy event to main process to free up the command client.

  sendCommand() {
    this.commandInterfaceService.sendCommand(this.commandClientId, this.command);
    this.command = '';
  }

  onInputTyped(e) {
    // Logger.debug(e);
    switch (e.code) {
      case 'Enter':
        this.sendCommand();
        break;
    }
  }
}
