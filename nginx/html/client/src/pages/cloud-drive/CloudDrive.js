import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import InboxIcon from 'material-ui-icons/Inbox';
import DraftsIcon from 'material-ui-icons/Drafts';
import styles from './styles'

class CloudDrive extends Component {
    state = {
        open: true
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
                <Drawer open={this.state.open} onRequestClose={this.toggleDrawer(false)}>
                    <div className={classes.drawer}>
                        <List>
                            <ListItem button>
                                <ListItemIcon>
                                    <InboxIcon />
                                </ListItemIcon>
                                <ListItemText primary="Inbox" />
                            </ListItem>
                            <ListItem button>
                                <ListItemIcon>
                                    <DraftsIcon />
                                </ListItemIcon>
                                <ListItemText primary="Drafts" />
                            </ListItem>
                        </List>
                        <Divider />
                        <List>
                            <ListItem button>
                                <ListItemText primary="Trash" />
                            </ListItem>
                            <ListItem button component="a" href="#simple-list">
                                <ListItemText primary="Spam" />
                            </ListItem>
                        </List>
                    </div>
                </Drawer>
                <AppBar position='static'>
                    <Toolbar>
                        <Typography type="title" color="inherit">
                            <IconButton color="contrast" aria-label="Menu">
                                <MenuIcon/>
                            </IconButton>
                        </Typography>
                        <Typography type="title" color="inherit">
                            Title
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

export default withStyles(styles)(CloudDrive);