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
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';
import LinkIcon from '@material-ui/icons/Link';
import { TorrentIcon } from '../Icons';
import Transition from '../Transition';
import { _createLinkTask, _offlineDownload, _createBtTask, _cancel } from '../../res/values/string';
import styles from '../OfflineDownloader/styles';

class OfflineDownloader extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleCreateLinkTask = () => {
        this.props.onClose();
        this.props.changePage('/download/offline/create');
    };

    render() {
        const { classes } = this.props;

        return (
            <Dialog
                open={this.props.open}
                TransitionComponent={Transition}>
                <DialogTitle className={classes.textCenter}>{_offlineDownload}</DialogTitle>
                <Divider/>
                <DialogContent>
                    <Grid container spacing={24} justify="space-around" alignItems="flex-start">
                        <Grid item xs={12}>
                            <List>
                                <ListItem button onClick={this.handleCreateLinkTask}>
                                    <ListItemIcon>
                                        <LinkIcon/>
                                    </ListItemIcon>
                                    <ListItemText inset primary={_createLinkTask}/>
                                </ListItem>
                                {/*<ListItem button>*/}
                                    {/*<ListItemIcon>*/}
                                        {/*<TorrentIcon/>*/}
                                    {/*</ListItemIcon>*/}
                                    {/*<ListItemText inset primary={_createBtTask}/>*/}
                                {/*</ListItem>*/}
                            </List>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                onClick={this.props.onClose}>
                                {_cancel}
                            </Button>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        );
    }
}

OfflineDownloader.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    changePage: url => dispatch(push(url)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withStyles(styles)(OfflineDownloader));
