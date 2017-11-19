import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'
import {withStyles} from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Grid from 'material-ui/Grid';
import MenuIcon from 'material-ui-icons/Menu';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import List, {ListItem, ListItemIcon, ListItemText} from 'material-ui/List';
import Storage from 'material-ui-icons/Storage';
import Delete from 'material-ui-icons/Delete';
import SupervisorAccount from 'material-ui-icons/SupervisorAccount';
import Avatar from 'material-ui/Avatar';
import GithubIcon from '../../components/GithubIcon'
import LightIcon from '../../components/LightIcon'
import SearchIcon from '../../components/SearchIcon'
import styles from './styles'
import defaultAvatar from './../../static/defaultAvatar.svg'

class CloudDrive extends Component {
    state = {
        open: false
    };
    toggleDrawer = (open) => () => {
        this.setState({
            open
        });
    };

    render() {
        const {classes} = this.props;
        return (
            <div>
                <Drawer open={this.state.open}
                        onRequestClose={this.toggleDrawer(false)}>
                    <div className={classes.drawer}
                         onTouchStart={this.toggleDrawer(true)}
                         onClick={this.toggleDrawer(false)}
                         onKeyDown={this.toggleDrawer(false)}>
                        <List className={classes['avatar-container']}>
                            <Link to="/login" className={classes['sidebar-link']}>
                                <ListItem button>
                                    <Grid container direction={'row'} spacing={0}>
                                        <Grid item xs={12}>
                                            <Avatar className={classes['avatar-img']} alt="defaultAvatar"
                                                    src={defaultAvatar}/>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <p className={classes['avatar-username']}>username</p>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                            </Link>
                        </List>
                        <Divider/>
                        <List>
                            <ListItem button>
                                <Link to="/cloud-drive" className={classes['sidebar-link']}>
                                    <ListItemIcon>
                                        <Storage/>
                                    </ListItemIcon>
                                    <ListItemText primary="My cloud"/>
                                </Link>
                            </ListItem>
                            <ListItem button>
                                <Link to="/trash" className={classes['sidebar-link']}>
                                    <ListItemIcon>
                                        <Delete/>
                                    </ListItemIcon>
                                    <ListItemText primary="Trash"/>
                                </Link>
                            </ListItem>
                        </List>
                        <Divider/>
                        <List>
                            <ListItem button>
                                <Link to="/users" className={classes['sidebar-link']}>
                                    <ListItemIcon>
                                        <SupervisorAccount/>
                                    </ListItemIcon>
                                    <ListItemText primary="Users"/>
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
                <AppBar position='static'>
                    <Toolbar>
                        <Grid container direction={'row'}
                              justify={'space-between'}
                              alignItems={'center'}>
                            <Grid item xs={4}>
                                <Grid container direction={'row'}
                                      justify={'flex-start'}
                                      alignItems={'center'}>
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
                                        <Typography type="title" color="inherit">Title</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={5} sm={3} md={2}>
                                <Grid container direction={'row'}
                                      justify={'space-around'}
                                      alignItems={'center'}>
                                    <Grid item xs={4}>
                                        <Typography type="title" color="inherit">
                                            <IconButton className={classes['topbar-btn']}>
                                                <SearchIcon style={{width: 30, height: 30}}/>
                                            </IconButton>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography type="title" color="inherit">
                                            <IconButton className={classes['topbar-btn']}>
                                                <LightIcon style={{width: 30, height: 30}}/>
                                            </IconButton>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography type="title" color="inherit">
                                            <IconButton className={classes['topbar-btn']}
                                                        href={'https://github.com/Mrdaigithub/cloud'}>
                                                <GithubIcon style={{width: 30, height: 30}}/>
                                            </IconButton>
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

export default withStyles(styles)(CloudDrive)