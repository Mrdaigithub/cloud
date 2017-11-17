/* eslint-disable flowtype/require-valid-file-annotation */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import withRoot from '../components/withRoot';
import Login from './login/Login'

const styles = {
    root: {
        textAlign: 'center',
        height: '100vh',
        overflow: 'hidden'
    },
};

class Index extends Component {
    state = {
        open: false,
    };

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };

    handleClick = () => {
        this.setState({
            open: true,
        });
    };

    render() {
        return (
            <div className={this.props.classes.root}>
                <Login/>
            </div>
        );
    }
}

Index.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Index));
