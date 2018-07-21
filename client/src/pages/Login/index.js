/*
 * MIT License
 *
 * Copyright (c) 2017 Mrdai
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { replace } from 'connected-react-router';
import Formsy from 'formsy-react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { login, clearToken } from '../../store/actions/oneselfActions';
import { alert } from '../../store/actions/assistActions';
import { FormsyText } from '../../components/FormsyMaterialUi';
import styles from './styles';
import BasicLayout from '../../layouts/BasicLayout';
import logo from '../../res/static/logo.png';
import { DELAY_TIME } from '../../constants';
import {
    _username,
    _password,
    _usernameInvalid,
    _login,
    _loginSuccess,
} from '../../res/values/string';
import { debounce } from '../../utils/assist';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPassword: false,
        };
    }

    componentWillMount() {
        this.props.clearToken();
    }

    handleClickShowPassword() {
        this.setState({ showPassword: !this.state.showPassword });
    }

    login(model) {
        const { username, password } = model;
        this.props.login(username, password, () => {
            this.props.alert(_loginSuccess);
            setTimeout(() => {
                this.props.changePage('/cloud-drive/0');
            }, DELAY_TIME);
        })();
    }

    render() {
        const { classes } = this.props;
        return (
            <BasicLayout>
                <Grid className={classes.normal} container direction={'row'} justify={'center'} alignItems={'center'}>
                    <Grid item xs={7} sm={5} md={3}>
                        <Grid container alignItems={'center'} justify={'center'}>
                            <Grid item xs={10}><img className={classes.logoImg} src={logo} alt="logo"/></Grid>
                        </Grid>
                        <Formsy onValidSubmit={this.login.bind(this)}>
                            <FormsyText
                                title={_username}
                                name="username"
                                validations={{ matchRegexp: /(\w|\d){4,}/ }}
                                validationError={_usernameInvalid}
                                required
                                fullWidth
                                autoFocus/>
                            <FormsyText
                                title={_password}
                                name="password"
                                type={this.state.showPassword ? 'text' : 'password'}
                                required
                                fullWidth
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton onClick={this.handleClickShowPassword.bind(this)}>
                                            {this.state.showPassword ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                                }/>
                            <Button
                                type="submit"
                                color="primary"
                                variant="contained"
                                className={classes.loginButton}>{_login}</Button>
                        </Formsy>
                    </Grid>
                </Grid>
            </BasicLayout>
        );
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    login,
    clearToken,
    alert: debounce((msgText, time) => alert(msgText, time)(dispatch)),
    changePage: url => dispatch(replace(url)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withStyles(styles)(Login));
