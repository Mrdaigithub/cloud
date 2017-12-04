import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom'
import PropTypes from 'prop-types';
import teal from 'material-ui/colors/teal';
import indigo from 'material-ui/colors/indigo';
import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles';
import {withStyles} from 'material-ui/styles';
import withRoot from '../components/withRoot';
import Home from './home'
import About from './about'
import Welcome from './welcome'

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
                            <Route exact path="/" component={Home}/>
                            <Route exact path="/about-us" component={About}/>
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