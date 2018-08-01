import * as React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { purple, green, teal } from '@material-ui/core/colors';

const theme = createMuiTheme({
    palette: {
        primary: teal,
        secondary: green,
    }
});

export class App extends React.Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                {this.props.children}
            </MuiThemeProvider>
        );
    }
}