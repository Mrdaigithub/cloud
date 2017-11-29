import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles'
import styles from './styles'
import Grid from 'material-ui/Grid'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton';
import logo from './../../static/logo.svg'
import GithubIcon from "../../components/GithubIcon";
import axios from '../../configs/axios'
import qs from 'qs'

class Login extends Component {
    state = {
        username: 'root',
        password: 'root'
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    login() {
        let that = this;
        !(async function () {
            let res = await axios.post('/login/password', qs.stringify({
                username: that.state.username,
                password: that.state.password
            }));
            console.log(res)
        })()
    }

    render() {
        const {classes} = this.props;
        return (
            <Grid className={classes.loginForm} container direction={'row'} justify={'center'} alignItems={'center'}>
                <Grid item xs={7} sm={5} md={3}>
                    <Grid container alignItems={'center'} justify={'center'}>
                        <Grid item xs={4}><img className={classes.logoImg} src={logo} alt="logo"/></Grid>
                        <Grid item xs={5} className={classes.logoTitle}>Cloud</Grid>
                        <Grid item xs={12} className={classes.logoText}>A simple cloud project</Grid>
                    </Grid>
                    <TextField className={classes.loginInput}
                               id="username"
                               label="username"
                               required
                               value={this.state.username}
                               onChange={this.handleChange('username')}
                               fullWidth/>
                    <TextField className={classes.loginInput}
                               id="password"
                               label="password"
                               required
                               value={this.state.password}
                               onChange={this.handleChange('password')}
                               fullWidth/>
                    <Button raised
                            color="accent"
                            className={classes.loginButton}
                            onClick={this.login.bind(this)}>login</Button>
                    <Grid container alignItems={'center'} justify={'flex-start'}>
                        <Grid item xs={4}>其他登录方式</Grid>
                        <Grid item xs={4}>
                            <IconButton
                                href={`https://github.com/login/oauth/authorize?client_id=${'fbc7ce7b78d475a3a327'}`}>
                                <GithubIcon/>
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(styles)(Login)
