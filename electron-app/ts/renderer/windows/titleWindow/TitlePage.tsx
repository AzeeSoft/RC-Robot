import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button'

import '../../../../scss/windows/titleWindow.scss';
import { CircularProgress } from '@material-ui/core';
import { AZComponent } from '../../components/AZComponent';

export class TitlePage extends AZComponent {
    render() {
        return (
            <div className="titlePage">
                <h1>Initializing Zerone... Please Wait...</h1>

                <CircularProgress color="primary"/>
            </div>
        );
    }
}