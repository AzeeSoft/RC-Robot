import * as React from 'react';
import Button from '@material-ui/core/Button';
import { Icon, PropTypes } from '../../../../../node_modules/@material-ui/core';
import { AZComponent } from '../AZComponent';

const styles = theme => {
    button: {
        margin: theme.spacing.unit
    }
};

type Props = {
    icon: string
} & Partial<DefaultProps>;

type DefaultProps = {
    color: PropTypes.Color,
};

export class RobotComponentControl extends AZComponent<Props> {

    static defaultProps: DefaultProps = {
        color: 'primary'
    }

    constructor(props: Props) { 
        super(props);
    }

    render() {
        return (
            <div>
                <Button variant='fab' color='primary' className='button'>
                    <Icon>{this.props.icon}</Icon>
                </Button>
            </div>
        );
    }
}