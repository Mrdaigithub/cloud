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
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import MenuIcon from '@material-ui/icons/Menu';
import Storage from '@material-ui/icons/Storage';
import Delete from '@material-ui/icons/Delete';
import SupervisorAccount from '@material-ui/icons/SupervisorAccount';
import Settings from '@material-ui/icons/Settings';
import SearchIcon from '@material-ui/icons/Search';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { GithubIcon, OfflineDownloadIcon } from '../../components/Icons';
import Setting from '../../pages/Setting';
import Searcher from '../../components/Searcher';
import styles from './styles';
import { fetchOneself } from '../../store/actions/oneselfActions';
import {
    _myCloudDisk,
    _offlineDownloadManager,
    _personnelManagement, _setting,
    _sum,
    _trashCan,
    _unlimited,
    _used,
} from '../../res/values/string';
import { conversionCapacityUtil } from '../../utils/assist';


class PageHeaderLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drawerOpen: false,
            settingOpen: false,
            searcherOpen: false,
            anchorEl: null,
        };
    }

    componentWillMount() {
        if (!this.props.id) this.props.fetchOneself();
    }

    handleToggleDrawer = drawerOpen => () => {
        this.setState({ drawerOpen });
    };

    handleToggleSetting = () => {
        this.setState({ settingOpen: !this.state.settingOpen });
    };

    handleToggleSearcher = () => {
        this.setState({ searcherOpen: !this.state.searcherOpen });
    };

    handleClickAppBarMenu = (event) => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleCloseAppBarMenu = event => () => {
        this.setState({ anchorEl: null });
        if (event) event();
    };

    render() {
        const {
            pageTitle,
            appBarMenu,
            children,
            classes,
            username,
            email,
            capacity,
            used,
        } = this.props;
        const { anchorEl } = this.state;

        return (
            <div className={classes.normal}>
                <AppBar position="fixed">
                    <Toolbar>
                        <IconButton
                            className={classes.menuButton}
                            onClick={this.handleToggleDrawer(true)}
                            color="inherit"
                            aria-label="Menu">
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="title" noWrap color="inherit" className={classes.flex}>
                            {pageTitle || ''}
                        </Typography>
                        <IconButton onClick={this.handleToggleSearcher} className={classes.topbarBtn}>
                            <SearchIcon style={{ width: 30, height: 30 }}/>
                        </IconButton>
                        <IconButton
                            className={classes.topbarBtn}
                            href={'https://github.com/Mrdaigithub/cloud'}>
                            <GithubIcon style={{ width: 30, height: 30 }}/>
                        </IconButton>
                        {
                            appBarMenu && appBarMenu.length ?
                                <IconButton
                                    className={classes.topbarBtn}
                                    onClick={this.handleClickAppBarMenu}>
                                    <MoreVertIcon/>
                                </IconButton> : null
                        }
                    </Toolbar>
                </AppBar>
                <Drawer open={this.state.drawerOpen} onClose={this.handleToggleDrawer(false)}>
                    <div
                        className={classes.drawer}
                        onTouchStart={this.handleToggleDrawer(true)}
                        onClick={this.handleToggleDrawer(false)}
                        onKeyDown={this.handleToggleDrawer(false)}>
                        <List className={classes.avatarContainer}>
                            <ListItem>
                                <Grid container direction={'row'} spacing={0}>
                                    <Grid item xs={12}>
                                        <Avatar
                                            className={classes.avatarImg}>{username ? username[0].toUpperCase() : 'U'}</Avatar>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <p className={classes.avatarUsername}>{username}</p>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <p className={classes.avatarEmail}>{email}</p>
                                    </Grid>
                                </Grid>
                            </ListItem>
                        </List>
                        <Divider/>
                        <List>
                            <ListItem button>
                                <Link to="/cloud-drive/0" className={classes.sidebarLink}>
                                    <ListItemIcon>
                                        <Storage/>
                                    </ListItemIcon>
                                    <ListItemText primary={_myCloudDisk}/>
                                </Link>
                            </ListItem>
                            <ListItem button>
                                <Link to="/trash" className={classes.sidebarLink}>
                                    <ListItemIcon>
                                        <Delete/>
                                    </ListItemIcon>
                                    <ListItemText primary={_trashCan}/>
                                </Link>
                            </ListItem>
                            <ListItem button>
                                <Link to="/download/offline/manager" className={classes.sidebarLink}>
                                    <ListItemIcon>
                                        <OfflineDownloadIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary={_offlineDownloadManager}/>
                                </Link>
                            </ListItem>
                        </List>
                        <Divider/>
                        <List>
                            <ListItem button>
                                <Link to="/personnel/groups" className={classes.sidebarLink}>
                                    <ListItemIcon>
                                        <SupervisorAccount/>
                                    </ListItemIcon>
                                    <ListItemText primary={_personnelManagement}/>
                                </Link>
                            </ListItem>
                            <ListItem button onClick={this.handleToggleSetting}>
                                <ListItemIcon>
                                    <Settings/>
                                </ListItemIcon>
                                <ListItemText primary={_setting}/>
                            </ListItem>
                        </List>
                        <Divider/>
                        <List>
                            <ListItem>
                                <div>
                                    {_used}{conversionCapacityUtil(used)}，
                                    {capacity ? `${_sum}${conversionCapacityUtil(capacity)}` : _unlimited}
                                </div>
                            </ListItem>
                        </List>
                    </div>
                </Drawer>
                <div className={classes.content}>
                    {children}
                </div>
                <Setting open={this.state.settingOpen} onClose={this.handleToggleSetting}/>
                <Searcher open={this.state.searcherOpen} onClose={this.handleToggleSearcher}/>
                {
                    appBarMenu ?
                        <Menu
                            id="appBarMenu"
                            PaperProps={{
                                style: {
                                    maxHeight: 80 * 4.5,
                                    width: 150,
                                },
                            }}
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={this.handleCloseAppBarMenu()}>
                            {appBarMenu.map(i =>
                                <MenuItem
                                    key={i.name}
                                    disabled={Boolean(i.disabled)}
                                    onClick={this.handleCloseAppBarMenu(i.event)}>
                                    {i.name}
                                </MenuItem>)}
                        </Menu> : null
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    pageTitle: state.assist.pageTitle,
    appBarMenu: state.assist.appBarMenu,
    id: state.oneself.id,
    username: state.oneself.username,
    email: state.oneself.email,
    capacity: state.oneself.capacity,
    used: state.oneself.used,
});

const mapDispatchToProps = dispatch => ({
    fetchOneself: () => fetchOneself()(dispatch),
    changePage: url => dispatch(replace(url)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withStyles(styles)(PageHeaderLayout));
