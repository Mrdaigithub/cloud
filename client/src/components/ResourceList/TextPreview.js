import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import requester from '../../utils/requester';
import styles from './styles';


class TextPreview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            docUrl: null,
        };
    }

    async componentWillMount() {
        const docUrl = await requester.get(`resources/secret/${this.props.selectedResource.resourceID}`);
        this.setState({ docUrl: `https://docs.google.com/viewer?embedded=true&url=http:${docUrl}` });
    }

    render() {
        const { classes } = this.props;
        return (
            <iframe title="textPreview" className={classes.textPreview} src={this.state.docUrl}>
                <p>Your browser does not support iframes.</p>
            </iframe>
        );
    }
}

const mapStateToProps = state => ({
    selectedResource: state.resource.selectedResource,
});

export default connect(
    mapStateToProps,
)(withStyles(styles)(TextPreview));
