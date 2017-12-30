import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Grid from 'material-ui/Grid';
import MenuIcon from 'material-ui-icons/Menu';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Storage from 'material-ui-icons/Storage';
import Delete from 'material-ui-icons/Delete';
import SupervisorAccount from 'material-ui-icons/SupervisorAccount';
import Avatar from 'material-ui/Avatar';
import GithubIcon from '../../components/GithubIcon/index';
import LightIcon from '../../components/LightIcon/index';
import SearchIcon from '../../components/SearchIcon/index';
import defaultAvatar from '../../static/defaultAvatar.svg';
import styles from './styles';

class PageHeaderLayout extends Component {
    state = {
        open: false,
    };
    toggleDrawer = open => () => {
        this.setState({
            open,
        });
    };

    render() {
        const { children, classes, currentDir } = this.props;
        return (
            <div>
                <Drawer open={this.state.open} onRequestClose={this.toggleDrawer(false)}>
                    <div
                        className={classes.drawer}
                        onTouchStart={this.toggleDrawer(true)}
                        onClick={this.toggleDrawer(false)}
                        onKeyDown={this.toggleDrawer(false)}>
                        <List className={classes.avatarContainer}>
                            <Link to="/personnel/oneself" className={classes.sidebarLink}>
                                <ListItem button>
                                    <Grid container direction={'row'} spacing={0}>
                                        <Grid item xs={12}>
                                            <Avatar
                                                className={classes.avatarImg}
                                                alt="defaultAvatar"
                                                src={defaultAvatar}/>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <p className={classes.avatarUsername}>username</p>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                            </Link>
                        </List>
                        <Divider/>
                        <List>
                            <ListItem button>
                                <Link to="/cloud-drive" className={classes.sidebarLink}>
                                    <ListItemIcon>
                                        <Storage/>
                                    </ListItemIcon>
                                    <ListItemText primary="我的云端硬盘"/>
                                </Link>
                            </ListItem>
                            <ListItem button>
                                <Link to="/trash" className={classes.sidebarLink}>
                                    <ListItemIcon>
                                        <Delete/>
                                    </ListItemIcon>
                                    <ListItemText primary="回收站"/>
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
                                    <ListItemText primary="人员管理"/>
                                </Link>
                            </ListItem>
                        </List>
                        <Divider/>
                        <List>
                            <ListItem button>
                                <p>已用28%，共15 GB</p>
                            </ListItem>
                        </List>
                    </div>
                </Drawer>
                <AppBar position={'fixed'}>
                    <Toolbar>
                        <Grid container direction={'row'} justify={'space-between'} alignItems={'center'}>
                            <Grid item xs={4}>
                                <Grid container direction={'row'} justify={'flex-start'} alignItems={'center'}>
                                    <Grid item xs={5} sm={3} md={2}>
                                        <Typography type="title" color="inherit">
                                            <IconButton
                                                onClick={this.toggleDrawer(true)}
                                                color="contrast"
                                                aria-label="Menu">
                                                <MenuIcon/>
                                            </IconButton>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography type="title" color="inherit">{currentDir}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={5} sm={3} md={2}>
                                <Grid container direction={'row'} justify={'space-around'} alignItems={'center'}>
                                    <Grid item xs={4}>
                                        <Typography type="title" color="inherit">
                                            <IconButton className={classes.topbarBtn}>
                                                <SearchIcon style={{ width: 30, height: 30 }}/>
                                            </IconButton>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography type="title" color="inherit">
                                            <IconButton className={classes.topbarBtn}>
                                                <LightIcon style={{ width: 30, height: 30 }}/>
                                            </IconButton>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography type="title" color="inherit">
                                            <IconButton
                                                className={classes.topbarBtn}
                                                href={'https://github.com/Mrdaigithub/cloud'}>
                                                <GithubIcon style={{ width: 30, height: 30 }}/>
                                            </IconButton>
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
                <div className={classes.content}>
                    {children}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    currentDir: state.storage.currentDir,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    changePage: url => push(url),
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withStyles(styles)(PageHeaderLayout));
