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
import Formsy from 'formsy-react';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import { InputAdornment } from 'material-ui/Input';
import IconButton from 'material-ui/IconButton';
import Visibility from 'material-ui-icons/Visibility';
import VisibilityOff from 'material-ui-icons/VisibilityOff';
import { bindActionCreators } from 'redux';
import { replace } from 'react-router-redux';
import { withStyles } from 'material-ui/styles';
import { login, clearToken } from '../../store/modules/oneself';
import { alert } from '../../store/modules/assist';
import { FormsyText } from '../../components/FormsyMaterialUi';
import styles from './styles';
import BasicLayout from '../../layouts/BasicLayout';
import logo from '../../static/logo.svg';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPassword: false,
        };
    }

    async componentWillMount() {
        this.props.clearToken();
    }

    handleClickShowPasssword() {
        this.setState({ showPassword: !this.state.showPassword });
    }

    login(model) {
        const { username, password } = model;
        this.props.login(username, password, () => {
            this.props.alert('登录成功', 1000);
            setTimeout(() => {
                this.props.changePage('/cloud-drive/0');
            }, 1300);
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <BasicLayout>
                <Grid className={classes.normal} container direction={'row'} justify={'center'} alignItems={'center'}>
                    <Grid item xs={7} sm={5} md={3}>
                        <Grid container alignItems={'center'} justify={'center'}>
                            <Grid item xs={4}><img className={classes.logoImg} src={logo} alt="logo"/></Grid>
                            <Grid item xs={5} className={classes.logoTitle}>Cloud</Grid>
                            <Grid item xs={12} className={classes.logoText}>A simple cloud project</Grid>
                        </Grid>
                        <Formsy onValidSubmit={this.login.bind(this)}>
                            <FormsyText
                                title="用户名"
                                name="username"
                                validations={{ matchRegexp: /(\w|\d){4,}/ }}
                                validationError="用户名不合法"
                                required
                                fullWidth
                                autoFocus/>
                            <FormsyText
                                title="密码"
                                name="password"
                                type={this.state.showPassword ? 'text' : 'password'}
                                required
                                fullWidth
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton onClick={this.handleClickShowPasssword.bind(this)}>
                                            {this.state.showPassword ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                                }/>
                            <Button
                                type="submit"
                                raised color="primary"
                                className={classes.loginButton}>登录</Button>
                        </Formsy>
                    </Grid>
                </Grid>
            </BasicLayout>
        );
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => bindActionCreators({
    login,
    clearToken,
    alert,
    changePage: url => replace(url),
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withStyles(styles)(Login));
