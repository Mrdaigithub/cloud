import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import teal from 'material-ui/colors/teal';
import indigo from 'material-ui/colors/indigo';
import { MuiThemeProvider, createMuiTheme, withStyles } from 'material-ui/styles';
import withRoot from '../components/withRoot';
import About from './About';
import Welcome from './Welcome';
import Login from './Login';
import CloudDrive from './CloudDrive';

const styles = {
    root: {
        position: 'relative',
        height: '100vh',
        overflowX: 'hidden',
    },
};

const theme = createMuiTheme({
    palette: {
        type: 'light',
        primary: indigo,
        secondary: {
            ...teal,
        },
    },
});

class App extends Component {
    render() {
        return (
            <main>
                <MuiThemeProvider theme={theme}>
                    <div className={this.props.classes.root}>
                        <Route exact path="/" component={Welcome}/>
                        <Route exact path="/welcome" component={Welcome}/>
                        <Route exact path="/about-us" component={About}/>
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/cloud-drive" component={CloudDrive}/>
                    </div>
                </MuiThemeProvider>
            </main>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(App));
