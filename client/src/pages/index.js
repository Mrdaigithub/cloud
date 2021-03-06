/*
 * MIT License
 *
 * Copyright (c) 2017 Mrdai
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import brown from 'material-ui/colors/brown';
import grey from 'material-ui/colors/grey';
import Snackbar from 'material-ui/Snackbar';
import { MuiThemeProvider, createMuiTheme, withStyles } from 'material-ui/styles';
import withRoot from '../components/withRoot';
import Routes from '../routes';
import CircularLoading from '../components/CircularLoading';

const theme = createMuiTheme({
    palette: {
        type: 'light',
        primary: brown,
        secondary: grey,
    },
});

const styles = theme => ({
    root: {
        position: 'relative',
        height: '100vh',
        overflowX: 'hidden',
    },
});

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            msgShow: false,
            msgText: '',
        };
    }

    componentDidMount() {
        const { store } = this.props;
        store.subscribe(() => {
                this.setState({
                    loading: store.getState().assist.loading,
                    msgShow: store.getState().assist.msgShow,
                    msgText: store.getState().assist.msgText,
                });
            },
        );
    }

    render() {
        const { classes } = this.props;
        return (
            <main>
                <MuiThemeProvider theme={theme}>
                    <div className={classes.root}>
                        <Snackbar
                            className={classes.secondary}
                            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                            open={this.state.msgShow}
                            message={this.state.msgText}/>
                        <CircularLoading show={this.state.loading}/>
                        <Routes/>
                    </div>
                </MuiThemeProvider>
            </main>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    loading: state.assist.loading,
    msgShow: state.assist.msgShow,
    msgText: state.assist.msgText,
});

export default connect(
    mapStateToProps,
    undefined,
    undefined,
    { pure: false },
)(withRoot(withStyles(styles)(App)));
