import * as React from 'react';

import { AZComponent } from '../../../AZComponent';
import { RobotComponentControl, RobotComponentControlProps, RobotComponentControlState } from '../RobotComponentControl';
import { DialogContent, FormControl, InputLabel, Select, MenuItem, Input, Button } from '@material-ui/core';
import { Logger } from '../../../../../shared/Logger';
import { ipcRenderer } from 'electron';
import { windowConnection } from '../../../../App';

type ArduinoComponentControlProps = RobotComponentControlProps & {

}

type ArduinoComponentControlState = RobotComponentControlState & Readonly<typeof defaultState>;

const defaultState = {
    portPath: '' as string,
    serialPortList: [] as any[],
}

export class ArduinoComponentControl extends RobotComponentControl<ArduinoComponentControlProps, ArduinoComponentControlState> {

    state = { ...this.state, ...defaultState };

    onPortSelected = (event) => {
        this.updateState({
            portPath: { $set: event.target.value },
        });
    };

    connect = () => {
        let selectedPortPath = this.state.portPath;
        if (selectedPortPath !== '') {
            windowConnection.sendDataToWindow('connectToArduino', {
                portPath: selectedPortPath
            });

            this.closeDialog();
        }
    };

    constructor(props: Readonly<ArduinoComponentControlProps>) {
        super(props, 'Arduino Component', 'add-icon');
    }

    protected onOpen() {
        let serialPortList = ipcRenderer.sendSync('getSerialPortList');

        this.updateState({
            serialPortList: { $set: serialPortList }
        });
    }

    protected onClose() {

    }

    protected getDialogContent(): React.ReactNode {
        return (
            <DialogContent>
                <form className=''>
                    <FormControl style={{ display: 'flex' }}>
                        <InputLabel htmlFor='arduinoPortPath'>Port Path</InputLabel>
                        <Select
                            value={this.state.portPath}
                            input={<Input id='arduinoPortPath' />}
                            onChange={this.onPortSelected}>
                            <MenuItem value=''><em>None</em></MenuItem>
                            {
                                this.state.serialPortList.map(function (port) {
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
        );
    }

    protected getAdditionalDialogActions(): React.ReactNode {
        return (
            <Button onClick={this.connect} color='primary'>
                Connect
            </Button>
        )
    }
}