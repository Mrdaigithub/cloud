import React, {Component} from 'react';
// import PropTypes from 'prop-types';
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
import Input, {InputLabel} from 'material-ui/Input';
import {FormControl} from 'material-ui/Form';
import SvgIcon from 'material-ui/SvgIcon';
import styles from './styles'
import defaultAvatar from './../../static/defaultAvatar.svg'
import light from '../../static/light.svg'

const GithubIcon = props => (
    <SvgIcon {...props}>
        <path
            d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"/>
    </SvgIcon>
);
const LightIcon = props => (
    <SvgIcon {...props}>
        <path
            d="M20,11H23V13H20V11M1,11H4V13H1V11M13,1V4H11V1H13M4.92,3.5L7.05,5.64L5.63,7.05L3.5,4.93L4.92,3.5M16.95,5.63L19.07,3.5L20.5,4.93L18.37,7.05L16.95,5.63M12,6A6,6 0 0,1 18,12C18,14.22 16.79,16.16 15,17.2V19A1,1 0 0,1 14,20H10A1,1 0 0,1 9,19V17.2C7.21,16.16 6,14.22 6,12A6,6 0 0,1 12,6M14,21V22A1,1 0 0,1 13,23H11A1,1 0 0,1 10,22V21H14M11,18H13V15.87C14.73,15.43 16,13.86 16,12A4,4 0 0,0 12,8A4,4 0 0,0 8,12C8,13.86 9.27,15.43 11,15.87V18Z"/>
    </SvgIcon>
);
const SearchIcon = props => (
    <SvgIcon {...props}>
        <path
            d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"/>
    </SvgIcon>
);

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
                        </List>
                        <Divider/>
                        <List>
                            <ListItem button>
                                <ListItemIcon>
                                    <Storage/>
                                </ListItemIcon>
                                <ListItemText primary="My cloud"/>
                            </ListItem>
                            <ListItem button>
                                <ListItemIcon>
                                    <Delete/>
                                </ListItemIcon>
                                <ListItemText primary="Trash"/>
                            </ListItem>
                        </List>
                        <Divider/>
                        <List>
                            <ListItem button>
                                <ListItemIcon>
                                    <SupervisorAccount/>
                                </ListItemIcon>
                                <ListItemText primary="Users"/>
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

export default withStyles(styles)(CloudDrive);