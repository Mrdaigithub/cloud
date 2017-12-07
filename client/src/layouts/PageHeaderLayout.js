import React, { Component } from 'react';
import { Link } from 'dva/router';
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
import FileUpload from 'material-ui-icons/FileUpload';
import SupervisorAccount from 'material-ui-icons/SupervisorAccount';
import Avatar from 'material-ui/Avatar';
import GithubIcon from '../components/GithubIcon';
import LightIcon from '../components/LightIcon';
import SearchIcon from '../components/SearchIcon';
import defaultAvatar from '../assets/defaultAvatar.svg';
import styles from './PageHeaderLayout.css';

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
    const { children } = this.props;
    return (
      <div>
        <Drawer open={this.state.open} onRequestClose={this.toggleDrawer(false)}>
          <div
            className={styles.drawer}
            onTouchStart={this.toggleDrawer(true)}
            onClick={this.toggleDrawer(false)}
            onKeyDown={this.toggleDrawer(false)}>
            <List className={styles['avatar-container']}>
              <Link to="/personnel/oneself" className={styles['sidebar-link']}>
                <ListItem button>
                  <Grid container direction={'row'} spacing={0}>
                    <Grid item xs={12}>
                      <Avatar className={styles['avatar-img']} alt="defaultAvatar" src={defaultAvatar}/>
                    </Grid>
                    <Grid item xs={6}>
                      <p className={styles['avatar-username']}>username</p>
                    </Grid>
                  </Grid>
                </ListItem>
              </Link>
            </List>
            <Divider/>
            <List>
              <ListItem button>
                <Link to="/cloud-drive" className={styles['sidebar-link']}>
                  <ListItemIcon>
                    <Storage/>
                  </ListItemIcon>
                  <ListItemText primary="My cloud"/>
                </Link>
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <FileUpload/>
                </ListItemIcon>
                <ListItemText primary="upload"/>
              </ListItem>
              <ListItem button>
                <Link to="/trash" className={styles['sidebar-link']}>
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
                <Link to="/personnel/groups" className={styles['sidebar-link']}>
                  <ListItemIcon>
                    <SupervisorAccount/>
                  </ListItemIcon>
                  <ListItemText primary="personnel"/>
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
                      <IconButton onClick={this.toggleDrawer(true)} color="contrast" aria-label="Menu">
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
                <Grid container direction={'row'} justify={'space-around'} alignItems={'center'}>
                  <Grid item xs={4}>
                    <Typography type="title" color="inherit">
                      <IconButton className={styles['topbar-btn']}>
                        <SearchIcon style={{ width: 30, height: 30 }}/>
                      </IconButton>
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography type="title" color="inherit">
                      <IconButton className={styles['topbar-btn']}>
                        <LightIcon style={{ width: 30, height: 30 }}/>
                      </IconButton>
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography type="title" color="inherit">
                      <IconButton className={styles['topbar-btn']} href={'https://github.com/Mrdaigithub/cloud'}>
                        <GithubIcon style={{ width: 30, height: 30 }}/>
                      </IconButton>
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <div className={styles.content}>
          {children}
        </div>
      </div>
    );
  }
}

export default PageHeaderLayout;
