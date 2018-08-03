/// <reference path="../../../shared/additionalTypeDefs/Mousetrap.d.ts"/>

import { ipcRenderer } from 'electron';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button'

import Mousetrap = require('mousetrap');

import '../../../../scss/windows/homeWindow.scss';
import { Logger } from '../../../shared/Logger';
import { windowConnection } from '../../App';

export class HomePage extends React.Component {

    private originalMousetrapHandleKeyFunction: (ch, modifier, e) => void;

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
        Logger.log(Mousetrap.handleKey);

        windowConnection.sendDataToWindow('test', {
            ch: 'ch',
            modifier: 'modifier',
            e: 'e',
        });
        
        this.originalMousetrapHandleKeyFunction = Mousetrap.handleKey;
        Mousetrap.handleKey = (ch, modifier, e) => {
            this.originalMousetrapHandleKeyFunction(ch, modifier, e);
            
        }; 
    }
}