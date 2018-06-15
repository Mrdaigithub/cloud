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
import logo from '../../static/logo.png';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPassword: false,
            v: 'root',
            p: 'root',
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
            console.log(this.props.alert);
            this.props.alert('登录成功');
            setTimeout(() => {
                this.props.changePage('/cloud-drive/0');
            }, 1300);
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
                                title="用户名"
                                name="username"
                                value={this.state.v}
                                validations={{ matchRegexp: /(\w|\d){4,}/ }}
                                validationError="用户名不合法"
                                required
                                fullWidth
                                autoFocus/>
                            <FormsyText
                                title="密码"
                                name="password"
                                value={this.state.p}
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
                                className={classes.loginButton}>登录</Button>
                        </Formsy>
                    </Grid>
                </Grid>
            </BasicLayout>
        );
    }
}

const mapStateToProps = state => ({
    count: state.count,
});

const mapDispatchToProps = dispatch => ({
    login,
    clearToken,
    alert: (msgText, time) => alert(msgText, time)(dispatch),
    changePage: url => dispatch(replace(url)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withStyles(styles)(Login));
