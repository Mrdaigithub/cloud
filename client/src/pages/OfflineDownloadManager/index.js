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
import SwipeableViews from 'react-swipeable-views';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import LinearProgress from '@material-ui/core/LinearProgress';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Divider from '@material-ui/core/Divider';
import styles from '../OfflineDownloadManager/styles';
import { DownloadCompleteIcon, DownloadingIcon } from '../../components/Icons';
import { _downloadCompleted, _downloading, _offlineDownloadManager } from '../../res/values/string';
import { saveDownloadList } from '../../store/actions/downloadActions';
import requester from '../../utils/requester';
import { conversionCapacityUtil } from '../../utils/assist';
import { setPageTitle } from '../../store/actions/assistActions';


class OfflineDownloadManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 1,
        };
        this.timer = null;
        requester.setAnimate(false);
        this.handleFetchAria2Task();
    }

    componentWillMount() {
        this.props.setPageTitle(_offlineDownloadManager);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    async handleFetchAria2Task() {
        let downloadList = null;
        downloadList = await requester.get('https://api.mrdaisite.club/api/v1/aria2/state');
        this.props.saveDownloadList(downloadList);
        this.timer = setInterval(async () => {
            downloadList = await requester.get('https://api.mrdaisite.club/api/v1/aria2/state');
            this.props.saveDownloadList(downloadList);
        }, 5000);
    }

    handleRemoveTask = gid => async () => {
        await requester.delete(`https://api.mrdaisite.club/api/v1/aria2/${gid}`);
        const downloadList = await requester.get('https://api.mrdaisite.club/api/v1/aria2/state');
        this.props.saveDownloadList(downloadList);
    };

    /**
     *
     * @param gid
     * @param status   active == true, pause == false
     * @returns {Function}
     */
    handleToggleTaskStatus = (gid, status = true) => async () => {
        console.log(status);
        return status ?
            await requester.get(`https://api.mrdaisite.club/api/v1/aria2/pause/${gid}`) :
            await requester.get(`https://api.mrdaisite.club/api/v1/aria2/unpause/${gid}`);
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleChangeIndex = (index) => {
        this.setState({ value: index });
    };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Paper>
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                        fullWidth>
                        <Tab icon={<DownloadCompleteIcon/>} label={_downloadCompleted}/>
                        <Tab icon={<DownloadingIcon/>} label={_downloading}/>
                    </Tabs>
                </Paper>
                <SwipeableViews
                    className={classes.swipeableViews}
                    index={this.state.value}
                    onChangeIndex={this.handleChangeIndex}>
                    <List style={{ padding: 8 }}>
                        {
                            this.props.downloadList.filter(downloadItem => downloadItem.result.status === 'complete')
                                .map(downloadItem => (
                                    <div key={downloadItem.result.gid}>
                                        <ListItem>
                                            <Grid container direction={'row'} justify={'center'} alignItems={'center'}>
                                                <Grid item xs={12}>
                                                    <Grid
                                                        container direction={'row'} justify={'space-between'}
                                                        alignItems={'center'}>
                                                        <Grid item xs={10} sm={8}>
                                                            <ListItemText
                                                                primary={downloadItem.result.files[0].path.split('/')
                                                                    .pop()}
                                                                className={classes.downloadItemTitle}/>
                                                        </Grid>
                                                        <Grid item xs={2} sm={4} className={classes.textRight}>
                                                            <IconButton
                                                                size="small"
                                                                onClick={this.handleRemoveTask(downloadItem.result.gid)}>
                                                                <DeleteIcon/>
                                                            </IconButton>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Grid
                                                        container direction={'row'} justify={'space-between'}
                                                        alignItems={'center'}>
                                                        <Grid item xs={4} className={classes.downloadItemState}>
                                                            {downloadItem.result.status === 'complete' ? _downloadCompleted : _downloading}
                                                        </Grid>
                                                        <Grid item xs={8} className={classes.textRight}>
                                                            <span className={classes.downloadItemSpeed}>
                                                                {
                                                                    `${conversionCapacityUtil(downloadItem.result.completedLength)} / ${conversionCapacityUtil(downloadItem.result.totalLength)}`
                                                                }
                                                            </span>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <LinearProgress
                                                        variant="determinate"
                                                        value={(downloadItem.result.completedLength / downloadItem.result.totalLength) * 100}/>
                                                </Grid>
                                            </Grid>
                                        </ListItem>
                                        <Divider/>
                                    </div>
                                ))
                        }
                    </List>
                    <List style={{ padding: 8 }}>
                        {
                            this.props.downloadList.filter(downloadItem => downloadItem.result.status !== 'complete')
                                .map(downloadItem => (
                                    <div key={downloadItem.result.gid}>
                                        <ListItem>
                                            <Grid container direction={'row'} justify={'center'} alignItems={'center'}>
                                                <Grid item xs={12}>
                                                    <Grid
                                                        container direction={'row'} justify={'space-between'}
                                                        alignItems={'center'}>
                                                        <Grid item xs={10} sm={8}>
                                                            <ListItemText
                                                                primary={downloadItem.result.files[0].path.split('/')
                                                                    .pop()}
                                                                className={classes.downloadItemTitle}/>
                                                        </Grid>
                                                        <Grid item xs={2} sm={4} className={classes.textRight}>
                                                            <IconButton
                                                                size="small"
                                                                onClick={this.handleRemoveTask(downloadItem.result.gid)}>
                                                                <DeleteIcon/>
                                                            </IconButton>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Grid
                                                        container direction={'row'} justify={'space-between'}
                                                        alignItems={'center'}>
                                                        <Grid item xs={4} className={classes.downloadItemState}>
                                                            {
                                                                downloadItem.result.status === 'active' ?
                                                                    `${conversionCapacityUtil(downloadItem.result.downloadSpeed)}/s` :
                                                                    `0B/s`
                                                            }
                                                        </Grid>
                                                        <Grid item xs={8} className={classes.textRight}>
                                                            <span className={classes.downloadItemSpeed}>
                                                                {`${conversionCapacityUtil(downloadItem.result.completedLength)} / ${conversionCapacityUtil(downloadItem.result.totalLength)}`}
                                                            </span>
                                                            <IconButton
                                                                size="small"
                                                                onClick={this.handleToggleTaskStatus(downloadItem.result.gid, downloadItem.result.status === 'active')}>
                                                                {downloadItem.result.status === 'paused' ?
                                                                    <PlayArrowIcon/> : <PauseIcon/>}
                                                            </IconButton>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <LinearProgress
                                                        variant="determinate"
                                                        value={((downloadItem.result.completedLength / downloadItem.result.totalLength) * 100) || 0}/>
                                                </Grid>
                                            </Grid>
                                        </ListItem>
                                        <Divider/>
                                    </div>
                                ))
                        }
                    </List>
                </SwipeableViews>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    downloadList: state.download.downloadList,
});

const mapDispatchToProps = dispatch => ({
    setPageTitle: pageTitle => setPageTitle(pageTitle)(dispatch),
    saveDownloadList: downloadList => saveDownloadList(downloadList)(dispatch),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withStyles(styles)(OfflineDownloadManager));
