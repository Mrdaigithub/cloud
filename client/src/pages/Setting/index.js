import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles } from 'material-ui/styles';
import { replace } from 'react-router-redux';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Dialog from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';
import Divider from 'material-ui/Divider';
import ListSubheader from 'material-ui/List/ListSubheader';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Transition from '../../components/Transition';
import { logout } from '../../store/modules/oneself';
import styles from './styles';


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
                transition={Transition}>
                <AppBar className={classes.settingTopBar}>
                    <Toolbar>
                        <IconButton color="contrast" onClick={onClose} aria-label="Close">
                            <CloseIcon/>
                        </IconButton>
                        <Typography type="title" color="inherit">设置</Typography>
                    </Toolbar>
                </AppBar>
                <List subheader={<div/>}>
                    <div className={classes.listSection}>
                        <ListSubheader>账户信息</ListSubheader>
                        <ListItem button disabled>
                            <ListItemText primary={<div className={classes.listItemTextChild}><h4>邮箱地址</h4><p>{email}</p></div>}/>
                        </ListItem>
                        <ListItem button onClick={this.logout.bind(this)}>
                            <ListItemText primary="登出"/>
                        </ListItem>
                        <Divider/>
                        <ListSubheader>关于</ListSubheader>
                        <ListItem button disabled>
                            <ListItemText primary={<div className={classes.listItemTextChild}><h4>版本</h4><p>0.0.1</p></div>}/>
                        </ListItem>
                        <ListItem button>
                            <ListItemText
                                primary={
                                    <div className={classes.listItemTextChild}>
                                        <a href="https://github.com/Mrdaigithub/cloud/issues/new">发现bug</a>
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

const mapDispatchToProps = dispatch => bindActionCreators({
    changePage: url => (replace(url)),
    clearOneself: () => (logout()),
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withStyles(styles)(Setting));
