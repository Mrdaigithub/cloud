import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Grid from 'material-ui/Grid';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';
import { bindActionCreators } from 'redux';
import { replace } from 'react-router-redux';
import { withStyles } from 'material-ui/styles';
import { logout } from '../../../store/modules/oneself';
import { alert } from '../../../store/modules/assist';
import styles from './styles';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import logo from '../../../static/logo.svg';
import defaultAvatar from '../../../static/defaultAvatar.svg';


class Oneself extends Component {
    handleLogout() {
        this.props.logout(() => {
            this.props.changePage('/login');
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <PageHeaderLayout>
                <Grid
                    container
                    direction={'row'}
                    justify={'center'}
                    alignItems={'flex-start'}
                    spacing={8}>
                    <Grid item xs={12} className={classes.normal}>
                        <Grid
                            container
                            direction={'row'}
                            justify={'center'}
                            alignItems={'center'}
                            spacing={8}>
                            <Grid item xs={3} sm={2} md={1}>
                                <Link to="/cloud-drive">
                                    <img className={classes['logo-img']} src={logo} alt="logo"/>
                                </Link>
                            </Grid>
                            <Grid item xs={12} className={classes.title}>选择账户</Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={11} sm={8} md={5}>
                        <Paper className={classes.root} elevation={4}>
                            <List>
                                <ListItem button dense divider>
                                    <Grid
                                        container
                                        direction={'row'}
                                        justify={'flex-start'}
                                        alignItems={'center'}
                                        spacing={0}>
                                        <Grid item xs={2}>
                                            <Avatar
                                                className={classes['list-avatar']}
                                                alt={'defaultAvatar'}
                                                src={defaultAvatar}/>
                                        </Grid>
                                        <Grid item xs={9} sm={8} md={5}>
                                            <ListItemText
                                                className={classes['list-username']}
                                                primary={`defaultAvatar`}/>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                                <Divider/>
                                <ListItem button dense divider>
                                    <Grid
                                        container
                                        direction={'row'}
                                        justify={'flex-start'}
                                        alignItems={'center'}
                                        spacing={0}>
                                        <Grid item xs={2}>
                                            <Avatar
                                                className={classes['list-avatar']}
                                                alt={'defaultAvatar'}
                                                src={defaultAvatar}/>
                                        </Grid>
                                        <Grid item xs={9} sm={8} md={5}>
                                            <ListItemText
                                                className={classes['list-username']}
                                                primary={`defaultAvatar`}/>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                                <Divider/>
                                <ListItem dense divider>
                                    <Grid
                                        onClick={logout}
                                        container
                                        direction={'row'}
                                        justify={'center'}
                                        alignItems={'center'}
                                        spacing={40}>
                                        <Grid item className={classes['list-logout']}>
                                            <Button
                                                raised
                                                color="primary"
                                                onClick={this.handleLogout.bind(this)}>
                                                切换账户
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                            </List>
                        </Paper>
                    </Grid>
                </Grid>
            </PageHeaderLayout>
        );
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => bindActionCreators({
    alert,
    logout,
    changePage: url => replace(url),
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withStyles(styles)(Oneself));
