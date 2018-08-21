import { ipcRenderer } from 'electron';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button'

import Mousetrap = require('mousetrap');

import '../../../../scss/windows/homeWindow.scss';
import { Logger } from '../../../shared/Logger';
import { windowConnection } from '../../App';
import Dialog from '@material-ui/core/Dialog';
import { DialogTitle, DialogContent, FormControl, InputLabel, Select, Input, MenuItem, DialogActions } from '@material-ui/core';
import { RobotComponentControl } from '../../components/robot/components/RobotComponentControl';
import { DeepPartial } from '../../../shared/CommonTools';
import update, { Query } from 'immutability-helper';
import { AZComponent } from '../../components/AZComponent';
import { ArduinoComponentControl } from '../../components/robot/components/arduino/ArduinoComponentControl';
import { RobotInterface } from '../../components/robot/RobotInterface';


type HomePageState = Readonly<typeof defaultState>

const defaultState = {
    
}

export class HomePage extends AZComponent<any, HomePageState> {

    state = defaultState;

    constructor(props: Readonly<{}>) {
        super(props);
        this.listenToKeyboardEvents();
    }

    render() {
        return (
            <div className="homePage">
                <h1>Welcome to Zerone's Home Page</h1>

                <RobotInterface/>
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