import { Component, OnInit } from '@angular/core';
import { Logger } from 'src/tools/misc/Logger';

@Component({
  selector: 'app-command-interface',
  templateUrl: './command-interface.component.html',
  styleUrls: ['./command-interface.component.scss'],
})
export class CommandInterfaceComponent implements OnInit {
  public input: string;

  constructor() {}

  ngOnInit() {}

  sendCommand() {}

  onInputTyped(e) {
    // Logger.debug(e);
    switch (e.code) {
      case 'Enter':
        this.sendCommand();
        break;
    }
  }
}
