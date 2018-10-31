import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { Logger } from 'src/tools/misc/Logger';
import { ipcRenderer } from 'electron';
import { CommandClientData } from '../../services/command-interface/command-interface.service';
import {
  CommandInterfaceService,
  CommandInterface,
} from '../../services/command-interface/command-interface.service';

@Component({
  selector: 'app-command-interface',
  templateUrl: './command-interface.component.html',
  styleUrls: ['./command-interface.component.scss'],
})
export class CommandInterfaceComponent implements OnInit {
  @Input()
  public command: string;
  public commandInterface: CommandInterface;

  constructor(
    public commandInterfaceService: CommandInterfaceService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.commandInterface = this.commandInterfaceService.createNewCommandClient();
    this.commandInterface.subscribe((data: CommandClientData) => {
      this.changeDetectorRef.detectChanges();
    });
  }

  // TODO: Send a on destroy event to main process to free up the command client.

  sendCommand() {
    this.commandInterface.sendCommand(this.command);
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
