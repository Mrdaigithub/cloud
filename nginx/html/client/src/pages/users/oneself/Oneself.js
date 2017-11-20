import React, {Component} from 'react'
import {withStyles} from 'material-ui/styles'
import styles from './styles'
import {Link} from 'react-router-dom'
import Grid from 'material-ui/Grid'
import List, {ListItem, ListItemText} from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import logo from './../../../static/logo.svg'
import defaultAvatar from '../../../static/defaultAvatar.svg'
import plus from '../../../static/plus.svg'

class Oneself extends Component {
    render() {
        const {classes} = this.props;
        return (
            <Grid container
                  column
                  direction={'row'}
                  justify={'center'}
                  alignItems={'flex-start'}
                  spacing={8}>
                <Grid item xs={12}>
                    <Grid container
                          direction={'row'}
                          justify={'center'}
                          alignItems={'center'}
                          spacing={8}>
                        <Grid item xs={3} sm={2} md={1}>
                            <Link to="/cloud-drive">
                                <img className={classes['logo-img']} src={logo} alt="logo"/>
                            </Link>
                        </Grid>
                        <Grid item xs={12} className={classes['title']}>choose your account</Grid>
                    </Grid>
                </Grid>
                <Grid item xs={11} sm={8} md={5}>
                    <Paper className={classes.root} elevation={4}>
                        <List>
                            <ListItem button dense divider>
                                <Grid container
                                      direction={'row'}
                                      justify={'flex-start'}
                                      alignItems={'center'}
                                      spacing={0}>
                                    <Grid item xs={2}>
                                        <Avatar className={classes['list-avatar']} alt={'defaultAvatar'} src={defaultAvatar}/>
                                    </Grid>
                                    <Grid item xs={9} sm={8} md={5}>
                                        <ListItemText className={classes['list-username']} primary={`defaultAvatar`} />
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <Divider/>
                            <ListItem button dense divider>
                                <Grid container
                                      direction={'row'}
                                      justify={'flex-start'}
                                      alignItems={'center'}
                                      spacing={0}>
                                    <Grid item xs={2}>
                                        <Avatar className={classes['list-avatar']} alt={'defaultAvatar'} src={defaultAvatar}/>
                                    </Grid>
                                    <Grid item xs={9} sm={8} md={5}>
                                        <ListItemText className={classes['list-username']} primary={`defaultAvatar`} />
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <Divider/>
                            <ListItem button dense divider>
                                <Grid container
                                      direction={'row'}
                                      justify={'flex-start'}
                                      alignItems={'center'}
                                      spacing={0}>
                                    <Grid item xs={2}>
                                        <Avatar alt={'plus'} src={plus}/>
                                    </Grid>
                                    <Grid item xs={9} sm={8} md={5}>
                                        <ListItemText className={classes['list-username']} primary={`Add new avatar`} />
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <Divider/>
                            <ListItem button dense divider>
                                <Grid container
                                      direction={'row'}
                                      justify={'center'}
                                      alignItems={'center'}
                                      spacing={40}>
                                    <Grid item className={classes['list-logout']}>logout</Grid>
                                </Grid>
                            </ListItem>
                        </List>
                    </Paper>
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(styles)(Oneself)
