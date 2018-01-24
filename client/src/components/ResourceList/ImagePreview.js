import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from './styles';


class ResourcePreview extends Component {
    render() {
        return (
            <div id="ImagePreview">
                <img src="http://m.fc120.org/templets/default/images/banner_nzjteam.jpg" alt=""/>
            </div>
        );
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withStyles(styles)(ResourcePreview));
