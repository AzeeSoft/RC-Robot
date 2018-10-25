import * as React from 'react';
import { AZComponent } from '../AZComponent';
import { ArduinoComponentControl } from './components/arduino/ArduinoComponentControl';
import { ComponentControlPanel } from './components/ComponentControlPanel';

export type RobotInterfaceProps = {

} & Partial<DefaultProps>;

type DefaultProps = Readonly<typeof defaultProps>;

const defaultProps = {

};


export type RobotInterfaceState = Readonly<typeof defaultState>;

const defaultState = {

};


export class RobotInterface extends AZComponent<RobotInterfaceProps, RobotInterfaceState> {

    render() {
        return (
            <div>
                <ComponentControlPanel />
            </div>
        );
    }
}