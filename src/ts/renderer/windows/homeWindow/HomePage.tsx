import { ipcRenderer } from 'electron';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button'

import Mousetrap = require('mousetrap');

import '../../../../scss/windows/homeWindow.scss';
import { Logger } from '../../../shared/Logger';
import { windowConnection } from '../../App';

export class HomePage extends React.Component {

    constructor(props: Readonly<{}>) {
        super(props);
        this.listenToKeyboardEvents();
    }

    render() {
        return (
            <div className="homePage">
                <h1>Welcome to Zerone's Home Page</h1>
            </div>
        );
    }

    listenToKeyboardEvents() {          
        Mousetrap.prototype.handleKey = function (ch, modifiers, e) {   
            Logger.log(e);

            ipcRenderer.send('keyboardEvent', {
                ch: ch,
                modifiers: modifiers,
                event: {
                    type: e.type,
                },
            });

            var self = this;
            return self._handleKey.apply(self, arguments);
        }; 
        
    }
}