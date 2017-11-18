import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import styles from './styles'
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import logo from './../../static/logo.svg'

class Login extends Component {
    render() {
        const {classes} = this.props
        return (
            <Grid className={classes.loginForm} container direction={'row'} justify={'center'} alignItems={'center'}>
                <Grid item xs={7} sm={5} md={3}>
                    <Grid container alignItems={'center'} justify={'space-around'}>
                        <Grid item xs={4}><img className={classes.logoImg} src={logo} alt="logo"/></Grid>
                        <Grid item xs={5} class={classes.logoTitle}>Cloud</Grid>
                        <Grid item xs={12} class={classes.logoText}>A simple cloud project</Grid>
                    </Grid>
                    <TextField className={classes.loginInput} id="Username" label="username" fullWidth/>
                    <TextField className={classes.loginInput} id="Password" label="password" fullWidth/>
                    <Button raised color="accent" className={classes.loginButton}>login</Button>
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(styles)(Login);
