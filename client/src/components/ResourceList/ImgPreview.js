import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import requester from '../../utils/requester';
import styles from './styles';


class ImgPreview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgData: null,
        };
    }

    async componentWillMount() {
        const imgData = await requester.get(`resources/preview/${this.props.selectedResource.resourceID}`);
        this.setState({ imgData });
    }

    render() {
        const { classes } = this.props;
        return (
            <img
                src={this.state.imgData}
                className={classes.imgPreview}
                alt=""/>
        );
    }
}

const mapStateToProps = state => ({
    selectedResource: state.resource.selectedResource,
});

export default connect(
    mapStateToProps,
)(withStyles(styles)(ImgPreview));
