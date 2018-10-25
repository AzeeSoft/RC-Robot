import * as React from 'react';
import { AZComponent } from '../../AZComponent';
import { ArduinoComponentControl } from './arduino/ArduinoComponentControl';

export type ComponentControlPanelProps = {
    
} & Partial<DefaultProps>;

type DefaultProps = Readonly<typeof defaultProps>;

const defaultProps = {

};


export type ComponentControlPanelState = Readonly<typeof defaultState>;

const defaultState = {
    
};


export class ComponentControlPanel extends AZComponent<ComponentControlPanelProps, ComponentControlPanelState> {
    render() {
        return (
            <div>
                <ArduinoComponentControl />
            </div>
        );
    }
}