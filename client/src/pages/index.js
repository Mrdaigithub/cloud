import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import teal from 'material-ui/colors/teal';
import indigo from 'material-ui/colors/indigo';
import Snackbar from 'material-ui/Snackbar';
import { MuiThemeProvider, createMuiTheme, withStyles } from 'material-ui/styles';
import withRoot from '../components/withRoot';
import Routes from '../routes';

const theme = createMuiTheme({
    palette: {
        type: 'light',
        primary: indigo,
        secondary: {
            ...teal,
        },
    },
});

const styles = theme => ({
    root: {
        position: 'relative',
        height: '100vh',
        overflowX: 'hidden',
    },
    snackbar: {
        margin: theme.spacing.unit,
    },
});

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msgShow: false,
            msgText: '',
        };
    }

    componentDidMount() {
        const { store } = this.props;
        store.subscribe(() => {
                this.setState({ msgShow: store.getState().assist.msgShow });
                this.setState({ msgText: store.getState().assist.msgText });
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
    msgShow: state.user.msgShow,
    msgText: state.user.msgText,
});

export default connect(
    mapStateToProps,
    undefined,
    undefined,
    { pure: false },
)(withRoot(withStyles(styles)(App)));
