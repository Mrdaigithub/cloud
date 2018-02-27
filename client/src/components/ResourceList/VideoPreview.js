import React, { Component } from 'react';
import DPlayer from 'dplayer';
import 'dplayer/dist/DPlayer.min.css';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import requester from '../../utils/requester';
import styles from './styles';


class VideoPreview extends Component {

    async componentWillMount() {
        const videoUrl = await requester.get(`resources/secret/${this.props.selectedResource.resourceID}`);
        this.setState({ videoUrl });
        new DPlayer({
            element: document.querySelector('#playerContainer'),
            video: {
                url: videoUrl,
            },
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <div id="playerContainer" className={classes.videoPreview}/>
        );
    }
}

const mapStateToProps = state => ({
    selectedResource: state.resource.selectedResource,
});

export default connect(
    mapStateToProps,
)(withStyles(styles)(VideoPreview));
