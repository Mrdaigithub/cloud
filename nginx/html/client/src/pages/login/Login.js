import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import styles from './styles'
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

class Login extends Component {
    render() {
        const {classes} = this.props
        return (
            <div className={classes.login}>
                <Grid container direction={'row'} alignItems={'center'}>
                    <Grid item xs={3}>asdasd</Grid>
                </Grid>
                <Grid container direction={'row'} alignItems={'center'}>
                    <Grid item xs={3}>asdasd</Grid>
                </Grid>
                <Grid container direction={'row'} alignItems={'center'}>
                    <Grid item xs={3}>asdasd</Grid>
                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(Login);
