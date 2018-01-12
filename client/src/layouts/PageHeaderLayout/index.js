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
import Settings from 'material-ui-icons/Settings';
import Avatar from 'material-ui/Avatar';
import GithubIcon from '../../components/GithubIcon/index';
import LightIcon from '../../components/LightIcon/index';
import SearchIcon from '../../components/SearchIcon/index';
import Setting from '../../pages/Setting';
import styles from './styles';
import { fetchOneself } from '../../store/modules/oneself';


class PageHeaderLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drawerOpen: false,
            settingOpen: false,
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

    render() {
        const {
            children,
            classes,
            username,
            email,
            capacity,
            used,
        } = this.props;
        return (
            <div className={classes.normal}>
                <Drawer open={this.state.drawerOpen} onRequestClose={this.handleToggleDrawer(false)}>
                    <div
                        className={classes.drawer}
                        onTouchStart={this.handleToggleDrawer(true)}
                        onClick={this.handleToggleDrawer(false)}
                        onKeyDown={this.handleToggleDrawer(false)}>
                        <List className={classes.avatarContainer}>
                            <ListItem>
                                <Grid container direction={'row'} spacing={0}>
                                    <Grid item xs={12}>
                                        <Avatar className={classes.avatarImg}>{username ? username[0].toUpperCase() : 'U'}</Avatar>
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
                            <ListItem button onClick={this.handleToggleSetting}>
                                <ListItemIcon>
                                    <Settings/>
                                </ListItemIcon>
                                <ListItemText primary="设置"/>
                            </ListItem>
                        </List>
                        <Divider/>
                        <List>
                            <ListItem>
                                <p>
                                    已用{(used / (1024 ** 3)).toFixed(3)}GB，
                                    {capacity ? `共${(capacity / (1024 ** 3)).toFixed(3)}GB` : '无限制'}
                                </p>
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
                                                onClick={this.handleToggleDrawer(true)}
                                                color="contrast"
                                                aria-label="Menu">
                                                <MenuIcon/>
                                            </IconButton>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        {/*<Typography type="title" color="inherit">{currentPath.map(e => `${e}/`)}</Typography>*/}
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
                <Setting open={this.state.settingOpen} onClose={this.handleToggleSetting}/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    id: state.oneself.id,
    username: state.oneself.username,
    email: state.oneself.email,
    capacity: state.oneself.capacity,
    used: state.oneself.used,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    changePage: url => push(url),
    fetchOneself,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withStyles(styles)(PageHeaderLayout));
