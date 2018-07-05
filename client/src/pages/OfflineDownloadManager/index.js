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
import Grid from '@material-ui/core/Grid';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import LinearProgress from '@material-ui/core/LinearProgress';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import StopIcon from '@material-ui/icons/Stop';
import DeleteIcon from '@material-ui/icons/Delete';
import Divider from '@material-ui/core/Divider';
import Aria2 from 'aria2';
import { HOST, PORT, SECURE, SECRET, PATH } from '../../constants/aria2Config';
import styles from '../OfflineDownloadManager/styles';
import { _remove, _stop } from '../../res/values/string';
import { removeReadyDownloadLink } from '../../store/actions/downloadActions';

class OfflineDownloadManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            readyDownloadLink: this.props.readyDownloadLink || 'https://fra-de-ping.vultr.com/vultr.com.1000MB.bin',
        };
        this.props.removeReadyDownloadLink();
        this.aria2 = new Aria2({
            host: HOST,
            port: PORT,
            secure: SECURE,
            secret: SECRET,
            path: PATH,
        });
        this.handleStartAria2Task();
    }

    async handleStartAria2Task() {
        await this.aria2.open();
        const [guid] = await this.aria2.call('addUri', [this.state.readyDownloadLink], { dir: '/tmp' });
        console.log(guid);
        await this.aria2.close();
    }

    handleClick = (event) => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        const { classes } = this.props;
        const { anchorEl } = this.state;

        return (
            <div className={classes.normal}>
                <List>
                    <ListItem>
                        <Grid container direction={'row'} justify={'center'} alignItems={'center'}>
                            <Grid item xs={12}>
                                <ListItemText primary="Photos"/><br/>
                            </Grid>
                            <Grid item xs={12}>
                                <LinearProgress variant="determinate" color="primary" value={50}/>
                            </Grid>
                        </Grid>
                        <ListItemSecondaryAction className={classes.downloadItemAction}>
                            <IconButton onClick={this.handleClick}>
                                <MoreVertIcon/>
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                    <Divider/>
                    <ListItem>
                        <Grid container direction={'row'} justify={'center'} alignItems={'center'}>
                            <Grid item xs={12}>
                                <ListItemText primary="Photos"/><br/>
                            </Grid>
                            <Grid item xs={12}>
                                <LinearProgress variant="determinate" color="primary" value={50}/>
                            </Grid>
                        </Grid>
                        <ListItemSecondaryAction className={classes.downloadItemAction}>
                            <IconButton onClick={this.handleClick}>
                                <MoreVertIcon/>
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                    <Divider/>
                    <ListItem>
                        <Grid container direction={'row'} justify={'center'} alignItems={'center'}>
                            <Grid item xs={12}>
                                <ListItemText primary="Photos"/><br/>
                            </Grid>
                            <Grid item xs={12}>
                                <LinearProgress variant="determinate" color="primary" value={50}/>
                            </Grid>
                        </Grid>
                        <ListItemSecondaryAction className={classes.downloadItemAction}>
                            <IconButton onClick={this.handleClick}>
                                <MoreVertIcon/>
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                    <Divider/>
                </List>
                <Menu
                    id="long-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}>
                    <MenuItem onClick={this.handleClose}>
                        <ListItemIcon>
                            <StopIcon/>
                        </ListItemIcon>
                        <ListItemText inset primary={_stop}/>
                    </MenuItem>
                    <MenuItem onClick={this.handleClose}>
                        <ListItemIcon>
                            <DeleteIcon/>
                        </ListItemIcon>
                        <ListItemText inset primary={_remove}/>
                    </MenuItem>
                </Menu>
                {this.state.readyDownloadLink}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    readyDownloadLink: state.download.readyDownloadLink,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    changePage: url => (push(url)),
    removeReadyDownloadLink: () => removeReadyDownloadLink()(dispatch),
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withStyles(styles)(OfflineDownloadManager));
