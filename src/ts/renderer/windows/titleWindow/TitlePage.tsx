import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button'

import '../../../../scss/windows/titleWindow.scss';

export class TitlePage extends React.Component {
    render() {
        return (
            <div className="hello">
                <h1>Hello, Welcome to the RC Robot's page.</h1>
                <Button variant="contained" color="primary">
                    Hello World
                </Button>
            </div>
        );
    }
}