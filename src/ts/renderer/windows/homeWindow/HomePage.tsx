import { ipcRenderer } from 'electron';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button'

import Mousetrap = require('mousetrap');

import '../../../../scss/windows/homeWindow.scss';
import { Logger } from '../../../shared/Logger';
import { windowConnection } from '../../App';
import Dialog from '../../../../../node_modules/@material-ui/core/Dialog';
import { DialogTitle, DialogContent, FormControl, InputLabel, Select, Input, MenuItem, DialogActions } from '../../../../../node_modules/@material-ui/core';
import { RobotComponentControl } from '../../components/robot/RobotComponentControl';
import { DeepPartial } from '../../../shared/CommonTools';
import update, { Query } from 'immutability-helper';
import { AZComponent } from '../../components/AZComponent';


type HomePageState = Readonly<typeof defaultState>

const defaultState = {
    dialogs: {
        arduinoConnect: {
            open: false,
            portPath: '',
        }
    }
}

export class HomePage extends AZComponent<any, HomePageState> {

    state = defaultState;

    serialPortList: any[] = [];

    handlers = {
        dialogs: {
            arduinoConnect: {
                open: () => {
                    this.serialPortList = ipcRenderer.sendSync('getSerialPortList');

                    this.updateState({
                        dialogs: {
                            arduinoConnect: {
                                open: { $set: true }
                            }
                        }
                    });
                },

                close: () => {
                    this.updateState({
                        dialogs: {
                            arduinoConnect: {
                                open: { $set: false }
                            }
                        }
                    });
                },

                onPortSelected: (event) => {
                    this.updateState({
                        dialogs: {
                            arduinoConnect: {
                                portPath: { $set: event.target.value }
                            }
                        }
                    });
                },

                connect: () => {
                    let selectedPortPath = this.state.dialogs.arduinoConnect.portPath;
                    if (selectedPortPath !== '') {
                        windowConnection.sendDataToWindow('connectToArduino', {
                            portPath: selectedPortPath
                        });
                        this.handlers.dialogs.arduinoConnect.close();
                    }
                }
            }
        }
    }

    constructor(props: Readonly<{}>) {
        super(props);
        this.listenToKeyboardEvents();
    }

    render() {
        if (this.state.dialogs.arduinoConnect.open) {
            Logger.log(this.serialPortList);
            Logger.log(this.state);
        }

        return (
            <div className="homePage">
                <h1>Welcome to Zerone's Home Page</h1>

                <RobotComponentControl icon='add-icon' />


                {/* Connect to Arduino */}
                <Button
                    variant="outlined"
                    onClick={this.handlers.dialogs.arduinoConnect.open}>
                    Connect to Arduino
                </Button>

                <Dialog
                    disableBackdropClick
                    disableAutoFocus
                    open={this.state.dialogs.arduinoConnect.open}
                    onClose={this.handlers.dialogs.arduinoConnect.close}>
                    <DialogTitle>Connect to Arduino</DialogTitle>
                    <DialogContent>
                        <form className=''>
                            <FormControl style={{ display: 'flex' }}>
                                <InputLabel htmlFor='arduinoPortPath'>Port Path</InputLabel>
                                <Select
                                    value={this.state.dialogs.arduinoConnect.portPath}
                                    input={<Input id='arduinoPortPath' />}
                                    onChange={this.handlers.dialogs.arduinoConnect.onPortSelected}>
                                    <MenuItem value=''><em>None</em></MenuItem>
                                    {
                                        this.serialPortList.map(function (port) {
                                            let displayName = port.comName;
                                            if (port.manufacturer) {
                                                displayName += ' - ' + port.manufacturer;
                                            }
                                            return <MenuItem value={port.comName} key={port.comName}>{displayName}</MenuItem>;
                                        })
                                    }
                                </Select>
                            </FormControl>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handlers.dialogs.arduinoConnect.close} color='primary'>
                            Close
                        </Button>

                        <Button onClick={this.handlers.dialogs.arduinoConnect.connect} color='primary'>
                            Connect
                        </Button>
                    </DialogActions>

                </Dialog>

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