/* eslint-disable flowtype/require-valid-file-annotation */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles';
import teal from 'material-ui/colors/teal';
import indigo from 'material-ui/colors/indigo';
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

class Index extends Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <div className={this.props.classes.root}>
                    <Routes/>
                </div>
            </MuiThemeProvider>
        );
    }
}

Index.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Index))