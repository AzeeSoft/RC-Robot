import { Component, OnInit } from '@angular/core';

import * as Mousetrap from 'mousetrap';
import { ipcRenderer } from 'electron';
import { Logger } from '../tools/misc/Logger';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'RC Robot';

  ngOnInit(): void {
    Logger.debug('Starting to listen...');
    this.listenToKeyboardEvents();
  }

  listenToKeyboardEvents() {
    Mousetrap.prototype.handleKey = function(ch, modifiers, e) {
      Logger.debug(e);

      ipcRenderer.send('keyboardEvent', {
        ch: ch,
        modifiers: modifiers,
        event: {
          type: e.type,
        },
      });

      const self = this;
      return self._handleKey.apply(self, arguments);
    };
  }
}
