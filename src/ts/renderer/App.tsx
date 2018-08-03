import { ipcRenderer } from 'electron';

import * as React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { purple, green, teal, yellow } from '@material-ui/core/colors';
import { Logger } from '../shared/Logger';

const theme = createMuiTheme({
    palette: {
        primary: teal,
        secondary: green,
    }
});

class WindowConnection {
    public controllerID: number;

    public listenForWindowControllerID() {
        ipcRenderer.on('windowControllerID', (event, ...args: any[]) => {
            Logger.log(args);
            windowConnection.controllerID = args[0];
        });
    }
    
    public sendDataToWindow(channel: string, ...args: any[]) {
        if (this.controllerID !== null) {
            ipcRenderer.send('windowData', windowConnection.controllerID, channel, args);
        } else {
            
        }
    }
}

const windowConnection: WindowConnection = new WindowConnection();

export class App extends React.Component {

    constructor(props: Readonly<{}>) {
        super(props);
        windowConnection.listenForWindowControllerID();
    }

    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <React.Fragment>
                    <CssBaseline />
                    {this.props.children}
                </React.Fragment>
            </MuiThemeProvider>
        );
    }
}

export { windowConnection };