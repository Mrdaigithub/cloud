import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { withStyles } from 'material-ui/styles';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './styles';

class NotFound extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { classes, location } = this.props;
        return (
            <PageHeaderLayout>
                <p>404</p>
                <hr/>
                {location.pathname} is not found!
            </PageHeaderLayout>
        );
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => bindActionCreators({
    changePage: url => push(url),
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withStyles(styles)(NotFound));
