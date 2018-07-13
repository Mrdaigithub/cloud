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
import { push } from 'connected-react-router';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import LinearProgress from '@material-ui/core/LinearProgress';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Divider from '@material-ui/core/Divider';
import styles from '../OfflineDownloadManager/styles';
import { DownloadIcon } from '../../components/Icons';
import { _downloadCompleted, _downloading } from '../../res/values/string';
import { saveDownloadList } from '../../store/actions/downloadActions';
import requester from '../../utils/requester';
import { conversionCapacityUtil } from '../../utils/assist';


class OfflineDownloadManager extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.timer = null;
        requester.setAnimate(false);
        this.handleFetchAria2Task();
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    async handleFetchAria2Task() {
        let downloadList = null;
        downloadList = await requester.get('https://api.mrdaisite.com/api/v1/aria2/state');
        this.props.saveDownloadList(downloadList);
        this.timer = setInterval(async () => {
            downloadList = await requester.get('https://api.mrdaisite.com/api/v1/aria2/state');
            this.props.saveDownloadList(downloadList);
        }, 1000);
    }

    handleRemoveTask = gid => async () => {
        await requester.delete(`https://api.mrdaisite.com/api/v1/aria2/${gid}`);
        const downloadList = await requester.get('https://api.mrdaisite.com/api/v1/aria2/state');
        this.props.saveDownloadList(downloadList);
    };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.normal}>
                <AppBar position="static" color="default">
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        fullWidth>
                        <Tab label="Item One"/>
                        <Tab label="Item Two"/>
                        <Tab label="Item Three"/>
                    </Tabs>
                </AppBar>
                <List>
                    {
                        this.props.downloadList.map(downloadItem => (
                            <div key={downloadItem.result.gid}>
                                <ListItem>
                                    <Grid container direction={'row'} justify={'center'} alignItems={'center'}>
                                        <Grid item xs={12}>
                                            <Grid container direction={'row'} justify={'space-between'} alignItems={'center'}>
                                                <Grid item xs={8}>
                                                    <ListItemText
                                                        primary={downloadItem.result.files[0].path.split('/')
                                                            .pop()}
                                                        className={classes.downloadItemTitle}/>
                                                </Grid>
                                                <Grid item xs={4} className={classes.textRight}>
                                                    <IconButton size="small" onClick={this.handleRemoveTask(downloadItem.result.gid)}>
                                                        <DeleteIcon/>
                                                    </IconButton>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Grid container direction={'row'} justify={'space-between'} alignItems={'center'}>
                                                <Grid item xs={4} className={classes.downloadItemState}>
                                                    {downloadItem.result.status === 'complete' ? _downloadCompleted : _downloading}
                                                </Grid>
                                                <Grid item xs={8} className={classes.textRight}>
                                                    <span className={classes.downloadItemSpeed}>
                                                        {
                                                            `${conversionCapacityUtil(downloadItem.result.completedLength)} / ${conversionCapacityUtil(downloadItem.result.totalLength)}`
                                                        }
                                                    </span>
                                                    <IconButton size="small">
                                                        <DownloadIcon/>
                                                    </IconButton>
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
            </div>
        );
    }
}

const mapStateToProps = state => ({
    downloadList: state.download.downloadList,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    changePage: url => (push(url)),
    saveDownloadList: downloadList => saveDownloadList(downloadList)(dispatch),
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withStyles(styles)(OfflineDownloadManager));
