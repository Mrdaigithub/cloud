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
import { replace } from 'connected-react-router';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Divider from '@material-ui/core/Divider';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Transition from '../../components/Transition';
import { logout } from '../../store/actions/oneselfActions';
import styles from './styles';
import { _about, _accountInfo, _email, _findBug, _logout, _setting, _version } from '../../res/values/string';
import { VERSION_CODE } from '../../constants';


class Setting extends Component {
    logout() {
        const { changePage, clearOneself } = this.props;
        changePage('/login');
        clearOneself();
    }

    render() {
        const { open, onClose, classes, email } = this.props;
        return (
            <Dialog
                fullScreen
                open={open}
                TransitionComponent={Transition}>
                <AppBar className={classes.settingTopBar}>
                    <Toolbar>
                        <IconButton color="inherit" onClick={onClose} aria-label="Close">
                            <CloseIcon/>
                        </IconButton>
                        <Typography type="title" color="inherit">{_setting}</Typography>
                    </Toolbar>
                </AppBar>
                <List subheader={<div/>}>
                    <div className={classes.listSection}>
                        <ListSubheader>{_accountInfo}</ListSubheader>
                        <ListItem button disabled>
                            <ListItemText primary={<div className={classes.listItemTextChild}><h4>{_email}</h4><p>{email}</p></div>}/>
                        </ListItem>
                        <ListItem button onClick={this.logout.bind(this)}>
                            <ListItemText primary={_logout}/>
                        </ListItem>
                        <Divider/>
                        <ListSubheader>{_about}</ListSubheader>
                        <ListItem button disabled>
                            <ListItemText primary={<div className={classes.listItemTextChild}><h4>{_version}</h4><p>{VERSION_CODE}</p></div>}/>
                        </ListItem>
                        <ListItem button>
                            <ListItemText
                                primary={
                                    <div className={classes.listItemTextChild}>
                                        <a href="https://github.com/Mrdaigithub/cloud/issues/new">{_findBug}</a>
                                    </div>
                                }/>
                        </ListItem>
                    </div>
                </List>
            </Dialog>
        );
    }
}

const mapStateToProps = state => ({
    email: state.oneself.email,
});

const mapDispatchToProps = dispatch => ({
    clearOneself: () => dispatch(logout()),
    changePage: url => dispatch(replace(url)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withStyles(styles)(Setting));
