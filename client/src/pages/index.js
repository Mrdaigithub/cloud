import React, {Component} from 'react';
import PropTypes from 'prop-types';
import teal from 'material-ui/colors/teal';
import indigo from 'material-ui/colors/indigo';
import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles';
import {withStyles} from 'material-ui/styles';
import withRoot from '../components/withRoot';
import Routes from '../routes'

const styles = {
    root: {
        position: 'relative',
        height: '100vh',
        overflowX: 'hidden'
    },
};

const theme = createMuiTheme({
    palette: {
        type: 'light',
        primary: indigo,
        secondary: {
            ...teal
        }
    },
});

class App extends Component {
    render() {
        return (
            <div>
                <main>
                    <MuiThemeProvider theme={theme}>
                        <div className={this.props.classes.root}>
                            <Routes/>
                        </div>
                    </MuiThemeProvider>
                </main>
            </div>
        )
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(App))