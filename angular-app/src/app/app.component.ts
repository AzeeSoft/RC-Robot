import { Component, OnInit } from '@angular/core';

import * as Mousetrap from 'mousetrap';
require('mousetrap-global-bind');

import { ipcRenderer } from 'electron';
import { Logger } from '../tools/misc/Logger';
import { Router, ActivatedRoute } from '@angular/router';
import { windowConnection } from 'src/tools/misc/WindowConnection';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'RC Robot';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    Logger.debug('Starting to listen...');
    this.listenToKeyboardEvents();

    Logger.debug(this.route);
  }

  listenToKeyboardEvents() {
    Mousetrap.prototype.handleKey = function(ch, modifiers, e) {
      // Logger.debug(e);

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

    Mousetrap.bindGlobal(['ctrl+r', 'ctrl+shift+r', 'command+r', 'command+shift+r'], (e, combo) => {
      Logger.debug('reloading...');
      windowConnection.sendDataToWindow('reloadWindow', {});

      return false;
    });
  }
}
