import * as React from 'react';
import Button from '@material-ui/core/Button';
import { Icon, PropTypes, Dialog, DialogTitle, DialogActions } from '@material-ui/core';
import { AZComponent } from '../../AZComponent';
import { RobotInterface } from '../RobotInterface';

const styles = theme => {
    button: {
        margin: theme.spacing.unit
    }
};

export type RobotComponentControlProps = {

} & Partial<DefaultProps>;

type DefaultProps = Readonly<typeof defaultProps>;

const defaultProps = {
    color: null as PropTypes.Color,
};


export type RobotComponentControlState = Readonly<typeof defaultState>;

const defaultState = {
    dialog: {
        open: false,
    }
};


export abstract class RobotComponentControl<P = {}, S = {}> extends AZComponent<RobotComponentControlProps & P, RobotComponentControlState & S> {

    static defaultProps: DefaultProps = defaultProps;

    state = defaultState as RobotComponentControlState & S;

    name: string = '';
    icon: string = '';
    color: PropTypes.Color = 'primary';

    openDialog = () => {
        this.updateState({
            dialog: {
                open: { $set: true },
            }
        }, () => {
            this.onOpen();
        });
    };

    closeDialog = () => {
        this.updateState({
            dialog: {
                open: { $set: false },
            }
        }, () => {
            this.onClose();
        });
    };

    constructor(props: RobotComponentControlProps & P, name: string, icon: string, color: PropTypes.Color = 'primary') {
        super(props);

        this.name = name;
        this.icon = icon;
        this.color = color;
    }

    render() {
        Logger.log(this.state);

        let color = this.props.color || this.color;

        return (
            <div>
                <Button variant='fab' color={color} className='button' onClick={this.openDialog}>
                    <Icon>{this.icon}</Icon>
                </Button>
                <Dialog
                    disableBackdropClick
                    disableAutoFocus
                    open={this.state.dialog.open}
                    onClose={this.closeDialog}>

                    <DialogTitle>{this.name}</DialogTitle>

                    {this.getDialogContent()}

                    <DialogActions>
                        <Button onClick={this.closeDialog} color='primary'>
                            Close
                        </Button>

                        {this.getAdditionalDialogActions()}
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

    protected abstract onOpen(): void;
    protected abstract onClose(): void;
    protected abstract getDialogContent(): React.ReactNode;
    protected abstract getAdditionalDialogActions(): React.ReactNode;
}