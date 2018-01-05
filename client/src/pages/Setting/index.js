import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles } from 'material-ui/styles';
import { Link } from 'react-router-dom';
import { replace } from 'react-router-redux';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Dialog from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';
import Divider from 'material-ui/Divider';
import ListSubheader from 'material-ui/List/ListSubheader';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Slide from 'material-ui/transitions/Slide';
import styles from './styles';


function Transition(props) {
    return <Slide direction="up" {...props}/>;
}

class Setting extends Component {
    render() {
        const { open, onClose, classes, changePage } = this.props;
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
                            <ListItemText primary={<div className={classes.listItemTextChild}><h4>邮箱地址</h4><p>asdasd</p></div>}/>
                        </ListItem>
                        <ListItem button onClick={changePage.bind(this, '/login')}>
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
                                        <Link to="https://github.com/Mrdaigithub/cloud/issues/new">发现bug</Link>
                                    </div>
                                }/>
                        </ListItem>
                    </div>
                </List>
            </Dialog>
        );
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => bindActionCreators({
    changePage: url => (replace(url)),
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withStyles(styles)(Setting));
