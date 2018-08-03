import { ipcRenderer, remote } from 'electron';

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

export class App extends React.Component {

    constructor(props: Readonly<{}>) {
        super(props);
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

class WindowConnection {
    public sendDataToWindow(channel: string, data: any) {
        Logger.log(data);
        ipcRenderer.send('windowData', remote.getCurrentWindow().id, channel, data);
    }
}

const windowConnection: WindowConnection = new WindowConnection();

export { windowConnection };