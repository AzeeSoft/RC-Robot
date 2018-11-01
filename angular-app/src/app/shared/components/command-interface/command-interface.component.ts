import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewChild,
  ElementRef,
  AfterViewChecked,
} from '@angular/core';
import { CommandClientData } from '../../services/command-interface/command-interface.service';
import { Logger } from '../../../../tools/misc/Logger';
import {
  CommandInterfaceService,
  CommandInterface,
} from '../../services/command-interface/command-interface.service';
import { Variable } from '@angular/compiler/src/render3/r3_ast';

@Component({
  selector: 'app-command-interface',
  templateUrl: './command-interface.component.html',
  styleUrls: ['./command-interface.component.scss'],
})
export class CommandInterfaceComponent implements OnInit, AfterViewChecked {
  @Input()
  public command: string;
  public commandInterface: CommandInterface;

  @ViewChild('messageScreen')
  public messageScreen: ElementRef;

  constructor(
    public commandInterfaceService: CommandInterfaceService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.commandInterface = this.commandInterfaceService.createNewCommandClient();
    this.commandInterface.listenToCommandClientData((data: CommandClientData) => {
      this.changeDetectorRef.detectChanges();
      this.scrollDownMessageScreen();
    });
  }

  ngAfterViewChecked() {
    this.scrollDownMessageScreen();
  }

  scrollDownMessageScreen() {
    this.messageScreen.nativeElement.scrollTop = this.messageScreen.nativeElement.scrollHeight;
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
